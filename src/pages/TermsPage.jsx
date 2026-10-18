import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Conditions Générales de Vente | Vella — Vela Labs';
  }, []);

  return (
    <div className="legal-page container">
      <nav className="pp__crumbs" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link> / <span>Conditions Générales de Vente</span>
      </nav>

      <article className="legal-content">
        <h1>Conditions Générales de Vente (CGV)</h1>
        <p className="legal-meta">Entité légale : Vella | Marque commerciale : Vela Labs</p>

        <h2>Article 1 — Objet & Champ d'application</h2>
        <p>
          Les présentes Conditions Générales de Vente régissent l'ensemble des ventes conclues sur le site internet de Vela Labs, exploité par la société <strong>Vella</strong>, auprès de consommateurs finaux.
        </p>

        <h2>Article 2 — Produits & Disponibilité</h2>
        <p>
          Les produits proposés sont des sous-vêtements ergonomiques de compression pour hommes (gamme Vela Sculpt™). Les photographies et descriptifs sont présentés avec la plus grande exactitude possible.
        </p>

        <h2>Article 3 — Prix & Paiement sécurisé</h2>
        <p>
          Les prix sont indiqués en Euros (€) toutes taxes comprises (TTC). Le règlement des achats s'effectue au comptant lors de la commande par carte bancaire (Visa, MasterCard, American Express), Shop Pay, Apple Pay ou PayPal. Les transactions bénéficient d'un protocole de chiffrement SSL 256 bits.
        </p>

        <h2>Article 4 — Livraison</h2>
        <p>
          Les commandes sont expédiées sous 24 à 48 heures ouvrées. Les délais moyens de livraison constatés en France métropolitaine et en Europe sont de 3 à 5 jours ouvrés.
        </p>

        <h2>Article 5 — Garantie Commerciale de 30 Jours</h2>
        <p>
          Conformément à nos engagements de satisfaction, le client bénéficie d'une garantie satisfait ou remboursé de 30 jours à compter de la réception de son colis pour évaluer le produit et demander un remboursement ou un échange.
        </p>
      </article>
    </div>
  );
}
