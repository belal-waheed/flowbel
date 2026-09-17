import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../schema';
import type { ExpenseRecord } from '../../types/expenseFsm';

/**
 * Direct async query for an expense record by its ID.
 */
export async function getExpenseById(id: string): Promise<ExpenseRecord | undefined> {
  return db.expenses.get(id);
}

/**
 * Direct async query for expenses belonging to a specific cycle.
 */
export async function getExpensesByCycle(cycleId: string): Promise<ExpenseRecord[]> {
  return db.expenses.where('cycleId').equals(cycleId).toArray();
}

/**
 * Direct async query for all expenses currently in cooling_off state.
 */
export async function getCoolingExpenses(): Promise<ExpenseRecord[]> {
  return db.expenses.where('state').equals('cooling_off').toArray();
}

/**
 * Reactive hook subscribing to expenses for a specific cycle (or all if not specified).
 */
export function useExpensesByCycle(cycleId?: string): ExpenseRecord[] {
  return useLiveQuery(
    () => {
      if (cycleId) {
        return db.expenses.where('cycleId').equals(cycleId).reverse().sortBy('createdAt');
      }
      return db.expenses.orderBy('createdAt').reverse().toArray();
    },
    [cycleId],
    []
  );
}

/**
 * Reactive hook subscribing to all expenses ordered by creation date descending.
 */
export function useAllExpenses(): ExpenseRecord[] {
  return useLiveQuery(
    () => db.expenses.orderBy('createdAt').reverse().toArray(),
    [],
    []
  );
}

/**
 * Reactive hook subscribing to all active 24-hour cooling timers.
 */
export function useCoolingTimers(): ExpenseRecord[] {
  return useLiveQuery(
    () => db.expenses.where('state').equals('cooling_off').toArray(),
    [],
    []
  );
}

/**
 * Inserts a raw expense record into IndexedDB.
 */
export async function addExpenseRecord(record: ExpenseRecord): Promise<string> {
  return db.expenses.add(record);
}

/**
 * Updates an existing expense record.
 */
export async function updateExpenseRecord(id: string, changes: Partial<ExpenseRecord>): Promise<number> {
  return db.expenses.update(id, changes);
}

/**
 * Deletes an expense record by ID.
 */
export async function deleteExpenseRecord(id: string): Promise<void> {
  return db.expenses.delete(id);
}
