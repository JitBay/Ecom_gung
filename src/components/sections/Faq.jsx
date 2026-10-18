import Accordion from '../ui/Accordion.jsx';
import Icon from '../ui/Icon.jsx';
import { faq } from '../../data/faq.js';
import { brand } from '../../data/site.js';
import { useReveal } from '../../lib/hooks.js';
import './Faq.css';

const items = faq.map((f) => ({ tag: f.tag, title: f.q, content: <p>{f.a}</p> }));

export default function Faq() {
  const ref = useReveal();
  return (
    <section className="faq" ref={ref} id="faq">
      <div className="faq__inner">
        <div className="section-head reveal">
          <span className="eyebrow">Foire Aux Questions</span>
          <h2 className="title">
            Tout ce que vous <em>souhaitez savoir.</em>
          </h2>
          <p className="subtitle">Les réponses transparentes aux questions les plus posées avant de commander.</p>
          <div className="faq__trust">
            <span>
              <Icon name="shield" size={15} /> Garantie 30 Jours
            </span>
            <span>
              <Icon name="sparkle" size={15} /> Maille 3D Respirante
            </span>
            <span>
              <Icon name="user" size={15} /> 45 000+ Hommes
            </span>
          </div>
        </div>

        <div className="reveal">
          <Accordion items={items} variant="card" icon="plus" />
        </div>

        <div className="faq__contact reveal">
          <p>Vous avez une autre question ? Notre équipe francophone vous répond sous 24h.</p>
          <a href={`mailto:${brand.supportEmail}`} className="btn btn--dark">
            Contacter le support client
          </a>
        </div>
      </div>
    </section>
  );
}
