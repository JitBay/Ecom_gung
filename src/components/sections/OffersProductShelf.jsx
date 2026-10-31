import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Stars from '../ui/Stars.jsx';
import { price } from '../../lib/format.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import '../../pages/HomePage.css';
import './OffersProductShelf.css';

const offersCardsData = [
  {
    id: 'sans-manches-noir',
    handle: 'vela-sculpt-sans-manches',
    defaultColor: 'Noir',
    titleFr: 'Vela Sculpt™ sans manches',
    titleEn: 'Vela Sculpt™ Sleeveless',
    taglineFr: 'Pack 3 débardeurs (2 achetés + 1 offert) · Soit 26,61 € / unité',
    taglineEn: 'Pack of 3 tank tops (Buy 2 Get 1 Free) · €26.61 each',
    badge: '2+1',
    rating: 4.9,
    reviewsCount: '67',
    price: 79.85,
    compareAt: 149.85,
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
    titleFr: 'Vela Sculpt™ demi-manches',
    titleEn: 'Vela Sculpt™ Short Sleeves',
    taglineFr: 'Pack 3 t-shirts (2 achetés + 1 offert) · Soit 29,95 € / unité',
    taglineEn: 'Pack of 3 t-shirts (Buy 2 Get 1 Free) · €29.95 each',
    badge: '2+1',
    rating: 4.9,
    reviewsCount: '1 280',
    price: 89.85,
    compareAt: 179.85,
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
    titleFr: 'Vela Sculpt™ manches longues',
    titleEn: 'Vela Sculpt™ Long Sleeves',
    taglineFr: 'Pack 3 t-shirts (2 achetés + 1 offert) · Soit 33,28 € / unité',
    taglineEn: 'Pack of 3 long sleeves (Buy 2 Get 1 Free) · €33.28 each',
    badge: '2+1',
    rating: 4.9,
    reviewsCount: '750',
    price: 99.85,
    compareAt: 194.85,
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
];

function OfferProductCard({ p, lang, t }) {
  const [selectedColor, setSelectedColor] = useState(p.defaultColor);
  const [hoverColor, setHoverColor] = useState(null);

  const activeColorKey = hoverColor || selectedColor;
  const colorInfo = p.colorData[activeColorKey] || p.colorData[p.defaultColor] || Object.values(p.colorData)[0];

  const title = lang === 'fr' ? p.titleFr : p.titleEn;
  const tagline = lang === 'fr' ? p.taglineFr : p.taglineEn;
  const activeColorName = t('color_names.' + activeColorKey, activeColorKey);

  const discount = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
  const targetUrl = `${p.urlBase}?color=${encodeURIComponent(activeColorKey)}`;

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
            alt={`${title} - vue alternative`}
            className="ixh-card__img ixh-card__img--alt"
            loading="lazy"
            aria-hidden="true"
          />
        )}
        {/* Petit bloc en haut avec "2+1" */}
        <span className="ixh-card__badge--two-plus-one">{p.badge}</span>
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
          <div className="ixh-card__sw" role="radiogroup" aria-label={lang === 'fr' ? 'Couleurs' : 'Colors'}>
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

export default function OffersProductShelf() {
  const { lang, t } = useLanguage();
  const railRef = useRef(null);
  const thumbRef = useRef(null);
  const [thumbStyle, setThumbStyle] = useState({ width: '30%', transform: 'translateX(0%)' });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

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

  return (
    <section className="offers-shelf ixh-bs" id="offres-cards">
      <div className="offers-shelf__head">
        <span className="offers-shelf__pill">
          ★ {lang === 'fr' ? 'Offre Spéciale 2+1 (Pack Semaine)' : 'Special 2+1 Offer (Week Pack)'}
        </span>
        <h2 className="offers-shelf__title">
          {lang === 'fr' ? (
            <>
              Nos modèles éligibles à l’offre <em>2+1 Offert.</em>
            </>
          ) : (
            <>
              Our styles eligible for the <em>2+1 Free offer.</em>
            </>
          )}
        </h2>
        <p className="offers-shelf__subtitle">
          {lang === 'fr'
            ? 'Commandez 2 t-shirts et recevez le 3ème offert. Choisissez votre modèle ci-dessous pour configurer vos tailles et couleurs.'
            : 'Buy 2 shirts and get the 3rd one free. Select your style below to customize your sizes and colors.'}
        </p>
      </div>

      <div className="ixh-bs__rail" ref={railRef} onScroll={updateScroll}>
        {offersCardsData.map((p) => (
          <OfferProductCard key={p.id} p={p} lang={lang} t={t} />
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
  );
}
