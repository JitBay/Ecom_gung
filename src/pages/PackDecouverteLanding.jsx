import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon.jsx';
import Stars from '../components/ui/Stars.jsx';
import CameraRolls from '../components/sections/CameraRolls.jsx';
import ProductSection from '../components/product/ProductSection.jsx';
import ProductVideoSection from '../components/product/ProductVideoSection.jsx';
import VideoTestimonials from '../components/sections/VideoTestimonials.jsx';
import QualitySection from '../components/sections/QualitySection.jsx';
import Faq from '../components/sections/Faq.jsx';
import CustomerReviews from '../components/sections/CustomerReviews.jsx';
import { brand } from '../data/site.js';
import { discoveryCategories } from '../data/product.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { price } from '../lib/format.js';
import './PackDecouverteLanding.css';

export default function PackDecouverteLanding() {
  const { lang, t, dict } = useLanguage();
  const trustItems = dict.home?.trust || [];

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? `Pack Découverte — 3 Coupes Ergonomiques en 1 Pack | ${brand.fullName}`
        : `Discovery Pack — 3 Ergonomic Fits in 1 Bundle | ${brand.fullName}`;
  }, [lang]);

  const cuts = [
    {
      num: 1,
      title: lang === 'fr' ? 'Vela Sculpt™ — Sans manches' : 'Vela Sculpt™ — Sleeveless',
      badge: lang === 'fr' ? 'Ultra discret' : 'Ultra Discreet',
      img: '/images/products/sans-manches/1.jpeg',
      tagline:
        lang === 'fr'
          ? 'Discrétion 100% totale sous chemises légères, t-shirts d’été et séances de sport.'
          : 'Total invisibility under lightweight shirts, summer tees and gym sessions.',
      features: [
        lang === 'fr' ? 'Liberté de mouvement totale des bras' : 'Unrestricted arm freedom',
        lang === 'fr' ? 'Emmanchures plates invisibles' : 'Invisible flat armhole seams',
        lang === 'fr' ? 'Gainage abdominal doux & respirant' : 'Gentle & breathable core support',
      ],
    },
    {
      num: 2,
      title: lang === 'fr' ? 'Vela Sculpt™ — Demi-manches' : 'Vela Sculpt™ — Short Sleeves',
      badge: lang === 'fr' ? 'Plus populaire' : 'Most Popular',
      img: '/images/products/demi-manches/4.jpg',
      tagline:
        lang === 'fr'
          ? 'Le basique indispensable sous vos chemises de travail, polos et tenues quotidiennes.'
          : 'The essential daily base layer under office dress shirts, polos and casual tees.',
      features: [
        lang === 'fr' ? 'Col rond ergonomique discret' : 'Discreet ergonomic crew neck',
        lang === 'fr' ? 'Maintien pectoral & gainage abdominal' : 'Chest & core compression balance',
        lang === 'fr' ? 'Idéal pour le bureau & toute la journée' : 'Engineered for desk comfort 24/7',
      ],
    },
    {
      num: 3,
      title: lang === 'fr' ? 'Vela Sculpt™ — Manches longues' : 'Vela Sculpt™ — Long Sleeves',
      badge: lang === 'fr' ? 'Maintien renforcé' : 'Reinforced Support',
      img: '/images/products/manches-longues/1.jpg',
      tagline:
        lang === 'fr'
          ? 'Compression intégrale haut du corps et maintien postural renforcé sous pulls et vestes.'
          : 'Full upper-body compression & reinforced posture support under sweaters and suits.',
      features: [
        lang === 'fr' ? 'Panneau dorsal ergonomique en X' : 'Ergonomic X-brace posture panel',
        lang === 'fr' ? 'Galbe continu des bras au torse' : 'Continuous arm-to-torso smoothing',
        lang === 'fr' ? 'Isolation thermique respirante' : 'Breathable thermal regulation',
      ],
    },
  ];

  return (
    <div className="pdl">
      {/* 1. HERO SECTION */}
      <section className="pdl-hero">
        <div className="container pdl-hero__grid">
          <div className="pdl-hero__content">
            <span className="pdl-hero__badge">
              <Icon name="sparkle" size={14} />{' '}
              {lang === 'fr' ? 'Offre Spéciale Découverte · 3 Coupes en 1' : 'Special Discovery Offer · 3 Fits in 1'}
            </span>

            <div className="pdl-hero__rating">
              <Stars value={5} size={16} />
              <strong>4.9 / 5</strong>
              <span>({lang === 'fr' ? '1 540 avis vérifiés' : '1,540 verified reviews'})</span>
            </div>

            <h1 className="pdl-hero__title">
              {lang === 'fr' ? (
                <>
                  Découvrez nos 3 coupes ergonomiques dans <u>un seul pack</u> exclusif.
                </>
              ) : (
                <>
                  Experience our 3 ergonomic fits in <u>one single</u> exclusive pack.
                </>
              )}
            </h1>

            <p className="pdl-hero__tagline">
              {lang === 'fr'
                ? '1 Débardeur sans manches + 1 T-shirt demi-manches + 1 T-shirt manches longues. L’ensemble complet pour affiner votre torse, gainer votre ventre et redresser votre posture sous toutes vos tenues de l’année.'
                : '1 Sleeveless Tank Top + 1 Short-Sleeve Tee + 1 Long-Sleeve Tee. The ultimate collection to smooth your silhouette and improve your posture in every outfit.'}
            </p>

            <ul className="pdl-hero__perks">
              <li>
                <span className="pdl-hero__perk-icon">
                  <Icon name="check" size={14} strokeWidth={3} />
                </span>
                <span>
                  <strong>{lang === 'fr' ? '3 Coupes complémentaires :' : '3 Complementary cuts:'}</strong>{' '}
                  {lang === 'fr'
                    ? 'sans manches pour l’été, demi-manches pour le bureau, manches longues pour le maintien renforcé.'
                    : 'sleeveless for summer, short sleeves for work, long sleeves for reinforced posture support.'}
                </span>
              </li>
              <li>
                <span className="pdl-hero__perk-icon">
                  <Icon name="check" size={14} strokeWidth={3} />
                </span>
                <span>
                  <strong>{lang === 'fr' ? 'Gainage abdominal doux 3D :' : '3D Core smoothing:'}</strong>{' '}
                  {lang === 'fr'
                    ? 'aplatit le ventre et estompe les poignées d’amour instantanément, sans comprimer.'
                    : 'flattens midsection and love handles instantly without suffocating pressure.'}
                </span>
              </li>
              <li>
                <span className="pdl-hero__perk-icon">
                  <Icon name="check" size={14} strokeWidth={3} />
                </span>
                <span>
                  <strong>{lang === 'fr' ? 'Économisez 70 € (-47%) :' : 'Save €70 (-47%):'}</strong>{' '}
                  {lang === 'fr'
                    ? 'tarif préférentiel exclusif sur le pack + Livraison suivie offerte.'
                    : 'exclusive bundled rate + Free tracked shipping included.'}
                </span>
              </li>
            </ul>

            <div className="pdl-hero__cta-group">
              <a href="#product" className="btn btn--dark pdl-hero__cta">
                {lang === 'fr' ? 'Configurer mon Pack Découverte (79,85 €)' : 'Customize My Discovery Pack (€79.85)'}{' '}
                <Icon name="arrow" size={16} />
              </a>
            </div>

            <div className="pdl-hero__guarantee-note">
              <Icon name="shield" size={16} />
              <span>
                {lang === 'fr'
                  ? 'Garantie sérénité 30 jours · Échange de taille gratuit & simplifié'
                  : '30-Day Money-Back Guarantee · Free & easy size exchanges'}
              </span>
            </div>
          </div>

          <div className="pdl-hero__visual">
            <div className="pdl-hero__card">
              <span className="pdl-hero__card-save">
                {lang === 'fr' ? '-47% DE RÉDUCTION' : '-47% SAVINGS'}
              </span>
              <img
                src="/images/products/image-decouverte.png"
                alt="Pack Découverte 3 Coupes"
                className="pdl-hero__card-img"
              />
              <div className="pdl-hero__card-info">
                <div>
                  <div className="pdl-hero__card-name">
                    {lang === 'fr' ? 'Pack Découverte — 3 Coupes' : 'Discovery Pack — 3 Fits'}
                  </div>
                  <div className="pdl-hero__card-sub">
                    {lang === 'fr' ? '1 Débardeur + 1 Demi-manches + 1 Manches longues' : '1 Tank + 1 Short + 1 Long Sleeves'}
                  </div>
                </div>
                <div className="pdl-hero__card-price">
                  <strong>79,85 €</strong>
                  <s>149,85 €</s>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 3 CUTS BREAKDOWN */}
      <section className="pdl-showcase container">
        <div className="pdl-showcase__head">
          <span className="eyebrow">
            {lang === 'fr' ? 'Composition du Pack' : 'Bundle Breakdown'}
          </span>
          <h2>
            {lang === 'fr'
              ? '3 coupes adaptées à chaque tenue et chaque moment'
              : '3 fits engineered for every outfit and season'}
          </h2>
          <p>
            {lang === 'fr'
              ? 'Ne choisissez plus entre discrétion, polyvalence et maintien postural. Le Pack Découverte réunit nos 3 coupes incontournables avec le choix de votre taille et de votre couleur pour chaque article.'
              : 'Never choose between discretion, versatility and posture support. The Discovery Pack brings together all 3 essential cuts with custom color and size selection for each garment.'}
          </p>
        </div>

        <div className="pdl-cuts-grid">
          {cuts.map((c) => (
            <div className="pdl-cut-card" key={c.num}>
              <div className="pdl-cut-card__media">
                <img src={c.img} alt={c.title} loading="lazy" />
                <span className="pdl-cut-card__badge">{c.badge}</span>
                <span className="pdl-cut-card__step">{c.num}</span>
              </div>
              <div className="pdl-cut-card__body">
                <h3 className="pdl-cut-card__title">{c.title}</h3>
                <p className="pdl-cut-card__tagline">{c.tagline}</p>
                <ul className="pdl-cut-card__features">
                  {c.features.map((f) => (
                    <li key={f}>
                      <Icon name="check" size={14} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="pdl-value-strip">
          <div className="container pdl-value-strip__inner">
            <div className="pdl-value-strip__content">
              <h3>
                {lang === 'fr'
                  ? 'Valeur totale si acheté séparément : 119,85 € (149,85 € prix régulier)'
                  : 'Total value if bought separately: €119.85 (€149.85 regular)'}
              </h3>
              <p>
                {lang === 'fr'
                  ? 'En commandant le Pack Découverte, vous bénéficiez du tarif privilégié de 79,85 € (économisez 70 €) avec la livraison suivie offerte.'
                  : 'By ordering the Discovery Pack, you get the special bundled price of €79.85 (save €70) plus free tracked shipping.'}
              </p>
            </div>
            <div className="pdl-value-strip__action">
              <div className="pdl-value-strip__price">
                <strong>79,85 €</strong>
                <s>149,85 €</s>
              </div>
              <a href="#product" className="btn btn--gold">
                {lang === 'fr' ? 'Personnaliser mon pack' : 'Customize My Pack'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF PHOTO TICKER */}
      <CameraRolls />

      {/* 4. MAIN PRODUCT SECTION & CONFIGURATOR */}
      <ProductSection isDiscoveryOffer={true} showModelSelector={true} />

      {/* 5. VIDEO DEMO */}
      <ProductVideoSection modelHandle="pack-decouverte" />

      {/* 6. QUALITY & TECHNOLOGY */}
      <QualitySection />

      {/* 7. VIDEO TESTIMONIALS */}
      <VideoTestimonials />

      {/* 8. FAQ */}
      <Faq />

      {/* 9. CUSTOMER REVIEWS */}
      <CustomerReviews />

      {/* 10. TRUST BADGES */}
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
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <div className="ionix-trust__t">{trustItems[2]?.title}</div>
            <p className="ionix-trust__d">{trustItems[2]?.desc}</p>
          </div>

          <div className="ionix-trust__item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
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

