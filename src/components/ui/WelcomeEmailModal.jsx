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

  // Close modal if cart drawer opens
  useEffect(() => {
    if (isCartOpen && isOpen) {
      setIsOpen(false);
    }
  }, [isCartOpen, isOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Remove obsolete legacy popup keys from previous versions
    try {
      localStorage.removeItem('zvar_bf_modal_seen');
      localStorage.removeItem('zvar_welcome10_seen');
    } catch {}

    // Check if test override is present in query parameters (e.g. ?popup=1 or ?bf=1)
    const isTestParam =
      location.search.includes('popup') ||
      location.search.includes('bf') ||
      location.search.includes('modal') ||
      location.search.includes('test');

    // Skip on legal/support routes unless forced with URL param
    if (
      !isTestParam &&
      (location.pathname.startsWith('/policies') ||
        location.pathname === '/pages/contact' ||
        location.pathname === '/pages/suivi-commande')
    ) {
      return;
    }

    // Check if already seen in this session (or within 24h)
    const seenSession = sessionStorage.getItem('zvar_bf_popup_seen_v3');
    const seenLocalTs = localStorage.getItem('zvar_bf_popup_ts_v3');
    const isRecentlySeen =
      seenLocalTs && Date.now() - Number(seenLocalTs) < 24 * 60 * 60 * 1000;

    if (!isTestParam && (seenSession || isRecentlySeen)) {
      return;
    }

    let triggered = false;
    const triggerModal = () => {
      if (triggered) return;
      if (isCartOpen) return;
      triggered = true;

      try {
        sessionStorage.setItem('zvar_bf_popup_seen_v3', '1');
        localStorage.setItem('zvar_bf_popup_ts_v3', String(Date.now()));
      } catch {}

      setIsOpen(true);
      cleanup();
    };

    // 1. Timer: 8 seconds (or 1 second in test mode)
    const delay = isTestParam ? 1000 : 8000;
    const timer = setTimeout(triggerModal, delay);

    // 2. Exit intent on desktop (cursor leaves top of viewport)
    const handleMouseLeave = (e) => {
      if (e.clientY <= 15 && !triggered) {
        triggerModal();
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    const cleanup = () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };

    return cleanup;
  }, [location.pathname, location.search, isCartOpen]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('zvar_bf_popup_seen_v3', '1');
      localStorage.setItem('zvar_bf_popup_ts_v3', String(Date.now()));
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg(
        lang === 'fr'
          ? 'Veuillez saisir une adresse e-mail valide.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await subscribeToShopifyNewsletter(email);
      if (res.ok) {
        setStatus('success');
        try {
          sessionStorage.setItem('zvar_discount_code', 'WELCOME10');
        } catch {}
      } else {
        setStatus('error');
        setErrorMsg(
          res.error === 'INVALID_EMAIL'
            ? (lang === 'fr' ? 'Adresse e-mail invalide.' : 'Invalid email address.')
            : (lang === 'fr'
                ? 'Une erreur est survenue. Veuillez réessayer.'
                : 'Something went wrong. Please try again.')
        );
      }
    } catch {
      setStatus('error');
      setErrorMsg(
        lang === 'fr'
          ? 'Connexion impossible. Réessayez plus tard.'
          : 'Connection failed. Try again later.'
      );
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

  // Content dynamically switching between Black Friday and standard Welcome Offer
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

        <p className="welcome-modal-desc">{content.text}</p>

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
                className={`btn btn--gold welcome-modal-submit ${
                  status === 'loading' ? 'is-loading' : ''
                }`}
                disabled={status === 'loading'}
              >
                {status === 'loading'
                  ? lang === 'fr'
                    ? 'Validation...'
                    : 'Joining...'
                  : content.btn}
              </button>
            </div>

            {errorMsg && <p className="welcome-modal-error">{errorMsg}</p>}

            <p className="welcome-modal-subtext">{content.subtext}</p>
          </form>
        ) : (
          <div className="welcome-modal-success">
            <div className="welcome-modal-code-box">
              <span className="welcome-modal-code-label">
                {lang === 'fr' ? 'Votre code promo :' : 'Your code:'}
              </span>
              <strong className="welcome-modal-code">WELCOME10</strong>
              <span className="welcome-modal-condition">
                {lang === 'fr'
                  ? '— -10 % sur votre commande (soit 17,99 $)'
                  : '— 10% off your order (just $17.99 for 1 Tank)'}
              </span>
            </div>

            <div className="welcome-modal-actions">
              <button
                type="button"
                className="btn btn--gold welcome-modal-copy-btn"
                onClick={handleCopyCode}
              >
                {copied
                  ? lang === 'fr'
                    ? '✓ Code copié !'
                    : '✓ Code Copied!'
                  : lang === 'fr'
                  ? 'Copier le code & Continuer'
                  : 'Copy Code & Shop Now'}
              </button>
            </div>

            <button
              type="button"
              className="welcome-modal-dismiss-link"
              onClick={handleClose}
            >
              {lang === 'fr' ? 'Fermer et explorer les offres' : 'Close and explore deals'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
