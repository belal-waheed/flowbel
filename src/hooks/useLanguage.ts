import { useContext } from 'react';
import { LanguageContext, type LanguageContextType } from './LanguageContext';

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export type { Language, Direction, Translations } from './LanguageContext';
