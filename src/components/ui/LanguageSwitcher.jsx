import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import Icon from './Icon.jsx';
import './LanguageSwitcher.css';

export default function LanguageSwitcher({ variant = 'pill', className = '' }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'dropdown') {
    return (
      <div className={`lang-dropdown ${className}`} ref={ref}>
        <button
          type="button"
          className="lang-dropdown__btn"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Changer la langue / Switch language"
        >
          <span className="lang-dropdown__flag">{lang === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
          <span className="lang-dropdown__code">{lang.toUpperCase()}</span>
          <Icon name="chevron" size={12} className={`lang-dropdown__chev ${open ? 'is-open' : ''}`} />
        </button>

        {open && (
          <div className="lang-dropdown__menu">
            <button
              type="button"
              className={`lang-dropdown__item ${lang === 'fr' ? 'is-active' : ''}`}
              onClick={() => {
                setLang('fr');
                setOpen(false);
              }}
            >
              <span className="lang-dropdown__flag">🇫🇷</span>
              <span>Français</span>
              {lang === 'fr' && <Icon name="check" size={14} className="lang-dropdown__check" />}
            </button>
            <button
              type="button"
              className={`lang-dropdown__item ${lang === 'en' ? 'is-active' : ''}`}
              onClick={() => {
                setLang('en');
                setOpen(false);
              }}
            >
              <span className="lang-dropdown__flag">🇬🇧</span>
              <span>English</span>
              {lang === 'en' && <Icon name="check" size={14} className="lang-dropdown__check" />}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`lang-pill ${className}`} role="group" aria-label="Langue / Language">
      <button
        type="button"
        className={`lang-pill__btn ${lang === 'fr' ? 'is-active' : ''}`}
        onClick={() => setLang('fr')}
        aria-pressed={lang === 'fr'}
        title="Site en français"
      >
        <span className="lang-pill__flag">🇫🇷</span> FR
      </button>
      <span className="lang-pill__sep" aria-hidden="true">|</span>
      <button
        type="button"
        className={`lang-pill__btn ${lang === 'en' ? 'is-active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        title="Site in English"
      >
        <span className="lang-pill__flag">🇬🇧</span> EN
      </button>
    </div>
  );
}
