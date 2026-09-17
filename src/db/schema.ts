import Dexie, { type Table } from 'dexie';
import type { BudgetCycle, FixedObligation } from '../types/finance';
import type { ExpenseRecord } from '../types/expenseFsm';
import { DEFAULT_FIXED_OBLIGATIONS, generateInitialCycle } from '../data/defaultBudget';

export class FlowbelDB extends Dexie {
  cycles!: Table<BudgetCycle, string>;
  expenses!: Table<ExpenseRecord, string>;
  fixedObligations!: Table<FixedObligation, string>;

  constructor() {
    super('FlowbelDB');
    this.version(1).stores({
      cycles: 'id, startDate, status',
      expenses: 'id, cycleId, category, state, unlocksAt, createdAt',
      fixedObligations: 'id, category'
    });

    this.on('populate', () => {
      this.fixedObligations.bulkAdd(DEFAULT_FIXED_OBLIGATIONS);
      this.cycles.add(generateInitialCycle(new Date()));
    });
  }
}

export const db = new FlowbelDB();

// Initialize and seed baseline records if empty
export async function initializeDatabase(): Promise<void> {
  try {
    await db.open();
    const fixedCount = await db.fixedObligations.count();
    if (fixedCount === 0) {
      await db.fixedObligations.bulkAdd(DEFAULT_FIXED_OBLIGATIONS);
    }

    const cycleCount = await db.cycles.count();
    if (cycleCount === 0) {
      const initialCycle = generateInitialCycle(new Date());
      await db.cycles.add(initialCycle);
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}
