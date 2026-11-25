import { useLanguage } from '../../context/LanguageContext.jsx';
import './ProductCustomerPhotos.css';

export default function ProductCustomerPhotos() {
  const { lang } = useLanguage();

  const items = [
    {
      img: '/reviews/5.webp',
      caption: lang === 'fr' ? 'Invisible sous une chemise' : 'Invisible under a dress shirt',
      detail: lang === 'fr' ? 'Maintien postural & dos droit' : 'Posture support & straight back',
    },
    {
      img: '/reviews/6.webp',
      caption: lang === 'fr' ? 'Lisse sous un t-shirt ajusté' : 'Smooth under a fitted tee',
      detail: lang === 'fr' ? 'Effet gainant taille & torse' : 'Instant core & chest smoothing',
    },
    {
      img: '/reviews/26.webp',
      caption: lang === 'fr' ? 'Maintien impeccable toute la journée' : 'Stays in place all day',
      detail: lang === 'fr' ? 'Maille respirante seconde peau' : 'Breathable second skin knit',
    },
  ];

  return (
    <div className="product-customer-photos">
      <div className="product-customer-photos__head">
        <span className="product-customer-photos__title">
          <span>👕</span> {lang === 'fr' ? 'Vela Sculpt™ au quotidien' : 'Vela Sculpt™ in everyday life'}
        </span>
      </div>

      <div className="product-customer-photos__grid">
        {items.map((item, idx) => (
          <div key={idx} className="product-customer-photo-card">
            <div className="product-customer-photo-card__media">
              <img
                src={item.img}
                alt={item.caption}
                width="140"
                height="140"
                loading="lazy"
                decoding="async"
                className="product-customer-photo-card__img"
              />
            </div>
            <div className="product-customer-photo-card__info">
              <strong className="product-customer-photo-card__phrase">{item.caption}</strong>
              <span className="product-customer-photo-card__sub">{item.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
