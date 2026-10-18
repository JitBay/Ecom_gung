import Icon from '../ui/Icon.jsx';
import { stats } from '../../data/product.js';
import { useReveal } from '../../lib/hooks.js';
import './QualitySection.css';

const tiles = [
  { title: 'Zones de Gainage 3D', sub: 'maintien abdominal ciblé', look: 'ribs' },
  { title: 'Coutures Ultra-Plates', sub: 'invisible sous chemise & t-shirt', look: 'band' },
  { title: 'Maintien Postural en X', sub: 'redressement doux du dos', look: 'lift' },
  { title: 'Maille Micro-Respirante', sub: 'évacuation active de la sueur', look: 'knit' },
];

const features = [
  {
    icon: 'sparkle',
    title: 'Lissage Visuel Immédiat',
    text: 'Aplatit instantanément la zone abdominale et estompe les plis sous les chemises ajustées ou les t-shirts fins.',
  },
  {
    icon: 'shield',
    title: 'Discrétion Absolue (Col & Coutures)',
    text: 'L’encolure dégagée reste invisible même avec le premier bouton de chemise ouvert. Aucune démarcation aux épaules.',
  },
  {
    icon: 'pulse',
    title: 'Maintien Postural Ergonomique',
    text: 'Les bandes dorsales stimulent la proprioception pour encourager une posture droite sans comprimer la cage thoracique.',
  },
  {
    icon: 'waves',
    title: 'Fibre Seconde Peau Thermo-Régulante',
    text: 'Composé de 88% polyamide et 12% élasthanne technique, il évacue l’humidité et neutralise les odeurs toute la journée.',
  },
];

export default function QualitySection() {
  const ref = useReveal();
  return (
    <section className="quality" ref={ref} id="technologie">
      <div className="container quality__inner">
        <div className="quality__media reveal">
          <div className="quality__tiles">
            {tiles.map((t) => (
              <div key={t.title} className={`tile tile--${t.look}`}>
                <strong>{t.title}</strong>
                <span>{t.sub}</span>
              </div>
            ))}
          </div>
          <div className="quality__pills">
            <span>
              <i className="dot" /> Conception Ergonomique Homme
            </span>
            <span>
              <i className="dot" /> Testé en Conditions Réelles
            </span>
          </div>
        </div>

        <div className="quality__text reveal">
          <span className="eyebrow">Pourquoi Vela Labs ?</span>
          <h2 className="title">
            Chaque détail pensé pour <em>votre quotidien.</em>
          </h2>
          <p className="quality__lead">
            La plupart des sous-vêtements gainants serrent trop ou tiennent chaud. Vela Sculpt™ a été pensé pour allier discrétion invisible sous vos vêtements, confort 24h et maintien postural naturel.
          </p>

          <div className="quality__stats">
            {stats.map((s) => (
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
            Essayer sans risque — Garantie 30 Jours <Icon name="arrow" size={18} />
          </a>
          <p className="quality__note">30 jours pour tester chez vous. Satisfait ou remboursé selon nos conditions.</p>
        </div>
      </div>
    </section>
  );
}
