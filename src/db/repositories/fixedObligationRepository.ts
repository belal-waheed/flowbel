import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../schema';
import type { FixedObligation } from '../../types/finance';
import { calculateEnvelopes } from '../../services/cycleService';

/**
 * Recalculates total fixed costs and envelope allocations for the active cycle.
 */
async function syncActiveCycleWithObligations(): Promise<void> {
  const activeCycle = await db.cycles.where('status').equals('active').first();
  if (!activeCycle) return;

  const obligations = await db.fixedObligations.toArray();
  const settings = await db.settings.get('current');
  const envelopeCount = settings?.envelopeCount ?? (activeCycle.envelopes.length === 5 ? 5 : 4);
  const weights = settings?.envelopeWeights;

  const totalFixed = obligations.reduce((acc, curr) => acc + curr.amount, 0);
  const { variablePool, weeklyAllocation, allocations } = calculateEnvelopes(
    activeCycle.totalAllowance,
    totalFixed,
    envelopeCount,
    weights
  );

  const updatedEnvelopes = activeCycle.envelopes.map((env, i) => {
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

  await db.cycles.update(activeCycle.id, {
    totalFixedCosts: totalFixed,
    variablePool,
    envelopeBudget: weeklyAllocation,
    envelopes: updatedEnvelopes,
    updatedAt: new Date().toISOString()
  });
}

/**
 * Direct async query for all fixed obligations.
 */
export async function getFixedObligations(): Promise<FixedObligation[]> {
  return db.fixedObligations.toArray();
}

/**
 * Reactive hook subscribing to all fixed obligations.
 */
export function useFixedObligations(): FixedObligation[] {
  return useLiveQuery(
    () => db.fixedObligations.toArray(),
    [],
    []
  );
}

/**
 * Toggles or explicitly updates the paid status of a fixed obligation.
 */
export async function toggleObligationPaidStatus(id: string, currentStatus?: boolean): Promise<number> {
  return db.fixedObligations.update(id, { isPaid: !currentStatus });
}

/**
 * Partially updates a fixed obligation record and synchronizes active cycle if amount changed.
 */
export async function updateFixedObligation(id: string, changes: Partial<FixedObligation>): Promise<number> {
  const res = await db.fixedObligations.update(id, changes);
  if ('amount' in changes) {
    await syncActiveCycleWithObligations();
  }
  return res;
}

export const updateObligation = updateFixedObligation;

/**
 * Adds a new fixed obligation and synchronizes the active cycle.
 */
export async function addFixedObligation(
  obligation: Omit<FixedObligation, 'id'> & { id?: string }
): Promise<string> {
  const id =
    obligation.id ||
    `fix_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const record: FixedObligation = {
    ...obligation,
    id,
    isPaid: obligation.isPaid ?? false
  };
  await db.fixedObligations.put(record);
  await syncActiveCycleWithObligations();
  return id;
}

/**
 * Deletes a fixed obligation and recalculates active cycle.
 */
export async function deleteFixedObligation(id: string): Promise<void> {
  await db.fixedObligations.delete(id);
  await syncActiveCycleWithObligations();
}

/**
 * Seeds or adds multiple fixed obligations in bulk.
 */
export async function addFixedObligations(obligations: FixedObligation[]): Promise<string> {
  const res = await db.fixedObligations.bulkAdd(obligations);
  await syncActiveCycleWithObligations();
  return res;
}

