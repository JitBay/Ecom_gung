// Standard product page for every product except the leggings (which have their own long page).
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Accordion from '../components/ui/Accordion.jsx';
import Icon from '../components/ui/Icon.jsx';
import Stars from '../components/ui/Stars.jsx';
import ProductThumb from '../components/ui/ProductThumb.jsx';
import RelatedProducts from '../components/sections/RelatedProducts.jsx';
import NotFound from './NotFound.jsx';
import { colorHex, collectionUrl, getProduct } from '../data/catalog.js';
import { brand } from '../data/site.js';
import { shipping } from '../data/product.js';
import { useCart } from '../context/CartContext.jsx';
import { price } from '../lib/format.js';
import './ProductPage.css';

function Gallery({ product, color }) {
  const [alt, setAlt] = useState(false);
  return (
    <div className="pp-gallery">
      <div className="pp-gallery__main">
        {product.soldOut && <span className="card__badge">Sold out</span>}
        <ProductThumb product={product} color={color} alt={alt} />
      </div>
      <div className="pp-gallery__thumbs">
        {[false, true].map((a) => (
          <button key={String(a)} className={alt === a ? 'is-active' : ''} onClick={() => setAlt(a)} aria-label={a ? 'Second image' : 'First image'}>
            <ProductThumb product={product} color={color} alt={a} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProductPage({ handle: fixedHandle }) {
  const params = useParams();
  const product = getProduct(fixedHandle ?? params.handle);
  const [color, setColor] = useState(product?.colors[0]);
  const [option, setOption] = useState(product?.option?.values[0]);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  useEffect(() => {
    if (!product) return;
    setColor(product.colors[0]);
    setOption(product.option?.values[0]);
    setQty(1);
    document.title = `${product.title} | ${brand.name} Labs`;
  }, [product?.handle]);

  if (!product) return <NotFound />;

  const save = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;
  const addToCart = () => {
    const detail = [color, option].filter(Boolean).join(' / ') || 'One size';
    for (let i = 0; i < qty; i++) {
      add({ id: `${product.handle}-${detail}`, title: product.title, detail, color: colorHex[color], price: product.price, compareAt: product.compareAt });
    }
  };

  const details = [
    { title: 'Description', content: <p>{product.text}</p> },
    {
      title: 'Shipping & Returns',
      content: (
        <div className="details">
          <ul className="details__list">
            {shipping.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <p>{shipping.returns}</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <section className="pp container">
        <nav className="pp__crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> / <Link to={collectionUrl('all')}>Shop ALL</Link> / <span>{product.title}</span>
        </nav>

        <Gallery product={product} color={color} />

        <div className="pp__info">
          <h1 className="pp__title">{product.title}</h1>
          <p className="pp__rating">
            <Stars value={4.8} size={15} /> <strong>4.8</strong> / 5
          </p>

          <p className="pp__price">
            <strong className={save ? 'is-sale' : ''}>{price(product.price)}</strong>
            {save > 0 && (
              <>
                <s>{price(product.compareAt)}</s>
                <em>Save {save}%</em>
              </>
            )}
          </p>

          {product.colors.length > 0 && (
            <div className="pp__option">
              <p>
                Color: <strong>{color}</strong>
              </p>
              <div className="pp__swatches">
                {product.colors.map((c) => (
                  <button key={c} className={c === color ? 'is-active' : ''} style={{ background: colorHex[c] }} onClick={() => setColor(c)} aria-label={c} title={c} />
                ))}
              </div>
            </div>
          )}

          {product.option && (
            <div className="pp__option">
              <p>
                {product.option.name}: <strong>{option}</strong>
              </p>
              <div className="pp__pills">
                {product.option.values.map((v) => (
                  <button key={v} className={v === option ? 'is-active' : ''} onClick={() => setOption(v)}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pp__buy">
            <div className="qty qty--lg">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                <Icon name="minus" size={14} />
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                <Icon name="plus" size={14} />
              </button>
            </div>
            <button className="btn btn--dark atc" onClick={addToCart} disabled={product.soldOut}>
              {product.soldOut ? 'Sold out' : 'Add to cart'}
            </button>
          </div>

          <p className="product__micro">
            <span>
              <Icon name="lock" size={14} /> Secure checkout
            </span>
            <span>
              <Icon name="truck" size={14} /> Free shipping over €55
            </span>
            <span>
              <Icon name="pin" size={14} /> Tracked delivery
            </span>
          </p>

          <div className="guarantee">
            <Icon name="shield" size={22} />
            <p>
              <strong>90-Day Money-Back Guarantee.</strong> Love it or get a full refund — no questions asked.
            </p>
          </div>

          <Accordion items={details} />
        </div>
      </section>
      <RelatedProducts exclude={product.handle} />
    </>
  );
}
