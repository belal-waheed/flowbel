import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { PLAYBOOKS } from '../../data/playbooks';
import type { PlaybookScenario, PlaybookCategory } from '../../types/playbook';
import {
  BookOpen,
  Search,
  ShieldAlert,
  Laptop,
  Key,
  Banknote,
  Flame,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface PlaybookDirectoryProps {
  onSelectScenario: (scenario: PlaybookScenario) => void;
}

export const PlaybookDirectory: React.FC<PlaybookDirectoryProps> = ({ onSelectScenario }) => {
  const { t, lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PlaybookCategory | 'all'>('all');

  const getScenarioIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="h-5 w-5 text-guardrail-cooling" />;
      case 'Laptop':
        return <Laptop className="h-5 w-5 text-brand" />;
      case 'Key':
        return <Key className="h-5 w-5 text-guardrail-safe" />;
      case 'Banknote':
        return <Banknote className="h-5 w-5 text-guardrail-safe" />;
      case 'Flame':
      default:
        return <Flame className="h-5 w-5 text-guardrail-danger" />;
    }
  };

  const filteredPlaybooks = PLAYBOOKS.filter((scenario) => {
    if (selectedCategory !== 'all' && scenario.category !== selectedCategory) {
      return false;
    }
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const title = (lang === 'ar' ? scenario.titleAr : scenario.titleEn).toLowerCase();
    const subtitle = (lang === 'ar' ? scenario.subtitleAr : scenario.subtitleEn).toLowerCase();
    const context = (lang === 'ar' ? scenario.contextAr : scenario.contextEn).toLowerCase();
    const golden = (lang === 'ar' ? scenario.goldenRuleAr : scenario.goldenRuleEn).toLowerCase();

    return (
      title.includes(query) ||
      subtitle.includes(query) ||
      context.includes(query) ||
      golden.includes(query)
    );
  });

  const categories: Array<{ id: PlaybookCategory | 'all'; label: string }> = [
    { id: 'all', label: t.playbooks.allCategories },
    { id: 'lending', label: lang === 'ar' ? 'إقراض وحدود مالية' : 'Lending' },
    { id: 'tech', label: lang === 'ar' ? 'إلكترونيات ومستعمل' : 'Used Tech' },
    { id: 'housing', label: lang === 'ar' ? 'سكن والتزامات' : 'Housing' },
    { id: 'negotiation', label: lang === 'ar' ? 'تفاوض وتسعير' : 'Negotiation' },
    { id: 'emergency', label: lang === 'ar' ? 'طوارئ واحتياطي' : 'Emergency' }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="h-5 w-5 text-brand" />
          <h2 className="text-lg font-bold text-text-primary m-0">
            {t.playbooks.title}
          </h2>
        </div>
        <p className="text-xs text-text-secondary">
          {t.playbooks.subtitle}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute top-2.5 start-3 h-4 w-4 text-text-muted pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.playbooks.searchPlaceholder}
          className="w-full rounded-xl border border-surface-border-strong bg-surface-card ps-9 pe-4 py-2 text-xs text-text-primary placeholder:text-text-muted focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
              selectedCategory === cat.id
                ? 'bg-brand text-white shadow-xs'
                : 'border border-surface-border bg-surface-card text-text-secondary hover:border-surface-border-strong hover:text-text-primary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filteredPlaybooks.map((scenario) => (
          <div
            key={scenario.id}
            onClick={() => onSelectScenario(scenario)}
            className="group cursor-pointer rounded-2xl border border-surface-border bg-surface-card p-4 transition-all hover:border-brand/40 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface-border bg-surface-sunken">
                  {getScenarioIcon(scenario.iconName)}
                </div>
                <span className="rounded-md border border-surface-border bg-surface-sunken px-2 py-0.5 text-[10px] font-semibold text-text-muted">
                  {scenario.steps.length} {lang === 'ar' ? 'خطوات فحص' : 'Checklist Steps'}
                </span>
              </div>

              <h3 className="text-sm font-bold text-text-primary group-hover:text-brand transition-colors m-0 mb-1">
                {lang === 'ar' ? scenario.titleAr : scenario.titleEn}
              </h3>
              <p className="text-xs text-text-secondary line-clamp-2 mb-3">
                {lang === 'ar' ? scenario.subtitleAr : scenario.subtitleEn}
              </p>

              {/* Core Principle Callout */}
              <div className="rounded-xl border border-surface-border bg-surface-sunken p-2.5 text-[11px] text-text-primary">
                <strong className="block text-[10px] font-bold uppercase tracking-wider text-brand mb-0.5">
                  {t.playbooks.goldenRuleBadge}
                </strong>
                <p className="line-clamp-2">
                  {lang === 'ar'
                    ? scenario.goldenRuleAr.replace(/^(القاعدة الذهبية|المبدأ الأساسي):\s*/, '')
                    : scenario.goldenRuleEn.replace(/^(Golden Rule|Core Principle):\s*/i, '')}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-2 border-t border-surface-border text-xs font-semibold text-brand">
              <span>{lang === 'ar' ? 'فتح الدليل التفاعلي' : 'Open Interactive Protocol'}</span>
              {lang === 'ar' ? (
                <ChevronLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
