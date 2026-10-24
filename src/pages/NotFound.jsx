import { Link } from 'react-router-dom';
import { collectionUrl } from '../data/catalog.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function NotFound() {
  const { lang } = useLanguage();

  return (
    <section className="container" style={{ padding: '96px 0', textAlign: 'center', display: 'grid', gap: 18, justifyItems: 'center' }}>
      <h1 className="title">{lang === 'fr' ? 'Page non trouvée' : 'Page not found'}</h1>
      <p className="subtitle">
        {lang === 'fr'
          ? "La page que vous recherchez n'existe pas ou a été déplacée."
          : 'The page you are looking for does not exist.'}
      </p>
      <Link to={collectionUrl('all')} className="btn btn--dark">
        {lang === 'fr' ? 'Découvrir nos modèles' : 'Continue shopping'}
      </Link>
    </section>
  );
}
