// The accordion panels under the Add to cart button.
import Accordion from '../ui/Accordion.jsx';
import { fabric, howItWorks, quickFaq, shipping, sizeChart, timeline } from '../../data/product.js';
import './ProductDetails.css';

const HowItWorks = (
  <div className="details">
    <p>Most leggings hide the problem. These work on it: the 3D-ribbed texture massages the skin with every step.</p>
    <ol className="details__steps">
      {howItWorks.map((s, i) => (
        <li key={s.title}>
          <b>{i + 1}</b>
          <div>
            <strong>{s.title}</strong>
            <p>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
    <ul className="details__timeline">
      {timeline.map((t) => (
        <li key={t.when}>
          <strong>{t.when}</strong>
          <span>{t.what}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Fabric = (
  <dl className="details__specs">
    {fabric.map(([k, v]) => (
      <div key={k}>
        <dt>{k}</dt>
        <dd>{v}</dd>
      </div>
    ))}
  </dl>
);

const SizeFit = (
  <div className="details">
    <p>Your weight picks the size; your height tells you how the leg will sit.</p>
    <div className="details__table">
      <table className="size-table">
        <thead>
          <tr>
            <th>Size</th>
            <th>Weight</th>
            <th>Height</th>
            <th>Leg</th>
          </tr>
        </thead>
        <tbody>
          {sizeChart.map((r) => (
            <tr key={r.size}>
              <td>{r.size}</td>
              <td>
                {r.kg[0]}–{r.kg[1]} kg
              </td>
              <td>
                {r.cm[0]}–{r.cm[1]} cm
              </td>
              <td>{r.leg} cm</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Shipping = (
  <div className="details">
    <strong>Shipping</strong>
    <ul className="details__list">
      {shipping.lines.map((l) => (
        <li key={l}>{l}</li>
      ))}
    </ul>
    <strong>Returns</strong>
    <p>{shipping.returns}</p>
  </div>
);

const Questions = (
  <div className="details">
    {quickFaq.map((f) => (
      <div key={f.q}>
        <strong>{f.q}</strong>
        <p>{f.a}</p>
      </div>
    ))}
  </div>
);

const items = [
  { title: 'How It Works', content: HowItWorks },
  { title: 'Features & Fabric', content: Fabric },
  { title: 'Size & Fit', content: SizeFit },
  { title: 'Shipping & Returns', content: Shipping },
  { title: 'Common Questions', content: Questions },
];

export default function ProductDetails() {
  return <Accordion items={items} />;
}
