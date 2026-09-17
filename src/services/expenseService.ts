import type {
  ExpenseCategory,
  ExpenseRecord,
  ExpenseState,
  ReflectionAnswers
} from '../types/expenseFsm';
import {
  COOLING_THRESHOLD_EGP,
  COOLING_PERIOD_HOURS,
  DISCRETIONARY_CATEGORIES
} from '../types/expenseFsm';
import {
  getExpenseById,
  addExpenseRecord,
  updateExpenseRecord,
  deleteExpenseRecord,
  getExpensesByCycle
} from '../db/repositories/expenseRepository';
import {
  getCycleById,
  updateCycle
} from '../db/repositories/cycleRepository';
import { db } from '../db/schema';
import { notificationService } from './native/notificationService';
import { computeEnvelopeLedgers } from './cycleService';

/**
 * Checks if a category is considered discretionary / non-essential.
 */
export function isDiscretionaryCategory(category: ExpenseCategory): boolean {
  return DISCRETIONARY_CATEGORIES.includes(category);
}

/**
 * Evaluates whether an expense triggers mandatory reflection and cooling off.
 */
export function evaluateExpenseRequirements(
  amount: number,
  category: ExpenseCategory,
  settings?: {
    coolingThreshold?: number;
    coolingDurationHours?: number;
    coolingEnabled?: boolean;
  }
): {
  isDiscretionary: boolean;
  requiresCooling: boolean;
} {
  const isDiscretionary = isDiscretionaryCategory(category);
  const enabled = settings?.coolingEnabled ?? true;
  const threshold = settings?.coolingThreshold ?? COOLING_THRESHOLD_EGP;
  const requiresCooling = enabled && isDiscretionary && amount > threshold;
  return { isDiscretionary, requiresCooling };
}

/**
 * Creates an expense record and saves it to IndexedDB.
 */
export async function createExpense(params: {
  cycleId: string;
  envelopeWeek: number;
  title: string;
  amount: number;
  category: ExpenseCategory;
  reflectionAnswers?: ReflectionAnswers;
  coolingThreshold?: number;
  coolingDurationHours?: number;
  coolingEnabled?: boolean;
}): Promise<ExpenseRecord> {
  const { isDiscretionary, requiresCooling } = evaluateExpenseRequirements(
    params.amount,
    params.category,
    {
      coolingThreshold: params.coolingThreshold,
      coolingDurationHours: params.coolingDurationHours,
      coolingEnabled: params.coolingEnabled
    }
  );

  const durationHours = params.coolingDurationHours ?? COOLING_PERIOD_HOURS;
  let state: ExpenseState = 'committed';
  let unlocksAt: number | undefined = undefined;

  if (requiresCooling) {
    if (params.reflectionAnswers) {
      // Reflection already provided; enter cooling-off
      state = 'cooling_off';
      unlocksAt = Date.now() + durationHours * 60 * 60 * 1000;
    } else {
      // Must complete reflection first
      state = 'reflection_pending';
    }
  }

  const record: ExpenseRecord = {
    id: `exp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    cycleId: params.cycleId,
    envelopeWeek: params.envelopeWeek,
    title: params.title.trim(),
    amount: Number(params.amount.toFixed(2)),
    category: params.category,
    state,
    isDiscretionary,
    requiresCooling,
    reflectionAnswers: params.reflectionAnswers,
    coolingDurationHours: durationHours,
    unlocksAt,
    createdAt: new Date().toISOString(),
    committedAt: state === 'committed' ? new Date().toISOString() : undefined
  };

  await addExpenseRecord(record);

  if (state === 'committed') {
    await syncCycleEnvelopes(params.cycleId);
  }

  if (state === 'cooling_off' && unlocksAt) {
    await notificationService.scheduleCoolingUnlockNotification(
      record.id,
      'Cooling-Off Period Complete',
      `You can now review your planned expense of ${record.amount} EGP.`,
      unlocksAt
    );
  }

  return record;
}

/**
 * Submits reflection answers for a pending expense, transitioning it to cooling_off.
 */
export async function submitExpenseReflection(
  expenseId: string,
  reflection: ReflectionAnswers
): Promise<ExpenseRecord> {
  const record = await getExpenseById(expenseId);
  if (!record) {
    throw new Error(`Expense ${expenseId} not found`);
  }

  const unlocksAt = Date.now() + record.coolingDurationHours * 60 * 60 * 1000;

  await updateExpenseRecord(expenseId, {
    reflectionAnswers: reflection,
    state: 'cooling_off',
    unlocksAt
  });

  await notificationService.scheduleCoolingUnlockNotification(
    expenseId,
    'Cooling-Off Period Complete',
    `You can now review your planned expense of ${record.amount} EGP.`,
    unlocksAt
  );

  return {
    ...record,
    reflectionAnswers: reflection,
    state: 'cooling_off',
    unlocksAt
  };
}

/**
 * Commits a cooling or draft expense. Strictly enforces unlocksAt timestamp.
 */
export async function commitExpense(expenseId: string): Promise<ExpenseRecord> {
  const record = await getExpenseById(expenseId);
  if (!record) {
    throw new Error(`Expense ${expenseId} not found`);
  }

  if (record.state === 'cooling_off' && record.unlocksAt) {
    if (Date.now() < record.unlocksAt) {
      const remainingMinutes = Math.ceil((record.unlocksAt - Date.now()) / (60 * 1000));
      throw new Error(
        `Cooling-off lock active. Cannot commit for another ${remainingMinutes} minute(s).`
      );
    }
  }

  const committedAt = new Date().toISOString();
  await updateExpenseRecord(expenseId, {
    state: 'committed',
    committedAt
  });

  await syncCycleEnvelopes(record.cycleId);

  return {
    ...record,
    state: 'committed',
    committedAt
  };
}

/**
 * Aborts an expense, celebrating saving money.
 */
export async function abortExpense(expenseId: string, reason?: string): Promise<ExpenseRecord> {
  const record = await getExpenseById(expenseId);
  if (!record) {
    throw new Error(`Expense ${expenseId} not found`);
  }

  const abortedAt = new Date().toISOString();
  await updateExpenseRecord(expenseId, {
    state: 'aborted',
    abortedReason: reason || 'Mindful decision to protect budget',
    abortedAt
  });

  // If it was committed previously, sync cycle envelopes to restore funds
  if (record.state === 'committed') {
    await syncCycleEnvelopes(record.cycleId);
  }

  return {
    ...record,
    state: 'aborted',
    abortedReason: reason,
    abortedAt
  };
}

/**
 * Permanently deletes an expense record.
 */
export async function deleteExpense(expenseId: string): Promise<void> {
  const record = await getExpenseById(expenseId);
  if (!record) return;

  await deleteExpenseRecord(expenseId);

  if (record.state === 'committed') {
    await syncCycleEnvelopes(record.cycleId);
  }
}

/**
 * Internal helper to keep cycle envelopes synchronized with database transactions.
 */
async function syncCycleEnvelopes(cycleId: string): Promise<void> {
  const cycle = await getCycleById(cycleId);
  if (!cycle) return;

  const expenses = await getExpensesByCycle(cycleId);
  const updatedCycle = computeEnvelopeLedgers(cycle, expenses);
  await updateCycle(cycleId, {
    envelopes: updatedCycle.envelopes
  });
}

/**
 * Atomically persists multiple expenses and updates envelope allocations within a single Dexie transaction.
 */
export async function createBatchExpenses(
  cycleId: string,
  items: Array<{
    amount: number;
    category: string;
    envelopeWeek: number;
    note?: string;
    isDiscretionary?: boolean;
    createdAt?: string;
  }>,
  coolingRules?: { threshold: number; durationHours: number; enabled: boolean }
): Promise<{ count: number; coolingCount: number }> {
  if (!items.length) {
    return { count: 0, coolingCount: 0 };
  }

  const threshold = coolingRules?.threshold ?? COOLING_THRESHOLD_EGP;
  const durationHours = coolingRules?.durationHours ?? COOLING_PERIOD_HOURS;
  const enabled = coolingRules?.enabled ?? true;

  const records: ExpenseRecord[] = [];
  const coolingRecords: ExpenseRecord[] = [];

  items.forEach((item, idx) => {
    const isDiscretionary =
      item.isDiscretionary !== undefined
        ? item.isDiscretionary
        : isDiscretionaryCategory(item.category as ExpenseCategory);

    const requiresCooling = enabled && isDiscretionary && item.amount > threshold;
    const state: ExpenseState = requiresCooling ? 'cooling_off' : 'committed';
    const unlocksAt = requiresCooling
      ? Date.now() + durationHours * 60 * 60 * 1000
      : undefined;

    const recordId = `exp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}_${idx}`;
    const record: ExpenseRecord = {
      id: recordId,
      cycleId,
      envelopeWeek: item.envelopeWeek,
      title: item.note?.trim() || 'Expense',
      amount: Number(item.amount.toFixed(2)),
      category: item.category as ExpenseCategory,
      state,
      isDiscretionary,
      requiresCooling,
      coolingDurationHours: durationHours,
      unlocksAt,
      createdAt: item.createdAt || new Date().toISOString(),
      committedAt: state === 'committed' ? new Date().toISOString() : undefined
    };

    records.push(record);
    if (state === 'cooling_off') {
      coolingRecords.push(record);
    }
  });

  await db.transaction('rw', [db.expenses, db.cycles], async () => {
    await db.expenses.bulkAdd(records);

    const cycle = await db.cycles.get(cycleId);
    if (cycle) {
      const allCycleExpenses = await db.expenses.where('cycleId').equals(cycleId).toArray();
      const updatedCycle = computeEnvelopeLedgers(cycle, allCycleExpenses);
      await db.cycles.update(cycleId, {
        envelopes: updatedCycle.envelopes,
        updatedAt: new Date().toISOString()
      });
    }
  });

  for (const rec of coolingRecords) {
    if (rec.unlocksAt) {
      await notificationService.scheduleCoolingUnlockNotification(
        rec.id,
        'Cooling-Off Period Complete',
        `You can now review your planned expense of ${rec.amount} EGP.`,
        rec.unlocksAt
      );
    }
  }

  return {
    count: records.length,
    coolingCount: coolingRecords.length
  };
}

