import { useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { videoTestimonials } from '../../data/reviews.js';
import { useReveal } from '../../lib/hooks.js';
import './VideoTestimonials.css';

// Vertical "video" cards. Put real .mp4 files in /public/videos and swap the placeholder for <video>.
export default function VideoTestimonials() {
  const [playing, setPlaying] = useState(null);
  const ref = useReveal();
  return (
    <section className="ugc" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Caught on camera</span>
          <h2 className="title">
            Don’t take our word for it.
            <br />
            <em>Watch theirs.</em>
          </h2>
          <p className="subtitle">Six women, filmed in their own words — different bodies, different reasons, same result.</p>
        </div>

        <div className="ugc__row scroller">
          {videoTestimonials.map((v, i) => (
            <button
              key={v.tag}
              className={`ugc-card ${playing === i ? 'is-playing' : ''}`}
              style={{ '--a': v.tint[0], '--b': v.tint[1] }}
              onClick={() => setPlaying(playing === i ? null : i)}
              aria-label={`Play testimonial: ${v.tag}`}
            >
              <span className="ugc-card__sound">
                <Icon name="sound" size={12} /> Sound
              </span>
              <span className="ugc-card__play">
                <Icon name="play" size={22} />
              </span>
              <span className="ugc-card__progress" />
              <span className="ugc-card__caption">
                <strong>
                  <i className="dot" /> Verified Customer
                </strong>
                {v.tag}
              </span>
            </button>
          ))}
        </div>

        <div className="ugc__cta reveal">
          <a href="#product" className="btn btn--gold">
            Try them for yourself <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
