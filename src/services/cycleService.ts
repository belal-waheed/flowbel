import type { BudgetCycle, FixedObligation, WeeklyEnvelope } from '../types/finance';
import type { ExpenseRecord } from '../types/expenseFsm';
import {
  completeActiveCycles,
  createCycle,
  getCycleById,
  updateCycle
} from '../db/repositories/cycleRepository';
import { calculateTotalFixedCosts, generateInitialCycle } from '../data/defaultBudget';

export interface EnvelopeCalculation {
  variablePool: number;
  weeklyAllocation: number;
  allocations: number[];
}

/**
 * Normalizes an array of weights so they sum to 1.0.
 * Falls back to equal weights if invalid or omitted.
 */
export function normalizeWeights(count: number, weights?: number[]): number[] {
  if (weights && weights.length === count) {
    const sum = weights.reduce((a, b) => a + b, 0);
    if (sum > 0) {
      return weights.map((w) => w / sum);
    }
  }
  return Array(count).fill(1 / count);
}

/**
 * Pure domain function to calculate the variable pool and envelope allocations.
 * Guards against negative variable pool when totalFixedCosts > totalAllowance.
 */
export function calculateEnvelopes(
  allowance: number,
  fixedTotal: number,
  envelopeCount: 4 | 5 = 4,
  weights?: number[]
): EnvelopeCalculation {
  const variablePool = Math.max(0, allowance - fixedTotal);
  const normalized = normalizeWeights(envelopeCount, weights);

  const allocations = normalized.map((weight) =>
    Number((variablePool * weight).toFixed(2))
  );

  const weeklyAllocation =
    allocations[0] ?? Number((variablePool / envelopeCount).toFixed(2));

  return { variablePool, weeklyAllocation, allocations };
}

/**
 * Resolves the matching envelope for a target date within a budget cycle.
 */
export function getEnvelopeForDate(cycle: BudgetCycle, targetDate: Date = new Date()): WeeklyEnvelope | undefined {
  const targetTime = targetDate.getTime();
  for (const env of cycle.envelopes) {
    const s = new Date(env.startDate).getTime();
    const e = new Date(env.endDate).getTime();
    if (targetTime >= s && targetTime <= e) {
      return env;
    }
  }
  return cycle.envelopes.find((e) => e.status === 'active') ?? cycle.envelopes[0];
}

/**
 * Determines which week (1 to envelopeCount) a date falls within for a given cycle.
 */
export function getCycleWeekForDate(cycle: BudgetCycle, targetDate: Date = new Date()): number {
  const targetTime = targetDate.getTime();
  const startTime = new Date(cycle.startDate).getTime();

  const diffDays = Math.floor((targetTime - startTime) / (24 * 60 * 60 * 1000));
  if (diffDays < 0) return 1;
  const weekIndex = Math.floor(diffDays / 7) + 1;
  const maxWeeks = cycle.envelopes.length || 4;
  return Math.min(Math.max(weekIndex, 1), maxWeeks);
}

/**
 * Calculates remaining days in the current active envelope week.
 */
export function getDaysRemainingInCurrentWeek(envelope: WeeklyEnvelope, currentDate: Date = new Date()): number {
  const end = new Date(envelope.endDate).getTime();
  const now = currentDate.getTime();
  const diffMs = end - now;
  if (diffMs <= 0) return 0;
  return Math.ceil(diffMs / (24 * 60 * 60 * 1000));
}

/**
 * Recalculates spent and remaining amounts for each envelope based on committed expenses.
 */
export function computeEnvelopeLedgers(
  cycle: BudgetCycle,
  expenses: ExpenseRecord[],
  currentDate: Date = new Date()
): BudgetCycle {
  const activeWeekNumber = getCycleWeekForDate(cycle, currentDate);

  const updatedEnvelopes = cycle.envelopes.map((env) => {
    // Only 'committed' expenses count against the budget
    const weekExpenses = expenses.filter(
      (e) => e.cycleId === cycle.id && e.envelopeWeek === env.weekNumber && e.state === 'committed'
    );

    const spentAmount = Number(
      weekExpenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)
    );
    const remainingAmount = Number((env.allocatedAmount - spentAmount).toFixed(2));

    let status: WeeklyEnvelope['status'] = 'upcoming';
    if (env.weekNumber === activeWeekNumber) {
      status = remainingAmount < 0 ? 'overspent' : 'active';
    } else if (env.weekNumber < activeWeekNumber) {
      status = remainingAmount < 0 ? 'overspent' : 'completed';
    } else {
      status = 'upcoming';
    }

    return {
      ...env,
      spentAmount,
      remainingAmount,
      status
    };
  });

  return {
    ...cycle,
    envelopes: updatedEnvelopes,
    updatedAt: new Date().toISOString()
  };
}

/**
 * Creates and saves a new budget cycle anchored to a given payday.
 */
export async function startNewBudgetCycle(
  payday: Date,
  allowance: number,
  fixedCosts: FixedObligation[],
  envelopeCount: 4 | 5 = 4,
  envelopeWeights?: number[]
): Promise<BudgetCycle> {
  // Mark any currently active cycle as completed
  await completeActiveCycles();

  const newCycle = generateInitialCycle(
    payday,
    allowance,
    fixedCosts,
    envelopeCount,
    envelopeWeights
  );
  await createCycle(newCycle);
  return newCycle;
}

/**
 * Updates allowance or fixed costs for the currently active cycle.
 */
export async function updateActiveCycleSettings(
  cycleId: string,
  newAllowance: number,
  fixedCosts: FixedObligation[],
  envelopeCount: 4 | 5 = 4,
  envelopeWeights?: number[]
): Promise<void> {
  const cycle = await getCycleById(cycleId);
  if (!cycle) return;

  const totalFixed = calculateTotalFixedCosts(fixedCosts);
  const { variablePool, weeklyAllocation, allocations } = calculateEnvelopes(
    newAllowance,
    totalFixed,
    envelopeCount,
    envelopeWeights
  );

  let baseEnvelopes = [...cycle.envelopes];
  const startMoment = new Date(cycle.startDate);

  if (baseEnvelopes.length !== envelopeCount) {
    if (envelopeCount === 5 && baseEnvelopes.length === 4) {
      const week5Start = new Date(startMoment);
      week5Start.setDate(week5Start.getDate() + 28);
      const week5End = new Date(week5Start);
      week5End.setDate(week5End.getDate() + 6);
      week5End.setHours(23, 59, 59, 999);

      baseEnvelopes.push({
        weekNumber: 5,
        labelEn: 'Week 5',
        labelAr: 'الأسبوع 5',
        startDate: week5Start.toISOString(),
        endDate: week5End.toISOString(),
        allocatedAmount: allocations[4] ?? 0,
        spentAmount: 0,
        remainingAmount: allocations[4] ?? 0,
        status: 'upcoming'
      });
    } else if (envelopeCount === 4 && baseEnvelopes.length === 5) {
      baseEnvelopes = baseEnvelopes.slice(0, 4);
    }
  }

  const updatedEnvelopes = baseEnvelopes.map((env, i) => {
    const allocated = allocations[i] ?? weeklyAllocation;
    const remaining = Number((allocated - env.spentAmount).toFixed(2));
    let status = env.status;
    if (status !== 'completed') {
      status = remaining < 0 ? 'overspent' : status;
    }
    return {
      ...env,
      allocatedAmount: allocated,
      remainingAmount: remaining,
      status
    };
  });

  const cycleEnd = new Date(startMoment);
  cycleEnd.setDate(cycleEnd.getDate() + (envelopeCount * 7 - 1));
  cycleEnd.setHours(23, 59, 59, 999);

  await updateCycle(cycleId, {
    totalAllowance: newAllowance,
    totalFixedCosts: totalFixed,
    variablePool,
    envelopeBudget: weeklyAllocation,
    envelopes: updatedEnvelopes,
    endDate: cycleEnd.toISOString()
  });
}

