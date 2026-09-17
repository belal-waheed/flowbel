import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import type { BudgetCycle } from '../../types/finance';
import type { ExpenseCategory, ReflectionAnswers } from '../../types/expenseFsm';
import { evaluateExpenseRequirements, createExpense } from '../../services/expenseService';
import { getCycleWeekForDate } from '../../services/cycleService';
import { ReflectionModal } from './ReflectionModal';
import { Receipt, AlertTriangle, X, Plus } from 'lucide-react';

interface LogExpenseModalProps {
  cycle: BudgetCycle | undefined;
  defaultWeek?: number;
  isOpen: boolean;
  onClose: () => void;
  onExpenseAdded?: () => void;
}

export const LogExpenseModal: React.FC<LogExpenseModalProps> = ({
  cycle,
  defaultWeek,
  isOpen,
  onClose,
  onExpenseAdded
}) => {
  const { t } = useLanguage();

  const activeWeek = cycle ? (defaultWeek ?? getCycleWeekForDate(cycle, new Date())) : 1;

  const [title, setTitle] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('groceries');
  const [envelopeWeek, setEnvelopeWeek] = useState<number>(activeWeek);
  const [showReflection, setShowReflection] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen || !cycle) return null;

  const amount = parseFloat(amountStr) || 0;
  const { requiresCooling } = evaluateExpenseRequirements(amount, category);

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title.trim()) {
      setErrorMsg('Please enter a description for the expense');
      return;
    }
    if (amount <= 0) {
      setErrorMsg('Please enter a valid positive amount in EGP');
      return;
    }

    if (requiresCooling) {
      // Open reflection modal
      setShowReflection(true);
    } else {
      // Direct commit for essential / sub-threshold items
      try {
        await createExpense({
          cycleId: cycle.id,
          envelopeWeek,
          title: title.trim(),
          amount,
          category
        });
        resetForm();
        onClose();
        onExpenseAdded?.();
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : 'Failed to save expense');
      }
    }
  };

  const handleConfirmCooling = async (answers: ReflectionAnswers) => {
    try {
      await createExpense({
        cycleId: cycle.id,
        envelopeWeek,
        title: title.trim(),
        amount,
        category,
        reflectionAnswers: answers
      });
      setShowReflection(false);
      resetForm();
      onClose();
      onExpenseAdded?.();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to initiate cooling off');
    }
  };

  const handleAbortFromReflection = () => {
    setShowReflection(false);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setAmountStr('');
    setCategory('groceries');
    setErrorMsg(null);
  };

  const categories: ExpenseCategory[] = [
    'groceries',
    'transit',
    'study',
    'dining',
    'tech',
    'leisure',
    'emergency',
    'discretionary',
    'other'
  ];

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-text-primary/40 backdrop-blur-xs overflow-y-auto">
        <div className="relative w-full max-w-md rounded-2xl border border-surface-border bg-surface-card p-6 shadow-xl space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-surface-border pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-subtle border border-brand/20 text-brand">
                <Receipt className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-text-primary m-0">
                {t.expenses.modalTitle}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-text-muted hover:bg-surface-sunken hover:text-text-primary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {errorMsg && (
            <div className="rounded-xl border border-guardrail-danger/30 bg-guardrail-danger-bg p-2.5 text-xs text-guardrail-danger">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleInitialSubmit} className="space-y-3.5">
            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                {t.expenses.inputTitle}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Weekly grocery vegetables, Metro pass..."
                className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                {t.expenses.inputAmount}
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  min="0.01"
                  required
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-2 text-sm font-bold text-text-primary placeholder:text-text-muted focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-text-muted pointer-events-none">
                  {t.currency}
                </span>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                {t.expenses.inputCategory}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-2 text-xs text-text-primary focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {t.categories[cat] || cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Week Selection */}
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                {t.expenses.inputWeek}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setEnvelopeWeek(w)}
                    className={`rounded-xl border py-1.5 text-xs font-semibold transition-colors ${
                      envelopeWeek === w
                        ? 'border-brand bg-brand-subtle text-brand font-bold'
                        : 'border-surface-border-strong bg-surface-card text-text-secondary hover:bg-surface-sunken'
                    }`}
                  >
                    W{w}
                  </button>
                ))}
              </div>
            </div>

            {/* Cooling-off Notice Banner */}
            {requiresCooling && (
              <div className="rounded-xl border border-guardrail-cooling/30 bg-guardrail-cooling-bg p-3 text-xs text-guardrail-cooling space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-guardrail-cooling">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-guardrail-cooling" />
                  <span>{t.expenses.coolingNotice}</span>
                </div>
                <p className="text-[11px] text-guardrail-cooling leading-relaxed">
                  {t.expenses.coolingNoticeDetail}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-surface-border">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-surface-border-strong bg-surface-card px-3.5 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-sunken transition-colors"
              >
                {t.expenses.cancelBtn}
              </button>

              <button
                type="submit"
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors focus:outline-none ${
                  requiresCooling
                    ? 'bg-guardrail-cooling hover:opacity-90 focus:ring-2 focus:ring-guardrail-cooling'
                    : 'bg-brand hover:bg-brand-hover focus:ring-2 focus:ring-brand'
                }`}
              >
                {requiresCooling ? (
                  <>
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>{t.expenses.proceedToReflection}</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" />
                    <span>{t.expenses.saveBtn}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showReflection && (
        <ReflectionModal
          title={title}
          amount={amount}
          onConfirmCooling={handleConfirmCooling}
          onAbort={handleAbortFromReflection}
          onClose={() => setShowReflection(false)}
        />
      )}
    </>
  );
};
