import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import {
  useFixedObligations,
  toggleObligationPaidStatus
} from '../../db/repositories/fixedObligationRepository';
import type { FixedObligation } from '../../types/finance';
import {
  ShieldCheck,
  Check,
  Clock
} from 'lucide-react';
import { getCategoryIcon } from '../../utils/badgeHelpers';

export const FixedObligations: React.FC = () => {
  const { t, lang } = useLanguage();

  const obligations = useFixedObligations();

  const handleTogglePaidStatus = async (id: string, currentStatus?: boolean) => {
    await toggleObligationPaidStatus(id, currentStatus);
  };

  const totalAmount = obligations.reduce((sum, o) => sum + o.amount, 0);
  const paidAmount = obligations
    .filter((o) => o.isPaid)
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-border pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand" />
            <h3 className="text-sm font-bold text-text-primary m-0">
              {t.dashboard.fixedObligations}
            </h3>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            {t.dashboard.fixedSubtext}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-guardrail-safe">
            {paidAmount.toLocaleString()} {t.currency} {t.dashboard.paid}
          </span>
          <span className="text-text-muted">/</span>
          <span className="text-text-primary">
            {totalAmount.toLocaleString()} {t.currency}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {obligations.map((item: FixedObligation) => {
          const isPaid = !!item.isPaid;
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${
                isPaid
                  ? 'border-guardrail-safe/30 bg-guardrail-safe-bg/60 text-text-primary'
                  : 'border-surface-border bg-surface-sunken/50 text-text-primary'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                    isPaid
                      ? 'border-guardrail-safe/30 bg-guardrail-safe-bg text-guardrail-safe'
                      : 'border-surface-border bg-surface-card text-text-secondary'
                  }`}
                >
                  {getCategoryIcon(item.category)}
                </div>
                <div>
                  <p className="text-xs font-semibold leading-tight text-text-primary">
                    {lang === 'ar' ? item.titleAr : item.titleEn}
                  </p>
                  <p className="text-xs font-bold text-text-primary mt-0.5">
                    {item.amount.toLocaleString()} {t.currency}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleTogglePaidStatus(item.id, item.isPaid)}
                title={isPaid ? t.dashboard.markUnpaid : t.dashboard.markPaid}
                className={`flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-semibold transition-colors focus:outline-none ${
                  isPaid
                    ? 'border border-guardrail-safe/40 bg-guardrail-safe-bg text-guardrail-safe hover:bg-guardrail-safe-bg/80'
                    : 'border border-surface-border-strong bg-surface-card text-text-secondary hover:bg-surface-sunken hover:text-text-primary shadow-xs'
                }`}
              >
                {isPaid ? (
                  <>
                    <Check className="h-3 w-3" />
                    <span>{t.dashboard.paid}</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3" />
                    <span>{t.dashboard.unpaid}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
