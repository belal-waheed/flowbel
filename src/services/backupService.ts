import { z } from 'zod';
import { db, DEFAULT_USER_SETTINGS, DEFAULT_CATEGORIES } from '../db/schema';
import { DEFAULT_FIXED_OBLIGATIONS, generateInitialCycle } from '../data/defaultBudget';

export const fixedObligationSchema = z.object({
  id: z.string(),
  category: z.string(),
  titleEn: z.string(),
  titleAr: z.string(),
  amount: z.number().nonnegative(),
  dueDay: z.number().optional(),
  isPaid: z.boolean().optional()
});

export const weeklyEnvelopeSchema = z.object({
  weekNumber: z.number().min(1).max(5),
  labelEn: z.string(),
  labelAr: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  allocatedAmount: z.number().nonnegative(),
  spentAmount: z.number().nonnegative(),
  remainingAmount: z.number(),
  status: z.enum(['active', 'upcoming', 'completed', 'overspent'])
});

export const budgetCycleSchema = z.object({
  id: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  totalAllowance: z.number().nonnegative(),
  totalFixedCosts: z.number().nonnegative(),
  variablePool: z.number().nonnegative(),
  envelopeBudget: z.number().nonnegative(),
  envelopes: z.array(weeklyEnvelopeSchema),
  status: z.enum(['active', 'completed']),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const reflectionAnswersSchema = z.object({
  needVsWant: z.boolean(),
  dormantCheck: z.boolean(),
  budgetImpact: z.boolean(),
  alternativeExplored: z.boolean(),
  notes: z.string().optional()
});

export const expenseRecordSchema = z.object({
  id: z.string(),
  cycleId: z.string(),
  envelopeWeek: z.number().min(1).max(5),
  title: z.string(),
  amount: z.number().positive(),
  category: z.string(),
  state: z.enum(['draft', 'reflection_pending', 'cooling_off', 'committed', 'aborted']),
  isDiscretionary: z.boolean(),
  requiresCooling: z.boolean(),
  reflectionAnswers: reflectionAnswersSchema.optional(),
  coolingDurationHours: z.number(),
  unlocksAt: z.number().optional(),
  abortedReason: z.string().optional(),
  createdAt: z.string(),
  committedAt: z.string().optional(),
  abortedAt: z.string().optional()
});

export const userSettingsSchema = z.object({
  id: z.string(),
  currencyCode: z.string(),
  currencySymbolAr: z.string(),
  currencySymbolEn: z.string(),
  envelopeCount: z.union([z.literal(4), z.literal(5)]),
  envelopeWeights: z.array(z.number()).optional(),
  coolingThreshold: z.number().nonnegative(),
  coolingDurationHours: z.number().positive(),
  coolingEnabled: z.boolean()
});

export const customCategorySchema = z.object({
  id: z.string(),
  nameEn: z.string(),
  nameAr: z.string(),
  iconName: z.string(),
  isCustom: z.boolean().optional(),
  isArchived: z.boolean().optional()
});

export const backupPayloadSchema = z.object({
  version: z.number(),
  appName: z.literal('Flowbel'),
  exportedAt: z.string(),
  cycles: z.array(budgetCycleSchema),
  expenses: z.array(expenseRecordSchema),
  fixedObligations: z.array(fixedObligationSchema),
  settings: userSettingsSchema.optional(),
  categories: z.array(customCategorySchema).optional()
});

export type BackupPayload = z.infer<typeof backupPayloadSchema>;

export async function createBackupPayload(): Promise<BackupPayload> {
  const cycles = await db.cycles.toArray();
  const expenses = await db.expenses.toArray();
  const fixedObligations = await db.fixedObligations.toArray();
  const settings = await db.settings.get('current');
  const categories = await db.categories.toArray();

  return {
    version: 2,
    appName: 'Flowbel',
    exportedAt: new Date().toISOString(),
    cycles,
    expenses,
    fixedObligations,
    settings: settings ?? undefined,
    categories: categories.length > 0 ? categories : undefined
  };
}

export async function downloadBackupFile(): Promise<void> {
  const payload = await createBackupPayload();
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `flowbel_backup_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function restoreFromBackup(jsonString: string): Promise<{
  success: boolean;
  message: string;
  counts?: { cycles: number; expenses: number; obligations: number };
}> {
  try {
    const parsedJson = JSON.parse(jsonString);
    const result = backupPayloadSchema.safeParse(parsedJson);

    if (!result.success) {
      const issues = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
      return {
        success: false,
        message: `Validation Error: ${issues}`
      };
    }

    const validData = result.data;

    await db.transaction(
      'rw',
      [db.cycles, db.expenses, db.fixedObligations, db.settings, db.categories],
      async () => {
        await db.cycles.clear();
        await db.expenses.clear();
        await db.fixedObligations.clear();

        if (validData.cycles.length > 0) {
          await db.cycles.bulkAdd(validData.cycles);
        }
        if (validData.expenses.length > 0) {
          await db.expenses.bulkAdd(validData.expenses);
        }
        if (validData.fixedObligations.length > 0) {
          await db.fixedObligations.bulkAdd(validData.fixedObligations);
        }

        if (validData.settings) {
          await db.settings.put(validData.settings);
        }
        if (validData.categories && validData.categories.length > 0) {
          await db.categories.clear();
          await db.categories.bulkAdd(validData.categories);
        }
      }
    );

    return {
      success: true,
      message: 'Backup restored successfully',
      counts: {
        cycles: validData.cycles.length,
        expenses: validData.expenses.length,
        obligations: validData.fixedObligations.length
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error during import'
    };
  }
}

export async function resetDatabaseToDefaults(): Promise<void> {
  await db.transaction(
    'rw',
    [db.cycles, db.expenses, db.fixedObligations, db.settings, db.categories],
    async () => {
      await db.cycles.clear();
      await db.expenses.clear();
      await db.fixedObligations.clear();
      await db.settings.clear();
      await db.categories.clear();

      await db.fixedObligations.bulkAdd(DEFAULT_FIXED_OBLIGATIONS);
      await db.settings.add(DEFAULT_USER_SETTINGS);
      await db.categories.bulkAdd(DEFAULT_CATEGORIES);

      const initialCycle = generateInitialCycle(new Date());
      await db.cycles.add(initialCycle);
    }
  );
}

