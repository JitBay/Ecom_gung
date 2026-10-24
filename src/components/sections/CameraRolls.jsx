import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import { featuredReviews } from '../../data/reviews.js';
import { useReveal } from '../../lib/hooks.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './CameraRolls.css';

function Highlight({ text, bold }) {
  const [before, after] = text.split(bold);
  if (after === undefined) return text;
  return (
    <>
      {before}
      <strong>{bold}</strong>
      {after}
    </>
  );
}

const featuredReviewsEn = [
  {
    name: 'Thomas R.',
    meta: '34 yrs · Size L · Verified',
    text: 'I finally enjoy wearing fitted dress shirts to work again. The visual smoothing under a shirt is stunning and stays 100% invisible.',
    bold: 'visual smoothing under a shirt is stunning',
  },
  {
    name: 'Laurent M.',
    meta: '48 yrs · Size XL · Verified',
    text: '8 hours a day at my desk without back pain. The tension bands keep my shoulders naturally pulled back without feeling tight.',
    bold: 'shoulders naturally pulled back',
  },
  {
    name: 'Kevin D.',
    meta: '27 yrs · Size M · Verified',
    text: 'Worn under a white summer tee: zero collar show, zero seam lines. The fabric is light and breathes easily all day.',
    bold: 'zero collar show, zero seam lines',
  },
  {
    name: 'David B.',
    meta: '41 yrs · Size L · Verified',
    text: 'Gives me back total confidence in my everyday wardrobe. You put it on in the morning and forget about it completely.',
    bold: 'total confidence in my everyday wardrobe',
  },
];

export default function CameraRolls() {
  const ref = useReveal();
  const { lang } = useLanguage();

  return (
    <section className="rolls" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">
            {lang === 'fr' ? 'Témoignages vérifiés · 45 000+ hommes' : 'Real Men · Verified Reviews'}
          </span>
          <p className="rolls__score">
            <Stars value={4.9} size={15} />{' '}
            <strong>4.9 / 5</strong> ·{' '}
            {lang === 'fr' ? 'Moins de 2% de retours · Garantie 30 Jours' : '<2% return rate · 30-Day Guarantee'}
          </p>
          <h2 className="title">
            {lang === 'fr' ? (
              <>En direct de <em>leur quotidien.</em></>
            ) : (
              <>Straight from <em>their camera rolls.</em></>
            )}
          </h2>
          <p className="subtitle">
            {lang === 'fr' ? (
              <>Aucun script, aucun acteur rémunéré : des <strong>acheteurs vérifiés</strong> qui portent Vela Sculpt™ sous leurs chemises et t-shirts.</>
            ) : (
              <>No scripts, no paid actors — just <strong>verified buyers</strong> in their own photos and their own words.</>
            )}
          </p>
        </div>

        <div className="rolls__grid scroller">
          {featuredReviews.map((r, i) => {
            const reviewItem = lang === 'fr' ? r : { ...r, ...featuredReviewsEn[i] };
            return (
              <article className="roll-card reveal" key={r.name} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="roll-card__photo" style={{ '--tint': r.tint }}>
                  {r.photo ? (
                    <img
                      src={r.photo}
                      alt={r.name}
                      className="roll-card__img"
                      loading="lazy"
                    />
                  ) : (
                    <span className="roll-card__initial">{r.name[0]}</span>
                  )}
                  <span className="verified">
                    <Icon name="check" size={11} strokeWidth={3} /> {lang === 'fr' ? 'Achat Vérifié' : 'Verified'}
                  </span>
                </div>
                <div className="roll-card__body">
                  <Stars value={5} size={14} />
                  <p>
                    <Highlight text={reviewItem.text} bold={reviewItem.bold} />
                  </p>
                  <footer>
                    <strong>{reviewItem.name}</strong>
                    <span>{reviewItem.meta}</span>
                  </footer>
                </div>
              </article>
            );
          })}
        </div>

        <a href="#reviews" className="rolls__more">
          {lang === 'fr' ? 'Consulter les 1 420 avis vérifiés' : 'Read all 1,420+ verified reviews'}{' '}
          <Icon name="arrow" size={16} />
        </a>
      </div>
    </section>
  );
}
