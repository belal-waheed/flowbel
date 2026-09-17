import React, { useState, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { downloadBackupFile, restoreFromBackup, resetDatabaseToDefaults } from '../../services/backupService';
import { Database, Download, Upload, RotateCcw, CheckCircle2, AlertTriangle } from 'lucide-react';

export const DataManagement: React.FC = () => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExport = async () => {
    setMessage(null);
    try {
      await downloadBackupFile();
      setMessage({ type: 'success', text: 'Backup downloaded successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Export failed.' });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setMessage(null);

    try {
      const text = await file.text();
      const result = await restoreFromBackup(text);

      if (result.success) {
        setMessage({
          type: 'success',
          text: `${t.settings.importSuccess} (${result.counts?.cycles || 0} cycles, ${result.counts?.expenses || 0} expenses, ${result.counts?.obligations || 0} obligations)`
        });
      } else {
        setMessage({
          type: 'error',
          text: `${t.settings.importFailed} Details: ${result.message}`
        });
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to read file.'
      });
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleReset = async () => {
    if (window.confirm(t.settings.resetConfirm)) {
      setIsProcessing(true);
      setMessage(null);
      try {
        await resetDatabaseToDefaults();
        setMessage({ type: 'success', text: 'Restored default financial baseline.' });
      } catch (err) {
        setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Reset failed.' });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-5 space-y-4 shadow-xs">
      <div className="flex items-center gap-2 border-b border-surface-border pb-3">
        <Database className="h-4 w-4 text-brand" />
        <h3 className="text-sm font-bold text-text-primary m-0">
          {t.settings.dataManagement}
        </h3>
      </div>

      {message && (
        <div
          className={`flex items-start gap-2.5 rounded-xl border p-3 text-xs ${
            message.type === 'success'
              ? 'border-guardrail-safe/30 bg-guardrail-safe-bg text-guardrail-safe'
              : 'border-guardrail-danger/30 bg-guardrail-danger-bg text-guardrail-danger'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-guardrail-safe shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-guardrail-danger shrink-0 mt-0.5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="space-y-3">
        {/* Export Backup Card */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-surface-border bg-surface-sunken/40 p-3.5">
          <div className="max-w-md">
            <h4 className="text-xs font-bold text-text-primary m-0">
              {t.settings.exportBackup}
            </h4>
            <p className="text-[11px] text-text-secondary mt-0.5">
              {t.settings.exportDesc}
            </p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded-xl border border-surface-border-strong bg-surface-card px-3.5 py-1.5 text-xs font-semibold text-text-primary hover:bg-surface-sunken transition-colors shadow-xs"
          >
            <Download className="h-3.5 w-3.5 text-brand" />
            <span>Export</span>
          </button>
        </div>

        {/* Import Backup Card */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-surface-border bg-surface-sunken/40 p-3.5">
          <div className="max-w-md">
            <h4 className="text-xs font-bold text-text-primary m-0">
              {t.settings.importBackup}
            </h4>
            <p className="text-[11px] text-text-secondary mt-0.5">
              {t.settings.importDesc}
            </p>
          </div>
          <div>
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-xl border border-surface-border-strong bg-surface-card px-3.5 py-1.5 text-xs font-semibold text-text-primary hover:bg-surface-sunken transition-colors shadow-xs disabled:opacity-50"
            >
              <Upload className="h-3.5 w-3.5 text-brand" />
              <span>Import JSON</span>
            </button>
          </div>
        </div>

        {/* Reset Defaults Card */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-guardrail-danger/30 bg-guardrail-danger-bg/40 p-3.5">
          <div className="max-w-md">
            <h4 className="text-xs font-bold text-guardrail-danger m-0">
              {t.settings.resetDefaults}
            </h4>
            <p className="text-[11px] text-text-secondary mt-0.5">
              {t.settings.resetDesc}
            </p>
          </div>
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-guardrail-danger/30 bg-guardrail-danger-bg px-3.5 py-1.5 text-xs font-semibold text-guardrail-danger hover:bg-guardrail-danger-bg/80 transition-colors disabled:opacity-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
