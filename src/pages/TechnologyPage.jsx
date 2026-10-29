import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import QualitySection from '../components/sections/QualitySection.jsx';
import { brand } from '../data/site.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function TechnologyPage() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? `Pourquoi Vela Labs ? | Notre technologie ergonomique`
        : `Why Vela Labs? | Ergonomic Compression Technology`;
  }, [lang]);

  return (
    <div style={{ paddingTop: 20 }}>
      <div className="container" style={{ paddingTop: 16 }}>
        <nav className="pp__crumbs" aria-label={lang === 'fr' ? "Fil d'Ariane" : 'Breadcrumbs'}>
          <Link to="/">{t('nav.home')}</Link> / <span>{t('nav.why_us')}</span>
        </nav>
      </div>

      <QualitySection />
    </div>
  );
}
