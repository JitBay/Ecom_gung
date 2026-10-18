import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

export default function RefundPolicyPage() {
  useEffect(() => {
    document.title = 'Politique de Retour & Remboursement (30 jours) | Vella — Vela Labs';
  }, []);

  return (
    <div className="legal-page container">
      <nav className="pp__crumbs" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link> / <span>Politique de Retour & Remboursement</span>
      </nav>

      <article className="legal-content">
        <h1>Politique de Retour & Remboursement (30 Jours)</h1>
        <p className="legal-meta">Dernière mise à jour : 14 octobre 2026</p>

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
      </article>
    </div>
  );
}
