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
const plural = (n) => `${n} modèle${n > 1 ? 's' : ''}`;

export default function CollectionPage() {
  const { handle } = useParams();
  const collection = getCollection(handle);
  const [view, setView] = useState(DEFAULT_VIEW);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setView(DEFAULT_VIEW);
    if (collection) document.title = `${collection.title} | ${brand.name} Labs`;
  }, [handle]);

  if (!collection) return <NotFound />;

  const items = collection.items.map(getProduct);
  const shown = filterAndSort(items, view);

  return (
    <section className="collection container">
      <div className="collection__header">
        <h1 className="collection__title">{collection.title}</h1>
        {collection.description && <p className="collection__desc">{collection.description}</p>}
        <div className="collection__guarantee-pill">
          <Icon name="shield" size={16} /> Garantie Satisfait ou Remboursé de 30 jours sur toutes les commandes
        </div>
      </div>

      <div className="toolbar">
        <button className="toolbar__filter" onClick={() => setDrawerOpen(true)}>
          <Icon name="filter" size={18} />
          <span className="hide-mobile">Filtrer</span>
          <span className="hide-tablet-up">Filtrer et trier</span>
        </button>
        <span className="toolbar__count">{plural(shown.length)}</span>
        <label className="toolbar__sort hide-mobile">
          Trier par :
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

      {shown.length > 0 ? (
        <div className="collection__grid">
          {shown.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      ) : (
        <div className="collection__empty">
          <p>Aucun produit ne correspond à vos critères.</p>
          <button className="btn btn--dark" onClick={() => setView(DEFAULT_VIEW)}>
            Réinitialiser les filtres
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
