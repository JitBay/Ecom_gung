import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/collection/ProductCard.jsx';
import FilterDrawer from '../components/collection/FilterDrawer.jsx';
import Icon from '../components/ui/Icon.jsx';
import NotFound from './NotFound.jsx';
import { getCollection, getLocalizedCollection, getProduct } from '../data/catalog.js';
import { brand } from '../data/site.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { filterAndSort, sortOptions } from '../lib/sortProducts.js';
import './CollectionPage.css';

const DEFAULT_VIEW = { sort: 'featured', inStockOnly: false };

export default function CollectionPage() {
  const { handle } = useParams();
  const { lang, t } = useLanguage();
  const rawCollection = getCollection(handle);
  const collection = getLocalizedCollection(rawCollection, lang);
  const [view, setView] = useState(DEFAULT_VIEW);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setView(DEFAULT_VIEW);
    if (collection) document.title = `${collection.title} | ${brand.name} Labs`;
  }, [handle, collection?.title]);

  if (!rawCollection) return <NotFound />;

  const items = rawCollection.items.map(getProduct);
  const shown = filterAndSort(items, view);

  return (
    <section className="collection container">
      <div className="collection__header">
        <h1 className="collection__title">{collection.title}</h1>
        {collection.description && <p className="collection__desc">{collection.description}</p>}
        <div className="collection__guarantee-pill">
          <Icon name="shield" size={16} /> {t('collection_page.guarantee_pill')}
        </div>
      </div>

      <div className="toolbar">
        <button className="toolbar__filter" onClick={() => setDrawerOpen(true)}>
          <Icon name="filter" size={18} />
          <span className="hide-mobile">{t('collection_page.filter_btn_desktop')}</span>
          <span className="hide-tablet-up">{t('collection_page.filter_btn_mobile')}</span>
        </button>
        <span className="toolbar__count">
          {t('collection_page.models_count', { count: shown.length, s: shown.length > 1 ? 's' : '' })}
        </span>
        <label className="toolbar__sort hide-mobile">
          {t('collection_page.sort_by')}
          <span className="select">
            <select value={view.sort} onChange={(e) => setView({ ...view, sort: e.target.value })}>
              {sortOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {t('collection_page.sort_options.' + o.id, o.label)}
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
          <p>{lang === 'fr' ? 'Aucun produit ne correspond à vos critères.' : 'No products match your criteria.'}</p>
          <button className="btn btn--dark" onClick={() => setView(DEFAULT_VIEW)}>
            {lang === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
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
