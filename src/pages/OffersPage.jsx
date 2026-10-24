import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import OfferModules from '../components/sections/OfferModules.jsx';
import ProductSection from '../components/product/ProductSection.jsx';
import { brand } from '../data/site.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function OffersPage() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? `Nos Packs & Offres Exclusives | ${brand.fullName}`
        : `Exclusive Bundles & Offers | ${brand.fullName}`;
  }, [lang]);

  return (
    <div style={{ paddingTop: 20 }}>
      <div className="container" style={{ paddingTop: 16 }}>
        <nav className="pp__crumbs" aria-label={lang === 'fr' ? "Fil d'Ariane" : 'Breadcrumbs'}>
          <Link to="/">{t('nav.home')}</Link> / <span>{t('nav.offers')}</span>
        </nav>
      </div>

      <OfferModules />
      <ProductSection />
    </div>
  );
}
