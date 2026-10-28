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
  const [unmutedId, setUnmutedId] = useState(null);
  const [progressMap, setProgressMap] = useState({});
  const [modalItem, setModalItem] = useState(null);
  const videoRefs = useRef({});
  const ref = useReveal();
  const { lang } = useLanguage();

  // Autoplay all videos in muted loop mode immediately on mount
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, vid]) => {
      if (vid) {
        vid.muted = unmutedId !== id;
        vid.play().catch(() => {});
      }
    });
  }, [unmutedId]);

  const toggleSound = (e, id) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const vid = videoRefs.current[id];
    if (!vid) return;

    if (unmutedId === id) {
      vid.muted = true;
      setUnmutedId(null);
    } else {
      // Mute all others
      Object.entries(videoRefs.current).forEach(([k, v]) => {
        if (v) v.muted = k !== id;
      });
      vid.muted = false;
      vid.play().then(() => {
        setUnmutedId(id);
      }).catch(() => {
        vid.muted = true;
        setUnmutedId(null);
      });
    }
  };

  const handleTimeUpdate = (id, e) => {
    const el = e.currentTarget;
    if (el.duration) {
      const pct = (el.currentTime / el.duration) * 100;
      setProgressMap((prev) => ({ ...prev, [id]: pct }));
    }
  };

  const openModal = (e, item) => {
    if (e && e.stopPropagation) e.stopPropagation();
    // Mute background card video when opening modal
    if (unmutedId && videoRefs.current[unmutedId]) {
      videoRefs.current[unmutedId].muted = true;
      setUnmutedId(null);
    }
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
            const hasSound = unmutedId === v.id;
            const progress = progressMap[v.id] || 0;
            const tag = getVal(v.tag, lang);
            const quote = getVal(v.quote, lang);
            const product = getVal(v.product, lang);

            return (
              <div
                key={v.id}
                className={`ugc-card ${hasSound ? 'is-playing is-unmuted' : ''}`}
                style={{ '--a': v.tint[0], '--b': v.tint[1] }}
                onClick={(e) => toggleSound(e, v.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSound(e, v.id);
                  }
                }}
                aria-label={`${lang === 'fr' ? 'Avis vidéo de' : 'Video review from'} ${v.name}`}
              >
                {/* HTML5 Vertical Video — plays continuously without static poster image */}
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[v.id] = el;
                  }}
                  src={v.video}
                  autoPlay
                  loop
                  muted={!hasSound}
                  playsInline
                  preload="auto"
                  className="ugc-card__video"
                  onTimeUpdate={(e) => handleTimeUpdate(v.id, e)}
                />

                {/* Subtle vignette/scrim overlay for caption legibility */}
                <div className="ugc-card__overlay" aria-hidden="true" />

                {/* Top Badge & Controls */}
                <div className="ugc-card__top">
                  <span className="ugc-card__verified">
                    <Icon name="check" size={12} strokeWidth={3} />{' '}
                    {lang === 'fr' ? 'Achat Vérifié' : 'Verified Buyer'}
                  </span>
                  <div className="ugc-card__controls">
                    <button
                      type="button"
                      className={`ugc-card__btn-icon ${hasSound ? 'is-active' : ''}`}
                      onClick={(e) => toggleSound(e, v.id)}
                      title={hasSound ? (lang === 'fr' ? 'Couper le son' : 'Mute') : (lang === 'fr' ? 'Activer le son' : 'Unmute')}
                      aria-label={hasSound ? 'Couper le son' : 'Activer le son'}
                    >
                      <Icon name="sound" size={14} />
                    </button>
                    <button
                      type="button"
                      className="ugc-card__btn-icon"
                      onClick={(e) => openModal(e, v)}
                      title={lang === 'fr' ? 'Plein écran' : 'Fullscreen'}
                      aria-label="Plein écran"
                    >
                      <Icon name="zoom" size={13} />
                    </button>
                  </div>
                </div>

                {/* Center Sound / Action Indicator */}
                <div className="ugc-card__play" aria-hidden="true">
                  {hasSound ? (
                    <div className="ugc-card__sound-wave">
                      <span />
                      <span />
                      <span />
                    </div>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
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
            {lang === 'fr' ? 'Essayer avec la Garantie 30 Jours' : 'Try with 30-Day Guarantee'}{' '}
            <Icon name="arrow" size={18} />
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
              src={modalItem.video}
              controls
              autoPlay
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
