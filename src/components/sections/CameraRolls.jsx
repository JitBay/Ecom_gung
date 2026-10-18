import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import { featuredReviews } from '../../data/reviews.js';
import { useReveal } from '../../lib/hooks.js';
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
  return (
    <section className="rolls" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Témoignages vérifiés · 45 000+ hommes</span>
          <p className="rolls__score">
            <Stars value={4.9} size={15} /> <strong>4.9 / 5</strong> · Moins de 2% de retours · Garantie 30 Jours
          </p>
          <h2 className="title">
            En direct de <em>leur quotidien.</em>
          </h2>
          <p className="subtitle">
            Aucun script, aucun acteur rémunéré : des <strong>acheteurs vérifiés</strong> qui portent Vela Sculpt™ sous leurs chemises et t-shirts.
          </p>
        </div>

        <div className="rolls__grid scroller">
          {featuredReviews.map((r, i) => (
            <article className="roll-card reveal" key={r.name} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="roll-card__photo" style={{ '--tint': r.tint }}>
                <span className="verified">
                  <Icon name="check" size={11} strokeWidth={3} /> Achat Vérifié
                </span>
                <span className="roll-card__initial">{r.name[0]}</span>
              </div>
              <div className="roll-card__body">
                <Stars value={5} size={14} />
                <p>
                  <Highlight text={r.text} bold={r.bold} />
                </p>
                <footer>
                  <strong>{r.name}</strong>
                  <span>{r.meta}</span>
                </footer>
              </div>
            </article>
          ))}
        </div>

        <a href="#reviews" className="rolls__more">
          Consulter les 1 420 avis vérifiés <Icon name="arrow" size={16} />
        </a>
      </div>
    </section>
  );
}
