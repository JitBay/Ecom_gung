import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductThumb from '../ui/ProductThumb.jsx';
import { colorHex, getColorImages, productUrl } from '../../data/catalog.js';
import { price } from '../../lib/format.js';
import './ProductCard.css';

const MAX_SWATCHES = 5;

export default function ProductCard({ product }) {
  if (!product) return null;
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [hoverColor, setHoverColor] = useState(null);
  const [activeAngleIdx, setActiveAngleIdx] = useState(null);

  const activeColor = hoverColor || selectedColor;
  const url = productUrl(product.handle);
  const colorAngles = getColorImages(product, activeColor);
  const extra = (product.colors?.length || 0) - MAX_SWATCHES;

  return (
    <article className="card">
      <Link to={url} className="card__media" aria-label={product.title}>
        {product.badge && <span className="card__badge">{product.badge}</span>}
        <span className="card__img">
          <ProductThumb product={product} color={activeColor} />
        </span>
        <span className="card__img card__img--alt">
          <ProductThumb product={product} color={activeColor} alt />
        </span>
      </Link>

      <Link to={url} className="card__title">
        {product.title}
      </Link>

      {product.tagline && <p className="card__tagline">{product.tagline}</p>}

      <p className="card__price">
        <span className="sr-only">Prix promotionnel</span>
        <strong className={product.compareAt ? 'is-sale' : ''}>{price(product.price)}</strong>
        {product.compareAt && (
          <>
            <span className="sr-only">Prix régulier</span>
            <s>{price(product.compareAt)}</s>
          </>
        )}
      </p>

      {product.colors && product.colors.length > 0 && (
        <div className="card__swatches-wrapper">
          <span className="card__color-name">{activeColor}</span>
          <div className="card__swatches">
            {product.colors.slice(0, MAX_SWATCHES).map((c) => (
              <button
                key={c}
                className={`card__swatch ${c === activeColor ? 'is-active' : ''}`}
                style={{ background: colorHex[c] || '#1a1a1a' }}
                onClick={() => setSelectedColor(c)}
                onMouseEnter={() => setHoverColor(c)}
                onMouseLeave={() => setHoverColor(null)}
                aria-label={`Couleur ${c}`}
                title={`${c} (${getColorImages(product, c).length} angles)`}
              />
            ))}
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
