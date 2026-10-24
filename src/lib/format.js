// Prices in euros, French style: €45,90
const eur = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

export const price = (value) => eur.format(value).replace(/\s?€/, '').replace(/^/, '€');

export const shortDate = (iso, lang = 'fr') => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};
