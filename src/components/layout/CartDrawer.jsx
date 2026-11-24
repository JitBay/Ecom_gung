import Icon from '../ui/Icon.jsx';
import ShopifyPaymentBadges from '../shopify/ShopifyPaymentBadges.jsx';
import ExpressPaymentButtons from '../shopify/ExpressPaymentButtons.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useLockScroll } from '../../lib/hooks.js';
import { price } from '../../lib/format.js';
import { getInstantCheckoutUrl } from '../../lib/shopify.js';
import './CartDrawer.css';

const FREE_SHIPPING = 55;

export default function CartDrawer() {
  const { lines, open, setOpen, setQty, total, displayTotal, count, checkout, isCheckingOut, shopifyCart } = useCart();
  const { t, lang } = useLanguage();
  useLockScroll(open);

  const totalTanks = lines.reduce((acc, l) => {
    const multiplier = (l.isTwoPlusOne || l.bundleId === 2 || l.bundleId === 3 || l.isDiscoveryPack) ? 3 : 1;
    return acc + (multiplier * (l.qty || 1));
  }, 0);

  let progress = 100;
  let progressText = '';

  if (totalTanks <= 0) {
    progress = 0;
    progressText = lang === 'fr'
      ? 'Ajoutez 3 articles → 1 OFFERT 🎁'
      : 'Add 3 items → get 1 FREE 🎁';
  } else if (totalTanks === 1) {
    progress = 33;
    progressText = lang === 'fr'
      ? 'Ajoutez encore 2 articles → 1 OFFERT 🎁'
      : 'Add 2 more → get 1 FREE 🎁';
  } else if (totalTanks === 2) {
    progress = 66;
    progressText = lang === 'fr'
      ? 'Ajoutez encore 1 article → c’est OFFERT 🎁'
      : 'Add 1 more → it’s FREE 🎁';
  } else {
    progress = 100;
    progressText = lang === 'fr'
      ? '🎉 Vous avez débloqué 1 débardeur OFFERT !'
      : '🎉 You unlocked 1 FREE tank!';
  }

  const isInApp = typeof navigator !== 'undefined' && /FBAN|FBAV|Instagram|Line|Twitter|Snapchat|TikTok/i.test(navigator.userAgent || '');
  const instantCheckoutUrl = lines.length > 0 ? getInstantCheckoutUrl(lines, { locale: lang, shopifyCart }) : '';

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
          <p className="cart__progress-text">
            <strong>{progressText}</strong>
          </p>
          <i>
            <i style={{ width: `${progress}%` }} />
          </i>
          <p className="cart__deadline">
            {lang === 'fr'
              ? '🚚 Livraison gratuite suivie · 🎄 Commandez avant le 10 déc. pour Noël'
              : '🚚 Free tracked shipping · 🎄 Order by Dec 10 for Christmas delivery'}
          </p>
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
                    src={l.image || '/images/image page produit/demi-manche/1.webp'}
                    alt={l.title}
                    width="68"
                    height="68"
                    loading="lazy"
                    decoding="async"
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
              <strong>{price(displayTotal ?? total)}</strong>
            </p>
            <button
              className={`btn btn--dark btn--block ${isCheckingOut ? 'is-loading' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                if (isCheckingOut) return;
                e.currentTarget.disabled = true;
                e.currentTarget.style.pointerEvents = 'none';
                e.currentTarget.style.opacity = '0.7';
                checkout();
              }}
              disabled={isCheckingOut}
            >
              <Icon name="lock" size={16} />{' '}
              {isCheckingOut
                ? lang === 'fr'
                  ? 'Redirection vers Shopify...'
                  : 'Redirecting to Shopify...'
                : t('cart.checkout')}
            </button>
            <ExpressPaymentButtons />
            {(isInApp || isCheckingOut) && instantCheckoutUrl && (
              <a
                href={instantCheckoutUrl}
                className="cart__direct-link"
                target="_self"
                rel="noreferrer"
              >
                {lang === 'fr'
                  ? 'Ne charge pas ? Cliquez ici pour le paiement direct'
                  : "Doesn't load? Click here for direct checkout"}
              </a>
            )}
            <ShopifyPaymentBadges />
            <small>
              {lang === 'fr'
                ? 'Garantie satisfait ou remboursé de 30 jours · Paiement SSL sécurisé Shopify'
                : '30-Day Money-Back Guarantee · 256-bit SSL Secure Shopify Checkout'}
            </small>
          </footer>
        )}
      </aside>
    </div>
  );
}
