export type ObligationCategory =
  | 'housing'
  | 'connectivity'
  | 'travel'
  | 'transit'
  | 'fitness'
  | 'personal'
  | 'academic';

export interface FixedObligation {
  id: string;
  category: ObligationCategory;
  titleEn: string;
  titleAr: string;
  amount: number;
  dueDay?: number;
  isPaid?: boolean;
}

export type EnvelopeStatus = 'active' | 'upcoming' | 'completed' | 'overspent';

export interface WeeklyEnvelope {
  weekNumber: number; // 1, 2, 3, 4
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
  endDate: string; // ISO string (28 days later)
  totalAllowance: number;
  totalFixedCosts: number;
  variablePool: number;
  envelopeBudget: number;
  envelopes: WeeklyEnvelope[];
  status: CycleStatus;
  createdAt: string;
  updatedAt: string;
}
