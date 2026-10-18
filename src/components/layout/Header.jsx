import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { announcements, brand, nav } from '../../data/site.js';
import { useCart } from '../../context/CartContext.jsx';
import { useLockScroll } from '../../lib/hooks.js';
import './Header.css';

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${brand.name} ${brand.suffix} accueil`}>
      <strong>{brand.name}</strong>
      <span>{brand.suffix}</span>
    </Link>
  );
}

function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % announcements.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="announcement">
      <p key={index}>{announcements[index]}</p>
    </div>
  );
}

function MobileMenu({ open, onClose }) {
  useLockScroll(open);
  const [modelsOpen, setModelsOpen] = useState(false);

  return (
    <div className={`drawer-backdrop ${open ? 'is-open' : ''}`} onClick={onClose}>
      <nav className="mobile-menu" onClick={(e) => e.stopPropagation()} aria-label="Menu principal mobile">
        <div className="mobile-menu__top">
          <Logo />
          <button onClick={onClose} aria-label="Fermer le menu">
            <Icon name="close" size={24} />
          </button>
        </div>
        <ul>
          {nav.map((item) => {
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
                  <a href={item.to.slice(1)} onClick={onClose}>
                    {item.label}
                    <Icon name="arrow" size={18} />
                  </a>
                ) : (
                  <NavLink to={item.to} onClick={onClose}>
                    {item.label}
                    <Icon name="arrow" size={18} />
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mobile-menu__foot">
          <Link to="/pages/garantie" onClick={onClose}>
            <Icon name="shield" size={18} /> Garantie 30 Jours
          </Link>
          <span>France · EUR €</span>
        </div>
      </nav>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { count, setOpen } = useCart();

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
            <button className="icon-btn hide-desktop" onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu">
              <Icon name="menu" size={24} />
            </button>
            <Logo />
          </div>

          <nav className="header__nav" aria-label="Menu principal">
            {nav.map((item) => {
              if (item.children) {
                return (
                  <div
                    key={item.to}
                    className="nav-dropdown"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <NavLink to={item.to} className="nav-dropdown__link">
                      {item.label} <Icon name="chevron" size={12} />
                    </NavLink>
                    {dropdownOpen && (
                      <div className="nav-dropdown__menu">
                        <NavLink to="/collections/all" className="nav-dropdown__item nav-dropdown__item--all">
                          Tous les modèles (Vue d'ensemble)
                        </NavLink>
                        {item.children.map((sub) => (
                          <NavLink key={sub.to} to={sub.to} className="nav-dropdown__item">
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
                  <a key={item.to} href={item.to.slice(1)}>
                    {item.label}
                  </a>
                );
              }
              return (
                <NavLink key={item.to} to={item.to}>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="header__right">
            <Link to="/pages/garantie" className="badge-guarantee-head hide-mobile">
              <Icon name="shield" size={14} /> Garantie 30j
            </Link>
            <button className="icon-btn cart-btn" onClick={() => setOpen(true)} aria-label={`Panier, ${count} articles`}>
              <Icon name="bag" size={22} />
              {count > 0 && <span className="cart-btn__count">{count}</span>}
            </button>
          </div>
        </div>
      </header>
      <div className="trust-strip hide-tablet-up">
        <span>
          <Icon name="shield" size={14} strokeWidth={2.4} /> Garantie 30 Jours
        </span>
        <i />
        <span>
          <Icon name="check" size={14} strokeWidth={2.4} /> 45 000+ Hommes Conquis
        </span>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
