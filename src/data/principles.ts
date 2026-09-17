export interface DailyMantra {
  id: string;
  category: 'discipline' | 'boundaries' | 'self_reliance' | 'clarity';
  en: {
    rule: string;
    subtext: string;
  };
  ar: {
    rule: string;
    subtext: string;
  };
}

export const FINANCIAL_PRINCIPLES: DailyMantra[] = [
  {
    id: 'rule_solvency',
    category: 'discipline',
    en: {
      rule: 'Fixed obligations are non-negotiable survival anchors.',
      subtext: 'Rent, wifi, and basic transit are paid on day one. You do not touch money allocated to your roof.'
    },
    ar: {
      rule: 'الالتزامات الثابتة هي خط الدفاع الأول عن استقرارك.',
      subtext: 'الإيجار والإنترنت ومصاريف السفر الأساسية تدفع أول الشهر فوراً ولا يُقترض منها تحت أي ظرف.'
    }
  },
  {
    id: 'rule_lending',
    category: 'boundaries',
    en: {
      rule: 'If you cannot afford to burn it without bitterness, you cannot afford to lend it.',
      subtext: 'Lending money out of social awkwardness or fear of disapproval is how broke students destroy friendships and themselves.'
    },
    ar: {
      rule: 'المال الذي لا تستطيع اعتباره هدية منسية، لا تقرضه لأحد.',
      subtext: 'الإقراض بدافع الإحراج الاجتماعي أو الخوف من حكم الآخرين هو أقصر طريق لإفلاسك وخسارة علاقاتك.'
    }
  },
  {
    id: 'rule_cooling',
    category: 'self_reliance',
    en: {
      rule: 'The 24-hour rule breaks the dopamine hook of marketing.',
      subtext: 'Any desire over 150 EGP that feels urgent today is usually completely forgotten tomorrow. Wait.'
    },
    ar: {
      rule: 'مهلة الـ 24 ساعة تكسر فخ الشراء الاندفاعي.',
      subtext: 'أي رغبة تفوق 150 جنيهاً تبدو طارئة الآن، ستكتشف غداً غالباً أنك لست بحاجة حقيقية لها. انتظر.'
    }
  },
  {
    id: 'rule_envelope',
    category: 'clarity',
    en: {
      rule: 'Live strictly inside the current weekly envelope.',
      subtext: 'If Week 2 funds are depleted by Thursday, you eat simple pantry staples until Saturday. Never borrow from Week 3.'
    },
    ar: {
      rule: 'عش حصراً داخل حدود مظروف الأسبوع الحالي.',
      subtext: 'إذا نفد مخصص الأسبوع مبكراً، التزم بما هو متاح ولا تقترض قرشاً واحداً من مظروف الأسبوع القادم.'
    }
  },
  {
    id: 'rule_negotiation',
    category: 'self_reliance',
    en: {
      rule: 'The buyer who can walk away without emotion holds all leverage.',
      subtext: 'Never fall in love with any product, laptop, or apartment before the deal is signed and verified.'
    },
    ar: {
      rule: 'المشتري القادر على المغادرة بهدوء هو من يملك القوة.',
      subtext: 'إياك أن تُظهر الانبهار بالسلعة أو الاستعجال أمام التاجر أو صاحب العقار مهما أعجبك المعروض.'
    }
  }
];
