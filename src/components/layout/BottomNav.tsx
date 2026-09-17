import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { LayoutDashboard, Receipt, BookOpen, Settings } from 'lucide-react';
import { useCoolingTimers } from '../../db/repositories/expenseRepository';

export type NavTab = 'dashboard' | 'expenses' | 'playbooks' | 'settings';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const { t } = useLanguage();

  // Reactive badge count for active cooling timers
  const coolingExpenses = useCoolingTimers();
  const coolingCount = coolingExpenses.length;

  const tabs: Array<{ id: NavTab; label: string; icon: React.ReactNode; badge?: number }> = [
    {
      id: 'dashboard',
      label: t.tabs.dashboard,
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      id: 'expenses',
      label: t.tabs.expenses,
      icon: <Receipt className="h-5 w-5" />,
      badge: coolingCount > 0 ? coolingCount : undefined
    },
    {
      id: 'playbooks',
      label: t.tabs.playbooks,
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: 'settings',
      label: t.tabs.settings,
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-surface-border bg-surface-card/90 backdrop-blur-md safe-area-pb">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition-all ${
                isActive
                  ? 'text-brand bg-brand-subtle font-bold'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-sunken/60 font-medium'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-guardrail-cooling px-1 text-[10px] font-bold text-white shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 h-0.5 w-6 rounded-full bg-brand" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
