import { useEffect, useState } from 'react';
import Icon from '../components/ui/Icon.jsx';
import { brand } from '../data/site.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import './LegalPage.css';

const CONTACT_ENDPOINT =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CONTACT_ENDPOINT) ||
  `https://formsubmit.co/ajax/${brand.supportEmail}`;

export default function ContactPage() {
  const { lang } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', orderNumber: '', message: '' });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? 'Contactez-nous | ZVAR Support'
        : 'Contact Us | ZVAR Support';
  }, [lang]);

  const mailtoHref = `mailto:${brand.supportEmail}?subject=${encodeURIComponent(
    `[ZVAR Support] ${form.orderNumber ? `#${form.orderNumber} - ` : ''}${form.name || 'Client'}`
  )}&body=${encodeURIComponent(
    `${form.message}\n\n---\n${form.name}\n${form.email}${form.orderNumber ? `\nCommande: ${form.orderNumber}` : ''}`
  )}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setError('');
    setSending(true);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          order_number: form.orderNumber.trim() || '-',
          message: form.message.trim(),
          _subject: `ZVAR Support — ${form.name.trim()}${form.orderNumber.trim() ? ` (#${form.orderNumber.trim()})` : ''}`,
          _replyto: form.email.trim(),
          _template: 'table',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success !== 'false' && data?.success !== false) {
        setSubmitted(true);
        setForm({ name: '', email: '', orderNumber: '', message: '' });
      } else {
        setError(
          lang === 'fr'
            ? "L'envoi automatique a échoué. Cliquez ci-dessous pour nous écrire directement par email."
            : 'Automatic sending failed. Click below to email our team directly.'
        );
      }
    } catch {
      setError(
        lang === 'fr'
          ? 'Connexion interrompue. Cliquez ci-dessous pour envoyer votre message via votre messagerie.'
          : 'Network issue. Click below to send your message via your email app.'
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="legal-page container">

      <article className="legal-content">
        <h1>{lang === 'fr' ? "Contactez l'Équipe ZVAR" : 'Contact the ZVAR Team'}</h1>
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
              {lang === 'fr' ? 'Garantie satisfait ou remboursé 30j' : '30-Day Money-Back Guarantee'}
            </p>
          </div>
          <div style={{ padding: 18, background: 'var(--cream-2)', borderRadius: 12 }}>
            <Icon name="truck" size={24} />
            <strong style={{ display: 'block', marginTop: 8 }}>
              {lang === 'fr' ? 'Délais de livraison' : 'Delivery Times'}
            </strong>
            <p style={{ margin: 0, fontSize: 14 }}>
              {lang === 'fr' ? '6 à 12 jours ouvrés (suivi complet)' : '6 to 12 working days (full tracking)'}
            </p>
          </div>
        </div>

        {submitted ? (
          <div style={{ padding: 24, background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0', color: '#166534', textAlign: 'center' }}>
            <Icon name="check" size={28} />
            <h3 style={{ margin: '10px 0 6px' }}>
              {lang === 'fr' ? 'Message bien envoyé !' : 'Message sent!'}
            </h3>
            <p style={{ margin: '0 0 16px' }}>
              {lang === 'fr'
                ? 'Notre équipe vous répondra sous 24h à votre adresse email.'
                : 'Our support team will reply to your email within 24 hours.'}
            </p>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => setSubmitted(false)}
            >
              {lang === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'grid', gap: 14, marginTop: 24 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder={lang === 'fr' ? 'Votre nom complet' : 'Full name'}
                required
                disabled={sending}
                style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder={lang === 'fr' ? 'Votre adresse email' : 'Email address'}
                required
                disabled={sending}
                style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }}
              />
            </div>
            <input
              type="text"
              name="orderNumber"
              value={form.orderNumber}
              onChange={(e) => setForm((f) => ({ ...f, orderNumber: e.target.value }))}
              placeholder={lang === 'fr' ? 'Numéro de commande (facultatif)' : 'Order number (optional)'}
              disabled={sending}
              style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder={lang === 'fr' ? 'Votre message...' : 'Your message...'}
              rows={5}
              required
              disabled={sending}
              style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }}
            />
            {error && (
              <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, color: '#991b1b', fontSize: 14 }}>
                <p style={{ margin: '0 0 10px' }}>{error}</p>
                <a href={mailtoHref} className="btn btn--outline">
                  {lang === 'fr' ? `Envoyer via mon application mail (${brand.supportEmail})` : `Email ${brand.supportEmail} directly`}
                </a>
              </div>
            )}
            <button type="submit" className="btn btn--dark" disabled={sending} style={{ justifySelf: 'start', minWidth: 200 }}>
              {sending
                ? lang === 'fr' ? 'Envoi en cours...' : 'Sending...'
                : lang === 'fr' ? 'Envoyer mon message' : 'Send message'}
            </button>
          </form>
        )}
      </article>
    </div>
  );
}
