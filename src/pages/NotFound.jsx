import { Link } from 'react-router-dom';
import { collectionUrl } from '../data/catalog.js';

export default function NotFound() {
  return (
    <section className="container" style={{ padding: '96px 0', textAlign: 'center', display: 'grid', gap: 18, justifyItems: 'center' }}>
      <h1 className="title">Page not found</h1>
      <p className="subtitle">The page you are looking for does not exist.</p>
      <Link to={collectionUrl('all')} className="btn btn--dark">
        Continue shopping
      </Link>
    </section>
  );
}
