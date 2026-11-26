import { useState, useEffect, useMemo } from 'react';
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

  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (lines.length === 0) {
      try {
        sessionStorage.removeItem('zvar_cart_timer_expires');
      } catch {
        // ignore
      }
      setTimeLeft(600);
      return;
    }

    let expires = null;
    try {
      expires = sessionStorage.getItem('zvar_cart_timer_expires');
    } catch {
      // ignore
    }

    const now = Date.now();
    if (!expires || isNaN(Number(expires)) || Number(expires) <= now) {
      expires = String(now + 600 * 1000);
      try {
        sessionStorage.setItem('zvar_cart_timer_expires', expires);
      } catch {
        // ignore
      }
    }

    const tick = () => {
      const remaining = Math.max(0, Math.floor((Number(expires) - Date.now()) / 1000));
      setTimeLeft(remaining);
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [lines.length]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTimer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalOriginal = useMemo(() => {
    return lines.reduce((sum, l) => {
      const orig = l.compareAt && l.compareAt > l.price ? l.compareAt : l.price;
      return sum + (orig * (l.qty || 1));
    }, 0);
  }, [lines]);

  const currentTotal = displayTotal ?? total;
  const totalSavings = Math.max(0, Math.round((totalOriginal - currentTotal) * 100) / 100);

  const totalTanks = lines.reduce((acc, l) => {
    let multiplier = 1;
    if (l.isDiscoveryPack || l.isTwoPlusOne || l.bundleId === 3) {
      multiplier = 3;
    } else if (l.bundleId === 2 || (Array.isArray(l.chosenVariants) && l.chosenVariants.length === 2)) {
      multiplier = 2;
    } else {
      multiplier = l.paidQty || 1;
    }
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
    const primaryHandle = lines.find((l) => l.handle && l.handle !== 'pack-decouverte')?.handle ||
                          lines[0]?.handle || '';

    let freeNounEn = 'tank';
    let freeNounFr = 'débardeur';
    if (primaryHandle === 'vela-sculpt-demi-manches') {
      freeNounEn = 'shirt';
      freeNounFr = 't-shirt';
    } else if (primaryHandle === 'vela-sculpt-manches-longues') {
      freeNounEn = 'long sleeve';
      freeNounFr = 'manches longues';
    } else if (primaryHandle === 'vela-sculpt-sans-manches') {
      freeNounEn = 'tank';
      freeNounFr = 'débardeur';
    }

    progressText = lang === 'fr'
      ? `🎉 Vous avez débloqué 1 ${freeNounFr} OFFERT !`
      : `🎉 You unlocked 1 FREE ${freeNounEn}!`;
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

        {lines.length > 0 && (
          <div className="cart__timer-bar">
            <span className="cart__timer-icon">
              <Icon name="clock" size={15} />
            </span>
            <span className="cart__timer-text">
              {lang === 'fr' ? 'Panier réservé pendant ' : 'Cart reserved for '}
              <strong className="cart__timer-clock">{formattedTimer}</strong>
            </span>
          </div>
        )}

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
            <p className="cart__shipping-row">
              <span>{lang === 'fr' ? 'Livraison :' : 'Shipping:'}</span>
              <strong className="cart__shipping-free">{lang === 'fr' ? 'OFFERTE (Gratuit)' : 'FREE'}</strong>
            </p>
            {totalSavings > 0 && (
              <p className="cart__savings-row">
                <span>{lang === 'fr' ? 'Vous économisez :' : 'You save:'}</span>
                <strong className="cart__savings-amount">
                  {price(totalSavings)}
                </strong>
              </p>
            )}
            <p className="cart__subtotal-row">
              <span>{t('cart.subtotal')}</span>
              <span className="cart__subtotal-values">
                {totalSavings > 0 && (
                  <s className="cart__subtotal-compare">{price(totalOriginal)}</s>
                )}
                <strong>{price(displayTotal ?? total)}</strong>
              </span>
            </p>

            {/* AVIS CLIENT & ÉTOILES RÉASSURANCE JUSTE AVANT LE CHECKOUT */}
            <div className="cart__review-card">
              <div className="cart__review-header">
                <span className="cart__review-stars">⭐⭐⭐⭐⭐</span>
                <span className="cart__review-verified">
                  {lang === 'fr' ? 'Acheteur vérifié' : 'Verified Buyer'}
                </span>
              </div>
              <p className="cart__review-quote">
                {lang === 'fr'
                  ? '« Effet gainant immédiat sous mes chemises, maintien du dos exceptionnel et super confortable toute la journée. »'
                  : '“Instant slimming effect under shirts, exceptional back support and super comfortable all day.”'}
              </p>
              <span className="cart__review-author">
                {lang === 'fr' ? '— David L. (Taille L)' : '— David L. (Size L)'}
              </span>
            </div>

            {/* TRUST STRIP JUSTE AU-DESSUS DU BOUTON CHECKOUT */}
            <div className="cart__trust-strip">
              <span className="cart__trust-item">
                <Icon name="truck" size={13} />{' '}
                {lang === 'fr' ? 'Livraison offerte aux USA' : 'Free US Shipping'}
              </span>
              <span className="cart__trust-sep">·</span>
              <span className="cart__trust-item">
                <Icon name="shield" size={13} />{' '}
                {lang === 'fr' ? 'Satisfait ou remboursé 30j' : '30-Day Money-Back'}
              </span>
              <span className="cart__trust-sep">·</span>
              <span className="cart__trust-item">
                <Icon name="lock" size={13} />{' '}
                {lang === 'fr' ? 'Paiement sécurisé Shopify' : 'Secure Shopify Checkout'}
              </span>
            </div>

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
