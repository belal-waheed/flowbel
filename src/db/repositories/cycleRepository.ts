import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../schema';
import type { BudgetCycle } from '../../types/finance';

/**
 * Direct async query for the active budget cycle.
 */
export async function getActiveCycle(): Promise<BudgetCycle | undefined> {
  return db.cycles.where('status').equals('active').first();
}

/**
 * Reactive hook subscribing to the active budget cycle.
 */
export function useActiveCycle(): BudgetCycle | undefined {
  return useLiveQuery(
    () => db.cycles.where('status').equals('active').first(),
    [],
    undefined
  );
}

/**
 * Direct async query for a cycle by its primary identifier.
 */
export async function getCycleById(id: string): Promise<BudgetCycle | undefined> {
  return db.cycles.get(id);
}

/**
 * Retrieves all cycles historically recorded.
 */
export async function getAllCycles(): Promise<BudgetCycle[]> {
  return db.cycles.toArray();
}

/**
 * Persists a new budget cycle record.
 */
export async function createCycle(cycle: BudgetCycle): Promise<string> {
  return db.cycles.add(cycle);
}

/**
 * Applies partial updates to an existing cycle.
 */
export async function updateCycle(id: string, changes: Partial<BudgetCycle>): Promise<number> {
  return db.cycles.update(id, {
    ...changes,
    updatedAt: new Date().toISOString()
  });
}

/**
 * Marks all currently active cycles as completed.
 */
export async function completeActiveCycles(): Promise<void> {
  const activeCycles = await db.cycles.where('status').equals('active').toArray();
  const now = new Date().toISOString();
  for (const c of activeCycles) {
    await db.cycles.update(c.id, { status: 'completed', updatedAt: now });
  }
}

/**
 * Shifts the payday anchor date for an active cycle, re-anchoring its 28-day window and weekly envelopes.
 */
export async function shiftPayday(cycleId: string, newStartDate: Date): Promise<void> {
  const cycle = await db.cycles.get(cycleId);
  if (!cycle) return;

  const startMoment = new Date(newStartDate);
  startMoment.setHours(0, 0, 0, 0);

  const cycleEnd = new Date(startMoment);
  cycleEnd.setDate(cycleEnd.getDate() + 27);
  cycleEnd.setHours(23, 59, 59, 999);

  const updatedEnvelopes = cycle.envelopes.map((env, i) => {
    const weekStart = new Date(startMoment);
    weekStart.setDate(weekStart.getDate() + i * 7);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const now = new Date();
    let status = env.status;
    if (now >= weekStart && now <= weekEnd) {
      status = env.remainingAmount < 0 ? 'overspent' : 'active';
    } else if (now > weekEnd) {
      status = env.remainingAmount < 0 ? 'overspent' : 'completed';
    } else {
      status = 'upcoming';
    }

    return {
      ...env,
      startDate: weekStart.toISOString(),
      endDate: weekEnd.toISOString(),
      status
    };
  });

  await db.cycles.update(cycleId, {
    startDate: startMoment.toISOString(),
    endDate: cycleEnd.toISOString(),
    envelopes: updatedEnvelopes,
    updatedAt: new Date().toISOString()
  });
}
