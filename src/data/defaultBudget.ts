import type { FixedObligation, BudgetCycle, WeeklyEnvelope } from '../types/finance';
import { calculateEnvelopes } from '../services/cycleService';

export const DEFAULT_ALLOWANCE_EGP = 6800;

export const DEFAULT_FIXED_OBLIGATIONS: FixedObligation[] = [
  {
    id: 'fix_rent',
    category: 'housing',
    titleEn: 'Apartment Rent',
    titleAr: 'إيجار السكن',
    amount: 1500,
    dueDay: 1,
    isPaid: false
  },
  {
    id: 'fix_wifi',
    category: 'connectivity',
    titleEn: 'Home Internet (VDSL/Fiber)',
    titleAr: 'اشتراك الإنترنت المنزلي',
    amount: 300,
    dueDay: 5,
    isPaid: false
  },
  {
    id: 'fix_travel',
    category: 'travel',
    titleEn: 'Family Visit & Intercity Travel',
    titleAr: 'سفر وزيارة الأهل',
    amount: 250,
    dueDay: 15,
    isPaid: false
  },
  {
    id: 'fix_transit',
    category: 'transit',
    titleEn: 'Monthly Local Transit (Metro / Bus)',
    titleAr: 'مواصلات يومية ومترو',
    amount: 500,
    dueDay: 1,
    isPaid: false
  },
  {
    id: 'fix_gym',
    category: 'fitness',
    titleEn: 'Gym Membership',
    titleAr: 'اشتراك الجيم واللياقة',
    amount: 300,
    dueDay: 10,
    isPaid: false
  },
  {
    id: 'fix_coffee',
    category: 'personal',
    titleEn: 'Home Coffee Beans Supply (بُن)',
    titleAr: 'مخصص البُن المنزلي',
    amount: 300,
    dueDay: 1,
    isPaid: false
  }
];

export const calculateTotalFixedCosts = (obligations: FixedObligation[]): number => {
  return obligations.reduce((acc, curr) => acc + curr.amount, 0);
};

export const generateInitialCycle = (
  startDate: Date = new Date(),
  allowance: number = DEFAULT_ALLOWANCE_EGP,
  fixedCosts: FixedObligation[] = DEFAULT_FIXED_OBLIGATIONS
): BudgetCycle => {
  const totalFixed = calculateTotalFixedCosts(fixedCosts);
  const { variablePool, weeklyAllocation } = calculateEnvelopes(allowance, totalFixed);

  const envelopes: WeeklyEnvelope[] = [];
  const startMoment = new Date(startDate);
  startMoment.setHours(0, 0, 0, 0);

  for (let i = 0; i < 4; i++) {
    const weekStart = new Date(startMoment);
    weekStart.setDate(weekStart.getDate() + i * 7);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const now = new Date();
    let status: WeeklyEnvelope['status'] = 'upcoming';
    if (now >= weekStart && now <= weekEnd) {
      status = 'active';
    } else if (now > weekEnd) {
      status = 'completed';
    }

    envelopes.push({
      weekNumber: i + 1,
      labelEn: `Week ${i + 1}`,
      labelAr: `الأسبوع ${i + 1}`,
      startDate: weekStart.toISOString(),
      endDate: weekEnd.toISOString(),
      allocatedAmount: weeklyAllocation,
      spentAmount: 0,
      remainingAmount: weeklyAllocation,
      status
    });
  }

  // Ensure at least week 1 is active if current date is before start date
  if (!envelopes.some((e) => e.status === 'active')) {
    envelopes[0].status = 'active';
  }

  const cycleEnd = new Date(startMoment);
  cycleEnd.setDate(cycleEnd.getDate() + 27);
  cycleEnd.setHours(23, 59, 59, 999);

  return {
    id: `cycle_${startMoment.getTime()}`,
    startDate: startMoment.toISOString(),
    endDate: cycleEnd.toISOString(),
    totalAllowance: allowance,
    totalFixedCosts: totalFixed,
    variablePool,
    envelopeBudget: weeklyAllocation,
    envelopes,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};
