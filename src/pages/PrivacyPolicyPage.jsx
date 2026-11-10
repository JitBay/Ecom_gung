import { useEffect } from 'react';
import { brand } from '../data/site.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import './LegalPage.css';

export default function PrivacyPolicyPage() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? 'Politique de confidentialité | ZVAR'
        : 'Privacy Policy | ZVAR';
  }, [lang]);

  return (
    <div className="legal-page container">
      <article className="legal-content">
        {lang === 'fr' ? (
          <>
            <h1>ZVAR — Politique de confidentialité</h1>
            <p className="legal-meta"><strong>Date d'effet :</strong> 14 octobre 2026</p>
            <p>
              La présente Politique de confidentialité explique comment ZVAR collecte, utilise, stocke et protège vos données personnelles lorsque vous visitez ou passez commande sur https://www.zvar-shop.com (le « Site »).
            </p>
            <p>
              Pour toute question relative à vos données personnelles, contactez-nous à{' '}
              <a href={`mailto:${brand.privacyEmail}`}>{brand.privacyEmail}</a>.
            </p>

            <hr />

            <h2>1. Données personnelles collectées</h2>
            <p>Selon votre utilisation du Site, nous pouvons collecter :</p>
            <ul>
              <li><strong>Coordonnées :</strong> nom, prénom, adresse email, adresse de facturation et de livraison, numéro de téléphone lorsque nécessaire pour la livraison.</li>
              <li><strong>Informations de commande :</strong> articles commandés, tailles, coloris, historique de commandes, retours et remboursements.</li>
              <li><strong>Paiement :</strong> les paiements sont traités de façon chiffrée par les prestataires sécurisés de Shopify Checkout (Visa, Mastercard, American Express, Cartes Bancaires, Shop Pay, Apple Pay). Ne transmettez jamais vos numéros complets de carte par email ou messagerie.</li>
              <li><strong>Données techniques :</strong> type de navigateur, appareil, langue/pays détecté pour l'affichage du site et préférences panier.</li>
            </ul>

            <h2>2. Utilisation de vos données</h2>
            <ul>
              <li>Traiter et expédier vos commandes, gérer les échanges de taille et les remboursements (garantie 30 jours).</li>
              <li>Répondre à vos demandes via notre support client ({brand.supportEmail}).</li>
              <li>Sécuriser le Site et prévenir la fraude lors du passage en caisse.</li>
              <li>Vous envoyer nos offres promotionnelles uniquement si vous êtes inscrit à notre newsletter (désinscription possible en 1 clic à tout moment).</li>
            </ul>

            <h2>3. Shopify & Prestataires</h2>
            <p>
              Notre tunnel de paiement est hébergé sur Shopify Inc., qui traite de manière sécurisée vos commandes, paiements et adresses d'expédition. Vous pouvez consulter la politique de confidentialité de Shopify sur{' '}
              <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer">https://www.shopify.com/legal/privacy</a>.
            </p>

            <h2>4. Conservation & Sécurité</h2>
            <p>
              Nous conservons vos données uniquement pendant la durée nécessaire au traitement de votre commande et aux obligations légales comptables. Nous appliquons des mesures techniques (chiffrement SSL/TLS) afin de protéger vos informations contre tout accès non autorisé.
            </p>

            <h2>5. Vos droits (RGPD / Europe & International)</h2>
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, d'opposition et de portabilité concernant vos données personnelles. Pour exercer vos droits, écrivez à{' '}
              <a href={`mailto:${brand.privacyEmail}`}>{brand.privacyEmail}</a>. En France, vous pouvez également contacter la CNIL (<a href="https://www.cnil.fr/" target="_blank" rel="noopener noreferrer">https://www.cnil.fr/</a>).
            </p>

            <h2>6. Contact</h2>
            <p>
              <strong>ZVAR — Protection des données</strong><br />
              Email confidentialité : <a href={`mailto:${brand.privacyEmail}`}>{brand.privacyEmail}</a><br />
              Support client : <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a><br />
              Site web : https://www.zvar-shop.com
            </p>
          </>
        ) : (
          <>
            <h1>ZVAR — PRIVACY POLICY</h1>
            <p className="legal-meta"><strong>Effective date:</strong> October 14, 2026</p>
            <p>
              This Privacy Policy explains how ZVAR collects, uses, stores and protects personal information when you visit or make a purchase through https://www.zvar-shop.com (the “Site”).
            </p>
            <p>
              The Site is operated by ZVAR. For privacy-related questions, contact us at{' '}
              <a href={`mailto:${brand.privacyEmail}`}>{brand.privacyEmail}</a>.
            </p>

            <hr />

            <h2>PERSONAL INFORMATION WE COLLECT</h2>
            <p>Depending on how you interact with the Site, we may collect the following categories of personal information.</p>
            <ul>
              <li><strong>Contact information:</strong> name, email address, billing address, shipping address and telephone number where needed.</li>
              <li><strong>Order information:</strong> products purchased, selected sizes and colors, quantities, order history, delivery details, returns, refunds and customer service records.</li>
              <li><strong>Payment information:</strong> payments are processed securely through Shopify Checkout payment providers (Visa, Mastercard, American Express, Shop Pay, Apple Pay). Please do not send full payment card details to us by email or messaging.</li>
              <li><strong>Technical and browsing information:</strong> browser type, device information, country/language preference, cart activity and related technical data.</li>
              <li><strong>Communications and preferences:</strong> messages you send to our support team, product reviews you submit, and your newsletter preferences.</li>
            </ul>

            <h2>HOW WE USE PERSONAL INFORMATION</h2>
            <p>We use personal information for the following purposes:</p>
            <ul>
              <li>To process orders, payments, shipping, size exchanges, returns and refunds.</li>
              <li>To respond to customer inquiries and provide customer support.</li>
              <li>To maintain and secure the Site and help prevent fraud.</li>
              <li>To comply with legal, tax, accounting and regulatory obligations.</li>
              <li>To send marketing communications where you have subscribed or where permitted by law.</li>
            </ul>

            <h2>SHOPIFY AND SERVICE PROVIDERS</h2>
            <p>
              Our checkout and order infrastructure is powered by Shopify Inc. Shopify and our fulfillment/shipping partners process information needed to fulfill orders, verify payments, and prevent fraud. Shopify's privacy policy is available at:{' '}
              <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer">https://www.shopify.com/legal/privacy</a>.
            </p>

            <h2>DATA RETENTION & SECURITY</h2>
            <p>
              We retain personal information only for as long as reasonably necessary for order fulfillment, customer support, fraud prevention, and legal compliance. We apply technical and organizational safeguards including SSL/TLS encryption to protect your information.
            </p>

            <h2>YOUR PRIVACY RIGHTS</h2>
            <p>
              Depending on your location (including US states, the EEA, UK, or Australia), you may have the right to request access, correction, deletion, or portability of your personal data, or to opt out of marketing communications. To make a privacy request, contact{' '}
              <a href={`mailto:${brand.privacyEmail}`}>{brand.privacyEmail}</a>.
            </p>

            <h2>MARKETING CHOICES</h2>
            <p>
              You may unsubscribe from marketing emails at any time using the unsubscribe link in our emails or by contacting{' '}
              <a href={`mailto:${brand.privacyEmail}`}>{brand.privacyEmail}</a>. You may continue to receive essential order and shipping updates.
            </p>

            <h2>CONTACT US</h2>
            <p>
              <strong>ZVAR — Privacy Team</strong><br />
              Privacy email: <a href={`mailto:${brand.privacyEmail}`}>{brand.privacyEmail}</a><br />
              Support email: <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a><br />
              Website: https://www.zvar-shop.com
            </p>
            <p style={{ marginTop: 20, fontStyle: 'italic', fontWeight: 600 }}>
              ZVAR — Your Style. Your Comfort. Your Confidence.
            </p>
          </>
        )}
      </article>
    </div>
  );
}
