import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './hooks/LanguageProvider';
import { useLanguage } from './hooks/useLanguage';
import { Shell } from './components/layout/Shell';
import type { NavTab } from './components/layout/BottomNav';
import { CycleHeader } from './components/dashboard/CycleHeader';
import { WeeklyEnvelopes } from './components/dashboard/WeeklyEnvelopes';
import { FixedObligations } from './components/dashboard/FixedObligations';
import { LogExpenseModal } from './components/expenses/LogExpenseModal';
import { DailyLogSheetModal } from './components/expenses/DailyLogSheetModal';
import { CoolingTimerCard } from './components/expenses/CoolingTimerCard';
import { ExpenseLedger } from './components/expenses/ExpenseLedger';
import { PlaybookDirectory } from './components/playbooks/PlaybookDirectory';
import { PlaybookView } from './components/playbooks/PlaybookView';
import { CycleSettings } from './components/settings/CycleSettings';
import { DataManagement } from './components/settings/DataManagement';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { SpotlightTour } from './components/onboarding/SpotlightTour';
import { initializeDatabase } from './db/schema';
import { useActiveCycle } from './db/repositories/cycleRepository';
import { useUserSettings } from './db/repositories/settingsRepository';
import { initNativeServices, setNativeBackButtonHandler } from './services/native/nativeInitService';
import { notificationService } from './services/native/notificationService';
import type { PlaybookScenario } from './types/playbook';
import { FINANCIAL_PRINCIPLES } from './data/principles';
import { Lightbulb, Plus, ShieldCheck } from 'lucide-react';

const FlowbelApp: React.FC = () => {
  const { lang, t } = useLanguage();
  const userSettings = useUserSettings();
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isDailyLogModalOpen, setIsDailyLogModalOpen] = useState(false);
  const [defaultLogWeek, setDefaultLogWeek] = useState<number | undefined>(undefined);
  const [selectedScenario, setSelectedScenario] = useState<PlaybookScenario | null>(null);

  // Initialize and seed database on mount and configure native mobile capabilities
  useEffect(() => {
    initializeDatabase();
    initNativeServices();
  }, []);

  // Update hardware back button handler whenever modal states change
  useEffect(() => {
    setNativeBackButtonHandler(() => {
      if (isDailyLogModalOpen) {
        setIsDailyLogModalOpen(false);
        return true;
      }
      if (isLogModalOpen) {
        setIsLogModalOpen(false);
        return true;
      }
      if (selectedScenario) {
        setSelectedScenario(null);
        return true;
      }
      return false;
    });
  }, [isDailyLogModalOpen, isLogModalOpen, selectedScenario]);

  // Schedule 8:00 PM local daily check-in reminder
  useEffect(() => {
    notificationService.scheduleDailyReminder(
      20,
      0,
      'Flowbel Check-In',
      lang === 'ar'
        ? 'سجل مصروفات اليوم لحماية معدل الحرق اليومي الآمن.'
        : "Take 30 seconds to log today's spending and protect your safe daily burn."
    );
  }, [lang]);

  // Reactive subscription to active budget cycle
  const activeCycle = useActiveCycle();

  const handleOpenLogModal = (week?: number) => {
    setDefaultLogWeek(week);
    setIsLogModalOpen(true);
  };

  // Select a stoic principle of the day based on day of month
  const todayIndex = new Date().getDate() % FINANCIAL_PRINCIPLES.length;
  const dailyPrinciple = FINANCIAL_PRINCIPLES[todayIndex];

  return (
    <>
      <Shell
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'playbooks') {
            setSelectedScenario(null);
          }
        }}
        onOpenDailyLog={() => setIsDailyLogModalOpen(true)}
      >
        {/* Tab: Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            {/* Daily Stoic Principle Banner */}
            {dailyPrinciple && (
              <div className="rounded-2xl border border-surface-border bg-surface-sunken p-4 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface-card border border-surface-border text-brand shrink-0 mt-0.5 shadow-xs">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary m-0">
                      {lang === 'ar' ? dailyPrinciple.ar.rule : dailyPrinciple.en.rule}
                    </h4>
                    <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                      {lang === 'ar' ? dailyPrinciple.ar.subtext : dailyPrinciple.en.subtext}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Active 24-hour cooling timers banner if any */}
            <CoolingTimerCard />

            {/* Cycle Overview Stat Cards */}
            <CycleHeader cycle={activeCycle} />

            {/* 4/5-Week Rolling Envelopes */}
            <WeeklyEnvelopes
              cycle={activeCycle}
              onOpenLogModal={handleOpenLogModal}
            />

            {/* Fixed Obligations Section */}
            <FixedObligations />
          </div>
        )}

        {/* Tab: Expenses */}
        {activeTab === 'expenses' && (
          <div className="space-y-5">
            {/* Header Action */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-text-primary m-0">
                  {t.expenses.title}
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  {t.expenses.coolingNoticeDetail}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenLogModal()}
                className="flex items-center gap-1.5 rounded-xl bg-brand px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-hover transition-colors focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <Plus className="h-4 w-4" />
                <span>{t.expenses.logNewExpense}</span>
              </button>
            </div>

            {/* Active Cooling Timers */}
            <CoolingTimerCard />

            {/* Expense Ledger */}
            <ExpenseLedger />
          </div>
        )}

        {/* Tab: Playbooks */}
        {activeTab === 'playbooks' && (
          <div>
            {selectedScenario ? (
              <PlaybookView
                key={selectedScenario.id}
                scenario={selectedScenario}
                onBack={() => setSelectedScenario(null)}
              />
            ) : (
              <PlaybookDirectory onSelectScenario={(sc) => setSelectedScenario(sc)} />
            )}
          </div>
        )}

        {/* Tab: Settings */}
        {activeTab === 'settings' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-text-primary m-0">
                {t.settings.title}
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Payday anchor, allowances, and local-first Zod verified backups.
              </p>
            </div>

            <CycleSettings key={activeCycle?.id || 'cycle-initial'} cycle={activeCycle} />
            <DataManagement />

            {/* Privacy & Zero Tracking Notice */}
            <div className="flex items-center gap-2.5 rounded-2xl border border-surface-border bg-surface-card p-4 text-xs text-text-secondary shadow-xs">
              <ShieldCheck className="h-5 w-5 text-guardrail-safe shrink-0" />
              <span>
                100% offline and local-first. All data is stored directly in your browser's IndexedDB. Zero tracking, zero telemetry, zero external servers.
              </span>
            </div>
          </div>
        )}

        {/* Single Log Expense Modal */}
        <LogExpenseModal
          cycle={activeCycle}
          defaultWeek={defaultLogWeek}
          isOpen={isLogModalOpen}
          onClose={() => setIsLogModalOpen(false)}
        />

        {/* Unified Daily Log Sheet Modal */}
        <DailyLogSheetModal
          cycle={activeCycle}
          isOpen={isDailyLogModalOpen}
          onClose={() => setIsDailyLogModalOpen(false)}
        />
      </Shell>

      {/* Zero-Hardcoded Onboarding Setup Wizard on first launch */}
      {!userSettings.isOnboarded && (
        <OnboardingWizard />
      )}

      {/* Interactive Spotlight Guided Tour on first onboarded run */}
      {userSettings.isOnboarded && !userSettings.hasSeenTour && (
        <SpotlightTour />
      )}
    </>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <FlowbelApp />
    </LanguageProvider>
  );
}
