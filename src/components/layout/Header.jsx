import { useEffect, useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { announcements, brand, nav } from '../../data/site.js';
import { useCart } from '../../context/CartContext.jsx';
import { useLockScroll } from '../../lib/hooks.js';
import './Header.css';

export function Logo() {
  return (
    <a href="#top" className="logo" aria-label={`${brand.name} ${brand.suffix} home`}>
      <strong>{brand.name}</strong>
      <span>{brand.suffix}</span>
    </a>
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
  return (
    <div className={`drawer-backdrop ${open ? 'is-open' : ''}`} onClick={onClose}>
      <nav className="mobile-menu" onClick={(e) => e.stopPropagation()} aria-label="Mobile menu">
        <div className="mobile-menu__top">
          <Logo />
          <button onClick={onClose} aria-label="Close menu">
            <Icon name="close" size={24} />
          </button>
        </div>
        <ul>
          {nav.map((item) => (
            <li key={item}>
              <a href="#product" onClick={onClose}>
                {item}
                <Icon name="arrow" size={18} />
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__foot">
          <a href="#product">
            <Icon name="user" /> Account
          </a>
          <span>English · EUR €</span>
        </div>
      </nav>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
            <button className="icon-btn hide-desktop" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Icon name="menu" size={24} />
            </button>
            <button className="icon-btn hide-tablet-up" aria-label="Search">
              <Icon name="search" size={22} />
            </button>
            <Logo />
          </div>

          <nav className="header__nav" aria-label="Main">
            {nav.map((item) => (
              <a key={item} href="#product">
                {item}
              </a>
            ))}
          </nav>

          <div className="header__right">
            <button className="lang hide-mobile">
              English <Icon name="chevron" size={14} />
            </button>
            <button className="icon-btn hide-mobile" aria-label="Search">
              <Icon name="search" size={22} />
            </button>
            <button className="icon-btn hide-mobile" aria-label="Account">
              <Icon name="user" size={22} />
            </button>
            <button className="icon-btn cart-btn" onClick={() => setOpen(true)} aria-label={`Cart, ${count} items`}>
              <Icon name="bag" size={22} />
              {count > 0 && <span className="cart-btn__count">{count}</span>}
            </button>
          </div>
        </div>
      </header>
      <div className="trust-strip hide-tablet-up">
        <span>
          <Icon name="check" size={14} strokeWidth={2.4} /> 90-Day Guarantee
        </span>
        <i />
        <span>
          <Icon name="check" size={14} strokeWidth={2.4} /> 250,000+ Women
        </span>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
