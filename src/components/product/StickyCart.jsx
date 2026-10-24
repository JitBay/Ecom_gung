import { useLanguage } from '../../context/LanguageContext.jsx';
import { price } from '../../lib/format.js';
import './StickyCart.css';

export default function StickyCart({ visible, bundle, onAdd, productImage, title }) {
  const { lang } = useLanguage();

  return (
    <div className={`sticky-cart ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <div className="sticky-cart__thumb">
        <img
          src={productImage || '/images/products/demi-manches/1.jpg'}
          alt="Miniature"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className="sticky-cart__text">
        <strong>{title || 'Vela Sculpt™'}</strong>
        <span>
          {price(bundle.price)} <s>{price(bundle.compareAt)}</s>
        </span>
      </div>
      <button className="btn btn--dark" onClick={onAdd} tabIndex={visible ? 0 : -1}>
        {lang === 'fr' ? 'Ajouter au panier' : 'Add to cart'}
      </button>
    </div>
  );
}
