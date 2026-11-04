import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import OfferModules from '../components/sections/OfferModules.jsx';
import OffersProductShelf from '../components/sections/OffersProductShelf.jsx';
import ProductSection from '../components/product/ProductSection.jsx';
import { brand } from '../data/site.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function OffersPage() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? `Nos Packs & Offres Exclusives | ${brand.fullName}`
        : `Exclusive Bundles & Offers | ${brand.fullName}`;
  }, [lang]);

  return (
    <div style={{ paddingTop: 20 }}>
      {/* 1. MODULES D'OFFRES / PROPOSITIONS DE VALEUR */}
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

      {/* 2. FENETRES DES PRODUITS ELIGIBLES AU PACK 2+1 (STYLE BEST-SELLERS) */}
      <OffersProductShelf />

      {/* 3. CONFIGURATEUR ET BUILDER DE PACK DIRECT */}
      <ProductSection isDiscoveryOffer={true} showModelSelector={true} />
    </div>
  );
}
