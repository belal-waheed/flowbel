import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Languages } from 'lucide-react';

export const Header: React.FC = () => {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-border bg-surface-base/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-card border border-brand/20 p-1 shadow-xs overflow-hidden">
            <img src="/favicon.svg" alt="Flowbel Logo" className="h-8 w-8 object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-text-primary m-0">
              {t.appName}
            </h1>
            <p className="text-xs text-text-secondary font-medium">
              {t.appTagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={toggleLang}
            aria-label="Switch Language"
            className="flex h-9 items-center gap-1.5 rounded-lg border border-surface-border bg-surface-card px-3 text-xs font-semibold text-text-primary hover:bg-surface-sunken transition-colors focus:outline-none focus:ring-2 focus:ring-brand/40 shadow-xs"
          >
            <Languages className="h-4 w-4 text-brand" />
            <span>{lang === 'en' ? 'عربي' : 'English'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
