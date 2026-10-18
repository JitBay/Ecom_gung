import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import OfferModules from '../components/sections/OfferModules.jsx';
import ProductSection from '../components/product/ProductSection.jsx';
import { brand } from '../data/site.js';

export default function OffersPage() {
  useEffect(() => {
    document.title = `Nos Packs & Offres Exclusives | ${brand.fullName}`;
  }, []);

  return (
    <div style={{ paddingTop: 20 }}>
      <div className="container" style={{ paddingTop: 16 }}>
        <nav className="pp__crumbs" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link> / <span>Nos Packs & Offres</span>
        </nav>
      </div>

      <OfferModules />
      <ProductSection />
    </div>
  );
}
