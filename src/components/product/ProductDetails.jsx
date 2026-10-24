import Accordion from '../ui/Accordion.jsx';
import {
  fabric,
  fabricEn,
  quickFaq,
  quickFaqEn,
  shipping,
  shippingEn,
  sizeChart,
} from '../../data/product.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './ProductDetails.css';

const defaultTechDetailsFr = [
  { label: 'Maille 3D respirante', desc: 'Évacuation active de la transpiration et thermo-régulation.' },
  { label: 'Tissu seconde peau ultra-discret', desc: 'Invisible sous les vêtements, coutures plates ergonomiques.' },
  { label: 'Zones de maintien ciblé', desc: 'Gainage abdominal et maintien postural sans compression excessive.' },
  { label: 'Entretien facile', desc: 'Lavage délicat à 30°C en machine, séchage rapide à l’air libre.' },
];

const defaultTechDetailsEn = [
  { label: 'Breathable 3D Mesh', desc: 'Active moisture-wicking and all-day thermal regulation.' },
  { label: 'Discreet Second-Skin Fabric', desc: 'Zero lines under clothes, flat ergonomic seams.' },
  { label: 'Targeted Core Support', desc: 'Abdominal smoothing and posture support without restriction.' },
  { label: 'Easy Care', desc: 'Delicate machine wash at 30°C, fast air drying.' },
];

export default function ProductDetails({ model }) {
  const { lang } = useLanguage();

  const techDetails =
    lang === 'fr'
      ? model?.technicalDetails || defaultTechDetailsFr
      : defaultTechDetailsEn;

  const currentFabric = lang === 'fr' ? fabric : (fabricEn || fabric);
  const currentShipping = lang === 'fr' ? shipping : (shippingEn || shipping);
  const currentFaq = lang === 'fr' ? quickFaq : (quickFaqEn || quickFaq);

  const FeaturesContent = (
    <div className="details">
      <p style={{ marginBottom: 12 }}>
        {lang === 'fr'
          ? (model?.text ||
            'Le vêtement de compression ergonomique Vela Sculpt™ utilise un tricot technique 3D conçu pour lisser les formes et soutenir la posture sans comprimer la cage thoracique.')
          : 'Vela Sculpt™ ergonomic compression wear utilizes engineered 3D knit fabric to streamline your physique and support posture without uncomfortable restriction.'}
      </p>
      <ul className="details__tech-list" style={{ paddingLeft: 18, lineHeight: 1.6, marginBottom: 16 }}>
        {techDetails.map((t) => (
          <li key={t.label} style={{ marginBottom: 6 }}>
            <strong>{t.label} :</strong> {t.desc}
          </li>
        ))}
      </ul>
      <dl className="details__specs">
        {currentFabric.map(([k, v]) => (
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
      <p>
        {lang === 'fr'
          ? 'Choisissez votre taille habituelle de t-shirt. En cas d’hésitation entre deux tailles : optez pour la plus petite pour une compression sportive prononcée, ou la plus grande pour un confort souple de bureau.'
          : 'Choose your regular shirt size. If between sizes: choose the smaller size for firmer athletic compression, or the larger size for relaxed everyday comfort.'}
      </p>
      <div className="details__table">
        <table className="size-table">
          <thead>
            <tr>
              <th>{lang === 'fr' ? 'Taille' : 'Size'}</th>
              <th>{lang === 'fr' ? 'Poids (kg)' : 'Weight (kg)'}</th>
              <th>{lang === 'fr' ? 'Taille (cm)' : 'Height (cm)'}</th>
              <th>{lang === 'fr' ? 'Poitrine' : 'Chest'}</th>
              <th>{lang === 'fr' ? 'Taille' : 'Waist'}</th>
            </tr>
          </thead>
          <tbody>
            {sizeChart.map((r) => (
              <tr key={r.size}>
                <td>
                  <strong>{r.size}</strong>
                </td>
                <td>
                  {r.kg[0]}–{r.kg[1]} kg
                </td>
                <td>
                  {r.cm[0]}–{r.cm[1]} cm
                </td>
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
      <strong>{lang === 'fr' ? 'Expédition & Délais' : 'Shipping & Delivery'}</strong>
      <ul className="details__list">
        {currentShipping.lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <strong style={{ marginTop: 12, display: 'block' }}>
        {lang === 'fr' ? 'Garantie Satisfait ou Remboursé de 30 Jours' : '30-Day Money-Back Guarantee'}
      </strong>
      <p style={{ marginTop: 4 }}>{currentShipping.returns}</p>
    </div>
  );

  const QuestionsContent = (
    <div className="details">
      {currentFaq.map((f) => (
        <div key={f.q} style={{ marginBottom: 14 }}>
          <strong>{f.q}</strong>
          <p style={{ marginTop: 4 }}>{f.a}</p>
        </div>
      ))}
    </div>
  );

  const items = [
    {
      title: lang === 'fr' ? 'Caractéristiques Techniques & Matière' : 'Technical Specifications & Fabric',
      content: FeaturesContent,
    },
    {
      title: lang === 'fr' ? 'Guide des Tailles & Coupe Homme' : 'Size Guide & Fit',
      content: SizeFitContent,
    },
    {
      title: lang === 'fr' ? 'Livraison & Garantie 30 Jours' : 'Shipping & 30-Day Guarantee',
      content: ShippingContent,
    },
    {
      title: lang === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions',
      content: QuestionsContent,
    },
  ];

  return <Accordion items={items} />;
}
