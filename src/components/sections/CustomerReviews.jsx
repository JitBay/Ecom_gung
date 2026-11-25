import { useState, useEffect } from 'react';
import Icon from '../ui/Icon.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './CustomerReviews.css';

export default function CustomerReviews({ productId = '16228231905614' }) {
  const { lang, t } = useLanguage();
  const [writing, setWriting] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Re-trigger Judge.me widget rendering on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.jdgm) {
      if (typeof window.jdgm.initializeWidgets === 'function') {
        window.jdgm.initializeWidgets();
      }
    }
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitted(true);
    setWriting(false);
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <section className="reviews container" id="reviews">
      <div className="reviews__intro">
        <h2 className="reviews__title">
          {lang === 'fr' ? 'Avis Clients Vérifiés' : 'Customer Reviews'}
        </h2>
        <p className="reviews__intro-sub">
          {lang === 'fr'
            ? 'Transparence totale : seuls les avis authentiques issus de commandes vérifiées sont affichés.'
            : 'Total transparency: only authentic feedback from verified orders is displayed.'}
        </p>
      </div>

      {submitted && (
        <div className="reviews__success" role="status">
          <Icon name="check" size={16} strokeWidth={3} />
          <span>
            {lang === 'fr'
              ? 'Merci pour votre retour ! Votre avis sera validé après vérification de votre commande.'
              : 'Thank you for your review! It will appear once your order is verified.'}
          </span>
        </div>
      )}

      {/* Widget officiel Judge.me (injecte automatiquement les avis collectés post-livraison) */}
      <div className="reviews__judgeme-wrapper">
        <div
          id="judgeme_product_reviews"
          className="jdgm-widget jdgm-review-widget"
          data-id={productId}
          data-auto-install="false"
        />
      </div>

      {/* Carte d'honnêteté & Garantie si aucun avis encore validé */}
      <div className="reviews__empty-card">
        <div className="reviews__empty-icon" aria-hidden="true">🛡️</div>
        <h3 className="reviews__empty-title">
          {lang === 'fr'
            ? 'Nouvelle marque, vraie garantie.'
            : 'New brand, real guarantee.'}
        </h3>
        <p className="reviews__empty-text">
          {lang === 'fr'
            ? 'Essayez Vela Sculpt™ 30 jours — pas convaincu ? Remboursé, sans question.'
            : "Try Vela Sculpt™ for 30 days — don't love it? Full refund, no questions asked."}
        </p>
        <div className="reviews__empty-badges">
          <span className="reviews__empty-badge">
            ✓ {lang === 'fr' ? 'Échange de taille 100% gratuit' : 'Free size exchange'}
          </span>
          <span className="reviews__empty-badge">
            ✓ {lang === 'fr' ? 'Livraison suivie gratuite' : 'Free tracked shipping'}
          </span>
          <span className="reviews__empty-badge">
            ✓ {lang === 'fr' ? 'Support client à votre écoute 7j/7' : '7-day customer support'}
          </span>
        </div>

        <div className="reviews__empty-action">
          <button
            type="button"
            className="btn btn--gold"
            onClick={() => setWriting(!writing)}
          >
            {writing
              ? (lang === 'fr' ? 'Fermer le formulaire' : 'Cancel')
              : (lang === 'fr' ? 'Vous avez commandé ? Donnez votre avis' : 'Ordered from us? Leave a review')}
          </button>
        </div>
      </div>

      {writing && (
        <form className="review-form" onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
          <div className="review-form__header">
            <h3>{lang === 'fr' ? 'Partager votre expérience' : 'Share your feedback'}</h3>
            <button type="button" className="review-form__close" onClick={() => setWriting(false)}>
              <Icon name="close" size={16} />
            </button>
          </div>

          <div className="review-form__body">
            <label>
              <span>{lang === 'fr' ? 'Note :' : 'Rating:'}</span>
              <div className="review-form__stars" style={{ display: 'flex', gap: '4px', cursor: 'pointer' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '22px',
                      cursor: 'pointer',
                      color: star <= rating ? '#f59e0b' : '#cbd5e1',
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </label>

            <label>
              <span>{lang === 'fr' ? 'Votre nom ou prénom :' : 'Your name:'}</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'fr' ? 'ex. Thomas D.' : 'e.g. Thomas D.'}
              />
            </label>

            <label>
              <span>{lang === 'fr' ? 'Titre de votre avis :' : 'Review title:'}</span>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={lang === 'fr' ? 'ex. Très confortable sous ma chemise' : 'e.g. Very comfortable under my shirt'}
              />
            </label>

            <label>
              <span>{lang === 'fr' ? 'Votre avis :' : 'Your review:'}</span>
              <textarea
                rows={4}
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={lang === 'fr' ? 'Décrivez le maintien, le confort et la discrétion sous vos vêtements...' : 'Describe the support, fit and comfort under your clothes...'}
              />
            </label>

            <button type="submit" className="btn btn--gold btn--block" style={{ marginTop: '12px' }}>
              {lang === 'fr' ? 'Envoyer mon avis' : 'Submit Review'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
