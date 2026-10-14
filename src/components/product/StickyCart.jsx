// Floating "Add to cart" bar shown once the main button scrolls out of view.
import ProductArt from '../ui/ProductArt.jsx';
import { product } from '../../data/product.js';
import { price } from '../../lib/format.js';
import './StickyCart.css';

export default function StickyCart({ visible, bundle, onAdd }) {
  return (
    <div className={`sticky-cart ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <div className="sticky-cart__thumb">
        <ProductArt pose="side" />
      </div>
      <div className="sticky-cart__text">
        <strong>{product.title}</strong>
        <span>
          {price(bundle.price)} <s>{price(bundle.compareAt)}</s>
        </span>
      </div>
      <button className="btn btn--dark" onClick={onAdd} tabIndex={visible ? 0 : -1}>
        Add to cart
      </button>
    </div>
  );
}
