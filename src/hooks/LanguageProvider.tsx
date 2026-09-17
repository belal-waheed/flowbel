import React, { useState, useEffect } from 'react';
import {
  type Language,
  type Direction,
  translations,
  LanguageContext
} from './LanguageContext';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('flowbel_lang');
    return saved === 'ar' || saved === 'en' ? saved : 'en';
  });

  const dir: Direction = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('flowbel_lang', lang);
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dir,
        t: translations[lang],
        setLang,
        toggleLang
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
