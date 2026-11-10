import { useState } from 'react';
import { redirectToShopifyCheckout } from '../../lib/shopify.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './ShopifyBuyButton.css';

/**
 * ShopifyBuyButton - Express Direct Checkout Component
 *
 * Bypasses the intermediate cart drawer and redirects directly
 * to Shopify's hosted secure checkout with the configured line item.
 */
export default function ShopifyBuyButton({
  lineItem,
  label,
  className = '',
  discountCode = '',
  onBeforeRedirect,
  variant = 'express',
  disabled = false,
  loading: externalLoading = false,
  onClick,
  ariaLabel,
  paymentMethod = 'shopify_express',
  renderContent,
}) {
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(false);

  const isBusy = Boolean(loading || externalLoading);
  const hasLineItems = Array.isArray(lineItem) ? lineItem.length > 0 : Boolean(lineItem);
  const isDisabled = Boolean(disabled || isBusy || (!onClick && !hasLineItems));

  const handleClick = async (e) => {
    e.preventDefault();
    if (isDisabled) return;

    if (onBeforeRedirect) {
      onBeforeRedirect();
    }

    if (onClick) {
      await onClick(e);
      return;
    }

    setLoading(true);
    try {
      const items = Array.isArray(lineItem) ? lineItem : [lineItem];
      await redirectToShopifyCheckout(items, { discount: discountCode });
    } catch (err) {
      console.error('[ShopifyBuyButton] Redirection error:', err);
    } finally {
      setLoading(false);
    }
  };

  const defaultLabel =
    lang === 'fr' ? 'Acheter maintenant — Paiement sécurisé' : 'Buy Now — Secure Checkout';

  const variantClass = variant === 'apple-pay' ? 'shopify-buy-btn--apple-pay' : '';

  return (
    <button
      type="button"
      className={`shopify-buy-btn ${variantClass} ${className} ${isBusy ? 'is-loading' : ''}`}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      data-payment-method={paymentMethod}
    >
      {renderContent ? (
        <>
          {isBusy && <span className="shopify-buy-btn__spinner" />}
          {renderContent(isBusy)}
        </>
      ) : (
        <>
          {isBusy ? (
            <span className="shopify-buy-btn__spinner" />
          ) : (
            <svg
              className="shopify-buy-btn__icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}
          <span className="shopify-buy-btn__text">
            {isBusy
              ? lang === 'fr'
                ? 'Redirection vers Shopify...'
                : 'Redirecting to Shopify...'
              : label || defaultLabel}
          </span>
        </>
      )}
    </button>
  );
}
