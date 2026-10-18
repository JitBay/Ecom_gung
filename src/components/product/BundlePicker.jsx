import Icon from '../ui/Icon.jsx';
import { bundles, colors, sizes } from '../../data/product.js';
import { price } from '../../lib/format.js';
import './BundlePicker.css';

const marquee = Array(12).fill('Offre Limitée').join(' • ');

function VariantRows({ variants, onChange, productImage }) {
  return (
    <div className="variants">
      <p className="variants__label">Couleur & Taille par article :</p>
      {variants.map((v, i) => {
        const currentColor = colors.find((c) => c.id === v.color) || colors[0];
        return (
          <div className="variant" key={i}>
            <div className="variant__thumb">
              <img
                src={productImage || '/images/products/demi-manches/1.jpg'}
                alt="Miniature"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <label className="select">
              <span className="select__dot" style={{ background: currentColor.hex }} />
              <select value={v.color} onChange={(e) => onChange(i, { color: e.target.value })} aria-label={`Couleur article ${i + 1}`}>
                {colors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
              <Icon name="chevron" size={14} />
            </label>
            <label className="select">
              <select value={v.size} onChange={(e) => onChange(i, { size: e.target.value })} aria-label={`Taille article ${i + 1}`}>
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

function BundleCard({ bundle, selected, onSelect, variants, onVariantChange, productImage }) {
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
              <Icon name="check" size={16} strokeWidth={2.4} /> LIVRAISON OFFERTE
            </p>
          )}
          <VariantRows variants={variants} onChange={onVariantChange} productImage={productImage} />
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

export default function BundlePicker({ selectedId, onSelect, variants, onVariantChange, productImage }) {
  return (
    <div className="bundles">
      <p className="bundles__heading">
        <Icon name="shield" size={16} /> Essayez sans risque — Garantie Satisfait ou Remboursé de 30 jours
      </p>
      <ul>
        {bundles.map((b) => (
          <BundleCard
            key={b.id}
            bundle={b}
            selected={b.id === selectedId}
            onSelect={() => onSelect(b.id)}
            variants={variants}
            onVariantChange={onVariantChange}
            productImage={productImage}
          />
        ))}
      </ul>
    </div>
  );
}
