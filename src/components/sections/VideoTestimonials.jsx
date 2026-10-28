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
  const [isMuted, setIsMuted] = useState(false);
  const [progressMap, setProgressMap] = useState({});
  const [modalItem, setModalItem] = useState(null);
  const videoRefs = useRef({});
  const ref = useReveal();
  const { lang } = useLanguage();

  const togglePlay = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (playingId === id) {
      video.pause();
      setPlayingId(null);
    } else {
      // Pause all other video cards
      Object.entries(videoRefs.current).forEach(([k, v]) => {
        if (k !== id && v && !v.paused) {
          v.pause();
        }
      });
      video.muted = isMuted;
      video.play().then(() => {
        setPlayingId(id);
      }).catch(() => {
        // Fallback to muted playback if blocked
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => setPlayingId(id)).catch(() => {});
      });
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const next = !isMuted;
    setIsMuted(next);
    Object.values(videoRefs.current).forEach((v) => {
      if (v) v.muted = next;
    });
  };

  const handleTimeUpdate = (id, e) => {
    const el = e.currentTarget;
    if (el.duration) {
      const pct = (el.currentTime / el.duration) * 100;
      setProgressMap((prev) => ({ ...prev, [id]: pct }));
    }
  };

  const handleEnded = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    }
    setProgressMap((prev) => ({ ...prev, [id]: 0 }));
  };

  const openModal = (e, item) => {
    e.stopPropagation();
    if (playingId && videoRefs.current[playingId]) {
      videoRefs.current[playingId].pause();
      setPlayingId(null);
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
              ? 'Trois acheteurs vérifiés, filmés en direct avec leurs propres mots — résultat visible et maintien postural sous la chemise.'
              : 'Real verified buyers, unscripted in their own words — visible shaping and postural support under shirts & tees.'}
          </p>
        </div>

        <div className="ugc__row">
          {videoTestimonials.map((v) => {
            const isCurrentPlaying = playingId === v.id;
            const progress = progressMap[v.id] || 0;
            const tag = getVal(v.tag, lang);
            const quote = getVal(v.quote, lang);
            const product = getVal(v.product, lang);

            return (
              <div
                key={v.id}
                className={`ugc-card ${isCurrentPlaying ? 'is-playing' : ''}`}
                style={{ '--a': v.tint[0], '--b': v.tint[1] }}
                onClick={() => togglePlay(v.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    togglePlay(v.id);
                  }
                }}
                aria-label={`${lang === 'fr' ? 'Avis vidéo de' : 'Video review from'} ${v.name}`}
              >
                {/* HTML5 Vertical Video */}
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[v.id] = el;
                  }}
                  src={v.video}
                  poster={v.poster}
                  playsInline
                  preload="metadata"
                  className="ugc-card__video"
                  onTimeUpdate={(e) => handleTimeUpdate(v.id, e)}
                  onEnded={() => handleEnded(v.id)}
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
                      className="ugc-card__btn-icon"
                      onClick={toggleMute}
                      title={isMuted ? (lang === 'fr' ? 'Activer le son' : 'Unmute') : (lang === 'fr' ? 'Couper le son' : 'Mute')}
                      aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
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

                {/* Center Play Button Overlay */}
                <div className="ugc-card__play" aria-hidden="true">
                  {isCurrentPlaying ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
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
              poster={modalItem.poster}
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
