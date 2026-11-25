import { useState, useRef, useEffect } from 'react';
import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import { videoTestimonials } from '../../data/reviews.js';
import { useReveal } from '../../lib/hooks.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './VideoTestimonials.css';

function getVal(field, lang) {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field.fr || field.en || '';
}

export default function VideoTestimonials() {
  const [playingId, setPlayingId] = useState(null);
  const [progressMap, setProgressMap] = useState({});
  const [modalItem, setModalItem] = useState(null);
  const videoRefs = useRef({});
  const ref = useReveal();
  const { lang } = useLanguage();

  const handlePlayToggle = (id, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const vid = videoRefs.current[id];
    if (!vid) return;

    if (playingId === id) {
      vid.pause();
      setPlayingId(null);
    } else {
      // Pause all other videos
      Object.entries(videoRefs.current).forEach(([k, v]) => {
        if (v && k !== id) {
          v.pause();
        }
      });
      vid.muted = true;
      vid.play().then(() => setPlayingId(id)).catch(() => {});
    }
  };

  const handleTimeUpdate = (id, e) => {
    const el = e.currentTarget;
    if (el.duration) {
      const pct = (el.currentTime / el.duration) * 100;
      setProgressMap((prev) => ({ ...prev, [id]: pct }));
    }
  };

  const openModal = (item) => {
    setModalItem(item);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalItem) {
        setModalItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalItem]);

  return (
    <section className="ugc" ref={ref} id="video-reviews">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">
            <Icon name="sparkle" size={13} />{' '}
            {lang === 'fr' ? 'Avis clients en vidéo' : 'Verified Buyer Videos'}
          </span>
          <h2 className="title">
            {lang === 'fr' ? (
              <>
                Ne nous croyez pas sur parole.
                <br />
                <em>Écoutez leurs retours.</em>
              </>
            ) : (
              <>
                Don’t take our word for it.
                <br />
                <em>Watch theirs.</em>
              </>
            )}
          </h2>
          <p className="subtitle">
            {lang === 'fr'
              ? 'Cinq acheteurs vérifiés, filmés en direct avec leurs propres mots — résultat visible et maintien postural sous la chemise.'
              : 'Five verified buyers, unscripted in their own words — visible shaping and postural support under shirts & tees.'}
          </p>
        </div>

        <div className="ugc__row">
          {videoTestimonials.map((v) => {
            const progress = progressMap[v.id] || 0;
            const tag = getVal(v.tag, lang);
            const quote = getVal(v.quote, lang);
            const product = getVal(v.product, lang);

            return (
              <div
                key={v.id}
                className={`ugc-card ${playingId === v.id ? 'is-playing' : ''}`}
                style={{ '--a': v.tint[0], '--b': v.tint[1] }}
                onClick={(e) => handlePlayToggle(v.id, e)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePlayToggle(v.id, e);
                  }
                }}
                aria-label={`${lang === 'fr' ? 'Lancer la vidéo de' : 'Play video review from'} ${v.name}`}
              >
                {/* Video — lecture déclenchée uniquement au clic (muet) */}
                <video
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[v.id] = el;
                      el.muted = true;
                    }
                  }}
                  src={v.video}
                  poster={v.poster}
                  loop
                  muted
                  defaultMuted
                  playsInline
                  preload="metadata"
                  width="220"
                  height="378"
                  className="ugc-card__video"
                  onTimeUpdate={(e) => handleTimeUpdate(v.id, e)}
                />

                {/* Center play icon button (visible quand la vidéo est en pause) */}
                {playingId !== v.id && (
                  <button
                    type="button"
                    className="ugc-card__play-btn"
                    onClick={(e) => handlePlayToggle(v.id, e)}
                    aria-label={lang === 'fr' ? 'Lancer la vidéo' : 'Play video'}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </button>
                )}

                {/* Subtle vignette/scrim overlay for caption legibility */}
                <div className="ugc-card__overlay" aria-hidden="true" />

                {/* Top Badge & Enlarge Button */}
                <div className="ugc-card__top">
                  <span className="ugc-card__verified">
                    <Icon name="check" size={12} strokeWidth={3} />{' '}
                    {lang === 'fr' ? 'Avis client' : 'Customer Review'}
                  </span>
                  <div className="ugc-card__controls">
                    <button
                      type="button"
                      className="ugc-card__btn-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(v);
                      }}
                      title={lang === 'fr' ? 'Agrandir en plein écran' : 'Enlarge video'}
                      aria-label={lang === 'fr' ? 'Agrandir en plein écran' : 'Enlarge video'}
                    >
                      <Icon name="zoom" size={14} />
                    </button>
                  </div>
                </div>

                {/* Bottom Caption & Review Info */}
                <div className="ugc-card__caption">
                  <div className="ugc-card__stars-row">
                    <Stars value={5} size={13} />
                    <span className="ugc-card__rating-text">5.0</span>
                  </div>

                  <div className="ugc-card__user">
                    <strong>{v.name}</strong>
                    <span>· {v.age} {lang === 'fr' ? 'ans' : 'yrs'}</span>
                  </div>

                  {tag && <div className="ugc-card__tag-text">{tag}</div>}

                  {quote && <p className="ugc-card__quote">« {quote} »</p>}

                  {product && (
                    <span className="ugc-card__product-badge">
                      {product}
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="ugc-card__progress-track" aria-hidden="true">
                  <div
                    className="ugc-card__progress-bar"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="ugc__cta reveal">
          <a href="#product" className="btn btn--gold">
            {lang === 'fr' ? 'Choisir ma taille ↑' : 'Choose your size ↑'}
          </a>
        </div>
      </div>

      {/* Lightbox Modal for Fullscreen Video Experience */}
      {modalItem && (
        <div
          className="ugc-modal__overlay"
          onClick={() => setModalItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="ugc-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ugc-modal__close"
              onClick={() => setModalItem(null)}
              aria-label={lang === 'fr' ? 'Fermer' : 'Close'}
            >
              <Icon name="close" size={18} />
            </button>

            <video
              ref={(el) => {
                if (el) {
                  el.muted = true;
                  el.play().catch(() => {});
                }
              }}
              src={modalItem.video}
              poster={modalItem.poster}
              loop
              muted
              defaultMuted
              controls
              playsInline
              className="ugc-modal__video"
            />

            <div className="ugc-modal__caption">
              <div className="ugc-card__stars-row">
                <Stars value={5} size={14} />
                <strong style={{ color: '#fff', fontSize: 14 }}>{modalItem.name}</strong>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>· {modalItem.age} {lang === 'fr' ? 'ans' : 'yrs'}</span>
              </div>
              <p style={{ margin: '6px 0 0', fontSize: 13, color: '#f1f0ec', fontStyle: 'italic' }}>
                « {getVal(modalItem.quote, lang)} »
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
