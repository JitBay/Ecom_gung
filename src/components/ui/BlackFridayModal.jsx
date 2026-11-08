import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useLockScroll } from '../../lib/hooks.js';
import './BlackFridayModal.css';

export default function BlackFridayModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { dict } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useLockScroll(isOpen);

  useEffect(() => {
    // Check if dismissed in this session
    const seen = sessionStorage.getItem('zvar_bf_modal_seen');
    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Listen for manual trigger to reopen
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-bf-modal', handleOpen);
    return () => window.removeEventListener('open-bf-modal', handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('zvar_bf_modal_seen', '1');
  };

  const handleCta = (e) => {
    e.preventDefault();
    handleClose();

    // Check if current page has target deal
    const dealEl = document.getElementById('bm-deal') || document.getElementById('product') || document.getElementById('bestsellers');
    if (dealEl) {
      dealEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/products/vela-sculpt-sans-manches#product');
    }
  };

  if (!isOpen) return null;

  const m = dict.black_friday?.modal || {
    eyebrow: 'Événement Black Friday · Offre Limitée',
    title_prefix: "Jusqu'à",
    title_highlight: '-50%',
    title_suffix: '& 1 T-Shirt OFFERT',
    text: "Profitez en avant-première de notre offre exclusive Black Friday sur toute la collection de maintien postural et compression Vela Sculpt™.",
    perks: [
      { title: '1 T-Shirt Offert', desc: 'Pour 2 t-shirts achetés' },
      { title: 'Livraison Suivie 0€', desc: 'Expédition prioritaire & tracking live' },
      { title: 'Essai 30 Jours', desc: '100% remboursé si non conquis' },
    ],
    cta: "Profiter de l'offre Black Friday",
    dismiss: "Continuer sans l'offre",
  };

  return (
    <div className="bf-modal-backdrop" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="bf-title">
      <div className="bf-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="bf-modal-close"
          onClick={handleClose}
          aria-label="Fermer la fenêtre d'annonce"
        >
          <Icon name="close" size={20} />
        </button>

        <div className="bf-modal-badge">
          <i className="bf-modal-pulse" aria-hidden="true" />
          <span>{m.eyebrow}</span>
        </div>

        <h2 className="bf-modal-title" id="bf-title">
          <span>{m.title_prefix}</span>{' '}
          <strong className="bf-modal-gold">{m.title_highlight}</strong>{' '}
          <span>{m.title_suffix}</span>
        </h2>

        <p className="bf-modal-desc">{m.text}</p>

        <div className="bf-modal-perks">
          {m.perks &&
            m.perks.map((p, idx) => (
              <div key={idx} className="bf-modal-perk">
                <span className="bf-modal-check">&#10003;</span>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="bf-modal-actions">
          <button type="button" className="bf-modal-cta" onClick={handleCta}>
            <span>{m.cta}</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
          <button type="button" className="bf-modal-dismiss" onClick={handleClose}>
            {m.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}
