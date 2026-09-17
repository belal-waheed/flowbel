export type ObligationCategory =
  | 'housing'
  | 'connectivity'
  | 'travel'
  | 'transit'
  | 'fitness'
  | 'personal'
  | 'academic'
  | string;

export interface FixedObligation {
  id: string;
  category: string;
  titleEn: string;
  titleAr: string;
  amount: number;
  dueDay?: number;
  isPaid?: boolean;
}

export interface UserSettings {
  id: string; // 'current'
  currencyCode: string; // 'EGP', 'USD', 'EUR', 'SAR', 'AED', or custom
  currencySymbolAr: string; // 'ج.م'
  currencySymbolEn: string; // 'EGP'
  envelopeCount: 4 | 5;
  envelopeWeights?: number[]; // Normalized weights [0.25, 0.25, 0.25, 0.25]
  coolingThreshold: number; // default 150
  coolingDurationHours: number; // default 24
  coolingEnabled: boolean; // default true
}

export interface CustomCategory {
  id: string;
  nameEn: string;
  nameAr: string;
  iconName: string;
  isCustom?: boolean;
  isArchived?: boolean;
}

export type EnvelopeStatus = 'active' | 'upcoming' | 'completed' | 'overspent';

export interface WeeklyEnvelope {
  weekNumber: number; // 1..5
  labelEn: string;
  labelAr: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  status: EnvelopeStatus;
}

export type CycleStatus = 'active' | 'completed';

export interface BudgetCycle {
  id: string;
  startDate: string; // ISO string (Payday anchor)
  endDate: string; // ISO string (28 or 35 days later)
  totalAllowance: number;
  totalFixedCosts: number;
  variablePool: number;
  envelopeBudget: number;
  envelopes: WeeklyEnvelope[];
  status: CycleStatus;
  createdAt: string;
  updatedAt: string;
}

