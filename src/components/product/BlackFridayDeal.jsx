import { useLanguage } from '../../context/LanguageContext.jsx';
import './BlackFridayDeal.css';

export default function BlackFridayDeal() {
  const { dict } = useLanguage();
  const d = dict.black_friday?.deal || {
    sale_badge: 'SALE',
    tag: "Plus grande offre de l'année",
    big: "Jusqu'à -50%",
    row1_lead: '2 t-shirts achetés :',
    row1_text: 'votre 3ème t-shirt 100% OFFERT',
    row2_lead: 'Pack le plus choisi :',
    row2_text: "seulement 19,99€ l'unité",
    row3_lead: 'Livraison Gratuite :',
    row3_text: "suivie dès aujourd'hui (6-12 jours)",
    foot: 'Choisissez votre pack ci-dessous · 30 jours satisfait ou remboursé',
  };

  return (
    <div className="ixbm-deal" id="bm-deal" role="note" aria-label="Offre Black Friday">
      <div className="ixbm-deal__head">
        <span className="ixbm-deal__sale">{d.sale_badge}</span>
        <span className="ixbm-deal__tag">{d.tag}</span>
      </div>
      <p className="ixbm-deal__big">{d.big}</p>
      <ul className="ixbm-deal__rows">
        <li>
          <strong>{d.row1_lead}</strong> {d.row1_text}
        </li>
        <li>
          <strong>{d.row2_lead}</strong> {d.row2_text}
        </li>
        <li>
          <strong>{d.row3_lead}</strong> {d.row3_text}
        </li>
      </ul>
      <p className="ixbm-deal__foot">
        <span aria-hidden="true">&darr;</span> {d.foot}
      </p>
    </div>
  );
}
