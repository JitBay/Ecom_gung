import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import QualitySection from '../components/sections/QualitySection.jsx';
import ProductSection from '../components/product/ProductSection.jsx';
import { brand } from '../data/site.js';

export default function TechnologyPage() {
  useEffect(() => {
    document.title = `Pourquoi Vela Labs ? | Notre Technologie Ergonomique`;
  }, []);

  return (
    <div style={{ paddingTop: 20 }}>
      <div className="container" style={{ paddingTop: 16 }}>
        <nav className="pp__crumbs" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link> / <span>Pourquoi Vela Labs ?</span>
        </nav>
      </div>

      <QualitySection />
      <ProductSection />
    </div>
  );
}
