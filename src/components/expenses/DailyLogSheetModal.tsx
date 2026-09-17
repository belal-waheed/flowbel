import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useUserSettings, useCategories } from '../../db/repositories/settingsRepository';
import { createBatchExpenses, evaluateExpenseRequirements } from '../../services/expenseService';
import { getEnvelopeForDate } from '../../services/cycleService';
import { hapticsService } from '../../services/native/hapticsService';
import type { BudgetCycle } from '../../types/finance';
import type { ExpenseCategory } from '../../types/expenseFsm';
import {
  X,
  Plus,
  Trash2,
  Calendar,
  Layers,
  Zap,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface DailyLogSheetModalProps {
  cycle: BudgetCycle | null | undefined;
  isOpen: boolean;
  onClose: () => void;
}

interface BatchItem {
  id: string;
  title: string;
  amount: string;
  category: ExpenseCategory;
}

let itemIdCounter = 100;
function createItemId(): string {
  itemIdCounter += 1;
  return `item_${itemIdCounter}`;
}

export const DailyLogSheetModal: React.FC<DailyLogSheetModalProps> = ({
  cycle,
  isOpen,
  onClose
}) => {
  const { t, lang, dir } = useLanguage();
  const settings = useUserSettings();
  const categories = useCategories();

  const [mode, setMode] = useState<'batch' | 'quick'>('batch');
  const [expenseDate, setExpenseDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Quick mode state
  const [quickAmount, setQuickAmount] = useState<string>('');
  const [quickCategory, setQuickCategory] = useState<ExpenseCategory>('groceries');
  const [quickNote, setQuickNote] = useState<string>('');

  // Batch mode state
  const [items, setItems] = useState<BatchItem[]>([
    {
      id: 'item_initial_1',
      title: '',
      amount: '',
      category: 'groceries'
    }
  ]);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Determine which cycle envelope week matches the chosen date
  const targetWeek = useMemo(() => {
    if (!cycle || !cycle.envelopes.length) return 1;
    const env = getEnvelopeForDate(cycle, new Date(expenseDate));
    return env ? env.weekNumber : 1;
  }, [cycle, expenseDate]);

  // Compute total in batch mode
  const batchTotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const val = parseFloat(item.amount);
      return sum + (Number.isFinite(val) && val > 0 ? val : 0);
    }, 0);
  }, [items]);

  const handleAddItem = () => {
    hapticsService.impactLight();
    const fallbackCat = categories[0]?.id || 'groceries';
    setItems((prev) => [
      ...prev,
      {
        id: createItemId(),
        title: '',
        amount: '',
        category: fallbackCat as ExpenseCategory
      }
    ]);
  };

  const handleUpdateItem = (id: string, partial: Partial<BatchItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...partial } : item))
    );
    if (errorMsg) setErrorMsg(null);
  };

  const handleRemoveItem = (id: string) => {
    hapticsService.impactLight();
    if (items.length <= 1) {
      // Clear instead of removing last line
      setItems([
        {
          id: createItemId(),
          title: '',
          amount: '',
          category: (categories[0]?.id || 'groceries') as ExpenseCategory
        }
      ]);
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCommit = async () => {
    if (!cycle) return;
    setErrorMsg(null);

    const coolingRules = {
      threshold: settings.coolingThreshold,
      durationHours: settings.coolingDurationHours,
      enabled: settings.coolingEnabled
    };

    if (mode === 'quick') {
      const amountNum = parseFloat(quickAmount);
      if (isNaN(amountNum) || amountNum <= 0) {
        setErrorMsg(t.dailyLog.emptyItemsError);
        hapticsService.notificationWarning();
        return;
      }

      setIsSubmitting(true);
      try {
        const catObj = categories.find((c) => c.id === quickCategory);
        const defaultTitle = catObj
          ? lang === 'ar'
            ? catObj.nameAr
            : catObj.nameEn
          : t.dailyLog.modeQuick;

        await createBatchExpenses(
          cycle.id,
          [
            {
              amount: amountNum,
              category: quickCategory,
              envelopeWeek: targetWeek,
              note: quickNote.trim() || defaultTitle,
              createdAt: new Date(expenseDate).toISOString()
            }
          ],
          coolingRules
        );

        await hapticsService.notificationSuccess();
        onClose();
        // Reset
        setQuickAmount('');
        setQuickNote('');
      } catch (err) {
        console.error('Failed to log quick expense:', err);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Multi-Item Batch
      const validItems = items.filter((item) => {
        const amt = parseFloat(item.amount);
        return !isNaN(amt) && amt > 0;
      });

      if (validItems.length === 0) {
        setErrorMsg(t.dailyLog.emptyItemsError);
        hapticsService.notificationWarning();
        return;
      }

      setIsSubmitting(true);
      try {
        const batchPayload = validItems.map((item) => {
          const catObj = categories.find((c) => c.id === item.category);
          const defaultTitle = catObj
            ? lang === 'ar'
              ? catObj.nameAr
              : catObj.nameEn
            : 'Expense';

          return {
            amount: parseFloat(item.amount),
            category: item.category,
            envelopeWeek: targetWeek,
            note: item.title.trim() || defaultTitle,
            createdAt: new Date(expenseDate).toISOString()
          };
        });

        await createBatchExpenses(cycle.id, batchPayload, coolingRules);

        await hapticsService.notificationSuccess();
        onClose();
        // Reset items to single blank row
        setItems([
          {
            id: createItemId(),
            title: '',
            amount: '',
            category: (categories[0]?.id || 'groceries') as ExpenseCategory
          }
        ]);
      } catch (err) {
        console.error('Failed to commit daily log items:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      dir={dir}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto"
    >
      <div className="w-full max-w-xl rounded-3xl border border-surface-border bg-surface-card p-6 shadow-2xl transition-all sm:p-7 my-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-surface-border pb-4 mb-5">
          <div>
            <h3 className="text-base font-bold text-text-primary m-0">
              {t.dailyLog.modalTitle}
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              {t.dailyLog.modalSub}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-text-secondary hover:bg-surface-sunken hover:text-text-primary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Date Selector & Mode Toggle */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-5">
          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">
              {t.dailyLog.dateLabel}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-text-secondary">
                <Calendar className="h-4 w-4" />
              </div>
              <input
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="w-full rounded-xl border border-surface-border-strong bg-surface-base ps-9 pe-3 py-2 text-xs font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">
              {lang === 'ar' ? 'طريقة التسجيل' : 'Entry Mode'}
            </label>
            <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-surface-border bg-surface-base p-1">
              <button
                type="button"
                onClick={() => {
                  hapticsService.impactLight();
                  setMode('batch');
                }}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all ${
                  mode === 'batch'
                    ? 'bg-surface-card text-brand shadow-xs'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>{t.dailyLog.modeBatch}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  hapticsService.impactLight();
                  setMode('quick');
                }}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all ${
                  mode === 'quick'
                    ? 'bg-surface-card text-brand shadow-xs'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Zap className="h-3.5 w-3.5" />
                <span>{t.dailyLog.modeQuick}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Mode 1: Quick Daily Sum */}
        {mode === 'quick' ? (
          <div className="space-y-4 rounded-2xl border border-surface-border bg-surface-base p-4">
            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                {t.dailyLog.quickAmountLabel}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={quickAmount}
                  onChange={(e) => setQuickAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-2 text-sm font-bold text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                />
                <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-xs font-bold text-text-secondary">
                  {lang === 'ar' ? settings.currencySymbolAr : settings.currencySymbolEn}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                {t.dailyLog.quickCategoryLabel}
              </label>
              <select
                value={quickCategory}
                onChange={(e) =>
                  setQuickCategory(e.target.value as ExpenseCategory)
                }
                className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-2 text-xs font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {lang === 'ar' ? cat.nameAr : cat.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                {t.dailyLog.quickNoteLabel}
              </label>
              <input
                type="text"
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
                placeholder={t.dailyLog.itemNotePlaceholder}
                className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-2 text-xs font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>
        ) : (
          /* Content Mode 2: Multi-Item Batch */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-primary">
                {t.dailyLog.batchItemsTitle} ({items.length})
              </span>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-1 rounded-lg border border-surface-border bg-surface-base px-2.5 py-1 text-xs font-bold text-brand hover:bg-surface-sunken transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>{t.dailyLog.addItemBtn}</span>
              </button>
            </div>

            <div className="max-h-64 space-y-2.5 overflow-y-auto pe-1">
              {items.map((item, idx) => {
                const amtNum = parseFloat(item.amount) || 0;
                const { requiresCooling } = evaluateExpenseRequirements(
                  amtNum,
                  item.category,
                  settings
                );

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-surface-border bg-surface-base p-3 space-y-2"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-text-secondary">
                      <span>
                        {lang === 'ar' ? `البند ${idx + 1}` : `Item #${idx + 1}`}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="rounded-lg p-1 text-text-secondary hover:text-guardrail-danger transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-12">
                      {/* Amount */}
                      <div className="sm:col-span-4 relative">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={item.amount}
                          onChange={(e) =>
                            handleUpdateItem(item.id, { amount: e.target.value })
                          }
                          placeholder="0.00"
                          className="w-full rounded-xl border border-surface-border-strong bg-surface-card ps-3 pe-10 py-1.5 text-xs font-bold text-text-primary focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                        <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-2.5 text-[10px] font-bold text-text-secondary">
                          {lang === 'ar'
                            ? settings.currencySymbolAr
                            : settings.currencySymbolEn}
                        </span>
                      </div>

                      {/* Category */}
                      <div className="sm:col-span-4">
                        <select
                          value={item.category}
                          onChange={(e) =>
                            handleUpdateItem(item.id, {
                              category: e.target.value as ExpenseCategory
                            })
                          }
                          className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-2.5 py-1.5 text-xs font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-brand"
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {lang === 'ar' ? cat.nameAr : cat.nameEn}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Note */}
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            handleUpdateItem(item.id, { title: e.target.value })
                          }
                          placeholder={t.dailyLog.itemNotePlaceholder}
                          className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-2.5 py-1.5 text-xs font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>
                    </div>

                    {/* Cooling delay warning indicator */}
                    {requiresCooling && (
                      <div className="flex items-center gap-1.5 rounded-lg bg-guardrail-cooling/10 px-2 py-1 text-[10px] font-semibold text-guardrail-cooling">
                        <Clock className="h-3 w-3 shrink-0" />
                        <span>{t.dailyLog.coolingWarningSub}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Real-time Running Total */}
            <div className="flex items-center justify-between rounded-xl bg-surface-sunken px-4 py-2.5 text-xs font-bold border border-surface-border">
              <span className="text-text-secondary">{t.dailyLog.runningTotal}</span>
              <span className="text-sm font-bold text-brand">
                {batchTotal.toLocaleString()}{' '}
                {lang === 'ar'
                  ? settings.currencySymbolAr
                  : settings.currencySymbolEn}
              </span>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-guardrail-danger">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-2 border-t border-surface-border pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-surface-border bg-surface-base px-4 py-2 text-xs font-bold text-text-secondary hover:bg-surface-sunken transition-colors"
          >
            {t.expenses.cancelBtn}
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleCommit}
            className="flex items-center gap-1.5 rounded-xl bg-brand px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-hover transition-colors disabled:opacity-50"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{t.dailyLog.saveBatchBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
