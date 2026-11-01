import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Stars from '../components/ui/Stars.jsx';
import HowItWorksModal from '../components/ui/HowItWorksModal.jsx';
import { brand } from '../data/site.js';
import { price } from '../lib/format.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import './HomePage.css';

// Best sellers cards: curated selection of 4 core model & colorway editions
const bestSellersBase = [
  {
    id: 'sans-manches-noir',
    handle: 'vela-sculpt-sans-manches',
    defaultColor: 'Noir',
    titleFr: 'Vela Sculpt™ sans manches — Noir',
    titleEn: 'Vela Sculpt™ Sleeveless — Black',
    taglineFr: 'Invisibilité absolue sous chemises et t-shirts légers',
    taglineEn: 'Discreet and breathable core support under shirts & tees',
    badgeFr: '#1 Meilleure Vente',
    badgeEn: '#1 Best Seller',
    rating: 4.9,
    reviewsCount: '67',
    price: 34.95,
    compareAt: 49.95,
    urlBase: '/products/vela-sculpt-sans-manches',
    colorData: {
      Noir: {
        hex: '#1a1a1a',
        img: '/images/products/sans-manches/1.jpeg',
        hoverImg: '/images/products/sans-manches/2.jpeg',
      },
      Blanc: {
        hex: '#f4f4f6',
        img: '/images/products/sans-manches/4.jpeg',
        hoverImg: '/images/products/sans-manches/5.jpeg',
      },
      'Black Or': {
        hex: '#241f17',
        img: '/images/products/sans-manches/7.jpeg',
        hoverImg: '/images/products/sans-manches/8.jpeg',
      },
      Gris: {
        hex: '#72757d',
        img: '/images/products/sans-manches/10.jpeg',
        hoverImg: '/images/products/sans-manches/11.jpeg',
      },
    },
  },
  {
    id: 'demi-manches-blanc',
    handle: 'vela-sculpt-demi-manches',
    defaultColor: 'Blanc',
    titleFr: 'Vela Sculpt™ demi-manches — Blanc',
    titleEn: 'Vela Sculpt™ Short Sleeves — White',
    taglineFr: '100% invisible sous chemises blanches habillées',
    taglineEn: '100% invisible under crisp white dress shirts & polos',
    badgeFr: 'Spécial chemise blanche',
    badgeEn: 'White Shirt Essential',
    rating: 4.9,
    reviewsCount: '1 280',
    price: 39.95,
    compareAt: 59.95,
    urlBase: '/products/vela-sculpt-demi-manches',
    colorData: {
      Blanc: {
        hex: '#f4f4f6',
        img: '/images/products/demi-manches/1.jpg',
        hoverImg: '/images/products/demi-manches/2.jpg',
      },
      Noir: {
        hex: '#1a1a1a',
        img: '/images/products/demi-manches/4.jpg',
        hoverImg: '/images/products/demi-manches/5.jpg',
      },
      Gris: {
        hex: '#72757d',
        img: '/images/products/demi-manches/7.jpg',
        hoverImg: '/images/products/demi-manches/8.jpg',
      },
    },
  },
  {
    id: 'manches-longues-gris-chine',
    handle: 'vela-sculpt-manches-longues',
    defaultColor: 'Gris chiné',
    titleFr: 'Vela Sculpt™ manches longues — Gris chiné',
    titleEn: 'Vela Sculpt™ Long Sleeves — Heather Grey',
    taglineFr: 'Gainage complet torse, dos et bras sous vestes et pulls',
    taglineEn: 'Full upper-body sculpting & reinforced back support',
    badgeFr: 'Maintien intégral',
    badgeEn: 'Full Body Support',
    rating: 4.9,
    reviewsCount: '750',
    price: 44.95,
    compareAt: 64.95,
    urlBase: '/products/vela-sculpt-manches-longues',
    colorData: {
      'Gris chiné': {
        hex: '#5a5d66',
        img: '/images/products/manches-longues/4.jpg',
        hoverImg: '/images/products/manches-longues/5.jpg',
      },
      Noir: {
        hex: '#1a1a1a',
        img: '/images/products/manches-longues/1.jpg',
        hoverImg: '/images/products/manches-longues/2.jpg',
      },
      Blanc: {
        hex: '#f4f4f6',
        img: '/images/products/manches-longues/7.jpg',
        hoverImg: '/images/products/manches-longues/8.jpg',
      },
    },
  },
  {
    id: 'pack-decouverte',
    handle: 'pack-decouverte',
    defaultColor: 'Noir',
    titleFr: 'Pack Découverte — 3 Coupes',
    titleEn: 'Discovery Pack — 3 Fits',
    taglineFr: '1 Débardeur + 1 Demi-manches + 1 Manches longues inclus',
    taglineEn: '1 Tank Top + 1 Short Sleeves + 1 Long Sleeves included',
    badgeFr: 'Offre Découverte',
    badgeEn: 'Discovery Offer',
    rating: 4.9,
    reviewsCount: '1 540',
    price: 79.85,
    compareAt: 149.85,
    urlBase: '/pages/offres#product',
    colorData: {
      Noir: {
        hex: '#1a1a1a',
        img: '/images/products/image-decouverte.png',
        hoverImg: '/images/products/decouverte-back.png',
      },
      Blanc: {
        hex: '#f4f4f6',
        img: '/images/products/image-decouverte.png',
        hoverImg: '/images/products/decouverte-back.png',
      },
      Gris: {
        hex: '#72757d',
        img: '/images/products/image-decouverte.png',
        hoverImg: '/images/products/decouverte-back.png',
      },
    },
  },
];

function BestSellerCard({ p, lang, t }) {
  const [selectedColor, setSelectedColor] = useState(p.defaultColor);
  const [hoverColor, setHoverColor] = useState(null);

  const activeColorKey = hoverColor || selectedColor;
  const colorInfo = p.colorData[activeColorKey] || p.colorData[p.defaultColor] || Object.values(p.colorData)[0];

  const title = lang === 'fr' ? p.titleFr : p.titleEn;
  const badge = lang === 'fr' ? p.badgeFr : p.badgeEn;
  const tagline = lang === 'fr' ? p.taglineFr : p.taglineEn;
  const activeColorName = t('color_names.' + activeColorKey, activeColorKey);

  const discount = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
  const targetUrl = p.urlBase.includes('#') ? p.urlBase : `${p.urlBase}?color=${encodeURIComponent(activeColorKey)}`;

  return (
    <article className="ixh-card">
      <Link to={targetUrl} className="ixh-card__media" aria-label={title}>
        <img
          src={colorInfo.img}
          alt={title}
          className="ixh-card__img ixh-card__img--main"
          loading="lazy"
        />
        {colorInfo.hoverImg && (
          <img
            src={colorInfo.hoverImg}
            alt={`${title} - alternative`}
            className="ixh-card__img ixh-card__img--alt"
            loading="lazy"
            aria-hidden="true"
          />
        )}
        {badge && <span className="ixh-card__badge">{badge}</span>}
        {discount > 0 && <span className="ixh-card__save-badge">-{discount}%</span>}
      </Link>

      <div className="ixh-card__info">
        <div className="ixh-card__rating">
          <Stars value={p.rating} size={12} />
          <strong>{p.rating}</strong>
          <span className="ixh-card__reviews">({p.reviewsCount})</span>
        </div>

        <Link to={targetUrl} className="ixh-card__name">
          {title}
        </Link>

        {tagline && <p className="ixh-card__tagline">{tagline}</p>}

        <div className="ixh-card__price-row">
          <span className="ixh-card__price">{price(p.price)}</span>
          {p.compareAt && <span className="ixh-card__compare">{price(p.compareAt)}</span>}
        </div>

        <div className="ixh-card__sw-wrap">
          <div className="ixh-card__sw" role="radiogroup" aria-label="Couleurs">
            {Object.entries(p.colorData).map(([cName, cData]) => {
              const isSelected = cName === activeColorKey;
              const translatedName = t('color_names.' + cName, cName);
              return (
                <button
                  type="button"
                  key={cName}
                  className={`ixh-card__dot ${isSelected ? 'is-active' : ''}`}
                  style={{ background: cData.hex }}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(cName);
                  }}
                  onMouseEnter={() => setHoverColor(cName)}
                  onMouseLeave={() => setHoverColor(null)}
                  title={translatedName}
                  aria-label={translatedName}
                />
              );
            })}
          </div>
          <span className="ixh-card__color-name">{activeColorName}</span>
        </div>
      </div>
    </article>
  );
}

// Lifestyle real-world essentials
const lifestyleItems = [
  {
    id: 'travail',
    titleFr: 'Au Bureau & Sous Chemise',
    titleEn: 'Office & Under Dress Shirts',
    taglineFr: 'Discrétion 100% invisible sous vos vêtements de travail & maintien assis',
    taglineEn: '100% invisible under office shirts with ergonomic seated posture',
    img: '/images/home/lifestyle-travail.png',
    to: '/products/vela-sculpt-sans-manches?color=Blanc',
  },
  {
    id: 'sport',
    titleFr: 'À la salle de sport',
    titleEn: 'At the Gym & Training',
    taglineFr: 'Gainage abdominal dynamique, liberté de mouvement & maintien musculaire',
    taglineEn: 'Dynamic core support, unrestricted arm freedom & muscle alignment',
    img: '/images/home/lifestyle-sport.png',
    to: '/products/vela-sculpt-sans-manches?color=Noir',
  },
  {
    id: 'piscine',
    titleFr: 'Détente & loisirs',
    titleEn: 'Casual & Everyday Leisure',
    taglineFr: 'Silhouette athlétique lissée & confiance en soi en toute circonstance',
    taglineEn: 'Streamlined athletic silhouette & renewed daily self-confidence',
    img: '/images/home/lifestyle-piscine.png',
    to: '/products/vela-sculpt-sans-manches?color=Black+Or',
  },
];

export default function HomePage() {
  const { lang, t, dict } = useLanguage();
  const railRef = useRef(null);
  const thumbRef = useRef(null);
  const [thumbStyle, setThumbStyle] = useState({ width: '30%', transform: 'translateX(0%)' });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? `${brand.fullName} | Compression Wear & Maintien postural homme`
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
    setCanScrollPrev(rail.scrollLeft > 8);
    setCanScrollNext(max > 0 && rail.scrollLeft < max - 8);
  };

  useEffect(() => {
    updateScroll();
    window.addEventListener('resize', updateScroll);
    return () => window.removeEventListener('resize', updateScroll);
  }, []);

  const handleScrollStep = (direction) => {
    if (!railRef.current) return;
    const card = railRef.current.querySelector('.ixh-card');
    const step = card ? card.getBoundingClientRect().width + 16 : 280;
    railRef.current.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const stats = dict.home.stats || [];
  const trustItems = dict.home.trust || [];

  return (
    <div className="home-page-wrap">
      {/* 1. HERO SECTION */}
      <section className="ixh-hero">
        <picture className="ixh-hero__media">
          <source media="(max-width: 699px)" srcSet="/images/home/banner-every-body.jpg" />
          <img
            src="/images/home/banner-every-body.jpg"
            alt="Vela Labs — Every Age Every Body"
            className="ixh-hero__img"
            loading="eager"
          />
        </picture>
        <div className="ixh-hero__scrim" aria-hidden="true" />
        <div className="ixh-hero__inner">
          <div className="ixh-hero__content">
            <span className="ixh-hero__eyebrow">
              <span className="ixh-hero__stars">★★★★★</span> {t('home.eyebrow')}
            </span>
            <h1 className="ixh-hero__title">
              <span className="ixh-hero__title-line">
                <span className="ixh-hero__word--white">EVERY</span>{' '}
                <span className="ixh-hero__word--gold">AGE</span>
              </span>
              <span className="ixh-hero__title-line">
                <span className="ixh-hero__word--white">EVERY</span>{' '}
                <span className="ixh-hero__word--gold">BODY</span>
              </span>
            </h1>
            <p className="ixh-hero__text">{t('home.hero_text')}</p>
            <div className="ixh-hero__btns">
              <a
                href="#bestsellers"
                className="ixh-btn ixh-btn--gold"
                onClick={(e) => {
                  const el = document.getElementById('bestsellers');
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('home.cta_bestsellers')}
              </a>
              <Link to="/collections/all" className="ixh-btn ixh-btn--outline-gold">
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

      {/* 4. BEST SELLERS SHELF */}
      <section className="ixh-bs" id="bestsellers">
        <div className="ixh-bs__head">
          <h2 className="ixh-bs__title">{t('home.bestsellers_title')}</h2>
          <Link className="ixh-bs__all" to="/collections/all">
            {t('home.bestsellers_view_all')}
          </Link>
        </div>

        <div className="ixh-bs__rail" ref={railRef} onScroll={updateScroll}>
          {bestSellersBase.map((p) => (
            <BestSellerCard key={p.id} p={p} lang={lang} t={t} />
          ))}
        </div>

        <div className="ixh-bs__ctrl">
          <span className="ixh-bs__bar">
            <span className="ixh-bs__thumb" ref={thumbRef} style={thumbStyle} />
          </span>
          <button
            type="button"
            className="ixh-bs__arrow"
            onClick={() => handleScrollStep(-1)}
            disabled={!canScrollPrev}
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
            disabled={!canScrollNext}
            aria-label={lang === 'fr' ? 'Suivant' : 'Next'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* 5. 30-DAY TRIAL / VIDEO BANNER */}
      <section className="ixh-promise">
        <div className="ixh-promise__media">
          <video
            src="/videos/video-2.mp4"
            className="ixh-promise__video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            ref={(el) => {
              if (el) {
                el.muted = true;
                el.play().catch(() => {});
              }
            }}
            aria-label={t('home.promise_cta')}
          >
            <source src="/videos/video-2.mp4" type="video/mp4" />
          </video>
          <div className="ixh-promise__scrim" aria-hidden="true" />
        </div>
        <div className="ixh-promise__action">
          <button
            type="button"
            className="ixh-promise__btn"
            onClick={() => setShowHowItWorks(true)}
            aria-haspopup="dialog"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span>{t('home.promise_cta')}</span>
          </button>
        </div>
      </section>

      {/* 6. LIFESTYLE ESSENTIALS / AU QUOTIDIEN */}
      <section className="ixh-icons">
        <div className="ixh-icons__wrap">
          <div className="ixh-icons__head" style={{ marginBottom: 20 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8c7d5e' }}>
              ★ {lang === 'fr' ? 'Conçu pour votre quotidien' : 'Designed for your lifestyle'}
            </span>
            <h2 className="ixh-icons__title" style={{ marginTop: 6 }}>
              {lang === 'fr' ? 'Vela Sculpt™ en action : ' : 'Vela Sculpt™ in real life: '}
              <span className="ixh-icons__accent">{lang === 'fr' ? 'À chaque instant' : 'Every moment'}</span>
            </h2>
          </div>
          <div className="ixh-icons__grid">
            {lifestyleItems.map((item) => (
              <Link key={item.id} className="ixh-tile" to={item.to}>
                <img
                  src={item.img}
                  alt={lang === 'fr' ? item.titleFr : item.titleEn}
                  className="ixh-tile__img"
                  loading="lazy"
                />
                <span className="ixh-tile__shade" aria-hidden="true" />
                <span className="ixh-tile__text">
                  <span className="ixh-tile__line">{lang === 'fr' ? item.taglineFr : item.taglineEn}</span>
                  <span className="ixh-tile__name">{lang === 'fr' ? item.titleFr : item.titleEn}</span>
                  <span className="ixh-tile__btn">
                    {lang === 'fr' ? 'Découvrir' : 'Discover'}{' '}
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

      {/* 30-DAY TRIAL HOW-IT-WORKS MODAL */}
      <HowItWorksModal
        open={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </div>
  );
}
