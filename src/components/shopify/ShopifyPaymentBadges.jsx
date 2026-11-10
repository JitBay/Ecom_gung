import './ShopifyPaymentBadges.css';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function ShopifyPaymentBadges({ className = '', showSecurityNote = true }) {
  const { lang } = useLanguage();

  return (
    <div className={`shopify-badges ${className}`}>
      <div className="shopify-badges__icons" aria-label={lang === 'fr' ? 'Moyens de paiement acceptés' : 'Accepted payment methods'}>
        {/* Apple Pay */}
        <span className="shopify-badge" title="Apple Pay">
          <svg viewBox="0 0 38 24" width="38" height="24" fill="none">
            <rect width="38" height="24" rx="4" fill="#000000" />
            <path
              d="M12.9 11.2C12.9 9.9 13.6 9.1 14.4 8.5C13.8 7.6 12.8 7.4 12.3 7.4C11.1 7.2 9.8 8.1 9.2 8.1C8.6 8.1 7.6 7.4 6.7 7.4C5.4 7.4 4.2 8.1 3.5 9.3C2.1 11.7 3.2 15.2 4.6 17.1C5.2 18.1 6 19.2 7 19.1C8 19.1 8.4 18.5 9.6 18.5C10.7 18.5 11.1 19.1 12.1 19.1C13.2 19.1 13.9 18.1 14.5 17.1C15.3 16 15.6 15 15.6 14.9C15.6 14.8 12.9 13.8 12.9 11.2Z"
              fill="#FFFFFF"
            />
            <path
              d="M11.6 6.3C12.1 5.7 12.4 4.8 12.3 4C11.6 4 10.6 4.5 10.1 5.1C9.7 5.6 9.3 6.5 9.4 7.3C10.2 7.4 11.1 6.9 11.6 6.3Z"
              fill="#FFFFFF"
            />
            <text x="17.5" y="15" fill="#FFFFFF" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">
              Pay
            </text>
          </svg>
        </span>

        {/* Shop Pay */}
        <span className="shopify-badge" title="Shop Pay">
          <svg viewBox="0 0 38 24" width="38" height="24" fill="none">
            <rect width="38" height="24" rx="4" fill="#5A31F4" />
            <text x="5" y="14.5" fill="#FFFFFF" fontSize="8.5" fontWeight="800" fontFamily="sans-serif">
              shop
            </text>
            <text x="27" y="14.5" fill="#FFFFFF" fontSize="6.5" fontWeight="600" fontFamily="sans-serif" opacity="0.9">
              Pay
            </text>
          </svg>
        </span>

        {/* Visa */}
        <span className="shopify-badge" title="Visa">
          <svg viewBox="0 0 38 24" width="38" height="24" fill="none">
            <rect width="38" height="24" rx="4" fill="#1434CB" />
            <path
              d="M15.4 16.5H13L14.5 7.5H17L15.4 16.5ZM21.9 7.7C21.4 7.5 20.6 7.3 19.6 7.3C17.2 7.3 15.5 8.6 15.5 10.4C15.5 11.8 16.7 12.5 17.6 13C18.5 13.5 18.8 13.8 18.8 14.2C18.8 14.8 18.1 15.1 17.4 15.1C16.3 15.1 15.6 14.9 15 14.6L14.7 14.5L14.4 16.3C15 16.6 16.1 16.8 17.2 16.8C19.8 16.8 21.5 15.5 21.5 13.6C21.5 12.5 20.8 11.6 19.3 10.9C18.4 10.4 17.9 10.1 17.9 9.6C17.9 9.1 18.5 8.7 19.4 8.7C20.2 8.7 20.8 8.9 21.3 9.1L21.5 9.2L21.9 7.7ZM27.3 7.5H25.3C24.7 7.5 24.2 7.7 23.9 8.3L20.4 16.5H23.1L23.6 15H26.9L27.2 16.5H29.6L27.3 7.5ZM24.3 13.2L25.6 9.7L26.4 13.2H24.3ZM11.6 7.5L9.2 13.6L8.9 12.3C8.5 10.8 7.2 9.2 5.7 8.4L7.8 16.5H10.5L14.5 7.5H11.6Z"
              fill="#FFFFFF"
            />
          </svg>
        </span>

        {/* Mastercard */}
        <span className="shopify-badge" title="Mastercard">
          <svg viewBox="0 0 38 24" width="38" height="24" fill="none">
            <rect width="38" height="24" rx="4" fill="#252525" />
            <circle cx="15" cy="12" r="7" fill="#EB001B" />
            <circle cx="23" cy="12" r="7" fill="#F79E1B" fillOpacity="0.9" />
          </svg>
        </span>

        {/* American Express */}
        <span className="shopify-badge" title="American Express">
          <svg viewBox="0 0 38 24" width="38" height="24" fill="none">
            <rect width="38" height="24" rx="4" fill="#006FCF" />
            <text x="5" y="15" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
              AMEX
            </text>
          </svg>
        </span>
      </div>

      {showSecurityNote && (
        <p className="shopify-badges__note">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zm-3 5c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm3 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
          </svg>
          {lang === 'fr'
            ? 'Paiement 100% sécurisé via Apple Pay, Shop Pay & Cartes (SSL 256 bits)'
            : '100% Secure Checkout via Apple Pay, Shop Pay & Cards (256-bit SSL)'}
        </p>
      )}
    </div>
  );
}
