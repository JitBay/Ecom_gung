import { useEffect } from 'react';
import { brand } from '../data/site.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import './LegalPage.css';

export default function LegalNoticePage() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? 'Mentions légales | ZVAR'
        : 'Legal Notice | ZVAR';
  }, [lang]);

  return (
    <div className="legal-page container">
      <article className="legal-content">
        {lang === 'fr' ? (
          <>
            <h1>Mentions légales</h1>
            <p className="legal-meta">Informations réglementaires concernant l'éditeur du site.</p>

            <h2>1. Éditeur de la boutique</h2>
            <p>
              <strong>Marque commerciale :</strong> ZVAR<br />
              <strong>Site officiel :</strong> https://www.zvar-shop.com<br />
              <strong>Email support client :</strong> <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a><br />
              <strong>Email protection des données :</strong> <a href={`mailto:${brand.privacyEmail}`}>{brand.privacyEmail}</a>
            </p>

            <h2>2. Hébergement & Paiement</h2>
            <p>
              La boutique en ligne est propulsée sur les infrastructures sécurisées de Shopify Inc. et Vercel Inc.<br />
              Shopify Inc., 151 O'Connor Street, Ground floor, Ottawa, Ontario, K2P 2L8, Canada.<br />
              Téléphone Shopify : +1-888-746-7439
            </p>

            <h2>3. Propriété intellectuelle</h2>
            <p>
              L'ensemble des éléments visuels, textuels, photographiques et graphiques composant le site, y compris la marque ZVAR et la gamme Vela Sculpt™, sont protégés par le droit de la propriété intellectuelle. Toute reproduction non autorisée est strictement interdite.
            </p>
          </>
        ) : (
          <>
            <h1>Legal Notice</h1>
            <p className="legal-meta">Regulatory information regarding the operator of zvar-shop.com.</p>

            <h2>1. Store Operator</h2>
            <p>
              <strong>Brand Name:</strong> ZVAR<br />
              <strong>Official Website:</strong> https://www.zvar-shop.com<br />
              <strong>Customer Support Email:</strong> <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a><br />
              <strong>Privacy Contact Email:</strong> <a href={`mailto:${brand.privacyEmail}`}>{brand.privacyEmail}</a>
            </p>

            <h2>2. Hosting & Infrastructure</h2>
            <p>
              This online store and checkout are powered on secure cloud infrastructure provided by Vercel Inc. and Shopify Inc.<br />
              Shopify Inc., 151 O'Connor Street, Ground floor, Ottawa, Ontario, K2P 2L8, Canada.<br />
              Shopify Phone: +1-888-746-7439
            </p>

            <h2>3. Intellectual Property</h2>
            <p>
              All visual, textual, photographic, and graphic assets on this website, including the ZVAR brand and Vela Sculpt™ product line, are protected by intellectual property law. Unauthorized reproduction or distribution is strictly prohibited.
            </p>
          </>
        )}
      </article>
    </div>
  );
}
