import { useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { videoTestimonials } from '../../data/reviews.js';
import { useReveal } from '../../lib/hooks.js';
import './VideoTestimonials.css';

export default function VideoTestimonials() {
  const [playing, setPlaying] = useState(null);
  const ref = useReveal();
  return (
    <section className="ugc" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Témoignages en direct</span>
          <h2 className="title">
            Ne nous croyez pas sur parole.
            <br />
            <em>Écoutez leurs retours.</em>
          </h2>
          <p className="subtitle">Six hommes, filmés avec leurs propres mots — différentes morphologies, un même résultat sous la chemise.</p>
        </div>

        <div className="ugc__row scroller">
          {videoTestimonials.map((v, i) => (
            <button
              key={v.tag}
              className={`ugc-card ${playing === i ? 'is-playing' : ''}`}
              style={{ '--a': v.tint[0], '--b': v.tint[1] }}
              onClick={() => setPlaying(playing === i ? null : i)}
              aria-label={`Témoignage : ${v.tag}`}
            >
              <span className="ugc-card__sound">
                <Icon name="sound" size={12} /> Son
              </span>
              <span className="ugc-card__play">
                <Icon name="play" size={22} />
              </span>
              <span className="ugc-card__progress" />
              <span className="ugc-card__caption">
                <strong>
                  <i className="dot" /> Client Vérifié
                </strong>
                {v.tag}
              </span>
            </button>
          ))}
        </div>

        <div className="ugc__cta reveal">
          <a href="#product" className="btn btn--gold">
            Essayer avec la Garantie 30 Jours <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
