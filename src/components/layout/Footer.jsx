import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { brand, footerColumns, payments, policies, trustItems } from '../../data/site.js';
import './Footer.css';

function TrustBar() {
  return (
    <div className="trustbar container">
      {trustItems.map((t) => (
        <div key={t.title}>
          <Icon name={t.icon} size={24} />
          <strong>{t.title}</strong>
          <p>{t.text}</p>
        </div>
      ))}
    </div>
  );
}

function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <div className="footer__news">
      <h3>Le Club {brand.name}</h3>
      <p>Recevez nos conseils posture, offres privées et l’accès anticipé à nos nouvelles coupes techniques.</p>
      {done ? (
        <p className="footer__thanks">
          <Icon name="check" size={16} /> Merci — vous êtes bien inscrit.
        </p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
          <input type="email" placeholder="Votre adresse e-mail" required aria-label="E-mail" />
          <button aria-label="S’inscrire">
            <Icon name="arrow" size={16} />
          </button>
        </form>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <TrustBar />
      <footer className="footer">
        <div className="container footer__grid">
          <Newsletter />
          {footerColumns.map((col) => (
            <div key={col.title} className="footer__col">
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.to.startsWith('/#') ? (
                      <a href={l.to.slice(1)}>{l.label}</a>
                    ) : (
                      <Link to={l.to}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="footer__legal">
            © 2026 <strong>{brand.name} Labs</strong> (Entité légale : {brand.legalName}). Tous droits réservés. Vêtements ergonomiques de compression masculine conçus pour allier confort quotidien et maintien optimal.
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
            <button>
              <i className="flag-fr" /> France (EUR €) <Icon name="chevron" size={14} />
            </button>
            <button>
              Français <Icon name="chevron" size={14} />
            </button>
          </div>
        </div>

        <div className="container footer__bottom">
          <div>
            <p>© 2026, {brand.name} Labs — Raison sociale : {brand.legalName}.</p>
            <ul>
              {policies.map((p) => (
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
