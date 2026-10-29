import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useLockScroll } from '../../lib/hooks.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './HowItWorksModal.css';

export default function HowItWorksModal({ open, onClose }) {
  useLockScroll(open);
  const { lang } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="hiw-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hiw-modal-title"
    >
      <div className="hiw-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="hiw-close"
          onClick={onClose}
          aria-label={lang === 'fr' ? 'Fermer la fenêtre' : 'Close modal'}
        >
          <Icon name="close" size={20} />
        </button>

        <div className="hiw-header">
          <span className="hiw-badge">
            <Icon name="shield" size={14} />
            {lang === 'fr' ? 'Garantie satisfait ou remboursé 30 jours' : '30-Day Risk-Free Guarantee'}
          </span>
          <h3 id="hiw-modal-title" className="hiw-title">
            {lang === 'fr'
              ? 'Comment fonctionne l’essai 30 jours ?'
              : 'How does the 30-day trial work?'}
          </h3>
          <p className="hiw-lead">
            {lang === 'fr'
              ? 'Nous sommes tellement convaincus de l’efficacité et du confort de Vela Sculpt™ que nous vous laissons 30 jours complets pour le tester sans aucun risque.'
              : 'We are so confident in the performance and all-day comfort of Vela Sculpt™ that we give you 30 full days to test it completely risk-free.'}
          </p>
        </div>

        <div className="hiw-steps">
          <div className="hiw-step">
            <div className="hiw-step__num">1</div>
            <div className="hiw-step__content">
              <strong>
                {lang === 'fr'
                  ? 'Commandez et recevez sous 24/48h'
                  : 'Order & receive in 24/48h'}
              </strong>
              <p>
                {lang === 'fr'
                  ? 'Livraison rapide avec numéro de suivi. Essayez votre t-shirt sous vos chemises, t-shirts légers ou tenues de sport habituelles.'
                  : 'Fast tracked delivery. Try your compression shirt under regular shirts, lightweight tees, or workout apparel.'}
              </p>
            </div>
          </div>

          <div className="hiw-step">
            <div className="hiw-step__num">2</div>
            <div className="hiw-step__content">
              <strong>
                {lang === 'fr'
                  ? 'Portez-le et vivez avec pendant 30 jours'
                  : 'Wear it & live in it for 30 days'}
              </strong>
              <p>
                {lang === 'fr'
                  ? 'Lavez-le en machine (30°C), portez-le au travail ou à l’entraînement. Constatez le gainage abdominal 3D et le redressement naturel du dos.'
                  : 'Machine wash it at 30°C, wear it to work or during workouts. Feel the 3D midsection smoothing and upright back support.'}
              </p>
            </div>
          </div>

          <div className="hiw-step">
            <div className="hiw-step__num">3</div>
            <div className="hiw-step__content">
              <strong>
                {lang === 'fr'
                  ? 'Convaincu à 100% ou remboursé intégralement'
                  : '100% convinced or full refund'}
              </strong>
              <p>
                {lang === 'fr'
                  ? 'Si le rendu, la taille ou le confort ne vous convient pas, écrivez-nous simplement. Retour facile et remboursement sans justification.'
                  : 'If the fit, feel, or look doesn’t completely satisfy you, simply email us for a hassle-free, full refund.'}
              </p>
            </div>
          </div>
        </div>

        <div className="hiw-perks">
          <span>
            <Icon name="check" size={13} strokeWidth={2.8} />
            {lang === 'fr' ? 'Expédition suivie 24/48h' : '24/48h tracked shipping'}
          </span>
          <span>
            <Icon name="check" size={13} strokeWidth={2.8} />
            {lang === 'fr' ? 'Moins de 2% de retours' : 'Under 2% return rate'}
          </span>
          <span>
            <Icon name="check" size={13} strokeWidth={2.8} />
            {lang === 'fr' ? 'Support client 7j/7' : 'Dedicated support 7/7'}
          </span>
        </div>

        <div className="hiw-actions">
          <Link to="/collections/all" className="ixh-btn ixh-btn--dark hiw-btn" onClick={onClose}>
            {lang === 'fr' ? 'Découvrir la collection' : 'Shop the collection'}
          </Link>
          <button type="button" className="ixh-btn ixh-btn--line hiw-btn" onClick={onClose}>
            {lang === 'fr' ? 'J’ai compris' : 'Got it'}
          </button>
        </div>
      </div>
    </div>
  );
}
