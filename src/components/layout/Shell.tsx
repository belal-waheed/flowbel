import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Header } from './Header';
import { BottomNav, type NavTab } from './BottomNav';

interface ShellProps {
  children: React.ReactNode;
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Shell: React.FC<ShellProps> = ({ children, activeTab, onSelectTab }) => {
  const { dir } = useLanguage();

  return (
    <div dir={dir} className="min-h-screen bg-surface-base text-text-primary flex flex-col font-sans">
      <Header />
      <main className="flex-1 pb-24 pt-4 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        {children}
      </main>
      <BottomNav activeTab={activeTab} onSelectTab={onSelectTab} />
    </div>
  );
};
