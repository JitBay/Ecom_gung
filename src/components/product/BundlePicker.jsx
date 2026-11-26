import Icon from '../ui/Icon.jsx';
import { bundles as defaultBundles, colors as defaultColors, discoveryCategories, sizes } from '../../data/product.js';
import { colorHex, getColorImages, getLocalizedProduct, products } from '../../data/catalog.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { price } from '../../lib/format.js';
import './BundlePicker.css';

const cutsList = products.slice(0, 3);

function VariantRows({
  variants,
  onChange,
  onSelectCut,
  selectedHandle,
  productImage,
  availableColors,
  colorImages,
  model,
  lang,
  isTwoPlusOne,
  isDiscoveryPack,
}) {
  const { t } = useLanguage();
  const colorList = availableColors && availableColors.length ? availableColors : defaultColors;

  if (isDiscoveryPack) {
    return (
      <div className="discovery-variants">
        <p className="variants__label">
          {lang === 'fr'
            ? 'Personnalisez vos 3 coupes (modèle, couleur & taille) :'
            : 'Customize your 3 fits (Fit, Color & Size):'}
        </p>
        {variants.map((v, i) => {
          const cutHandle = v.handle || discoveryCategories[i]?.handle || 'vela-sculpt-sans-manches';
          const cutProduct = products.find((p) => p.handle === cutHandle) || products[0];
          const locCut = getLocalizedProduct(cutProduct, lang);
          const cutColors = cutProduct.colors.map((c) => {
            const found = defaultColors.find((col) => col.label.toLowerCase() === c.toLowerCase() || col.id === c.toLowerCase());
            return {
              id: found?.id || c.toLowerCase().replace(/\s+/g, '-'),
              label: c,
              hex: found?.hex || colorHex[c] || '#1a1a1a',
            };
          });
          const currentColor = cutColors.find((c) => c.id === v.color || c.label.toLowerCase() === (v.color || '').toLowerCase()) || cutColors[0];
          const imgs = getColorImages(cutProduct, v.color || currentColor?.label);
          const colorImg = (imgs && imgs[0]) || cutProduct.colorImages?.[cutProduct.colors[0]]?.[0] || '/images/image page produit/demi-manche/1.webp';
          const isCardActive = selectedHandle === cutProduct.handle;

          return (
            <div
              className={`discovery-variant-card ${isCardActive ? 'is-active' : ''}`}
              key={i}
              onClick={() => onSelectCut && onSelectCut(cutProduct.handle, currentColor.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="discovery-variant-card__header">
                <span className="discovery-variant-card__number">{i + 1}</span>
                <strong className="discovery-variant-card__title">{locCut.shortTitle || locCut.title}</strong>
                {locCut.badge && <span className="discovery-variant-card__badge">{locCut.badge}</span>}
              </div>
              <div className="variant">
                <div className="variant__thumb">
                  <img
                    src={colorImg}
                    alt={locCut.shortTitle || locCut.title}
                    width="60"
                    height="60"
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </div>

                {/* 1. Sélecteur de modèle / coupe (T-shirt) */}
                <label
                  className="select select--cut"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCut && onSelectCut(cutProduct.handle, currentColor.id);
                  }}
                >
                  <select
                    value={cutHandle}
                    onFocus={() => onSelectCut && onSelectCut(cutProduct.handle, currentColor.id)}
                    onChange={(e) => {
                      const newHandle = e.target.value;
                      const nextProd = products.find((p) => p.handle === newHandle) || products[0];
                      const nextColorId = nextProd.colors[0].toLowerCase().replace(/\s+/g, '-');
                      onChange(i, { handle: newHandle, color: nextColorId });
                      onSelectCut && onSelectCut(newHandle, nextColorId);
                    }}
                    aria-label={lang === 'fr' ? `Coupe article ${i + 1}` : `Fit item ${i + 1}`}
                  >
                    {cutsList.map((cp) => {
                      const lcp = getLocalizedProduct(cp, lang);
                      return (
                        <option key={cp.handle} value={cp.handle}>
                          {lcp.shortTitle}
                        </option>
                      );
                    })}
                  </select>
                  <Icon name="chevron" size={14} />
                </label>

                {/* 2. Sélecteur de couleur */}
                <label
                  className="select"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCut && onSelectCut(cutProduct.handle, currentColor.id);
                  }}
                >
                  <span className="select__dot" style={{ background: currentColor.hex }} />
                  <select
                    value={currentColor.id}
                    onFocus={() => onSelectCut && onSelectCut(cutProduct.handle, currentColor.id)}
                    onChange={(e) => {
                      const newColorId = e.target.value;
                      onChange(i, { color: newColorId });
                      onSelectCut && onSelectCut(cutProduct.handle, newColorId);
                    }}
                    aria-label={lang === 'fr' ? `Couleur article ${i + 1}` : `Color item ${i + 1}`}
                  >
                    {cutColors.map((c) => (
                      <option key={c.id} value={c.id}>
                        {t('color_names.' + c.label, c.label)}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevron" size={14} />
                </label>

                {/* 3. Sélecteur de taille */}
                <label
                  className="select"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCut && onSelectCut(cutProduct.handle, currentColor.id);
                  }}
                >
                  <select
                    value={v.size || 'L'}
                    onFocus={() => onSelectCut && onSelectCut(cutProduct.handle, currentColor.id)}
                    onChange={(e) => onChange(i, { size: e.target.value })}
                    aria-label={lang === 'fr' ? `Taille article ${i + 1}` : `Size item ${i + 1}`}
                  >
                    {sizes.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <Icon name="chevron" size={14} />
                </label>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="variants">
      <div className="variants__label-row">
        <p className="variants__label">
          {lang === 'fr' ? 'Modèle, couleur & taille par article :' : 'Fit, Color & Size per shirt:'}
        </p>
        <span className="variants__size-tip">
          {lang === 'fr' ? '💡 Prenez votre taille habituelle' : '💡 Pick your usual T-shirt size'}
        </span>
      </div>
      {variants.map((v, i) => {
        const cutHandle = v.handle || model?.handle || 'vela-sculpt-sans-manches';
        const cutProduct = products.find((p) => p.handle === cutHandle) || model || products[0];
        const locCut = getLocalizedProduct(cutProduct, lang);
        const cutColors = cutProduct.colors.map((c) => {
          const found = defaultColors.find((col) => col.label.toLowerCase() === c.toLowerCase() || col.id === c.toLowerCase());
          return {
            id: found?.id || c.toLowerCase().replace(/\s+/g, '-'),
            label: c,
            hex: found?.hex || colorHex[c] || '#1a1a1a',
          };
        });
        const currentColor = cutColors.find((c) => c.id === v.color || c.label.toLowerCase() === (v.color || '').toLowerCase()) || cutColors[0];
        const imgs = getColorImages(cutProduct, v.color || currentColor?.label);
        const colorImg = (imgs && imgs[0]) || cutProduct.colorImages?.[cutProduct.colors[0]]?.[0] || '/images/image page produit/sans-manche/1.webp';

        const isFree = isTwoPlusOne && i === 2;
        const row = (
          <div className="variant" key={!isFree ? i : undefined}>
            <div className="variant__thumb">
              <img
                src={colorImg}
                alt={locCut.shortTitle || locCut.title}
                width="60"
                height="60"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>

            {/* 1. Sélecteur de modèle / coupe (T-shirt) */}
            <label className="select select--cut" onClick={(e) => e.stopPropagation()}>
              <select
                value={cutHandle}
                onFocus={() => onSelectCut && onSelectCut(cutProduct.handle, currentColor.id)}
                onChange={(e) => {
                  const newHandle = e.target.value;
                  const nextProd = products.find((p) => p.handle === newHandle) || products[0];
                  const nextColorId = nextProd.colors[0].toLowerCase().replace(/\s+/g, '-');
                  onChange(i, { handle: newHandle, color: nextColorId });
                  onSelectCut && onSelectCut(newHandle, nextColorId);
                }}
                aria-label={lang === 'fr' ? `Modèle article ${i + 1}` : `Model item ${i + 1}`}
              >
                {cutsList.map((cp) => {
                  const lcp = getLocalizedProduct(cp, lang);
                  return (
                    <option key={cp.handle} value={cp.handle}>
                      {lcp.shortTitle}
                    </option>
                  );
                })}
              </select>
              <Icon name="chevron" size={14} />
            </label>

            {/* 2. Sélecteur de couleur */}
            <label className="select" onClick={(e) => e.stopPropagation()}>
              <span className="select__dot" style={{ background: currentColor?.hex || '#1a1a1a' }} />
              <select
                value={currentColor.id}
                onFocus={() => onSelectCut && onSelectCut(cutProduct.handle, currentColor.id)}
                onChange={(e) => {
                  const newColorId = e.target.value;
                  onChange(i, { color: newColorId });
                  onSelectCut && onSelectCut(cutProduct.handle, newColorId);
                }}
                aria-label={lang === 'fr' ? `Couleur article ${i + 1}` : `Color item ${i + 1}`}
              >
                {cutColors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {t('color_names.' + c.label, c.label)}
                  </option>
                ))}
              </select>
              <Icon name="chevron" size={14} />
            </label>

            {/* 3. Sélecteur de taille */}
            <label className="select" onClick={(e) => e.stopPropagation()}>
              <select
                value={v.size || 'L'}
                onFocus={() => onSelectCut && onSelectCut(cutProduct.handle, currentColor.id)}
                onChange={(e) => onChange(i, { size: e.target.value })}
                aria-label={lang === 'fr' ? `Taille article ${i + 1}` : `Size item ${i + 1}`}
              >
                {sizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <Icon name="chevron" size={14} />
            </label>
          </div>
        );

        if (isFree) {
          return (
            <div className="variant-free-box" key={i}>
              <div className="variant-free-banner">
                <Icon name="gift" size={14} />
                <span>{lang === 'fr' ? '3ᵉ produit 100% offert' : '3rd item 100% FREE'}</span>
              </div>
              {row}
            </div>
          );
        }

        return row;
      })}
    </div>
  );
}

function BundleCard({
  bundle,
  selected,
  onSelect,
  variants,
  onVariantChange,
  onSelectCut,
  selectedHandle,
  productImage,
  availableColors,
  colorImages,
  model,
  lang,
}) {
  const marqueeText = lang === 'fr' ? 'Offre limitée' : 'Limited Offer';
  const marquee = Array(12).fill(marqueeText).join(' • ');

  const card = (
    <div
      className={`bundle ${selected ? 'is-selected' : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="bundle__head" onClick={onSelect}>
        <span
          className="radio"
          aria-hidden="true"
          onClick={onSelect}
          style={{ cursor: 'pointer' }}
        />
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
              {lang === 'fr' ? 'Livraison offerte' : 'FREE SHIPPING'}
            </p>
          )}
          <VariantRows
            variants={variants}
            onChange={onVariantChange}
            onSelectCut={onSelectCut}
            selectedHandle={selectedHandle}
            productImage={productImage}
            availableColors={availableColors}
            colorImages={colorImages}
            model={model}
            lang={lang}
            isTwoPlusOne={bundle.isTwoPlusOne}
            isDiscoveryPack={bundle.isDiscoveryPack}
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
        <div
          className="offer-frame"
          onClick={onSelect}
          style={{ cursor: 'pointer' }}
        >
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
  onSelectCut,
  selectedHandle,
  productImage,
  availableColors,
  colorImages,
  model,
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
            onSelectCut={onSelectCut}
            selectedHandle={selectedHandle}
            productImage={productImage}
            availableColors={availableColors}
            colorImages={colorImages}
            model={model}
            lang={lang}
          />
        ))}
      </ul>
    </div>
  );
}
