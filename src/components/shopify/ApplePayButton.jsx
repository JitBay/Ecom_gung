import { useLanguage } from '../../context/LanguageContext.jsx';
import ShopifyBuyButton from './ShopifyBuyButton.jsx';

/**
 * ApplePayButton - Express Apple Pay checkout button routed to Shopify Checkout.
 */
export default function ApplePayButton({
  lineItem,
  className = '',
  discountCode = '',
  onBeforeRedirect,
  onClick,
  loading = false,
  disabled = false,
}) {
  const { lang } = useLanguage();
  const ariaLabel =
    lang === 'fr'
      ? 'Acheter maintenant avec Apple Pay'
      : 'Buy now with Apple Pay';

  return (
    <ShopifyBuyButton
      lineItem={lineItem}
      variant="apple-pay"
      className={className}
      discountCode={discountCode}
      onBeforeRedirect={onBeforeRedirect}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      ariaLabel={ariaLabel}
      paymentMethod="apple_pay"
      renderContent={(isBusy) => (
        <span className="shopify-buy-btn__text shopify-apple-pay__content">
          {isBusy ? (
            lang === 'fr' ? 'Ouverture Apple Pay...' : 'Opening Apple Pay...'
          ) : (
            <>
              <span className="shopify-apple-pay__prefix">
                {lang === 'fr' ? 'Acheter avec' : 'Buy with'}
              </span>
              <span className="shopify-apple-pay__mark" aria-hidden="true">
                <svg viewBox="2 3.5 14 16" width="15" height="17" fill="currentColor">
                  <path d="M12.9 11.2C12.9 9.9 13.6 9.1 14.4 8.5C13.8 7.6 12.8 7.4 12.3 7.4C11.1 7.2 9.8 8.1 9.2 8.1C8.6 8.1 7.6 7.4 6.7 7.4C5.4 7.4 4.2 8.1 3.5 9.3C2.1 11.7 3.2 15.2 4.6 17.1C5.2 18.1 6 19.2 7 19.1C8 19.1 8.4 18.5 9.6 18.5C10.7 18.5 11.1 19.1 12.1 19.1C13.2 19.1 13.9 18.1 14.5 17.1C15.3 16 15.6 15 15.6 14.9C15.6 14.8 12.9 13.8 12.9 11.2Z" />
                  <path d="M11.6 6.3C12.1 5.7 12.4 4.8 12.3 4C11.6 4 10.6 4.5 10.1 5.1C9.7 5.6 9.3 6.5 9.4 7.3C10.2 7.4 11.1 6.9 11.6 6.3Z" />
                </svg>
                <span>Pay</span>
              </span>
            </>
          )}
        </span>
      )}
    />
  );
}
