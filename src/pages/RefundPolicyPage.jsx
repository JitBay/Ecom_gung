import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import './LegalPage.css';

export default function RefundPolicyPage() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? 'Politique de Retour & Remboursement (30 jours) | Vella — Vela Labs'
        : 'Refund & Returns Policy (30 Days) | Vella — Vela Labs';
  }, [lang]);

  return (
    <div className="legal-page container">
      <nav className="pp__crumbs" aria-label={lang === 'fr' ? "Fil d'Ariane" : 'Breadcrumbs'}>
        <Link to="/">{t('nav.home')}</Link> / <span>{t('footer.refunds')}</span>
      </nav>

      <article className="legal-content">
        <h1>{lang === 'fr' ? 'Politique de Retour & Remboursement (30 Jours)' : 'Refund & Returns Policy (30 Days)'}</h1>
        <p className="legal-meta">{lang === 'fr' ? 'Dernière mise à jour : 14 octobre 2026' : 'Last updated: October 14, 2026'}</p>

        {lang === 'fr' ? (
          <>
            <p>
              Chez <strong>Vela Labs</strong> (exploité par <strong>Vella</strong>), nous appliquons une <strong>garantie satisfait ou remboursé de 30 jours</strong>.
            </p>

            <h2>1. Délai de rétractation et d’essai</h2>
            <p>
              Vous disposez d'un délai de 30 jours à compter de la date de livraison effective de votre colis pour demander un retour, un échange de taille ou un remboursement.
            </p>

            <h2>2. Conditions des retours</h2>
            <p>
              Pour bénéficier d'un retour ou d'un échange, l'article doit être propre, exempt de dommages délibérés, et retourné avec son emballage et ses étiquettes d'origine. Les essayages à domicile dans des conditions normales d'hygiène sont autorisés et encouragés.
            </p>

            <h2>3. Modalités de remboursement</h2>
            <p>
              Une fois votre colis de retour inspecté par nos équipes sous 48 heures ouvrées, le remboursement est automatiquement émis sur le moyen de paiement utilisé lors de l'achat (carte bancaire, PayPal, Apple Pay, Shop Pay). Le crédit apparaît sur votre compte sous 2 à 5 jours ouvrés selon votre établissement bancaire.
            </p>

            <h2>4. Contact</h2>
            <p>
              Pour initier un retour ou pour toute question : <code>support@velalabs.co</code>.
            </p>
          </>
        ) : (
          <>
            <p>
              At <strong>Vela Labs</strong> (operated by <strong>Vella</strong>), we offer a straightforward <strong>30-day money-back guarantee</strong> on all orders.
            </p>

            <h2>1. Trial Period and Returns Window</h2>
            <p>
              You have 30 days from the date your order is delivered to request a return, free size exchange, or full refund.
            </p>

            <h2>2. Return Guidelines</h2>
            <p>
              To qualify for a refund or exchange, items must be returned clean, undamaged, and with their original packaging and tags. Trying on the shirt at home under regular hygiene conditions is fully welcomed and encouraged.
            </p>

            <h2>3. Refund Processing</h2>
            <p>
              Once your returned package is received and inspected by our warehouse within 48 business hours, your refund is automatically issued to your original payment method (card, PayPal, Apple Pay). Credits typically appear within 2 to 5 business days.
            </p>

            <h2>4. Contact Us</h2>
            <p>
              To start a return or ask any question: <code>support@velalabs.co</code>.
            </p>
          </>
        )}
      </article>
    </div>
  );
}
