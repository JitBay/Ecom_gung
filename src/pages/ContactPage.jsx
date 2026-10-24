import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon.jsx';
import { brand } from '../data/site.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import './LegalPage.css';

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? 'Contactez-nous | Vela Labs Support'
        : 'Contact Us | Vela Labs Support';
  }, [lang]);

  return (
    <div className="legal-page container">
      <nav className="pp__crumbs" aria-label={lang === 'fr' ? "Fil d'Ariane" : 'Breadcrumbs'}>
        <Link to="/">{t('nav.home')}</Link> / <span>Contact</span>
      </nav>

      <article className="legal-content">
        <h1>{lang === 'fr' ? "Contactez l'Équipe Vela Labs" : 'Contact the Vela Labs Team'}</h1>
        <p className="legal-meta">
          {lang === 'fr' ? 'Nous sommes à votre écoute 7 jours sur 7.' : 'Here to help 7 days a week.'}
        </p>

        <p>
          {lang === 'fr'
            ? 'Une question sur votre commande, le choix de votre taille ou notre garantie 30 jours ? Notre équipe support francophone vous répond généralement en moins de 24 heures.'
            : 'Have a question about your order, sizing, or our 30-day guarantee? Our customer support team typically responds within 24 hours.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, margin: '24px 0' }}>
          <div style={{ padding: 18, background: 'var(--cream-2)', borderRadius: 12 }}>
            <Icon name="chat" size={24} />
            <strong style={{ display: 'block', marginTop: 8 }}>Email Support</strong>
            <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>
          </div>
          <div style={{ padding: 18, background: 'var(--cream-2)', borderRadius: 12 }}>
            <Icon name="shield" size={24} />
            <strong style={{ display: 'block', marginTop: 8 }}>
              {lang === 'fr' ? 'Garantie & Retours' : 'Guarantee & Returns'}
            </strong>
            <p style={{ margin: 0, fontSize: 14 }}>
              {lang === 'fr' ? 'Garantie Satisfait ou Remboursé 30j' : '30-Day Money-Back Guarantee'}
            </p>
          </div>
          <div style={{ padding: 18, background: 'var(--cream-2)', borderRadius: 12 }}>
            <Icon name="truck" size={24} />
            <strong style={{ display: 'block', marginTop: 8 }}>
              {lang === 'fr' ? 'Délais de livraison' : 'Delivery Times'}
            </strong>
            <p style={{ margin: 0, fontSize: 14 }}>
              {lang === 'fr' ? '3 à 5 jours ouvrés avec suivi' : '3 to 5 business days tracked'}
            </p>
          </div>
        </div>

        {submitted ? (
          <div style={{ padding: 24, background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0', color: '#166534', textAlign: 'center' }}>
            <Icon name="check" size={28} />
            <h3 style={{ margin: '10px 0 6px' }}>
              {lang === 'fr' ? 'Message bien envoyé !' : 'Message received!'}
            </h3>
            <p style={{ margin: 0 }}>
              {lang === 'fr'
                ? 'Notre équipe vous répondra dans les plus brefs délais à votre adresse email.'
                : 'Our support team will get back to you shortly via email.'}
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            style={{ display: 'grid', gap: 14, marginTop: 24 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <input
                type="text"
                placeholder={lang === 'fr' ? 'Votre nom complet' : 'Full name'}
                required
                style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }}
              />
              <input
                type="email"
                placeholder={lang === 'fr' ? 'Votre adresse email' : 'Email address'}
                required
                style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }}
              />
            </div>
            <input
              type="text"
              placeholder={lang === 'fr' ? 'Numéro de commande (facultatif)' : 'Order number (optional)'}
              style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }}
            />
            <textarea
              placeholder={lang === 'fr' ? 'Votre message...' : 'Your message...'}
              rows={5}
              required
              style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }}
            />
            <button className="btn btn--dark" style={{ justifySelf: 'start', minWidth: 200 }}>
              {lang === 'fr' ? 'Envoyer mon message' : 'Send message'}
            </button>
          </form>
        )}
      </article>
    </div>
  );
}
