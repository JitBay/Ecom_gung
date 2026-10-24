import { useEffect, useState } from 'react';
import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import { getLocalizedProduct, products } from '../../data/catalog.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './Hero.css';

const perksFr = [
  'Silhouette lissée sous t-shirt et chemise',
  'Maintien postural actif pour le dos et les épaules',
  'Maille 3D respirante, invisible & seconde peau',
];

const perksEn = [
  'Streamlined silhouette under shirts and t-shirts',
  'Active posture support for back and shoulders',
  'Breathable 3D mesh, discreet & second-skin fit',
];

export default function Hero({ initialHandle, onSelectModel, showModelSelector = true }) {
  const { lang } = useLanguage();
  const heroProducts = products.slice(0, 3);
  const foundIdx = initialHandle ? heroProducts.findIndex((p) => p.handle === initialHandle) : -1;
  const [selectedIdx, setSelectedIdx] = useState(foundIdx !== -1 ? foundIdx : 0);

  useEffect(() => {
    if (initialHandle) {
      const idx = heroProducts.findIndex((p) => p.handle === initialHandle);
      if (idx !== -1) setSelectedIdx(idx);
    }
  }, [initialHandle]);

  const handleSelect = (idx) => {
    setSelectedIdx(idx);
    if (onSelectModel) {
      onSelectModel(heroProducts[idx].handle);
    }
  };

  const currentProduct = heroProducts[selectedIdx] || heroProducts[0];
  const perks = lang === 'fr' ? perksFr : perksEn;

  return (
    <section className="hero">
      <div className="hero__text">
        <div className="hero__rating">
          <Stars value={5} size={17} />
          <span>
            <strong>4.9</strong>/5 <i>|</i> <strong>45 000+</strong> {lang === 'fr' ? 'hommes conquis' : 'happy men'}
          </span>
        </div>

        <h1 className="hero__title">
          {lang === 'fr' ? (
            <>
              <span>Une silhouette plus nette.</span>
              <span>Un maintien postural naturel.</span>
              <span>
                Dès que vous <u>l’enfilez</u>.
              </span>
            </>
          ) : (
            <>
              <span>A cleaner silhouette.</span>
              <span>Natural posture support.</span>
              <span>
                The minute you <u>pull it on</u>.
              </span>
            </>
          )}
        </h1>

        <p className="hero__lead">
          {lang === 'fr' ? (
            <>
              Le t-shirt de compression ergonomique pour homme conçu pour <strong>lisser visuellement la silhouette sous vos vêtements</strong> et soutenir vos lombaires tout au long de la journée. Discret, respirant et sans coutures gênantes.
            </>
          ) : (
            <>
              Men’s ergonomic compression wear engineered to <strong>visually streamline your physique under everyday clothes</strong> while providing all-day postural support. Discreet, breathable, zero bulk.
            </>
          )}
        </p>

        {showModelSelector && (
          <div className="hero__model-pills" aria-label={lang === 'fr' ? 'Choisir une coupe' : 'Choose fit'}>
            {heroProducts.map((p, idx) => (
              <button
                key={p.handle}
                className={`hero__pill ${idx === selectedIdx ? 'is-active' : ''}`}
                onClick={() => handleSelect(idx)}
              >
                {getLocalizedProduct(p, lang).shortTitle}
              </button>
            ))}
          </div>
        )}

        <div className="hero__cta-group">
          <a href="#product" className="btn btn--dark hero__cta">
            {lang === 'fr' ? 'Commander avec la Garantie 30 Jours' : 'Order with 30-Day Guarantee'}{' '}
            <Icon name="arrow" size={18} />
          </a>
        </div>

        <div className="hero__proof">
          <span>
            <Icon name="shield" size={17} /> {lang === 'fr' ? 'Garantie Satisfait ou Remboursé de 30 jours' : '30-Day Money-Back Guarantee'}
          </span>
          <span>
            <i className="live-dot" /> {lang === 'fr' ? 'Expédié sous 24/48h avec suivi' : 'Ships in 24/48h with tracking'}
          </span>
        </div>

        <ul className="hero__perks">
          {perks.map((p) => (
            <li key={p}>
              <span className="tick">
                <Icon name="check" size={12} strokeWidth={2.6} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__media">
        <div className="hero__image-card">
          <img
            src={currentProduct.images[0]}
            alt={currentProduct.title}
            className="hero__main-photo"
          />
          <div className="hero__badge-model">
            <strong>{getLocalizedProduct(currentProduct, lang).title}</strong>
            <span>{getLocalizedProduct(currentProduct, lang).tagline}</span>
          </div>
        </div>

        <div className="hero__badge">
          <b>30</b>
          <div>
            <strong>{lang === 'fr' ? 'Jours pour essayer' : 'Days to test'}</strong>
            <span>{lang === 'fr' ? 'Garantie Satisfait ou Remboursé' : 'Money-Back Guarantee'}</span>
          </div>
          <p>
            <span className="tick">
              <Icon name="check" size={12} strokeWidth={2.6} />
            </span>
            {lang === 'fr' ? 'Adopté par plus de 45 000 hommes au quotidien' : 'Worn daily by 45,000+ men'}
          </p>
        </div>
      </div>
    </section>
  );
}
