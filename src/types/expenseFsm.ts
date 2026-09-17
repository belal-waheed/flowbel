export type ExpenseCategory =
  | 'groceries'
  | 'transit'
  | 'study'
  | 'dining'
  | 'tech'
  | 'leisure'
  | 'emergency'
  | 'discretionary'
  | 'other';

export type ExpenseState =
  | 'draft'
  | 'reflection_pending'
  | 'cooling_off'
  | 'committed'
  | 'aborted';

export interface ReflectionAnswers {
  needVsWant: boolean; // True if confirmed to be a fundamental need rather than a fleeting want
  dormantCheck: boolean; // True if verified it will still be actively utilized in 30 days
  budgetImpact: boolean; // True if verified weekly envelope can comfortably absorb it
  alternativeExplored: boolean; // True if cheaper/free alternative was researched first
  notes?: string;
}

export interface ExpenseRecord {
  id: string;
  cycleId: string;
  envelopeWeek: number; // 1 to 4
  title: string;
  amount: number;
  category: ExpenseCategory;
  state: ExpenseState;
  isDiscretionary: boolean;
  requiresCooling: boolean;
  reflectionAnswers?: ReflectionAnswers;
  coolingDurationHours: number; // default 24
  unlocksAt?: number; // Immutable UTC millisecond timestamp
  abortedReason?: string;
  createdAt: string; // ISO string
  committedAt?: string; // ISO string
  abortedAt?: string; // ISO string
}

export const COOLING_THRESHOLD_EGP = 150;
export const COOLING_PERIOD_HOURS = 24;

export const DISCRETIONARY_CATEGORIES: ReadonlyArray<ExpenseCategory> = [
  'discretionary',
  'dining',
  'tech',
  'leisure',
  'other'
];
