import { useMemo } from 'react';
import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import CountryFlag from '../ui/CountryFlag.jsx';
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


export default function CameraRolls({ limit = 5 }) {
  const ref = useReveal();
  const { lang } = useLanguage();
  const displayedReviews = useMemo(() => {
    let list = [...featuredReviews];
    if (lang === 'en') {
      // Prioritize US/Canada verified buyers first (Jason M., Chen Z.) ahead of French reviews
      list.sort((a, b) => {
        const aUS = a.country === 'US' || a.country === 'CA' ? 1 : 0;
        const bUS = b.country === 'US' || b.country === 'CA' ? 1 : 0;
        return bUS - aUS;
      });
    }
    return limit ? list.slice(0, limit) : list;
  }, [lang, limit]);

  return (
    <section className="rolls" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">
            {lang === 'fr' ? 'Retours clients en images' : 'Customer Photos'}
          </span>
          <p className="rolls__score">
            <Stars value={4.9} size={15} />{' '}
            <strong>4.9 / 5</strong> ·{' '}
            {lang === 'fr' ? 'Garantie 30 Jours · Essai sans risque' : '30-Day Money-Back Guarantee'}
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
              <>Aperçu en photos réelles : le maintien et le lissage du Vela Sculpt™ sous vos vêtements au quotidien.</>
            ) : (
              <>Real customer photos: see the posture support and slimming effect of Vela Sculpt™ under daily wear.</>
            )}
          </p>
        </div>

        <div className="rolls__grid scroller">
          {displayedReviews.map((r, i) => {
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
              <article
                className="roll-card reveal"
                key={r.name + i}
                style={{ transitionDelay: `${i * 80}ms`, cursor: 'pointer' }}
                onClick={() => {
                  const target = document.getElementById('product') || document.querySelector('.bundles');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    const target = document.getElementById('product') || document.querySelector('.bundles');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                aria-label={lang === 'fr' ? 'Voir l’offre produit' : 'View product offer'}
              >
                <div className="roll-card__photo" style={{ '--tint': r.tint }}>
                  {r.photo ? (
                    r.photo.endsWith('.mp4') ? (
                      <video
                        src={r.photo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        width="300"
                        height="330"
                        className="roll-card__img"
                      />
                    ) : (
                      <img
                        src={r.photo}
                        alt={r.name}
                        className="roll-card__img"
                        loading="lazy"
                        decoding="async"
                        width="300"
                        height="330"
                      />
                    )
                  ) : (
                    <span className="roll-card__initial">{r.name[0]}</span>
                  )}
                </div>
                <div className="roll-card__body">
                  <Stars value={5} size={14} />
                  <p>
                    <Highlight text={reviewItem.text} bold={reviewItem.bold} />
                  </p>
                  <footer>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <strong>{reviewItem.name}</strong>
                      {reviewItem.country && <CountryFlag code={reviewItem.country} size="sm" />}
                    </div>
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
          {lang === 'fr' ? 'Consulter les avis clients' : 'Read all customer reviews'}{' '}
          <Icon name="arrow" size={16} />
        </a>
      </div>
    </section>
  );
}
