import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { generateInitialCycle } from '../../data/defaultBudget';
import {
  updateUserSettings,
  useCategories,
  updateCategory,
  DEFAULT_CATEGORIES
} from '../../db/repositories/settingsRepository';
import { bulkAddFixedObligations } from '../../db/repositories/fixedObligationRepository';
import { createInitialCycle } from '../../db/repositories/cycleRepository';
import { getLocalDateString } from '../../utils/dateHelpers';
import { hapticsService } from '../../services/native/hapticsService';
import type { FixedObligation, PersonaGoal } from '../../types/finance';
import {
  GraduationCap,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Sliders,
  ChevronRight,
  ChevronLeft,
  Check,
  Plus,
  Trash2,
  Calendar,
  DollarSign,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface OnboardingWizardProps {
  onComplete?: () => void;
}

const CURRENCIES = [
  { code: 'EGP', symbolEn: 'EGP', symbolAr: 'ج.م' },
  { code: 'USD', symbolEn: 'USD', symbolAr: '$' },
  { code: 'EUR', symbolEn: 'EUR', symbolAr: '€' },
  { code: 'SAR', symbolEn: 'SAR', symbolAr: 'ر.س' },
  { code: 'AED', symbolEn: 'AED', symbolAr: 'د.إ' }
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const { t, lang, dir } = useLanguage();
  const categories = useCategories();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Goal & Currency
  const [selectedGoal, setSelectedGoal] = useState<PersonaGoal>('student');
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);

  // Step 2: Allowance & Payday & Envelope count
  const [allowanceInput, setAllowanceInput] = useState<string>('');
  const [paydayDate, setPaydayDate] = useState<string>(() => getLocalDateString());
  const [envelopeCount, setEnvelopeCount] = useState<4 | 5>(4);
  const [allowanceError, setAllowanceError] = useState<string | null>(null);

  // Step 3: Fixed Commitments
  const [commitments, setCommitments] = useState<FixedObligation[]>([]);

  // Step 4: Categories & Guardrail
  const [coolingEnabled, setCoolingEnabled] = useState<boolean>(true);
  const [coolingThreshold, setCoolingThreshold] = useState<number>(150);
  const [coolingDurationHours, setCoolingDurationHours] = useState<number>(24);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(() =>
    DEFAULT_CATEGORIES.map((c) => c.id)
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const toggleCategory = (id: string) => {
    setSelectedCategoryIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) {
          hapticsService.notificationWarning();
          return prev;
        }
        hapticsService.impactLight();
        return prev.filter((catId) => catId !== id);
      }
      hapticsService.impactLight();
      return [...prev, id];
    });
  };

  const goalIcons: Record<PersonaGoal, React.ReactNode> = {
    student: <GraduationCap className="h-5 w-5" />,
    freelancer: <Briefcase className="h-5 w-5" />,
    professional: <TrendingUp className="h-5 w-5" />,
    debt_clearance: <ShieldCheck className="h-5 w-5" />,
    debtFree: <ShieldCheck className="h-5 w-5" />,
    custom: <Sliders className="h-5 w-5" />
  };

  const handleAddTemplate = (key: keyof typeof t.onboarding.commitmentTemplates, category: string) => {
    hapticsService.impactLight();
    const titleEn = t.onboarding.commitmentTemplates[key];
    const titleAr = t.onboarding.commitmentTemplates[key];
    const newObligation: FixedObligation = {
      id: `fix_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      category,
      titleEn,
      titleAr,
      amount: 0,
      dueDay: 1,
      isPaid: false
    };
    setCommitments((prev) => [...prev, newObligation]);
  };

  const handleUpdateCommitment = (id: string, partial: Partial<FixedObligation>) => {
    setCommitments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...partial } : c))
    );
  };

  const handleRemoveCommitment = (id: string) => {
    hapticsService.impactLight();
    setCommitments((prev) => prev.filter((c) => c.id !== id));
  };

  const totalFixedCosts = commitments.reduce(
    (sum, c) => sum + (Number.isFinite(c.amount) ? c.amount : 0),
    0
  );

  const handleNextStep = () => {
    if (step === 2) {
      const val = parseFloat(allowanceInput);
      if (isNaN(val) || val <= 0) {
        setAllowanceError(lang === 'ar' ? 'يرجى إدخال مبلغ صحيح' : 'Please enter a valid allowance');
        hapticsService.notificationWarning();
        return;
      }
      setAllowanceError(null);
    }
    hapticsService.impactMedium();
    if (step < 4) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleBackStep = () => {
    hapticsService.impactLight();
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleFinish = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const allowance = parseFloat(allowanceInput) || 0;
      const validCommitments = commitments.filter((c) => c.amount > 0);

      // 1. Save user settings
      await updateUserSettings({
        currencyCode: selectedCurrency.code,
        currencySymbolEn: selectedCurrency.symbolEn,
        currencySymbolAr: selectedCurrency.symbolAr,
        envelopeCount,
        envelopeWeights:
          envelopeCount === 4 ? [0.25, 0.25, 0.25, 0.25] : [0.2, 0.2, 0.2, 0.2, 0.2],
        coolingEnabled,
        coolingThreshold,
        coolingDurationHours,
        isOnboarded: true,
        hasSeenTour: false,
        goal: selectedGoal === 'debtFree' ? 'debt_clearance' : selectedGoal
      });

      // Soft-archive any categories unselected during onboarding
      for (const cat of categories) {
        if (!selectedCategoryIds.includes(cat.id)) {
          await updateCategory(cat.id, { isArchived: true });
        }
      }

      // 2. Save fixed obligations
      if (validCommitments.length > 0) {
        await bulkAddFixedObligations(validCommitments);
      }

      // 3. Generate initial personalized cycle
      const startDate = new Date(paydayDate);
      const initialCycle = generateInitialCycle(
        startDate,
        allowance,
        validCommitments,
        envelopeCount
      );
      await createInitialCycle(initialCycle);

      await hapticsService.notificationSuccess();

      if (onComplete) {
        onComplete();
      }
    } catch (err) {
      console.error('Failed to complete onboarding:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      dir={dir}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto"
    >
      <div className="w-full max-w-xl rounded-3xl border border-surface-border bg-surface-card p-6 shadow-2xl transition-all sm:p-8 my-auto">
        {/* Step Progress Header */}
        <div className="mb-6 flex items-center justify-between border-b border-surface-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                {t.onboarding.stepIndicator
                  .replace('{current}', step.toString())
                  .replace('{total}', '4')}
              </span>
            </div>
            <h2 className="text-lg font-bold text-text-primary mt-1 m-0">
              {step === 1 && t.onboarding.step1Title}
              {step === 2 && t.onboarding.step2Title}
              {step === 3 && t.onboarding.step3Title}
              {step === 4 && t.onboarding.step4Title}
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              {step === 1 && t.onboarding.step1Sub}
              {step === 2 && t.onboarding.step2Sub}
              {step === 3 && t.onboarding.step3Sub}
              {step === 4 && t.onboarding.step4Sub}
            </p>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-1.5 shrink-0">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step
                    ? 'w-6 bg-brand'
                    : s < step
                    ? 'w-2 bg-brand/40'
                    : 'w-2 bg-surface-border'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {/* STEP 1: Goal & Currency */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-text-primary mb-2.5">
                  {t.onboarding.goalLabel}
                </label>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {(['student', 'freelancer', 'professional', 'debtFree', 'custom'] as const).map(
                    (key) => {
                      const goalValue: PersonaGoal = key === 'debtFree' ? 'debt_clearance' : key;
                      const isSelected = selectedGoal === goalValue || selectedGoal === key;
                      const g = t.onboarding.goals[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            hapticsService.impactLight();
                            setSelectedGoal(goalValue);
                          }}
                          className={`flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                            isSelected
                              ? 'border-brand bg-brand/5 shadow-xs ring-1 ring-brand'
                              : 'border-surface-border bg-surface-base hover:bg-surface-sunken'
                          }`}
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                              isSelected
                                ? 'bg-brand text-white'
                                : 'bg-surface-card border border-surface-border text-text-secondary'
                            }`}
                          >
                            {goalIcons[key]}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-text-primary">
                              {g.title}
                            </div>
                            <div className="text-[11px] text-text-secondary mt-0.5 leading-snug">
                              {g.desc}
                            </div>
                          </div>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-primary mb-2">
                  {t.onboarding.currencyLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {CURRENCIES.map((cur) => {
                    const isSelected = selectedCurrency.code === cur.code;
                    return (
                      <button
                        key={cur.code}
                        type="button"
                        onClick={() => {
                          hapticsService.impactLight();
                          setSelectedCurrency(cur);
                        }}
                        className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
                          isSelected
                            ? 'border-brand bg-brand text-white shadow-xs'
                            : 'border-surface-border bg-surface-base text-text-primary hover:bg-surface-sunken'
                        }`}
                      >
                        <span>{cur.code}</span>
                        <span className="opacity-75">
                          ({lang === 'ar' ? cur.symbolAr : cur.symbolEn})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Monthly Allowance & Payday */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">
                  {t.onboarding.allowanceLabel}
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-text-secondary">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={allowanceInput}
                    onChange={(e) => {
                      setAllowanceInput(e.target.value);
                      if (allowanceError) setAllowanceError(null);
                    }}
                    placeholder={t.onboarding.allowancePlaceholder}
                    className={`w-full rounded-xl border bg-surface-base ps-10 pe-16 py-2.5 text-sm font-semibold text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand ${
                      allowanceError ? 'border-guardrail-danger ring-1 ring-guardrail-danger' : 'border-surface-border-strong'
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3.5 text-xs font-bold text-text-secondary">
                    {selectedCurrency.code}
                  </div>
                </div>
                {allowanceError && (
                  <p className="flex items-center gap-1 text-[11px] text-guardrail-danger mt-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{allowanceError}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">
                  {t.onboarding.paydayLabel}
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-text-secondary">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <input
                    type="date"
                    value={paydayDate}
                    onChange={(e) => setPaydayDate(e.target.value)}
                    className="w-full rounded-xl border border-surface-border-strong bg-surface-base ps-10 pe-4 py-2.5 text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">
                  {t.onboarding.envelopeCountLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      hapticsService.impactLight();
                      setEnvelopeCount(4);
                    }}
                    className={`rounded-xl border p-3 text-center text-xs font-bold transition-all ${
                      envelopeCount === 4
                        ? 'border-brand bg-brand/10 text-brand ring-1 ring-brand'
                        : 'border-surface-border bg-surface-base text-text-secondary hover:bg-surface-sunken'
                    }`}
                  >
                    {t.onboarding.envelopeCount4}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      hapticsService.impactLight();
                      setEnvelopeCount(5);
                    }}
                    className={`rounded-xl border p-3 text-center text-xs font-bold transition-all ${
                      envelopeCount === 5
                        ? 'border-brand bg-brand/10 text-brand ring-1 ring-brand'
                        : 'border-surface-border bg-surface-base text-text-secondary hover:bg-surface-sunken'
                    }`}
                  >
                    {t.onboarding.envelopeCount5}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Fixed Commitments */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">
                  {t.onboarding.addCommitment}
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddTemplate('rent', 'housing')}
                    className="flex items-center gap-1 rounded-lg border border-surface-border bg-surface-base px-2.5 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-sunken"
                  >
                    <Plus className="h-3.5 w-3.5 text-brand" />
                    <span>{t.onboarding.commitmentTemplates.rent}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddTemplate('internet', 'connectivity')}
                    className="flex items-center gap-1 rounded-lg border border-surface-border bg-surface-base px-2.5 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-sunken"
                  >
                    <Plus className="h-3.5 w-3.5 text-brand" />
                    <span>{t.onboarding.commitmentTemplates.internet}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddTemplate('transit', 'transit')}
                    className="flex items-center gap-1 rounded-lg border border-surface-border bg-surface-base px-2.5 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-sunken"
                  >
                    <Plus className="h-3.5 w-3.5 text-brand" />
                    <span>{t.onboarding.commitmentTemplates.transit}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddTemplate('gym', 'fitness')}
                    className="flex items-center gap-1 rounded-lg border border-surface-border bg-surface-base px-2.5 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-sunken"
                  >
                    <Plus className="h-3.5 w-3.5 text-brand" />
                    <span>{t.onboarding.commitmentTemplates.gym}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddTemplate('tuition', 'academic')}
                    className="flex items-center gap-1 rounded-lg border border-surface-border bg-surface-base px-2.5 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-sunken"
                  >
                    <Plus className="h-3.5 w-3.5 text-brand" />
                    <span>{t.onboarding.commitmentTemplates.tuition}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddTemplate('coffee', 'personal')}
                    className="flex items-center gap-1 rounded-lg border border-surface-border bg-surface-base px-2.5 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-sunken"
                  >
                    <Plus className="h-3.5 w-3.5 text-brand" />
                    <span>{t.onboarding.commitmentTemplates.coffee}</span>
                  </button>
                </div>
              </div>

              {commitments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-surface-border p-5 text-center text-xs text-text-secondary">
                  <p>{t.onboarding.noCommitmentsNote}</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-52 overflow-y-auto pe-1">
                  {commitments.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-2 rounded-xl border border-surface-border bg-surface-base p-2.5"
                    >
                      <input
                        type="text"
                        value={lang === 'ar' ? c.titleAr : c.titleEn}
                        onChange={(e) =>
                          handleUpdateCommitment(c.id, {
                            titleEn: e.target.value,
                            titleAr: e.target.value
                          })
                        }
                        className="flex-1 rounded-lg border border-surface-border-strong bg-surface-card px-2.5 py-1.5 text-xs font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                      <div className="relative w-28 shrink-0">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={c.amount === 0 ? '' : c.amount}
                          placeholder="0"
                          onChange={(e) =>
                            handleUpdateCommitment(c.id, {
                              amount: parseFloat(e.target.value) || 0
                            })
                          }
                          className="w-full rounded-lg border border-surface-border-strong bg-surface-card px-2.5 py-1.5 text-xs font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCommitment(c.id)}
                        className="rounded-lg p-1.5 text-text-secondary hover:bg-surface-sunken hover:text-guardrail-danger transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between rounded-xl bg-surface-sunken px-4 py-2.5 text-xs font-bold">
                <span className="text-text-secondary">{t.onboarding.totalFixedLabel}</span>
                <span className="text-brand">
                  {totalFixedCosts.toLocaleString()}{' '}
                  {lang === 'ar' ? selectedCurrency.symbolAr : selectedCurrency.symbolEn}
                </span>
              </div>

              {totalFixedCosts > (parseFloat(allowanceInput) || 0) && (
                <div className="flex items-center gap-2 rounded-xl border border-guardrail-danger/30 bg-guardrail-danger-bg p-3 text-xs text-guardrail-danger">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'تنبيه: إجمالي الالتزامات الثابتة يتجاوز المصروف الكلي المدخل.'
                      : 'Notice: Fixed commitments exceed your entered monthly allowance.'}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Categories & Guardrail */}
          {step === 4 && (
            <div className="space-y-5">
              {/* Cooling Guardrail Box */}
              <div className="rounded-2xl border border-surface-border bg-surface-sunken p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand" />
                    <span className="text-xs font-bold text-text-primary">
                      {t.onboarding.guardrailTitle}
                    </span>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={coolingEnabled}
                      onChange={(e) => {
                        hapticsService.impactLight();
                        setCoolingEnabled(e.target.checked);
                      }}
                      className="peer sr-only"
                    />
                    <div className="peer h-5 w-9 rounded-full bg-surface-border after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand peer-checked:after:translate-x-full peer-focus:outline-none" />
                  </label>
                </div>

                <p className="text-[11px] text-text-secondary leading-relaxed">
                  {t.onboarding.guardrailDesc}
                </p>

                {coolingEnabled && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold text-text-secondary mb-1">
                        {t.onboarding.thresholdLabel}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          value={coolingThreshold}
                          onChange={(e) =>
                            setCoolingThreshold(parseFloat(e.target.value) || 0)
                          }
                          className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-1.5 text-xs font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                        <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-[10px] font-bold text-text-secondary">
                          {selectedCurrency.code}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-text-secondary mb-1">
                        {t.onboarding.durationLabel}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="72"
                        value={coolingDurationHours}
                        onChange={(e) =>
                          setCoolingDurationHours(parseInt(e.target.value, 10) || 24)
                        }
                        className="w-full rounded-xl border border-surface-border-strong bg-surface-card px-3 py-1.5 text-xs font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Category selection chips */}
              <div>
                <label className="block text-xs font-bold text-text-primary mb-2">
                  {lang === 'ar' ? 'التصنيفات المتاحة' : 'Active Spending Categories'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => {
                    const isSelected = selectedCategoryIds.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-all ${
                          isSelected
                            ? 'bg-brand text-white border-brand shadow-xs'
                            : 'bg-surface-card text-text-secondary border-surface-border hover:bg-surface-sunken'
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                        <span>{lang === 'ar' ? cat.nameAr : cat.nameEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="mt-8 flex items-center justify-between border-t border-surface-border pt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBackStep}
              className="flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface-base px-4 py-2 text-xs font-bold text-text-secondary hover:bg-surface-sunken transition-colors"
            >
              {dir === 'rtl' ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
              <span>{t.onboarding.backBtn}</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {step === 3 && commitments.length === 0 && (
              <button
                type="button"
                onClick={handleNextStep}
                className="text-xs font-bold text-text-secondary hover:text-text-primary px-3 py-2"
              >
                {t.onboarding.skipCommitments}
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-1.5 rounded-xl bg-brand px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-hover transition-colors"
              >
                <span>{t.onboarding.nextBtn}</span>
                {dir === 'rtl' ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinish}
                className="flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-hover transition-all disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                <span>{t.onboarding.finishBtn}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
