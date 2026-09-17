import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import {
  useCategories,
  addCategory,
  deleteCategory
} from '../../db/repositories/settingsRepository';
import {
  AVAILABLE_CATEGORY_ICONS,
  renderCategoryIconByName
} from '../../utils/badgeHelpers';
import { X, Plus, Trash2, Tag } from 'lucide-react';

interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({
  isOpen,
  onClose
}) => {
  const { t, lang } = useLanguage();
  const categories = useCategories();

  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string>('Tag');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!nameEn.trim() && !nameAr.trim()) {
      setErrorMsg(lang === 'ar' ? 'يرجى إدخال اسم التصنيف' : 'Please provide a category name');
      return;
    }

    const finalEn = nameEn.trim() || nameAr.trim();
    const finalAr = nameAr.trim() || nameEn.trim();

    try {
      await addCategory({
        nameEn: finalEn,
        nameAr: finalAr,
        iconName: selectedIcon,
        isCustom: true
      });
      setNameEn('');
      setNameAr('');
      setSelectedIcon('Tag');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to add category');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to remove category');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl border border-surface-border bg-surface-card p-6 shadow-xl space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-subtle border border-brand/20 text-brand">
              <Tag className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-primary m-0">
                {t.categoryModal.title}
              </h3>
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

        {/* Existing Categories List */}
        <div className="overflow-y-auto space-y-2 pr-1 flex-1 min-h-[140px]">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-sunken/40 p-2.5 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border bg-surface-card text-brand">
                  {renderCategoryIconByName(cat.iconName, 'h-4 w-4')}
                </div>
                <div>
                  <p className="font-semibold text-text-primary">
                    {lang === 'ar' ? cat.nameAr : cat.nameEn}
                  </p>
                  <p className="text-[10px] text-text-muted">
                    {lang === 'ar' ? cat.nameEn : cat.nameAr}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold border ${
                  cat.isCustom
                    ? 'border-brand/30 bg-brand-subtle text-brand'
                    : 'border-surface-border bg-surface-sunken text-text-muted'
                }`}>
                  {cat.isCustom ? t.categoryModal.customBadge : t.categoryModal.defaultBadge}
                </span>

                {cat.isCustom && (
                  <button
                    type="button"
                    onClick={() => handleDelete(cat.id)}
                    title={t.categoryModal.deleteBtn}
                    className="rounded-lg p-1 text-text-muted hover:bg-surface-card hover:text-guardrail-danger transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Category Form */}
        <form onSubmit={handleAdd} className="border-t border-surface-border pt-3 space-y-3 shrink-0">
          <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider m-0">
            {t.categoryModal.addTitle}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-text-primary mb-1">
                {t.categoryModal.nameEnLabel}
              </label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Books & Courses"
                className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-text-primary mb-1">
                {t.categoryModal.nameArLabel}
              </label>
              <input
                type="text"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="مثال: كتب ودورات"
                className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
              />
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-text-primary mb-1.5">
              {t.categoryModal.iconLabel}
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1.5 rounded-xl border border-surface-border bg-surface-sunken/40">
              {AVAILABLE_CATEGORY_ICONS.map((iconName) => (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => setSelectedIcon(iconName)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all ${
                    selectedIcon === iconName
                      ? 'border-brand bg-brand text-white shadow-xs'
                      : 'border-surface-border bg-surface-card text-text-secondary hover:border-brand/40 hover:text-brand'
                  }`}
                  title={iconName}
                >
                  {renderCategoryIconByName(iconName, 'h-4 w-4')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-hover transition-colors shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{t.categoryModal.addBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
