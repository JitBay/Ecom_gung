import { useReveal } from '../../lib/hooks.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './CameraRolls.css';

const productEverydayPhotos = [
  {
    id: 'photo-5',
    photo: '/reviews/5.webp',
    phrase: {
      fr: 'Invisible sous une chemise',
      en: 'Invisible under a dress shirt',
    },
    detail: {
      fr: 'Maintien dorsal & redressement naturel des épaules',
      en: 'Ergonomic posture support & shoulder alignment',
    },
    tint: '#1e3a8a',
  },
  {
    id: 'photo-6',
    photo: '/reviews/6.webp',
    phrase: {
      fr: 'Lisse sous un t-shirt ajusté',
      en: 'Smooth under a fitted tee',
    },
    detail: {
      fr: 'Gainage instantané de la sangle abdominale',
      en: 'Instant core & abdomen smoothing',
    },
    tint: '#374151',
  },
  {
    id: 'photo-26',
    photo: '/reviews/26.webp',
    phrase: {
      fr: 'Maintien impeccable toute la journée',
      en: 'Stays in place all day',
    },
    detail: {
      fr: 'Maille respirante seconde peau qui ne remonte pas',
      en: 'Breathable second skin knit that never rides up',
    },
    tint: '#111827',
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
            Vela Sculpt™
          </span>
          <h2 className="title">
            {lang === 'fr' ? (
              <>Vela Sculpt™ <em>au quotidien.</em></>
            ) : (
              <>Vela Sculpt™ <em>in everyday life.</em></>
            )}
          </h2>
          <p className="subtitle">
            {lang === 'fr' ? (
              <>Aperçu en conditions réelles : maintien postural et lissage invisible sous n’importe quelle tenue.</>
            ) : (
              <>Real life preview: postural support and invisible smoothing under any daily outfit.</>
            )}
          </p>
        </div>

        <div className="rolls__grid scroller">
          {productEverydayPhotos.map((item, i) => {
            const phrase = item.phrase[lang] || item.phrase.fr;
            const detail = item.detail[lang] || item.detail.fr;

            return (
              <article className="roll-card" key={item.id} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="roll-card__photo" style={{ '--tint': item.tint }}>
                  <img
                    src={item.photo}
                    alt={phrase}
                    className="roll-card__img"
                    loading="lazy"
                    decoding="async"
                    width="300"
                    height="330"
                  />
                </div>
                <div className="roll-card__body">
                  <strong style={{ fontSize: '15px', color: 'var(--ink)' }}>{phrase}</strong>
                  <p style={{ marginTop: '6px', fontSize: '13px', color: 'var(--muted)' }}>{detail}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
