import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import type { PlaybookScenario } from '../../types/playbook';
import {
  ArrowLeft,
  ArrowRight,
  CheckSquare,
  Square,
  AlertTriangle,
  Copy,
  Check,
  MessageSquareQuote,
  Scale,
  Compass
} from 'lucide-react';

interface PlaybookViewProps {
  scenario: PlaybookScenario;
  onBack: () => void;
}

export const PlaybookView: React.FC<PlaybookViewProps> = ({ scenario, onBack }) => {
  const { t, lang } = useLanguage();
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(`flowbel_checks_${scenario.id}`);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleCheck = (stepId: string) => {
    setCheckedSteps((prev) => {
      const next = { ...prev, [stepId]: !prev[stepId] };
      localStorage.setItem(`flowbel_checks_${scenario.id}`, JSON.stringify(next));
      return next;
    });
  };

  const handleCopyScript = (scriptText: string, index: number) => {
    navigator.clipboard.writeText(scriptText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const completedCount = scenario.steps.filter((s) => checkedSteps[s.id]).length;
  const progressPercent = Math.round((completedCount / scenario.steps.length) * 100);

  return (
    <div className="space-y-5 pb-6">
      {/* Back Button & Title Header */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-hover transition-colors"
        >
          {lang === 'ar' ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
          <span>{t.playbooks.backToList}</span>
        </button>

        <h2 className="text-xl font-bold text-text-primary m-0">
          {lang === 'ar' ? scenario.titleAr : scenario.titleEn}
        </h2>
        <p className="text-xs text-text-secondary mt-1">
          {lang === 'ar' ? scenario.subtitleAr : scenario.subtitleEn}
        </p>
      </div>

      {/* Real-World Context Box */}
      <div className="rounded-2xl border border-surface-border bg-surface-card p-4 text-xs text-text-secondary leading-relaxed shadow-xs">
        <p>{lang === 'ar' ? scenario.contextAr : scenario.contextEn}</p>
      </div>

      {/* The Core Principle Banner */}
      <div className="rounded-2xl border border-surface-border bg-surface-sunken p-4 text-text-primary shadow-xs">
        <div className="flex items-center gap-2 text-brand mb-1.5">
          <Compass className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider text-brand">
            {t.playbooks.goldenRuleBadge}
          </span>
        </div>
        <p className="text-sm font-semibold text-text-primary leading-relaxed">
          {lang === 'ar' ? scenario.goldenRuleAr : scenario.goldenRuleEn}
        </p>
      </div>

      {/* Actionable Step-by-Step Checklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 m-0">
            <span>{t.playbooks.stepsTitle}</span>
          </h3>
          <span className="text-xs font-semibold text-text-secondary">
            {completedCount} / {scenario.steps.length} {t.playbooks.completed}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken border border-surface-border">
          <div
            className="h-full bg-brand transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="space-y-3 pt-1">
          {scenario.steps.map((step, idx) => {
            const isChecked = !!checkedSteps[step.id];

            return (
              <div
                key={step.id}
                className={`rounded-2xl border p-4 transition-all ${
                  isChecked
                    ? 'border-guardrail-safe/30 bg-guardrail-safe-bg/60'
                    : 'border-surface-border bg-surface-card shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-surface-border bg-surface-sunken text-xs font-bold text-text-muted">
                    {idx + 1}
                  </span>

                  <div className="flex-1 space-y-2">
                    <h4 className="text-sm font-bold text-text-primary m-0">
                      {lang === 'ar' ? step.titleAr : step.titleEn}
                    </h4>

                    <p className="text-xs text-text-secondary leading-relaxed">
                      {lang === 'ar' ? step.descriptionAr : step.descriptionEn}
                    </p>

                    {/* Critical Warning if present */}
                    {(step.warningEn || step.warningAr) && (
                      <div className="flex items-start gap-2 rounded-xl border border-guardrail-danger/30 bg-guardrail-danger-bg p-2.5 text-[11px] text-guardrail-danger">
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-guardrail-danger mt-0.5" />
                        <div>
                          <strong className="font-semibold block text-[10px] uppercase text-guardrail-danger">
                            {t.playbooks.warningPrefix}:
                          </strong>
                          <span>{lang === 'ar' ? step.warningAr : step.warningEn}</span>
                        </div>
                      </div>
                    )}

                    {/* Interactive Actionable Checkbox */}
                    <button
                      type="button"
                      onClick={() => toggleCheck(step.id)}
                      className={`w-full mt-2 flex items-center gap-2.5 rounded-xl border px-3 py-2 text-left transition-colors ${
                        isChecked
                          ? 'border-guardrail-safe/40 bg-guardrail-safe-bg text-guardrail-safe'
                          : 'border-surface-border-strong bg-surface-card hover:bg-surface-sunken text-text-secondary'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="h-4 w-4 text-guardrail-safe shrink-0" />
                      ) : (
                        <Square className="h-4 w-4 text-text-muted shrink-0" />
                      )}
                      <span className="text-xs font-medium">
                        {lang === 'ar' ? step.actionableCheckAr : step.actionableCheckEn}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Response Scripts Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <MessageSquareQuote className="h-4 w-4 text-brand" />
          <h3 className="text-sm font-bold text-text-primary m-0">
            {t.playbooks.dialoguesTitle}
          </h3>
        </div>

        <div className="space-y-2.5">
          {scenario.dialogues.map((dlg, dIdx) => {
            const isCopied = copiedIndex === dIdx;
            const script = lang === 'ar' ? dlg.scriptAr : dlg.scriptEn;

            return (
              <div
                key={dIdx}
                className="rounded-2xl border border-surface-border bg-surface-card p-4 space-y-2 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-brand">
                    {lang === 'ar' ? dlg.triggerAr : dlg.triggerEn}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyScript(script, dIdx)}
                    className="flex items-center gap-1 rounded-lg border border-surface-border-strong bg-surface-card px-2 py-1 text-[11px] text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3 text-guardrail-safe" />
                        <span className="text-guardrail-safe font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 text-text-muted" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-xl border border-surface-border bg-surface-sunken p-3 text-xs font-medium text-text-primary leading-relaxed">
                  "{script}"
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Principles Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <Scale className="h-4 w-4 text-brand" />
          <h3 className="text-sm font-bold text-text-primary m-0">
            {t.playbooks.principlesTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {scenario.principles.map((pr) => (
            <div
              key={pr.id}
              className="rounded-xl border border-surface-border bg-surface-card p-3.5 space-y-1 shadow-xs"
            >
              <h5 className="text-xs font-bold text-text-primary m-0">
                {lang === 'ar' ? pr.ruleAr : pr.ruleEn}
              </h5>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                {lang === 'ar' ? pr.explanationAr : pr.explanationEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
