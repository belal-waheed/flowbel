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
    manageBtn: string;
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
    currencySelector: string;
    envelopeModel: string;
    weeks4: string;
    weeks5: string;
    envelopeWeights: string;
    equalWeights: string;
    coolingSettings: string;
    coolingThresholdLabel: string;
    coolingDurationLabel: string;
    coolingToggleLabel: string;
    manageCommitmentsBtn: string;
    manageCategoriesBtn: string;
  };
  commitmentsModal: {
    title: string;
    addTitle: string;
    editTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    amountLabel: string;
    dueDayLabel: string;
    categoryLabel: string;
    addBtn: string;
    saveBtn: string;
    deleteBtn: string;
    emptyMessage: string;
    totalLabel: string;
  };
  categoryModal: {
    title: string;
    addTitle: string;
    nameEnLabel: string;
    nameArLabel: string;
    iconLabel: string;
    addBtn: string;
    deleteBtn: string;
    customBadge: string;
    defaultBadge: string;
    emptyMessage: string;
  };
  categories: Record<string, string>;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Flowbel',
    appTagline: 'Mindful budgeting and practical decision clarity.',
    currency: 'EGP',
    tabs: {
      dashboard: 'Dashboard',
      expenses: 'Expenses',
      playbooks: 'Decision Playbooks',
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
      fixedObligations: 'Fixed Commitments',
      fixedSubtext: 'Reserved essential monthly expenses',
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
      markUnpaid: 'Mark as Pending',
      manageBtn: 'Manage'
    },
    expenses: {
      title: 'Expense Tracker & Delay Guardrail',
      logNewExpense: 'Log Expense',
      coolingNotice: 'Cooling-Off Delay Triggered',
      coolingNoticeDetail: 'Discretionary purchase exceeding the threshold requires reflection and a cooling-off lock.',
      activeCoolingTimers: 'Active Cooling-Off Pauses',
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
      lockedFor: 'In mindful spending pause',
      unlocksIn: 'Unlocks in',
      readyToCommit: 'Cooling period concluded. Confirm purchase or cancel to preserve funds.',
      commitBtn: 'Commit Purchase',
      abortBtn: 'Abort & Save Funds',
      deleteBtn: 'Delete',
      modalTitle: 'Record New Expense',
      inputTitle: 'Description / Item Name',
      inputAmount: 'Amount',
      inputCategory: 'Category',
      inputWeek: 'Cycle Week',
      cancelBtn: 'Cancel',
      saveBtn: 'Confirm Expense',
      proceedToReflection: 'Proceed to Reflection Checklist',
      reflectionHeader: 'Mindful Spending Pause',
      reflectionSubtitle: 'A 24-hour pause to evaluate priority and prevent impulse spending.',
      qNeedVsWant: '1. Need vs Impulse Want',
      qNeedVsWantSub: 'Is this an absolute necessity, or a temporary emotional impulse?',
      qDormant: '2. 30-Day Dormancy Test',
      qDormantSub: 'Will you still be actively using this in 30 days, or will it gather dust?',
      qBudgetImpact: '3. Weekly Envelope Impact',
      qBudgetImpactSub: 'Can your current weekly envelope comfortably absorb this cost without impacting essentials?',
      qAlternative: '4. Alternative Explored',
      qAlternativeSub: 'Did you evaluate a more affordable, shared, or existing alternative first?',
      submitCooling: 'Lock in Cooling-Off Timer',
      savingVictory: 'Expense Reconsidered',
      savedAlert: 'Purchase canceled. Funds preserved in your active envelope.'
    },
    playbooks: {
      title: 'Decision Playbooks',
      subtitle: 'Structured frameworks and practical scripts for high-impact decisions',
      searchPlaceholder: 'Search scenarios, scripts, checklists...',
      allCategories: 'All Scenarios',
      goldenRuleBadge: 'Core Principle',
      stepsTitle: 'Verification Checklist',
      dialoguesTitle: 'Direct Communication Scripts',
      principlesTitle: 'Guiding Principles',
      backToList: 'Back to Playbooks',
      checklistProgress: 'Verification Progress',
      completed: 'Completed',
      warningPrefix: 'Critical Warning'
    },
    settings: {
      title: 'Settings & Data Stewardship',
      cycleConfig: 'Budget Cycle Configuration',
      allowanceLabel: 'Monthly Allowance',
      paydayLabel: 'Payday Start Date',
      fixedCostsHeader: 'Configured Fixed Commitments',
      updateCycleBtn: 'Update Cycle Parameters',
      dataManagement: 'Local Data Management',
      exportBackup: 'Export Encrypted JSON Backup',
      exportDesc: 'Download full local database snapshot with Zod runtime validation.',
      importBackup: 'Import JSON Backup',
      importDesc: 'Restore database from an exported Flowbel JSON backup file.',
      resetDefaults: 'Reset to Default Baseline',
      resetDesc: 'Restore standard baseline: allowance and fixed obligations.',
      resetConfirm: 'Are you sure? This will wipe your current records and restore default seed data.',
      importSuccess: 'Backup imported and verified successfully.',
      importFailed: 'Failed to import backup. Please ensure the JSON file matches Flowbel schema.',
      savedChanges: 'Settings updated successfully.',
      currencySelector: 'Active Currency',
      envelopeModel: 'Envelope Model',
      weeks4: '4 Weeks (Standard)',
      weeks5: '5 Weeks (Extended)',
      envelopeWeights: 'Envelope Distribution',
      equalWeights: 'Equal Split',
      coolingSettings: 'Mindful Spending Guardrail',
      coolingThresholdLabel: 'Threshold to Trigger Pause',
      coolingDurationLabel: 'Cooldown Pause Duration (Hours)',
      coolingToggleLabel: 'Enable Mindful Spending Guardrail',
      manageCommitmentsBtn: 'Manage Fixed Commitments',
      manageCategoriesBtn: 'Manage Custom Categories'
    },
    commitmentsModal: {
      title: 'Fixed Commitments',
      addTitle: 'Add New Commitment',
      editTitle: 'Edit Commitment',
      nameLabel: 'Commitment Title',
      namePlaceholder: 'e.g., Housing Rent, Internet...',
      amountLabel: 'Amount',
      dueDayLabel: 'Due Day of Month (1-31)',
      categoryLabel: 'Category',
      addBtn: 'Add Commitment',
      saveBtn: 'Save Changes',
      deleteBtn: 'Delete',
      emptyMessage: 'No fixed commitments recorded yet.',
      totalLabel: 'Total Fixed Commitments'
    },
    categoryModal: {
      title: 'Custom Categories',
      addTitle: 'Add New Category',
      nameEnLabel: 'Name (English)',
      nameArLabel: 'Name (Arabic)',
      iconLabel: 'Icon',
      addBtn: 'Add Category',
      deleteBtn: 'Remove',
      customBadge: 'Custom',
      defaultBadge: 'Standard',
      emptyMessage: 'No categories available.'
    },
    categories: {
      groceries: 'Groceries & Nutrition',
      transit: 'Transit & Mobility',
      study: 'Study & Academics',
      dining: 'Dining & Cafes',
      tech: 'Tech & Subscriptions',
      leisure: 'Leisure & Hobbies',
      emergency: 'Emergency & Health',
      discretionary: 'Discretionary / Special',
      other: 'Other Miscellaneous'
    }
  },
  ar: {
    appName: 'Flowbel',
    appTagline: 'إدارة مالية واعية وقرارات يومية متزنة.',
    currency: 'ج.م',
    tabs: {
      dashboard: 'المؤشرات',
      expenses: 'المصروفات',
      playbooks: 'أدلة القرارات',
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
      weeklyEnvelopes: 'مظاريف الميزانية الأسبوعية',
      fixedObligations: 'الالتزامات الثابتة',
      fixedSubtext: 'المصروفات الأساسية المحجوزة شهرياً',
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
      markUnpaid: 'تحديد كمعلق',
      manageBtn: 'إدارة'
    },
    expenses: {
      title: 'سجل المصروفات وفلتر التأني',
      logNewExpense: 'تسجيل مصروف',
      coolingNotice: 'تفعيل مهلة التفكير الإلزامية',
      coolingNoticeDetail: 'أي مصروف غير ضروري يتجاوز الحد المالي يخضع لأسئلة التقييم وقفل التهدئة.',
      activeCoolingTimers: 'نفقات قيد مهلة التفكير والتهدئة',
      ledgerTitle: 'سجل الحركات المالية',
      allWeeks: 'كل الأسابيع',
      filterState: 'تصفية الحالة',
      allStates: 'كل الحالات',
      stateCommitted: 'مؤكد ومنفق',
      stateCooling: 'قيد الانتظار',
      stateAborted: 'ملغي (وفورات ناجحة)',
      stateReflection: 'يحتاج تقييم',
      noExpensesFound: 'لا توجد مصروفات مسجلة بهذا الفلتر.',
      noCoolingActive: 'لا توجد مشتريات معلقة قيد مهلة التفكير حالياً.',
      lockedFor: 'قيد مهلة التفكير والإنفاق المتزن',
      unlocksIn: 'يتاح التأكيد بعد',
      readyToCommit: 'انتهت مهلة التأني. يمكنك تأكيد الشراء أو التراجع والاحتفاظ بالرصيد.',
      commitBtn: 'تأكيد الشراء والخصم',
      abortBtn: 'إلغاء وتوفير المبلغ',
      deleteBtn: 'حذف',
      modalTitle: 'تسجيل مصروف جديد',
      inputTitle: 'البيان / اسم السلعة',
      inputAmount: 'المبلغ',
      inputCategory: 'التصنيف',
      inputWeek: 'أسبوع المظروف',
      cancelBtn: 'إلغاء',
      saveBtn: 'تثبيت المصروف',
      proceedToReflection: 'الانتقال لأسئلة التقييم',
      reflectionHeader: 'مهلة التفكير والإنفاق المتزن',
      reflectionSubtitle: 'مهلة 24 ساعة لتقييم الاحتياج الفعلي والحد من الشراء الاندفاعي.',
      qNeedVsWant: '1. حاجة حقيقية أم رغبة عاطفية؟',
      qNeedVsWantSub: 'هل هذه السلعة ضرورية لمعيشتك أو دراستك، أم مجرد رغبة وقتية قابلة للتأجيل؟',
      qDormant: '2. اختبار الـ 30 يوماً',
      qDormantSub: 'هل ستظل تستخدم هذا الشيء بانتظام بعد شهر من الآن، أم سيتحول لعبء مهمل؟',
      qBudgetImpact: '3. أثر المظروف الأسبوعي',
      qBudgetImpactSub: 'هل يستطيع متبقي مخصصك الأسبوعي تحمل هذه التكلفة دون حرمان نفسك من الأساسيات؟',
      qAlternative: '4. بحث البديل الأوفر',
      qAlternativeSub: 'هل بحثت عن بديل أكثر اقتصاداً أو حل عملي قبل الشراء؟',
      submitCooling: 'تفعيل قفل مهلة التأني',
      savingVictory: 'قرار متزن وتوفير مستحق',
      savedAlert: 'تم التراجع عن الشراء والاحتفاظ بالرصيد في ميزانيتك.'
    },
    playbooks: {
      title: 'أدلة القرارات المالية واليومية',
      subtitle: 'أطر عملية ونماذج تواصل موضوعية للقرارات المالية واليومية',
      searchPlaceholder: 'ابحث في السيناريوهات، الفحوصات، أو النصوص...',
      allCategories: 'جميع السيناريوهات',
      goldenRuleBadge: 'المبدأ الأساسي',
      stepsTitle: 'قائمة التحقق المنهجية',
      dialoguesTitle: 'صيغ ونماذج التواصل الموضوعي',
      principlesTitle: 'المبادئ التوجيهية',
      backToList: 'العودة لجميع الأدلة',
      checklistProgress: 'نسبة الإنجاز والتحقق',
      completed: 'مكتمل',
      warningPrefix: 'تنبيه حاسم'
    },
    settings: {
      title: 'الإعدادات وإدارة البيانات',
      cycleConfig: 'إعدادات دورة المصروف',
      allowanceLabel: 'المصروف الشهري الكلي',
      paydayLabel: 'تاريخ بداية الشهر المالي (يوم الاستلام)',
      fixedCostsHeader: 'الالتزامات الثابتة المسجلة',
      updateCycleBtn: 'تحديث بيانات الدورة',
      dataManagement: 'إدارة البيانات المحلية',
      exportBackup: 'تصدير نسخة احتياطية (JSON)',
      exportDesc: 'تحميل ملف النسخة الاحتياطية الموثق ضد التلف بنظام Zod.',
      importBackup: 'استيراد نسخة احتياطية',
      importDesc: 'استعادة كامل السجلات والبيانات من ملف JSON سابق.',
      resetDefaults: 'استعادة الإعدادات الأصلية',
      resetDesc: 'إعادة ضبط الميزانية الأساسية والالتزامات الثابتة الافتراضية.',
      resetConfirm: 'هل أنت متأكد؟ سيتم مسح بياناتك الحالية واسترجاع القيم الافتراضية.',
      importSuccess: 'تم استيراد النسخة الاحتياطية والتحقق منها بنجاح.',
      importFailed: 'فشل استيراد النسخة. تأكد من صحة ملف JSON.',
      savedChanges: 'تم حفظ التعديلات بنجاح.',
      currencySelector: 'العملة المعتمدة',
      envelopeModel: 'نظام المظاريف الأسبوعية',
      weeks4: '4 أسابيع (الافتراضي)',
      weeks5: '5 أسابيع (الموسع)',
      envelopeWeights: 'توزيع مخصصات المظاريف',
      equalWeights: 'توزيع متساوي',
      coolingSettings: 'حارس التهدئة والإنفاق المتزن',
      coolingThresholdLabel: 'الحد الأدنى لتفعيل مهلة التأني',
      coolingDurationLabel: 'مدة مهلة التأني (بالساعات)',
      coolingToggleLabel: 'تفعيل حارس الإنفاق المتزن',
      manageCommitmentsBtn: 'إدارة الالتزامات الثابتة',
      manageCategoriesBtn: 'إدارة وتخصيص التصنيفات'
    },
    commitmentsModal: {
      title: 'إدارة الالتزامات الثابتة',
      addTitle: 'إضافة التزام جديد',
      editTitle: 'تعديل الالتزام',
      nameLabel: 'اسم الالتزام',
      namePlaceholder: 'مثال: إيجار السكن، اشتراك الإنترنت...',
      amountLabel: 'المبلغ',
      dueDayLabel: 'يوم الاستحقاق في الشهر (1-31)',
      categoryLabel: 'التصنيف',
      addBtn: 'إضافة التزام',
      saveBtn: 'حفظ التعديلات',
      deleteBtn: 'حذف',
      emptyMessage: 'لا توجد التزامات ثابتة مسجلة حالياً.',
      totalLabel: 'إجمالي الالتزامات الثابتة'
    },
    categoryModal: {
      title: 'إدارة التصنيفات المخصصة',
      addTitle: 'إضافة تصنيف جديد',
      nameEnLabel: 'الاسم (بالإنجليزية)',
      nameArLabel: 'الاسم (بالعربية)',
      iconLabel: 'الأيقونة',
      addBtn: 'إضافة التصنيف',
      deleteBtn: 'حذف',
      customBadge: 'مخصص',
      defaultBadge: 'أساسي',
      emptyMessage: 'لا توجد تصنيفات متاحة.'
    },
    categories: {
      groceries: 'طعام وبقالة منزلية',
      transit: 'مواصلات وانتقالات',
      study: 'دراسة ومستلزمات',
      dining: 'مطاعم ومقاهي',
      tech: 'أدوات واشتراكات تقنية',
      leisure: 'هوايات وترفيه',
      emergency: 'طوارئ ورعاية صحية',
      discretionary: 'مصروفات استثنائية',
      other: 'نفقات متنوعة أخرى'
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

