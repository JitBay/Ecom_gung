import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/collection/ProductCard.jsx';
import FilterDrawer from '../components/collection/FilterDrawer.jsx';
import Icon from '../components/ui/Icon.jsx';
import NotFound from './NotFound.jsx';
import { getCollection, getProduct } from '../data/catalog.js';
import { brand } from '../data/site.js';
import { filterAndSort, sortOptions } from '../lib/sortProducts.js';
import './CollectionPage.css';

const DEFAULT_VIEW = { sort: 'featured', inStockOnly: false };
const plural = (n) => `${n} product${n === 1 ? '' : 's'}`;

export default function CollectionPage() {
  const { handle } = useParams();
  const collection = getCollection(handle);
  const [view, setView] = useState(DEFAULT_VIEW);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Reset filters when switching tabs.
  useEffect(() => {
    setView(DEFAULT_VIEW);
    if (collection) document.title = `${collection.label} | ${brand.name} Labs`;
  }, [handle]);

  if (!collection) return <NotFound />;

  const items = collection.items.map(getProduct);
  const shown = filterAndSort(items, view);

  return (
    <section className="collection container">
      <h1 className="collection__title">{collection.title}</h1>

      <div className="toolbar">
        <button className="toolbar__filter" onClick={() => setDrawerOpen(true)}>
          <Icon name="filter" size={18} />
          <span className="hide-mobile">Filter</span>
          <span className="hide-tablet-up">Filter and sort</span>
        </button>
        <span className="toolbar__count">{plural(shown.length)}</span>
        <label className="toolbar__sort hide-mobile">
          Sort by:
          <span className="select">
            <select value={view.sort} onChange={(e) => setView({ ...view, sort: e.target.value })}>
              {sortOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            <Icon name="chevron" size={14} />
          </span>
        </label>
      </div>

      {view.inStockOnly && (
        <div className="chips">
          <button onClick={() => setView({ ...view, inStockOnly: false })}>
            In stock only <Icon name="close" size={14} />
          </button>
        </div>
      )}

      {shown.length > 0 ? (
        <div className="collection__grid">
          {shown.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      ) : (
        <div className="collection__empty">
          <p>No products found. Try removing a filter.</p>
          <button className="btn btn--dark" onClick={() => setView(DEFAULT_VIEW)}>
            Clear filters
          </button>
        </div>
      )}

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={items}
        value={view}
        onApply={(v) => {
          setView(v);
          setDrawerOpen(false);
        }}
      />
    </section>
  );
}
