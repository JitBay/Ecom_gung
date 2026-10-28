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


export default function CameraRolls() {
  const ref = useReveal();
  const { lang } = useLanguage();

  return (
    <section className="rolls" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">
            {lang === 'fr' ? 'Témoignages vérifiés · 67 avis clients' : 'Real Men · 67 Verified Reviews'}
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
            const reviewItem =
              lang === 'fr'
                ? r
                : {
                    ...r,
                    meta: r.metaEn || r.meta,
                    text: r.textEn || r.text,
                    bold: r.boldEn || r.bold,
                  };
            return (
              <article className="roll-card reveal" key={r.name + i} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="roll-card__photo" style={{ '--tint': r.tint }}>
                  {r.photo ? (
                    r.photo.endsWith('.mp4') ? (
                      <video
                        src={r.photo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="roll-card__img"
                      />
                    ) : (
                      <img
                        src={r.photo}
                        alt={r.name}
                        className="roll-card__img"
                        loading="lazy"
                      />
                    )
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

        <a
          href="#reviews"
          className="rolls__more"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('reviews');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              window.history.pushState(null, '', '#reviews');
            }
          }}
        >
          {lang === 'fr' ? 'Consulter les 67 avis vérifiés' : 'Read all 67 verified reviews'}{' '}
          <Icon name="arrow" size={16} />
        </a>
      </div>
    </section>
  );
}
