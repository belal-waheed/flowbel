import { createContext } from 'react';

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export interface Translations {
  appName: string;
  appTagline: string;
  currency: string;
  tabs: {
    dashboard: string;
    expenses: string;
    playbooks: string;
    settings: string;
  };
  dashboard: {
    cycleTitle: string;
    dayNumber: string;
    daysLeft: string;
    allowance: string;
    fixedCommitted: string;
    variablePool: string;
    safeDailyBurn: string;
    perDay: string;
    weeklyEnvelopes: string;
    fixedObligations: string;
    fixedSubtext: string;
    statusActive: string;
    statusUpcoming: string;
    statusCompleted: string;
    statusOverspent: string;
    allocated: string;
    spent: string;
    remaining: string;
    paid: string;
    unpaid: string;
    markPaid: string;
    markUnpaid: string;
  };
  expenses: {
    title: string;
    logNewExpense: string;
    coolingNotice: string;
    coolingNoticeDetail: string;
    activeCoolingTimers: string;
    ledgerTitle: string;
    allWeeks: string;
    filterState: string;
    allStates: string;
    stateCommitted: string;
    stateCooling: string;
    stateAborted: string;
    stateReflection: string;
    noExpensesFound: string;
    noCoolingActive: string;
    lockedFor: string;
    unlocksIn: string;
    readyToCommit: string;
    commitBtn: string;
    abortBtn: string;
    deleteBtn: string;
    modalTitle: string;
    inputTitle: string;
    inputAmount: string;
    inputCategory: string;
    inputWeek: string;
    cancelBtn: string;
    saveBtn: string;
    proceedToReflection: string;
    reflectionHeader: string;
    reflectionSubtitle: string;
    qNeedVsWant: string;
    qNeedVsWantSub: string;
    qDormant: string;
    qDormantSub: string;
    qBudgetImpact: string;
    qBudgetImpactSub: string;
    qAlternative: string;
    qAlternativeSub: string;
    submitCooling: string;
    savingVictory: string;
    savedAlert: string;
  };
  playbooks: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    goldenRuleBadge: string;
    stepsTitle: string;
    dialoguesTitle: string;
    principlesTitle: string;
    backToList: string;
    checklistProgress: string;
    completed: string;
    warningPrefix: string;
  };
  settings: {
    title: string;
    cycleConfig: string;
    allowanceLabel: string;
    paydayLabel: string;
    fixedCostsHeader: string;
    updateCycleBtn: string;
    dataManagement: string;
    exportBackup: string;
    exportDesc: string;
    importBackup: string;
    importDesc: string;
    resetDefaults: string;
    resetDesc: string;
    resetConfirm: string;
    importSuccess: string;
    importFailed: string;
    savedChanges: string;
  };
  categories: {
    groceries: string;
    transit: string;
    study: string;
    dining: string;
    tech: string;
    leisure: string;
    emergency: string;
    discretionary: string;
    other: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Flowbel',
    appTagline: 'Your practical guide to money and real-world street smarts',
    currency: 'EGP',
    tabs: {
      dashboard: 'Dashboard',
      expenses: 'Expenses',
      playbooks: 'Playbooks',
      settings: 'Settings'
    },
    dashboard: {
      cycleTitle: 'Payday Budget Cycle',
      dayNumber: 'Day',
      daysLeft: 'days remaining',
      allowance: 'Allowance',
      fixedCommitted: 'Fixed Costs',
      variablePool: 'Variable Pool',
      safeDailyBurn: 'Safe Daily Burn',
      perDay: '/ day',
      weeklyEnvelopes: 'Weekly Rolling Envelopes',
      fixedObligations: 'Fixed Obligations (Day One Anchors)',
      fixedSubtext: 'Non-negotiable monthly foundations',
      statusActive: 'Active Week',
      statusUpcoming: 'Upcoming',
      statusCompleted: 'Closed',
      statusOverspent: 'Overspent',
      allocated: 'Allocated',
      spent: 'Spent',
      remaining: 'Remaining',
      paid: 'Paid',
      unpaid: 'Pending',
      markPaid: 'Mark as Paid',
      markUnpaid: 'Mark as Pending'
    },
    expenses: {
      title: 'Expense Tracker & Delay Guardrail',
      logNewExpense: 'Log Expense',
      coolingNotice: 'Cooling-Off Delay Triggered',
      coolingNoticeDetail: 'Discretionary purchase exceeding 150 EGP requires reflection and a 24-hour lock.',
      activeCoolingTimers: 'Active 24-Hour Cooling Timers',
      ledgerTitle: 'Transaction History',
      allWeeks: 'All Weeks',
      filterState: 'Filter Status',
      allStates: 'All Statuses',
      stateCommitted: 'Committed',
      stateCooling: 'Cooling Off',
      stateAborted: 'Aborted (Saved)',
      stateReflection: 'Reflection Needed',
      noExpensesFound: 'No expenses logged for this filter.',
      noCoolingActive: 'No purchases currently in cooling-off delay.',
      lockedFor: 'Locked for 24h cooling-off',
      unlocksIn: 'Unlocks in',
      readyToCommit: 'Cooling period completed. Ready to commit or abort.',
      commitBtn: 'Commit Purchase',
      abortBtn: 'Abort & Save Funds',
      deleteBtn: 'Delete',
      modalTitle: 'Record New Expense',
      inputTitle: 'Description / Item Name',
      inputAmount: 'Amount (EGP)',
      inputCategory: 'Category',
      inputWeek: 'Cycle Week',
      cancelBtn: 'Cancel',
      saveBtn: 'Confirm Expense',
      proceedToReflection: 'Proceed to Reflection Checklist',
      reflectionHeader: 'Pre-Purchase Reality Check',
      reflectionSubtitle: 'Answer honestly to activate the 24-hour cooling-off lock.',
      qNeedVsWant: '1. Need vs Impulse Want',
      qNeedVsWantSub: 'Is this an absolute survival/study necessity, or a temporary emotional impulse?',
      qDormant: '2. 30-Day Dormancy Test',
      qDormantSub: 'Will you still be actively using this in 30 days, or will it gather dust?',
      qBudgetImpact: '3. Weekly Envelope Impact',
      qBudgetImpactSub: 'Can your current weekly envelope comfortably take this hit without starving other essentials?',
      qAlternative: '4. Alternative Explored',
      qAlternativeSub: 'Did you check for a cheaper used, open-source, or free substitute first?',
      submitCooling: 'Lock in 24-Hour Cooling Timer',
      savingVictory: 'Discipline Victory!',
      savedAlert: 'Purchase aborted. You retained this money in your budget.'
    },
    playbooks: {
      title: 'Practical Egyptian Life Playbooks',
      subtitle: 'Hardened real-world protocols and actionable scripts',
      searchPlaceholder: 'Search scenarios, scripts, checklists...',
      allCategories: 'All Scenarios',
      goldenRuleBadge: 'The Golden Law',
      stepsTitle: 'Actionable Step-by-Step Checklist',
      dialoguesTitle: 'Word-for-Word Arabic Response Scripts',
      principlesTitle: 'Guiding Life Principles',
      backToList: 'Back to Playbooks',
      checklistProgress: 'Verification Progress',
      completed: 'Completed',
      warningPrefix: 'Critical Warning'
    },
    settings: {
      title: 'Settings & Data Stewardship',
      cycleConfig: 'Budget Cycle Configuration',
      allowanceLabel: 'Monthly Allowance (EGP)',
      paydayLabel: 'Payday Start Date',
      fixedCostsHeader: 'Configured Fixed Costs',
      updateCycleBtn: 'Update Cycle Parameters',
      dataManagement: 'Local Data Management',
      exportBackup: 'Export Encrypted JSON Backup',
      exportDesc: 'Download full local database snapshot with Zod runtime validation.',
      importBackup: 'Import JSON Backup',
      importDesc: 'Restore database from an exported Flowbel JSON backup file.',
      resetDefaults: 'Reset to Default Baseline',
      resetDesc: 'Restore standard baseline: 6,800 EGP allowance and 3,150 EGP fixed obligations.',
      resetConfirm: 'Are you sure? This will wipe your current records and restore default seed data.',
      importSuccess: 'Backup imported and verified successfully.',
      importFailed: 'Failed to import backup. Please ensure the JSON file matches Flowbel schema.',
      savedChanges: 'Settings updated successfully.'
    },
    categories: {
      groceries: 'Groceries & Nutrition',
      transit: 'Transit & Commute',
      study: 'Study & Academics',
      dining: 'Dining & Takeout',
      tech: 'Tech & Electronics',
      leisure: 'Leisure & Outings',
      emergency: 'Medical & Emergency',
      discretionary: 'Discretionary / Impulse',
      other: 'Other'
    }
  },
  ar: {
    appName: 'Flowbel',
    appTagline: 'دليلك العملي للمال وأصول التعامل في الشارع',
    currency: 'ج.م',
    tabs: {
      dashboard: 'المؤشرات',
      expenses: 'المصروفات',
      playbooks: 'أدلة الحياة',
      settings: 'الإعدادات'
    },
    dashboard: {
      cycleTitle: 'دورة المصروف الشهرية',
      dayNumber: 'اليوم',
      daysLeft: 'يوماً متبقياً',
      allowance: 'المصروف الكلي',
      fixedCommitted: 'الالتزامات الثابتة',
      variablePool: 'السيولة الحرة',
      safeDailyBurn: 'معدل الإنفاق اليومي الآمن',
      perDay: '/ يومياً',
      weeklyEnvelopes: 'مظاريف الأسابيع الأربعة',
      fixedObligations: 'الالتزامات الثابتة (خط الدفاع الأول)',
      fixedSubtext: 'مصاريف أساسية محجوزة من أول الشهر',
      statusActive: 'الأسبوع الجاري',
      statusUpcoming: 'قادم',
      statusCompleted: 'منتهي',
      statusOverspent: 'تجاوز الميزانية',
      allocated: 'المخصص',
      spent: 'المنفق',
      remaining: 'المتبقي',
      paid: 'مدفوع',
      unpaid: 'معلق',
      markPaid: 'تحديد كمدفوع',
      markUnpaid: 'تحديد كمعلق'
    },
    expenses: {
      title: 'سجل المصروفات وفلتر التأني',
      logNewExpense: 'تسجيل مصروف',
      coolingNotice: 'تفعيل مهلة التفكير الإلزامية',
      coolingNoticeDetail: 'أي مصروف غير ضروري يتجاوز 150 جنيهاً يخضع لأسئلة التقييم وقفل لمدة 24 ساعة.',
      activeCoolingTimers: 'مشتريات قيد مهلة التفكير (24 ساعة)',
      ledgerTitle: 'سجل الحركات المالية',
      allWeeks: 'كل الأسابيع',
      filterState: 'تصفية الحالة',
      allStates: 'كل الحالات',
      stateCommitted: 'مؤكد ومنفق',
      stateCooling: 'قيد الانتظار (24 ساعة)',
      stateAborted: 'ملغي (وفورات ناجحة)',
      stateReflection: 'يحتاج تقييم',
      noExpensesFound: 'لا توجد مصروفات مسجلة بهذا الفلتر.',
      noCoolingActive: 'لا توجد مشتريات معلقة قيد مهلة التفكير حالياً.',
      lockedFor: 'مغلق لمدة 24 ساعة للتحقق من الرغبة',
      unlocksIn: 'يتاح التأكيد بعد',
      readyToCommit: 'انتهت مهلة التأني. يمكنك الآن إتمام الشراء أو الإلغاء وتوفير المال.',
      commitBtn: 'تأكيد الشراء والخصم',
      abortBtn: 'إلغاء وتوفير المبلغ',
      deleteBtn: 'حذف',
      modalTitle: 'تسجيل مصروف جديد',
      inputTitle: 'البيان / اسم السلعة',
      inputAmount: 'المبلغ (جنيه مصري)',
      inputCategory: 'التصنيف',
      inputWeek: 'أسبوع المظروف',
      cancelBtn: 'إلغاء',
      saveBtn: 'تثبيت المصروف',
      proceedToReflection: 'الانتقال لأسئلة التقييم',
      reflectionHeader: 'مراجعة الرغبة والضرورة',
      reflectionSubtitle: 'أجب بصدق لتفعيل مهلة الـ 24 ساعة والتأكد من عدم الندم.',
      qNeedVsWant: '1. حاجة حقيقية أم رغبة عاطفية؟',
      qNeedVsWantSub: 'هل هذه السلعة ضرورية لمعيشتك أو دراستك، أم مجرد رغبة وقتية قابلة للتأجيل؟',
      qDormant: '2. اختبار الـ 30 يوماً',
      qDormantSub: 'هل ستظل تستخدم هذا الشيء بانتظام بعد شهر من الآن، أم سيتحول لعبء مهمل؟',
      qBudgetImpact: '3. أثر المظروف الأسبوعي',
      qBudgetImpactSub: 'هل يستطيع متبقي مخصصك الأسبوعي تحمل هذه التكلفة دون حرمان نفسك من الطعام أو الأساسيات؟',
      qAlternative: '4. بحث البديل الأوفر',
      qAlternativeSub: 'هل بحثت عن بديل مستعمل بحالة ممتازة، أو حل مجاني، أو استعارة قبل الشراء؟',
      submitCooling: 'تفعيل قفل مهلة الـ 24 ساعة',
      savingVictory: 'انتصار في الانضباط الذاتي!',
      savedAlert: 'تم إلغاء الشراء بنجاح والاحتفاظ بالمال في ميزانيتك.'
    },
    playbooks: {
      title: 'أدلة الحياة الواقعية في مصر',
      subtitle: 'بروتوكولات عملية وسيناريوهات كلامية للتعامل الرصين',
      searchPlaceholder: 'ابحث في السيناريوهات، الفحوصات، أو النصوص...',
      allCategories: 'جميع السيناريوهات',
      goldenRuleBadge: 'القاعدة الذهبية',
      stepsTitle: 'خطوات الفحص والتأكد العملية',
      dialoguesTitle: 'سيناريوهات الرد والكلام المباشر',
      principlesTitle: 'المبادئ الحاكمة',
      backToList: 'العودة لجميع الأدلة',
      checklistProgress: 'نسبة الإنجاز والتحقق',
      completed: 'مكتمل',
      warningPrefix: 'تنبيه حاسم'
    },
    settings: {
      title: 'الإعدادات وإدارة البيانات',
      cycleConfig: 'إعدادات دورة المصروف',
      allowanceLabel: 'المصروف الشهري الكلي (ج.م)',
      paydayLabel: 'تاريخ بداية الشهر المالي (يوم القبض)',
      fixedCostsHeader: 'الالتزامات الثابتة المسجلة',
      updateCycleBtn: 'تحديث بيانات الدورة',
      dataManagement: 'إدارة البيانات المحلية',
      exportBackup: 'تصدير نسخة احتياطية (JSON)',
      exportDesc: 'تحميل ملف النسخة الاحتياطية الموثق ضد التلف بنظام Zod.',
      importBackup: 'استيراد نسخة احتياطية',
      importDesc: 'استعادة كامل السجلات والبيانات من ملف JSON سابق.',
      resetDefaults: 'استعادة الإعدادات الأصلية',
      resetDesc: 'إعادة ضبط الميزانية الأساسية: مصروف 6,800 ج والتزامات ثابتة 3,150 ج.',
      resetConfirm: 'هل أنت متأكد؟ سيتم مسح بياناتك الحالية واسترجاع القيم الافتراضية.',
      importSuccess: 'تم استيراد النسخة الاحتياطية والتحقق منها بنجاح.',
      importFailed: 'فشل استيراد النسخة. تأكد من صحة ملف JSON.',
      savedChanges: 'تم حفظ التعديلات بنجاح.'
    },
    categories: {
      groceries: 'طعام وبقالة منزلية',
      transit: 'مواصلات وتنقل',
      study: 'دراسة ومستلزمات',
      dining: 'أكل خارجي ودليفري',
      tech: 'تقنية وإلكترونيات',
      leisure: 'خروجات وترفيه',
      emergency: 'طوارئ وصيدلية',
      discretionary: 'مصاريف شخصية / كماليات',
      other: 'أخرى'
    }
  }
};

export interface LanguageContextType {
  lang: Language;
  dir: Direction;
  t: Translations;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
