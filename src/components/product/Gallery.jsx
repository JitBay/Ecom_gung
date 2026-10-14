import { useRef, useState } from 'react';
import Icon from '../ui/Icon.jsx';
import ProductArt from '../ui/ProductArt.jsx';
import { colors, gallery } from '../../data/product.js';
import { useLockScroll } from '../../lib/hooks.js';
import './Gallery.css';

const hexOf = (id) => colors.find((c) => c.id === id)?.hex;

function Lightbox({ index, onClose, onMove }) {
  useLockScroll(index !== null);
  if (index === null) return null;
  const slide = gallery[index];
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-label="Zoomed product image">
      <button className="lightbox__close" aria-label="Close">
        <Icon name="close" size={26} />
      </button>
      <button className="lightbox__nav is-prev" onClick={(e) => (e.stopPropagation(), onMove(-1))} aria-label="Previous">
        <Icon name="arrow" size={22} />
      </button>
      <div className="lightbox__img" onClick={(e) => e.stopPropagation()}>
        <ProductArt color={hexOf(slide.color)} pose={slide.pose} />
      </div>
      <button className="lightbox__nav" onClick={(e) => (e.stopPropagation(), onMove(1))} aria-label="Next">
        <Icon name="arrow" size={22} />
      </button>
      <p className="lightbox__count">
        {index + 1} / {gallery.length}
      </p>
    </div>
  );
}

export default function Gallery() {
  const [zoom, setZoom] = useState(null);
  const [active, setActive] = useState(0);
  const track = useRef(null);

  // Mobile carousel: work out which slide is showing from the scroll position.
  const onScroll = () => {
    const el = track.current;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };
  const goTo = (i) => track.current.scrollTo({ left: i * track.current.clientWidth, behavior: 'smooth' });
  const move = (step) => setZoom((z) => (z + step + gallery.length) % gallery.length);

  return (
    <div className="gallery">
      <div className="gallery__track" ref={track} onScroll={onScroll}>
        {gallery.map((s, i) => (
          <button key={i} className="gallery__slide" onClick={() => setZoom(i)} aria-label={`Zoom image ${i + 1}`}>
            <ProductArt color={hexOf(s.color)} pose={s.pose} />
            <span className="gallery__zoom">
              <Icon name="zoom" size={18} />
            </span>
          </button>
        ))}
      </div>
      <div className="gallery__dots">
        {gallery.map((_, i) => (
          <button key={i} className={i === active ? 'is-active' : ''} onClick={() => goTo(i)} aria-label={`Image ${i + 1}`} />
        ))}
      </div>
      <Lightbox index={zoom} onClose={() => setZoom(null)} onMove={move} />
    </div>
  );
}
