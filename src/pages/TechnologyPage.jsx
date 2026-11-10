import { useEffect } from 'react';
import QualitySection from '../components/sections/QualitySection.jsx';
import { brand } from '../data/site.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function TechnologyPage() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? `Pourquoi Zvar ? | Notre technologie ergonomique`
        : `Why Zvar? | Ergonomic Compression Technology`;
  }, [lang]);

  return <QualitySection />;
}
