import { collections, products } from '../data/catalog.js';

// Same sort options as the reference store.
export const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'best', label: 'Best selling' },
  { id: 'az', label: 'Alphabetically, A-Z' },
  { id: 'za', label: 'Alphabetically, Z-A' },
  { id: 'price-asc', label: 'Price, low to high' },
  { id: 'price-desc', label: 'Price, high to low' },
  { id: 'date-asc', label: 'Date, old to new' },
  { id: 'date-desc', label: 'Date, new to old' },
];

// "Best selling" follows the Best Sellers tab; "date" follows the catalog order (oldest first).
const bestRank = collections.find((c) => c.handle === 'frontpage').items;
const rank = (list, p) => {
  const i = list.indexOf(p.handle);
  return i === -1 ? Infinity : i;
};
const dateRank = products.map((p) => p.handle);

const compare = {
  featured: () => 0,
  best: (a, b) => rank(bestRank, a) - rank(bestRank, b),
  az: (a, b) => a.title.localeCompare(b.title),
  za: (a, b) => b.title.localeCompare(a.title),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'date-asc': (a, b) => rank(dateRank, a) - rank(dateRank, b),
  'date-desc': (a, b) => rank(dateRank, b) - rank(dateRank, a),
};

// `list` is already in the collection's featured order; sort is stable so ties keep it.
export function filterAndSort(list, { sort, inStockOnly }) {
  const kept = inStockOnly ? list.filter((p) => !p.soldOut) : list;
  return [...kept].sort(compare[sort]);
}
