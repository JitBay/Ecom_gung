import { useLanguage } from '../../context/LanguageContext.jsx';
import './BlackFridayDeal.css';

export default function BlackFridayDeal({ model, isDiscovery = false }) {
  const { dict, lang } = useLanguage();
  const handle = isDiscovery ? 'pack-decouverte' : (model?.handle || 'vela-sculpt-sans-manches');
  const dealsMap = dict.black_friday?.deals_by_handle || {};
  const d = dealsMap[handle] || dealsMap['vela-sculpt-sans-manches'] || {};
  const isPack = handle === 'pack-decouverte';
  const saleBadge = lang === 'fr' ? (isPack ? 'Offre star' : 'Black Friday') : (isPack ? 'Star Deal' : 'Sale');

  return (
    <div className="ixbm-deal" id="bm-deal" role="note" aria-label="Offre Black Friday">
      <div className="ixbm-deal__head">
        <span className="ixbm-deal__sale">{saleBadge}</span>
        <span className="ixbm-deal__tag">{d.tag}</span>
      </div>
      <div className="ixbm-deal__price-row">
        <p className="ixbm-deal__big">{d.big}</p>
        {d.compare && (
          <span className="ixbm-deal__compare"><s>{d.compare}</s></span>
        )}
      </div>
      <ul className="ixbm-deal__rows">
        {d.row1_lead && (
          <li>
            <strong>{d.row1_lead}</strong> {d.row1_text}
          </li>
        )}
        {d.row2_lead && (
          <li>
            <strong>{d.row2_lead}</strong> {d.row2_text}
          </li>
        )}
        {d.row3_lead && (
          <li>
            <strong>{d.row3_lead}</strong> {d.row3_text}
          </li>
        )}
      </ul>
      <p className="ixbm-deal__foot">
        <span aria-hidden="true">&darr;</span> {d.foot}
      </p>
    </div>
  );
}
