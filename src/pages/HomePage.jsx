import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomerReviews from '../components/sections/CustomerReviews.jsx';
import { products } from '../data/catalog.js';
import { brand } from '../data/site.js';
import { price } from '../lib/format.js';
import './HomePage.css';

// Category circle strip
const categories = [
  { label: 'Best sellers', to: '/collections/all', img: '/images/home/cat-0.jpg' },
  { label: 'Sans Manches', to: '/products/vela-sculpt-sans-manches', img: '/images/home/cat-1.jpg' },
  { label: 'Demi-Manches', to: '/products/vela-sculpt-demi-manches', img: '/images/home/cat-2.jpg' },
  { label: 'Manches Longues', to: '/products/vela-sculpt-manches-longues', img: '/images/home/cat-3.jpg' },
  { label: 'Nos Packs & Offres', to: '/pages/offres', img: '/images/home/cat-4.jpg' },
  { label: 'Notre Technologie', to: '/pages/notre-technologie', img: '/images/home/cat-5.jpg' },
];

// Best sellers cards
const bestSellersList = [
  {
    handle: 'vela-sculpt-demi-manches',
    title: 'Vela Sculpt™ — Demi-Manches',
    badge: '#1 Best seller',
    price: 39.95,
    compareAt: 59.95,
    image: '/images/products/demi-manches/1.jpg',
    colors: ['#000000', '#ffffff', '#808080'],
    moreCount: 3,
    url: '/products/vela-sculpt-demi-manches',
  },
  {
    handle: 'vela-sculpt-sans-manches',
    title: 'Vela Sculpt™ — Sans Manches',
    badge: 'Ultra Discret',
    price: 34.95,
    compareAt: 49.95,
    image: '/images/products/sans-manches/1.jpeg',
    colors: ['#000000', '#ffffff', '#808080', '#1f2e4d'],
    moreCount: 4,
    url: '/products/vela-sculpt-sans-manches',
  },
  {
    handle: 'vela-sculpt-manches-longues',
    title: 'Vela Sculpt™ — Manches Longues',
    badge: 'Maintien Intégral',
    price: 44.95,
    compareAt: 64.95,
    image: '/images/products/manches-longues/1.jpg',
    colors: ['#000000', '#ffffff'],
    moreCount: 2,
    url: '/products/vela-sculpt-manches-longues',
  },
  {
    handle: 'pack-duo-confort',
    title: 'Pack Duo Vela Sculpt™ (2 T-shirts)',
    badge: 'Pack Découverte',
    price: 69.90,
    compareAt: 89.90,
    image: '/images/home/cat-bestsellers.jpg',
    colors: ['#000000', '#ffffff'],
    moreCount: 2,
    url: '/pages/offres',
  },
  {
    handle: 'pack-trio-serenite',
    title: 'Pack Trio Vela Sculpt™ (3 Couleurs)',
    badge: 'Meilleure Offre',
    price: 99.90,
    compareAt: 139.90,
    image: '/images/home/cat-0.jpg',
    colors: ['#000000', '#ffffff', '#808080'],
    moreCount: 3,
    url: '/pages/offres',
  },
];

// Essential tiles
const iconTiles = [
  {
    tagline: 'Discrétion absolue sous vos vêtements.',
    title: 'Vela Sculpt™ Sans Manches',
    img: '/images/home/icon-leggings.jpg',
    to: '/products/vela-sculpt-sans-manches',
  },
  {
    tagline: 'Maintien actif des épaules & dos droit.',
    title: 'Vela Sculpt™ Demi-Manches',
    img: '/images/home/icon-bra.jpg',
    to: '/products/vela-sculpt-demi-manches',
  },
  {
    tagline: 'Gainage intégral et soutien lombaire.',
    title: 'Vela Sculpt™ Manches Longues',
    img: '/images/home/icon-sleeves.jpg',
    to: '/products/vela-sculpt-manches-longues',
  },
  {
    tagline: 'La routine complète au meilleur tarif.',
    title: 'Nos Packs & Bundles Multi-Modèles',
    img: '/images/home/icon-swim.jpg',
    to: '/pages/offres',
  },
];

// FAQ items
const faqItems = [
  {
    q: 'Comment choisir ma taille ?',
    a: 'Consultez notre guide des tailles sur chaque fiche produit. Nous vous recommandons de prendre votre taille habituelle de t-shirt pour un effet gainant équilibré et confortable. Si vous hésitez entre deux tailles, nous vous conseillons de choisir la taille au-dessus.',
  },
  {
    q: 'Quels sont les délais et tarifs de livraison ?',
    a: 'Toutes les commandes sont préparées et expédiées sous 24 à 48 heures ouvrées avec numéro de suivi. La livraison est offerte à partir de 55 € d’achat ou dès 2 t-shirts.',
  },
  {
    q: 'Comment fonctionne la garantie Satisfait ou Remboursé 30 jours ?',
    a: 'Vous disposez de 30 jours à compter de la réception de votre commande pour essayer vos t-shirts. Si vous n’êtes pas totalement conquis par l’effet gainant ou le confort, contactez notre support client à contact@velalabs.co pour un échange rapide de taille ou un remboursement.',
  },
  {
    q: 'Le t-shirt est-il visible sous une chemise ou un polo ?',
    a: 'Non, les t-shirts Vela Sculpt™ sont conçus avec des bordures plates et un col ergonomique ultra-discret. Ils restent totalement invisibles même sous une chemise fine ou un t-shirt ajusté.',
  },
  {
    q: 'Quels sont les conseils d’entretien ?',
    a: 'Lavage en machine à 30°C sur cycle délicat, sans adoucissant agressif. Séchage à l’air libre conseillé pour préserver l’élasticité de la maille technique 3D.',
  },
];

export default function HomePage() {
  const railRef = useRef(null);
  const thumbRef = useRef(null);
  const [thumbStyle, setThumbStyle] = useState({ width: '30%', transform: 'translateX(0%)' });

  useEffect(() => {
    document.title = `${brand.fullName} | Compression Wear & Maintien Postural Homme`;
  }, []);

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
              <span style={{ color: '#c4a265' }}>★★★★★</span> Plébiscité par plus de 45 000 hommes
            </span>
            <h1 className="ixh-hero__title">
              Every age.<br />
              Every body.
            </h1>
            <p className="ixh-hero__text">
              Des vêtements de compression discrets pensés pour affiner la silhouette, soutenir la posture et apporter un confort inégalé au quotidien.
            </p>
            <div className="ixh-hero__btns">
              <Link to="/collections/all" className="ixh-btn ixh-btn--dark">
                Découvrir les best-sellers
              </Link>
              <Link to="/collections/all" className="ixh-btn ixh-btn--line">
                Voir toute la collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="ixh-stats">
        <ul className="ixh-stats__list">
          <li className="ixh-stats__item">
            <span className="ixh-stats__value">45 000+</span>
            <span className="ixh-stats__label">Clients satisfaits</span>
          </li>
          <li className="ixh-stats__item">
            <span className="ixh-stats__value">120 000+</span>
            <span className="ixh-stats__label">Pièces vendues</span>
          </li>
          <li className="ixh-stats__item">
            <span className="ixh-stats__value">30+</span>
            <span className="ixh-stats__label">Pays livrés</span>
          </li>
          <li className="ixh-stats__item">
            <span className="ixh-stats__value">30 jours</span>
            <span className="ixh-stats__label">Garantie Satisfait ou Remboursé</span>
          </li>
        </ul>
      </section>

      {/* 3. CATEGORIES ROW */}
      <section className="ixh-cats" aria-label="Acheter par catégorie">
        <div className="ixh-cats__row">
          {categories.map((c) => (
            <Link key={c.label} className="ixh-cats__item" to={c.to}>
              <span className="ixh-cats__media">
                <img src={c.img} alt={c.label} className="ixh-cats__img" loading="lazy" />
              </span>
              <span className="ixh-cats__label">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. BEST SELLERS SHELF */}
      <section className="ixh-bs" id="bestsellers">
        <div className="ixh-bs__head">
          <h2 className="ixh-bs__title">Best sellers</h2>
          <Link className="ixh-bs__all" to="/collections/all">
            Voir tout
          </Link>
        </div>

        <div className="ixh-bs__rail" ref={railRef} onScroll={updateScroll}>
          {bestSellersList.map((p) => (
            <Link key={p.handle} className="ixh-card" to={p.url}>
              <span className="ixh-card__media">
                <img src={p.image} alt={p.title} className="ixh-card__img" loading="lazy" />
                {p.badge && <span className="ixh-card__badge">{p.badge}</span>}
              </span>
              <span className="ixh-card__name">{p.title}</span>
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
            aria-label="Précédent"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="ixh-bs__arrow"
            onClick={() => handleScrollStep(1)}
            aria-label="Suivant"
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
            alt="Notre promesse"
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
            <span>Notre engagement</span>
          </div>
          <h2 className="ixh-promise__title">Portez-le pendant 30 jours.</h2>
          <p className="ixh-promise__text">
            Lavez-le, vivez avec, prenez votre temps. Pas convaincu par l’effet gainant ou le confort ? Contactez-nous sous 30 jours pour un remboursement intégral.
          </p>
          <Link to="/pages/garantie" className="ixh-btn ixh-btn--dark ixh-promise__btn">
            Comment ça fonctionne
          </Link>
        </div>
      </section>

      {/* 6. SHOP THE ICONS */}
      <section className="ixh-icons">
        <div className="ixh-icons__wrap">
          <h2 className="ixh-icons__title">
            Découvrez nos <span className="ixh-icons__accent">essentiels</span>
          </h2>
          <div className="ixh-icons__grid">
            {iconTiles.map((t) => (
              <Link key={t.title} className="ixh-tile" to={t.to}>
                <img src={t.img} alt={t.title} className="ixh-tile__img" loading="lazy" />
                <span className="ixh-tile__shade" aria-hidden="true" />
                <span className="ixh-tile__text">
                  <span className="ixh-tile__line">{t.tagline}</span>
                  <span className="ixh-tile__name">{t.title}</span>
                  <span className="ixh-tile__btn">
                    Découvrir{' '}
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
            <h2 className="ixh-faq__title">FAQ</h2>
            <div className="ixh-faq__sub">
              <p>
                Vous ne trouvez pas votre réponse ? <Link to="/pages/contact">Écrivez-nous</Link>, notre équipe vous répond en moins de 24h.
              </p>
            </div>
          </div>
          <div className="ixh-faq__list">
            {faqItems.map((item, idx) => (
              <details key={item.q} className="ixh-faq__item" defaultOpen={idx === 0}>
                <summary className="ixh-faq__q">
                  {item.q}
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
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. IONIX TRUST STRIP */}
      <section className="ionix-trust" aria-label="Pourquoi choisir Vela Labs">
        <div className="ionix-trust__inner">
          <div className="ionix-trust__item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
              <path d="M8.5 12.5l2.5 2.5 5-5" />
            </svg>
            <div className="ionix-trust__t">Garantie 30 Jours</div>
            <p className="ionix-trust__d">30 jours pour tester et décider. Remboursement intégral si non satisfait.</p>
          </div>

          <div className="ionix-trust__item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 2.6-6.4" />
              <path d="M3 4v5h5" />
            </svg>
            <div className="ionix-trust__t">Moins de 2% de retours</div>
            <p className="ionix-trust__d">Une coupe ergonomique et des matières haut de gamme plébiscitées.</p>
          </div>

          <div className="ionix-trust__item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <div className="ionix-trust__t">Support Client Humain</div>
            <p className="ionix-trust__d">Une vraie équipe dédiée répond à vos questions en français 7j/7.</p>
          </div>

          <div className="ionix-trust__item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <div className="ionix-trust__t">Expédition Suivie 24/48h</div>
            <p className="ionix-trust__d">Colis expédié avec numéro de suivi transmis immédiatement par e-mail.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
