import { useState, useEffect } from 'react';
import Gallery from './Gallery.jsx';
import BundlePicker from './BundlePicker.jsx';
import ProductDetails from './ProductDetails.jsx';
import SizeFinder from './SizeFinder.jsx';
import StickyCart from './StickyCart.jsx';
import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import { badges, benefits, bundles, colors, product, stats } from '../../data/product.js';
import { colorHex, getColorImages, products } from '../../data/catalog.js';
import { useCart } from '../../context/CartContext.jsx';
import { useScrolledPast } from '../../lib/hooks.js';
import './ProductSection.css';

const MAX_ITEMS = Math.max(...bundles.map((b) => b.qty));
const startVariants = Array.from({ length: MAX_ITEMS }, (_, i) => ({
  color: colors[i % colors.length].id,
  size: 'L',
}));

// Ships two days from today, in French format
const shipDate = new Date(Date.now() + 2 * 864e5).toLocaleDateString('fr-FR', {
  month: 'long',
  day: 'numeric',
});

function Benefits() {
  return (
    <ul className="benefits">
      {benefits.map((b) => (
        <li key={b.title}>
          <span className="benefits__icon">
            <Icon name={b.icon} size={16} />
          </span>
          <div>
            <strong>{b.title}</strong>
            <p>{b.text}</p>
          </div>
          {b.tag && <em>{b.tag}</em>}
        </li>
      ))}
    </ul>
  );
}

function Stats() {
  return (
    <div className="stats">
      {stats.map((s) => (
        <div key={s.label}>
          <b>
            {s.value}
            <small>{s.unit}</small>
          </b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function ProductSection({ initialModelHandle }) {
  const [selectedHandle, setSelectedHandle] = useState(initialModelHandle || products[0].handle);
  const currentModel = products.find((p) => p.handle === selectedHandle) || products[0];

  const [selectedColor, setSelectedColor] = useState(currentModel.colors[0] || 'Noir');

  const [bundleId, setBundleId] = useState(2);
  const [variants, setVariants] = useState(startVariants);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [atcRef, pastAtc] = useScrolledPast();
  const { add } = useCart();

  // Reset selected color when switching product model
  useEffect(() => {
    setSelectedColor(currentModel.colors[0] || 'Noir');
  }, [currentModel.handle]);

  const currentImages = getColorImages(currentModel, selectedColor);

  const bundle = bundles.find((b) => b.id === bundleId) || bundles[1];
  const chosen = variants.slice(0, bundle.qty);

  const updateVariant = (i, patch) =>
    setVariants((vs) => vs.map((v, j) => (j === i ? { ...v, ...patch } : v)));

  const applySize = (size) => {
    setVariants((vs) => vs.map((v) => ({ ...v, size })));
    setSizeOpen(false);
  };

  const handleSelectColor = (colorName) => {
    setSelectedColor(colorName);
    // synchronize variant 1 color if color matches
    const matchedColor = colors.find((c) => c.label.toLowerCase() === colorName.toLowerCase());
    if (matchedColor) {
      setVariants((vs) => vs.map((v) => ({ ...v, color: matchedColor.id })));
    }
  };

  const addToCart = () => {
    const detail = chosen
      .map((v) => {
        const c = colors.find((col) => col.id === v.color) || colors[0];
        return `${c.label} / ${v.size}`;
      })
      .join(', ');

    add({
      id: `${currentModel.handle}-${bundle.id}-${detail}`,
      title: `${currentModel.title} — Pack ${bundle.qty}`,
      detail,
      image: currentImages[0] || currentModel.images[0],
      color: colorHex[selectedColor] || '#1a1a1a',
      price: bundle.price,
      compareAt: bundle.compareAt,
      freeShipping: Boolean(bundle.freeShipping),
    });
  };

  return (
    <section className="product container" id="product">
      <div className="product__media">
        <Gallery images={currentImages} title={currentModel.title} activeColor={selectedColor} />
      </div>

      <div className="product__info">
        <div className="product__model-selector">
          <label className="product__model-label">1. Choisissez votre coupe ergonomique :</label>
          <div className="product__model-buttons">
            {products.map((p) => (
              <button
                key={p.handle}
                className={`product__model-btn ${p.handle === selectedHandle ? 'is-active' : ''}`}
                onClick={() => setSelectedHandle(p.handle)}
              >
                <span>{p.shortTitle}</span>
                <small>{p.badge}</small>
              </button>
            ))}
          </div>
        </div>

        <h1 className="product__title">{currentModel.title}</h1>
        <a href="#reviews" className="product__rating">
          <Stars value={5} size={16} /> <strong>4.9</strong> <span>/ 5 (1 420+ avis vérifiés)</span>
        </a>

        <p className="product__tagline">{currentModel.tagline}</p>

        {/* Color swatches */}
        <div className="product__color-picker">
          <div className="product__color-header">
            <span className="product__color-label">
              2. Couleur sélectionnée : <strong>{selectedColor}</strong>
            </span>
          </div>

          <div className="product__color-swatches">
            {currentModel.colors.map((c) => (
              <button
                key={c}
                type="button"
                className={`product__color-swatch-btn ${c === selectedColor ? 'is-active is-selected' : ''}`}
                onClick={() => handleSelectColor(c)}
                title={`Couleur ${c}`}
              >
                <span className="product__color-dot" style={{ background: colorHex[c] || '#1a1a1a' }} />
                <span className="product__color-name">{c}</span>
              </button>
            ))}
          </div>
        </div>

        <Benefits />
        <Stats />

        <p className="product__micro">
          <span>
            <Icon name="lock" size={14} /> Paiement 100% sécurisé
          </span>
          <span>
            <Icon name="truck" size={14} /> Livraison suivie offerte dès 55 €
          </span>
          <span>
            <Icon name="shield" size={14} /> Garantie Satisfait ou Remboursé 30j
          </span>
        </p>

        <BundlePicker
          selectedId={bundleId}
          onSelect={setBundleId}
          variants={chosen}
          onVariantChange={updateVariant}
          productImage={currentImages[0]}
        />

        <button className="size-btn" onClick={() => setSizeOpen(true)}>
          <Icon name="ruler" size={18} /> Guide interactif : Trouver ma taille
        </button>

        <button ref={atcRef} className="btn btn--dark btn--block atc" onClick={addToCart}>
          Commander — {bundle.title} ({activeColor})
        </button>

        <div className="product__ship">
          <span>
            <i className="live-dot" /> Expédié avant le <strong>{shipDate}</strong>
          </span>
          <span>
            <i className="flag-fr" /> Livraison suivie en France & Europe
          </span>
        </div>
        <p className="product__trend">
          <Icon name="trend" size={16} /> Plus de 2 450 t-shirts commandés cette semaine
        </p>

        <ul className="product__badges">
          {badges.map((b) => (
            <li key={b.label}>
              <Icon name={b.icon} size={22} />
              {b.label}
            </li>
          ))}
        </ul>

        <div className="guarantee">
          <Icon name="shield" size={24} />
          <p>
            <strong>Garantie Satisfait ou Remboursé de 30 jours.</strong> Portez votre t-shirt Vela Sculpt™ au travail ou en sortie. S’il ne vous apporte pas un confort absolu et un lissage impeccable, demandez un remboursement intégral sans justification.
          </p>
        </div>

        <ProductDetails />
      </div>

      <SizeFinder open={sizeOpen} onClose={() => setSizeOpen(false)} onApply={applySize} />
      <StickyCart
        visible={pastAtc}
        bundle={bundle}
        onAdd={addToCart}
        productImage={currentImages[0]}
        title={`${currentModel.title} (${activeColor})`}
      />
    </section>
  );
}
