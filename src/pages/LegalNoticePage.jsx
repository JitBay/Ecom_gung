import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

export default function LegalNoticePage() {
  useEffect(() => {
    document.title = 'Mentions Légales | Vella — Vela Labs';
  }, []);

  return (
    <div className="legal-page container">
      <nav className="pp__crumbs" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link> / <span>Mentions Légales</span>
      </nav>

      <article className="legal-content">
        <h1>Mentions Légales</h1>
        <p className="legal-meta">Informations réglementaires concernant l'exploitant du site.</p>

        <h2>1. Éditeur de la plateforme</h2>
        <p>
          <strong>Nom commercial :</strong> Vela Labs<br />
          <strong>Raison sociale / Entité légale :</strong> Vella<br />
          <strong>Adresse de l'entité :</strong> [FULL BUSINESS ADDRESS]<br />
          <strong>Email support :</strong> support@velalabs.co<br />
          <strong>Email confidentialité :</strong> privacy@velalabs.co
        </p>

        <h2>2. Hébergement</h2>
        <p>
          Le présent site e-commerce est hébergé sur les infrastructures sécurisées de Shopify Inc.<br />
          Shopify Inc., 151 O'Connor Street, Ground floor, Ottawa, Ontario, K2P 2L8, Canada.<br />
          Téléphone : +1-888-746-7439
        </p>

        <h2>3. Propriété intellectuelle</h2>
        <p>
          L'ensemble des éléments visuels, textuels, photographiques et sonores composant le site, y compris la marque Vela Labs et le modèle Vela Sculpt™, sont protégés par le droit de la propriété intellectuelle. Toute reproduction non autorisée est strictement interdite.
        </p>
      </article>
    </div>
  );
}
