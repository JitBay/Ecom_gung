import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './BlackFridayStrip.css';

export default function BlackFridayStrip({
  targetId = 'bestsellers',
  reversed = false,
  className = '',
}) {
  const { dict, lang } = useLanguage();
  const navigate = useNavigate();

  const items = dict.black_friday?.strip_items || [
    lang === 'fr' ? "Black Friday : 2 achetés = 1 offert" : "Black Friday: Buy 2, Get 1 FREE",
    lang === 'fr' ? "2 T-shirts achetés = 1 offert" : "Buy 2 get 1 free",
    lang === 'fr' ? "Garantie satisfait ou remboursé 30j" : "30-Day Money-Back Guarantee",
    lang === 'fr' ? "Échange de taille 100% gratuit" : "Wrong size = Free exchange",
    lang === 'fr' ? "pack découverte à 44,99 $" : "discovery pack at $44.99",
    lang === 'fr' ? "Livraison 100% gratuite & suivie" : "Free tracked shipping",
  ];

  const handleClick = (e) => {
    e.preventDefault();
    const el =
      document.getElementById(targetId) ||
      document.getElementById('bm-deal') ||
      document.getElementById('bestsellers') ||
      document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/#bestsellers');
    }
  };

  return (
    <div
      className={`ixbm-strip ${reversed ? 'ixbm-strip--rev' : ''} ${className}`}
      role="region"
      aria-label={lang === 'fr' ? 'Ruban offre Black Friday' : 'Black Friday sale diagonal ribbon'}
    >
      <a
        href={`#${targetId}`}
        className="ixbm-strip__link"
        onClick={handleClick}
        aria-label={lang === 'fr' ? 'Découvrir nos offres Black Friday' : 'Explore Black Friday sale deals'}
      >
        <div className="ixbm-strip__band ixbm-strip__band--back" aria-hidden="true" />
        <div className="ixbm-strip__band" aria-hidden="true">
          <div className="ixbm-strip__track">
            <div className="ixbm-strip__run">
              {items.map((text, idx) => (
                <span key={`s1-${idx}`}>
                  <span className="ixbm-strip__item">{text}</span>
                  <span className="ixbm-strip__star" aria-hidden="true">&#10022;</span>
                </span>
              ))}
            </div>
            <div className="ixbm-strip__run">
              {items.map((text, idx) => (
                <span key={`s2-${idx}`}>
                  <span className="ixbm-strip__item">{text}</span>
                  <span className="ixbm-strip__star" aria-hidden="true">&#10022;</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
