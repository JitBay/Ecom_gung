import { useRef, useState } from 'react';
import { getLocalizedProduct, products } from '../../data/catalog.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './ProductVideoSection.css';

export default function ProductVideoSection({ modelHandle = 'vela-sculpt-sans-manches' }) {
  const { lang } = useLanguage();
  const rawModel = products.find((p) => p.handle === modelHandle) || products[0];
  const localized = getLocalizedProduct(rawModel, lang);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const getCutBenefitFr = () => {
    if (modelHandle === 'pack-decouverte') {
      return '3 coupes complémentaires : 1 débardeur, 1 demi-manches et 1 manches longues inclus';
    }
    if (modelHandle === 'vela-sculpt-demi-manches') {
      return 'Découpe demi-manches : col rond discret invisible sous chemises de bureau, polos & t-shirts';
    }
    if (modelHandle === 'vela-sculpt-manches-longues') {
      return 'Découpe manches longues : maintien intégral torse, dos et bras sous vestes et pulls';
    }
    return 'Découpe sans manches : invisibilité 100% totale sous chemises & t-shirts légers';
  };

  const getCutBenefitEn = () => {
    if (modelHandle === 'pack-decouverte') {
      return '3 complementary fits: 1 tank top, 1 short-sleeve tee, and 1 long-sleeve tee included';
    }
    if (modelHandle === 'vela-sculpt-demi-manches') {
      return 'Short sleeves cut: discreet crew neck invisible under office shirts, polos & tees';
    }
    if (modelHandle === 'vela-sculpt-manches-longues') {
      return 'Long sleeves cut: full upper-body coverage and posture support under sweaters & jackets';
    }
    return 'Sleeveless cut: 100% invisible under lightweight shirts & casual tees';
  };

  const benefitsFr = [
    'Gainage 3D immédiat de la sangle abdominale sans sensation d’étouffement',
    getCutBenefitFr(),
    'Panneaux dorsaux de maintien pour encourager une posture droite et naturelle',
    'Tissu technique thermo-régulant respirant, lavable et indéformable',
  ];

  const benefitsEn = [
    'Immediate 3D core & midsection contouring without restrictive squeezing',
    getCutBenefitEn(),
    'Postural back tension bands to gently promote upright confidence',
    'Technical breathable thermal weave, machine washable & shape-retaining',
  ];

  const benefits = lang === 'fr' ? benefitsFr : benefitsEn;

  return (
    <section className="product-video-section" id="video-demo">
      <div className="container product-video-section__inner">
        <div className="product-video-section__content">
          <span className="product-video-section__eyebrow">
            <span style={{ color: '#c4a265' }}>✦</span>{' '}
            {lang === 'fr' ? 'Démonstration produit en conditions réelles' : 'Real-World Product Demonstration'}
          </span>

          <h2 className="product-video-section__title">
            {lang === 'fr' ? (
              <>
                {localized.shortTitle || localized.title} <em>en action.</em>
              </>
            ) : (
              <>
                {localized.shortTitle || localized.title} <em>in motion.</em>
              </>
            )}
          </h2>

          <p className="product-video-section__lead">
            {lang === 'fr'
              ? 'Observez la fluidité de la fibre seconde peau, l’effet lissant instantané et l’aisance totale lors des mouvements du quotidien. Conçu pour être porté 12h d’affilée avec un confort absolu.'
              : 'Witness the second-skin fluidity, immediate smoothing effect, and complete freedom through every daily movement. Engineered for 12+ hours of continuous effortless comfort.'}
          </p>

          <ul className="product-video-section__benefits">
            {benefits.map((b) => (
              <li key={b} className="product-video-section__benefit">
                <span className="product-video-section__benefit-icon" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="product-video-section__cta-row">
            <a href="#product" className="product-video-section__btn">
              {lang === 'fr' ? 'Configurer mon Vela Sculpt™' : 'Configure My Vela Sculpt™'}{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            <span className="product-video-section__guarantee">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c4a265" strokeWidth="2">
                <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
                <path d="M8.5 12.5l2.5 2.5 5-5" />
              </svg>
              {lang === 'fr' ? 'Garantie satisfait ou remboursé 30j' : '30-Day Money-Back Guarantee'}
            </span>
          </div>
        </div>

        <div
          className="product-video-section__player-wrap product-video-container"
          onClick={togglePlay}
          role="region"
          aria-label={lang === 'fr' ? 'Lecteur vidéo produit' : 'Product video player'}
        >
          <span className="product-video-section__live-pill">
            <span className="product-video-section__live-dot" />
            {lang === 'fr' ? 'Vidéo produit HD' : 'HD Product Video'}
          </span>

          <video
            ref={videoRef}
            src="/videos/sleevless.mp4"
            className="product-video-section__video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/sleevless.mp4" type="video/mp4" />
            <source src="/videos/product-sleeveless.mp4" type="video/mp4" />
            <source src="/videos/video-2.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>

          <div className="product-video-section__overlay" aria-hidden="true" />

          {!isPlaying && (
            <div className="product-video-section__big-play" aria-hidden="true">
              <div className="product-video-section__big-play-btn">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          )}

          <div className="product-video-section__controls">
            <button
              type="button"
              className="product-video-section__ctrl-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? (lang === 'fr' ? 'Mettre en pause' : 'Pause') : (lang === 'fr' ? 'Lire' : 'Play')}
            >
              {isPlaying ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                  <span>{lang === 'fr' ? 'Pause' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>{lang === 'fr' ? 'Lire' : 'Play'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="product-video-section__ctrl-btn"
              onClick={toggleMute}
              aria-label={isMuted ? (lang === 'fr' ? 'Activer le son' : 'Unmute') : (lang === 'fr' ? 'Couper le son' : 'Mute')}
            >
              {isMuted ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  </svg>
                  <span>{lang === 'fr' ? 'Son coupé' : 'Muted'}</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                  <span>{lang === 'fr' ? 'Son actif' : 'Audio on'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
