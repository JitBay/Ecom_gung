import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './BlackFridayHero.css';

export default function BlackFridayHero({
  targetId = 'bm-deal',
  slim = false,
  showText = true,
  showChips = true,
}) {
  const { dict } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const renderText = slim ? false : showText;
  const renderChips = slim ? false : showChips;

  const bf = dict.black_friday?.hero || {
    eyebrow: "Black Friday Sale · Plus grande offre de l'année",
    kicker: "Événement Exclusif",
    discount: "Jusqu'à -50%",
    regularPrice: "",
    text: "Notre grand événement Black Friday est ouvert sur l'ensemble de la collection Vela Sculpt™ : 2 t-shirts achetés = le 3ème offert sur toutes nos coupes, ou le Pack Découverte 3 coupes à seulement 44,99 $.",
    chips: [
      "2 achetés = 1 offert sur tout",
      "Pack Découverte à 44,99 $",
      "3 000+ clients satisfaits",
      "+11 000 t-shirts vendus",
      "Livraison 100% gratuite & suivie",
    ],
    cta: "Découvrir les offres Black Friday",
  };

  const handleScrollToDeal = (e) => {
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
    <section
      className={`ixbm-hero ixbm-hero--compact ${slim ? 'ixbm-hero--slim' : ''}`}
      aria-label="Annonce Black Friday"
    >
      <div className="ixbm-hero__bgword" aria-hidden="true">
        <span>BLACK FRIDAY BLACK FRIDAY BLACK FRIDAY</span>
        <span>BLACK FRIDAY BLACK FRIDAY BLACK FRIDAY</span>
        <span>BLACK FRIDAY BLACK FRIDAY BLACK FRIDAY</span>
        <span>BLACK FRIDAY BLACK FRIDAY BLACK FRIDAY</span>
      </div>
      <div className="ixbm-hero__content">
        <span className="ixbm-hero__eyebrow">
          <i aria-hidden="true" />
          {bf.eyebrow}
        </span>
        <h2 className="ixbm-hero__title">
          <span className="ixbm-hero__kicker">{bf.kicker}</span>
          <div className="ixbm-hero__price-lockup">
            <span className="ixbm-hero__big">{bf.discount}</span>
            {bf.regularPrice && (
              <span className="ixbm-hero__subprice">{bf.regularPrice}</span>
            )}
          </div>
        </h2>
        {renderText && bf.text && (
          <p className="ixbm-hero__text">{bf.text}</p>
        )}
        {renderChips && bf.chips && bf.chips.length > 0 && (
          <ul className="ixbm-hero__chips">
            {bf.chips.map((chip, idx) => (
              <li key={idx}>{chip}</li>
            ))}
          </ul>
        )}
        <div className="ixbm-hero__btns">
          <a
            className="ixbm-btn ixbm-btn--gold"
            href={`#${targetId}`}
            onClick={handleScrollToDeal}
          >
            {bf.cta}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
