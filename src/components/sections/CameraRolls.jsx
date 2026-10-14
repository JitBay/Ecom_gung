import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import { featuredReviews } from '../../data/reviews.js';
import { useReveal } from '../../lib/hooks.js';
import './CameraRolls.css';

// Bolds the part of the review text listed in `bold`.
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
          <span className="eyebrow">Real women · verified reviews</span>
          <p className="rolls__score">
            <Stars value={4.8} size={15} /> <strong>4.8 / 5</strong> · 250,000+ women · under 2% return rate
          </p>
          <h2 className="title">
            Straight from <em>their camera rolls.</em>
          </h2>
          <p className="subtitle">
            No scripts, no paid actors — just <strong>verified buyers</strong>, in their own photos and their own words.
          </p>
        </div>

        <div className="rolls__grid scroller">
          {featuredReviews.map((r, i) => (
            <article className="roll-card reveal" key={r.name} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="roll-card__photo" style={{ '--tint': r.tint }}>
                <span className="verified">
                  <Icon name="check" size={11} strokeWidth={3} /> Verified
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
          Read all 1,010 reviews <Icon name="arrow" size={16} />
        </a>
      </div>
    </section>
  );
}
