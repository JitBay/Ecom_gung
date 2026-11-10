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
    // Skip auto-popup on support/legal/tracking routes so shoppers aren't interrupted
    if (
      location.pathname.startsWith('/policies') ||
      location.pathname === '/pages/contact' ||
      location.pathname === '/pages/suivi-commande'
    ) {
      return;
    }

    // Open after 4.5s or once user scrolls 35% of the page, once per session
    if (sessionStorage.getItem('zvar_bf_modal_seen')) return;

    let triggered = false;
    const triggerModal = () => {
      if (triggered) return;
      triggered = true;
      sessionStorage.setItem('zvar_bf_modal_seen', '1');
      setIsOpen(true);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= 0.35) {
        triggerModal();
      }
    };

    const timer = setTimeout(triggerModal, 4500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [location.pathname]);

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

    const dealEl =
      document.getElementById('bm-deal') ||
      document.getElementById('bestsellers') ||
      document.getElementById('product');
    if (dealEl) {
      dealEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/#bestsellers');
    }
  };

  if (!isOpen) return null;

  const m = dict.black_friday?.modal || {
    eyebrow: 'Événement Black Friday · Offre Limitée',
    title_prefix: "Offre Black Friday :",
    title_highlight: "Jusqu'à -50%",
    title_suffix: '',
    text: "Profitez en avant-première de notre offre exclusive Black Friday sur toute la collection de maintien postural et compression Vela Sculpt™.",
    perks: [
      { title: '2 Achetés = 1 Offert', desc: 'Le 3ème T-shirt 100% offert sur tous nos modèles' },
      { title: 'Livraison Suivie Gratuite', desc: 'Expédition prioritaire & tracking live' },
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
          <strong className="bf-modal-gold">{m.title_highlight}</strong>
          {m.title_suffix ? <span> {m.title_suffix}</span> : null}
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
