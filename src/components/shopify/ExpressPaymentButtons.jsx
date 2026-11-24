import { useState } from 'react';
import { redirectToShopifyCheckout } from '../../lib/shopify.js';
import { trackAddToCart } from '../../lib/analytics.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import './ExpressPaymentButtons.css';

/**
 * Express Checkout Buttons: Shop Pay, PayPal, Apple Pay, Google Pay
 * Can be used on the product page (with lineItem) or in CartDrawer (with cart lines)
 */
export default function ExpressPaymentButtons({ lineItem = null, className = '' }) {
  const { lang } = useLanguage();
  const { lines, checkout, isCheckingOut } = useCart();
  const [loadingMethod, setLoadingMethod] = useState(null);

  const handleExpressClick = (method, e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (loadingMethod || isCheckingOut) return;
    if (e && e.currentTarget) {
      e.currentTarget.disabled = true;
      e.currentTarget.style.pointerEvents = 'none';
      e.currentTarget.style.opacity = '0.7';
    }

    setLoadingMethod(method);

    try {
      if (lineItem) {
        // Direct checkout from product page
        const items = Array.isArray(lineItem) ? lineItem : [lineItem];
        items.forEach((item) => {
          if (item) {
            trackAddToCart({
              id: item.handle || item.id,
              title: item.title,
              price: item.price,
              qty: item.qty || 1,
            });
          }
        });
        redirectToShopifyCheckout(items, { locale: lang });
      } else if (lines && lines.length > 0) {
        // Checkout from cart
        checkout();
      }
    } catch (err) {
      console.error('[ExpressPayment] Redirection error:', err);
    } finally {
      setTimeout(() => {
        setLoadingMethod(null);
      }, 3500);
    }
  };

  const isDisabled = Boolean(loadingMethod) || isCheckingOut;

  return (
    <div className={`express-checkout ${className}`}>
      <div className="express-checkout__divider">
        <span>{lang === 'fr' ? 'Paiement express 1-clic' : 'Instant Express Checkout'}</span>
      </div>

      <div className="express-checkout__grid">
        {/* Shop Pay */}
        <button
          type="button"
          className="express-btn express-btn--shoppay"
          onClick={(e) => handleExpressClick('shoppay', e)}
          disabled={isDisabled}
          title={lang === 'fr' ? 'Payer avec Shop Pay' : 'Pay with Shop Pay'}
          aria-label={lang === 'fr' ? 'Payer avec Shop Pay' : 'Pay with Shop Pay'}
        >
          {loadingMethod === 'shoppay' ? (
            <span className="express-btn__spinner" />
          ) : (
            <svg viewBox="0 0 84 32" height="22" fill="none">
              <rect width="84" height="32" rx="4" fill="#5A31F4" />
              <text x="14" y="21" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">
                shop
              </text>
              <text x="46" y="21" fill="#FFFFFF" fontSize="11" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif" opacity="0.95">
                Pay
              </text>
            </svg>
          )}
        </button>

        {/* PayPal */}
        <button
          type="button"
          className="express-btn express-btn--paypal"
          onClick={(e) => handleExpressClick('paypal', e)}
          disabled={isDisabled}
          title={lang === 'fr' ? 'Payer avec PayPal' : 'Pay with PayPal'}
          aria-label={lang === 'fr' ? 'Payer avec PayPal' : 'Pay with PayPal'}
        >
          {loadingMethod === 'paypal' ? (
            <span className="express-btn__spinner express-btn__spinner--dark" />
          ) : (
            <svg viewBox="0 0 100 32" height="22" fill="none">
              <path
                d="M20 7h6.6c3.8 0 6.6 1.8 6.1 5.8-.5 4.1-3.6 6-7.3 6h-2.4l-1.6 9.2h-4.3L20 7z"
                fill="#003087"
              />
              <path
                d="M23.6 11.2h6.2c3.5 0 6 1.6 5.6 5.2-.5 3.8-3.3 5.4-6.8 5.4h-2.2l-1.5 8.2h-4.1l2.8-18.8z"
                fill="#0079C1"
              />
              <path
                d="M23.6 16.4h2.2c3.5 0 6.3-1.6 6.8-5.4.1-.7 0-1.3-.2-1.8-1.1 3-3.6 4.7-6.8 4.7h-2.2l-.7 4.5.9-2z"
                fill="#002069"
              />
              <text
                x="39"
                y="21"
                fill="#003087"
                fontSize="14.5"
                fontWeight="800"
                fontStyle="italic"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                Pay<tspan fill="#0079C1">Pal</tspan>
              </text>
            </svg>
          )}
        </button>

        {/* Apple Pay */}
        <button
          type="button"
          className="express-btn express-btn--applepay"
          onClick={(e) => handleExpressClick('applepay', e)}
          disabled={isDisabled}
          title={lang === 'fr' ? 'Payer avec Apple Pay' : 'Pay with Apple Pay'}
          aria-label={lang === 'fr' ? 'Payer avec Apple Pay' : 'Pay with Apple Pay'}
        >
          {loadingMethod === 'applepay' ? (
            <span className="express-btn__spinner" />
          ) : (
            <svg viewBox="0 0 84 32" height="22" fill="none">
              <rect width="84" height="32" rx="4" fill="#000000" />
              <path
                d="M26.5 16.2c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8s-1.9-.8-3.1-.8c-1.6 0-3.1 1-3.9 2.4-1.7 3-.4 7.4 1.2 9.7.8 1.1 1.7 2.4 3 2.3 1.2 0 1.7-.8 3.1-.8s1.9.8 3.1.8c1.3 0 2.1-1.1 2.9-2.2 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4z"
                fill="#FFFFFF"
              />
              <path
                d="M24.8 9.2c.6-.8 1.1-1.9 1-3.1-1 0-2.2.7-2.8 1.4-.6.7-1.1 1.8-1 3 .1 0 2.1.1 2.8-1.3z"
                fill="#FFFFFF"
              />
              <text x="32" y="21.5" fill="#FFFFFF" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">
                Pay
              </text>
            </svg>
          )}
        </button>

        {/* Google Pay */}
        <button
          type="button"
          className="express-btn express-btn--googlepay"
          onClick={(e) => handleExpressClick('googlepay', e)}
          disabled={isDisabled}
          title={lang === 'fr' ? 'Payer avec Google Pay' : 'Pay with Google Pay'}
          aria-label={lang === 'fr' ? 'Payer avec Google Pay' : 'Pay with Google Pay'}
        >
          {loadingMethod === 'googlepay' ? (
            <span className="express-btn__spinner express-btn__spinner--dark" />
          ) : (
            <svg viewBox="0 0 84 32" height="22" fill="none">
              <rect width="84" height="32" rx="4" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
              {/* Google G logo */}
              <path
                d="M23.5 16.1c0-.4 0-.8-.1-1.1H18v2.2h3.1c-.1.7-.5 1.4-1.2 1.8v1.5h1.9c1.1-1 1.7-2.6 1.7-4.4z"
                fill="#4285F4"
              />
              <path
                d="M18 21.7c1.5 0 2.8-.5 3.8-1.4l-1.9-1.5c-.5.3-1.2.6-1.9.6-1.5 0-2.7-1-3.2-2.3H12.8v1.5C13.8 20.6 15.8 21.7 18 21.7z"
                fill="#34A853"
              />
              <path
                d="M14.8 17.1c-.1-.4-.2-.8-.2-1.1s.1-.8.2-1.1V13.4H12.8c-.5.9-.8 2-.8 3.1s.3 2.1.8 3.1l2-1.5z"
                fill="#FBBC05"
              />
              <path
                d="M18 12.8c.8 0 1.6.3 2.2.9l1.6-1.6C20.8 11.2 19.5 10.6 18 10.6c-2.2 0-4.2 1.2-5.2 3.1l2 1.5c.5-1.4 1.7-2.4 3.2-2.4z"
                fill="#EA4335"
              />
              {/* Pay text */}
              <text x="26" y="21.5" fill="#3C4043" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">
                Pay
              </text>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
