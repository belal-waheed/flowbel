import Dexie, { type Table } from 'dexie';
import type { BudgetCycle, FixedObligation, UserSettings, CustomCategory } from '../types/finance';
import type { ExpenseRecord } from '../types/expenseFsm';

export const DEFAULT_USER_SETTINGS: UserSettings = {
  id: 'current',
  currencyCode: 'EGP',
  currencySymbolAr: 'ج.م',
  currencySymbolEn: 'EGP',
  envelopeCount: 4,
  envelopeWeights: [0.25, 0.25, 0.25, 0.25],
  coolingThreshold: 150,
  coolingDurationHours: 24,
  coolingEnabled: true,
  isOnboarded: false,
  hasSeenTour: false,
};

export const DEFAULT_CATEGORIES: CustomCategory[] = [
  { id: 'groceries', nameEn: 'Groceries & Food', nameAr: 'بقالة ومأكولات', iconName: 'ShoppingBag', isCustom: false, isArchived: false },
  { id: 'transit', nameEn: 'Transit & Mobility', nameAr: 'مواصلات وانتقالات', iconName: 'Bus', isCustom: false, isArchived: false },
  { id: 'study', nameEn: 'Study & Academics', nameAr: 'دراسة ومراجع', iconName: 'GraduationCap', isCustom: false, isArchived: false },
  { id: 'dining', nameEn: 'Dining & Cafes', nameAr: 'مطاعم ومقاهي', iconName: 'Utensils', isCustom: false, isArchived: false },
  { id: 'tech', nameEn: 'Tech & Subscriptions', nameAr: 'أدوات واشتراكات تقنية', iconName: 'Smartphone', isCustom: false, isArchived: false },
  { id: 'leisure', nameEn: 'Leisure & Hobbies', nameAr: 'هوايات وترفيه', iconName: 'Tv', isCustom: false, isArchived: false },
  { id: 'emergency', nameEn: 'Emergency & Health', nameAr: 'طوارئ وصحة', iconName: 'ShieldAlert', isCustom: false, isArchived: false },
  { id: 'discretionary', nameEn: 'Discretionary', nameAr: 'شراء استثنائي', iconName: 'Sparkles', isCustom: false, isArchived: false },
  { id: 'other', nameEn: 'Other Miscellaneous', nameAr: 'نفقات متنوعة', iconName: 'Tag', isCustom: false, isArchived: false },
];

export class FlowbelDB extends Dexie {
  cycles!: Table<BudgetCycle, string>;
  expenses!: Table<ExpenseRecord, string>;
  fixedObligations!: Table<FixedObligation, string>;
  settings!: Table<UserSettings, string>;
  categories!: Table<CustomCategory, string>;

  constructor() {
    super('FlowbelDB');
    this.version(1).stores({
      cycles: 'id, startDate, status',
      expenses: 'id, cycleId, category, state, unlocksAt, createdAt',
      fixedObligations: 'id, category'
    });

    this.version(2).stores({
      cycles: 'id, startDate, status',
      expenses: 'id, cycleId, category, state, unlocksAt, createdAt',
      fixedObligations: 'id, category',
      settings: 'id',
      categories: 'id, isArchived'
    });

    this.on('populate', () => {
      this.settings.add(DEFAULT_USER_SETTINGS);
      this.categories.bulkAdd(DEFAULT_CATEGORIES);
    });
  }
}

export const db = new FlowbelDB();

// Initialize and seed baseline records if empty (zero-hardcoded data model)
export async function initializeDatabase(): Promise<void> {
  try {
    await db.open();

    const settingsCount = await db.settings.count();
    if (settingsCount === 0) {
      await db.settings.add(DEFAULT_USER_SETTINGS);
    } else {
      // Ensure existing settings have onboarding flags if upgrading from previous versions
      const current = await db.settings.get('current');
      if (current && current.isOnboarded === undefined) {
        const cycleCount = await db.cycles.count();
        await db.settings.update('current', {
          isOnboarded: cycleCount > 0,
          hasSeenTour: cycleCount > 0
        });
      }
    }

    const categoriesCount = await db.categories.count();
    if (categoriesCount === 0) {
      await db.categories.bulkAdd(DEFAULT_CATEGORIES);
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}
