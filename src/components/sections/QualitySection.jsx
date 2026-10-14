import Icon from '../ui/Icon.jsx';
import { stats } from '../../data/product.js';
import { useReveal } from '../../lib/hooks.js';
import './QualitySection.css';

const tiles = [
  { title: '3D Sculpt Lines', sub: 'targeted compression', look: 'ribs' },
  { title: 'Stay-Put Waistband', sub: 'no rolling, no digging', look: 'band' },
  { title: 'Instant Lift', sub: 'built-in push-up effect', look: 'lift' },
  { title: 'Premium Fabric', sub: 'soft, breathable & squat-proof', look: 'knit' },
];

const features = [
  { icon: 'waves', title: '3D Sculpt Lines', text: 'Compression zones mapped to thighs and glutes. Each ridge works while you move.' },
  { icon: 'shield', title: 'Stay-Put Waistband', text: 'No rolling. No digging. Locks in place so you forget you are wearing them.' },
  { icon: 'trend', title: 'Instant Lift', text: 'Built-in push-up shaping sculpts your glutes the moment you pull them on.' },
  { icon: 'heart', title: '100% Squat-Proof', text: '90/10 polyamide-elastane. Breathable, opaque compression that feels like support.' },
];

export default function QualitySection() {
  const ref = useReveal();
  return (
    <section className="quality" ref={ref}>
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
              <i className="dot" /> Patented 3D-Sculpt
            </span>
            <span>
              <i className="dot" /> Clinically tested
            </span>
          </div>
        </div>

        <div className="quality__text reveal">
          <span className="eyebrow">Patented 3D technology</span>
          <h2 className="title">
            Every detail, <em>engineered.</em>
          </h2>
          <p className="quality__lead">
            Most leggings hide the problem. These work on it. The 3D-ribbed fabric gives a gentle micro-massage with
            every step — helping circulation and smoothing the look of skin over time.
          </p>

          <div className="quality__stats">
            {stats.map((s) => (
              <div key={s.label}>
                <b>
                  {s.value.replace('+', '')}
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
            Try risk-free — 90 days <Icon name="arrow" size={18} />
          </a>
          <p className="quality__note">Obsessed — or it’s free. No questions asked.</p>
        </div>
      </div>
    </section>
  );
}
