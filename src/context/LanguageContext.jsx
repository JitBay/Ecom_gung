import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../data/translations.js';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('velalabs_lang');
      if (saved === 'fr' || saved === 'en') return saved;
      // If user's browser language is English, default to English, else French
      if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('en')) {
        return 'en';
      }
    } catch {
      // fallback to fr if localStorage not accessible
    }
    return 'fr';
  });

  const setLang = (newLang) => {
    if (newLang !== 'fr' && newLang !== 'en') return;
    setLangState(newLang);
    try {
      localStorage.setItem('velalabs_lang', newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  };

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  }, [lang]);

  const value = useMemo(() => {
    const dict = translations[lang] || translations.fr;

    // Helper to get nested keys like t('nav.home') or t('cart.free_shipping_left', { amount: '10€' })
    const t = (path, params = {}) => {
      const keys = path.split('.');
      let current = dict;
      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k];
        } else {
          // fallback to french if missing
          let fallback = translations.fr;
          for (const fbKey of keys) {
            if (fallback && typeof fallback === 'object' && fbKey in fallback) {
              fallback = fallback[fbKey];
            } else {
              fallback = path;
              break;
            }
          }
          current = fallback;
          break;
        }
      }

      if (typeof current === 'string' && Object.keys(params).length > 0) {
        return Object.entries(params).reduce(
          (str, [k, v]) => str.replaceAll(`{${k}}`, v),
          current
        );
      }

      return current;
    };

    return {
      lang,
      setLang,
      toggleLang,
      t,
      dict,
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};
