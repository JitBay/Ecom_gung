import { collections, products } from '../data/catalog.js';

export const sortOptions = [
  { id: 'featured', label: 'Mis en avant' },
  { id: 'best', label: 'Meilleures ventes' },
  { id: 'az', label: 'Alphabétique, A-Z' },
  { id: 'za', label: 'Alphabétique, Z-A' },
  { id: 'price-asc', label: 'Prix croissant' },
  { id: 'price-desc', label: 'Prix décroissant' },
];

const bestRank = products.map((p) => p.handle);
const rank = (list, p) => {
  const i = list.indexOf(p.handle);
  return i === -1 ? Infinity : i;
};

const compare = {
  featured: () => 0,
  best: (a, b) => rank(bestRank, a) - rank(bestRank, b),
  az: (a, b) => a.title.localeCompare(b.title),
  za: (a, b) => b.title.localeCompare(a.title),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
};

export function filterAndSort(list, { sort = 'featured', inStockOnly }) {
  const kept = inStockOnly ? list.filter((p) => !p.soldOut) : list;
  const comparator = compare[sort] || compare.featured;
  return [...kept].sort(comparator);
}
