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
}

/**
 * Pure domain function to calculate the variable pool and 4-week envelope allocations.
 */
export function calculateEnvelopes(allowance: number, fixedTotal: number): EnvelopeCalculation {
  const variablePool = Math.max(0, allowance - fixedTotal);
  const weeklyAllocation = Number((variablePool / 4).toFixed(2));
  return { variablePool, weeklyAllocation };
}

/**
 * Determines which week (1 to 4) a date falls within for a given cycle.
 */
export function getCycleWeekForDate(cycle: BudgetCycle, targetDate: Date = new Date()): number {
  const targetTime = targetDate.getTime();
  const startTime = new Date(cycle.startDate).getTime();

  const diffDays = Math.floor((targetTime - startTime) / (24 * 60 * 60 * 1000));
  if (diffDays < 0) return 1;
  const weekIndex = Math.floor(diffDays / 7) + 1;
  return Math.min(Math.max(weekIndex, 1), 4);
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
  fixedCosts: FixedObligation[]
): Promise<BudgetCycle> {
  // Mark any currently active cycle as completed
  await completeActiveCycles();

  const newCycle = generateInitialCycle(payday, allowance, fixedCosts);
  await createCycle(newCycle);
  return newCycle;
}

/**
 * Updates allowance or fixed costs for the currently active cycle.
 */
export async function updateActiveCycleSettings(
  cycleId: string,
  newAllowance: number,
  fixedCosts: FixedObligation[]
): Promise<void> {
  const cycle = await getCycleById(cycleId);
  if (!cycle) return;

  const totalFixed = calculateTotalFixedCosts(fixedCosts);
  const { variablePool, weeklyAllocation } = calculateEnvelopes(newAllowance, totalFixed);

  const updatedEnvelopes = cycle.envelopes.map((env) => ({
    ...env,
    allocatedAmount: weeklyAllocation,
    remainingAmount: Number((weeklyAllocation - env.spentAmount).toFixed(2)),
    status: (weeklyAllocation - env.spentAmount < 0 ? 'overspent' : env.status) as WeeklyEnvelope['status']
  }));

  await updateCycle(cycleId, {
    totalAllowance: newAllowance,
    totalFixedCosts: totalFixed,
    variablePool,
    envelopeBudget: weeklyAllocation,
    envelopes: updatedEnvelopes
  });
}
