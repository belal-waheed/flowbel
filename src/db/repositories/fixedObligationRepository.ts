import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../schema';
import type { FixedObligation } from '../../types/finance';

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
 * Partially updates a fixed obligation record.
 */
export async function updateObligation(id: string, changes: Partial<FixedObligation>): Promise<number> {
  return db.fixedObligations.update(id, changes);
}

/**
 * Seeds or adds multiple fixed obligations in bulk.
 */
export async function addFixedObligations(obligations: FixedObligation[]): Promise<string> {
  return db.fixedObligations.bulkAdd(obligations);
}
