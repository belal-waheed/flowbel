import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useAllExpenses } from '../../db/repositories/expenseRepository';
import { useCategoryMap, resolveCategory, useUserSettings } from '../../db/repositories/settingsRepository';
import type { ExpenseRecord, ExpenseState } from '../../types/expenseFsm';
import { deleteExpense } from '../../services/expenseService';
import {
  Receipt,
  Trash2,
  Filter
} from 'lucide-react';
import { getStateBadge, renderCategoryIconByName } from '../../utils/badgeHelpers';

export const ExpenseLedger: React.FC = () => {
  const { t, lang } = useLanguage();
  const categoryMap = useCategoryMap();
  const settings = useUserSettings();

  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [selectedState, setSelectedState] = useState<ExpenseState | 'all'>('all');

  const expenses = useAllExpenses();
  const currencySymbol = lang === 'ar' ? settings.currencySymbolAr : settings.currencySymbolEn;

  const filteredExpenses = expenses.filter((item: ExpenseRecord) => {
    if (selectedWeek !== 'all' && item.envelopeWeek !== selectedWeek) {
      return false;
    }
    if (selectedState !== 'all' && item.state !== selectedState) {
      return false;
    }
    return true;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm(lang === 'ar' ? 'هل تريد حذف هذا المصروف؟' : 'Delete this expense record?')) {
      await deleteExpense(id);
    }
  };

  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-3">
      {/* Header & Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border pb-3">
        <div className="flex items-center gap-2">
          <Receipt className="h-4 w-4 text-brand" />
          <h3 className="text-sm font-bold text-text-primary m-0">
            {t.expenses.ledgerTitle} ({filteredExpenses.length})
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Week Filter */}
          <div className="flex items-center gap-1">
            <Filter className="h-3 w-3 text-text-muted" />
            <select
              value={selectedWeek}
              onChange={(e) =>
                setSelectedWeek(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="rounded-lg border border-surface-border-strong bg-surface-card px-2.5 py-1 text-xs text-text-primary focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
            >
              <option value="all">{t.expenses.allWeeks}</option>
              <option value="1">W1</option>
              <option value="2">W2</option>
              <option value="3">W3</option>
              <option value="4">W4</option>
              <option value="5">W5</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) =>
                setSelectedState(e.target.value as ExpenseState | 'all')
              }
              className="rounded-lg border border-surface-border-strong bg-surface-card px-2.5 py-1 text-xs text-text-primary focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
            >
              <option value="all">{t.expenses.allStates}</option>
              <option value="committed">{t.expenses.stateCommitted}</option>
              <option value="cooling_off">{t.expenses.stateCooling}</option>
              <option value="aborted">{t.expenses.stateAborted}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      {filteredExpenses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-surface-border p-8 text-center text-xs text-text-muted">
          {t.expenses.noExpensesFound}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredExpenses.map((expense: ExpenseRecord) => {
            const isAborted = expense.state === 'aborted';
            const isCooling = expense.state === 'cooling_off';
            const categoryObj = resolveCategory(expense.category, categoryMap);
            const categoryName = lang === 'ar' ? categoryObj.nameAr : categoryObj.nameEn;

            return (
              <div
                key={expense.id}
                className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${
                  isAborted
                    ? 'border-surface-border bg-surface-sunken/40 text-text-secondary'
                    : isCooling
                    ? 'border-guardrail-cooling/30 bg-guardrail-cooling-bg/30 text-text-primary'
                    : 'border-surface-border bg-surface-card text-text-primary hover:border-surface-border-strong shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border bg-surface-sunken text-brand shrink-0">
                    {renderCategoryIconByName(categoryObj.iconName, 'h-4 w-4')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className={`text-xs font-bold leading-snug ${isAborted ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                        {expense.title}
                      </p>
                      {getStateBadge(expense.state, t.expenses)}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-text-secondary">
                      <span>{categoryName}</span>
                      <span>•</span>
                      <span>W{expense.envelopeWeek}</span>
                      <span>•</span>
                      <span>{formatDate(expense.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${
                        isAborted
                          ? 'text-guardrail-safe line-through'
                          : isCooling
                          ? 'text-guardrail-cooling'
                          : 'text-text-primary'
                      }`}
                    >
                      {isAborted ? `+${expense.amount.toLocaleString()}` : expense.amount.toLocaleString()} {currencySymbol}
                    </p>
                    {isAborted && (
                      <span className="text-[10px] font-semibold text-guardrail-safe">
                        {t.expenses.savingVictory}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(expense.id)}
                    title={t.expenses.deleteBtn}
                    className="rounded-lg p-1.5 text-text-muted hover:bg-surface-sunken hover:text-guardrail-danger transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

