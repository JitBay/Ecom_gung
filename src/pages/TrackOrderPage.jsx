import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon.jsx';
import { brand } from '../data/site.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import './LegalPage.css';

const SHOPIFY_ACCOUNT_URL = 'https://account.zvar-shop.com';

function classifyTrackingQuery(raw) {
  const cleaned = raw.trim().replace(/\s+/g, '');
  const strippedHash = cleaned.replace(/^#/, '');

  if (!/^[a-zA-Z0-9-]{4,}$/.test(strippedHash)) {
    return { type: 'invalid', code: cleaned };
  }
  if (/^\d{4,6}$/.test(strippedHash) || /^ZVAR-/i.test(strippedHash)) {
    return { type: 'order', code: `#${strippedHash}` };
  }
  if (strippedHash.length >= 8) {
    return { type: 'carrier', code: strippedHash };
  }
  return { type: 'invalid', code: cleaned };
}

export default function TrackOrderPage() {
  const { lang } = useLanguage();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? 'Suivre ma Commande | ZVAR'
        : 'Track Your Order | ZVAR';
  }, [lang]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(classifyTrackingQuery(trackingNumber));
  };

  const track17Url =
    result?.type === 'carrier'
      ? `https://t.17track.net/${lang === 'fr' ? 'fr' : 'en'}#nums=${encodeURIComponent(result.code)}`
      : '';
  const parcelsUrl =
    result?.type === 'carrier'
      ? `https://parcelsapp.com/${lang === 'fr' ? 'fr' : 'en'}/tracking/${encodeURIComponent(result.code)}`
      : '';
  const accountUrl = `${SHOPIFY_ACCOUNT_URL}?locale=${lang === 'fr' ? 'fr' : 'en'}`;

  return (
    <div className="legal-page container">
      <article className="legal-content">
        <h1>{lang === 'fr' ? 'Suivre Votre Colis ZVAR' : 'Track Your ZVAR Package'}</h1>
        <p className="legal-meta">
          {lang === 'fr'
            ? 'Expédition sous 24/48h · Livraison suivie en 6 à 12 jours ouvrés.'
            : 'Dispatched within 24/48h · Tracked delivery in 6 to 12 working days.'}
        </p>

        <p>
          {lang === 'fr'
            ? "Entrez votre numéro de suivi transporteur reçu par email dès l'expédition ou votre numéro de commande :"
            : 'Enter your carrier tracking number from your shipping confirmation email or your order number :'}
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '24px 0', maxWidth: 540 }}
        >
          <input
            type="text"
            placeholder={lang === 'fr' ? 'Ex : YT261234567890 ou #1001' : 'e.g. YT261234567890 or #1001'}
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            required
            style={{ flex: '1 1 240px', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }}
          />
          <button className="btn btn--dark" type="submit">
            {lang === 'fr' ? 'Rechercher' : 'Track order'}
          </button>
        </form>

        {result?.type === 'invalid' && (
          <div style={{ padding: 18, background: '#fef2f2', borderRadius: 12, border: '1px solid #fecaca', color: '#991b1b', marginTop: 16 }}>
            <p style={{ margin: 0, fontSize: 14 }}>
              {lang === 'fr'
                ? 'Format non reconnu. Veuillez saisir un numéro de suivi transporteur valide (8 caractères minimum) ou un numéro de commande Shopify (ex. #1001).'
                : 'Invalid format. Please enter a valid carrier tracking number (at least 8 characters) or a Shopify order number (e.g. #1001).'}
            </p>
          </div>
        )}

        {result?.type === 'carrier' && (
          <div style={{ padding: 20, background: 'var(--cream-2)', borderRadius: 12, border: '1px solid var(--line)', marginTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--green)', fontWeight: 700, marginBottom: 8 }}>
              <Icon name="truck" size={20} />{' '}
              {lang === 'fr' ? `Suivi en direct pour ${result.code}` : `Live tracking for ${result.code}`}
            </div>
            <p style={{ margin: '0 0 16px', fontSize: 14 }}>
              {lang === 'fr'
                ? 'Consultez la progression exacte de votre colis en temps réel auprès de notre réseau de transporteurs internationaux :'
                : 'View real-time transit updates for your parcel across our international carrier network:'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <a href={track17Url} target="_blank" rel="noopener noreferrer" className="btn btn--dark">
                {lang === 'fr' ? 'Suivre sur 17TRACK' : 'Track on 17TRACK'} <Icon name="arrow" size={14} />
              </a>
              <a href={parcelsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                {lang === 'fr' ? 'Voir sur Parcelsapp' : 'View on Parcelsapp'}
              </a>
            </div>
          </div>
        )}

        {result?.type === 'order' && (
          <div style={{ padding: 20, background: 'var(--cream-2)', borderRadius: 12, border: '1px solid var(--line)', marginTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, marginBottom: 8 }}>
              <Icon name="shield" size={20} />{' '}
              {lang === 'fr' ? `Commande ${result.code}` : `Order ${result.code}`}
            </div>
            <p style={{ margin: '0 0 16px', fontSize: 14 }}>
              {lang === 'fr'
                ? 'Pour protéger vos données personnelles, le suivi officiel et votre numéro de colis sont disponibles dans votre espace client sécurisé Shopify (connexion rapide par code reçu par email).'
                : 'To protect your privacy, live order status and carrier tracking numbers are available in your secure Shopify customer portal (instant login via email code).'}
            </p>
            <a href={accountUrl} target="_blank" rel="noopener noreferrer" className="btn btn--dark">
              {lang === 'fr' ? 'Accéder à ma commande Shopify' : 'Open Shopify Order Portal'} <Icon name="arrow" size={14} />
            </a>
          </div>
        )}

        <div style={{ padding: 20, background: 'var(--sand-light, #fbf9f6)', borderRadius: 12, border: '1px solid var(--line)', marginTop: 28 }}>
          <strong style={{ display: 'block', marginBottom: 6 }}>
            {lang === 'fr' ? 'Vous avez déjà passé commande ?' : 'Already placed an order?'}
          </strong>
          <p style={{ margin: '0 0 14px', fontSize: 14, color: 'var(--muted)' }}>
            {lang === 'fr'
              ? 'Connectez-vous en 10 secondes avec votre email d’achat pour retrouver toutes vos commandes et liens de suivi officiels.'
              : 'Sign in with your checkout email in seconds to see all your ZVAR orders and official tracking links.'}
          </p>
          <a href={accountUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
            {lang === 'fr' ? 'Voir mon historique de commandes' : 'View My Order History'}
          </a>
        </div>

        <div style={{ marginTop: 28, fontSize: 14, color: 'var(--muted)' }}>
          <p>
            {lang === 'fr' ? (
              <>
                Pas encore reçu votre lien de suivi après 48h ouvrées ? Contactez notre équipe via{' '}
                <Link to="/pages/contact" style={{ textDecoration: 'underline' }}>notre page Contact</Link> ou à{' '}
                <code>{brand.supportEmail}</code>.
              </>
            ) : (
              <>
                Haven't received your tracking email after 48 business hours? Reach us via our{' '}
                <Link to="/pages/contact" style={{ textDecoration: 'underline' }}>Contact page</Link> or at{' '}
                <code>{brand.supportEmail}</code>.
              </>
            )}
          </p>
        </div>
      </article>
    </div>
  );
}
