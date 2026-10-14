import Accordion from '../ui/Accordion.jsx';
import Icon from '../ui/Icon.jsx';
import { faq } from '../../data/faq.js';
import { useReveal } from '../../lib/hooks.js';
import './Faq.css';

const items = faq.map((f) => ({ tag: f.tag, title: f.q, content: <p>{f.a}</p> }));

export default function Faq() {
  const ref = useReveal();
  return (
    <section className="faq" ref={ref}>
      <div className="faq__inner">
        <div className="section-head reveal">
          <span className="eyebrow">Your questions, answered</span>
          <h2 className="title">
            Everything you're <em>wondering about.</em>
          </h2>
          <p className="subtitle">The questions our customers ask most before buying — answered honestly.</p>
          <div className="faq__trust">
            <span>
              <Icon name="shield" size={15} /> 90-Day Guarantee
            </span>
            <span>
              <Icon name="sparkle" size={15} /> Patented Technology
            </span>
            <span>
              <Icon name="user" size={15} /> 250,000+ Women
            </span>
          </div>
        </div>

        <div className="reveal">
          <Accordion items={items} variant="card" icon="plus" />
        </div>

        <div className="faq__contact reveal">
          <p>Still have a question? We usually reply within a few hours.</p>
          <a href="mailto:hello@example.com" className="btn btn--dark">
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
