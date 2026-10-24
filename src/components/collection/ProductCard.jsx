import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductThumb from '../ui/ProductThumb.jsx';
import { colorHex, getColorImages, getLocalizedProduct, productUrl } from '../../data/catalog.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { price } from '../../lib/format.js';
import './ProductCard.css';

const MAX_SWATCHES = 5;

export default function ProductCard({ product }) {
  if (!product) return null;
  const { lang, t } = useLanguage();
  const localized = getLocalizedProduct(product, lang);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [hoverColor, setHoverColor] = useState(null);

  const activeColor = hoverColor || selectedColor;
  const url = productUrl(product.handle);
  const extra = (product.colors?.length || 0) - MAX_SWATCHES;
  const colorDisplay = t('color_names.' + activeColor, activeColor);

  return (
    <article className="card">
      <Link to={url} className="card__media" aria-label={localized.title}>
        {localized.badge && <span className="card__badge">{localized.badge}</span>}
        <span className="card__img">
          <ProductThumb product={product} color={activeColor} />
        </span>
        <span className="card__img card__img--alt">
          <ProductThumb product={product} color={activeColor} alt />
        </span>
      </Link>

      <Link to={url} className="card__title">
        {localized.title}
      </Link>

      {localized.tagline && <p className="card__tagline">{localized.tagline}</p>}

      <p className="card__price">
        <span className="sr-only">{lang === 'fr' ? 'Prix promotionnel' : 'Sale price'}</span>
        <strong className={product.compareAt ? 'is-sale' : ''}>{price(product.price)}</strong>
        {product.compareAt && (
          <>
            <span className="sr-only">{lang === 'fr' ? 'Prix régulier' : 'Regular price'}</span>
            <s>{price(product.compareAt)}</s>
          </>
        )}
      </p>

      {product.colors && product.colors.length > 0 && (
        <div className="card__swatches-wrapper">
          <span className="card__color-name">{colorDisplay}</span>
          <div className="card__swatches">
            {product.colors.slice(0, MAX_SWATCHES).map((c) => {
              const cName = t('color_names.' + c, c);
              return (
                <button
                  key={c}
                  className={`card__swatch ${c === activeColor ? 'is-active' : ''}`}
                  style={{ background: colorHex[c] || '#1a1a1a' }}
                  onClick={() => setSelectedColor(c)}
                  onMouseEnter={() => setHoverColor(c)}
                  onMouseLeave={() => setHoverColor(null)}
                  aria-label={`${lang === 'fr' ? 'Couleur' : 'Color'} ${cName}`}
                  title={cName}
                />
              );
            })}
            {extra > 0 && (
              <Link to={url} className="card__more">
                +{extra}
              </Link>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
