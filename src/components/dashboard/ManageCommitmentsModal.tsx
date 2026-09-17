import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import {
  useFixedObligations,
  addFixedObligation,
  updateFixedObligation,
  deleteFixedObligation
} from '../../db/repositories/fixedObligationRepository';
import { useCategories } from '../../db/repositories/settingsRepository';
import { useUserSettings } from '../../db/repositories/settingsRepository';
import type { FixedObligation } from '../../types/finance';
import { getCategoryIcon } from '../../utils/badgeHelpers';
import { X, Plus, Trash2, Edit2, ShieldCheck, Check } from 'lucide-react';

interface ManageCommitmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManageCommitmentsModal: React.FC<ManageCommitmentsModalProps> = ({
  isOpen,
  onClose
}) => {
  const { t, lang } = useLanguage();
  const obligations = useFixedObligations();
  const categories = useCategories();
  const settings = useUserSettings();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [category, setCategory] = useState('housing');
  const [dueDayStr, setDueDayStr] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setAmountStr('');
    setCategory(categories[0]?.id || 'housing');
    setDueDayStr('');
    setErrorMsg(null);
  };

  const handleStartEdit = (item: FixedObligation) => {
    setEditingId(item.id);
    setTitle(lang === 'ar' ? item.titleAr : item.titleEn);
    setAmountStr(item.amount.toString());
    setCategory(item.category);
    setDueDayStr(item.dueDay ? item.dueDay.toString() : '');
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const amount = parseFloat(amountStr);
    if (!title.trim()) {
      setErrorMsg(lang === 'ar' ? 'يرجى إدخال اسم الالتزام' : 'Please enter a commitment title');
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      setErrorMsg(lang === 'ar' ? 'يرجى إدخال مبلغ صحيح' : 'Please enter a valid positive amount');
      return;
    }

    const dueDay = dueDayStr ? parseInt(dueDayStr, 10) : undefined;
    if (dueDay !== undefined && (dueDay < 1 || dueDay > 31)) {
      setErrorMsg(lang === 'ar' ? 'يوم الاستحقاق يجب أن يكون بين 1 و 31' : 'Due day must be between 1 and 31');
      return;
    }

    try {
      if (editingId) {
        await updateFixedObligation(editingId, {
          titleEn: lang === 'en' ? title.trim() : (obligations.find(o => o.id === editingId)?.titleEn || title.trim()),
          titleAr: lang === 'ar' ? title.trim() : (obligations.find(o => o.id === editingId)?.titleAr || title.trim()),
          amount,
          category,
          dueDay
        });
      } else {
        await addFixedObligation({
          titleEn: title.trim(),
          titleAr: title.trim(),
          amount,
          category,
          dueDay,
          isPaid: false
        });
      }
      resetForm();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFixedObligation(id);
      if (editingId === id) resetForm();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Deletion failed');
    }
  };

  const currencySymbol = lang === 'ar' ? settings.currencySymbolAr : settings.currencySymbolEn;
  const totalAmount = obligations.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl border border-surface-border bg-surface-card p-6 shadow-xl space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-subtle border border-brand/20 text-brand">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-primary m-0">
                {t.commitmentsModal.title}
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                {t.commitmentsModal.totalLabel}: {totalAmount.toLocaleString()} {currencySymbol}
              </p>
            </div>
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
          <div className="rounded-xl border border-guardrail-danger/30 bg-guardrail-danger-bg p-2.5 text-xs text-guardrail-danger shrink-0">
            {errorMsg}
          </div>
        )}

        {/* List of Commitments */}
        <div className="overflow-y-auto space-y-2 pr-1 flex-1 min-h-[140px]">
          {obligations.length === 0 ? (
            <p className="text-center py-6 text-xs text-text-muted">
              {t.commitmentsModal.emptyMessage}
            </p>
          ) : (
            obligations.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-sunken/40 p-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border bg-surface-card text-text-secondary">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      {lang === 'ar' ? item.titleAr : item.titleEn}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      {item.dueDay ? `${t.commitmentsModal.dueDayLabel}: ${item.dueDay}` : item.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-text-primary">
                    {item.amount.toLocaleString()} {currencySymbol}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(item)}
                      title={t.commitmentsModal.editTitle}
                      className="rounded-lg p-1.5 text-text-muted hover:bg-surface-card hover:text-brand transition-colors"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      title={t.commitmentsModal.deleteBtn}
                      className="rounded-lg p-1.5 text-text-muted hover:bg-surface-card hover:text-guardrail-danger transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add / Edit Form */}
        <form onSubmit={handleSubmit} className="border-t border-surface-border pt-3 space-y-3 shrink-0">
          <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider m-0">
            {editingId ? t.commitmentsModal.editTitle : t.commitmentsModal.addTitle}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-text-primary mb-1">
                {t.commitmentsModal.nameLabel}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.commitmentsModal.namePlaceholder}
                className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-text-primary mb-1">
                {t.commitmentsModal.amountLabel} ({currencySymbol})
              </label>
              <input
                type="number"
                step="any"
                min="0.01"
                required
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-1.5 text-xs font-bold text-text-primary placeholder:text-text-muted focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-text-primary mb-1">
                {t.commitmentsModal.categoryLabel}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-1.5 text-xs text-text-primary focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {lang === 'ar' ? cat.nameAr : cat.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-text-primary mb-1">
                {t.commitmentsModal.dueDayLabel}
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={dueDayStr}
                onChange={(e) => setDueDayStr(e.target.value)}
                placeholder="e.g. 1"
                className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-surface-border px-3 py-1.5 text-xs font-semibold text-text-secondary hover:bg-surface-sunken transition-colors"
              >
                {t.expenses.cancelBtn}
              </button>
            )}
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-hover transition-colors shadow-xs"
            >
              {editingId ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>{t.commitmentsModal.saveBtn}</span>
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" />
                  <span>{t.commitmentsModal.addBtn}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
