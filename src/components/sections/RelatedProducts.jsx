import ProductCard from '../collection/ProductCard.jsx';
import { products } from '../../data/catalog.js';
import './RelatedProducts.css';

export default function RelatedProducts({ exclude }) {
  const items = products.filter((p) => p.handle !== exclude);

  return (
    <section className="related container">
      <h2 className="related__title">Découvrez nos autres coupes ergonomiques</h2>
      <div className="related__grid scroller">
        {items.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>
    </section>
  );
}
