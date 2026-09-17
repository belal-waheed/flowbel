import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { updateUserSettings } from '../../db/repositories/settingsRepository';
import { hapticsService } from '../../services/native/hapticsService';
import {
  Flame,
  Layers,
  CalendarCheck,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  X
} from 'lucide-react';

interface SpotlightTourProps {
  onComplete?: () => void;
}

export const SpotlightTour: React.FC<SpotlightTourProps> = ({ onComplete }) => {
  const { t, dir } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;

  const tourSteps = [
    {
      step: 1,
      title: t.tour.step1Title,
      description: t.tour.step1Desc,
      icon: <Flame className="h-6 w-6 text-brand" />
    },
    {
      step: 2,
      title: t.tour.step2Title,
      description: t.tour.step2Desc,
      icon: <Layers className="h-6 w-6 text-brand" />
    },
    {
      step: 3,
      title: t.tour.step3Title,
      description: t.tour.step3Desc,
      icon: <CalendarCheck className="h-6 w-6 text-brand" />
    },
    {
      step: 4,
      title: t.tour.step4Title,
      description: t.tour.step4Desc,
      icon: <BookOpen className="h-6 w-6 text-brand" />
    }
  ];

  const handleFinishOrSkip = async () => {
    hapticsService.notificationSuccess();
    try {
      await updateUserSettings({ hasSeenTour: true });
    } catch (err) {
      console.error('Failed to persist tour dismissal:', err);
    }
    if (onComplete) {
      onComplete();
    }
  };

  const handleNext = () => {
    hapticsService.impactLight();
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinishOrSkip();
    }
  };

  const handleBack = () => {
    hapticsService.impactLight();
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const current = tourSteps[currentStep - 1];

  return (
    <div
      dir={dir}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
    >
      <div className="w-full max-w-md rounded-3xl border border-surface-border bg-surface-card p-6 shadow-2xl transition-all sm:p-7 my-auto">
        {/* Top bar with step indicator & skip */}
        <div className="flex items-center justify-between border-b border-surface-border pb-3 mb-5">
          <span className="text-xs font-bold text-brand uppercase tracking-wider">
            {t.tour.stepOf
              .replace('{current}', currentStep.toString())
              .replace('{total}', totalSteps.toString())}
          </span>
          <button
            type="button"
            onClick={handleFinishOrSkip}
            className="flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            <span>{t.tour.skipBtn}</span>
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Step Icon & Content */}
        <div className="space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 border border-brand/20 shadow-xs">
            {current.icon}
          </div>

          <div>
            <h3 className="text-base font-bold text-text-primary m-0">
              {current.title}
            </h3>
            <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
              {current.description}
            </p>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="mt-7 flex items-center justify-between border-t border-surface-border pt-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1 rounded-xl border border-surface-border bg-surface-base px-3.5 py-1.5 text-xs font-bold text-text-secondary hover:bg-surface-sunken transition-colors"
            >
              {dir === 'rtl' ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
              <span>{t.tour.backBtn}</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s === currentStep ? 'w-4 bg-brand' : 'w-1.5 bg-surface-border'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-hover transition-colors"
          >
            <span>
              {currentStep === totalSteps ? t.tour.finishBtn : t.tour.nextBtn}
            </span>
            {currentStep === totalSteps ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : dir === 'rtl' ? (
              <ChevronLeft className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
