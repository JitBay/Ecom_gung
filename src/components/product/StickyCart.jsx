import { useLanguage } from '../../context/LanguageContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { price } from '../../lib/format.js';
import './StickyCart.css';

export default function StickyCart({ visible, bundle, onAdd, productImage, title }) {
  const { lang } = useLanguage();
  const { isCheckingOut } = useCart();

  return (
    <div className={`sticky-cart ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <div className="sticky-cart__thumb">
        <img
          src={productImage || '/images/image page produit/demi-manche/1.webp'}
          alt={lang === 'fr' ? 'Miniature' : 'Thumbnail'}
          width="48"
          height="48"
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className="sticky-cart__text">
        <strong>{title || 'Vela Sculpt™'}</strong>
        <span>
          {price(bundle.price)} <s>{price(bundle.compareAt)}</s>
        </span>
      </div>
      <button
        className="btn btn--dark"
        onClick={onAdd}
        disabled={isCheckingOut}
        tabIndex={visible ? 0 : -1}
      >
        {isCheckingOut
          ? lang === 'fr'
            ? 'Chargement...'
            : 'Loading...'
          : lang === 'fr'
          ? `Ajouter au panier — ${price(bundle.price)}`
          : `Add to cart — ${price(bundle.price)}`}
      </button>
    </div>
  );
}
