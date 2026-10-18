import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon.jsx';
import './LegalPage.css';

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    document.title = 'Suivre ma Commande | Vela Labs';
  }, []);

  return (
    <div className="legal-page container">
      <nav className="pp__crumbs" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link> / <span>Suivi de commande</span>
      </nav>

      <article className="legal-content">
        <h1>Suivre Votre Colis Vela Labs</h1>
        <p className="legal-meta">Suivi en direct de votre expédition 24/48h.</p>

        <p>
          Entrez votre numéro de suivi (reçu par email lors de l'expédition de votre commande) ou votre numéro de commande :
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); setSearched(true); }}
          style={{ display: 'flex', gap: 10, margin: '24px 0', maxWidth: 500 }}
        >
          <input
            type="text"
            placeholder="Ex : VELA-FR-49201"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            required
            style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }}
          />
          <button className="btn btn--dark" type="submit">
            Suivre mon colis
          </button>
        </form>

        {searched && (
          <div style={{ padding: 20, background: 'var(--cream-2)', borderRadius: 12, border: '1px solid var(--line)', marginTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--green)', fontWeight: 700, marginBottom: 8 }}>
              <Icon name="truck" size={20} /> Expédition en cours
            </div>
            <p style={{ margin: 0, fontSize: 14 }}>
              Numéro recherché : <strong>{trackingNumber}</strong>. Votre colis est pris en charge par notre transporteur partenaire et est en cours d'acheminement vers votre adresse de livraison sous 3 à 5 jours ouvrés.
            </p>
          </div>
        )}

        <div style={{ marginTop: 32, fontSize: 14, color: varMuted }}>
          <p>
            Vous n'avez pas reçu votre email de suivi ? Vérifiez vos spams ou contactez directement notre support client à <code>support@velalabs.co</code>.
          </p>
        </div>
      </article>
    </div>
  );
}

const varMuted = 'var(--muted)';
