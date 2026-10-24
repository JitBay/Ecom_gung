import ProductCard from '../collection/ProductCard.jsx';
import { products } from '../../data/catalog.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './RelatedProducts.css';

export default function RelatedProducts({ exclude, currentHandle }) {
  const { lang } = useLanguage();
  const excludeHandle = exclude || currentHandle;
  const items = products.filter((p) => p.handle !== excludeHandle);

  return (
    <section className="related container">
      <h2 className="related__title">
        {lang === 'fr' ? 'Découvrez nos autres coupes ergonomiques' : 'Frequently Bought Together — Other Fits'}
      </h2>
      <div className="related__grid scroller">
        {items.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>
    </section>
  );
}
