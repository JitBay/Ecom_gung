import { useEffect, useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { filterAndSort, sortOptions } from '../../lib/sortProducts.js';
import { useLockScroll } from '../../lib/hooks.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './FilterDrawer.css';

export default function FilterDrawer({ open, onClose, items, value, onApply }) {
  const [draft, setDraft] = useState(value);
  const { lang, t } = useLanguage();
  useLockScroll(open);

  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  const count = filterAndSort(items, draft).length;

  return (
    <div className={`drawer-backdrop ${open ? 'is-open' : ''}`} onClick={onClose}>
      <aside className="filters" onClick={(e) => e.stopPropagation()} aria-label="Filtres et options de tri">
        <header className="filters__head">
          <h2>{lang === 'fr' ? 'Filtres & Tri' : 'Filters & Sort'}</h2>
          <button onClick={onClose} aria-label={lang === 'fr' ? 'Fermer les filtres' : 'Close filters'}>
            <Icon name="close" size={22} />
          </button>
        </header>

        <div className="filters__body">
          <fieldset>
            <legend>{t('collection_page.sort_by')}</legend>
            {sortOptions.map((o) => (
              <label key={o.id} className="filters__radio">
                <input
                  type="radio"
                  name="sort"
                  checked={draft.sort === o.id}
                  onChange={() => setDraft({ ...draft, sort: o.id })}
                />
                <span />
                {t('collection_page.sort_options.' + o.id, o.label)}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>{lang === 'fr' ? 'Disponibilité' : 'Availability'}</legend>
            <label className="switch">
              {t('collection_page.in_stock_only')}
              <input
                type="checkbox"
                checked={draft.inStockOnly}
                onChange={(e) => setDraft({ ...draft, inStockOnly: e.target.checked })}
              />
              <span />
            </label>
          </fieldset>
        </div>

        <footer className="filters__foot">
          <button
            className="filters__clear"
            onClick={() => setDraft({ sort: 'featured', inStockOnly: false })}
          >
            {t('collection_page.clear_all')}
          </button>
          <button className="btn btn--dark" onClick={() => onApply(draft)}>
            {t('collection_page.apply')} ({count})
          </button>
        </footer>
      </aside>
    </div>
  );
}
