// Product thumbnail renderer for Vela Labs products using real photographic assets
import { getColorImages } from '../../data/catalog.js';
import './ProductThumb.css';

export default function ProductThumb({ product, color, alt = false, className = '' }) {
  if (!product) return null;

  const colorList = getColorImages(product, color);
  const primaryIndex = 0;
  const altIndex = colorList.length > 1 ? 1 : 0;
  const src = alt ? (colorList[altIndex] || colorList[0]) : (colorList[primaryIndex] || '/images/products/demi-manches/4.jpg');

  return (
    <div className={`thumb-wrapper ${alt ? 'thumb--alt' : ''} ${className}`}>
      <img
        src={src}
        alt={`${product.title} - ${color || ''}`}
        className="thumb-photo"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/products/demi-manches/4.jpg';
        }}
      />
    </div>
  );
}
