import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useUserSettings } from '../../db/repositories/settingsRepository';
import type { BudgetCycle } from '../../types/finance';
import { AlertTriangle, Plus } from 'lucide-react';
import { getStatusBadge } from '../../utils/badgeHelpers';

interface WeeklyEnvelopesProps {
  cycle: BudgetCycle | undefined;
  onOpenLogModal: (defaultWeek?: number) => void;
}

export const WeeklyEnvelopes: React.FC<WeeklyEnvelopesProps> = ({ cycle, onOpenLogModal }) => {
  const { t, lang } = useLanguage();
  const settings = useUserSettings();
  const currencySymbol = lang === 'ar' ? (settings?.currencySymbolAr || t.currency) : (settings?.currencySymbolEn || t.currency);

  if (!cycle) return null;

  const formatDateRange = (startStr: string, endStr: string) => {
    const s = new Date(startStr);
    const e = new Date(endStr);
    const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
    return `${s.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} – ${e.toLocaleDateString(locale, { month: 'short', day: 'numeric' })}`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-text-primary flex items-center gap-2 m-0">
          {t.dashboard.weeklyEnvelopes}
        </h2>
        <button
          type="button"
          onClick={() => onOpenLogModal()}
          className="flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-brand-hover transition-colors focus:outline-none focus:ring-2 focus:ring-brand"
        >
          <Plus className="h-4 w-4" />
          <span>{t.expenses.logNewExpense}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {cycle.envelopes.map((env) => {
          const percentSpent = env.allocatedAmount > 0
            ? Math.min(100, Math.round((env.spentAmount / env.allocatedAmount) * 100))
            : (env.spentAmount > 0 ? 100 : 0);
          const isOver = env.remainingAmount < 0;
          const isCritical = percentSpent >= 85 && !isOver;

          let barColor = 'bg-guardrail-safe';
          if (isOver) barColor = 'bg-guardrail-danger';
          else if (isCritical) barColor = 'bg-guardrail-cooling';

          return (
            <div
              key={env.weekNumber}
              className={`relative rounded-2xl border p-4 transition-all shadow-xs ${
                env.status === 'active'
                  ? 'border-brand bg-surface-card ring-1 ring-brand/20'
                  : 'border-surface-border bg-surface-card hover:border-surface-border-strong'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-primary">
                      {lang === 'ar' ? env.labelAr : env.labelEn}
                    </span>
                    <span className="text-xs text-text-muted">
                      ({formatDateRange(env.startDate, env.endDate)})
                    </span>
                  </div>
                </div>
                {getStatusBadge(env, t.dashboard)}
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 mb-3">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">
                    {t.dashboard.spent}:{' '}
                    <strong className="text-text-primary">
                      {env.spentAmount.toLocaleString()} {currencySymbol}
                    </strong>
                  </span>
                  <span className="text-text-secondary font-medium">
                    {percentSpent}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-sunken border border-surface-border">
                  <div
                    className={`h-full transition-all duration-300 ${barColor}`}
                    style={{ width: `${isOver ? 100 : percentSpent}%` }}
                  />
                </div>
              </div>

              {/* Bottom stats & quick action */}
              <div className="flex items-center justify-between pt-1 border-t border-surface-border text-xs">
                <div>
                  <span className="text-text-secondary">{t.dashboard.remaining}: </span>
                  <span
                    className={`font-bold ${
                      isOver ? 'text-guardrail-danger' : 'text-guardrail-safe'
                    }`}
                  >
                    {env.remainingAmount.toLocaleString()} {currencySymbol}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenLogModal(env.weekNumber)}
                  className="text-brand hover:text-brand-hover font-semibold text-xs flex items-center gap-1 hover:underline"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>{lang === 'ar' ? 'إضافة مصروف' : 'Add'}</span>
                </button>
              </div>

              {/* Overspent Warning Alert */}
              {isOver && (
                <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-guardrail-danger-bg border border-guardrail-danger/30 p-2 text-xs text-guardrail-danger">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-guardrail-danger" />
                  <span>
                    {lang === 'ar'
                      ? 'تم تجاوز ميزانية هذا الأسبوع! الزم التقشف ولا تقترض من الأسابيع القادمة.'
                      : 'Envelope exceeded! Restrict spending; do not draw from upcoming weeks.'}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
