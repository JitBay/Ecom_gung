// ProductArt component — renders real photo of Vela Sculpt™ compression t-shirt
import './ProductArt.css';

export default function ProductArt({
  image = '/images/products/demi-manches/1.jpg',
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
          e.target.src = '/images/products/demi-manches/1.jpg';
        }}
      />
    </div>
  );
}
