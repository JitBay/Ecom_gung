import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { useLockScroll } from '../../lib/hooks.js';
import './Gallery.css';

const ANGLE_LABELS = ['Vue Face', 'Vue Profil', 'Vue Dos / Détail', 'Vue 4'];

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
        onClick={(e) => { e.stopPropagation(); onMove(-1); }}
        aria-label="Image précédente"
      >
        <Icon name="arrow" size={22} />
      </button>
      <div className="lightbox__img" onClick={(e) => e.stopPropagation()}>
        <img src={currentSrc} alt={title || 'Vela Sculpt™'} />
      </div>
      <button
        className="lightbox__nav"
        onClick={(e) => { e.stopPropagation(); onMove(1); }}
        aria-label="Image suivante"
      >
        <Icon name="arrow" size={22} />
      </button>
      <p className="lightbox__count">
        {index + 1} / {images.length} — {ANGLE_LABELS[index] || `Angle ${index + 1}`}
      </p>
    </div>
  );
}

export default function Gallery({ images, title, activeColor }) {
  const [zoom, setZoom] = useState(null);
  const [active, setActive] = useState(0);
  const track = useRef(null);

  const list = images && images.length > 0 ? images : ['/images/products/demi-manches/4.jpg'];

  // Reset to first angle whenever the color images change
  useEffect(() => {
    setActive(0);
    if (track.current) {
      track.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  }, [images]);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i) => {
    setActive(i);
    if (track.current) {
      track.current.scrollTo({ left: i * track.current.clientWidth, behavior: 'smooth' });
    }
  };

  const move = (step) => setZoom((z) => (z + step + list.length) % list.length);

  return (
    <div className="gallery">
      <div className="gallery__track" ref={track} onScroll={onScroll}>
        {list.map((src, i) => (
          <button key={`${src}-${i}`} className="gallery__slide" onClick={() => setZoom(i)} aria-label={`Agrandir ${ANGLE_LABELS[i] || `angle ${i + 1}`}`}>
            <img
              src={src}
              alt={`${title || 'Vela Sculpt™'} - ${activeColor || ''} - ${ANGLE_LABELS[i] || `vue ${i + 1}`}`}
              className="gallery__photo"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <span className="gallery__angle-badge">
              {ANGLE_LABELS[i] || `Angle ${i + 1}`}
            </span>
            <span className="gallery__zoom">
              <Icon name="zoom" size={18} />
            </span>
          </button>
        ))}
      </div>

      <div className="gallery__thumbs-bar">
        {list.map((src, i) => (
          <button
            key={`${src}-${i}`}
            className={`gallery__thumb-item ${i === active ? 'is-active' : ''}`}
            onClick={() => goTo(i)}
            onMouseEnter={() => goTo(i)}
            aria-label={`Voir ${ANGLE_LABELS[i] || `angle ${i + 1}`}`}
          >
            <img src={src} alt="Miniature angle" />
            <span className="gallery__thumb-caption">{ANGLE_LABELS[i] || `Angle ${i + 1}`}</span>
          </button>
        ))}
      </div>

      <Lightbox index={zoom} images={list} onClose={() => setZoom(null)} onMove={move} title={title} />
    </div>
  );
}
