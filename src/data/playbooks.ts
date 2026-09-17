import type { PlaybookScenario } from '../types/playbook';

export const PLAYBOOKS: PlaybookScenario[] = [
  {
    id: 'playbook_lending',
    category: 'lending',
    titleEn: 'Lending Money & Personal Boundaries',
    titleAr: 'إقراض المال والحدود الشخصية',
    subtitleEn: 'Shield your survival budget without ruining relationships',
    subtitleAr: 'حماية ميزانيتك المعيشية دون حرق علاقاتك الاجتماعية',
    contextEn: 'In Egyptian social circles, peers, relatives, and flatmates frequently request emergency loans. Because you live on a tight student allowance, informal lending will directly compromise your nutrition or rent.',
    contextAr: 'في البيئة الاجتماعية والجامعية المصرية، تكثر طلبات السلف الطارئة من الأصدقاء والأقارب. وبما أنك تعيش بمصروف شهري محدد، فإن أي إقراض غير محسوب يهدد استقرار سكنك وطعامك مباشرة.',
    iconName: 'ShieldAlert',
    goldenRuleEn: 'The Golden Law: Never lend an amount you cannot afford to write off completely as an unrecoverable gift.',
    goldenRuleAr: 'القاعدة الذهبية: لا تقرض أبداً مبلغاً لا تستطيع شطبه بالكامل من حساباتك كهدية منسية دون حسرة أو ضيق.',
    principles: [
      {
        id: 'len_p1',
        ruleEn: 'Your basic survival takes precedence over any peer convenience.',
        ruleAr: 'أولويتك المطلقة هي أمانك المعيشي قبل مجاملة أي طرف.',
        explanationEn: 'Lending someone money when you have only 300 EGP left in your envelope is self-sabotage, not generosity.',
        explanationAr: 'إقراض شخص وأنت لا تملك سوى 300 جنيه في مظروفك هو تدمير ذاتي وليس كرماً.'
      },
      {
        id: 'len_p2',
        ruleEn: 'Vagueness invited is debt prolonged.',
        ruleAr: 'الضبابية في المواعيد هي مقدمة ضياع الحقوق.',
        explanationEn: 'Never accept phrases like "I will return it when things get better". A loan without an exact calendar date is an outright gift.',
        explanationAr: 'لا تقبل أبداً عبارات مثل "أول ما تتيسر رجعهالك". القرض بدون تاريخ سداد محدد ومكتوب هو هبة ضائعة.'
      },
      {
        id: 'len_p3',
        ruleEn: 'A clear refusal is infinitely more honorable than a false promise.',
        ruleAr: 'الرفض القاطع بأدب أشرف ألف مرة من المماطلة أو إحراج نفسك لاحقاً.',
        explanationEn: 'People respect firm boundaries, even if momentarily disappointed.',
        explanationAr: 'الناس تحترم من يملك حدوداً واضحة، حتى وإن شعروا بضيق لحظي.'
      }
    ],
    steps: [
      {
        id: 'len_s1',
        titleEn: 'Assess Your Envelope Margin First',
        titleAr: 'فحص رصيد الأسبوع الجاري بدقة',
        descriptionEn: 'Open Flowbel and check your remaining envelope balance. If the requested amount exceeds 15% of your remaining variable funds, refusal is mandatory.',
        descriptionAr: 'افتح التطبيق وتأكد من رصيد مظروفك. إذا كان المبلغ المطلوب يتجاوز 15% من متبقي مخصصك الأسبوعي، فالرفض إلزامي ولا نقاش فيه.',
        warningEn: 'Never borrow from future weeks or dip into the 3,150 EGP fixed obligations reserve.',
        warningAr: 'إياك وسحب أي مليم من احتياطي الالتزامات الثابتة (3,150 ج) أو من أسابيع لم تبدأ بعد.',
        actionableCheckEn: 'I verified that my essential commitments for the next 14 days are 100% funded.',
        actionableCheckAr: 'تأكدت أن مصاريفي الأساسية للأسبوعين القادمين مؤمنة بالكامل دون عجز.'
      },
      {
        id: 'len_s2',
        titleEn: 'Classify the Request Nature',
        titleAr: 'تصنيف طبيعة وظروف الطلب',
        descriptionEn: 'Distinguish between a life-threatening crisis (sudden acute medical surgery) and lifestyle mismanagement (dining out, gifts, travel, impulse shopping).',
        descriptionAr: 'ميز بوضوح بين الكوارث الحقيقية (علاج عاجل، تذكرة سفر لظرف أسري قاهر) وبين سوء إدارة المصروف (خروجات، شراء كماليات، هدايا).',
        actionableCheckEn: 'I verified the request is for an urgent necessity, not leisure or lifestyle subsidization.',
        actionableCheckAr: 'تأكدت أن الطلب يخص ضرورة حتمية وليس رفاهية أو تغطية عجز ناجم عن إهمال.'
      },
      {
        id: 'len_s3',
        titleEn: 'Enforce Written & Timestamped Record',
        titleAr: 'توثيق الاتفاق المالي كتابياً',
        descriptionEn: 'If you decide to lend, record it immediately in writing over WhatsApp or messaging: exact amount in EGP, date sent, and agreed repayment date.',
        descriptionAr: 'في حال قررت المساعدة، وثق المعاملة برسالة واضحة عبر الواتساب: المبلغ بالجنيه، تاريخ التحويل، وتاريخ الاسترداد المتفق عليه.',
        warningEn: 'Never hand cash without a clear digital trail or mutual written confirmation.',
        warningAr: 'لا تسلم كاش باليد دون رسالة تأكيد استلام رقمية تفصل المبلغ والموعد.',
        actionableCheckEn: 'Both parties have a mutual written confirmation of the exact repayment date.',
        actionableCheckAr: 'الطرفان لديهما رسالة مكتوبة واضحة تحدد تاريخ رد المبلغ بدقة.'
      }
    ],
    dialogues: [
      {
        triggerEn: 'A friend or acquaintance asks for a loan you cannot afford',
        triggerAr: 'صديق أو زميل يطلب سلفة وأنت لا تملك فائضاً',
        scriptEn: 'I understand your situation, but my monthly budget is strictly partitioned for rent and bills. I do not have uncommitted cash right now.',
        scriptAr: 'مقدّر ظرفك جداً، لكن مصروفي مقسم بدقة على التزامات السكن والفواتير، ومش متاح معايا أي سيولة حرة الشهر ده.'
      },
      {
        triggerEn: 'A borrower asks to postpone repayment past the agreed date',
        triggerAr: 'المقترض يماطل أو يطلب تأجيل موعد السداد',
        scriptEn: 'I accommodated you on the agreed date because I have upcoming utility and grocery commitments. I need the sum by this Thursday as promised.',
        scriptAr: 'أنا التزمت معاك على الموعد المتفق عليه لأن عندي التزامات وسداد مصاريف محددة هذا الأسبوع، ومحتاج المبلغ يوم الخميس زي ما اتفقنا.'
      },
      {
        triggerEn: 'Someone pressures you claiming you must have savings',
        triggerAr: 'شخص يضغط عليك بافتراض أن لديك مدخرات كافية',
        scriptEn: 'My financial allocation rules are fixed and non-negotiable. I cannot disrupt them.',
        scriptAr: 'نظامي المالي وقواعد إدارة مصروفي صارمة ولا أستطيع الإخلال بها تحت أي ظرف.'
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
    goldenRuleEn: 'The Golden Law: Never hand over money without a complete 30-minute stress test running directly on a live bootable USB or diagnostics suite.',
    goldenRuleAr: 'القاعدة الذهبية: لا تسلم جنيهاً واحداً للبائع قبل تشغيل اختبارات الضغط والحرارة لمدة 30 دقيقة متواصلة وفحص كفاءة البطارية والقرص.',
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
    titleAr: 'السكن والتعامل مع السماسرة والشركاء',
    subtitleEn: 'Securing lease rights, safety deposits, and fair bill sharing',
    subtitleAr: 'حماية التأمين وعقد الإيجار وتنظيم السكن المشترك والفواتير',
    contextEn: 'Independent students renting apartments in Cairo/Giza face shady brokers (سماسرة), landlords withholding security deposits (التأمين), and flatmates who default on utility bills.',
    contextAr: 'الطلاب المغتربون يتعرضون لابتزاز السماسرة، واحتجاز ملاك العقارات لمبلغ التأمين، وتهرب بعض الشركاء من سداد فواتير الكهرباء والغاز في موعدها.',
    iconName: 'Key',
    goldenRuleEn: 'The Golden Law: Document every square centimeter with timestamped 4K video on day one before unpacking a single bag.',
    goldenRuleAr: 'القاعدة الذهبية: وثق كل ركن ومفصل وشباك في الشقة بفيديو مسجل ومؤرخ قبل تفريغ حقيبة واحدة في يوم الاستلام الأول.',
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
    titleEn: 'Calm Negotiation with Vendors & Tradesmen',
    titleAr: 'التفاوض الهادئ مع التجار والحرفيين',
    subtitleEn: 'The 3-quote rule, body language control, and the walk-away power',
    subtitleAr: 'قاعدة عروض الأسعار الثلاثية ولغة الجسد وقوة الانسحاب الهادئ',
    contextEn: 'In local Egyptian commercial hubs (Attaba, Mosky, Bab El-Louq, craftsmen workshops), quoted prices are anchored high assuming customers will either bargain or overpay due to embarrassment.',
    contextAr: 'في الأسواق المصرية التقليدية وورش الحرفيين، توضع الأسعار الأولية مرتفعة جداً بافتراض أن الزبون إما سيفاصل أو سيخجل ويدفع ضعف السعر الحقيقي.',
    iconName: 'Banknote',
    goldenRuleEn: 'The Golden Law: Never buy from the first vendor who quotes you. Always gather 3 independent quotes before committing a single pound.',
    goldenRuleAr: 'القاعدة الذهبية: لا تشترِ أبداً من المحل الأول الذي يسعرك. اجمع 3 عروض أسعار مستقلة دائماً قبل إنفاق جنيه واحد.',
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
        explanationAr: 'إذا علم التاجر أنك بحاجة ماسة للقطعة خلال ساعات، فقدت كل أوراق الضغط وأصبحت مضطراً لقبول شروطه.'
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
        titleAr: 'استطلاع السوق (قاعدة المحلات الثلاثة)',
        descriptionEn: 'Walk into 3 separate stores in the same commercial district. Ask for the exact technical model and price without showing buying intent. Take mental notes.',
        descriptionAr: 'ادخل 3 محلات مختلفة في نفس المنطقة. اسأل عن نفس الموديل والمواصفات بدقة وسجل السعر في ذهنك دون إظهار رغبة في الشراء الفوري.',
        actionableCheckEn: 'Obtained at least 3 verified market price quotes for identical specifications.',
        actionableCheckAr: 'جمعت 3 عروض أسعار لنفس السلعة والمواصفات بدقة.'
      },
      {
        id: 'neg_s2',
        titleEn: 'Cash Leverage Anchoring',
        titleAr: 'استخدام قوة الدفع الكاش الفوري للتخفيض',
        descriptionEn: 'Once the lowest reference price is known, propose a fair target 15-20% below, stressing immediate cash payment with no hassle.',
        descriptionAr: 'بعد معرفة أدنى سعر، اعرض سعراً أقل بـ 15-20% مع التأكيد على الدفع الفوري كاش وجاهزية إتمام الصفقة حالاً.',
        actionableCheckEn: 'Proposed an objective, fair counter-offer based on real market baseline.',
        actionableCheckAr: 'قدمت عرضاً عادلاً مبنياً على المقارنة السعرية الواقعية.'
      },
      {
        id: 'neg_s3',
        titleEn: 'The Physical Walk-Away Test',
        titleAr: 'اختبار الانسحاب التدريجي الهادئ',
        descriptionEn: 'If the vendor refuses your fair offer, politely smile, say "Thank you, I will take a look around", and walk slowly toward the exit. In 60% of cases, they will call you back.',
        descriptionAr: 'إذا رفض التاجر عرضك العادل، ابتسم بهدوء وقل: "شكراً لحضرتك، هلف لفة وأرجعلك"، وتحرك ببطء نحو الباب. في أغلب الحالات سيناديك لتسوية السعر.',
        actionableCheckEn: 'Practiced graceful detachment without emotional irritation or impulse concession.',
        actionableCheckAr: 'نفذت خطوة الانسحاب بهدوء تام دون أي توتر أو تنازل اندفاعي.'
      }
    ],
    dialogues: [
      {
        triggerEn: 'A vendor offers an inflated initial price',
        triggerAr: 'البائع يعرض سعراً أولياً مرتفعاً جداً',
        scriptEn: 'I have researched the market rate for this piece. My budget for this item is X EGP cash right now.',
        scriptAr: 'أنا سألت وعارف متوسط سعر القطعة في السوق، وميزانيتي ليها كاش دلوقتي X جنيه لو يناسب حضرتك.'
      },
      {
        triggerEn: 'The seller claims this is the final price and cannot be discounted',
        triggerAr: 'البائع يؤكد أن السعر نهائي وغير قابل للتفاوض',
        scriptEn: 'I understand and respect that. I will look around a bit more. Thank you for your time.',
        scriptAr: 'تمام يا فندم حقك، هعمل جولة سريعة وأشوف المناسب. شكراً جزيلاً لذوقك.'
      }
    ]
  },
  {
    id: 'playbook_emergency',
    category: 'emergency',
    titleEn: 'Emergency Protocol & Student Contingency Buffer',
    titleAr: 'بروتوكول الطوارئ واحتياطي الأزمات',
    subtitleEn: 'Off-grid cash reserves, first aid readiness, and identity security',
    subtitleAr: 'احتياطي الكاش المخفي، الإسعافات الأولية، وتأمين الوثائق الرسمية',
    contextEn: 'Living independently means when a phone battery dies, an ATM swallows a card, or sudden fever strikes at 3 AM, there is no one else to fix it. You must have pre-built failsafes.',
    contextAr: 'الحياة المستقلة تعني أنه في حال نفاد شحن هاتفك، أو تعطل محفظتك الإلكترونية، أو إصابتك بحمى مفاجئة في الثالثة فجراً، لا يوجد من يتصرف بالنيابة عنك. يجب أن تكون مستعداً مسبقاً.',
    iconName: 'Flame',
    goldenRuleEn: 'The Golden Law: Always keep an untouchable 300 EGP physical cash note hidden inside a private notebook or book, completely separate from your wallet.',
    goldenRuleAr: 'القاعدة الذهبية: احتفظ دائماً بمبلغ 300 جنيه كاش مخفية بين صفحات كتاب في غرفتك، منفصلة تماماً عن محفظتك وهاتفك للطوارئ القصوى.',
    principles: [
      {
        id: 'emg_p1',
        ruleEn: 'Digital money fails in real physical crises.',
        ruleAr: 'المحافظ الإلكترونية والبطاقات قد تتعطل في أحلك الأوقات.',
        explanationEn: 'Telecom network outages, bank server maintenance, and empty ATM cassettes happen constantly. Physical cash is king in an emergency.',
        explanationAr: 'انقطاع شبكات المحمول أو صيانة السيرفرات البنكية تقع بلا إنذار. الكاش الورقي هو وسيلتك الوحيدة المضمونة وقت الأزمة.'
      },
      {
        id: 'emg_p2',
        ruleEn: 'Health emergencies cannot wait for sunrise.',
        ruleAr: 'طوارئ المرض والآلام لا تنتظر شروق الشمس.',
        explanationEn: 'Waking up with acute dental infection or food poisoning without basic analgesics and rehydration packets leads to panic and dangerous delays.',
        explanationAr: 'الاستيقاظ على ألم حاد أو نزلة معوية دون مسكنات وأملاح معالجة الجفاف يسبب هلعاً ومضاعفات يمكن تجنبها بصيدلية منزلية بسيطة.'
      },
      {
        id: 'emg_p3',
        ruleEn: 'Loss of official documents destroys months of academic progress.',
        ruleAr: 'فقدان الأوراق الرسمية والهوية يكلفك شهوراً من المشقة والتعطيل.',
        explanationEn: 'Keep digital cloud scans of your National ID, University ID, Birth Certificate, and Military Status certificate at all times.',
        explanationAr: 'احتفظ بنسخ سكانر واضحة لبطاقة الرقم القومي والكارنيه الجامعي وشهادة الميلاد والورق العسكري على سحابة مشفرة وهاتفك.'
      }
    ],
    steps: [
      {
        id: 'emg_s1',
        titleEn: 'Physical Hidden Cash Anchor Setup',
        titleAr: 'تجهيز رصيد الكاش المخفي (300 ج للطوارئ)',
        descriptionEn: 'Take 300 EGP in physical currency (e.g. three 100 EGP banknotes). Place them between pages of a textbook or inside an envelope taped to a drawer underside. Never spend this on food, treats, or casual transit.',
        descriptionAr: 'خصص 300 جنيه ورقية وضعها داخل كتاب دراسي في غرفتك. هذا المبلغ مخصص حصراً لحالات: تاكسي طارئ لمستشفى، دواء عاجل منتصف الليل، أو فقدان المحفظة بالكامل.',
        warningEn: 'If you touch this money for casual spending, your emergency safety net is destroyed.',
        warningAr: 'إذا أنفقت هذا المبلغ في طلبات عادية أو وجبة سريعة، فقد دمرت خط دفاعك الأخير ضد المفاجآت.',
        actionableCheckEn: 'I have 300 EGP cash safely hidden and designated exclusively for extreme contingencies.',
        actionableCheckAr: 'قمت بعزل 300 جنيه كاش مخفية للطوارئ القصوى فقط.'
      },
      {
        id: 'emg_s2',
        titleEn: 'Room First-Aid & Essential Pharmacy Kit',
        titleAr: 'تجهيز صيدلية الغرفة الأساسية (إسعافات أولية)',
        descriptionEn: 'Stock a small pouch containing: Paracetamol 500mg (Panadol/Paramol), Antispasmodic/digestive (Antinal / Buscopan), Oral rehydration salts (Rehydran), adhesive bandages, and antiseptic solution (Betadine). Total cost under 100 EGP.',
        descriptionAr: 'جهز حقيبة صغيرة تضم: باراسيتامول للصداع والحمى، أنتينال للنزلة المعوية، ريهيدران للجفاف، بلاستر طبي، ومطهر بيتادين. التكلفة الإجمالية لا تتجاوز 100 جنيه وتنقذك ليلاً.',
        actionableCheckEn: 'Basic medical pouch assembled and placed in a known, reachable spot in the room.',
        actionableCheckAr: 'حقيبة الأدوية الأساسية جاهزة ومحفوظة في مكان ثابت ومعروف في الغرفة.'
      },
      {
        id: 'emg_s3',
        titleEn: 'Digital Vault for Identity Documents',
        titleAr: 'تأمين نسخ الوثائق الثبوتية الرسمية سحابياً',
        descriptionEn: 'Scan both sides of National ID (بطاقة الرقم القومي), University ID, Passport (if applicable), and Health Insurance card. Store them in a password-protected note or offline vault.',
        descriptionAr: 'امسح ضوئياً وجهي بطاقة الرقم القومي، الكارنيه الجامعي، كارنيه التأمين الصحي، وشهادة الميلاد، واحفظها في مجلد آمن على هاتفك وسحابتك الخاصة.',
        actionableCheckEn: 'Identity documents scanned and accessible offline from your smartphone.',
        actionableCheckAr: 'الوثائق الرسمية ممسوحة ضوئياً ومتاحة بدون إنترنت على الهاتف.'
      }
    ],
    dialogues: [
      {
        triggerEn: 'Facing an urgent midnight pharmacy purchase when an ATM is out of cash',
        triggerAr: 'الحاجة لصيدلية ليلاً مع تعطل الصراف الآلي',
        scriptEn: 'I have the emergency 300 EGP physical reserve specifically allocated for this. I will use it calmly and replenish it on next allowance day.',
        scriptAr: 'الحمد لله، عندي رصيد الـ 300 جنيه كاش المخفي المخصص لمثل هذه اللحظات. سأستخدمه الآن بهدوء وأعوضه أول الشهر الجديد فوراً.'
      },
      {
        triggerEn: 'A sudden university or administrative request for lost documents',
        triggerAr: 'طلب إداري مفاجئ لإثبات هوية أو مستند مفقود في الجامعة',
        scriptEn: 'I have official digital high-resolution copies ready immediately on my encrypted drive.',
        scriptAr: 'عندي نسخ رقمية رسمية عالية الجودة جاهزة على السحابة ويمكن طباعتها خلال دقائق.'
      }
    ]
  }
];
