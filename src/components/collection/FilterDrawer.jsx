import { useEffect, useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { filterAndSort, sortOptions } from '../../lib/sortProducts.js';
import { useLockScroll } from '../../lib/hooks.js';
import './FilterDrawer.css';

// Side drawer with sort + "In stock only". Changes are a draft until "Apply".
export default function FilterDrawer({ open, onClose, items, value, onApply }) {
  const [draft, setDraft] = useState(value);
  useLockScroll(open);

  useEffect(() => {
    if (open) setDraft(value);
  }, [open]);

  const count = filterAndSort(items, draft).length;

  return (
    <div className={`drawer-backdrop ${open ? 'is-open' : ''}`} onClick={onClose}>
      <aside className="filters" onClick={(e) => e.stopPropagation()} aria-label="Filters">
        <header className="filters__head">
          <h2>Filters</h2>
          <button onClick={onClose} aria-label="Close filters">
            <Icon name="close" size={22} />
          </button>
        </header>

        <div className="filters__body">
          <fieldset>
            <legend>Sort by</legend>
            {sortOptions.map((o) => (
              <label key={o.id} className="filters__radio">
                <input type="radio" name="sort" checked={draft.sort === o.id} onChange={() => setDraft({ ...draft, sort: o.id })} />
                <span />
                {o.label}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Availability</legend>
            <label className="switch">
              In stock only
              <input type="checkbox" checked={draft.inStockOnly} onChange={(e) => setDraft({ ...draft, inStockOnly: e.target.checked })} />
              <span />
            </label>
          </fieldset>
        </div>

        <footer className="filters__foot">
          <button className="filters__clear" onClick={() => setDraft({ sort: 'featured', inStockOnly: false })}>
            Clear all
          </button>
          <button className="btn btn--dark" onClick={() => onApply(draft)}>
            Apply ({count})
          </button>
        </footer>
      </aside>
    </div>
  );
}
