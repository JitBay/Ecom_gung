import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductThumb from '../ui/ProductThumb.jsx';
import { colorHex, productUrl } from '../../data/catalog.js';
import { price } from '../../lib/format.js';
import './ProductCard.css';

const MAX_SWATCHES = 4;

// Card like the reference: second image on hover, "Sold out" badge, sale + regular price, colour swatches.
export default function ProductCard({ product }) {
  const [color, setColor] = useState(product.colors[0]);
  const url = productUrl(product.handle);
  const extra = product.colors.length - MAX_SWATCHES;

  return (
    <article className="card">
      <Link to={url} className="card__media" aria-label={product.title}>
        {product.soldOut && <span className="card__badge">Sold out</span>}
        <span className="card__img">
          <ProductThumb product={product} color={color} />
        </span>
        <span className="card__img card__img--alt">
          <ProductThumb product={product} color={color} alt />
        </span>
      </Link>

      <Link to={url} className="card__title">
        {product.title}
      </Link>
      <p className="card__price">
        <span className="sr-only">Sale price</span>
        <strong className={product.compareAt ? 'is-sale' : ''}>{price(product.price)}</strong>
        {product.compareAt && (
          <>
            <span className="sr-only">Regular price</span>
            <s>{price(product.compareAt)}</s>
          </>
        )}
      </p>

      {product.colors.length > 0 && (
        <div className="card__swatches">
          {product.colors.slice(0, MAX_SWATCHES).map((c) => (
            <button
              key={c}
              className={c === color ? 'is-active' : ''}
              style={{ background: colorHex[c] }}
              onClick={() => setColor(c)}
              aria-label={c}
              title={c}
            />
          ))}
          {extra > 0 && (
            <Link to={url} className="card__more">
              +{extra}
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
