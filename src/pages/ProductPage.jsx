import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Accordion from '../components/ui/Accordion.jsx';
import Icon from '../components/ui/Icon.jsx';
import Stars from '../components/ui/Stars.jsx';
import Gallery from '../components/product/Gallery.jsx';
import SizeFinder from '../components/product/SizeFinder.jsx';
import Hero from '../components/sections/Hero.jsx';
import CameraRolls from '../components/sections/CameraRolls.jsx';
import ProductSection from '../components/product/ProductSection.jsx';
import ProductVideoSection from '../components/product/ProductVideoSection.jsx';
import RelatedProducts from '../components/sections/RelatedProducts.jsx';
import VideoTestimonials from '../components/sections/VideoTestimonials.jsx';
import QualitySection from '../components/sections/QualitySection.jsx';
import Faq from '../components/sections/Faq.jsx';
import CustomerReviews from '../components/sections/CustomerReviews.jsx';
import NotFound from './NotFound.jsx';
import { colorHex, collectionUrl, getProduct, getLocalizedProduct, getColorImages } from '../data/catalog.js';
import { brand } from '../data/site.js';
import { fabric, shipping } from '../data/product.js';
import { useCart } from '../context/CartContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { price } from '../lib/format.js';
import './ProductPage.css';

/**
 * Dedicated high-conversion sales landing for all cuts (Sans Manches, Demi-Manches, Manches Longues)
 */
function DedicatedProductPage({ product }) {
  const { lang, t, dict } = useLanguage();
  const trustItems = dict.home?.trust || [];
  const handle = product?.handle || 'vela-sculpt-sans-manches';
  const localized = getLocalizedProduct(product, lang);
  const isSleeveless = handle === 'vela-sculpt-sans-manches';

  return (
    <div className={`product-page-wrap ${handle}-product`}>
      {/* 1. HERO BANNER & CAMERA ROLLS: ONLY FOR SLEEVELESS (REMOVED FROM SHORT AND LONG AS REQUESTED) */}
      {isSleeveless && (
        <>
          <Hero initialHandle={handle} showModelSelector={false} />
          <CameraRolls />
        </>
      )}

      {!isSleeveless && (
        <div className="container" style={{ paddingTop: 24, paddingBottom: 0 }}>
          <nav className="pp__crumbs" aria-label={lang === 'fr' ? "Fil d'Ariane" : 'Breadcrumb'}>
            <Link to="/">{t('product_page.crumbs_home')}</Link> / <Link to={collectionUrl('all')}>{t('product_page.crumbs_all')}</Link> / <span>{localized.title}</span>
          </nav>
        </div>
      )}

      {/* 2. MAIN PRODUCT CONFIGURATOR & BUNDLE BUILDER (PACK 1, 2, 3 WITH MULTI-COLOR CHOICES) */}
      <ProductSection initialModelHandle={handle} showModelSelector={false} />

      {/* 3. REAL-WORLD PRODUCT VIDEO DEMO */}
      <ProductVideoSection modelHandle={handle} />

      {/* 4. OTHER ERGONOMIC FITS */}
      <RelatedProducts exclude={handle} />

      {/* 5. VIDEO TESTIMONIALS */}
      <VideoTestimonials />

      {/* 6. QUALITY & TECHNOLOGY BREAKDOWN (4 TEXTILE CARDS) */}
      <QualitySection />

      {/* 7. FAQ */}
      <Faq />

      {/* 8. VERIFIED CUSTOMER REVIEWS */}
      <CustomerReviews />

      {/* 9. TRUST BADGES STRIP */}
      <section className="ionix-trust" aria-label={t('home.trust_title')}>
        <div className="ionix-trust__inner">
          <div className="ionix-trust__item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
              <path d="M8.5 12.5l2.5 2.5 5-5" />
            </svg>
            <div className="ionix-trust__t">{trustItems[0]?.title}</div>
            <p className="ionix-trust__d">{trustItems[0]?.desc}</p>
          </div>

          <div className="ionix-trust__item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 2.6-6.4" />
              <path d="M3 4v5h5" />
            </svg>
            <div className="ionix-trust__t">{trustItems[1]?.title}</div>
            <p className="ionix-trust__d">{trustItems[1]?.desc}</p>
          </div>

          <div className="ionix-trust__item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <div className="ionix-trust__t">{trustItems[2]?.title}</div>
            <p className="ionix-trust__d">{trustItems[2]?.desc}</p>
          </div>

          <div className="ionix-trust__item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <div className="ionix-trust__t">{trustItems[3]?.title}</div>
            <p className="ionix-trust__d">{trustItems[3]?.desc}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Standard product page layout (kept for fallback)
 */
function ClassicProductPage({ product }) {
  const { lang, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const paramColor = searchParams.get('color');
  const localized = getLocalizedProduct(product, lang);
  const [color, setColor] = useState(product?.colors?.[0] || 'Noir');
  const [size, setSize] = useState('L');
  const [qty, setQty] = useState(1);
  const [sizeOpen, setSizeOpen] = useState(false);
  const { add } = useCart();

  useEffect(() => {
    if (!product) return;
    const validColor = paramColor && product.colors?.find((c) => c.toLowerCase() === paramColor.toLowerCase());
    setColor(validColor || product.colors?.[0] || 'Noir');
    setSize('L');
    setQty(1);
  }, [product?.handle, paramColor]);

  const currentImages = product ? getColorImages(product, color) : [];
  const save = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;

  const addToCart = () => {
    const detail = `${t('color_names.' + color, color)} / ${size}`;
    for (let i = 0; i < qty; i++) {
      add({
        id: `${product.handle}-${color}-${size}`,
        title: localized.title,
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
      title: lang === 'fr' ? 'Caractéristiques techniques & matière' : 'Technical Specifications & Fabric',
      content: (
        <div className="details">
          <ul className="details__tech-list" style={{ paddingLeft: 18, lineHeight: 1.6, marginBottom: 16 }}>
            {product.technicalDetails?.map((tItem) => (
              <li key={tItem.label} style={{ marginBottom: 6 }}>
                <strong>{tItem.label} :</strong> {tItem.desc}
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
      title: lang === 'fr' ? 'Usage & profil morphologique recommandé' : 'Usage & Target Profile',
      content: (
        <div className="details">
          <p>
            <strong>{lang === 'fr' ? 'Usage optimal :' : 'Optimal usage:'}</strong> {product.usage}
          </p>
          <p style={{ marginTop: 8 }}>
            <strong>{lang === 'fr' ? 'Profil cible :' : 'Target profile:'}</strong> {product.targetAvatar}
          </p>
        </div>
      ),
    },
    {
      title: lang === 'fr' ? 'Expédition & garantie satisfait ou remboursé de 30 jours' : 'Shipping & 30-Day Money-Back Guarantee',
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
        <nav className="pp__crumbs" aria-label={lang === 'fr' ? "Fil d'Ariane" : 'Breadcrumb'}>
          <Link to="/">{t('product_page.crumbs_home')}</Link> / <Link to={collectionUrl('all')}>{t('product_page.crumbs_all')}</Link> / <span>{localized.title}</span>
        </nav>

        <div className="pp__gallery-col">
          <Gallery images={currentImages} title={localized.title} activeColor={color} />
        </div>

        <div className="pp__info">
          {localized.badge && (
            <span className="card__badge" style={{ position: 'static', display: 'inline-block', marginBottom: 8 }}>
              {localized.badge}
            </span>
          )}
          <h1 className="pp__title">{localized.title}</h1>
          <a
            href="#reviews"
            className="pp__rating"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('reviews');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.pushState(null, '', '#reviews');
              }
            }}
            title={lang === 'fr' ? 'Consulter les avis clients vérifiés' : 'Read verified customer reviews'}
          >
            <Stars value={product.rating || 4.9} size={15} /> <strong>{product.rating || 4.9}</strong> / 5 ({product.reviewCount || 67} {t('product_page.reviews_count')})
          </a>

          <p className="pp__tagline" style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 14 }}>
            {localized.tagline}
          </p>

          <p className="pp__price">
            <strong className={save ? 'is-sale' : ''}>{price(product.price)}</strong>
            {save > 0 && (
              <>
                <s>{price(product.compareAt)}</s>
                <em>{t('product_page.save')} {save}%</em>
              </>
            )}
          </p>

          {product.colors && product.colors.length > 0 && (
            <div className="pp__color-picker">
              <div className="pp__color-header">
                <span className="pp__color-label">
                  {t('product_page.color_label')} <strong>{t('color_names.' + color, color)}</strong>
                </span>
              </div>
              <div className="pp__swatches">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`pp__swatch-btn ${c === color ? 'is-active is-selected' : ''}`}
                    onClick={() => setColor(c)}
                    title={t('color_names.' + c, c)}
                  >
                    <span className="pp__swatch-dot" style={{ background: colorHex[c] || '#1a1a1a' }} />
                    <span className="pp__swatch-name">{t('color_names.' + c, c)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="pp__option">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>
                  {t('product_page.size_label')} <strong>{size}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setSizeOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--gold-dark)',
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  {t('product_page.size_guide')}
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
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label={t('product_page.decrease_qty')}>
                <Icon name="minus" size={14} />
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label={t('product_page.increase_qty')}>
                <Icon name="plus" size={14} />
              </button>
            </div>
            <button className="btn btn--dark atc" onClick={addToCart}>
              {t('product_page.add_to_cart')}
            </button>
          </div>

          <p className="product__micro">
            <span>
              <Icon name="lock" size={14} /> {t('product_page.secure_payment')}
            </span>
            <span>
              <Icon name="truck" size={14} /> {t('product_page.fast_shipping')}
            </span>
            <span>
              <Icon name="shield" size={14} /> {t('product_page.guarantee_title')}
            </span>
          </p>

          <div className="guarantee">
            <Icon name="shield" size={24} />
            <p>
              <strong>{t('product_page.guarantee_box_title')}</strong> {t('product_page.guarantee_box_desc')}
            </p>
          </div>

          <Accordion items={details} />
        </div>
      </section>

      <SizeFinder open={sizeOpen} onClose={() => setSizeOpen(false)} onApply={(s) => { setSize(s); setSizeOpen(false); }} />
      <RelatedProducts exclude={product.handle} />
      <CustomerReviews />
    </>
  );
}

export default function ProductPage({ handle: fixedHandle }) {
  const params = useParams();
  const { lang } = useLanguage();
  const handle = fixedHandle ?? params.handle ?? 'vela-sculpt-sans-manches';
  const rawProduct = getProduct(handle);
  const product = getLocalizedProduct(rawProduct, lang);

  useEffect(() => {
    if (!product) return;
    document.title = `${product.title} | ${brand.fullName}`;
  }, [product?.handle, product?.title]);

  if (!rawProduct) return <NotFound />;

  // All cuts use the dedicated layout: Sans manches retains Hero & CameraRolls; Short and Long start directly with ProductSection
  return <DedicatedProductPage product={rawProduct} />;
}
