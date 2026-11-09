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
    lang === 'fr' ? "Plus grande offre de l'année" : "Biggest offer of the year",
    lang === 'fr' ? "+11 000 t-shirts vendus" : "+11,000 shirts sold",
    lang === 'fr' ? "Jusqu'à -50% de réduction" : "Up to 50% off",
    lang === 'fr' ? "3 000+ clients satisfaits" : "3,000+ happy customers",
    lang === 'fr' ? "2 t-shirts achetés = 1 offert" : "Buy 2 get 1 free",
    lang === 'fr' ? "Pack Découverte à 44,99 $" : "Discovery Pack at $44.99",
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
