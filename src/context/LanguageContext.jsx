import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../data/translations.js';

const LanguageContext = createContext(null);

// Country codes where French is the primary or official language
const FR_COUNTRIES = new Set([
  'FR', 'BE', 'CH', 'LU', 'MC',
  'DZ', 'MA', 'TN', 'SN', 'CI', 'MG', 'CM', 'BF', 'NE', 'ML', 'CD', 'CG', 'GA', 'TG', 'BJ', 'GN', 'HT'
]);

/**
 * Returns 'fr' if country is French-speaking, otherwise 'en' (USA, UK, and rest of world)
 */
export function getLanguageFromCountry(countryCode) {
  if (!countryCode) return 'fr';
  const c = String(countryCode).toUpperCase().trim();
  return FR_COUNTRIES.has(c) ? 'fr' : 'en';
}

/**
 * Synchronous immediate detection before network response (0ms):
 * 1. Checks localStorage if user already visited
 * 2. Checks browser TimeZone (America/ = USA -> EN; Europe/Paris = France -> FR)
 * 3. Checks navigator.language (en-US -> EN, fr-FR -> FR)
 */
function detectInitialLanguage() {
  try {
    const saved = localStorage.getItem('zvar_lang') || localStorage.getItem('velalabs_lang');
    if (saved === 'fr' || saved === 'en') return saved;

    // TimeZone instant detection (US timezones -> English)
    if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (
        tz.startsWith('America/') ||
        tz.startsWith('US/') ||
        tz.startsWith('Pacific/Honolulu')
      ) {
        return 'en';
      }
      if (
        tz.includes('Paris') ||
        tz.includes('Brussels') ||
        tz.includes('Monaco') ||
        tz.includes('Casablanca') ||
        tz.includes('Algiers') ||
        tz.includes('Tunis')
      ) {
        return 'fr';
      }
    }

    // Browser language
    if (typeof navigator !== 'undefined') {
      const browserLang = (navigator.language || navigator.languages?.[0] || '').toLowerCase();
      if (browserLang.startsWith('en')) return 'en';
      if (browserLang.startsWith('fr')) return 'fr';
    }
  } catch {
    // fallback
  }
  return 'fr';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLanguage);

  // Background IP-based Geolocation Detection (refines country with zero impact on page load speed)
  useEffect(() => {
    try {
      // If user has explicitly clicked the language switcher, respect their manual preference
      const manual = localStorage.getItem('zvar_lang_manual');
      if (manual === 'true') return;

      const cachedCountry = sessionStorage.getItem('zvar_geo_country');
      if (cachedCountry) {
        const targetLang = getLanguageFromCountry(cachedCountry);
        if (targetLang !== lang) {
          setLangState(targetLang);
          document.documentElement.lang = targetLang;
        }
        return;
      }

      // Fast, lightweight, free GeoIP API (CORS enabled, <100ms response)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      fetch('https://api.country.is', { signal: controller.signal })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          clearTimeout(timeoutId);
          if (data && data.country) {
            const country = String(data.country).toUpperCase();
            sessionStorage.setItem('zvar_geo_country', country);
            const targetLang = getLanguageFromCountry(country);
            if (targetLang !== lang) {
              setLangState(targetLang);
              document.documentElement.lang = targetLang;
              localStorage.setItem('zvar_lang', targetLang);
            }
          }
        })
        .catch(() => {
          // Ignore network errors or offline mode gracefully
        });

      return () => clearTimeout(timeoutId);
    } catch {
      // Ignore
    }
  }, [lang]);

  const setLang = (newLang, isManual = true) => {
    if (newLang !== 'fr' && newLang !== 'en') return;
    setLangState(newLang);
    try {
      localStorage.setItem('zvar_lang', newLang);
      if (isManual) {
        localStorage.setItem('zvar_lang_manual', 'true');
      }
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === 'fr' ? 'en' : 'fr', true);
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
