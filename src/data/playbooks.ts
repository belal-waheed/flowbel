import type { PlaybookScenario } from '../types/playbook';

export const PLAYBOOKS: PlaybookScenario[] = [
  {
    id: 'playbook_lending',
    category: 'lending',
    titleEn: 'Lending Money & Personal Boundaries',
    titleAr: 'إقراض المال والحدود الشخصية',
    subtitleEn: 'Shield your essential budget while preserving personal respect',
    subtitleAr: 'حماية الميزانية المعيشية والحفاظ على العلاقات والحدود الشخصية',
    contextEn: 'In social circles, peers, colleagues, and acquaintances frequently request emergency personal loans. Living on a partitioned monthly budget means any uncalculated lending directly impacts your essential commitments.',
    contextAr: 'في البيئة الاجتماعية، تكثر طلبات الاقتراض الطارئة من الزملاء والمعارف. وبما أنك تدير ميزانية شهرية محددة، فإن أي إقراض غير مدروس يهدد التزاماتك الأساسية مباشرة.',
    iconName: 'ShieldAlert',
    goldenRuleEn: 'Core Principle: Never lend an amount you cannot afford to write off completely as an unrecoverable gift.',
    goldenRuleAr: 'المبدأ الأساسي: لا تقرض أبداً مبلغاً لا تستطيع شطبه بالكامل من حساباتك دون حسرة أو ضيق.',
    principles: [
      {
        id: 'len_p1',
        ruleEn: 'Your basic financial stability takes precedence over external requests.',
        ruleAr: 'أولويتك المطلقة هي أمانك المعيشي واستقرارك المالي.',
        explanationEn: 'Lending money when you have barely enough for your weekly envelope is financial self-sabotage.',
        explanationAr: 'إقراض الآخرين مع وجود عجز أو ضيق في مخصصاتك الأسبوعية هو إخلال صريح باستقرارك المالي.'
      },
      {
        id: 'len_p2',
        ruleEn: 'Vagueness invited is debt prolonged.',
        ruleAr: 'الضبابية في المواعيد هي مقدمة تعثر الحقوق.',
        explanationEn: 'Never accept open-ended promises. A loan without a defined calendar repayment date creates uncertainty.',
        explanationAr: 'تجنب الوعود غير المحددة زمنياً؛ فالمعاملة المالية الواضحة تتطلب موعد سداد صريح ومحدد مسبقاً.'
      },
      {
        id: 'len_p3',
        ruleEn: 'A clear refusal is infinitely more honorable than a false promise.',
        ruleAr: 'الاعتذار الموضوعي بأدب أرقى بكثير من الوعود المؤجلة أو الحرج لاحقاً.',
        explanationEn: 'People respect transparent boundaries and objective clarity.',
        explanationAr: 'الوضوح واللباقة في توضيح الحدود المالية يفرضان الاحترام المتبادل ويمنعان الخلافات.'
      }
    ],
    steps: [
      {
        id: 'len_s1',
        titleEn: 'Assess Your Envelope Margin First',
        titleAr: 'فحص رصيد الأسبوع الجاري بدقة',
        descriptionEn: 'Open Flowbel and check your remaining envelope balance. If the requested amount exceeds 15% of your remaining variable funds, refusal is mandatory.',
        descriptionAr: 'افتح التطبيق وتأكد من رصيد مظروفك. إذا كان المبلغ المطلوب يتجاوز 15% من متبقي مخصصك الأسبوعي، فالاعتذار ضرورة مالية.',
        warningEn: 'Never borrow from future weeks or dip into the fixed obligations reserve.',
        warningAr: 'تجنب السحب من مخصصات الأسابيع القادمة أو استهلاك احتياطي الالتزامات الثابتة.',
        actionableCheckEn: 'I verified that my essential commitments for the next 14 days are 100% funded.',
        actionableCheckAr: 'تأكدت أن مصاريفي الأساسية للأسبوعين القادمين مؤمنة بالكامل دون عجز.'
      },
      {
        id: 'len_s2',
        titleEn: 'Classify the Request Nature',
        titleAr: 'تصنيف طبيعة وظروف الطلب',
        descriptionEn: 'Distinguish between a life-threatening crisis (sudden acute medical surgery) and lifestyle mismanagement (dining out, gifts, travel, impulse shopping).',
        descriptionAr: 'ميز بوضوح بين الظروف الطارئة الحقيقية (علاج عاجل أو ظرف أسري قاهر) وبين تغطية عجز ناجم عن إنفاق غير محسوب.',
        actionableCheckEn: 'I verified the request is for an urgent necessity, not leisure or lifestyle subsidization.',
        actionableCheckAr: 'تأكدت أن الطلب يخص ضرورة حتمية وليس تغطية إنفاق اندفاعي أو كماليات.'
      },
      {
        id: 'len_s3',
        titleEn: 'Enforce Written & Timestamped Record',
        titleAr: 'توثيق الاتفاق المالي كتابياً',
        descriptionEn: 'If you decide to lend, record it immediately in writing over digital messaging: exact amount, date sent, and agreed repayment date.',
        descriptionAr: 'في حال قررت المساعدة، وثق المعاملة برسالة واضحة عبر المراسلة الرقمية: المبلغ، وتاريخ التحويل، وموعد السداد المتفق عليه.',
        warningEn: 'Never hand cash without a clear digital trail or mutual written confirmation.',
        warningAr: 'احرص دائماً على وجود تأكيد رقمي مكتوب يوضح تفاصيل المبلغ وموعد السداد.',
        actionableCheckEn: 'Both parties have a mutual written confirmation of the exact repayment date.',
        actionableCheckAr: 'الطرفان لديهما رسالة مكتوبة واضحة تحدد تاريخ رد المبلغ بدقة.'
      }
    ],
    dialogues: [
      {
        triggerEn: 'A friend or acquaintance asks for a loan you cannot afford',
        triggerAr: 'صديق أو زميل يطلب اقتراض مال وأنت لا تملك فائضاً',
        scriptEn: 'I understand your situation, but my monthly budget is strictly partitioned for commitments. I do not have uncommitted cash right now.',
        scriptAr: 'مقدر ظرفك، لكن ميزانيتي مقسمة بالكامل على التزامات محددة ولا تتوفر لدي سيولة حرة حالياً.'
      },
      {
        triggerEn: 'A borrower asks to postpone repayment past the agreed date',
        triggerAr: 'المقترض يماطل أو يطلب تأجيل موعد السداد',
        scriptEn: 'I accommodated you on the agreed date because I have upcoming utility and essential commitments. I need the sum by this Thursday as agreed.',
        scriptAr: 'أنا التزمت معك بناءً على الموعد المتفق عليه لأن لدي التزامات مجدولة في هذا الموعد، وأحتاج المبلغ في الموعد المحدد.'
      },
      {
        triggerEn: 'Someone pressures you claiming you must have savings',
        triggerAr: 'شخص يضغط عليك بافتراض أن لديك مدخرات كافية',
        scriptEn: 'My financial allocation rules are fixed and non-negotiable. I cannot disrupt them.',
        scriptAr: 'نظامي المالي وقواعد إدارة ميزانيتي ثابتة ولا أستطيع الإخلال بها.'
      }
    ]
  },
  {
    id: 'playbook_tech',
    category: 'tech',
    titleEn: 'Buying Used Electronics & Laptops',
    titleAr: 'شراء الإلكترونيات واللابتوبات المستعملة',
    subtitleEn: 'Hardware diagnostics and anti-scam verification protocol',
    subtitleAr: 'فحص العتاد وكشف العيوب الخفية وتفادي النصب في الأجهزة المستعملة',
    contextEn: 'Used technology markets in Egypt (Souq El-Bustan, Mall El-Bostan, Dubizzle, Facebook Marketplace) are filled with re-sold refurbished units, baked motherboards, worn batteries, and counterfeit power supplies.',
    contextAr: 'أسواق المستعمل في مصر (سوق البستان، مولات وسط البلد، دوبيزل ومجموعات فيسبوك) مليئة بالأجهزة المسخنة (reballed chips)، والبطاريات المتهالكة والشواحن المقلدة التي تحرق البوردة.',
    iconName: 'Laptop',
    goldenRuleEn: 'Core Principle: Never hand over payment without a complete 30-minute stress test running directly on a live diagnostics suite.',
    goldenRuleAr: 'المبدأ الأساسي: لا تسلم المبلغ للبائع قبل تشغيل اختبارات الضغط والحرارة لمدة 30 دقيقة متواصلة وفحص كفاءة البطارية والقرص.',
    principles: [
      {
        id: 'tch_p1',
        ruleEn: 'Cosmetic appearance is secondary; motherboard and thermal health are everything.',
        ruleAr: 'المظهر الخارجي خادع؛ سلامة اللوحة الأم والحرارة هما جوهر الجهاز.',
        explanationEn: 'A shiny casing can hide a thermal-throttling CPU with degraded solder joints.',
        explanationAr: 'الهيكل الخارجي اللامع قد يخفي شريحة معالجة محترقة أو لحامات متهالكة معرضة للتلف المفاجئ.'
      },
      {
        id: 'tch_p2',
        ruleEn: 'Original chargers protect internal power stages.',
        ruleAr: 'الشاحن الأصلي خط دفاع الجهاز الأساسي.',
        explanationEn: 'Cheap aftermarket third-party chargers deliver noisy ripple voltage that burns input MOSFETs within months.',
        explanationAr: 'الشواحن الكوبي الرخيصة تضخ تياراً غير مستقر يحرق دوائر الباور والـ MOSFET في فترة وجيزة.'
      },
      {
        id: 'tch_p3',
        ruleEn: 'Meet only in public spaces with stable electrical outlets and WiFi.',
        ruleAr: 'المقابلة فقط في مكان عام يتيح مصدر كهرباء مستقر وإنترنت.',
        explanationEn: 'Never accept quick car-window handoffs or metro station rush handovers.',
        explanationAr: 'ارفض تماماً المقابلات السريعة في محطات المترو أو استلام الجهاز على عجل دون تجربة هادئة.'
      }
    ],
    steps: [
      {
        id: 'tch_s1',
        titleEn: 'Battery Cycle Count & Wear Level Inspection',
        titleAr: 'فحص دورات البطارية ونسبة الاستهلاك',
        descriptionEn: 'On Windows, run cmd as admin and execute `powercfg /batteryreport`. Compare Full Charge Capacity against Design Capacity. Reject devices with over 35% battery wear unless priced down accordingly.',
        descriptionAr: 'افتح موجه الأوامر واكتب `powercfg /batteryreport`. قارن السعة الحالية بالسعة الأصلية (Design Capacity). ارفض أي جهاز يتجاوز استهلاك بطاريته 35% إلا بخصم ثمن بطارية أصلية جديدة.',
        warningEn: 'Third-party replacement batteries in Egypt often fail within 3 months and lack proper temperature cutoffs.',
        warningAr: 'بطاريات التبديل التجارية في السوق المحلي رديئة وتتلف سريعاً وتفتقر لحساسات الحرارة القياسية.',
        actionableCheckEn: 'I ran a battery report and wear level is within acceptable threshold (<25%).',
        actionableCheckAr: 'قمت باستخراج تقرير البطارية ونسبة التآكل أقل من 25% من السعة الأصلية.'
      },
      {
        id: 'tch_s2',
        titleEn: 'Storage Drive S.M.A.R.T Health Check',
        titleAr: 'فحص صحة الهارد والـ SSD عبر S.M.A.R.T',
        descriptionEn: 'Run CrystalDiskInfo or Hard Disk Sentinel from a USB flash drive. Check total Power-On Hours, Total Host Writes, and reallocated sectors. 100% or 95%+ health is required.',
        descriptionAr: 'شغل برنامج CrystalDiskInfo من الفلاشة. افحص ساعات التشغيل الإجمالية، وحجم البيانات المكتوبة، وقطاعات الباد سكتور. اشترط صحة 95% فما فوق.',
        warningEn: 'A dying SSD will cause unrecoverable project and study data loss.',
        warningAr: 'القرص المتهالك سيتسبب في ضياع أبحاثك ومشاريعك الدراسية فجأة دون سابق إنذار.',
        actionableCheckEn: 'CrystalDiskInfo reports "Good / 100%" with zero critical SMART errors.',
        actionableCheckAr: 'أظهر الفحص حالة القرص "Good" بنسبة ممتازة دون أي تنبيهات حرجة.'
      },
      {
        id: 'tch_s3',
        titleEn: 'Display Matrix, Backlight Bleed & Hinge Rigidity',
        titleAr: 'فحص الشاشة والإضاءة الخلفية ومفصلات الهيكل',
        descriptionEn: 'Open a pure black full-screen image in a dark corner to check for IPS glow / backlight bleed. Open a pure white screen to spot dead pixels and uneven yellowing. Open and close lid 5 times to test hinge tightness.',
        descriptionAr: 'افتح صورة سوداء بالكامل وتفقد تسريب الإضاءة في الحواف. افتح صفحة بيضاء نقية لرصد البيكسلات الميتة أو البقع الصفراء. افتح وأغلق الشاشة 5 مرات للتأكد من تماسك المفصلات.',
        actionableCheckEn: 'Zero dead pixels, no pressure white spots, and hinges operate smoothly with zero cracking sounds.',
        actionableCheckAr: 'الشاشة خالية من البيكسلات الميتة والبقع البيضاء والمفصلات متماسكة دون طقطقة.'
      },
      {
        id: 'tch_s4',
        titleEn: 'Thermal Stress & Fan Acoustic Testing',
        titleAr: 'اختبار الضغط الحراري وصوت المراوح',
        descriptionEn: 'Run FurMark or Cinebench for 10 minutes while monitoring temperatures using HWMonitor. CPU package temperature should not exceed 88°C sustained. Check that fans spin smoothly without grinding bearing noises.',
        descriptionAr: 'شغل اختبار ضغط المعالج وكارت الشاشة لمدة 10 دقائق وراقب درجات الحرارة. يجب ألا تتجاوز 85-88 درجة تحت أقصى حمل، وتأكد من خلو صوت المروحة من الاحتكاك الميكانيكي.',
        actionableCheckEn: 'System maintained stability under full load with zero thermal shutdowns or blue screens.',
        actionableCheckAr: 'الجهاز حافظ على استقراره تحت الضغط الكامل دون إعادة تشغيل أو شاشة زرقاء.'
      }
    ],
    dialogues: [
      {
        triggerEn: 'The seller rushes you claiming another buyer is arriving',
        triggerAr: 'البائع يستعجلك مدعياً وجود مشترٍ آخر في الطريق',
        scriptEn: 'I need to run the standard 20-minute diagnostic tests. If you are in a rush, you are free to sell to them.',
        scriptAr: 'أنا لازم أخلص فحص الجهاز بالبرامج والضغط لمدة 20 دقيقة، لو مستعجل حضرتك مش ملزم تستناني ولك كامل الحرية تبيعه لغيري.'
      },
      {
        triggerEn: 'Discovering an unmentioned defect (e.g. 35% battery wear)',
        triggerAr: 'اكتشاف عيب لم يذكره البائع (مثل ضعف البطارية)',
        scriptEn: 'The battery wear is 38%, which requires immediate replacement. I will subtract 1,200 EGP for the original replacement part or walk away.',
        scriptAr: 'نسبة استهلاك البطارية 38% وتحتاج تبديل فوري. هخصم 1,200 جنيه تمن بطارية أصلية من السعر المتفق عليه أو نلغي البيعة بكل احترام.'
      }
    ]
  },
  {
    id: 'playbook_housing',
    category: 'housing',
    titleEn: 'Tenancy & Shared Student Housing',
    titleAr: 'إدارة السكن وعقود الإيجار والتزامات الشركاء',
    subtitleEn: 'Securing lease rights, safety deposits, and fair bill sharing',
    subtitleAr: 'حماية التأمين وعقد الإيجار وتنظيم السكن المشترك والفواتير',
    contextEn: 'Renting apartments requires diligence with lease agreements, securing the deposit, and clear protocols with flatmates on utility contributions.',
    contextAr: 'استئجار شقق السكن يتطلب تدقيقاً في بنود التعاقد، وحماية مبلغ التأمين، والاتفاق الواضح مع الشركاء على مواعيد وفواتير الاستهلاك.',
    iconName: 'Key',
    goldenRuleEn: 'Core Principle: Document every square centimeter with timestamped video on day one before unpacking a single bag.',
    goldenRuleAr: 'المبدأ الأساسي: وثق كل ركن وتجهيزات الشقة بتسجيل مرئي مؤرخ قبل تفريغ أمتعتك في يوم الاستلام الأول.',
    principles: [
      {
        id: 'hsg_p1',
        ruleEn: 'The security deposit belongs to you until legitimate damages are proven.',
        ruleAr: 'مبلغ التأمين أمانة ملكك قانوناً وأخلاقاً لحين ثبوت ضرر متعمد.',
        explanationEn: 'Normal wear and tear (sun faded curtains, aging wall paint) is the landlord responsibility, not the tenant.',
        explanationAr: 'الاستهلاك الطبيعي للعقار (بهتان الدهان، تقادم السباكة بالزمن) مسؤولية المالك وليس خصماً من تأمين المستأجر.'
      },
      {
        id: 'hsg_p2',
        ruleEn: 'Written shared house rules prevent resentment.',
        ruleAr: 'لائحة السكن المكتوبة تحمي العلاقات من التآكل.',
        explanationEn: 'Unspoken assumptions about dishes, overnight guests, and smoking destroy flatmate harmony within 60 days.',
        explanationAr: 'التوقعات غير المعلنة بشأن النظافة، استقبال الضيوف، والهدوء كفيلة بتفجير الخلافات وتخريب السكن خلال شهرين.'
      },
      {
        id: 'hsg_p3',
        ruleEn: 'Never pay rent in untracked cash.',
        ruleAr: 'إياك وسداد الإيجار كاش دون إيصال موقع ومختوم.',
        explanationEn: 'Always use Instapay/bank transfer with explicit note "Rent Month YYYY" or demand a signed written receipt on the spot.',
        explanationAr: 'حول الإيجار عبر إنستاباي مع كتابة بيان "إيجار شهر كذا" أو استلم إيصال أمانة/سداد موقع فوراً.'
      }
    ],
    steps: [
      {
        id: 'hsg_s1',
        titleEn: 'Utility Meters Initial Baseline Audit',
        titleAr: 'قراءة وتصوير عدادات الكهرباء والغاز والمياه',
        descriptionEn: 'Photograph the electricity meter (عداد الكارت أو القديم), natural gas dial, and water meter with a newspaper or clear timestamp. Write the exact numbers in the contract annex.',
        descriptionAr: 'صور عداد الكهرباء وشاشة الرصيد، وعداد الغاز الطبيعي، والمياه، واكتب الأرقام بدقة في ملحق العقد لتفادي سداد استهلاك المستأجر السابق.',
        warningEn: 'Many landlords offload months of back-due commercial consumption fines onto unsuspecting students.',
        warningAr: 'بعض الملاك يحملون الطلاب غرامات وتراكمات استهلاك سابقة لشهور لم يسكنوا فيها إطلاقاً.',
        actionableCheckEn: 'Initial meter readings photographed and recorded in the written contract.',
        actionableCheckAr: 'تم تصوير قراءات جميع العدادات وإثباتها في ملحق عقد الإيجار الموقع.'
      },
      {
        id: 'hsg_s2',
        titleEn: 'Comprehensive Fixtures & Plumbing Check',
        titleAr: 'فحص ضغط المياه، السباكة، وتصريف الحمام',
        descriptionEn: 'Turn on all water taps simultaneously to check pressure. Flush the toilet twice. Inspect beneath the kitchen sink for damp wood and moisture stains.',
        descriptionAr: 'افتح صنابير المياه معاً لفحص ضغط الخط. شغل السيفون مرتين وتأكد من التصريف. افحص خزانة حوض المطبخ لرصد أي تسريب رطوبة قديم.',
        actionableCheckEn: 'Water heater (سخان) works, pressure is sufficient, and zero hidden plumbing leaks.',
        actionableCheckAr: 'تم فحص السخان والمواسير والضغط مناسب ولا يوجد أي تسريب مياه خفي.'
      },
      {
        id: 'hsg_s3',
        titleEn: 'Flatmate Utility Splitting & Payment Agreement',
        titleAr: 'صياغة اتفاق مكتوب لتوزيع فواتير السكن المشترك',
        descriptionEn: 'Agree on exact division: Electricity + Gas + Water + WiFi (300 EGP total) divided equally by head. Set the 1st of each month as hard collection deadline.',
        descriptionAr: 'اتفقوا كتابة على توزيع الفواتير: الكهرباء والغاز والمياه والإنترنت (300 ج) بالتساوي التام وتحديد يوم 1 في الشهر موعداً نهائياً للتحصيل.',
        actionableCheckEn: 'All flatmates agreed to the monthly billing calendar and equal split formula.',
        actionableCheckAr: 'جميع الشركاء وافقوا كتابياً على جدول التحصيل الشهري والمشاركة العادلة.'
      }
    ],
    dialogues: [
      {
        triggerEn: 'Landlord hesitates or tries to delay returning the deposit at checkout',
        triggerAr: 'المالك يماطل في رد التأمين عند إخلاء الشقة',
        scriptEn: 'The apartment is in the exact condition recorded on video on move-in day. The full deposit must be handed over today as stipulated in clause 4.',
        scriptAr: 'الشقة تم تسليمها بنفس حالة فيديو الاستلام الموثق في بداية التعاقد، ومبلغ التأمين مستحق الرد بالكامل اليوم وفقاً لبند العقد.'
      },
      {
        triggerEn: 'A flatmate fails to pay their share of the internet/utility bill',
        triggerAr: 'أحد الشركاء يتكاسل أو يماطل في دفع نصيبه من الفاتورة',
        scriptEn: 'The bill must be paid tomorrow to avoid service suspension. Everyone must contribute their share today so no one carries the burden alone.',
        scriptAr: 'الفاتورة ميعاد سدادها بكرة ولازم تتدفع عشان الخدمة متقفش، مطلوب من كل واحد نصيبه النهاردة عشان محدش يشيل فوق طاقته.'
      }
    ]
  },
  {
    id: 'playbook_negotiation',
    category: 'negotiation',
    titleEn: 'Calm Negotiation & Commercial Value',
    titleAr: 'التفاوض الموضوعي والتسعير العادل',
    subtitleEn: 'The 3-quote rule, composed communication, and the walk-away benchmark',
    subtitleAr: 'مقارنة عروض الأسعار والتواصل الموضوعي وقوة الانسحاب الهادئ',
    contextEn: 'In commercial markets and service workshops, initial quoted prices are often set high assuming customers will either bargain or overpay without price discovery.',
    contextAr: 'في الأسواق التجارية ومراكز الصيانة، توضع الأسعار الأولية مرتفعة بافتراض أن المشتري إما سيتفاوض أو سيقبل السعر دون تدقيق.',
    iconName: 'Banknote',
    goldenRuleEn: 'Core Principle: Never buy from the first vendor who quotes you. Always gather 3 independent quotes before committing capital.',
    goldenRuleAr: 'المبدأ الأساسي: لا تشترِ أبداً من العرض الأول. اجمع 3 عروض أسعار مستقلة دائماً قبل اتخاذ القرار.',
    principles: [
      {
        id: 'neg_p1',
        ruleEn: 'Silence is your most powerful negotiating weapon.',
        ruleAr: 'الصمت والهدوء هما أقوى أدواتك في التفاوض.',
        explanationEn: 'When quoted a high price, pause for 5 full seconds without speaking or reacting. The vendor will often drop the price to break the discomfort.',
        explanationAr: 'عند سماع سعر مبالغ فيه، اصمت تماماً لمدة 5 ثوانٍ دون انفعال. غالباً سيبادر البائع بخفض السعر لكسر حاجز الصمت.'
      },
      {
        id: 'neg_p2',
        ruleEn: 'Never reveal your budget or your urgency.',
        ruleAr: 'لا تفصح أبداً عن سقف ميزانيتك أو مدى استعجالك للسلعة.',
        explanationEn: 'If a vendor knows you need the item within the hour, you lose 100% of your negotiating leverage.',
        explanationAr: 'إذا علم البائع أنك بحاجة ماسة للقطعة خلال ساعات، فقدت أوراق الضغط وأصبحت مضطراً لقبول شروطه.'
      },
      {
        id: 'neg_p3',
        ruleEn: 'Polite detachment beats aggressive arguing.',
        ruleAr: 'الأدب الهادئ والانسحاب يغلب الجدال الصاخب.',
        explanationEn: 'Bargaining is not a fight; it is an objective market price discovery process.',
        explanationAr: 'التفاوض ليس شجاراً، بل هو بحث هادئ عن السعر العادل للسلعة في السوق.'
      }
    ],
    steps: [
      {
        id: 'neg_s1',
        titleEn: 'Market Price Reconnaissance (The 3-Shop Rule)',
        titleAr: 'استطلاع السوق (قاعدة المقارنة الثلاثية)',
        descriptionEn: 'Walk into 3 separate stores in the same commercial district. Ask for the exact technical model and price without showing buying intent. Take mental notes.',
        descriptionAr: 'قم بزيارة 3 متاجر مختلفة في نفس المنطقة. اسأل عن نفس الموديل والمواصفات بدقة وقارن الأسعار دون إظهار رغبة في الشراء الفوري.',
        actionableCheckEn: 'Obtained at least 3 verified market price quotes for identical specifications.',
        actionableCheckAr: 'جمعت 3 عروض أسعار لنفس السلعة والمواصفات بدقة.'
      },
      {
        id: 'neg_s2',
        titleEn: 'Cash Leverage Anchoring',
        titleAr: 'استخدام قوة الدفع النقدي الفوري للتفاوض',
        descriptionEn: 'Once the lowest reference price is known, propose a fair target 15-20% below, stressing immediate cash payment with no hassle.',
        descriptionAr: 'بعد معرفة أدنى سعر مرجعي، اعرض سعراً عادلاً أقل بنسبة مناسبة مع التأكيد على جاهزية الدفع الفوري دون تأخير.',
        actionableCheckEn: 'Proposed an objective, fair counter-offer based on real market baseline.',
        actionableCheckAr: 'قدمت عرضاً عادلاً مبنياً على المقارنة السعرية الواقعية.'
      },
      {
        id: 'neg_s3',
        titleEn: 'The Physical Walk-Away Test',
        titleAr: 'اختبار الانسحاب الهادئ',
        descriptionEn: 'If the vendor refuses your fair offer, politely smile, say "Thank you, I will compare options and return later", and walk slowly toward the exit.',
        descriptionAr: 'إذا رفض البائع عرضك العادل، ابتسم بهدوء وقل: "شكراً لحضرتك، سأقارن الخيارات المتاحة وأعود لاحقاً"، وتحرك بهدوء نحو المغادرة.',
        actionableCheckEn: 'Practiced graceful detachment without emotional irritation or impulse concession.',
        actionableCheckAr: 'نفذت خطوة الانسحاب بهدوء تام دون أي توتر أو تنازل اندفاعي.'
      }
    ],
    dialogues: [
      {
        triggerEn: 'A vendor offers an inflated initial price',
        triggerAr: 'البائع يعرض سعراً أولياً مرتفعاً جداً',
        scriptEn: 'I have researched the market rate for this item. My budget for this item is X cash right now.',
        scriptAr: 'أنا راجعت متوسط سعر القطعة في السوق، وميزانيتي المحددة لها نقداً هي X جنيه.'
      },
      {
        triggerEn: 'The seller claims this is the final price and cannot be discounted',
        triggerAr: 'البائع يؤكد أن السعر نهائي وغير قابل للتفاوض',
        scriptEn: 'I understand and respect that. I will look around a bit more. Thank you for your time.',
        scriptAr: 'أقدر موقف حضرتك، سأقارن الخيارات المتاحة وأعود لاحقاً. شكراً جزيلاً لوقتك.'
      }
    ]
  },
  {
    id: 'playbook_emergency',
    category: 'emergency',
    titleEn: 'Emergency Preparedness & Contingency Buffer',
    titleAr: 'إدارة الطوارئ والاحتياطي المالي',
    subtitleEn: 'Contingency cash reserves, essential readiness, and document security',
    subtitleAr: 'احتياطي السيولة للطوارئ والجاهزية وتأمين الوثائق الهامة',
    contextEn: 'Independent living requires pre-built failsafes for unexpected moments—such as technical banking outages, urgent transit needs, or late-night medical emergencies.',
    contextAr: 'الاستقلالية في المعيشة تتطلب استعداداً مسبقاً للمواقف الطارئة، مثل تعطل وسائل الدفع الإلكترونية، أو الحاجة لدواء عاجل في أوقات متأخرة.',
    iconName: 'Flame',
    goldenRuleEn: 'Core Principle: Always keep an untouchable emergency cash reserve in physical currency, completely separate from everyday accounts.',
    goldenRuleAr: 'المبدأ الأساسي: احتفظ دائماً بمبلغ احتياطي نقدي للطوارئ، منفصلاً تماماً عن بطاقاتك وحساباتك اليومية.',
    principles: [
      {
        id: 'emg_p1',
        ruleEn: 'Digital money can experience downtime in critical moments.',
        ruleAr: 'وسائل الدفع الرقمية قد تتعطل في أوقات غير متوقعة.',
        explanationEn: 'Telecom network outages, bank server maintenance, and empty ATM machines occur unexpectedly. Physical contingency cash is a vital safeguard.',
        explanationAr: 'انقطاع الشبكات أو صيانة السيرفرات البنكية تقع أحياناً بلا إنذار؛ لذا يعد الاحتياطي النقدي خط أمان أساسي في الطوارئ.'
      },
      {
        id: 'emg_p2',
        ruleEn: 'Health contingencies require immediate readiness.',
        ruleAr: 'طوارئ الرعاية الصحية تتطلب جاهزية فورية.',
        explanationEn: 'Facing unexpected acute pain or illness without basic medication leads to avoidable distress and complications.',
        explanationAr: 'مواجهة الآلام المفاجئة أو الوعكات الصحية دون وجود مستلزمات طبية أساسية تسبب مشقة يمكن تداركها بصيدلية إسعافات بسيطة.'
      },
      {
        id: 'emg_p3',
        ruleEn: 'Protecting official documents preserves vital momentum.',
        ruleAr: 'تأمين الوثائق الرسمية يحميك من التعطيل والمشقة.',
        explanationEn: 'Keep secure digital scans of your official identification, credentials, and essential records at all times.',
        explanationAr: 'احرص دائماً على وجود نسخ رقمية واضحة ومؤمنة لبطاقة الهوية والوثائق الثبوتية الرسمية.'
      }
    ],
    steps: [
      {
        id: 'emg_s1',
        titleEn: 'Physical Contingency Reserve Setup',
        titleAr: 'تجهيز رصيد نقدي مخصص للطوارئ',
        descriptionEn: 'Set aside a dedicated cash buffer in physical currency placed in a secure, designated spot. Reserve this exclusively for genuine emergencies.',
        descriptionAr: 'خصص مبلغاً نقدياً للطوارئ واحفظه في مكان آمن، على أن يقتصر استخدامه حصراً على الاحتياجات الطارئة القصوى.',
        warningEn: 'If you touch this reserve for routine expenses, your financial safety buffer is compromised.',
        warningAr: 'استخدام هذا المبلغ في المشتريات العادية يفقدك صمام الأمان المالي ضد المفاجآت.',
        actionableCheckEn: 'I have a physical cash reserve safely designated exclusively for urgent emergencies.',
        actionableCheckAr: 'قمت بتخصيص مبلغ نقدي محفوظ ومحدد لحالات الطوارئ فقط.'
      },
      {
        id: 'emg_s2',
        titleEn: 'Essential First-Aid Kit Assembly',
        titleAr: 'تجهيز حقيبة إسعافات أولية منزلية أساسية',
        descriptionEn: 'Stock a small kit containing basic analgesics, gastrointestinal relief, oral rehydration salts, antiseptic, and bandages.',
        descriptionAr: 'جهز حقيبة صغيرة تضم المسكنات الأساسية ومستلزمات علاج الجفاف والمطهرات والضمادات للاستخدام العاجل عند الحاجة.',
        actionableCheckEn: 'Basic medical pouch assembled and placed in a known, reachable spot.',
        actionableCheckAr: 'حقيبة الإسعافات الأساسية جاهزة ومحفوظة في مكان معروف ومتاح.'
      },
      {
        id: 'emg_s3',
        titleEn: 'Secure Digital Vault for Identification',
        titleAr: 'تأمين نسخ الوثائق الثبوتية الرسمية سحابياً',
        descriptionEn: 'Scan both sides of National ID, academic credentials, and medical cards. Store them in a secure, encrypted offline or cloud folder.',
        descriptionAr: 'احفظ نسخاً ضوئية واضحة لوجهي بطاقة الهوية والوثائق الأكاديمية والطبية في مجلد مشفر ومتاح دائماً.',
        actionableCheckEn: 'Identity documents scanned and accessible securely from your device.',
        actionableCheckAr: 'الوثائق الرسمية ممسوحة ضوئياً ومتاحة بأمان على جهازك الشخصي.'
      }
    ],
    dialogues: [
      {
        triggerEn: 'Facing an unexpected midnight necessity when electronic payments fail',
        triggerAr: 'مواجهة ظرف طارئ ليلاً مع تعطل وسائل الدفع الإلكترونية',
        scriptEn: 'I have the contingency cash reserve specifically set aside for this. I will use it composedly and replenish it with the next cycle.',
        scriptAr: 'لدي احتياطي نقدي مخصص للطوارئ لمثل هذه الظروف، وسأستخدمه الآن بهدوء وأعيد تغذيته مع بداية الدورة المالية القادمة.'
      },
      {
        triggerEn: 'An unexpected administrative request for official identification documents',
        triggerAr: 'طلب إداري مفاجئ لإثبات هوية أو مستند رسمي',
        scriptEn: 'I have verified, high-resolution digital copies ready immediately in my secure drive.',
        scriptAr: 'لدي نسخ رقمية معتمدة وعالية الجودة جاهزة فوراً في ملفاتي المؤمّنة.'
      }
    ]
  }
];
