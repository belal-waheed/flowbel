import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useCoolingTimers } from '../../db/repositories/expenseRepository';
import type { ExpenseRecord } from '../../types/expenseFsm';
import { commitExpense, abortExpense } from '../../services/expenseService';
import { Clock, ShieldAlert, CheckCircle, Ban, Hourglass, HelpCircle } from 'lucide-react';

export const CoolingTimerCard: React.FC = () => {
  const { t, lang } = useLanguage();
  const [now, setNow] = useState<number>(() => Date.now());
  const [actionError, setActionError] = useState<string | null>(null);

  // Reactive subscription for expenses in cooling_off state
  const coolingExpenses = useCoolingTimers();

  // Update timer every second for accurate countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!coolingExpenses || coolingExpenses.length === 0) {
    return null;
  }

  const handleCommit = async (expense: ExpenseRecord) => {
    setActionError(null);
    try {
      await commitExpense(expense.id);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to commit expense');
    }
  };

  const handleAbort = async (expense: ExpenseRecord) => {
    setActionError(null);
    try {
      await abortExpense(expense.id, 'Discipline victory: Chosen to save money');
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to abort expense');
    }
  };

  const formatCountdown = (unlocksAt: number) => {
    const diffMs = unlocksAt - now;
    if (diffMs <= 0) return null;

    const totalSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-guardrail-cooling">
        <ShieldAlert className="h-4 w-4 text-guardrail-cooling" />
        <span>{t.expenses.activeCoolingTimers} ({coolingExpenses.length})</span>
      </div>

      {actionError && (
        <div className="rounded-xl border border-guardrail-danger/30 bg-guardrail-danger-bg p-3 text-xs text-guardrail-danger">
          {actionError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3">
        {coolingExpenses.map((expense) => {
          const unlocksAt = expense.unlocksAt || now;
          const countdown = formatCountdown(unlocksAt);
          const isUnlocked = now >= unlocksAt;

          return (
            <div
              key={expense.id}
              className={`rounded-2xl border p-4 transition-all shadow-xs ${
                isUnlocked
                  ? 'border-guardrail-safe/40 bg-surface-card ring-1 ring-guardrail-safe/20'
                  : 'border-guardrail-cooling/30 bg-guardrail-cooling-bg/40'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-text-primary m-0">
                      {expense.title}
                    </h4>
                    <span className="rounded-md border border-surface-border bg-surface-card px-2 py-0.5 text-[11px] font-medium text-text-secondary">
                      {t.categories[expense.category] || expense.category}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {lang === 'ar' ? `المظروف: الأسبوع ${expense.envelopeWeek}` : `Week ${expense.envelopeWeek} Envelope`}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-lg font-bold text-guardrail-cooling">
                    {expense.amount.toLocaleString()} {t.currency}
                  </span>
                </div>
              </div>

              {/* Status and Countdown Banner */}
              <div
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 mb-3.5 text-xs font-medium border ${
                  isUnlocked
                    ? 'border-guardrail-safe/30 bg-guardrail-safe-bg text-guardrail-safe'
                    : 'border-guardrail-cooling/30 bg-surface-card text-guardrail-cooling'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isUnlocked ? (
                    <CheckCircle className="h-4 w-4 text-guardrail-safe shrink-0" />
                  ) : (
                    <Hourglass className="h-4 w-4 text-guardrail-cooling animate-spin shrink-0" />
                  )}
                  <span>
                    {isUnlocked ? t.expenses.readyToCommit : t.expenses.lockedFor}
                  </span>
                </div>

                {!isUnlocked && countdown && (
                  <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-guardrail-cooling bg-guardrail-cooling-bg px-2.5 py-1 rounded-lg border border-guardrail-cooling/30">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{countdown}</span>
                  </div>
                )}
              </div>

              {/* Reflection Summary Checklist if present */}
              {expense.reflectionAnswers && (
                <div className="mb-3.5 rounded-xl border border-surface-border bg-surface-card p-3 text-xs space-y-1.5 text-text-secondary">
                  <div className="flex items-center gap-1.5 text-text-primary font-semibold mb-1">
                    <HelpCircle className="h-3.5 w-3.5 text-brand" />
                    <span>{t.expenses.reflectionHeader}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <span className="flex items-center gap-1 text-text-primary">
                      <CheckCircle className="h-3 w-3 text-brand" />{' '}
                      {expense.reflectionAnswers.needVsWant
                        ? (lang === 'ar' ? 'احتياج ضروري' : 'Essential Need')
                        : (lang === 'ar' ? 'رغبة / نزوة (تفكير)' : 'Impulse Want (Cooling)')}
                    </span>
                    <span className="flex items-center gap-1 text-text-primary">
                      <CheckCircle className="h-3 w-3 text-brand" />{' '}
                      {expense.reflectionAnswers.dormantCheck
                        ? (lang === 'ar' ? 'استخدام دائم' : '30-Day utility checked')
                        : (lang === 'ar' ? 'عرضة للإهمال' : 'Dormancy risk noted')}
                    </span>
                    <span className="flex items-center gap-1 text-text-primary">
                      <CheckCircle className="h-3 w-3 text-brand" />{' '}
                      {expense.reflectionAnswers.budgetImpact
                        ? (lang === 'ar' ? 'المظروف يتحمل' : 'Envelope impact absorbed')
                        : (lang === 'ar' ? 'يضغط الميزانية' : 'Tight envelope impact')}
                    </span>
                    <span className="flex items-center gap-1 text-text-primary">
                      <CheckCircle className="h-3 w-3 text-brand" />{' '}
                      {expense.reflectionAnswers.alternativeExplored
                        ? (lang === 'ar' ? 'تم بحث البدائل' : 'Alternatives researched')
                        : (lang === 'ar' ? 'لا يوجد بديل' : 'No alternative')}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleAbort(expense)}
                  className="flex items-center gap-1.5 rounded-xl border border-guardrail-danger/30 bg-guardrail-danger-bg px-3.5 py-2 text-xs font-semibold text-guardrail-danger hover:bg-guardrail-danger-bg/80 transition-colors focus:outline-none focus:ring-2 focus:ring-guardrail-danger"
                >
                  <Ban className="h-3.5 w-3.5" />
                  <span>{t.expenses.abortBtn}</span>
                </button>

                <button
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => handleCommit(expense)}
                  title={!isUnlocked ? `${t.expenses.unlocksIn} ${countdown}` : undefined}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold shadow-xs transition-all focus:outline-none ${
                    isUnlocked
                      ? 'bg-guardrail-safe text-white hover:opacity-90 cursor-pointer focus:ring-2 focus:ring-guardrail-safe'
                      : 'bg-surface-sunken text-text-muted border border-surface-border cursor-not-allowed opacity-60'
                  }`}
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>{t.expenses.commitBtn}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
