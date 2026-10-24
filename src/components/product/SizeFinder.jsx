import { useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { sizeChart } from '../../data/product.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useLockScroll } from '../../lib/hooks.js';
import './SizeFinder.css';

export function recommendSize(kg, cm, lang = 'fr') {
  const matches = sizeChart.filter((r) => kg >= r.kg[0] && kg <= r.kg[1]);
  if (!matches.length) {
    if (kg < sizeChart[0].kg[0])
      return {
        sizes: ['S'],
        fit: lang === 'fr' ? 'Compression souple et confortable.' : 'Soft, comfortable compression.',
      };
    if (kg > sizeChart[sizeChart.length - 1].kg[1])
      return {
        sizes: [sizeChart[sizeChart.length - 1].size],
        fit: lang === 'fr' ? 'Coupe enveloppante et maintien ferme.' : 'Close contouring and firm support.',
      };
    return null;
  }
  const row = matches[0];
  let fit =
    lang === 'fr'
      ? 'Coupe standard ajustée, parfaite pour le quotidien sous vos vêtements.'
      : 'Standard ergonomic fit, ideal for everyday wear under shirts.';
  if (cm < row.cm[0])
    fit =
      lang === 'fr'
        ? 'Bien couvrant sur le torse et les hanches.'
        : 'Full coverage over the chest and torso.';
  if (cm > row.cm[1])
    fit =
      lang === 'fr'
        ? 'Coupe athlétique dynamique sur le haut du corps.'
        : 'Athletic fit across the upper body.';
  return { sizes: matches.map((m) => m.size), fit };
}

export default function SizeFinder({ open, onClose, onApply }) {
  const { lang } = useLanguage();
  const [kg, setKg] = useState('');
  const [cm, setCm] = useState('');
  useLockScroll(open);
  if (!open) return null;

  const result = kg && cm ? recommendSize(Number(kg), Number(cm), lang) : null;
  const outOfRange = kg && cm && !result;

  return (
    <div
      className="modal"
      onClick={onClose}
      role="dialog"
      aria-label={lang === 'fr' ? 'Guide des tailles interactif' : 'Interactive Size Guide'}
    >
      <div className="modal__card" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          onClick={onClose}
          aria-label={lang === 'fr' ? 'Fermer' : 'Close'}
        >
          <Icon name="close" size={22} />
        </button>
        <span className="eyebrow">
          {lang === 'fr' ? 'Calculateur Morphologique' : 'Body Fit Calculator'}
        </span>
        <h3 className="modal__title">
          {lang === 'fr' ? 'Trouvez votre taille en 2 chiffres' : 'Find your size in 2 numbers'}
        </h3>
        <p className="modal__lead">
          {lang === 'fr'
            ? 'Renseignez votre poids et votre taille pour obtenir notre recommandation instantanée.'
            : 'Enter your weight and height for an instant personalized size recommendation.'}
        </p>

        <div className="modal__fields">
          <label>
            {lang === 'fr' ? 'Poids' : 'Weight'}
            <span>
              <input
                type="number"
                inputMode="numeric"
                value={kg}
                onChange={(e) => setKg(e.target.value)}
                placeholder="75"
              />
              kg
            </span>
          </label>
          <label>
            {lang === 'fr' ? 'Taille' : 'Height'}
            <span>
              <input
                type="number"
                inputMode="numeric"
                value={cm}
                onChange={(e) => setCm(e.target.value)}
                placeholder="178"
              />
              cm
            </span>
          </label>
        </div>

        {result && (
          <div className="size-result">
            <p>
              {lang === 'fr' ? 'Taille conseillée :' : 'Recommended size:'}{' '}
              <strong>{result.sizes.join(lang === 'fr' ? ' ou ' : ' or ')}</strong>
            </p>
            {result.sizes.length > 1 && (
              <small>
                {lang === 'fr'
                  ? 'La plus petite pour une compression sportive, la plus grande pour un confort souple.'
                  : 'Smaller for athletic compression, larger for relaxed comfort.'}
              </small>
            )}
            <small>{result.fit}</small>
            <button className="btn btn--dark btn--block" onClick={() => onApply(result.sizes[0])}>
              {lang === 'fr' ? `Appliquer la taille ${result.sizes[0]}` : `Apply size ${result.sizes[0]}`}
            </button>
          </div>
        )}
        {outOfRange && (
          <p className="size-result is-empty">
            {lang === 'fr'
              ? 'Hors grille standard — contactez notre support à support@velalabs.co pour un conseil personnalisé.'
              : 'Outside standard range — contact support at support@velalabs.co for guidance.'}
          </p>
        )}

        <table className="size-table">
          <thead>
            <tr>
              <th>{lang === 'fr' ? 'Taille' : 'Size'}</th>
              <th>{lang === 'fr' ? 'Poids' : 'Weight'}</th>
              <th>{lang === 'fr' ? 'Taille' : 'Height'}</th>
              <th>{lang === 'fr' ? 'Poitrine' : 'Chest'}</th>
            </tr>
          </thead>
          <tbody>
            {sizeChart.map((r) => (
              <tr key={r.size} className={result?.sizes.includes(r.size) ? 'is-match' : ''}>
                <td>
                  <strong>{r.size}</strong>
                </td>
                <td>
                  {r.kg[0]}–{r.kg[1]} kg
                </td>
                <td>
                  {r.cm[0]}–{r.cm[1]} cm
                </td>
                <td>{r.chest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
