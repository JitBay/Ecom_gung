import { useState } from 'react';
import Gallery from './Gallery.jsx';
import BundlePicker from './BundlePicker.jsx';
import ProductDetails from './ProductDetails.jsx';
import SizeFinder from './SizeFinder.jsx';
import StickyCart from './StickyCart.jsx';
import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import { badges, benefits, bundles, colors, product, stats } from '../../data/product.js';
import { useCart } from '../../context/CartContext.jsx';
import { useScrolledPast } from '../../lib/hooks.js';
import './ProductSection.css';

const MAX_ITEMS = Math.max(...bundles.map((b) => b.qty));
const startVariants = Array.from({ length: MAX_ITEMS }, (_, i) => ({ color: colors[i % 2 === 0 ? 0 : 1].id, size: 'M' }));

// Ships two days from today, e.g. "Oct 15".
const shipDate = new Date(Date.now() + 2 * 864e5).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

function Benefits() {
  return (
    <ul className="benefits">
      {benefits.map((b) => (
        <li key={b.title}>
          <span className="benefits__icon">
            <Icon name={b.icon} size={16} />
          </span>
          <div>
            <strong>{b.title}</strong>
            <p>{b.text}</p>
          </div>
          {b.tag && <em>{b.tag}</em>}
        </li>
      ))}
    </ul>
  );
}

function Stats() {
  return (
    <div className="stats">
      {stats.map((s) => (
        <div key={s.label}>
          <b>
            {s.value}
            <small>{s.unit}</small>
          </b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function ProductSection() {
  const [bundleId, setBundleId] = useState(3);
  const [variants, setVariants] = useState(startVariants);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [atcRef, pastAtc] = useScrolledPast();
  const { add } = useCart();

  const bundle = bundles.find((b) => b.id === bundleId);
  const chosen = variants.slice(0, bundle.qty);

  const updateVariant = (i, patch) => setVariants((vs) => vs.map((v, j) => (j === i ? { ...v, ...patch } : v)));
  const applySize = (size) => {
    setVariants((vs) => vs.map((v) => ({ ...v, size })));
    setSizeOpen(false);
  };

  const addToCart = () => {
    const detail = chosen.map((v) => `${colors.find((c) => c.id === v.color).label} / ${v.size}`).join(', ');
    add({
      id: `${bundle.id}-${detail}`,
      title: `${product.title} — ${bundle.qty} pack`,
      detail,
      color: colors.find((c) => c.id === chosen[0].color).hex,
      price: bundle.price,
      compareAt: bundle.compareAt,
      freeShipping: Boolean(bundle.freeShipping),
    });
  };

  return (
    <section className="product container" id="product">
      <div className="product__media">
        <Gallery />
      </div>

      <div className="product__info">
        <h1 className="product__title">{product.title}</h1>
        <a href="#reviews" className="product__rating">
          <Stars value={5} size={16} /> <strong>{product.rating}</strong> <span>/ 5</span>
        </a>

        <Benefits />
        <Stats />

        <p className="product__micro">
          <span>
            <Icon name="lock" size={14} /> Secure checkout
          </span>
          <span>
            <Icon name="truck" size={14} /> Free shipping over €55
          </span>
          <span>
            <Icon name="pin" size={14} /> Tracked delivery
          </span>
        </p>

        <BundlePicker selectedId={bundleId} onSelect={setBundleId} variants={chosen} onVariantChange={updateVariant} />

        <button className="size-btn" onClick={() => setSizeOpen(true)}>
          <Icon name="ruler" size={18} /> Find my size
        </button>

        <button ref={atcRef} className="btn btn--dark btn--block atc" onClick={addToCart}>
          Add to cart
        </button>

        <div className="product__ship">
          <span>
            <i className="live-dot" /> Ships by <strong>{shipDate}</strong>
          </span>
          <span>
            <i className="flag-fr" /> Shipping to France
          </span>
        </div>
        <p className="product__trend">
          <Icon name="trend" size={16} /> 2,073+ ordered this week
        </p>

        <ul className="product__badges">
          {badges.map((b) => (
            <li key={b.label}>
              <Icon name={b.icon} size={22} />
              {b.label}
            </li>
          ))}
        </ul>

        <div className="guarantee">
          <Icon name="shield" size={22} />
          <p>
            <strong>90-Day Money-Back Guarantee.</strong> Love them or get a full refund — no questions asked.
          </p>
        </div>

        <ProductDetails />
      </div>

      <SizeFinder open={sizeOpen} onClose={() => setSizeOpen(false)} onApply={applySize} />
      <StickyCart visible={pastAtc} bundle={bundle} onAdd={addToCart} />
    </section>
  );
}
