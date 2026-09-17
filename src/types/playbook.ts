export type PlaybookCategory =
  | 'lending'
  | 'tech'
  | 'housing'
  | 'negotiation'
  | 'emergency';

export interface PlaybookStep {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  warningEn?: string;
  warningAr?: string;
  actionableCheckEn: string;
  actionableCheckAr: string;
}

export interface LifePrinciple {
  id: string;
  ruleEn: string;
  ruleAr: string;
  explanationEn: string;
  explanationAr: string;
}

export interface DialoguePhrase {
  triggerEn: string;
  triggerAr: string;
  scriptEn: string;
  scriptAr: string;
}

export interface PlaybookScenario {
  id: string;
  category: PlaybookCategory;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  contextEn: string;
  contextAr: string;
  iconName: string;
  goldenRuleEn: string;
  goldenRuleAr: string;
  principles: LifePrinciple[];
  steps: PlaybookStep[];
  dialogues: DialoguePhrase[];
}
