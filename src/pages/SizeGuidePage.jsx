import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sizeChart } from '../data/product.js';
import Icon from '../components/ui/Icon.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import './LegalPage.css';

export default function SizeGuidePage() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? 'Guide des Tailles Homme | Vela Labs'
        : 'Men’s Size Guide | Vela Labs';
  }, [lang]);

  return (
    <div className="legal-page container">
      <nav className="pp__crumbs" aria-label={lang === 'fr' ? "Fil d'Ariane" : 'Breadcrumbs'}>
        <Link to="/">{t('nav.home')}</Link> / <span>{lang === 'fr' ? 'Guide des Tailles' : 'Size Guide'}</span>
      </nav>

      <article className="legal-content">
        <h1>{lang === 'fr' ? 'Guide des Tailles — Homme' : 'Men’s Size Guide'}</h1>
        <p className="legal-meta">
          {lang === 'fr'
            ? 'Comment choisir votre taille de t-shirt de compression ergonomique Vela Sculpt™.'
            : 'How to choose your ideal Vela Sculpt™ ergonomic compression fit.'}
        </p>

        <p>
          {lang === 'fr'
            ? 'Nos t-shirts sont conçus pour épouser la morphologie masculine tout en assurant un lissage uniforme du torse et un maintien lombaire stable.'
            : 'Our shirts are engineered to fit masculine body types while providing uniform torso smoothing and reliable lumbar support.'}
        </p>

        <div className="details__table" style={{ margin: '24px 0' }}>
          <table className="size-table">
            <thead>
              <tr>
                <th>{lang === 'fr' ? 'Taille' : 'Size'}</th>
                <th>{lang === 'fr' ? 'Poids conseillé' : 'Recommended Weight'}</th>
                <th>{lang === 'fr' ? 'Taille (stature)' : 'Height'}</th>
                <th>{lang === 'fr' ? 'Tour de poitrine' : 'Chest'}</th>
                <th>{lang === 'fr' ? 'Tour de taille' : 'Waist'}</th>
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

        <h2>{lang === 'fr' ? 'Comment bien mesurer ?' : 'How to measure?'}</h2>
        <ul>
          <li>
            <strong>{lang === 'fr' ? 'Tour de poitrine :' : 'Chest circumference:'}</strong>{' '}
            {lang === 'fr'
              ? 'Mesurez horizontalement au point le plus large de votre buste, sous les aisselles.'
              : 'Measure horizontally around the fullest part of your chest, just under your armpits.'}
          </li>
          <li>
            <strong>{lang === 'fr' ? 'Tour de taille :' : 'Waist circumference:'}</strong>{' '}
            {lang === 'fr'
              ? 'Mesurez au creux naturel de la taille, au niveau du nombril.'
              : 'Measure around your natural waistline, level with your navel.'}
          </li>
        </ul>

        <h2>{lang === 'fr' ? 'Entre deux tailles ?' : 'Between two sizes?'}</h2>
        <p>
          {lang === 'fr' ? (
            <>
              Si vos mensurations se situent entre deux tailles :
              <br />• <strong>Pour une compression ferme et sportive :</strong> choisissez la taille inférieure.
              <br />• <strong>Pour un confort plus souple sous vos chemises de bureau :</strong> choisissez la taille supérieure.
            </>
          ) : (
            <>
              If your measurements fall between two sizes:
              <br />• <strong>For firm, athletic compression:</strong> choose the smaller size.
              <br />• <strong>For relaxed everyday comfort under dress shirts:</strong> choose the larger size.
            </>
          )}
        </p>

        <div style={{ marginTop: 24, padding: 18, background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0' }}>
          <strong style={{ color: '#166534', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="shield" size={18} />{' '}
            {lang === 'fr' ? 'Premier échange de taille 100% gratuit' : 'First size exchange 100% free'}
          </strong>
          <p style={{ margin: '6px 0 0', color: '#15803d', fontSize: 14 }}>
            {lang === 'fr'
              ? 'Grâce à notre Garantie 30 Jours, si votre taille ne convient pas parfaitement, nous vous échangeons gratuitement votre t-shirt sans aucun frais supplémentaire.'
              : 'Backed by our 30-Day Guarantee: if your size isn’t a flawless fit, we exchange it for free with zero extra costs.'}
          </p>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <Link to="/#product" className="btn btn--dark" style={{ display: 'inline-flex' }}>
            {lang === 'fr' ? 'Choisir mon modèle Vela Sculpt™' : 'Choose my Vela Sculpt™ fit'}{' '}
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </article>
    </div>
  );
}
