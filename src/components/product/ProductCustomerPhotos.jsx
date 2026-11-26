import { useLanguage } from '../../context/LanguageContext.jsx';
import './ProductCustomerPhotos.css';

export default function ProductCustomerPhotos({ onScrollToReviews }) {
  const { lang } = useLanguage();

  const photos = lang === 'fr'
    ? [
        {
          name: 'Fabrice C.',
          country: 'FR',
          flag: '🇫🇷',
          age: '42 ans',
          img: '/reviews/4.webp',
          quote: 'Lisse instantanément le ventre et rentre tout en place.',
        },
        {
          name: 'Jason M.',
          country: 'US',
          flag: '🇺🇸',
          age: '46 ans',
          img: '/reviews/5.webp',
          quote: 'Lisse tout immédiatement, les bandes bleues redressent le dos.',
        },
        {
          name: 'Chen Z.',
          country: 'CA',
          flag: '🇨🇦',
          age: '41 ans',
          img: '/reviews/6.webp',
          quote: 'Différence de profil impressionnante, ventre totalement aplati.',
        },
      ]
    : [
        {
          name: 'Jason M.',
          country: 'US',
          flag: '🇺🇸',
          age: '46 yrs',
          img: '/reviews/5.webp',
          quote: 'Instantly smooths everything out & blue bands pull shoulders back.',
        },
        {
          name: 'Chen Z.',
          country: 'CA',
          flag: '🇨🇦',
          age: '41 yrs',
          img: '/reviews/6.webp',
          quote: 'Huge side profile difference: completely flattens my stomach.',
        },
        {
          name: 'Carlos M.',
          country: 'US',
          flag: '🇺🇸',
          age: '44 yrs',
          img: '/reviews/26.webp',
          quote: 'Visibly flattens the stomach under all my fitted shirts.',
        },
      ];

  return (
    <div className="product-customer-photos">
      <div className="product-customer-photos__head">
        <span className="product-customer-photos__title">
          <span>⭐</span> {lang === 'fr' ? 'Résultats réels de clients' : 'Real customer results'}
        </span>
        <button
          type="button"
          className="product-customer-photos__subtitle"
          onClick={onScrollToReviews}
          style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {lang === 'fr' ? 'Voir les 67 avis →' : 'See all 67 reviews →'}
        </button>
      </div>

      <div className="product-customer-photos__grid">
        {photos.map((item) => (
          <div key={item.name} className="product-customer-photo-card">
            <div className="product-customer-photo-card__media">
              <img
                src={item.img}
                alt={`${item.name} - ${item.quote}`}
                width="140"
                height="140"
                loading="lazy"
                decoding="async"
                className="product-customer-photo-card__img"
              />
              <span className="product-customer-photo-card__verified">
                {item.flag}
              </span>
            </div>
            <div className="product-customer-photo-card__info">
              <span className="product-customer-photo-card__stars">★★★★★</span>
              <strong className="product-customer-photo-card__name">
                {item.name} · {item.age}
              </strong>
              <p className="product-customer-photo-card__quote">"{item.quote}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
