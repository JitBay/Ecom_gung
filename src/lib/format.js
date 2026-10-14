// Prices in euros, French style: €45,90
const eur = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

export const price = (value) => eur.format(value).replace(/\s?€/, '').replace(/^/, '€');

export const shortDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
