import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { useLockScroll } from '../../lib/hooks.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './Gallery.css';

function Lightbox({ index, images, onClose, onMove, title }) {
  useLockScroll(index !== null);
  if (index === null || !images || images.length === 0) return null;
  const currentSrc = images[index];

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-label="Image agrandie">
      <button className="lightbox__close" aria-label="Fermer">
        <Icon name="close" size={26} />
      </button>
      <button
        className="lightbox__nav is-prev"
        onClick={(e) => {
          e.stopPropagation();
          onMove(-1);
        }}
        aria-label="Image précédente"
      >
        <Icon name="arrow" size={22} />
      </button>
      <div className="lightbox__img" onClick={(e) => e.stopPropagation()}>
        <img src={currentSrc} alt={title || 'Vela Sculpt™'} />
      </div>
      <button
        className="lightbox__nav"
        onClick={(e) => {
          e.stopPropagation();
          onMove(1);
        }}
        aria-label="Image suivante"
      >
        <Icon name="arrow" size={22} />
      </button>
      <p className="lightbox__count">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}

export default function Gallery({ images, title, activeColor, videoHref }) {
  const { lang } = useLanguage();
  const [zoom, setZoom] = useState(null);
  const [active, setActive] = useState(0);
  const track = useRef(null);

  const list = images && images.length > 0 ? images : ['/images/products/demi-manches/4.jpg'];

  // Reset to first slide whenever the color images change
  useEffect(() => {
    setActive(0);
    if (track.current) {
      if (typeof track.current.scrollTo === 'function') {
        try {
          track.current.scrollTo({ left: 0, behavior: 'instant' });
        } catch {
          track.current.scrollLeft = 0;
        }
      } else {
        track.current.scrollLeft = 0;
      }
    }
  }, [images]);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / (el.clientWidth || 1)));
  };

  const goTo = (i) => {
    setActive(i);
    if (track.current) {
      const targetLeft = i * track.current.clientWidth;
      if (typeof track.current.scrollTo === 'function') {
        try {
          track.current.scrollTo({ left: targetLeft, behavior: 'smooth' });
        } catch {
          track.current.scrollLeft = targetLeft;
        }
      } else {
        track.current.scrollLeft = targetLeft;
      }
    }
  };

  const move = (step) => setZoom((z) => (z + step + list.length) % list.length);

  return (
    <div className="gallery">
      <div className="gallery__track" ref={track} onScroll={onScroll}>
        {list.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="gallery__slide"
            onClick={() => setZoom(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setZoom(i);
            }}
            aria-label={`Agrandir la photo ${i + 1}`}
          >
            <img
              src={src}
              alt={`${title || 'Vela Sculpt™'} - ${activeColor || ''} - photo ${i + 1}`}
              className="gallery__photo"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <span className="gallery__zoom">
              <Icon name="zoom" size={18} />
            </span>
            {i === 0 && videoHref && (
              <button
                type="button"
                className="gallery__video-pill"
                onClick={(e) => {
                  e.stopPropagation();
                  const target = document.querySelector(videoHref);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                aria-label={lang === 'fr' ? 'Voir la vidéo du produit' : 'Watch product video'}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>{lang === 'fr' ? 'Vidéo en action' : 'Video demo'}</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {list.length > 1 && (
        <div className="gallery__dots">
          {list.map((_, i) => (
            <button
              key={i}
              className={`gallery__dot ${i === active ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      )}

      <Lightbox index={zoom} images={list} onClose={() => setZoom(null)} onMove={move} title={title} />
    </div>
  );
}
