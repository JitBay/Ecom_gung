import Accordion from '../ui/Accordion.jsx';
import { fabric, quickFaq, shipping, sizeChart } from '../../data/product.js';
import './ProductDetails.css';

const FeaturesContent = (
  <div className="details">
    <p>
      Le t-shirt de compression ergonomique <strong>Vela Sculpt™</strong> utilise un tricot technique tridimensionnel conçu pour lisser les formes sans comprimer excessivement la cage thoracique.
    </p>
    <dl className="details__specs">
      {fabric.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  </div>
);

const SizeFitContent = (
  <div className="details">
    <p>Choisissez votre taille habituelle de t-shirt. En cas d’hésitation entre deux tailles : optez pour la plus petite pour une compression sportive prononcée, ou la plus grande pour un confort souple de bureau.</p>
    <div className="details__table">
      <table className="size-table">
        <thead>
          <tr>
            <th>Taille</th>
            <th>Poids (kg)</th>
            <th>Taille (cm)</th>
            <th>Poitrine</th>
            <th>Taille</th>
          </tr>
        </thead>
        <tbody>
          {sizeChart.map((r) => (
            <tr key={r.size}>
              <td><strong>{r.size}</strong></td>
              <td>{r.kg[0]}–{r.kg[1]} kg</td>
              <td>{r.cm[0]}–{r.cm[1]} cm</td>
              <td>{r.chest}</td>
              <td>{r.waist}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ShippingContent = (
  <div className="details">
    <strong>Expédition & Délais</strong>
    <ul className="details__list">
      {shipping.lines.map((l) => (
        <li key={l}>{l}</li>
      ))}
    </ul>
    <strong>Garantie Satisfait ou Remboursé de 30 Jours</strong>
    <p>{shipping.returns}</p>
  </div>
);

const QuestionsContent = (
  <div className="details">
    {quickFaq.map((f) => (
      <div key={f.q} style={{ marginBottom: 14 }}>
        <strong>{f.q}</strong>
        <p style={{ marginTop: 4 }}>{f.a}</p>
      </div>
    ))}
  </div>
);

const items = [
  { title: 'Caractéristiques Techniques & Matière', content: FeaturesContent },
  { title: 'Guide des Tailles & Coupe Homme', content: SizeFitContent },
  { title: 'Livraison & Garantie 30 Jours', content: ShippingContent },
  { title: 'Questions Fréquentes', content: QuestionsContent },
];

export default function ProductDetails() {
  return <Accordion items={items} />;
}
