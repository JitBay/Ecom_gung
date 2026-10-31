import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Gallery from './Gallery.jsx';
import BundlePicker from './BundlePicker.jsx';
import ProductDetails from './ProductDetails.jsx';
import SizeFinder from './SizeFinder.jsx';
import StickyCart from './StickyCart.jsx';
import ShopifyBuyButton from '../shopify/ShopifyBuyButton.jsx';
import ShopifyPaymentBadges from '../shopify/ShopifyPaymentBadges.jsx';
import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import { badges, badgesEn, benefits, benefitsEn, colors, discoveryCategories, stats, statsEn } from '../../data/product.js';
import { colorHex, getColorImages, getLocalizedProduct, products } from '../../data/catalog.js';
import { useCart } from '../../context/CartContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useScrolledPast } from '../../lib/hooks.js';
import './ProductSection.css';

export default function ProductSection({ initialModelHandle, onModelChange, showModelSelector = true, isDiscoveryOffer = false }) {
  const { lang, t } = useLanguage();
  const isDiscovery = isDiscoveryOffer || initialModelHandle === 'pack-decouverte';
  const cutsList = useMemo(() => products.slice(0, 3), []);
  const [selectedHandle, setSelectedHandle] = useState(
    initialModelHandle && initialModelHandle !== 'pack-decouverte'
      ? initialModelHandle
      : cutsList[0].handle
  );

  useEffect(() => {
    if (initialModelHandle) {
      setSelectedHandle(initialModelHandle);
    }
  }, [initialModelHandle]);

  const currentModel = products.find((p) => p.handle === selectedHandle) || products[0];
  const localizedModel = getLocalizedProduct(currentModel, lang);
  const [selectedColor, setSelectedColor] = useState(currentModel.colors[0] || 'Noir');

  const availableColors = useMemo(() => {
    return currentModel.colors.map((c) => {
      const found = colors.find(
        (col) => col.label.toLowerCase() === c.toLowerCase() || col.id === c.toLowerCase().replace(/\s+/g, '-')
      );
      return found || { id: c.toLowerCase().replace(/\s+/g, '-'), label: c, hex: colorHex[c] || '#1a1a1a' };
    });
  }, [currentModel.colors]);



  const modelBundles = useMemo(() => {
    if (isDiscovery) {
      return [
        {
          id: 1,
          qty: 3,
          isDiscoveryPack: true,
          title: lang === 'fr' ? 'Pack Découverte — 3 Coupes' : 'Discovery Pack — 3 Fits',
          subtitle:
            lang === 'fr'
              ? '1 Débardeur + 1 Demi-manches + 1 Manches longues inclus'
              : '1 Tank Top + 1 Short Sleeves + 1 Long Sleeves included',
          price: 79.85,
          compareAt: 149.85,
          badge: lang === 'fr' ? 'Offre Spéciale — 3 Coupes' : 'Special Offer — 3 Fits',
          freeShipping: true,
          highlight: true,
        },
      ];
    }

    const p1 = currentModel.price;
    const c1 = currentModel.compareAt || Math.round(p1 * 1.5);
    let p2, p3, c2, c3;
    if (currentModel.handle === 'vela-sculpt-sans-manches') {
      p2 = 59.90;
      c2 = 149.85;
      p3 = 79.85;
      c3 = 149.85;
    } else if (currentModel.handle === 'vela-sculpt-demi-manches') {
      p2 = 69.90;
      c2 = 179.85;
      p3 = 89.85;
      c3 = 179.85;
    } else if (currentModel.handle === 'vela-sculpt-manches-longues') {
      p2 = 79.90;
      c2 = 194.85;
      p3 = 99.85;
      c3 = 194.85;
    } else {
      p2 = Math.round(p1 * 2 * 0.86 * 100) / 100;
      c2 = Math.round(c1 * 3 * 100) / 100;
      p3 = Math.round(p1 * 3 * 0.76 * 100) / 100;
      c3 = Math.round(c1 * 3 * 100) / 100;
    }

    return [
      {
        id: 1,
        qty: 1,
        title: lang === 'fr' ? 'Pack découverte — 1 t-shirt' : 'Starter Pack — 1 Shirt',
        subtitle: lang === 'fr' ? 'Idéal pour tester l’effet gainant et le confort au quotidien.' : 'Ideal for testing slimming support and all-day comfort.',
        price: p1,
        compareAt: c1,
        badge: lang === 'fr' ? 'Offre découverte' : 'Intro Offer',
        freeShipping: false,
      },
      {
        id: 2,
        qty: 3,
        isTwoPlusOne: true,
        title: lang === 'fr' ? 'Pack 2 T-Shirts + 1 Offert' : 'Pack 2 Shirts + 1 Free',
        subtitle: lang === 'fr' ? '2 t-shirts achetés + le 3ème t-shirt 100% offert.' : 'Buy 2 shirts + get the 3rd shirt 100% free.',
        price: p2,
        compareAt: c2,
        badge: lang === 'fr' ? 'Le Plus Choisi — 1 T-Shirt OFFERT' : 'Most Popular — 1 FREE Shirt',
        freeShipping: true,
        highlight: true,
      },
      {
        id: 3,
        qty: 3,
        title: lang === 'fr' ? 'Pack Semaine — 3 T-Shirts' : 'Week Pack — 3 Shirts',
        subtitle: lang === 'fr' ? 'La tranquillité toute la semaine : 1 t-shirt propre toujours prêt.' : 'Full peace of mind: a clean shirt always ready.',
        badge: lang === 'fr' ? `Meilleure Valeur — Économisez ${Math.round(c3 - p3)} €` : `Best Value — Save €${Math.round(c3 - p3)}`,
        price: p3,
        compareAt: c3,
        freeShipping: true,
        gift: lang === 'fr' ? 'Guide Posture & Maintien Offert' : 'Free Posture & Fit Guide',
      },
    ];
  }, [currentModel.handle, currentModel.price, currentModel.compareAt, lang]);

  const [bundleId, setBundleId] = useState(initialModelHandle === 'pack-decouverte' ? 1 : 2);
  const bundle = modelBundles.find((b) => b.id === bundleId) || modelBundles[0];

  const [variants, setVariants] = useState(() =>
    initialModelHandle === 'pack-decouverte'
      ? discoveryCategories.map((c) => ({
          color: c.defaultColor || 'noir',
          size: 'L',
        }))
      : Array.from({ length: 4 }, (_, i) => ({
          color: availableColors[i % availableColors.length]?.id || 'noir',
          size: 'L',
        }))
  );

  const [sizeOpen, setSizeOpen] = useState(false);
  const [atcRef, pastAtc] = useScrolledPast();
  const { add } = useCart();

  const [searchParams] = useSearchParams();
  const queryColor = searchParams.get('color');

  // Synchronize color and variants when switching model or when queryColor changes
  useEffect(() => {
    if (isDiscovery) {
      setBundleId(1);
      setVariants(
        discoveryCategories.map((c) => ({
          color: c.defaultColor || 'noir',
          size: 'L',
        }))
      );
      return;
    }
    const validQuery = queryColor && currentModel.colors.find(
      (c) => c.toLowerCase() === queryColor.toLowerCase()
    );
    // Preserve currently selected color if available in the newly switched model
    const currentValid = selectedColor && currentModel.colors.find(
      (c) => c.toLowerCase() === selectedColor.toLowerCase()
    );
    const colorToUse = validQuery || currentValid || currentModel.colors[0] || 'Noir';
    setSelectedColor(colorToUse);
    const matchingAvail = availableColors.find(
      (c) => c.label.toLowerCase() === colorToUse.toLowerCase()
    );
    const colorId = matchingAvail?.id || 'noir';
    setVariants((vs) =>
      vs.map((v) => ({
        ...v,
        color: colorId,
      }))
    );
  }, [currentModel.handle, availableColors, queryColor, isDiscovery]);

  const currentImages = getColorImages(currentModel, selectedColor);
  const chosen = variants.slice(0, bundle.qty);

  const updateVariant = (i, patch) => {
    setVariants((vs) => vs.map((v, j) => (j === i ? { ...v, ...patch } : v)));
    if (isDiscovery && patch.color) {
      const cutIdx = cutsList.findIndex((p) => p.handle === selectedHandle);
      if (cutIdx === i) {
        const cat = discoveryCategories[i];
        const cObj = cat?.colors.find((c) => c.id === patch.color);
        if (cObj) {
          setSelectedColor(cObj.label);
        }
      }
    }
  };

  const applySize = (size) => {
    setVariants((vs) => vs.map((v) => ({ ...v, size })));
    setSizeOpen(false);
  };

  const handleSelectColor = (colorName) => {
    setSelectedColor(colorName);
    const matched = availableColors.find(
      (c) => c.label.toLowerCase() === colorName.toLowerCase() || c.id === colorName.toLowerCase()
    );
    const colorId = matched?.id || colorName.toLowerCase().replace(/\s+/g, '-');
    if (isDiscovery) {
      const cutIdx = cutsList.findIndex((p) => p.handle === selectedHandle);
      if (cutIdx !== -1) {
        setVariants((vs) =>
          vs.map((v, i) => (i === cutIdx ? { ...v, color: colorId } : v))
        );
      }
    } else if (matched) {
      setVariants((vs) => vs.map((v) => ({ ...v, color: matched.id })));
    }
  };

  const handleSelectModel = (handle) => {
    setSelectedHandle(handle);
    if (isDiscovery) {
      const cutIdx = cutsList.findIndex((p) => p.handle === handle);
      if (cutIdx !== -1 && variants[cutIdx]) {
        const cat = discoveryCategories[cutIdx];
        const currentColorId = variants[cutIdx].color;
        const cObj = cat?.colors.find((c) => c.id === currentColorId);
        if (cObj) {
          setSelectedColor(cObj.label);
        }
      }
    }
    if (onModelChange) {
      onModelChange(handle);
    }
  };

  const addToCart = () => {
    let detail;
    if (bundle.isDiscoveryPack) {
      detail = chosen
        .map((v, i) => {
          const cat = discoveryCategories[i] || discoveryCategories[0];
          const c = cat.colors.find((col) => col.id === v.color) || cat.colors[0];
          const colorLabel = t('color_names.' + c.label, c.label);
          const catName = lang === 'fr' ? cat.titleFr : cat.titleEn;
          return `${catName} : ${colorLabel} / ${v.size}`;
        })
        .join(' · ');
    } else {
      detail = chosen
        .map((v) => {
          const c = availableColors.find((col) => col.id === v.color) || availableColors[0];
          const colorLabel = t('color_names.' + c.label, c.label);
          return `${colorLabel} / ${v.size}`;
        })
        .join(', ');
    }

    const itemTitle = bundle.isDiscoveryPack
      ? (lang === 'fr' ? 'Pack Découverte — 3 Coupes' : 'Discovery Pack — 3 Fits')
      : `${localizedModel.title} — ${bundle.title}`;

    const itemImage = bundle.isDiscoveryPack
      ? '/images/products/image-decouverte.png'
      : (currentImages[0] || currentModel.images[0]);

    add({
      id: `${currentModel.handle}-${bundle.id}-${detail}`,
      title: itemTitle,
      detail,
      image: itemImage,
      color: colorHex[selectedColor] || '#1a1a1a',
      price: bundle.price,
      compareAt: bundle.compareAt,
      freeShipping: Boolean(bundle.freeShipping),
    });
  };

  const currentLineItem = useMemo(() => {
    let detail;
    if (bundle.isDiscoveryPack) {
      detail = chosen
        .map((v, i) => {
          const cat = discoveryCategories[i] || discoveryCategories[0];
          const c = cat.colors.find((col) => col.id === v.color) || cat.colors[0];
          const colorLabel = t('color_names.' + c.label, c.label);
          const catName = lang === 'fr' ? cat.titleFr : cat.titleEn;
          return `${catName} : ${colorLabel} / ${v.size}`;
        })
        .join(' · ');
    } else {
      detail = chosen
        .map((v) => {
          const c = availableColors.find((col) => col.id === v.color) || availableColors[0];
          const colorLabel = t('color_names.' + c.label, c.label);
          return `${colorLabel} / ${v.size}`;
        })
        .join(', ');
    }

    const itemTitle = bundle.isDiscoveryPack
      ? (lang === 'fr' ? 'Pack Découverte — 3 Coupes' : 'Discovery Pack — 3 Fits')
      : `${localizedModel.title} — ${bundle.title}`;

    const itemImage = bundle.isDiscoveryPack
      ? '/images/products/image-decouverte.png'
      : (currentImages[0] || currentModel.images[0]);

    return {
      id: `${currentModel.handle}-${bundle.id}`,
      title: itemTitle,
      detail,
      image: itemImage,
      price: bundle.price,
      compareAt: bundle.compareAt,
      qty: 1,
      freeShipping: Boolean(bundle.freeShipping),
    };
  }, [chosen, currentModel.handle, bundle, localizedModel.title, currentImages, availableColors, t, lang]);

  const shipDate = new Date(Date.now() + 2 * 864e5).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    month: 'long',
    day: 'numeric',
  });

  const benefitsList = lang === 'fr' ? benefits : (benefitsEn || benefits);
  const statsList = lang === 'fr' ? stats : (statsEn || stats);
  const badgesList = lang === 'fr' ? badges : (badgesEn || badges);

  return (
    <section className="product container" id="product">
      <div className="product__media">
        <Gallery
          images={currentImages}
          title={localizedModel.title}
          activeColor={selectedColor}
          videoHref={currentModel.handle === 'vela-sculpt-sans-manches' ? '#video-demo' : undefined}
        />
      </div>

      <div className="product__info">
        {showModelSelector && (
          <div className="product__model-selector">
            <label className="product__model-label">
              {lang === 'fr' ? '1. Choisissez votre coupe ergonomique :' : '1. Choose your ergonomic fit:'}
            </label>
            <div className="product__model-buttons">
              {cutsList.map((p) => {
                const locP = getLocalizedProduct(p, lang);
                return (
                  <button
                    key={p.handle}
                    className={`product__model-btn ${p.handle === selectedHandle ? 'is-active' : ''}`}
                    onClick={() => handleSelectModel(p.handle)}
                  >
                    <span>{locP.shortTitle}</span>
                    <small>{locP.badge}</small>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <h1 className="product__title">{localizedModel.title}</h1>
        <a
          href="#reviews"
          className="product__rating"
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
          <Stars value={5} size={16} /> <strong>4.9</strong> <span>/ 5 ({lang === 'fr' ? '67 avis vérifiés' : '67 verified reviews'})</span>
        </a>

        <p className="product__tagline">{localizedModel.tagline}</p>

        {/* Color swatches */}
        <div className="product__color-picker">
          <div className="product__color-header">
            <span className="product__color-label">
              {showModelSelector
                ? (lang === 'fr' ? '2. Couleur sélectionnée :' : '2. Selected color:')
                : (lang === 'fr' ? 'Couleur sélectionnée :' : 'Selected color:')}{' '}
              <strong>{t('color_names.' + selectedColor, selectedColor)}</strong>
            </span>
          </div>

          <div className="product__color-swatches">
            {currentModel.colors.map((c) => (
              <button
                key={c}
                type="button"
                className={`product__color-swatch-btn ${c === selectedColor ? 'is-active is-selected' : ''}`}
                onClick={() => handleSelectColor(c)}
                title={t('color_names.' + c, c)}
              >
                <span className="product__color-dot" style={{ background: colorHex[c] || '#1a1a1a' }} />
                <span className="product__color-name">{t('color_names.' + c, c)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Benefits list */}
        <ul className="benefits">
          {benefitsList.map((b) => (
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

        {/* Stats */}
        <div className="stats">
          {statsList.map((s) => (
            <div key={s.label}>
              <b>
                {s.value}
                <small>{s.unit}</small>
              </b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <p className="product__micro">
          <span>
            <Icon name="lock" size={14} /> {lang === 'fr' ? 'Paiement 100% sécurisé' : '100% Secure Payment'}
          </span>
          <span>
            <Icon name="truck" size={14} /> {lang === 'fr' ? 'Livraison suivie offerte dès 55 €' : 'Free tracked shipping over €55'}
          </span>
          <span>
            <Icon name="shield" size={14} /> {lang === 'fr' ? 'Garantie satisfait ou remboursé 30j' : '30-Day Money-Back Guarantee'}
          </span>
        </p>

        <BundlePicker
          selectedId={bundleId}
          onSelect={setBundleId}
          variants={chosen}
          onVariantChange={updateVariant}
          productImage={currentImages[0]}
          availableColors={availableColors}
          colorImages={currentModel.colorImages}
          items={modelBundles}
        />

        <button className="size-btn" onClick={() => setSizeOpen(true)}>
          <Icon name="ruler" size={18} /> {lang === 'fr' ? 'Guide interactif : Trouver ma taille' : 'Interactive Size Guide: Find my size'}
        </button>

        <div className="product__actions">
          <button ref={atcRef} className="btn btn--dark btn--block atc" onClick={addToCart}>
            {lang === 'fr'
              ? `Ajouter au panier — ${bundle.title}`
              : `Add to Cart — ${bundle.title}`}
          </button>

          <ShopifyBuyButton
            lineItem={currentLineItem}
            label={
              lang === 'fr'
                ? `⚡ Acheter maintenant — Paiement Express`
                : `⚡ Buy Now — Express Checkout`
            }
          />

          <ShopifyPaymentBadges />
        </div>

        <div className="product__ship">
          <span>
            <i className="live-dot" /> {lang === 'fr' ? 'Expédié avant le ' : 'Ships before '}<strong>{shipDate}</strong>
          </span>
          <span>
            <i className="flag-fr" /> {lang === 'fr' ? 'Livraison suivie en France & Europe' : 'Tracked shipping across Europe'}
          </span>
        </div>
        <p className="product__trend">
          <Icon name="trend" size={16} /> {lang === 'fr' ? 'Plus de 2 450 t-shirts commandés cette semaine' : 'Over 2,450 shirts ordered this week'}
        </p>

        <ul className="product__badges">
          {badgesList.map((b) => (
            <li key={b.label}>
              <Icon name={b.icon} size={22} />
              {b.label}
            </li>
          ))}
        </ul>

        <div className="guarantee">
          <Icon name="shield" size={24} />
          <p>
            <strong>{lang === 'fr' ? 'Garantie satisfait ou remboursé de 30 jours.' : '30-Day Money-Back Guarantee.'}</strong>{' '}
            {lang === 'fr'
              ? 'Portez votre vêtement Vela Sculpt™ au travail ou en sortie. S’il ne vous apporte pas un confort absolu et un lissage impeccable, demandez un remboursement intégral sans justification.'
              : 'Wear your Vela Sculpt™ wear to work or casually. If it does not provide total comfort and confidence, ask for a full refund.'}
          </p>
        </div>

        <ProductDetails model={currentModel} />
      </div>

      <SizeFinder open={sizeOpen} onClose={() => setSizeOpen(false)} onApply={applySize} />
      <StickyCart
        visible={pastAtc}
        bundle={bundle}
        onAdd={addToCart}
        productImage={bundle.isDiscoveryPack ? '/images/products/image-decouverte.png' : currentImages[0]}
        title={
          bundle.isDiscoveryPack
            ? (lang === 'fr' ? 'Pack Découverte — 3 Coupes' : 'Discovery Pack — 3 Fits')
            : `${localizedModel.title} (${t('color_names.' + selectedColor, selectedColor)})`
        }
      />
    </section>
  );
}
