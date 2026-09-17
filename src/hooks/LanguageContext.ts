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
  onboarding: {
    welcomeTitle: string;
    welcomeSub: string;
    stepIndicator: string;
    nextBtn: string;
    backBtn: string;
    finishBtn: string;
    skipStep: string;
    step1Title: string;
    step1Sub: string;
    goalLabel: string;
    goals: {
      student: { title: string; desc: string };
      freelancer: { title: string; desc: string };
      professional: { title: string; desc: string };
      debtFree: { title: string; desc: string };
      custom: { title: string; desc: string };
    };
    currencyLabel: string;
    step2Title: string;
    step2Sub: string;
    allowanceLabel: string;
    allowancePlaceholder: string;
    paydayLabel: string;
    envelopeCountLabel: string;
    envelopeCount4: string;
    envelopeCount5: string;
    step3Title: string;
    step3Sub: string;
    addCommitment: string;
    noCommitmentsNote: string;
    skipCommitments: string;
    commitmentTemplates: {
      rent: string;
      internet: string;
      transit: string;
      gym: string;
      tuition: string;
      coffee: string;
    };
    totalFixedLabel: string;
    step4Title: string;
    step4Sub: string;
    guardrailTitle: string;
    guardrailDesc: string;
    enableGuardrail: string;
    thresholdLabel: string;
    durationLabel: string;
  };
  dailyLog: {
    headerButton: string;
    modalTitle: string;
    modalSub: string;
    dateLabel: string;
    modeBatch: string;
    modeQuick: string;
    quickAmountLabel: string;
    quickCategoryLabel: string;
    quickNoteLabel: string;
    batchItemsTitle: string;
    addItemBtn: string;
    itemAmount: string;
    itemCategory: string;
    itemNote: string;
    itemNotePlaceholder: string;
    removeItem: string;
    runningTotal: string;
    coolingWarning: string;
    coolingWarningSub: string;
    saveBatchBtn: string;
    saveSuccess: string;
    emptyItemsError: string;
  };
  tour: {
    stepOf: string;
    nextBtn: string;
    backBtn: string;
    skipBtn: string;
    finishBtn: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
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
    },
    onboarding: {
      welcomeTitle: 'Welcome to Flowbel',
      welcomeSub: 'Set up your mindful financial workspace in 4 focused steps.',
      stepIndicator: 'Step {current} of {total}',
      nextBtn: 'Next',
      backBtn: 'Back',
      finishBtn: 'Get Started',
      skipStep: 'Skip this step',
      step1Title: 'Budgeting Goal & Currency',
      step1Sub: 'Select the financial rhythm that fits your situation and set your active currency.',
      goalLabel: 'Financial Persona & Intent',
      goals: {
        student: { title: 'Student', desc: 'Manage fixed allowance and eliminate impulse spending.' },
        freelancer: { title: 'Freelancer', desc: 'Handle irregular income and maintain runway.' },
        professional: { title: 'Professional', desc: 'Structured paycheck allocation and wealth building.' },
        debtFree: { title: 'Debt Clearance', desc: 'Strict spending discipline focused on essentials.' },
        custom: { title: 'Custom / Flexible', desc: 'Build your personal budget without preset rules.' }
      },
      currencyLabel: 'Active Currency',
      step2Title: 'Monthly Allowance & Payday',
      step2Sub: 'Enter your real monthly funds and cycle start anchor.',
      allowanceLabel: 'Total Monthly Allowance / Income',
      allowancePlaceholder: 'Enter your actual amount...',
      paydayLabel: 'Payday Start Date',
      envelopeCountLabel: 'Envelope Split Model',
      envelopeCount4: '4 Weeks (Standard)',
      envelopeCount5: '5 Weeks (Extended)',
      step3Title: 'Fixed Commitments',
      step3Sub: 'Reserve non-negotiable costs (housing, utilities) to isolate your true variable pool.',
      addCommitment: 'Add Fixed Commitment',
      noCommitmentsNote: 'Click any template below to add your actual cost, or skip if you have none.',
      skipCommitments: 'Skip (No fixed costs)',
      commitmentTemplates: {
        rent: 'Apartment Rent',
        internet: 'Home Internet',
        transit: 'Transit Pass',
        gym: 'Gym Membership',
        tuition: 'Tuition / Books',
        coffee: 'Home Coffee Supply'
      },
      totalFixedLabel: 'Total Fixed Commitments',
      step4Title: 'Categories & Guardrails',
      step4Sub: 'Activate the mindful spending delay to interrupt impulse purchases.',
      guardrailTitle: 'Mindful Spending Guardrail (Cooling Lock)',
      guardrailDesc: 'Discretionary purchases above this threshold trigger a mandatory reflection pause.',
      enableGuardrail: 'Enable Mindful Spending Guardrail',
      thresholdLabel: 'Pause Trigger Threshold',
      durationLabel: 'Cooldown Duration (Hours)'
    },
    dailyLog: {
      headerButton: 'Daily Log',
      modalTitle: 'Unified Daily Log Sheet',
      modalSub: 'Record all of today\'s spending in one rapid session to protect your safe daily burn.',
      dateLabel: 'Expense Date',
      modeBatch: 'Multi-Item Batch',
      modeQuick: 'Quick Daily Sum',
      quickAmountLabel: 'Total Daily Spend',
      quickCategoryLabel: 'Primary Category',
      quickNoteLabel: 'Short Note (Optional)',
      batchItemsTitle: 'Today\'s Line Items',
      addItemBtn: 'Add Another Item',
      itemAmount: 'Amount',
      itemCategory: 'Category',
      itemNote: 'Description',
      itemNotePlaceholder: 'What was this for?',
      removeItem: 'Remove',
      runningTotal: 'Today\'s Session Total',
      coolingWarning: 'Threshold Triggered',
      coolingWarningSub: 'This item will enter the cooling pause rather than immediate deduction.',
      saveBatchBtn: 'Commit Daily Expenses',
      saveSuccess: 'Today\'s spending committed successfully.',
      emptyItemsError: 'Please enter a valid amount for at least one item.'
    },
    tour: {
      stepOf: '{current} of {total}',
      nextBtn: 'Next',
      backBtn: 'Back',
      skipBtn: 'Skip Tour',
      finishBtn: 'Got It',
      step1Title: 'Safe Daily Burn',
      step1Desc: 'Flowbel dynamically calculates your daily spending allowance based on your active weekly envelope.',
      step2Title: 'Rolling Envelopes',
      step2Desc: 'Your budget is segregated into independent weekly envelopes so one high-spend week never ruins your month.',
      step3Title: 'Rapid Daily Log',
      step3Desc: 'Tap the Daily Log button in the header once a day to enter all your transactions in a single session.',
      step4Title: 'Decision Playbooks',
      step4Desc: 'Access practical scripts and objective checklists whenever facing financial pressures or tough decisions.'
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
    },
    onboarding: {
      welcomeTitle: 'مرحباً بك في Flowbel',
      welcomeSub: 'تهيئة مساحتك المالية الواعية في 4 خطوات بسيطة.',
      stepIndicator: 'الخطوة {current} من {total}',
      nextBtn: 'التالي',
      backBtn: 'السابق',
      finishBtn: 'بدء الاستخدام',
      skipStep: 'تخطي هذه الخطوة',
      step1Title: 'الهدف والعملة المعتمدة',
      step1Sub: 'اختر النمط المالي الأقرب لواقعك وحدد العملة.',
      goalLabel: 'النمط والهدف المالي',
      goals: {
        student: { title: 'طالب جامعي', desc: 'إدارة المصروف الدراسي والحد من الإنفاق العشوائي.' },
        freelancer: { title: 'مستقل / عمل حر', desc: 'التعامل مع الدخل المتغير وحماية الطوارئ.' },
        professional: { title: 'موظف / مهني', desc: 'تخصيص الراتب بانتظام وبناء وفورات مستدامة.' },
        debtFree: { title: 'التحرر من الالتزامات', desc: 'كبح الشراء الاندفاعي والتركيز على الأساسيات.' },
        custom: { title: 'تخصيص حر', desc: 'بناء خطة ميزانية شخصية بدون قوالب جاهزة.' }
      },
      currencyLabel: 'العملة الأساسية',
      step2Title: 'المصروف الشهري وموعد الاستلام',
      step2Sub: 'سجل السيولة المتاحة لك وتاريخ بداية دورتك المالية.',
      allowanceLabel: 'إجمالي المخصص الشهري',
      allowancePlaceholder: 'أدخل المبلغ الفعلي...',
      paydayLabel: 'تاريخ بداية الشهر المالي (يوم الاستلام)',
      envelopeCountLabel: 'تقسيم المظاريف الأسبوعية',
      envelopeCount4: '4 أسابيع (الافتراضي)',
      envelopeCount5: '5 أسابيع (لأشهر أطول)',
      step3Title: 'الالتزامات والمصروفات الثابتة',
      step3Sub: 'أضف الالتزامات المحجوزة مسبقاً (إيجار، فواتير) لخصمها من المصروف الكلي.',
      addCommitment: 'إضافة التزام ثابت',
      noCommitmentsNote: 'اضغط على المقترحات لإضافتها مع تحديد القيمة الفعلية، أو تجاوز إذا لم توجد تكاليف ثابتة.',
      skipCommitments: 'تخطي (لا توجد التزامات ثابتة)',
      commitmentTemplates: {
        rent: 'إيجار السكن',
        internet: 'اشتراك الإنترنت',
        transit: 'اشتراك المواصلات',
        gym: 'اشتراك الجيم',
        tuition: 'أقساط دراسية',
        coffee: 'مخصص القهوة والمنزل'
      },
      totalFixedLabel: 'إجمالي الالتزامات الثابتة',
      step4Title: 'التصنيفات وحارس التأني',
      step4Sub: 'فعل حارس التفكير الإلزامي للسيطرة على الشراء الاندفاعي.',
      guardrailTitle: 'حارس الإنفاق المتزن (قفل الـ 24 ساعة)',
      guardrailDesc: 'عند تسجيل أي شراء غير أساسي يتجاوز هذا المبلغ، يفرض التطبيق مهلة تأني وتفكير.',
      enableGuardrail: 'تفعيل حارس التأني الإلزامي',
      thresholdLabel: 'الحد المالي لتفعيل المهلة',
      durationLabel: 'مدة التهدئة بالساعات'
    },
    dailyLog: {
      headerButton: 'تسجيل اليوم',
      modalTitle: 'سجل الإنفاق اليومي الموحد',
      modalSub: 'سجل جميع مشتريات اليوم في جلسة واحدة سريعة لحماية معدل الحرق اليومي.',
      dateLabel: 'تاريخ الإنفاق',
      modeBatch: 'تسجيل متعدد البنود',
      modeQuick: 'تسجيل إجمالي فوري',
      quickAmountLabel: 'المبلغ الإجمالي لليوم',
      quickCategoryLabel: 'التصنيف الأساسي',
      quickNoteLabel: 'ملاحظة مختصرة (اختياري)',
      batchItemsTitle: 'بنود اليوم المنفقة',
      addItemBtn: 'إضافة بند آخر',
      itemAmount: 'المبلغ',
      itemCategory: 'التصنيف',
      itemNote: 'البيان',
      itemNotePlaceholder: 'ما الذي أنفقته؟',
      removeItem: 'حذف',
      runningTotal: 'إجمالي جلسة اليوم',
      coolingWarning: 'تنبيه: يتجاوز حد التأني',
      coolingWarningSub: 'سيتم تحويل البند إلى مهلة التفكير الإلزامية بدلاً من الخصم المباشر.',
      saveBatchBtn: 'تثبيت جميع المصروفات',
      saveSuccess: 'تم تسجيل مصروفات اليوم بنجاح.',
      emptyItemsError: 'يرجى إدخال مبلغ صحيح لبند واحد على الأقل.'
    },
    tour: {
      stepOf: '{current} من {total}',
      nextBtn: 'التالي',
      backBtn: 'السابق',
      skipBtn: 'تخطي الجولة',
      finishBtn: 'فهمت ذلك',
      step1Title: 'معدل الحرق اليومي الآمن',
      step1Desc: 'يحسب لك Flowbel يومياً المبلغ المتاح للإنفاق بأمان بناءً على ما تبقى في مظروف أسبوعك.',
      step2Title: 'المظاريف الأسبوعية المتنقلة',
      step2Desc: 'ميزانيتك مقسمة على 4 أو 5 أسابيع مستقلة حتى لا يستنزف أسبوع واحد باقي الشهر.',
      step3Title: 'زر تسجيل اليوم السريع',
      step3Desc: 'بنقرة واحدة من الشريط العلوي، سجل جميع مشتريات اليوم دفعة واحدة دون تكرار فتح النوافذ.',
      step4Title: 'أدلة القرارات العملية',
      step4Desc: 'استعن بنماذج التفكير الموضوعية وقوائم التحقق عند مواجهة قرارات شرائية أو ضغوط مالية.'
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

