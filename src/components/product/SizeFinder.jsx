import { useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { sizeChart } from '../../data/product.js';
import { useLockScroll } from '../../lib/hooks.js';
import './SizeFinder.css';

// Weight picks the size (both sizes when exactly on a boundary); height says how the leg sits.
export function recommendSize(kg, cm) {
  const matches = sizeChart.filter((r) => kg >= r.kg[0] && kg <= r.kg[1]);
  if (!matches.length) return null;
  const row = matches[0];
  let fit = 'Full length, as designed.';
  if (cm < row.cm[0]) fit = 'A little long on you — may gather slightly at the ankle.';
  if (cm > row.cm[1]) fit = 'Sits as a 7/8 length, just above the ankle.';
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
    <div className="modal" onClick={onClose} role="dialog" aria-label="Find my size">
      <div className="modal__card" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={22} />
        </button>
        <span className="eyebrow">Size finder</span>
        <h3 className="modal__title">Find my size in 2 numbers</h3>
        <p className="modal__lead">Your weight picks the size; your height tells you how the leg will sit.</p>

        <div className="modal__fields">
          <label>
            Weight
            <span>
              <input type="number" inputMode="numeric" value={kg} onChange={(e) => setKg(e.target.value)} placeholder="65" />
              kg
            </span>
          </label>
          <label>
            Height
            <span>
              <input type="number" inputMode="numeric" value={cm} onChange={(e) => setCm(e.target.value)} placeholder="165" />
              cm
            </span>
          </label>
        </div>

        {result && (
          <div className="size-result">
            <p>
              Your size: <strong>{result.sizes.join(' or ')}</strong>
            </p>
            {result.sizes.length > 1 && <small>Smaller for a closer sculpting fit, larger for more ease.</small>}
            <small>{result.fit}</small>
            <button className="btn btn--dark btn--block" onClick={() => onApply(result.sizes[0])}>
              Use size {result.sizes[0]}
            </button>
          </div>
        )}
        {outOfRange && <p className="size-result is-empty">Outside our chart — email us and we will help you choose.</p>}

        <table className="size-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Leg</th>
            </tr>
          </thead>
          <tbody>
            {sizeChart.map((r) => (
              <tr key={r.size} className={result?.sizes.includes(r.size) ? 'is-match' : ''}>
                <td>{r.size}</td>
                <td>
                  {r.kg[0]}–{r.kg[1]} kg
                </td>
                <td>
                  {r.cm[0]}–{r.cm[1]} cm
                </td>
                <td>{r.leg} cm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
