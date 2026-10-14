import { useState } from 'react';
import { related } from '../../data/product.js';
import { price } from '../../lib/format.js';
import { useCart } from '../../context/CartContext.jsx';
import { useReveal } from '../../lib/hooks.js';
import './RelatedProducts.css';

// Simple garment silhouettes for the placeholder images.
const shapes = {
  sleeve: 'M70 30h60l10 140H60Z',
  bra: 'M50 60q50-40 100 0l-6 60q-44 20-88 0Z',
  tee: 'M60 40l30-10h20l30 10 30 30-20 20-15-10v90H65V80L50 90 30 70Z',
  shorts: 'M55 50h90l10 100h-40l-15-60-15 60H45Z',
};

function ProductCard({ item }) {
  const [color, setColor] = useState(item.colors[0]);
  const { add } = useCart();
  const off = Math.round((1 - item.price / item.compareAt) * 100);
  return (
    <article className="mini-card reveal">
      <div className="mini-card__img">
        <span className="mini-card__sale">-{off}%</span>
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <path d={shapes[item.shape]} fill={color} />
        </svg>
        <button className="mini-card__add" onClick={() => add({ id: item.title + color, title: item.title, detail: 'One size', color, price: item.price, compareAt: item.compareAt })}>
          + Quick add
        </button>
      </div>
      <h3>{item.title}</h3>
      <p className="mini-card__price">
        <strong>{price(item.price)}</strong> <s>{price(item.compareAt)}</s>
      </p>
      <div className="swatches">
        {item.colors.slice(0, 3).map((c) => (
          <button key={c} className={c === color ? 'is-active' : ''} style={{ background: c }} onClick={() => setColor(c)} aria-label="Choose colour" />
        ))}
        {item.colors.length > 3 && <span>+{item.colors.length - 3}</span>}
      </div>
    </article>
  );
}

export default function RelatedProducts() {
  const ref = useReveal();
  return (
    <section className="related container" ref={ref}>
      <h2 className="related__title">Frequently Bought Together</h2>
      <div className="related__grid scroller">
        {related.map((item) => (
          <ProductCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
