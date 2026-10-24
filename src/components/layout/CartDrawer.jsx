import Icon from '../ui/Icon.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useLockScroll } from '../../lib/hooks.js';
import { price } from '../../lib/format.js';
import './CartDrawer.css';

const FREE_SHIPPING = 55;

export default function CartDrawer() {
  const { lines, open, setOpen, setQty, total, count } = useCart();
  const { t, lang } = useLanguage();
  useLockScroll(open);

  const bundleShipsFree = lines.some((l) => l.freeShipping);
  const left = bundleShipsFree ? 0 : Math.max(0, FREE_SHIPPING - total);
  const progress = bundleShipsFree ? 100 : Math.min(100, (total / FREE_SHIPPING) * 100);

  return (
    <div className={`cart-backdrop ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)}>
      <aside className="cart" onClick={(e) => e.stopPropagation()} aria-label={t('cart.title')}>
        <header className="cart__head">
          <h2>
            {t('cart.title')} ({count})
          </h2>
          <button onClick={() => setOpen(false)} aria-label={t('cart.close')}>
            <Icon name="close" size={24} />
          </button>
        </header>

        <div className="cart__ship">
          <p>
            {left > 0 ? (
              <>{t('cart.free_shipping_left', { amount: price(left) })}</>
            ) : (
              <>{t('cart.free_shipping_unlocked')}</>
            )}
          </p>
          <i>
            <i style={{ width: `${progress}%` }} />
          </i>
        </div>

        {lines.length === 0 ? (
          <div className="cart__empty">
            <Icon name="bag" size={40} strokeWidth={1.2} />
            <p>{t('cart.empty_title')}</p>
            <button className="btn btn--dark" onClick={() => setOpen(false)}>
              {t('cart.empty_btn')}
            </button>
          </div>
        ) : (
          <ul className="cart__lines">
            {lines.map((l) => (
              <li key={l.id}>
                <div className="cart__thumb">
                  <img
                    src={l.image || '/images/products/demi-manches/1.jpg'}
                    alt={l.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="cart__info">
                  <strong>{l.title}</strong>
                  <span>{l.detail}</span>
                  <div className="qty">
                    <button
                      onClick={() => setQty(l.id, l.qty - 1)}
                      aria-label={lang === 'fr' ? 'Diminuer la quantité' : 'Decrease quantity'}
                    >
                      <Icon name="minus" size={14} />
                    </button>
                    <span>{l.qty}</span>
                    <button
                      onClick={() => setQty(l.id, l.qty + 1)}
                      aria-label={lang === 'fr' ? 'Augmenter la quantité' : 'Increase quantity'}
                    >
                      <Icon name="plus" size={14} />
                    </button>
                  </div>
                </div>
                <div className="cart__price">
                  <strong>{price(l.price * l.qty)}</strong>
                  {l.compareAt > l.price && <s>{price(l.compareAt * l.qty)}</s>}
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 && (
          <footer className="cart__foot">
            <p>
              <span>{t('cart.subtotal')}</span>
              <strong>{price(total)}</strong>
            </p>
            <button className="btn btn--dark btn--block">
              <Icon name="lock" size={16} /> {t('cart.checkout')}
            </button>
            <small>
              {lang === 'fr'
                ? 'Garantie Satisfait ou Remboursé de 30 jours · Paiement SSL sécurisé'
                : '30-Day Money-Back Guarantee · 256-bit SSL Secure Checkout'}
            </small>
          </footer>
        )}
      </aside>
    </div>
  );
}
