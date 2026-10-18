import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon.jsx';
import { brand } from '../data/site.js';
import './LegalPage.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contactez-nous | Vela Labs Support';
  }, []);

  return (
    <div className="legal-page container">
      <nav className="pp__crumbs" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link> / <span>Contact</span>
      </nav>

      <article className="legal-content">
        <h1>Contactez l'Équipe Vela Labs</h1>
        <p className="legal-meta">Nous sommes à votre écoute 7 jours sur 7.</p>

        <p>
          Une question sur votre commande, le choix de votre taille ou notre garantie 30 jours ? Notre équipe support francophone vous répond généralement en moins de 24 heures.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, margin: '24px 0' }}>
          <div style={{ padding: 18, background: 'var(--cream-2)', borderRadius: 12 }}>
            <Icon name="chat" size={24} />
            <strong style={{ display: 'block', marginTop: 8 }}>Email Support</strong>
            <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>
          </div>
          <div style={{ padding: 18, background: 'var(--cream-2)', borderRadius: 12 }}>
            <Icon name="shield" size={24} />
            <strong style={{ display: 'block', marginTop: 8 }}>Garantie & Retours</strong>
            <p style={{ margin: 0, fontSize: 14 }}>Garantie Satisfait ou Remboursé 30j</p>
          </div>
          <div style={{ padding: 18, background: 'var(--cream-2)', borderRadius: 12 }}>
            <Icon name="truck" size={24} />
            <strong style={{ display: 'block', marginTop: 8 }}>Délais de livraison</strong>
            <p style={{ margin: 0, fontSize: 14 }}>3 à 5 jours ouvrés avec suivi</p>
          </div>
        </div>

        {submitted ? (
          <div style={{ padding: 24, background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0', color: '#166534', textAlign: 'center' }}>
            <Icon name="check" size={28} />
            <h3 style={{ margin: '10px 0 6px' }}>Message bien envoyé !</h3>
            <p style={{ margin: 0 }}>Notre équipe vous répondra dans les plus brefs délais à votre adresse email.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            style={{ display: 'grid', gap: 14, marginTop: 24 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <input type="text" placeholder="Votre nom complet" required style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }} />
              <input type="email" placeholder="Votre adresse email" required style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }} />
            </div>
            <input type="text" placeholder="Numéro de commande (facultatif)" style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }} />
            <textarea placeholder="Votre message..." rows={5} required style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--line)' }} />
            <button className="btn btn--dark" style={{ justifySelf: 'start', minWidth: 200 }}>
              Envoyer mon message
            </button>
          </form>
        )}
      </article>
    </div>
  );
}
