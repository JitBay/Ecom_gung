import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './BlackFridayBar.css';

export default function BlackFridayBar() {
  const { dict, lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const items = dict.black_friday?.bar_items || [
    { text: "Black Friday : notre plus grande offre de l'année", highlight: true },
    { text: "Jusqu'à -50% de réduction", highlight: false },
    { text: "+11 000 t-shirts vendus", highlight: true },
    { text: "3 000+ clients satisfaits", highlight: false },
    { text: "2 t-shirts achetés = 1 offert", highlight: false },
    { text: "Livraison 100% gratuite & suivie", highlight: false },
    { text: "Garantie 30 jours satisfait ou remboursé", highlight: false },
  ];

  const handleClick = (e) => {
    e.preventDefault();
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

  return (
    <aside
      className="ixbm-bar"
      style={{
        '--ixbm-speed': '28s',
        '--ixbm-bg': '#0B0B0B',
        '--ixbm-fg': '#FFFFFF',
        '--ixbm-acc': '#C9A96E',
      }}
      aria-label={lang === 'fr' ? 'Bannière Black Friday' : 'Black Friday Sale Banner'}
    >
      <a
        href="#product"
        className="ixbm-bar__link"
        onClick={handleClick}
        aria-label={lang === 'fr' ? "Black Friday : notre plus grande offre de l'année" : "Black Friday Sale"}
      />
      <div className="ixbm-bar__track" aria-hidden="true">
        <div className="ixbm-bar__run">
          {items.map((item, idx) => (
            <span key={`r1-${idx}`} className="ixbm-bar__segment">
              <span className={`ixbm-bar__item ${item.highlight ? 'ixbm-bar__item--hl' : ''}`}>
                {item.text}
              </span>
              <span className="ixbm-bar__star" aria-hidden="true">
                &#10022;
              </span>
            </span>
          ))}
        </div>
        <div className="ixbm-bar__run">
          {items.map((item, idx) => (
            <span key={`r2-${idx}`} className="ixbm-bar__segment">
              <span className={`ixbm-bar__item ${item.highlight ? 'ixbm-bar__item--hl' : ''}`}>
                {item.text}
              </span>
              <span className="ixbm-bar__star" aria-hidden="true">
                &#10022;
              </span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
