import Icon from '../ui/Icon.jsx';
import { bundles as defaultBundles, colors as defaultColors, sizes } from '../../data/product.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { price } from '../../lib/format.js';
import './BundlePicker.css';

function VariantRows({ variants, onChange, productImage, availableColors, colorImages, lang, isTwoPlusOne }) {
  const { t } = useLanguage();
  const colorList = availableColors && availableColors.length ? availableColors : defaultColors;

  return (
    <div className="variants">
      <p className="variants__label">
        {lang === 'fr' ? 'Couleur & Taille par article :' : 'Color & Size per shirt:'}
      </p>
      {variants.map((v, i) => {
        const currentColor = colorList.find((c) => c.id === v.color) || colorList[0];
        const colorImg =
          (colorImages && (colorImages[currentColor?.label]?.[0] || colorImages[currentColor?.id]?.[0])) ||
          productImage ||
          '/images/products/sans-manches/1.jpeg';

        const isFree = isTwoPlusOne && i === 2;
        return (
          <div className={`variant ${isFree ? 'variant--free' : ''}`} key={i}>
            <div className="variant__thumb">
              <img
                src={colorImg}
                alt={currentColor?.label || 'Miniature'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <label className="select">
              <span className="select__dot" style={{ background: currentColor?.hex || '#1a1a1a' }} />
              <select
                value={v.color}
                onChange={(e) => onChange(i, { color: e.target.value })}
                aria-label={`Couleur article ${i + 1}`}
              >
                {colorList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {t('color_names.' + c.label, c.label)}
                  </option>
                ))}
              </select>
              <Icon name="chevron" size={14} />
            </label>
            <label className="select">
              <select
                value={v.size}
                onChange={(e) => onChange(i, { size: e.target.value })}
                aria-label={`Taille article ${i + 1}`}
              >
                {sizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <Icon name="chevron" size={14} />
            </label>
            {isFree && (
              <span className="variant__free-badge">
                {lang === 'fr' ? '3ᵉ OFFERT' : '3rd FREE'}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function BundleCard({ bundle, selected, onSelect, variants, onVariantChange, productImage, availableColors, colorImages, lang }) {
  const marqueeText = lang === 'fr' ? 'Offre limitée' : 'Limited Offer';
  const marquee = Array(12).fill(marqueeText).join(' • ');

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
              <Icon name="check" size={16} strokeWidth={2.4} />{' '}
              {lang === 'fr' ? 'LIVRAISON OFFERTE' : 'FREE SHIPPING'}
            </p>
          )}
          <VariantRows
            variants={variants}
            onChange={onVariantChange}
            productImage={productImage}
            availableColors={availableColors}
            colorImages={colorImages}
            lang={lang}
            isTwoPlusOne={bundle.isTwoPlusOne}
          />
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

export default function BundlePicker({
  selectedId,
  onSelect,
  variants,
  onVariantChange,
  productImage,
  availableColors,
  colorImages,
  items,
}) {
  const { lang } = useLanguage();
  const bundleList = items && items.length ? items : defaultBundles;

  return (
    <div className="bundles">
      <p className="bundles__heading">
        <Icon name="shield" size={16} />{' '}
        {lang === 'fr'
          ? 'Essayez sans risque — Garantie satisfait ou remboursé de 30 jours'
          : 'Risk-free trial — 30-Day Money-Back Guarantee'}
      </p>
      <ul>
        {bundleList.map((b) => (
          <BundleCard
            key={b.id}
            bundle={b}
            selected={b.id === selectedId}
            onSelect={() => onSelect(b.id)}
            variants={variants}
            onVariantChange={onVariantChange}
            productImage={productImage}
            availableColors={availableColors}
            colorImages={colorImages}
            lang={lang}
          />
        ))}
      </ul>
    </div>
  );
}
