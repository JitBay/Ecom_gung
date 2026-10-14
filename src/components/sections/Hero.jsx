import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import ProductArt from '../ui/ProductArt.jsx';
import { colors } from '../../data/product.js';
import './Hero.css';

const perks = ['Lighter legs from hour one', 'Invisible under clothes', 'Comfortable enough to forget'];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__text">
        <div className="hero__rating">
          <Stars value={5} size={17} />
          <span>
            <strong>4.8</strong>/5 <i>|</i> <strong>250,000+</strong> women
          </span>
        </div>

        <h1 className="hero__title">
          <span>Lighter legs.</span>
          <span>Smoother-looking skin.</span>
          <span>
            The minute you <u>pull them on</u>.
          </span>
        </h1>

        <p className="hero__lead">
          3D-sculpt compression leggings for heavy, achy legs and skin that looks smoother. Not a cream. Not a
          wait-and-see. <strong>Wear them 90 days or get your money back.</strong>
        </p>

        <a href="#product" className="btn btn--dark hero__cta">
          Try risk-free for 90 days <Icon name="arrow" size={18} />
        </a>

        <div className="hero__proof">
          <span>
            <Icon name="shield" size={17} /> 90-day money-back guarantee
          </span>
          <span>
            <i className="live-dot" /> 3,000+ women order these every single day
          </span>
        </div>

        <ul className="hero__perks">
          {perks.map((p) => (
            <li key={p}>
              <span className="tick">
                <Icon name="check" size={12} strokeWidth={2.6} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__media">
        <div className="hero__figures">
          {colors.slice(0, 3).map((c, i) => (
            <ProductArt key={c.id} color={c.hex} pose={['side', 'front', 'back'][i]} className="hero__figure" />
          ))}
        </div>
        <div className="hero__badge">
          <b>90</b>
          <div>
            <strong>Days to decide</strong>
            <span>Full money-back guarantee</span>
          </div>
          <p>
            <span className="tick">
              <Icon name="check" size={12} strokeWidth={2.6} />
            </span>
            Trusted by 250,000+ women worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
