import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Accordion from '../components/ui/Accordion.jsx';
import Icon from '../components/ui/Icon.jsx';
import Stars from '../components/ui/Stars.jsx';
import Gallery from '../components/product/Gallery.jsx';
import SizeFinder from '../components/product/SizeFinder.jsx';
import RelatedProducts from '../components/sections/RelatedProducts.jsx';
import NotFound from './NotFound.jsx';
import { colorHex, collectionUrl, getProduct, getColorImages } from '../data/catalog.js';
import { brand } from '../data/site.js';
import { fabric, shipping, sizeChart } from '../data/product.js';
import { useCart } from '../context/CartContext.jsx';
import { price } from '../lib/format.js';
import './ProductPage.css';

export default function ProductPage({ handle: fixedHandle }) {
  const params = useParams();
  const product = getProduct(fixedHandle ?? params.handle);
  const [color, setColor] = useState(product?.colors?.[0] || 'Noir');
  const [hoverColor, setHoverColor] = useState(null);
  const [size, setSize] = useState('L');
  const [qty, setQty] = useState(1);
  const [sizeOpen, setSizeOpen] = useState(false);
  const { add } = useCart();

  useEffect(() => {
    if (!product) return;
    setColor(product.colors?.[0] || 'Noir');
    setHoverColor(null);
    setSize('L');
    setQty(1);
    document.title = `${product.title} | ${brand.name} Labs`;
  }, [product?.handle]);

  if (!product) return <NotFound />;

  const activeColor = hoverColor || color;
  const currentImages = product ? getColorImages(product, activeColor) : [];
  const save = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;

  const addToCart = () => {
    const detail = `${color} / ${size}`;
    for (let i = 0; i < qty; i++) {
      add({
        id: `${product.handle}-${color}-${size}`,
        title: product.title,
        detail,
        image: currentImages[0] || product.images[0],
        color: colorHex[color] || '#1a1a1a',
        price: product.price,
        compareAt: product.compareAt,
        freeShipping: product.price * qty >= 55,
      });
    }
  };

  const details = [
    {
      title: 'Caractéristiques Techniques & Matière',
      content: (
        <div className="details">
          <ul className="details__tech-list" style={{ paddingLeft: 18, lineHeight: 1.6, marginBottom: 16 }}>
            {product.technicalDetails?.map((t) => (
              <li key={t.label} style={{ marginBottom: 6 }}>
                <strong>{t.label} :</strong> {t.desc}
              </li>
            ))}
          </ul>
          <dl className="details__specs">
            {fabric.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      ),
    },
    {
      title: 'Usage & Profil Morphologique Recommandé',
      content: (
        <div className="details">
          <p><strong>Usage optimal :</strong> {product.usage}</p>
          <p style={{ marginTop: 8 }}><strong>Profil cible :</strong> {product.targetAvatar}</p>
        </div>
      ),
    },
    {
      title: 'Expédition & Garantie Satisfait ou Remboursé de 30 Jours',
      content: (
        <div className="details">
          <ul className="details__list">
            {shipping.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <p style={{ marginTop: 10 }}>{shipping.returns}</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <section className="pp container">
        <nav className="pp__crumbs" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link> / <Link to={collectionUrl('all')}>Tous nos modèles</Link> / <span>{product.title}</span>
        </nav>

        <div className="pp__gallery-col">
          <Gallery images={currentImages} title={product.title} activeColor={activeColor} />
        </div>

        <div className="pp__info">
          {product.badge && <span className="card__badge" style={{ position: 'static', display: 'inline-block', marginBottom: 8 }}>{product.badge}</span>}
          <h1 className="pp__title">{product.title}</h1>
          <p className="pp__rating">
            <Stars value={product.rating || 4.9} size={15} /> <strong>{product.rating || 4.9}</strong> / 5 ({product.reviewCount || 1400}+ avis)
          </p>

          <p className="pp__tagline" style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 14 }}>
            {product.tagline}
          </p>

          <p className="pp__price">
            <strong className={save ? 'is-sale' : ''}>{price(product.price)}</strong>
            {save > 0 && (
              <>
                <s>{price(product.compareAt)}</s>
                <em>Économisez {save}%</em>
              </>
            )}
          </p>

          {product.colors && product.colors.length > 0 && (
            <div className="pp__color-picker">
              <div className="pp__color-header">
                <span className="pp__color-label">
                  Couleur sélectionnée : <strong>{activeColor}</strong>
                  {hoverColor && <em className="pp__color-preview-tag"> (Survol pour aperçu)</em>}
                </span>
                <span className="pp__color-angles-count">
                  {currentImages.length} angles de vue
                </span>
              </div>
              <div className="pp__swatches">
                {product.colors.map((c) => {
                  const angles = getColorImages(product, c);
                  return (
                    <button
                      key={c}
                      type="button"
                      className={`pp__swatch-btn ${c === activeColor ? 'is-active' : ''} ${c === color ? 'is-selected' : ''}`}
                      onClick={() => setColor(c)}
                      onMouseEnter={() => setHoverColor(c)}
                      onMouseLeave={() => setHoverColor(null)}
                      title={`Voir ${c} (${angles.length} angles)`}
                    >
                      <span className="pp__swatch-dot" style={{ background: colorHex[c] || '#1a1a1a' }} />
                      <span className="pp__swatch-name">{c}</span>
                      <span className="pp__swatch-badge">{angles.length} angles</span>
                    </button>
                  );
                })}
              </div>
              <p className="pp__color-hint">
                <Icon name="zoom" size={13} /> Survolez une couleur pour visualiser instantanément tous ses angles de vue.
              </p>
            </div>
          )}

          {product.sizes && (
            <div className="pp__option">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>
                  Taille : <strong>{size}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setSizeOpen(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--gold-dark)', fontSize: 13, fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Guide des tailles
                </button>
              </div>
              <div className="pp__pills">
                {product.sizes.map((s) => (
                  <button key={s} className={s === size ? 'is-active' : ''} onClick={() => setSize(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pp__buy">
            <div className="qty qty--lg">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuer la quantité">
                <Icon name="minus" size={14} />
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Augmenter la quantité">
                <Icon name="plus" size={14} />
              </button>
            </div>
            <button className="btn btn--dark atc" onClick={addToCart}>
              Ajouter au panier
            </button>
          </div>

          <p className="product__micro">
            <span>
              <Icon name="lock" size={14} /> Paiement 100% sécurisé
            </span>
            <span>
              <Icon name="truck" size={14} /> Expédition sous 24/48h
            </span>
            <span>
              <Icon name="shield" size={14} /> Garantie 30 Jours
            </span>
          </p>

          <div className="guarantee">
            <Icon name="shield" size={24} />
            <p>
              <strong>Garantie Satisfait ou Remboursé de 30 jours.</strong> Portez votre t-shirt Vela Sculpt™ en conditions réelles. Si vous n'êtes pas entièrement satisfait du confort ou du maintien, demandez un remboursement intégral.
            </p>
          </div>

          <Accordion items={details} />
        </div>
      </section>

      <SizeFinder open={sizeOpen} onClose={() => setSizeOpen(false)} onApply={(s) => { setSize(s); setSizeOpen(false); }} />
      <RelatedProducts exclude={product.handle} />
    </>
  );
}
