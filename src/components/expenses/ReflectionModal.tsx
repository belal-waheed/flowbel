import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import type { ReflectionAnswers } from '../../types/expenseFsm';
import { Clock, Ban, Check, AlertTriangle } from 'lucide-react';

interface ReflectionModalProps {
  title: string;
  amount: number;
  onConfirmCooling: (answers: ReflectionAnswers) => void;
  onAbort: () => void;
  onClose: () => void;
}

export const ReflectionModal: React.FC<ReflectionModalProps> = ({
  title,
  amount,
  onConfirmCooling,
  onAbort,
  onClose
}) => {
  const { t, lang } = useLanguage();

  const [needVsWant, setNeedVsWant] = useState<boolean | null>(null);
  const [dormantCheck, setDormantCheck] = useState<boolean | null>(null);
  const [budgetImpact, setBudgetImpact] = useState<boolean | null>(null);
  const [alternativeExplored, setAlternativeExplored] = useState<boolean | null>(null);
  const [notes, setNotes] = useState('');

  const allQuestionsAnswered =
    needVsWant !== null &&
    dormantCheck !== null &&
    budgetImpact !== null &&
    alternativeExplored !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allQuestionsAnswered) return;

    onConfirmCooling({
      needVsWant: needVsWant ?? false,
      dormantCheck: dormantCheck ?? false,
      budgetImpact: budgetImpact ?? false,
      alternativeExplored: alternativeExplored ?? false,
      notes: notes.trim() ? notes.trim() : undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl border border-surface-border bg-surface-card p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="border-b border-surface-border pb-4">
          <div className="flex items-center gap-2 text-guardrail-cooling mb-1">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="text-base font-bold text-text-primary m-0">
              {t.expenses.reflectionHeader}
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            {t.expenses.reflectionSubtitle}
          </p>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-surface-sunken border border-surface-border px-3.5 py-2">
            <span className="text-xs font-semibold text-text-primary">{title}</span>
            <span className="text-sm font-bold text-guardrail-cooling">
              {amount.toLocaleString()} {t.currency}
            </span>
          </div>
        </div>

        {/* 4 Reflection Questions */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {/* Question 1 */}
            <div className="rounded-xl border border-surface-border bg-surface-card p-3 space-y-2">
              <div>
                <p className="text-xs font-bold text-text-primary">{t.expenses.qNeedVsWant}</p>
                <p className="text-[11px] text-text-secondary mt-0.5">{t.expenses.qNeedVsWantSub}</p>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setNeedVsWant(false)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold border transition-all ${
                    needVsWant === false
                      ? 'border-brand bg-brand-subtle text-brand font-bold shadow-xs'
                      : 'border-surface-border-strong bg-surface-card text-text-secondary hover:bg-surface-sunken'
                  }`}
                >
                  {needVsWant === false && <Check className="h-3.5 w-3.5 text-brand" />}
                  <span>{lang === 'ar' ? 'رغبة / نزوة عاطفية' : 'Want / Impulse'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNeedVsWant(true)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold border transition-all ${
                    needVsWant === true
                      ? 'border-brand bg-brand-subtle text-brand font-bold shadow-xs'
                      : 'border-surface-border-strong bg-surface-card text-text-secondary hover:bg-surface-sunken'
                  }`}
                >
                  {needVsWant === true && <Check className="h-3.5 w-3.5 text-brand" />}
                  <span>{lang === 'ar' ? 'احتياج أساسي ضروري' : 'Essential Need'}</span>
                </button>
              </div>
            </div>

            {/* Question 2 */}
            <div className="rounded-xl border border-surface-border bg-surface-card p-3 space-y-2">
              <div>
                <p className="text-xs font-bold text-text-primary">{t.expenses.qDormant}</p>
                <p className="text-[11px] text-text-secondary mt-0.5">{t.expenses.qDormantSub}</p>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setDormantCheck(true)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold border transition-all ${
                    dormantCheck === true
                      ? 'border-brand bg-brand-subtle text-brand font-bold shadow-xs'
                      : 'border-surface-border-strong bg-surface-card text-text-secondary hover:bg-surface-sunken'
                  }`}
                >
                  {dormantCheck === true && <Check className="h-3.5 w-3.5 text-brand" />}
                  <span>{lang === 'ar' ? 'استخدام دائم (لن يهمل)' : 'Active in 30 Days'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDormantCheck(false)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold border transition-all ${
                    dormantCheck === false
                      ? 'border-brand bg-brand-subtle text-brand font-bold shadow-xs'
                      : 'border-surface-border-strong bg-surface-card text-text-secondary hover:bg-surface-sunken'
                  }`}
                >
                  {dormantCheck === false && <Check className="h-3.5 w-3.5 text-brand" />}
                  <span>{lang === 'ar' ? 'عرضة للإهمال / تردد' : 'May Gather Dust'}</span>
                </button>
              </div>
            </div>

            {/* Question 3 */}
            <div className="rounded-xl border border-surface-border bg-surface-card p-3 space-y-2">
              <div>
                <p className="text-xs font-bold text-text-primary">{t.expenses.qBudgetImpact}</p>
                <p className="text-[11px] text-text-secondary mt-0.5">{t.expenses.qBudgetImpactSub}</p>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setBudgetImpact(true)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold border transition-all ${
                    budgetImpact === true
                      ? 'border-brand bg-brand-subtle text-brand font-bold shadow-xs'
                      : 'border-surface-border-strong bg-surface-card text-text-secondary hover:bg-surface-sunken'
                  }`}
                >
                  {budgetImpact === true && <Check className="h-3.5 w-3.5 text-brand" />}
                  <span>{lang === 'ar' ? 'المظروف يتحمل براحة' : 'Envelope Absorbs'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBudgetImpact(false)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold border transition-all ${
                    budgetImpact === false
                      ? 'border-brand bg-brand-subtle text-brand font-bold shadow-xs'
                      : 'border-surface-border-strong bg-surface-card text-text-secondary hover:bg-surface-sunken'
                  }`}
                >
                  {budgetImpact === false && <Check className="h-3.5 w-3.5 text-brand" />}
                  <span>{lang === 'ar' ? 'يضغط ميزانية الأسبوع' : 'Strains Envelope'}</span>
                </button>
              </div>
            </div>

            {/* Question 4 */}
            <div className="rounded-xl border border-surface-border bg-surface-card p-3 space-y-2">
              <div>
                <p className="text-xs font-bold text-text-primary">{t.expenses.qAlternative}</p>
                <p className="text-[11px] text-text-secondary mt-0.5">{t.expenses.qAlternativeSub}</p>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setAlternativeExplored(true)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold border transition-all ${
                    alternativeExplored === true
                      ? 'border-brand bg-brand-subtle text-brand font-bold shadow-xs'
                      : 'border-surface-border-strong bg-surface-card text-text-secondary hover:bg-surface-sunken'
                  }`}
                >
                  {alternativeExplored === true && <Check className="h-3.5 w-3.5 text-brand" />}
                  <span>{lang === 'ar' ? 'بحثت عن بدائل أوفر' : 'Alternatives Checked'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAlternativeExplored(false)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold border transition-all ${
                    alternativeExplored === false
                      ? 'border-brand bg-brand-subtle text-brand font-bold shadow-xs'
                      : 'border-surface-border-strong bg-surface-card text-text-secondary hover:bg-surface-sunken'
                  }`}
                >
                  {alternativeExplored === false && <Check className="h-3.5 w-3.5 text-brand" />}
                  <span>{lang === 'ar' ? 'لا يوجد بديل أو لم أبحث' : 'No Alternatives'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">
              Reflection Notes (Optional rationale)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Why this purchase cannot wait..."
              className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-surface-border">
            <button
              type="button"
              onClick={onAbort}
              className="flex items-center gap-1.5 rounded-xl border border-guardrail-danger/30 bg-guardrail-danger-bg px-3.5 py-2 text-xs font-semibold text-guardrail-danger hover:bg-guardrail-danger-bg/80 transition-colors"
            >
              <Ban className="h-3.5 w-3.5" />
              <span>{t.expenses.abortBtn}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-surface-border-strong bg-surface-card px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-sunken transition-colors"
              >
                {t.expenses.cancelBtn}
              </button>

              <button
                type="submit"
                disabled={!allQuestionsAnswered}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold shadow-xs transition-all ${
                  allQuestionsAnswered
                    ? 'bg-brand text-white hover:bg-brand-hover cursor-pointer font-bold'
                    : 'bg-surface-sunken text-text-muted border border-surface-border cursor-not-allowed opacity-60'
                }`}
              >
                <Clock className="h-3.5 w-3.5" />
                <span>{t.expenses.submitCooling}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
