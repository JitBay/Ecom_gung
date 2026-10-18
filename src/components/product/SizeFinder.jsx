import { useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { sizeChart } from '../../data/product.js';
import { useLockScroll } from '../../lib/hooks.js';
import './SizeFinder.css';

export function recommendSize(kg, cm) {
  const matches = sizeChart.filter((r) => kg >= r.kg[0] && kg <= r.kg[1]);
  if (!matches.length) {
    if (kg < sizeChart[0].kg[0]) return { sizes: ['S'], fit: 'Compression souple et confortable.' };
    if (kg > sizeChart[sizeChart.length - 1].kg[1]) return { sizes: ['3XL'], fit: 'Coupe enveloppante et maintien ferme.' };
    return null;
  }
  const row = matches[0];
  let fit = 'Coupe standard ajustée, parfaite pour le quotidien sous vos vêtements.';
  if (cm < row.cm[0]) fit = 'Bien couvrant sur le torse et les hanches.';
  if (cm > row.cm[1]) fit = 'Coupe athlétique dynamique sur le haut du corps.';
  return { sizes: matches.map((m) => m.size), fit };
}

export default function SizeFinder({ open, onClose, onApply }) {
  const [kg, setKg] = useState('');
  const [cm, setCm] = useState('');
  useLockScroll(open);
  if (!open) return null;

  const result = kg && cm ? recommendSize(Number(kg), Number(cm)) : null;
  const outOfRange = kg && cm && !result;

  return (
    <div className="modal" onClick={onClose} role="dialog" aria-label="Guide des tailles interactif">
      <div className="modal__card" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Fermer">
          <Icon name="close" size={22} />
        </button>
        <span className="eyebrow">Calculateur Morphologique</span>
        <h3 className="modal__title">Trouvez votre taille en 2 chiffres</h3>
        <p className="modal__lead">Renseignez votre poids et votre taille pour obtenir notre recommandation instantanée.</p>

        <div className="modal__fields">
          <label>
            Poids
            <span>
              <input type="number" inputMode="numeric" value={kg} onChange={(e) => setKg(e.target.value)} placeholder="75" />
              kg
            </span>
          </label>
          <label>
            Taille
            <span>
              <input type="number" inputMode="numeric" value={cm} onChange={(e) => setCm(e.target.value)} placeholder="178" />
              cm
            </span>
          </label>
        </div>

        {result && (
          <div className="size-result">
            <p>
              Taille conseillée : <strong>{result.sizes.join(' ou ')}</strong>
            </p>
            {result.sizes.length > 1 && <small>La plus petite pour une compression sportive, la plus grande pour un confort souple.</small>}
            <small>{result.fit}</small>
            <button className="btn btn--dark btn--block" onClick={() => onApply(result.sizes[0])}>
              Appliquer la taille {result.sizes[0]}
            </button>
          </div>
        )}
        {outOfRange && <p className="size-result is-empty">Hors grille standard — contactez notre support à support@velalabs.co pour un conseil personnalisé.</p>}

        <table className="size-table">
          <thead>
            <tr>
              <th>Taille</th>
              <th>Poids</th>
              <th>Taille</th>
              <th>Poitrine</th>
            </tr>
          </thead>
          <tbody>
            {sizeChart.map((r) => (
              <tr key={r.size} className={result?.sizes.includes(r.size) ? 'is-match' : ''}>
                <td><strong>{r.size}</strong></td>
                <td>{r.kg[0]}–{r.kg[1]} kg</td>
                <td>{r.cm[0]}–{r.cm[1]} cm</td>
                <td>{r.chest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
