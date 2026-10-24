import Accordion from '../ui/Accordion.jsx';
import Icon from '../ui/Icon.jsx';
import { faq, faqEn } from '../../data/faq.js';
import { brand } from '../../data/site.js';
import { useReveal } from '../../lib/hooks.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './Faq.css';

export default function Faq() {
  const ref = useReveal();
  const { lang } = useLanguage();
  const faqList = lang === 'fr' ? faq : (faqEn || faq);
  const items = faqList.map((f) => ({ tag: f.tag, title: f.q, content: <p>{f.a}</p> }));

  return (
    <section className="faq" ref={ref} id="faq">
      <div className="faq__inner">
        <div className="section-head reveal">
          <span className="eyebrow">{lang === 'fr' ? 'Foire Aux Questions' : 'Frequently Asked Questions'}</span>
          <h2 className="title">
            {lang === 'fr' ? (
              <>Tout ce que vous <em>souhaitez savoir.</em></>
            ) : (
              <>Everything you’re <em>wondering about.</em></>
            )}
          </h2>
          <p className="subtitle">
            {lang === 'fr'
              ? 'Les réponses transparentes aux questions les plus posées avant de commander.'
              : 'Honest, straightforward answers to the most common customer questions.'}
          </p>
          <div className="faq__trust">
            <span>
              <Icon name="shield" size={15} /> {lang === 'fr' ? 'Garantie 30 Jours' : '30-Day Guarantee'}
            </span>
            <span>
              <Icon name="sparkle" size={15} /> {lang === 'fr' ? 'Maille 3D Respirante' : '3D Breathable Mesh'}
            </span>
            <span>
              <Icon name="user" size={15} /> 45 000+ {lang === 'fr' ? 'Hommes' : 'Men'}
            </span>
          </div>
        </div>

        <div className="reveal">
          <Accordion items={items} variant="card" icon="plus" />
        </div>

        <div className="faq__contact reveal">
          <p>
            {lang === 'fr'
              ? 'Vous avez une autre question ? Notre équipe francophone vous répond sous 24h.'
              : 'Have another question? Our dedicated support team replies within 24 hours.'}
          </p>
          <a href={`mailto:${brand.supportEmail}`} className="btn btn--dark">
            {lang === 'fr' ? 'Contacter le support client' : 'Contact Customer Support'}
          </a>
        </div>
      </div>
    </section>
  );
}
