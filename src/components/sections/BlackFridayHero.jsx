import { useLanguage } from '../../context/LanguageContext.jsx';
import './BlackFridayHero.css';

export default function BlackFridayHero({ targetId = 'bm-deal' }) {
  const { dict } = useLanguage();
  const bf = dict.black_friday?.hero || {
    eyebrow: "Black Friday · Plus grande offre de l'année",
    kicker: "Jusqu'à",
    discount: "-50%",
    text: "Notre t-shirt compression n°1 des ventes. Plus de 100 000 hommes conquis. Le meilleur moment de l'année pour faire le plein.",
    chips: [
      "1 t-shirt 100% offert",
      "+100 000 t-shirts vendus",
      "Garantie 30 jours satisfait ou remboursé",
    ],
    cta: "Profiter de l'offre",
  };

  const handleScrollToDeal = (e) => {
    e.preventDefault();
    const el = document.getElementById(targetId) || document.getElementById('product') || document.getElementById('bestsellers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="ixbm-hero ixbm-hero--compact" aria-label="Annonce Black Friday">
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
          <span className="ixbm-hero__big">{bf.discount}</span>
        </h2>
        <p className="ixbm-hero__text">{bf.text}</p>
        {bf.chips && bf.chips.length > 0 && (
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
