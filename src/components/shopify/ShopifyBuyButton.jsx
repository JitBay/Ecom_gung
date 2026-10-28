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
}) {
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (onBeforeRedirect) {
      onBeforeRedirect();
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
    lang === 'fr' ? 'Acheter maintenant — Paiement Sécurisé' : 'Buy Now — Secure Checkout';

  return (
    <button
      type="button"
      className={`shopify-buy-btn ${className} ${loading ? 'is-loading' : ''}`}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
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
        {loading
          ? lang === 'fr'
            ? 'Redirection vers Shopify...'
            : 'Redirecting to Shopify...'
          : label || defaultLabel}
      </span>
    </button>
  );
}
