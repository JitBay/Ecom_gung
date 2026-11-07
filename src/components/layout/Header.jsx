import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import LanguageSwitcher from '../ui/LanguageSwitcher.jsx';
import { brand } from '../../data/site.js';
import { useCart } from '../../context/CartContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useLockScroll } from '../../lib/hooks.js';
import './Header.css';

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="zvar. accueil">
      <img
        src="/images/logo.png?v=2"
        alt="zvar."
        className="logo__img"
      />
    </Link>
  );
}

function AnnouncementBar() {
  const { dict } = useLanguage();
  const [index, setIndex] = useState(0);
  const items = dict.announcements || [];

  useEffect(() => {
    if (items.length === 0) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 4000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <div className="announcement">
      <p key={`${index}-${items[index]}`}>{items[index] || items[0]}</p>
    </div>
  );
}

function MobileMenu({ open, onClose }) {
  useLockScroll(open);
  const [modelsOpen, setModelsOpen] = useState(false);
  const { t, dict } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchorClick = (e, to) => {
    e.preventDefault();
    onClose();
    const targetId = to.replace('/#', '');
    if (location.pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.location.hash !== `#${targetId}`) {
          window.history.pushState(null, '', `#${targetId}`);
        }
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  const navItems = [
    { label: t('nav.home'), to: '/' },
    {
      label: t('nav.models'),
      to: '/collections/all',
      children: [
        { label: t('nav.sans_manches'), to: '/products/vela-sculpt-sans-manches' },
        { label: t('nav.demi_manches'), to: '/products/vela-sculpt-demi-manches' },
        { label: t('nav.manches_longues'), to: '/products/vela-sculpt-manches-longues' },
      ],
    },
    { label: t('nav.offers'), to: '/pages/offres' },
    { label: t('nav.why_us'), to: '/#why-vela-labs' },
    { label: t('nav.guarantee'), to: '/pages/garantie' },
  ];

  return (
    <div className={`drawer-backdrop ${open ? 'is-open' : ''}`} onClick={onClose}>
      <nav className="mobile-menu" onClick={(e) => e.stopPropagation()} aria-label="Menu principal mobile">
        <div className="mobile-menu__top">
          <Logo />
          <button onClick={onClose} aria-label={t('header.menu_close')}>
            <Icon name="close" size={24} />
          </button>
        </div>
        <ul>
          {navItems.map((item) => {
            if (item.children) {
              return (
                <li key={item.to} className="mobile-menu__has-children">
                  <div className="mobile-menu__parent-row">
                    <NavLink to={item.to} onClick={onClose}>
                      {item.label}
                    </NavLink>
                    <button
                      className="mobile-menu__toggle"
                      onClick={() => setModelsOpen(!modelsOpen)}
                      aria-label="Afficher les sous-catégories"
                    >
                      <Icon name="chevron" size={16} />
                    </button>
                  </div>
                  {modelsOpen && (
                    <ul className="mobile-menu__submenu">
                      {item.children.map((sub) => (
                        <li key={sub.to}>
                          <NavLink to={sub.to} onClick={onClose}>
                            {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }
            return (
              <li key={item.to}>
                {item.to.startsWith('/#') ? (
                  <Link
                    to={item.to}
                    onClick={(e) => handleAnchorClick(e, item.to)}
                  >
                    {item.label}
                    <Icon name="arrow" size={18} />
                  </Link>
                ) : (
                  <NavLink to={item.to} end={item.to === '/'} onClick={onClose}>
                    {item.label}
                    <Icon name="arrow" size={18} />
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mobile-menu__foot">
          <div className="mobile-menu__foot-row">
            <Link to="/pages/garantie" onClick={onClose}>
              <Icon name="shield" size={18} /> {t('nav.guarantee')}
            </Link>
            <span>{dict.currency_label}</span>
          </div>
          <div className="mobile-menu__foot-row" style={{ paddingTop: 6, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{t('header.switch_lang')} :</span>
            <LanguageSwitcher variant="pill" />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const { count, setOpen } = useCart();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const handleCloseDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDropdownOpen(false);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleAnchorClick = (e, to) => {
    e.preventDefault();
    handleCloseDropdown();
    const targetId = to.replace('/#', '');
    if (location.pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.location.hash !== `#${targetId}`) {
          window.history.pushState(null, '', `#${targetId}`);
        }
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  const isModelsActive =
    location.pathname.startsWith('/collections') || location.pathname.startsWith('/products');

  const navItems = [
    { label: t('nav.home'), to: '/' },
    {
      label: t('nav.models'),
      to: '/collections/all',
      children: [
        { label: t('nav.sans_manches'), to: '/products/vela-sculpt-sans-manches' },
        { label: t('nav.demi_manches'), to: '/products/vela-sculpt-demi-manches' },
        { label: t('nav.manches_longues'), to: '/products/vela-sculpt-manches-longues' },
      ],
    },
    { label: t('nav.offers'), to: '/pages/offres' },
    { label: t('nav.why_us'), to: '/#why-vela-labs' },
    { label: t('nav.guarantee'), to: '/pages/garantie' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`} id="top">
        <div className="header__inner container">
          <div className="header__left">
            <button className="icon-btn hide-desktop" onClick={() => setMenuOpen(true)} aria-label={t('header.menu_open')}>
              <Icon name="menu" size={24} />
            </button>
            <Logo />
          </div>

          <nav className="header__nav" aria-label="Menu principal" onMouseLeave={handleCloseDropdown}>
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div
                    key={item.to}
                    className={`nav-dropdown ${isModelsActive ? 'is-active' : ''}`}
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                  >
                    <NavLink to={item.to} className={`nav-dropdown__link ${isModelsActive ? 'active' : ''}`}>
                      {item.label} <Icon name="chevron" size={12} />
                    </NavLink>
                    {dropdownOpen && (
                      <div className="nav-dropdown__menu">
                        <NavLink
                          to="/collections/all"
                          className="nav-dropdown__item nav-dropdown__item--all"
                          onClick={handleCloseDropdown}
                        >
                          {t('nav.models_all')}
                        </NavLink>
                        {item.children.map((sub) => (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            className="nav-dropdown__item"
                            onClick={handleCloseDropdown}
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              if (item.to.startsWith('/#')) {
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onMouseEnter={handleCloseDropdown}
                    onClick={(e) => handleAnchorClick(e, item.to)}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onMouseEnter={handleCloseDropdown}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="header__right">
            <LanguageSwitcher variant="dropdown" className="hide-mobile" />
            <Link to="/pages/garantie" className="badge-guarantee-head hide-mobile">
              <Icon name="shield" size={14} /> {t('header.guarantee_pill')}
            </Link>
            <button className="icon-btn cart-btn" onClick={() => setOpen(true)} aria-label={`${t('header.cart_aria')}, ${count} articles`}>
              <Icon name="bag" size={22} />
              {count > 0 && <span className="cart-btn__count">{count}</span>}
            </button>
          </div>
        </div>
      </header>
      <div className="trust-strip hide-tablet-up">
        <span>
          <Icon name="shield" size={14} strokeWidth={2.4} /> {t('nav.guarantee')}
        </span>
        <i />
        <span>
          <Icon name="check" size={14} strokeWidth={2.4} /> {t('home.eyebrow')}
        </span>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
