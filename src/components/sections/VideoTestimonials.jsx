import { useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { videoTestimonials } from '../../data/reviews.js';
import { useReveal } from '../../lib/hooks.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './VideoTestimonials.css';

const tagsEn = [
  'Streamlined look under shirt · 32 yrs',
  'Desk posture support · 48 yrs',
  'No visible lines under summer tee · 27 yrs',
  'Back relief while driving · 56 yrs',
  'After 12 kg weight loss · 41 yrs',
  'Renewed confidence in meetings · 39 yrs',
];

export default function VideoTestimonials() {
  const [playing, setPlaying] = useState(null);
  const ref = useReveal();
  const { lang } = useLanguage();

  return (
    <section className="ugc" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{lang === 'fr' ? 'Témoignages en direct' : 'Live Customer Videos'}</span>
          <h2 className="title">
            {lang === 'fr' ? (
              <>
                Ne nous croyez pas sur parole.
                <br />
                <em>Écoutez leurs retours.</em>
              </>
            ) : (
              <>
                Don’t take our word for it.
                <br />
                <em>Watch theirs.</em>
              </>
            )}
          </h2>
          <p className="subtitle">
            {lang === 'fr'
              ? 'Six hommes, filmés avec leurs propres mots — différentes morphologies, un même résultat sous la chemise.'
              : 'Real men, unscripted in their own words — different body types, one consistent streamlined look.'}
          </p>
        </div>

        <div className="ugc__row scroller">
          {videoTestimonials.map((v, i) => {
            const tag = lang === 'fr' ? v.tag : (tagsEn[i] || v.tag);
            return (
              <button
                key={v.tag}
                className={`ugc-card ${playing === i ? 'is-playing' : ''}`}
                style={{ '--a': v.tint[0], '--b': v.tint[1] }}
                onClick={() => setPlaying(playing === i ? null : i)}
                aria-label={`${lang === 'fr' ? 'Témoignage' : 'Review'}: ${tag}`}
              >
                <span className="ugc-card__sound">
                  <Icon name="sound" size={12} /> {lang === 'fr' ? 'Son' : 'Audio'}
                </span>
                <span className="ugc-card__play">
                  <Icon name="play" size={22} />
                </span>
                <span className="ugc-card__progress" />
                <span className="ugc-card__caption">
                  <strong>
                    <i className="dot" /> {lang === 'fr' ? 'Client Vérifié' : 'Verified Buyer'}
                  </strong>
                  {tag}
                </span>
              </button>
            );
          })}
        </div>

        <div className="ugc__cta reveal">
          <a href="#product" className="btn btn--gold">
            {lang === 'fr' ? 'Essayer avec la Garantie 30 Jours' : 'Try with 30-Day Guarantee'}{' '}
            <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
