import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useFixedObligations } from '../../db/repositories/fixedObligationRepository';
import type { BudgetCycle } from '../../types/finance';
import { updateActiveCycleSettings, startNewBudgetCycle, calculateEnvelopes } from '../../services/cycleService';
import { Settings, Calendar, Save, CheckCircle2, RotateCcw } from 'lucide-react';

interface CycleSettingsProps {
  cycle: BudgetCycle | undefined;
}

export const CycleSettings: React.FC<CycleSettingsProps> = ({ cycle }) => {
  const { t } = useLanguage();

  const [allowanceStr, setAllowanceStr] = useState(() =>
    cycle ? cycle.totalAllowance.toString() : '6800'
  );
  const [paydayDate, setPaydayDate] = useState(() =>
    cycle ? new Date(cycle.startDate).toISOString().split('T')[0] : ''
  );
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const obligations = useFixedObligations();

  const totalFixed = obligations.reduce((sum, o) => sum + o.amount, 0);
  const allowance = parseFloat(allowanceStr) || 0;
  const { variablePool, weeklyAllocation } = calculateEnvelopes(allowance, totalFixed);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cycle) return;

    if (isCreatingNew && paydayDate) {
      const selectedDate = new Date(paydayDate);
      await startNewBudgetCycle(selectedDate, allowance, obligations);
    } else {
      await updateActiveCycleSettings(cycle.id, allowance, obligations);
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-5 space-y-4 shadow-xs">
      <div className="flex items-center gap-2 border-b border-surface-border pb-3">
        <Settings className="h-4 w-4 text-brand" />
        <h3 className="text-sm font-bold text-text-primary m-0">
          {t.settings.cycleConfig}
        </h3>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 rounded-xl border border-guardrail-safe/30 bg-guardrail-safe-bg p-3 text-xs text-guardrail-safe">
          <CheckCircle2 className="h-4 w-4 text-guardrail-safe shrink-0" />
          <span>{t.settings.savedChanges}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        {/* Allowance input */}
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">
            {t.settings.allowanceLabel}
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              required
              value={allowanceStr}
              onChange={(e) => setAllowanceStr(e.target.value)}
              className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-2 text-sm font-bold text-text-primary focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-text-muted pointer-events-none">
              {t.currency}
            </span>
          </div>
        </div>

        {/* Payday anchor date */}
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">
            {t.settings.paydayLabel}
          </label>
          <div className="relative">
            <input
              type="date"
              required
              value={paydayDate}
              onChange={(e) => setPaydayDate(e.target.value)}
              className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-2 text-xs text-text-primary focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
            />
            <Calendar className="absolute inset-y-0 right-3 my-auto h-4 w-4 text-text-muted pointer-events-none" />
          </div>
        </div>

        {/* Live Calculation Preview */}
        <div className="rounded-xl border border-surface-border bg-surface-sunken p-3.5 space-y-2 text-xs">
          <div className="flex justify-between text-text-secondary">
            <span>{t.dashboard.fixedCommitted}:</span>
            <span className="font-semibold text-text-primary">
              {totalFixed.toLocaleString()} {t.currency}
            </span>
          </div>
          <div className="flex justify-between text-text-secondary">
            <span>{t.dashboard.variablePool}:</span>
            <span className="font-semibold text-brand">
              {variablePool.toLocaleString()} {t.currency}
            </span>
          </div>
          <div className="flex justify-between border-t border-surface-border pt-2 font-bold text-text-primary">
            <span>{t.dashboard.weeklyEnvelopes} (x4):</span>
            <span className="text-guardrail-safe">
              {weeklyAllocation.toLocaleString()} {t.currency} / week
            </span>
          </div>
        </div>

        {/* New Cycle Toggle Checkbox */}
        <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            checked={isCreatingNew}
            onChange={(e) => setIsCreatingNew(e.target.checked)}
            className="rounded border-surface-border-strong bg-surface-card text-brand focus:ring-0"
          />
          <span>Start a fresh 28-day cycle from this payday date</span>
        </label>

        {/* Submit */}
        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-hover transition-colors focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {isCreatingNew ? <RotateCcw className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
            <span>{isCreatingNew ? 'Start New Cycle' : t.settings.updateCycleBtn}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
