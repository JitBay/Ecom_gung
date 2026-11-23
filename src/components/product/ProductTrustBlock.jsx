import { useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import Icon from '../ui/Icon.jsx';
import './ProductTrustBlock.css';

/**
 * Calcule dynamiquement une plage de livraison estimée J+3 à J+5 jours ouvrés
 */
function getEstimatedDelivery(lang = 'fr') {
  const now = new Date();
  const addBusinessDays = (startDate, count) => {
    const d = new Date(startDate);
    let added = 0;
    while (added < count) {
      d.setDate(d.getDate() + 1);
      const day = d.getDay();
      if (day !== 0 && day !== 6) added++; // exclusion week-ends
    }
    return d;
  };

  const start = addBusinessDays(now, 3);
  const end = addBusinessDays(now, 5);

  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
  const startFmt = start.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' });
  const endFmt = end.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' });

  return `${startFmt} – ${endFmt}`;
}

export default function ProductTrustBlock({ className = '' }) {
  const { lang } = useLanguage();
  const deliveryRange = useMemo(() => getEstimatedDelivery(lang), [lang]);

  return (
    <div className={`product-trust-block ${className}`}>
      {/* 1. Date de livraison estimée & expédition */}
      <div className="product-trust-item">
        <div className="product-trust-icon product-trust-icon--green">
          <Icon name="truck" size={18} />
        </div>
        <div className="product-trust-content">
          <strong>
            {lang === 'fr' ? 'Livraison 100% Gratuite & Suivie' : 'Free Tracked Shipping'}
          </strong>
          <span>
            {lang === 'fr' ? 'Arrivée estimée chez vous : ' : 'Estimated Delivery: '}
            <span className="product-trust-date">{deliveryRange}</span>
          </span>
        </div>
      </div>

      {/* 2. Retours & Échanges gratuits sous 30 jours */}
      <div className="product-trust-item">
        <div className="product-trust-icon product-trust-icon--gold">
          <Icon name="shield" size={18} />
        </div>
        <div className="product-trust-content">
          <strong>
            {lang === 'fr' ? 'Garantie Satisfait ou Remboursé 30 Jours' : '30-Day Money-Back Guarantee'}
          </strong>
          <span>
            {lang === 'fr'
              ? 'Retours et 1er échange de taille 100% gratuits et sans tracas'
              : 'Free returns & 1st size exchange 100% free with zero hassle'}
          </span>
        </div>
      </div>

      {/* 3. Paiement 100% sécurisé */}
      <div className="product-trust-item">
        <div className="product-trust-icon product-trust-icon--blue">
          <Icon name="lock" size={18} />
        </div>
        <div className="product-trust-content">
          <strong>
            {lang === 'fr' ? 'Paiement 100% Sécurisé & Crypté SSL' : '100% Secure 256-Bit SSL Checkout'}
          </strong>
          <span>
            {lang === 'fr'
              ? 'Transactions protégées via Shopify, Apple Pay, Shop Pay & Cartes'
              : 'Protected encrypted transactions via Shopify, Apple Pay, Shop Pay & Cards'}
          </span>
        </div>
      </div>
    </div>
  );
}
