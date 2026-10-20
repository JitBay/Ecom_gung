import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomerReviews from '../components/sections/CustomerReviews.jsx';
import { brand } from '../data/site.js';
import { price } from '../lib/format.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import './HomePage.css';

// Category circle strip images
const categoryImages = [
  '/images/home/cat-0.jpg',
  '/images/home/cat-1.jpg',
  '/images/home/cat-2.jpg',
  '/images/home/cat-3.jpg',
  '/images/home/cat-4.jpg',
  '/images/home/cat-5.jpg',
];

// Best sellers cards base config
const bestSellersBase = [
  {
    handle: 'vela-sculpt-demi-manches',
    titleFr: 'Vela Sculpt™ — Demi-Manches',
    titleEn: 'Vela Sculpt™ — Short Sleeves',
    badgeFr: '#1 Best seller',
    badgeEn: '#1 Best Seller',
    price: 39.95,
    compareAt: 59.95,
    image: '/images/products/demi-manches/1.jpg',
    colors: ['#000000', '#ffffff', '#808080'],
    moreCount: 3,
    url: '/products/vela-sculpt-demi-manches',
  },
  {
    handle: 'vela-sculpt-sans-manches',
    titleFr: 'Vela Sculpt™ — Sans Manches',
    titleEn: 'Vela Sculpt™ — Sleeveless',
    badgeFr: 'Ultra Discret',
    badgeEn: 'Ultra Discreet',
    price: 34.95,
    compareAt: 49.95,
    image: '/images/products/sans-manches/1.jpeg',
    colors: ['#000000', '#ffffff', '#808080', '#1f2e4d'],
    moreCount: 4,
    url: '/products/vela-sculpt-sans-manches',
  },
  {
    handle: 'vela-sculpt-manches-longues',
    titleFr: 'Vela Sculpt™ — Manches Longues',
    titleEn: 'Vela Sculpt™ — Long Sleeves',
    badgeFr: 'Maintien Intégral',
    badgeEn: 'Full Support',
    price: 44.95,
    compareAt: 64.95,
    image: '/images/products/manches-longues/1.jpg',
    colors: ['#000000', '#ffffff'],
    moreCount: 2,
    url: '/products/vela-sculpt-manches-longues',
  },
  {
    handle: 'pack-duo-confort',
    titleFr: 'Pack Duo Vela Sculpt™ (2 T-shirts)',
    titleEn: 'Vela Sculpt™ Duo Pack (2 Shirts)',
    badgeFr: 'Pack Découverte',
    badgeEn: 'Duo Bundle',
    price: 69.90,
    compareAt: 89.90,
    image: '/images/home/cat-bestsellers.jpg',
    colors: ['#000000', '#ffffff'],
    moreCount: 2,
    url: '/pages/offres',
  },
  {
    handle: 'pack-trio-serenite',
    titleFr: 'Pack Trio Vela Sculpt™ (3 Couleurs)',
    titleEn: 'Vela Sculpt™ Trio Pack (3 Colors)',
    badgeFr: 'Meilleure Offre',
    badgeEn: 'Best Value',
    price: 99.90,
    compareAt: 139.90,
    image: '/images/home/cat-0.jpg',
    colors: ['#000000', '#ffffff', '#808080'],
    moreCount: 3,
    url: '/pages/offres',
  },
];

const iconImages = [
  '/images/home/icon-leggings.jpg',
  '/images/home/icon-bra.jpg',
  '/images/home/icon-sleeves.jpg',
  '/images/home/icon-swim.jpg',
];

const iconUrls = [
  '/products/vela-sculpt-sans-manches',
  '/products/vela-sculpt-demi-manches',
  '/products/vela-sculpt-manches-longues',
  '/pages/offres',
];

export default function HomePage() {
  const { lang, t, dict } = useLanguage();
  const railRef = useRef(null);
  const thumbRef = useRef(null);
  const [thumbStyle, setThumbStyle] = useState({ width: '30%', transform: 'translateX(0%)' });

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? `${brand.fullName} | Compression Wear & Maintien Postural Homme`
        : `${brand.fullName} | Science-Backed Compression & Posture Wear`;
  }, [lang]);

  const updateScroll = () => {
    if (!railRef.current) return;
    const rail = railRef.current;
    const max = rail.scrollWidth - rail.clientWidth;
    const visible = rail.scrollWidth ? rail.clientWidth / rail.scrollWidth : 1;
    const w = Math.max(visible, 0.15);
    const scrollRatio = max > 0 ? (rail.scrollLeft / max) * ((1 - w) / w) * 100 : 0;

    setThumbStyle({
      width: `${w * 100}%`,
      transform: `translateX(${scrollRatio}%)`,
    });
  };

  useEffect(() => {
    updateScroll();
    window.addEventListener('resize', updateScroll);
    return () => window.removeEventListener('resize', updateScroll);
  }, []);

  const handleScrollStep = (direction) => {
    if (!railRef.current) return;
    const card = railRef.current.querySelector('.ixh-card');
    const step = card ? card.getBoundingClientRect().width + 14 : 260;
    railRef.current.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const categories = dict.home.categories || [];
  const stats = dict.home.stats || [];
  const icons = dict.home.icons || [];
  const trustItems = dict.home.trust || [];

  return (
    <div className="home-page-wrap">
      {/* 1. HERO SECTION */}
      <section className="ixh-hero">
        <picture className="ixh-hero__media">
          <source media="(max-width: 699px)" srcSet="/images/home/hero-mobile.jpg" />
          <img
            src="/images/home/hero-desktop.jpg"
            alt="Vela Labs - Compression Wear"
            className="ixh-hero__img"
            loading="eager"
          />
        </picture>
        <div className="ixh-hero__scrim" aria-hidden="true" />
        <div className="ixh-hero__inner">
          <div className="ixh-hero__content">
            <span className="ixh-hero__eyebrow">
              <span style={{ color: '#c4a265' }}>★★★★★</span> {t('home.eyebrow')}
            </span>
            <h1 className="ixh-hero__title">
              {t('home.hero_title_1')}<br />
              {t('home.hero_title_2')}
            </h1>
            <p className="ixh-hero__text">{t('home.hero_text')}</p>
            <div className="ixh-hero__btns">
              <Link to="/collections/all" className="ixh-btn ixh-btn--dark">
                {t('home.cta_bestsellers')}
              </Link>
              <Link to="/collections/all" className="ixh-btn ixh-btn--line">
                {t('home.cta_all')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="ixh-stats">
        <ul className="ixh-stats__list">
          {stats.map((s) => (
            <li key={s.label} className="ixh-stats__item">
              <span className="ixh-stats__value">{s.value}</span>
              <span className="ixh-stats__label">{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. CATEGORIES ROW */}
      <section className="ixh-cats" aria-label={t('home.cats_aria')}>
        <div className="ixh-cats__row">
          {categories.map((c, i) => (
            <Link key={c.label} className="ixh-cats__item" to={c.to}>
              <span className="ixh-cats__media">
                <img src={categoryImages[i] || categoryImages[0]} alt={c.label} className="ixh-cats__img" loading="lazy" />
              </span>
              <span className="ixh-cats__label">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. BEST SELLERS SHELF */}
      <section className="ixh-bs" id="bestsellers">
        <div className="ixh-bs__head">
          <h2 className="ixh-bs__title">{t('home.bestsellers_title')}</h2>
          <Link className="ixh-bs__all" to="/collections/all">
            {t('home.bestsellers_view_all')}
          </Link>
        </div>

        <div className="ixh-bs__rail" ref={railRef} onScroll={updateScroll}>
          {bestSellersBase.map((p) => {
            const title = lang === 'fr' ? p.titleFr : p.titleEn;
            const badge = lang === 'fr' ? p.badgeFr : p.badgeEn;
            return (
              <Link key={p.handle} className="ixh-card" to={p.url}>
                <span className="ixh-card__media">
                  <img src={p.image} alt={title} className="ixh-card__img" loading="lazy" />
                  {badge && <span className="ixh-card__badge">{badge}</span>}
                </span>
                <span className="ixh-card__name">{title}</span>
                <div className="ixh-card__price-row">
                  <span className="ixh-card__price">{price(p.price)}</span>
                  {p.compareAt && <span className="ixh-card__compare">{price(p.compareAt)}</span>}
                </div>
                <span className="ixh-card__sw" aria-hidden="true">
                  {p.colors.map((hex, i) => (
                    <span key={i} className="ixh-card__dot" style={{ background: hex }} />
                  ))}
                  {p.moreCount && <span className="ixh-card__more">+{p.moreCount}</span>}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="ixh-bs__ctrl">
          <span className="ixh-bs__bar">
            <span className="ixh-bs__thumb" ref={thumbRef} style={thumbStyle} />
          </span>
          <button
            type="button"
            className="ixh-bs__arrow"
            onClick={() => handleScrollStep(-1)}
            aria-label={lang === 'fr' ? 'Précédent' : 'Previous'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="ixh-bs__arrow"
            onClick={() => handleScrollStep(1)}
            aria-label={lang === 'fr' ? 'Suivant' : 'Next'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* 5. OUR PROMISE / 30-DAY GUARANTEE */}
      <section className="ixh-promise">
        <picture className="ixh-promise__media">
          <source media="(max-width: 699px)" srcSet="/images/home/promise-mobile.jpg" />
          <img
            src="/images/home/promise-desktop.jpg"
            alt={t('home.promise_title')}
            className="ixh-promise__img"
            loading="lazy"
          />
        </picture>
        <div className="ixh-promise__card">
          <div className="ixh-promise__eyebrow">
            <svg className="ixh-ring" width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
              <circle cx="17" cy="17" r="15" fill="none" stroke="#C4A265" strokeWidth="1.5" />
              <g className="ixh-ring__spark">
                <circle cx="17" cy="2" r="2.2" fill="#C4A265" />
              </g>
            </svg>
            <span>{t('home.promise_eyebrow')}</span>
          </div>
          <h2 className="ixh-promise__title">{t('home.promise_title')}</h2>
          <p className="ixh-promise__text">{t('home.promise_text')}</p>
          <Link to="/pages/garantie" className="ixh-btn ixh-btn--dark ixh-promise__btn">
            {t('home.promise_cta')}
          </Link>
        </div>
      </section>

      {/* 6. SHOP THE ICONS */}
      <section className="ixh-icons">
        <div className="ixh-icons__wrap">
          <h2 className="ixh-icons__title">
            {t('home.icons_title_prefix')}
            <span className="ixh-icons__accent">{t('home.icons_title_accent')}</span>
          </h2>
          <div className="ixh-icons__grid">
            {icons.map((tIcon, idx) => (
              <Link key={tIcon.title} className="ixh-tile" to={iconUrls[idx] || '/collections/all'}>
                <img src={iconImages[idx] || iconImages[0]} alt={tIcon.title} className="ixh-tile__img" loading="lazy" />
                <span className="ixh-tile__shade" aria-hidden="true" />
                <span className="ixh-tile__text">
                  <span className="ixh-tile__line">{tIcon.tagline}</span>
                  <span className="ixh-tile__name">{tIcon.title}</span>
                  <span className="ixh-tile__btn">
                    {t('home.icons_cta')}{' '}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <CustomerReviews />

      {/* 8. FAQ */}
      <section className="ixh-faq" id="faq">
        <div className="ixh-faq__wrap">
          <div className="ixh-faq__intro">
            <h2 className="ixh-faq__title">{t('home.faq_title')}</h2>
            <div className="ixh-faq__sub">
              <p>
                {t('home.faq_sub_prefix')}
                <Link to="/pages/contact">{t('home.faq_sub_link')}</Link>
                {t('home.faq_sub_suffix')}
              </p>
            </div>
          </div>
          <div className="ixh-faq__list">
            {[1, 2, 3, 4, 5].map((idx) => {
              const q = t(`home.faq.item${idx}_q`);
              const a = t(`home.faq.item${idx}_a`);
              return (
                <details key={idx} className="ixh-faq__item" defaultOpen={idx === 1}>
                  <summary className="ixh-faq__q">
                    {q}
                    <svg
                      className="ixh-faq__chev"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="ixh-faq__a">
                    <p>{a}</p>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. TRUST STRIP */}
      <section className="ionix-trust" aria-label={t('home.trust_title')}>
        <div className="ionix-trust__inner">
          <div className="ionix-trust__item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
              <path d="M8.5 12.5l2.5 2.5 5-5" />
            </svg>
            <div className="ionix-trust__t">{trustItems[0]?.title}</div>
            <p className="ionix-trust__d">{trustItems[0]?.desc}</p>
          </div>

          <div className="ionix-trust__item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 2.6-6.4" />
              <path d="M3 4v5h5" />
            </svg>
            <div className="ionix-trust__t">{trustItems[1]?.title}</div>
            <p className="ionix-trust__d">{trustItems[1]?.desc}</p>
          </div>

          <div className="ionix-trust__item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <div className="ionix-trust__t">{trustItems[2]?.title}</div>
            <p className="ionix-trust__d">{trustItems[2]?.desc}</p>
          </div>

          <div className="ionix-trust__item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <div className="ionix-trust__t">{trustItems[3]?.title}</div>
            <p className="ionix-trust__d">{trustItems[3]?.desc}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
