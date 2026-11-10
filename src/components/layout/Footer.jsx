import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import LanguageSwitcher from '../ui/LanguageSwitcher.jsx';
import { brand, payments, trustItems } from '../../data/site.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { subscribeToShopifyNewsletter } from '../../lib/shopify.js';
import './Footer.css';

function TrustBar() {
  const { lang, t } = useLanguage();
  return (
    <div className="trustbar container">
      {trustItems.map((tItem, idx) => (
        <div key={tItem.title}>
          <Icon name={tItem.icon} size={24} />
          <strong>{t(`home.trust.${idx}.title`)}</strong>
          <p>{t(`home.trust.${idx}.desc`)}</p>
        </div>
      ))}
    </div>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const { t, lang } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || !email.trim()) return;
    setError('');
    setLoading(true);
    try {
      const result = await subscribeToShopifyNewsletter(email);
      if (result.ok) {
        setDone(true);
        setEmail('');
      } else {
        setError(
          result.error === 'INVALID_EMAIL'
            ? lang === 'fr'
              ? 'Veuillez entrer une adresse e-mail valide.'
              : 'Please enter a valid email address.'
            : lang === 'fr'
              ? 'Inscription impossible pour le moment. Réessayez plus tard.'
              : 'Could not subscribe right now. Please try again shortly.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="footer__news">
      <h3>{t('footer.club_title')}</h3>
      <p>{t('footer.club_text')}</p>
      {done ? (
        <p className="footer__thanks">
          <Icon name="check" size={16} /> {t('footer.subscribed_thanks')}
        </p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('footer.email_placeholder')}
              required
              disabled={loading}
              aria-label={t('footer.email_placeholder')}
            />
            <button type="submit" disabled={loading} aria-label={t('footer.subscribe_aria')}>
              <Icon name="arrow" size={16} />
            </button>
          </form>
          {error && <p className="footer__error">{error}</p>}
        </>
      )}
    </div>
  );
}

export default function Footer() {
  const { lang, t, dict } = useLanguage();

  const columns = [
    {
      title: 'ZVAR',
      links: [
        { label: t('nav.home'), to: '/' },
        { label: t('nav.models_all'), to: '/collections/all' },
        { label: t('nav.offers'), to: '/pages/offres' },
        { label: t('nav.why_us'), to: '/pages/notre-technologie' },
        { label: t('nav.guarantee'), to: '/pages/garantie' },
        { label: t('nav.reviews'), to: '/#reviews' },
      ],
    },
    {
      title: lang === 'fr' ? 'Support & Aide' : 'Help & Support',
      links: [
        { label: lang === 'fr' ? 'Suivi de commande' : 'Track Order', to: '/pages/suivi-commande' },
        { label: lang === 'fr' ? 'Guide des tailles' : 'Size Guide', to: '/pages/guide-tailles' },
        { label: 'FAQ', to: '/#faq' },
        { label: lang === 'fr' ? 'Contactez-nous' : 'Contact Us', to: '/pages/contact' },
      ],
    },
    {
      title: lang === 'fr' ? 'Informations légales' : 'Legal Information',
      links: [
        { label: t('footer.privacy_policy'), to: '/policies/privacy-policy' },
        { label: t('footer.terms'), to: '/policies/terms-of-service' },
        { label: t('footer.refunds'), to: '/policies/refund-policy' },
        { label: t('footer.legal_notice'), to: '/policies/legal-notice' },
      ],
    },
  ];

  const policyLinks = [
    { label: t('footer.privacy_policy'), to: '/policies/privacy-policy' },
    { label: t('footer.terms'), to: '/policies/terms-of-service' },
    { label: t('footer.refunds'), to: '/policies/refund-policy' },
    { label: t('footer.legal_notice'), to: '/policies/legal-notice' },
  ];

  return (
    <>
      <TrustBar />
      <footer className="footer">
        <div className="container footer__grid">
          <Newsletter />
          {columns.map((col) => (
            <div key={col.title} className="footer__col">
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="footer__legal">
            © 2026 <strong>ZVAR</strong>. {t('footer.rights')}{' '}
            {lang === 'fr'
              ? 'Vêtements ergonomiques de compression masculine conçus pour allier confort quotidien et maintien optimal.'
              : 'Ergonomic compression wear engineered for daily posture support and confident masculine silhouettes.'}
          </p>
        </div>

        <div className="container footer__mid">
          <div className="footer__social">
            {brand.instagramUrl && (
              <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Icon name="instagram" size={20} />
              </a>
            )}
            {brand.tiktokUrl && (
              <a href={brand.tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <Icon name="tiktok" size={20} />
              </a>
            )}
            <Link to="/pages/contact" aria-label={lang === 'fr' ? 'Contacter le support ZVAR' : 'Contact ZVAR support'} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
              <Icon name="chat" size={18} />
              <span>{brand.supportEmail}</span>
            </Link>
          </div>
          <div className="footer__locale">
            <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>{dict.currency_label}</span>
            <LanguageSwitcher variant="dropdown" />
          </div>
        </div>

        <div className="container footer__bottom">
          <div>
            <p>
              © 2026, ZVAR.
            </p>
            <ul>
              {policyLinks.map((p) => (
                <li key={p.label}>
                  <Link to={p.to}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__pay" aria-label="Moyens de paiement acceptés : Visa, Mastercard, Apple Pay, American Express">
            <span className="footer__pay-card" title="Visa" aria-label="Visa">
              <svg viewBox="0 0 38 24" width="38" height="24" fill="none">
                <rect width="38" height="24" rx="4" fill="#ffffff" stroke="#e0e0e0" />
                <path
                  d="M15.4 16.5H13L14.5 7.5H17L15.4 16.5ZM21.9 7.7C21.4 7.5 20.6 7.3 19.6 7.3C17.2 7.3 15.5 8.6 15.5 10.4C15.5 11.8 16.7 12.5 17.6 13C18.5 13.5 18.8 13.8 18.8 14.2C18.8 14.8 18.1 15.1 17.4 15.1C16.3 15.1 15.6 14.9 15 14.6L14.7 14.5L14.4 16.3C15 16.6 16.1 16.8 17.2 16.8C19.8 16.8 21.5 15.5 21.5 13.6C21.5 12.5 20.8 11.6 19.3 10.9C18.4 10.4 17.9 10.1 17.9 9.6C17.9 9.1 18.5 8.7 19.4 8.7C20.2 8.7 20.8 8.9 21.3 9.1L21.5 9.2L21.9 7.7ZM27.3 7.5H25.3C24.7 7.5 24.2 7.7 23.9 8.3L20.4 16.5H23.1L23.6 15H26.9L27.2 16.5H29.6L27.3 7.5ZM24.3 13.2L25.6 9.7L26.4 13.2H24.3ZM11.6 7.5L9.2 13.6L8.9 12.3C8.5 10.8 7.2 9.2 5.7 8.4L7.8 16.5H10.5L14.5 7.5H11.6Z"
                  fill="#1434CB"
                />
              </svg>
            </span>
            <span className="footer__pay-card" title="Mastercard" aria-label="Mastercard">
              <svg viewBox="0 0 38 24" width="38" height="24" fill="none">
                <rect width="38" height="24" rx="4" fill="#ffffff" stroke="#e0e0e0" />
                <circle cx="15" cy="12" r="6" fill="#EB001B" />
                <circle cx="23" cy="12" r="6" fill="#F79E1B" fillOpacity="0.92" />
                <path d="M19 7.8a5.9 5.9 0 0 1 2.4 4.2 5.9 5.9 0 0 1-2.4 4.2 5.9 5.9 0 0 1-2.4-4.2A5.9 5.9 0 0 1 19 7.8z" fill="#FF5F00" />
              </svg>
            </span>
            <span className="footer__pay-card" title="Apple Pay" aria-label="Apple Pay">
              <svg viewBox="0 0 38 24" width="38" height="24" fill="none">
                <rect width="38" height="24" rx="4" fill="#ffffff" stroke="#e0e0e0" />
                <path
                  d="M13.2 11.4c0-1.1.6-1.8 1.3-2.3-.5-.8-1.4-.9-1.9-.8-1.1.1-2.2 0.9-2.7 0.9-.5 0-1.4-.7-2.2-.7-1.2 0-2.2.6-2.8 1.7-1.3 2.2-.3 5.4.9 7.1.6.9 1.3 1.8 2.1 1.8.8 0 1.3-.5 2.3-.5 1 0 1.4.5 2.2.5.9 0 1.6-.8 2.2-1.7.6-1 .9-1.8.9-1.9-.1 0-2.3-0.9-2.3-3.3z"
                  fill="#000000"
                />
                <path
                  d="M12 6.9c.5-.6.7-1.4.6-2.1-.6 0-1.5.5-2 1-.4.5-.7 1.3-.6 2.1.7 0 1.5-.4 2-1z"
                  fill="#000000"
                />
                <text x="16.5" y="15" fill="#000000" fontSize="8" fontWeight="600" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
                  Pay
                </text>
              </svg>
            </span>
            <span className="footer__pay-card" title="American Express" aria-label="American Express">
              <svg viewBox="0 0 38 24" width="38" height="24" fill="none">
                <rect width="38" height="24" rx="4" fill="#006FCF" stroke="#006FCF" />
                <text x="6" y="15" fill="#FFFFFF" fontSize="7" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="0.04em">
                  AMEX
                </text>
              </svg>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
