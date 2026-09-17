import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useFixedObligations } from '../../db/repositories/fixedObligationRepository';
import { useUserSettings, updateUserSettings } from '../../db/repositories/settingsRepository';
import type { BudgetCycle } from '../../types/finance';
import { updateActiveCycleSettings, startNewBudgetCycle, calculateEnvelopes } from '../../services/cycleService';
import { getLocalDateString } from '../../utils/dateHelpers';
import {
  Settings,
  Calendar,
  Save,
  CheckCircle2,
  RotateCcw,
  SlidersHorizontal,
  Tag,
  ShieldAlert,
  Coins,
  Layers,
  AlertCircle
} from 'lucide-react';
import { ManageCommitmentsModal } from '../dashboard/ManageCommitmentsModal';
import { CategoryManagerModal } from './CategoryManagerModal';

interface CycleSettingsProps {
  cycle: BudgetCycle | undefined;
}

const PRESET_CURRENCIES = [
  { code: 'EGP', symbolEn: 'EGP', symbolAr: 'ج.م', labelEn: 'Egyptian Pound (EGP)', labelAr: 'جنيه مصري (ج.م)' },
  { code: 'USD', symbolEn: '$', symbolAr: '$', labelEn: 'US Dollar ($)', labelAr: 'دولار أمريكي ($)' },
  { code: 'EUR', symbolEn: '€', symbolAr: '€', labelEn: 'Euro (€)', labelAr: 'يورو (€)' },
  { code: 'SAR', symbolEn: 'SAR', symbolAr: 'ر.س', labelEn: 'Saudi Riyal (SAR)', labelAr: 'ريال سعودي (ر.س)' },
  { code: 'AED', symbolEn: 'AED', symbolAr: 'د.إ', labelEn: 'UAE Dirham (AED)', labelAr: 'درهم إماراتي (د.إ)' }
];

export const CycleSettings: React.FC<CycleSettingsProps> = ({ cycle }) => {
  const { t, lang } = useLanguage();
  const settings = useUserSettings();
  const obligations = useFixedObligations();

  const [allowanceStr, setAllowanceStr] = useState(() =>
    cycle ? cycle.totalAllowance.toString() : ''
  );
  const [paydayDate, setPaydayDate] = useState(() =>
    cycle ? getLocalDateString(new Date(cycle.startDate)) : getLocalDateString()
  );
  const [envelopeCount, setEnvelopeCount] = useState<4 | 5>(() => settings.envelopeCount || 4);
  const [coolingThresholdStr, setCoolingThresholdStr] = useState(() => settings.coolingThreshold.toString());
  const [coolingHoursStr, setCoolingHoursStr] = useState(() => settings.coolingDurationHours.toString());
  const [coolingEnabled, setCoolingEnabled] = useState(() => settings.coolingEnabled ?? true);
  const [selectedCurrency, setSelectedCurrency] = useState(() => settings.currencyCode || 'EGP');

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isCommitmentsModalOpen, setIsCommitmentsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const totalFixed = obligations.reduce((sum, o) => sum + o.amount, 0);
  const allowance = parseFloat(allowanceStr) || 0;
  const { variablePool, weeklyAllocation, allocations } = calculateEnvelopes(
    allowance,
    totalFixed,
    envelopeCount,
    settings.envelopeWeights
  );

  const activeCurrencySymbol = lang === 'ar' ? settings.currencySymbolAr : settings.currencySymbolEn;

  const handleCurrencyChange = async (code: string) => {
    setSelectedCurrency(code);
    const preset = PRESET_CURRENCIES.find((c) => c.code === code);
    if (preset) {
      await updateUserSettings({
        currencyCode: preset.code,
        currencySymbolEn: preset.symbolEn,
        currencySymbolAr: preset.symbolAr
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (totalFixed > allowance) {
      setErrorMsg(
        lang === 'ar'
          ? 'تنبيه ملاءة مالية: إجمالي الالتزامات الثابتة يتجاوز المصروف الكلي المحدد. يرجى تعديل المصروف أو الالتزامات.'
          : 'Solvency Warning: Total fixed commitments exceed total allowance. Please adjust allowance or commitments.'
      );
      return;
    }

    const threshold = parseFloat(coolingThresholdStr) || 150;
    const hours = parseInt(coolingHoursStr, 10) || 24;

    await updateUserSettings({
      envelopeCount,
      coolingThreshold: threshold,
      coolingDurationHours: hours,
      coolingEnabled
    });

    if (cycle) {
      if (isCreatingNew && paydayDate) {
        const selectedDate = new Date(paydayDate);
        await startNewBudgetCycle(selectedDate, allowance, obligations, envelopeCount, settings.envelopeWeights);
      } else {
        await updateActiveCycleSettings(cycle.id, allowance, obligations, envelopeCount, settings.envelopeWeights);
      }
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-5 space-y-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-surface-border pb-3">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-brand" />
          <h3 className="text-sm font-bold text-text-primary m-0">
            {t.settings.cycleConfig}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCommitmentsModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface-sunken px-2.5 py-1 text-xs font-semibold text-text-secondary hover:border-brand/40 hover:text-brand transition-colors"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.settings.manageCommitmentsBtn}</span>
            <span className="sm:hidden">{t.dashboard.manageBtn}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface-sunken px-2.5 py-1 text-xs font-semibold text-text-secondary hover:border-brand/40 hover:text-brand transition-colors"
          >
            <Tag className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.settings.manageCategoriesBtn}</span>
            <span className="sm:hidden">{lang === 'ar' ? 'التصنيفات' : 'Tags'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 rounded-xl border border-guardrail-safe/30 bg-guardrail-safe-bg p-3 text-xs text-guardrail-safe">
          <CheckCircle2 className="h-4 w-4 text-guardrail-safe shrink-0" />
          <span>{t.settings.savedChanges}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-guardrail-danger/30 bg-guardrail-danger-bg p-3 text-xs text-guardrail-danger">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        {/* Currency Selector */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-text-primary mb-1">
            <Coins className="h-3.5 w-3.5 text-brand" />
            <span>{t.settings.currencySelector}</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {PRESET_CURRENCIES.map((cur) => (
              <button
                key={cur.code}
                type="button"
                onClick={() => handleCurrencyChange(cur.code)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs transition-all ${
                  selectedCurrency === cur.code
                    ? 'border-brand bg-brand-subtle text-brand font-bold shadow-xs'
                    : 'border-surface-border bg-surface-sunken/40 text-text-secondary hover:border-surface-border-strong hover:text-text-primary'
                }`}
              >
                <span className="text-sm font-extrabold">{cur.symbolEn}</span>
                <span className="text-[10px] text-text-muted mt-0.5">{cur.code}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Envelope Model (4 vs 5 weeks) */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-text-primary mb-1">
            <Layers className="h-3.5 w-3.5 text-brand" />
            <span>{t.settings.envelopeModel}</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setEnvelopeCount(4)}
              className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                envelopeCount === 4
                  ? 'border-brand bg-brand-subtle text-brand shadow-xs'
                  : 'border-surface-border bg-surface-sunken/40 text-text-secondary hover:border-surface-border-strong hover:text-text-primary'
              }`}
            >
              {t.settings.weeks4}
            </button>
            <button
              type="button"
              onClick={() => setEnvelopeCount(5)}
              className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                envelopeCount === 5
                  ? 'border-brand bg-brand-subtle text-brand shadow-xs'
                  : 'border-surface-border bg-surface-sunken/40 text-text-secondary hover:border-surface-border-strong hover:text-text-primary'
              }`}
            >
              {t.settings.weeks5}
            </button>
          </div>
        </div>

        {/* Allowance & Payday */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <span className="absolute inset-y-0 end-3 flex items-center text-xs font-semibold text-text-muted pointer-events-none">
                {activeCurrencySymbol}
              </span>
            </div>
          </div>

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
              <Calendar className="absolute inset-y-0 end-3 my-auto h-4 w-4 text-text-muted pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Mindful Spending Guardrail Settings */}
        <div className="rounded-xl border border-surface-border bg-surface-sunken/50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-brand" />
              <h4 className="text-xs font-bold text-text-primary m-0">
                {t.settings.coolingSettings}
              </h4>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={coolingEnabled}
                onChange={(e) => setCoolingEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-surface-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-surface-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-text-secondary mb-1">
                {t.settings.coolingThresholdLabel} ({activeCurrencySymbol})
              </label>
              <input
                type="number"
                min="0"
                step="any"
                disabled={!coolingEnabled}
                value={coolingThresholdStr}
                onChange={(e) => setCoolingThresholdStr(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-card px-3 py-1.5 text-xs text-text-primary focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-text-secondary mb-1">
                {t.settings.coolingDurationLabel}
              </label>
              <input
                type="number"
                min="1"
                max="168"
                disabled={!coolingEnabled}
                value={coolingHoursStr}
                onChange={(e) => setCoolingHoursStr(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-card px-3 py-1.5 text-xs text-text-primary focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Live Calculation Preview */}
        <div className="rounded-xl border border-surface-border bg-surface-sunken p-3.5 space-y-2 text-xs">
          <div className="flex justify-between text-text-secondary">
            <span>{t.dashboard.fixedCommitted}:</span>
            <span className="font-semibold text-text-primary">
              {totalFixed.toLocaleString()} {activeCurrencySymbol}
            </span>
          </div>
          <div className="flex justify-between text-text-secondary">
            <span>{t.dashboard.variablePool}:</span>
            <span className="font-semibold text-brand">
              {variablePool.toLocaleString()} {activeCurrencySymbol}
            </span>
          </div>
          <div className="flex justify-between border-t border-surface-border pt-2 font-bold text-text-primary">
            <span>{t.dashboard.weeklyEnvelopes} (x{envelopeCount}):</span>
            <span className="text-guardrail-safe">
              {allocations.length > 0 ? allocations[0].toLocaleString() : weeklyAllocation.toLocaleString()} {activeCurrencySymbol} / {lang === 'ar' ? 'أسبوع' : 'week'}
            </span>
          </div>
        </div>

        {/* New Cycle Toggle */}
        <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            checked={isCreatingNew}
            onChange={(e) => setIsCreatingNew(e.target.checked)}
            className="rounded border-surface-border-strong bg-surface-card text-brand focus:ring-0"
          />
          <span>{lang === 'ar' ? `بدء دورة مالية جديدة مدتها ${envelopeCount * 7} يوماً من هذا التاريخ` : `Start a fresh ${envelopeCount * 7}-day cycle from this payday date`}</span>
        </label>

        {/* Submit Button */}
        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-hover transition-colors focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {isCreatingNew ? <RotateCcw className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
            <span>{isCreatingNew ? (lang === 'ar' ? 'بدء الدورة الجديدة' : 'Start New Cycle') : t.settings.updateCycleBtn}</span>
          </button>
        </div>
      </form>

      <ManageCommitmentsModal
        isOpen={isCommitmentsModalOpen}
        onClose={() => setIsCommitmentsModalOpen(false)}
      />

      <CategoryManagerModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </div>
  );
};
