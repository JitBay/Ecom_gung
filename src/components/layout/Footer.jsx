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
      <h3>Join the {brand.name.charAt(0) + brand.name.slice(1).toLowerCase()} Club</h3>
      <p>Get exclusive deals, early access to new drops, and real stories from women who wear them daily.</p>
      {done ? (
        <p className="footer__thanks">
          <Icon name="check" size={16} /> Thanks — you are on the list.
        </p>
      ) : (
        <form onSubmit={(e) => (e.preventDefault(), setDone(true))}>
          <input type="email" placeholder="E-mail" required aria-label="E-mail" />
          <button aria-label="Subscribe">
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
                  <li key={l.label}>{l.to ? <Link to={l.to}>{l.label}</Link> : <a href={l.href}>{l.label}</a>}</li>
                ))}
              </ul>
            </div>
          ))}
          <p className="footer__legal">
            © 2026 <strong>{brand.name} Labs.</strong> The statements made have not been evaluated by the FDA. This product
            is not intended to diagnose, treat, cure, or prevent any disease.
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
              English <Icon name="chevron" size={14} />
            </button>
          </div>
        </div>

        <div className="container footer__bottom">
          <div>
            <p>© 2026, {brand.name} LABS.</p>
            <ul>
              {policies.map((p) => (
                <li key={p}>
                  <a href="#">{p}</a>
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
