import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import Icon from '../ui/Icon.jsx';
import './InlineSizeGuide.css';

const sizeRows = [
  {
    size: 'S',
    chestIn: '34.5" – 38"',
    chestCm: '88 – 96 cm',
    waistIn: '29" – 32"',
    waistCm: '74 – 82 cm',
    weightLbs: '128 – 150 lbs',
    weightKg: '58 – 68 kg',
    heightIn: '5\'3" – 5\'8"',
    heightCm: '160 – 172 cm',
  },
  {
    size: 'M',
    chestIn: '38" – 41"',
    chestCm: '96 – 104 cm',
    waistIn: '32" – 35.5"',
    waistCm: '82 – 90 cm',
    weightLbs: '150 – 172 lbs',
    weightKg: '68 – 78 kg',
    heightIn: '5\'6" – 5\'10"',
    heightCm: '168 – 178 cm',
  },
  {
    size: 'L',
    chestIn: '41" – 44"',
    chestCm: '104 – 112 cm',
    waistIn: '35.5" – 38.5"',
    waistCm: '90 – 98 cm',
    weightLbs: '172 – 194 lbs',
    weightKg: '78 – 88 kg',
    heightIn: '5\'8" – 6\'0"',
    heightCm: '174 – 184 cm',
  },
  {
    size: 'XL',
    chestIn: '44" – 47"',
    chestCm: '112 – 120 cm',
    waistIn: '38.5" – 41.5"',
    waistCm: '98 – 106 cm',
    weightLbs: '194 – 216 lbs',
    weightKg: '88 – 98 kg',
    heightIn: '5\'10" – 6\'2"',
    heightCm: '178 – 188 cm',
  },
  {
    size: '2XL',
    chestIn: '47" – 50.5"',
    chestCm: '120 – 128 cm',
    waistIn: '41.5" – 45.5"',
    waistCm: '106 – 116 cm',
    weightLbs: '216 – 253 lbs',
    weightKg: '98 – 115 kg',
    heightIn: '5\'11" – 6\'5"',
    heightCm: '180 – 195 cm',
  },
];

export default function InlineSizeGuide({ onOpenCalculator, className = '' }) {
  const { lang } = useLanguage();
  // Default to inches ('in')
  const [unit, setUnit] = useState('in');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`inline-size-guide ${className}`}>
      <div className="inline-size-guide__header">
        <button
          type="button"
          className="inline-size-guide__trigger"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          <Icon name="ruler" size={17} />
          <span>
            {lang === 'fr'
              ? 'Guide des tailles (en pouces & cm)'
              : 'Size Chart (Inches & cm)'}
          </span>
          <span className={`inline-size-guide__arrow ${isOpen ? 'is-open' : ''}`}>
            ▼
          </span>
        </button>

        {onOpenCalculator && (
          <button
            type="button"
            className="inline-size-guide__calc-btn"
            onClick={onOpenCalculator}
          >
            <Icon name="sparkle" size={13} />{' '}
            {lang === 'fr' ? 'Trouver ma taille' : 'Find My Size'}
          </button>
        )}
      </div>

      {isOpen && (
        <div className="inline-size-guide__content">
          <div className="inline-size-guide__unit-toggle">
            <span className="inline-size-guide__unit-label">
              {lang === 'fr' ? 'Unité de mesure :' : 'Unit of measurement:'}
            </span>
            <div className="inline-size-guide__pills">
              <button
                type="button"
                className={`inline-size-guide__pill ${unit === 'in' ? 'is-active' : ''}`}
                onClick={() => setUnit('in')}
              >
                {lang === 'fr' ? 'Pouces (in / lbs)' : 'Inches (in / lbs)'}
              </button>
              <button
                type="button"
                className={`inline-size-guide__pill ${unit === 'cm' ? 'is-active' : ''}`}
                onClick={() => setUnit('cm')}
              >
                {lang === 'fr' ? 'Centimètres (cm / kg)' : 'Centimeters (cm / kg)'}
              </button>
            </div>
          </div>

          <div className="inline-size-guide__table-wrap">
            <table className="inline-size-table">
              <thead>
                <tr>
                  <th>{lang === 'fr' ? 'Taille' : 'Size'}</th>
                  <th>{lang === 'fr' ? 'Tour de poitrine' : 'Chest'}</th>
                  <th>{lang === 'fr' ? 'Tour de taille' : 'Waist'}</th>
                  <th>{lang === 'fr' ? 'Poids conseillé' : 'Weight'}</th>
                  <th>{lang === 'fr' ? 'Stature' : 'Height'}</th>
                </tr>
              </thead>
              <tbody>
                {sizeRows.map((r) => (
                  <tr key={r.size}>
                    <td>
                      <strong>{r.size}</strong>
                    </td>
                    <td>{unit === 'in' ? r.chestIn : r.chestCm}</td>
                    <td>{unit === 'in' ? r.waistIn : r.waistCm}</td>
                    <td>{unit === 'in' ? r.weightLbs : r.weightKg}</td>
                    <td>{unit === 'in' ? r.heightIn : r.heightCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="inline-size-guide__tip">
            <strong>{lang === 'fr' ? 'Entre deux tailles ?' : 'Between sizes?'}</strong>{' '}
            {lang === 'fr'
              ? 'Pour une compression ferme et sportive, choisissez la taille inférieure. Pour un confort plus décontracté sous chemise, prenez la taille supérieure.'
              : 'For firm athletic compression, size down. For relaxed daily comfort under dress shirts, size up.'}
          </p>
        </div>
      )}
    </div>
  );
}
