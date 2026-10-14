// Placeholder product image for any catalog product, tinted with the chosen colour.
// Leggings reuse the full figure; other products are simple garment drawings.
import ProductArt from './ProductArt.jsx';
import { colorHex } from '../../data/catalog.js';
import './ProductThumb.css';

const garments = {
  shorts: (c) => (
    <>
      <path d="M52 50h96l6 18-8 78h-40l-6-54-6 54H54l-8-78Z" fill={c} />
      <path d="M52 50h96l3 10H49Z" fill="rgba(255,255,255,.15)" />
    </>
  ),
  tee: (c) => (
    <path d="M70 34l18-8h24l18 8 34 26-16 24-18-12v94H70V72L52 84 36 60Z" fill={c} />
  ),
  bra: (c) => (
    <>
      <path d="M58 40l12 0 30 34 30-34h12l6 70q-48 18-96 0Z" fill={c} />
      <path d="M96 76h8v34h-8Z" fill="rgba(255,255,255,.35)" />
    </>
  ),
  sleeve: (c) => (
    <>
      <path d="M52 34h32l8 132H62Z" fill={c} />
      <path d="M116 34h32l-10 132h-30Z" fill={c} />
    </>
  ),
  swim: (c) => <path d="M66 30h12q22 34 44 0h12l2 70q-4 30 14 62H50q18-32 14-62Z" fill={c} />,
  'swim-cutout': (c) => (
    <>
      <path d="M66 30h12q22 34 44 0h12l2 70q-4 30 14 62H50q18-32 14-62Z" fill={c} />
      <ellipse cx="122" cy="104" rx="10" ry="18" fill="var(--thumb-bg)" />
    </>
  ),
  pouch: () => (
    <>
      <path d="M58 40h84l8 130H50Z" fill="#3b2a22" />
      <path d="M58 40h84l1 12H57Z" fill="#2a1d17" />
      <rect x="66" y="78" width="68" height="56" rx="6" fill="#efe4d6" />
      <text x="100" y="102" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b2a22" fontFamily="DM Sans, sans-serif">MULTI</text>
      <text x="100" y="118" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b2a22" fontFamily="DM Sans, sans-serif">COLLAGEN</text>
      <text x="100" y="152" textAnchor="middle" fontSize="8" fill="#efe4d6" fontFamily="DM Sans, sans-serif">CHOCOLATE</text>
    </>
  ),
};

export default function ProductThumb({ product, color, alt = false }) {
  const name = color ?? product.colors[alt ? 1 : 0] ?? product.colors[0];
  const hex = colorHex[name] ?? '#1d1d1f';

  if (product.shape === 'leggings') {
    return <ProductArt color={hex} pose={alt ? 'back' : 'side'} className="thumb" />;
  }
  return (
    <div className={`thumb ${alt ? 'thumb--alt' : ''}`}>
      <svg viewBox="0 0 200 200" role="img" aria-label={`${product.title} placeholder image`}>
        <ellipse cx="100" cy="182" rx="56" ry="5" fill="rgba(0,0,0,.08)" />
        <g transform={alt ? 'rotate(-6 100 100)' : undefined}>{garments[product.shape](hex)}</g>
      </svg>
    </div>
  );
}
