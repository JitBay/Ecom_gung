import Icon from '../ui/Icon.jsx';
import { stats, statsEn } from '../../data/product.js';
import { useReveal } from '../../lib/hooks.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './QualitySection.css';

const tilesFr = [
  {
    title: 'Design sculpt anatomique',
    sub: 'Gainage 3D ciblé & soutien abdominal',
    img: '/images/textile/anatomical-sculpt.png',
  },
  {
    title: 'Coupe athlétique',
    sub: 'Maintien postural naturel & silhouette redressée',
    img: '/images/textile/athletic-fit.png',
  },
  {
    title: 'Performance respirante',
    sub: 'Maille micro-aérée & évacuation active de la sueur',
    img: '/images/textile/breathable-performance.png',
  },
  {
    title: 'Finition & textile premium',
    sub: 'Coutures ultra-plates seconde peau invisibles',
    img: '/images/textile/premium-fabric.png',
  },
];

const tilesEn = [
  {
    title: 'Anatomical Sculpt Design',
    sub: 'Targeted 3D midsection & core shaping',
    img: '/images/textile/anatomical-sculpt.png',
  },
  {
    title: 'Athletic Fit',
    sub: 'Ergonomic contouring & natural posture support',
    img: '/images/textile/athletic-fit.png',
  },
  {
    title: 'Breathable Performance',
    sub: 'Micro-ventilated mesh & active thermal regulation',
    img: '/images/textile/breathable-performance.png',
  },
  {
    title: 'Premium Fabric & Finishing',
    sub: 'Ultra-flat bonded seams & second-skin feel',
    img: '/images/textile/premium-fabric.png',
  },
];

const featuresFr = [
  {
    icon: 'sparkle',
    title: 'Lissage visuel immédiat',
    text: 'Aplatit instantanément la zone abdominale et estompe les plis sous les chemises ajustées ou les t-shirts fins.',
  },
  {
    icon: 'shield',
    title: 'Discrétion absolue (col & coutures)',
    text: 'L’encolure dégagée reste invisible même avec le premier bouton de chemise ouvert. Aucune démarcation aux épaules.',
  },
  {
    icon: 'pulse',
    title: 'Maintien postural ergonomique',
    text: 'Les bandes dorsales stimulent la proprioception pour encourager une posture droite sans comprimer la cage thoracique.',
  },
  {
    icon: 'waves',
    title: 'Fibre seconde peau thermo-régulante',
    text: 'Composé de 88% polyamide et 12% élasthanne technique, il évacue l’humidité et neutralise les odeurs toute la journée.',
  },
];

const featuresEn = [
  {
    icon: 'sparkle',
    title: 'Instant Visual Smoothing',
    text: 'Instantly smooths the midsection and removes awkward creases under fitted dress shirts and summer tees.',
  },
  {
    icon: 'shield',
    title: 'Zero Demarcation (Collar & Seams)',
    text: 'Engineered neckline stays completely invisible even with top shirt buttons undone. No visible shoulder lines.',
  },
  {
    icon: 'pulse',
    title: 'Ergonomic Posture Support',
    text: 'Targeted dorsal tension zones gently guide shoulders back and open the chest without feeling restrictive.',
  },
  {
    icon: 'waves',
    title: 'Breathable Second-Skin Fiber',
    text: 'Engineered 88% technical polyamide and 12% elastane blend wicks away perspiration for all-day thermal comfort.',
  },
];

export default function QualitySection() {
  const ref = useReveal();
  const { lang } = useLanguage();
  const tiles = lang === 'fr' ? tilesFr : tilesEn;
  const features = lang === 'fr' ? featuresFr : featuresEn;
  const statsList = lang === 'fr' ? stats : (statsEn || stats);

  return (
    <section className="quality" ref={ref} id="technologie">
      <div className="container quality__inner">
        <div className="quality__media reveal">
          <div className="quality__header">
            <span className="eyebrow">{lang === 'fr' ? 'Pourquoi Vela Labs ?' : 'Why Vela Labs?'}</span>
            <h2 className="title">
              {lang === 'fr' ? (
                <>Chaque détail pensé pour <em>votre quotidien.</em></>
              ) : (
                <>Every detail, <em>engineered.</em></>
              )}
            </h2>
            <p className="quality__lead">
              {lang === 'fr'
                ? 'La plupart des sous-vêtements gainants serrent trop ou tiennent chaud. Vela Sculpt™ a été pensé pour allier discrétion invisible sous vos vêtements, confort 24h et maintien postural naturel.'
                : 'Most shapewear feels restrictive or runs hot. Vela Sculpt™ is engineered for discreet invisibility under everyday clothes, 24-hour comfort, and natural posture support.'}
            </p>
          </div>

          <div className="quality__tiles">
            {tiles.map((t) => (
              <div key={t.title} className="tile">
                <img src={t.img} alt={t.title} className="tile__img" loading="lazy" />
                <div className="tile__shade" aria-hidden="true" />
                <div className="tile__text-wrap">
                  <strong>{t.title}</strong>
                  <span>{t.sub}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="quality__pills">
            <span>
              <i className="dot" /> {lang === 'fr' ? 'Conception Ergonomique Homme' : 'Men’s Ergonomic Design'}
            </span>
            <span>
              <i className="dot" /> {lang === 'fr' ? 'Testé en conditions réelles' : 'Tested in Daily Wear'}
            </span>
          </div>
        </div>

        <div className="quality__text reveal">
          <div className="quality__stats">
            {statsList.map((s) => (
              <div key={s.label}>
                <b>
                  {s.value}
                  <small>{s.unit}</small>
                </b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="quality__features">
            {features.map((f) => (
              <div key={f.title} className="feature">
                <span className="feature__icon">
                  <Icon name={f.icon} size={16} />
                </span>
                <strong>{f.title}</strong>
                <p>{f.text}</p>
              </div>
            ))}
          </div>

          <a href="#product" className="btn btn--gold">
            {lang === 'fr' ? 'Essayer sans risque — Garantie 30 Jours' : 'Try Risk-Free — 30-Day Guarantee'}{' '}
            <Icon name="arrow" size={18} />
          </a>
          <p className="quality__note">
            {lang === 'fr'
              ? '30 jours pour tester chez vous. Satisfait ou remboursé selon nos conditions.'
              : '30 days to try it at home. Love it or get a full refund.'}
          </p>
        </div>
      </div>
    </section>
  );
}
