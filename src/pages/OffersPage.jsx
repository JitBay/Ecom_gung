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
      <OfferModules />
      <div className="container" style={{ margin: '20px auto 10px', textAlign: 'center' }}>
        <Link
          to="/products/pack-decouverte"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            borderRadius: 999,
            background: 'rgba(184, 147, 86, 0.12)',
            border: '1px solid rgba(184, 147, 86, 0.35)',
            color: '#8c6827',
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          {lang === 'fr'
            ? '✨ Découvrir la présentation complète du Pack Découverte (3 Coupes) →'
            : '✨ Explore the complete Discovery Pack (3 Fits) presentation page →'}
        </Link>
      </div>
      <ProductSection isDiscoveryOffer={true} showModelSelector={true} />
    </div>
  );
}
