import { useEffect } from 'react';
import { brand } from '../data/site.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import './LegalPage.css';

export default function TermsPage() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? 'Conditions générales de vente | ZVAR'
        : 'Terms of Service | ZVAR';
  }, [lang]);

  return (
    <div className="legal-page container">
      <article className="legal-content">
        {lang === 'fr' ? (
          <>
            <h1>Conditions générales de vente (CGV)</h1>
            <p className="legal-meta">Entité légale : ZVAR | Marque commerciale : ZVAR</p>

            <h2>Article 1 — Objet & Champ d'application</h2>
            <p>
              Les présentes Conditions générales de vente régissent l'ensemble des ventes conclues sur le site internet de ZVAR (https://www.zvar-shop.com), auprès de consommateurs finaux.
            </p>

            <h2>Article 2 — Produits & disponibilité</h2>
            <p>
              Les produits proposés sont des sous-vêtements ergonomiques de compression pour hommes (gamme Vela Sculpt™). Les photographies et descriptifs sont présentés avec la plus grande exactitude possible.
            </p>

            <h2>Article 3 — Prix & paiement sécurisé</h2>
            <p>
              Les prix sont indiqués en dollars américains ($ USD). Le règlement des achats s'effectue au comptant lors de la commande par carte bancaire (Visa, MasterCard, American Express, Cartes Bancaires), Shop Pay, Apple Pay ou PayPal. Les transactions bénéficient d'un chiffrement SSL 256 bits via Shopify Payments et PayPal.
            </p>

            <h2>Article 4 — Livraison</h2>
            <p>
              Les commandes sont préparées et expédiées sous 24 à 48 heures ouvrées. Les délais moyens de livraison constatés sont de 6 à 12 jours ouvrés avec un suivi complet en direct (Full Tracking). La livraison est 100% gratuite pour toutes les commandes.
            </p>

            <h2>Article 5 — Garantie commerciale de 30 jours</h2>
            <p>
              Conformément à nos engagements de satisfaction, le client bénéficie d'une garantie satisfait ou remboursé de 30 jours à compter de la réception de son colis pour évaluer le produit et demander un remboursement ou un échange via <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>.
            </p>
          </>
        ) : (
          <>
            <h1>Terms of Service</h1>
            <p className="legal-meta">Brand: ZVAR | Official Store: https://www.zvar-shop.com</p>

            <h2>1. Scope of Application</h2>
            <p>
              These Terms of Service govern all purchases placed through the ZVAR online store (https://www.zvar-shop.com) by retail customers.
            </p>

            <h2>2. Products & Availability</h2>
            <p>
              Our catalog features ergonomic compression shapewear for men (Vela Sculpt™ collection). Product photographs, sizing charts, and technical specifications are presented as accurately as possible.
            </p>

            <h2>3. Pricing & Secure Checkout</h2>
            <p>
              Prices are listed in US Dollars ($ USD) unless otherwise displayed at checkout. Payment is collected at the time of order via Credit/Debit Card (Visa, Mastercard, American Express), Shop Pay, Apple Pay, or PayPal. All transactions are encrypted with 256-bit SSL via Shopify Payments and PayPal.
            </p>

            <h2>4. Shipping & Delivery</h2>
            <p>
              Orders are processed and dispatched within 24 to 48 business hours. Estimated delivery time is 6 to 12 working days with full live carrier tracking. Tracked shipping is 100% free on all orders.
            </p>

            <h2>5. 30-Day Money-Back Guarantee</h2>
            <p>
              All orders are covered by our 30-day satisfaction guarantee starting from the date of delivery. To initiate a free size exchange or refund, contact our team at <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>.
            </p>
          </>
        )}
      </article>
    </div>
  );
}
