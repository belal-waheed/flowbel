import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useUserSettings } from '../../db/repositories/settingsRepository';
import { Calendar, Wallet, Shield, Flame, TrendingUp } from 'lucide-react';
import type { BudgetCycle } from '../../types/finance';

interface CycleHeaderProps {
  cycle: BudgetCycle | undefined;
}

export const CycleHeader: React.FC<CycleHeaderProps> = ({ cycle }) => {
  const { t, lang } = useLanguage();
  const settings = useUserSettings();

  if (!cycle) {
    return (
      <div className="rounded-2xl border border-surface-border bg-surface-card p-6 text-center text-text-muted shadow-xs">
        Loading cycle data...
      </div>
    );
  }

  const now = new Date();
  const startDate = new Date(cycle.startDate);
  const endDate = new Date(cycle.endDate);

  const totalCycleDays = (cycle.envelopes.length || 4) * 7;
  const elapsedMs = Math.max(0, now.getTime() - startDate.getTime());
  const currentDayIndex = Math.min(totalCycleDays, Math.floor(elapsedMs / (24 * 60 * 60 * 1000)) + 1);
  const daysLeftInCycle = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)));

  // Total committed variable expenses across all weeks
  const committedExpenses = cycle.envelopes.reduce((acc, env) => acc + env.spentAmount, 0);
  const variableRemaining = Math.max(0, cycle.totalAllowance - cycle.totalFixedCosts - committedExpenses);
  const safeDailyBurn = Number((variableRemaining / Math.max(1, daysLeftInCycle)).toFixed(1));
  const currencySymbol = lang === 'ar' ? settings.currencySymbolAr : settings.currencySymbolEn;

  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* Primary Cycle Banner */}
      <div className="rounded-2xl border border-surface-border bg-surface-card p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-subtle border border-brand/20 text-brand">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-brand uppercase tracking-wider">
                {t.dashboard.cycleTitle}
              </span>
              <p className="text-sm font-medium text-text-secondary">
                {formatDate(cycle.startDate)} — {formatDate(cycle.endDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-surface-sunken px-3.5 py-1.5 border border-surface-border text-xs">
            <span className="font-semibold text-text-primary">
              {t.dashboard.dayNumber} {currentDayIndex} / {totalCycleDays}
            </span>
            <span className="text-text-muted">•</span>
            <span className="text-text-secondary">
              {daysLeftInCycle} {t.dashboard.daysLeft}
            </span>
          </div>
        </div>

        {/* 4-Stat Metric Cards */}
        <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
          {/* 1. Total Allowance */}
          <div className="rounded-xl border border-surface-border bg-surface-sunken p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-text-muted mb-1">
              <Wallet className="h-3.5 w-3.5 text-text-muted" />
              <span>{t.dashboard.allowance}</span>
            </div>
            <p className="text-lg font-bold text-text-primary">
              {cycle.totalAllowance.toLocaleString()} <span className="text-xs font-medium text-text-muted">{currencySymbol}</span>
            </p>
          </div>

          {/* 2. Fixed Obligations */}
          <div className="rounded-xl border border-surface-border bg-surface-sunken p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-text-muted mb-1">
              <Shield className="h-3.5 w-3.5 text-text-muted" />
              <span>{t.dashboard.fixedCommitted}</span>
            </div>
            <p className="text-lg font-bold text-text-primary">
              {cycle.totalFixedCosts.toLocaleString()} <span className="text-xs font-medium text-text-muted">{currencySymbol}</span>
            </p>
          </div>

          {/* 3. Variable Pool Remaining */}
          <div className="rounded-xl border border-surface-border bg-surface-sunken p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-brand mb-1">
              <TrendingUp className="h-3.5 w-3.5 text-brand" />
              <span className="text-text-secondary font-medium">{t.dashboard.variablePool}</span>
            </div>
            <p className="text-lg font-bold text-brand">
              {variableRemaining.toLocaleString()} <span className="text-xs font-medium text-text-muted">{currencySymbol}</span>
            </p>
          </div>

          {/* 4. Safe Daily Burn */}
          <div className="rounded-xl border border-surface-border bg-surface-sunken p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-guardrail-cooling mb-1">
              <Flame className="h-3.5 w-3.5 text-guardrail-cooling" />
              <span className="text-text-secondary font-medium">{t.dashboard.safeDailyBurn}</span>
            </div>
            <p className="text-lg font-bold text-guardrail-cooling">
              {safeDailyBurn} <span className="text-xs font-medium text-text-muted">{currencySymbol} {t.dashboard.perDay}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

