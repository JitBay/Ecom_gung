import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useLockScroll } from '../../lib/hooks.js';
import { subscribeToShopifyNewsletter } from '../../lib/shopify.js';
import './WelcomeEmailModal.css';

// November 30, 2026 23:59:59 EST (New York UTC-5 = 2026-12-01T04:59:59Z)
const BF_DEADLINE_MS = new Date('2026-12-01T04:59:59Z').getTime();

export default function WelcomeEmailModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const { lang } = useLanguage();
  const { open: isCartOpen } = useCart();
  const location = useLocation();

  useLockScroll(isOpen);

  // Close modal if cart opens
  useEffect(() => {
    if (isCartOpen && isOpen) {
      setIsOpen(false);
    }
  }, [isCartOpen, isOpen]);

  useEffect(() => {
    // Check if user already saw or interacted with the welcome modal
    if (typeof window === 'undefined') return;
    if (
      localStorage.getItem('zvar_welcome10_seen') ||
      sessionStorage.getItem('zvar_welcome10_seen')
    ) {
      return;
    }

    // Skip on legal/support routes
    if (
      location.pathname.startsWith('/policies') ||
      location.pathname === '/pages/contact' ||
      location.pathname === '/pages/suivi-commande'
    ) {
      return;
    }

    let triggered = false;
    const triggerModal = () => {
      if (triggered) return;
      // Do not open if cart is already open
      if (isCartOpen) return;
      triggered = true;
      localStorage.setItem('zvar_welcome10_seen', '1');
      sessionStorage.setItem('zvar_welcome10_seen', '1');
      setIsOpen(true);
      cleanup();
    };

    // 1. Timer: 15 seconds
    const timer = setTimeout(triggerModal, 15000);

    // 2. Exit intent on desktop (cursor leaves top of viewport)
    const handleMouseLeave = (e) => {
      if (e.clientY <= 12 && !triggered) {
        triggerModal();
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    const cleanup = () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };

    return cleanup;
  }, [location.pathname, isCartOpen]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('zvar_welcome10_seen', '1');
    sessionStorage.setItem('zvar_welcome10_seen', '1');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg(lang === 'fr' ? 'Veuillez saisir une adresse e-mail valide.' : 'Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await subscribeToShopifyNewsletter(email);
      if (res.ok) {
        setStatus('success');
        sessionStorage.setItem('zvar_discount_code', 'WELCOME10');
      } else {
        setStatus('error');
        setErrorMsg(
          res.error === 'INVALID_EMAIL'
            ? (lang === 'fr' ? 'Adresse e-mail invalide.' : 'Invalid email address.')
            : (lang === 'fr' ? 'Une erreur est survenue. Veuillez réessayer.' : 'Something went wrong. Please try again.')
        );
      }
    } catch {
      setStatus('error');
      setErrorMsg(lang === 'fr' ? 'Connexion impossible. Réessayez plus tard.' : 'Connection failed. Try again later.');
    }
  };

  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('WELCOME10');
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (!isOpen) return null;

  const isBfActive = Date.now() <= BF_DEADLINE_MS;

  // Texts dynamically switching between Black Friday and Regular Welcome Modal
  const content = isBfActive
    ? {
        badge: '🔥 BLACK FRIDAY',
        title: lang === 'fr' ? '-10 % en plus' : 'Extra 10% OFF',
        text:
          lang === 'fr'
            ? '2 achetés = 1 offert + 10 % sur votre 1ère commande.'
            : 'Buy 2, Get 1 FREE + 10% off your first order.',
        placeholder: lang === 'fr' ? 'Entrez votre adresse e-mail' : 'Enter your email',
        btn: lang === 'fr' ? 'DÉBLOQUER MON OFFRE' : 'UNLOCK MY DEAL',
        subtext:
          lang === 'fr'
            ? 'Fin le 30 nov. · Pas de spam, désinscription en 1 clic.'
            : 'Ends Nov 30 · No spam, unsubscribe anytime.',
      }
    : {
        badge: lang === 'fr' ? '🎁 OFFRE DE BIENVENUE' : '🎁 WELCOME OFFER',
        title:
          lang === 'fr'
            ? 'Obtenez 10% de réduction sur votre 1ère commande 🎁'
            : 'Get 10% off your first order 🎁',
        text:
          lang === 'fr'
            ? 'Rejoignez la liste pour recevoir vos offres exclusives.'
            : 'Join our list for exclusive offers & product updates.',
        placeholder: lang === 'fr' ? 'Entrez votre adresse e-mail' : 'Enter your email address',
        btn: lang === 'fr' ? 'Obtenir mes -10%' : 'Get My 10% Off',
        subtext:
          lang === 'fr'
            ? '🔒 Pas de spam. Désinscription possible en 1 clic à tout moment.'
            : '🔒 No spam. Unsubscribe anytime in 1 click.',
      };

  return (
    <div
      className="welcome-modal-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      <div className="welcome-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="welcome-modal-close"
          onClick={handleClose}
          aria-label={lang === 'fr' ? 'Fermer' : 'Close'}
        >
          <Icon name="close" size={20} />
        </button>

        <div className={`welcome-modal-badge ${isBfActive ? 'is-bf' : ''}`}>
          <span>{content.badge}</span>
        </div>

        <h2 className="welcome-modal-title" id="welcome-modal-title">
          {content.title}
        </h2>

        <p className="welcome-modal-desc">
          {content.text}
        </p>

        {status !== 'success' ? (
          <form className="welcome-modal-form" onSubmit={handleSubmit}>
            <div className="welcome-modal-input-group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content.placeholder}
                className="welcome-modal-input"
                disabled={status === 'loading'}
                autoFocus
              />
              <button
                type="submit"
                className={`btn btn--gold welcome-modal-submit ${status === 'loading' ? 'is-loading' : ''}`}
                disabled={status === 'loading'}
              >
                {status === 'loading'
                  ? (lang === 'fr' ? 'Validation...' : 'Joining...')
                  : content.btn}
              </button>
            </div>

            {errorMsg && <p className="welcome-modal-error">{errorMsg}</p>}

            <p className="welcome-modal-subtext">
              {content.subtext}
            </p>
          </form>
        ) : (
          <div className="welcome-modal-success">
            <div className="welcome-modal-code-box">
              <span className="welcome-modal-code-label">
                {lang === 'fr' ? 'Votre code promo :' : 'Your code:'}
              </span>
              <strong className="welcome-modal-code">WELCOME10</strong>
              <span className="welcome-modal-condition">
                {lang === 'fr' ? '— -10% dès 39$ d’achat' : '— 10% off orders $39+'}
              </span>
            </div>

            <div className="welcome-modal-actions">
              <button
                type="button"
                className="btn btn--gold welcome-modal-copy-btn"
                onClick={handleCopyCode}
              >
                {copied
                  ? (lang === 'fr' ? '✓ Code copié !' : '✓ Code Copied!')
                  : (lang === 'fr' ? 'Copier le code & Continuer' : 'Copy Code & Shop Now')}
              </button>
            </div>

            <button type="button" className="welcome-modal-dismiss-link" onClick={handleClose}>
              {lang === 'fr' ? 'Fermer et explorer les offres' : 'Close and explore deals'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
