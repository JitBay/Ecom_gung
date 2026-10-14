import ProductCard from '../collection/ProductCard.jsx';
import { getProduct } from '../../data/catalog.js';
import './RelatedProducts.css';

// Same four products as the reference "Frequently Bought Together" row (+ leggings as a fallback).
const handles = ['sculpt-lift-smooth-arm-sleeves', 'sculpt-posture-bra', 'sculpt-3d-compression-tee', '3d-sculpting-anti-cellulite-shorts', '3d-sculpting-anti-cellulite-leggings-instant-lift-smooth'];

export default function RelatedProducts({ exclude }) {
  const items = handles.filter((h) => h !== exclude).slice(0, 4).map(getProduct);
  return (
    <section className="related container">
      <h2 className="related__title">Frequently Bought Together</h2>
      <div className="related__grid scroller">
        {items.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>
    </section>
  );
}
