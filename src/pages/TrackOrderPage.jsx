import { useEffect, useState } from 'react';
import Icon from '../components/ui/Icon.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import './LegalPage.css';

export default function TrackOrderPage() {
  const { lang, t } = useLanguage();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? 'Suivre ma Commande | Vela Labs'
        : 'Track Your Order | Vela Labs';
  }, [lang]);

  return (
    <div className="legal-page container">

      <article className="legal-content">
        <h1>{lang === 'fr' ? 'Suivre Votre Colis Vela Labs' : 'Track Your Vela Labs Package'}</h1>
        <p className="legal-meta">
          {lang === 'fr'
            ? 'Suivi en direct de votre expédition 24/48h.'
            : 'Live 24/48h dispatch & delivery tracking.'}
        </p>

        <p>
          {lang === 'fr'
            ? "Entrez votre numéro de suivi (reçu par email lors de l'expédition de votre commande) ou votre numéro de commande :"
            : 'Enter your tracking number (from your dispatch confirmation email) or order ID:'}
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); setSearched(true); }}
          style={{ display: 'flex', gap: 10, margin: '24px 0', maxWidth: 500 }}
        >
          <input
            type="text"
            placeholder={lang === 'fr' ? 'Ex : VELA-FR-49201' : 'e.g. VELA-EN-49201'}
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            required
            style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }}
          />
          <button className="btn btn--dark" type="submit">
            {lang === 'fr' ? 'Suivre mon colis' : 'Track package'}
          </button>
        </form>

        {searched && (
          <div style={{ padding: 20, background: 'var(--cream-2)', borderRadius: 12, border: '1px solid var(--line)', marginTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--green)', fontWeight: 700, marginBottom: 8 }}>
              <Icon name="truck" size={20} /> {lang === 'fr' ? 'Expédition en cours' : 'Dispatched / In transit'}
            </div>
            <p style={{ margin: 0, fontSize: 14 }}>
              {lang === 'fr' ? (
                <>
                  Numéro recherché : <strong>{trackingNumber}</strong>. Votre colis est pris en charge par notre transporteur partenaire et est en cours d'acheminement vers votre adresse de livraison sous 3 à 5 jours ouvrés.
                </>
              ) : (
                <>
                  Searched number: <strong>{trackingNumber}</strong>. Your package is in transit with our logistics carrier and is on its way to your delivery address within 3 to 5 business days.
                </>
              )}
            </p>
          </div>
        )}

        <div style={{ marginTop: 32, fontSize: 14, color: varMuted }}>
          <p>
            {lang === 'fr' ? (
              <>
                Vous n'avez pas reçu votre email de suivi ? Vérifiez vos spams ou contactez directement notre support client à <code>support@velalabs.co</code>.
              </>
            ) : (
              <>
                Can't find your tracking email? Check your spam folder or email our support team at <code>support@velalabs.co</code>.
              </>
            )}
          </p>
        </div>
      </article>
    </div>
  );
}

const varMuted = 'var(--muted)';
