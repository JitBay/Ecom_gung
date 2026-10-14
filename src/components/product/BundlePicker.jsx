import Icon from '../ui/Icon.jsx';
import ProductArt from '../ui/ProductArt.jsx';
import { bundles, colors, sizes } from '../../data/product.js';
import { price } from '../../lib/format.js';
import './BundlePicker.css';

const marquee = Array(14).fill('Limited offer').join(' • ');

// One colour + size row per item in the selected bundle.
function VariantRows({ variants, onChange }) {
  return (
    <div className="variants">
      <p className="variants__label">Color, Size</p>
      {variants.map((v, i) => {
        const hex = colors.find((c) => c.id === v.color).hex;
        return (
          <div className="variant" key={i}>
            <div className="variant__thumb">
              <ProductArt color={hex} pose="side" />
            </div>
            <label className="select">
              <span className="select__dot" style={{ background: hex }} />
              <select value={v.color} onChange={(e) => onChange(i, { color: e.target.value })} aria-label={`Color ${i + 1}`}>
                {colors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
              <Icon name="chevron" size={14} />
            </label>
            <label className="select">
              <select value={v.size} onChange={(e) => onChange(i, { size: e.target.value })} aria-label={`Size ${i + 1}`}>
                {sizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <Icon name="chevron" size={14} />
            </label>
          </div>
        );
      })}
    </div>
  );
}

function BundleCard({ bundle, selected, onSelect, variants, onVariantChange }) {
  const card = (
    <div className={`bundle ${selected ? 'is-selected' : ''}`} onClick={onSelect}>
      <div className="bundle__head">
        <span className="radio" aria-hidden="true" />
        <div className="bundle__title">
          <p>
            <strong>{bundle.title}</strong>
            {bundle.badge && <em className="bundle__badge">{bundle.badge}</em>}
          </p>
          {bundle.subtitle && <span>{bundle.subtitle}</span>}
        </div>
        <div className="bundle__price">
          <strong>{price(bundle.price)}</strong>
          <s>{price(bundle.compareAt)}</s>
        </div>
      </div>

      {selected && (
        <div className="bundle__body" onClick={(e) => e.stopPropagation()}>
          {bundle.freeShipping && (
            <p className="bundle__ship">
              <Icon name="check" size={16} strokeWidth={2.4} /> FREE Shipping
            </p>
          )}
          <VariantRows variants={variants} onChange={onVariantChange} />
        </div>
      )}

      {bundle.gift && (
        <div className="bundle__gift">
          <Icon name="gift" size={18} /> {bundle.gift}
        </div>
      )}
    </div>
  );

  return (
    <li>
      <input type="radio" name="bundle" className="sr-only" checked={selected} onChange={onSelect} aria-label={bundle.title} />
      {bundle.highlight ? (
        <div className="offer-frame">
          <span className="offer-frame__text is-top">{marquee}</span>
          {card}
          <span className="offer-frame__text is-bottom">{marquee}</span>
        </div>
      ) : (
        card
      )}
    </li>
  );
}

export default function BundlePicker({ selectedId, onSelect, variants, onVariantChange }) {
  return (
    <div className="bundles">
      <p className="bundles__heading">Try it risk-free — 90-day guarantee</p>
      <ul>
        {bundles.map((b) => (
          <BundleCard
            key={b.id}
            bundle={b}
            selected={b.id === selectedId}
            onSelect={() => onSelect(b.id)}
            variants={variants}
            onVariantChange={onVariantChange}
          />
        ))}
      </ul>
    </div>
  );
}
