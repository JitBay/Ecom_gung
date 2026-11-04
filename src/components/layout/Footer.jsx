import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import LanguageSwitcher from '../ui/LanguageSwitcher.jsx';
import { brand, payments, trustItems } from '../../data/site.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
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
  const [done, setDone] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="footer__news">
      <h3>{t('footer.club_title')}</h3>
      <p>{t('footer.club_text')}</p>
      {done ? (
        <p className="footer__thanks">
          <Icon name="check" size={16} /> {t('footer.subscribed_thanks')}
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <input
            type="email"
            placeholder={t('footer.email_placeholder')}
            required
            aria-label={t('footer.email_placeholder')}
          />
          <button aria-label={t('footer.subscribe_aria')}>
            <Icon name="arrow" size={16} />
          </button>
        </form>
      )}
    </div>
  );
}

export default function Footer() {
  const { lang, t, dict } = useLanguage();

  const columns = [
    {
      title: 'Vela Labs',
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
                    {l.to.startsWith('/#') ? <a href={l.to.slice(1)}>{l.label}</a> : <Link to={l.to}>{l.label}</Link>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="footer__legal">
            © 2026 <strong>{brand.name} Labs</strong> (Legal entity: {brand.legalName}). {t('footer.rights')}{' '}
            {lang === 'fr'
              ? 'Vêtements ergonomiques de compression masculine conçus pour allier confort quotidien et maintien optimal.'
              : 'Ergonomic compression wear engineered for daily posture support and confident masculine silhouettes.'}
          </p>
        </div>

        <div className="container footer__mid">
          <div className="footer__social">
            <a href="#" aria-label="Instagram">
              <Icon name="instagram" size={20} />
            </a>
            <a href="#" aria-label="TikTok">
              <Icon name="tiktok" size={20} />
            </a>
          </div>
          <div className="footer__locale">
            <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>{dict.currency_label}</span>
            <LanguageSwitcher variant="dropdown" />
          </div>
        </div>

        <div className="container footer__bottom">
          <div>
            <p>
              © 2026, {brand.name} Labs — {brand.legalName}.
            </p>
            <ul>
              {policyLinks.map((p) => (
                <li key={p.label}>
                  <Link to={p.to}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="footer__pay">
            {payments.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
