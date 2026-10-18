import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sizeChart } from '../data/product.js';
import Icon from '../components/ui/Icon.jsx';
import './LegalPage.css';

export default function SizeGuidePage() {
  useEffect(() => {
    document.title = 'Guide des Tailles Homme | Vela Labs';
  }, []);

  return (
    <div className="legal-page container">
      <nav className="pp__crumbs" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link> / <span>Guide des Tailles</span>
      </nav>

      <article className="legal-content">
        <h1>Guide des Tailles — Homme</h1>
        <p className="legal-meta">Comment choisir votre taille de t-shirt de compression ergonomique Vela Sculpt™.</p>

        <p>
          Nos t-shirts sont conçus pour épouser la morphologie masculine tout en assurant un lissage uniforme du torse et un maintien lombaire stable.
        </p>

        <div className="details__table" style={{ margin: '24px 0' }}>
          <table className="size-table">
            <thead>
              <tr>
                <th>Taille</th>
                <th>Poids conseillé</th>
                <th>Taille (stature)</th>
                <th>Tour de poitrine</th>
                <th>Tour de taille</th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((r) => (
                <tr key={r.size}>
                  <td><strong>{r.size}</strong></td>
                  <td>{r.kg[0]}–{r.kg[1]} kg</td>
                  <td>{r.cm[0]}–{r.cm[1]} cm</td>
                  <td>{r.chest}</td>
                  <td>{r.waist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Comment bien mesurer ?</h2>
        <ul>
          <li><strong>Tour de poitrine :</strong> Mesurez horizontalement au point le plus large de votre buste, sous les aisselles.</li>
          <li><strong>Tour de taille :</strong> Mesurez au creux naturel de la taille, au niveau du nombril.</li>
        </ul>

        <h2>Entre deux tailles ?</h2>
        <p>
          Si vos mensurations se situent entre deux tailles :
          <br />• <strong>Pour une compression ferme et sportive :</strong> choisissez la taille inférieure.
          <br />• <strong>Pour un confort plus souple sous vos chemises de bureau :</strong> choisissez la taille supérieure.
        </p>

        <div style={{ marginTop: 24, padding: 18, background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0' }}>
          <strong style={{ color: '#166534', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="shield" size={18} /> Premier échange de taille 100% gratuit
          </strong>
          <p style={{ margin: '6px 0 0', color: '#15803d', fontSize: 14 }}>
            Grâce à notre Garantie 30 Jours, si votre taille ne convient pas parfaitement, nous vous échangeons gratuitement votre t-shirt sans aucun frais supplémentaire.
          </p>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <Link to="/#product" className="btn btn--dark" style={{ display: 'inline-flex' }}>
            Choisir mon modèle Vela Sculpt™ <Icon name="arrow" size={16} />
          </Link>
        </div>
      </article>
    </div>
  );
}
