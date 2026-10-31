import { useEffect, useRef, useState } from 'react';
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
  const [isHeroPlaying, setIsHeroPlaying] = useState(true);
  const videoRef = useRef(null);

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

  const currentProduct = (initialHandle && products.find((p) => p.handle === initialHandle)) || heroProducts[selectedIdx] || heroProducts[0];
  const perks = lang === 'fr' ? perksFr : perksEn;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsHeroPlaying(true))
        .catch(() => {
          setIsHeroPlaying(false);
          const onFirstTouch = () => {
            video.play().then(() => setIsHeroPlaying(true)).catch(() => { });
            window.removeEventListener('click', onFirstTouch);
            window.removeEventListener('touchstart', onFirstTouch);
          };
          window.addEventListener('click', onFirstTouch, { once: true });
          window.addEventListener('touchstart', onFirstTouch, { once: true });
        });
    }
  }, [currentProduct.handle]);

  const toggleHeroPlay = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsHeroPlaying(true)).catch(() => { });
    } else {
      video.pause();
      setIsHeroPlaying(false);
    }
  };

  return (
    <section className="hero">
      <div className="hero__text">
        <div className="hero__rating">
          <Stars value={5} size={17} />
          <span>
            <strong>4.9</strong>/5 <i>|</i> <strong>3 000+</strong> {lang === 'fr' ? 'clients satisfaits' : 'happy customers'}
          </span>
        </div>

        <h1 className="hero__title">
          {lang === 'fr' ? (
            <>
              <span className="hero__title-line">Une silhouette plus nette. Un maintien postural naturel.</span>
              <span>
                Dès que vous <u>l’enfilez</u>.
              </span>
            </>
          ) : (
            <>
              <span className="hero__title-line">A cleaner silhouette. Natural posture support.</span>
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
            {lang === 'fr' ? 'Commander avec la garantie 30 jours' : 'Order with 30-Day Guarantee'}{' '}
            <Icon name="arrow" size={18} />
          </a>
        </div>

        <div className="hero__proof">
          <span>
            <Icon name="shield" size={17} /> {lang === 'fr' ? 'Garantie satisfait ou remboursé de 30 jours' : '30-Day Money-Back Guarantee'}
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
        <div className="hero__image-card" onClick={toggleHeroPlay}>
          {currentProduct.handle === 'vela-sculpt-sans-manches' ? (
            <>
              <video
                ref={videoRef}
                className="hero__main-video"
                src="/videos/sleevless.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onPlay={() => setIsHeroPlaying(true)}
                onPause={() => setIsHeroPlaying(false)}
                aria-label={getLocalizedProduct(currentProduct, lang).title}
              >
                <source src="/videos/sleevless.mp4" type="video/mp4" />
                <source src="/videos/product-sleeveless.mp4" type="video/mp4" />
                <source src="/videos/video-2.mp4" type="video/mp4" />
              </video>
              {!isHeroPlaying && (
                <button
                  type="button"
                  className="hero__play-overlay"
                  onClick={toggleHeroPlay}
                  aria-label={lang === 'fr' ? 'Lire la vidéo' : 'Play video'}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
              )}
            </>
          ) : (
            <img
              src={currentProduct.images[0]}
              alt={currentProduct.title}
              className="hero__main-photo"
            />
          )}
          <div className="hero__badge-model">
            <strong>{getLocalizedProduct(currentProduct, lang).title}</strong>
            <span>{getLocalizedProduct(currentProduct, lang).tagline}</span>
          </div>
        </div>

        <div className="hero__badge">
          <b>30</b>
          <div>
            <strong>{lang === 'fr' ? 'Jours pour essayer' : 'Days to test'}</strong>
            <span>{lang === 'fr' ? 'Garantie satisfait ou remboursé' : 'Money-Back Guarantee'}</span>
          </div>
          <p>
            <span className="tick">
              <Icon name="check" size={12} strokeWidth={2.6} />
            </span>
            {lang === 'fr' ? 'Adopté par plus de 3 000 clients satisfaits au quotidien' : 'Worn daily by 3,000+ happy customers'}
          </p>
        </div>
      </div>
    </section>
  );
}
