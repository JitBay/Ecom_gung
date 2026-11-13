// ProductArt component — renders real photo of Vela Sculpt™ compression t-shirt
import './ProductArt.css';

export default function ProductArt({
  image = '/images/image page produit/demi-manche/1.png',
  color = '#1d1d1f',
  pose = 'front',
  className = '',
  alt = 'Vela Sculpt™ T-shirt de compression',
}) {
  return (
    <div className={`art-wrapper ${className}`}>
      <img
        src={image}
        alt={alt}
        className="art-img"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/image page produit/demi-manche/1.png';
        }}
      />
    </div>
  );
}
