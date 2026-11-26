import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Gallery from './Gallery.jsx';
import BundlePicker from './BundlePicker.jsx';
import BlackFridayDeal from './BlackFridayDeal.jsx';
import ProductDetails from './ProductDetails.jsx';
import SizeFinder from './SizeFinder.jsx';
import StickyCart from './StickyCart.jsx';
import ProductCustomerPhotos from './ProductCustomerPhotos.jsx';
import ShopifyBuyButton from '../shopify/ShopifyBuyButton.jsx';
import ShopifyPaymentBadges from '../shopify/ShopifyPaymentBadges.jsx';
import ExpressPaymentButtons from '../shopify/ExpressPaymentButtons.jsx';
import ProductTrustBlock from './ProductTrustBlock.jsx';
import InlineSizeGuide from './InlineSizeGuide.jsx';
import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import { badges, badgesEn, benefits, benefitsEn, colors, discoveryCategories, stats, statsEn } from '../../data/product.js';
import { colorHex, getColorImages, getLocalizedProduct, products } from '../../data/catalog.js';
import { useCart } from '../../context/CartContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useScrolledPast } from '../../lib/hooks.js';
import { trackViewContent } from '../../lib/analytics.js';
import { resolveShopifyVariantId } from '../../lib/shopify.js';
import { SHOPIFY_PRODUCT_GIDS, trackShopifyProductView } from '../../lib/shopifyAnalytics.js';
import { price } from '../../lib/format.js';
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

  useEffect(() => {
    trackViewContent({
      id: currentModel.handle,
      title: localizedModel.title,
      price: currentModel.price,
    });
    // FIX #4 — Wait one frame so <title> is updated before reading document.title
    const raf = requestAnimationFrame(() => {
      trackShopifyProductView({
        handle: isDiscovery ? 'pack-decouverte' : currentModel.handle,
        productGid: SHOPIFY_PRODUCT_GIDS[isDiscovery ? 'pack-decouverte' : currentModel.handle] || SHOPIFY_PRODUCT_GIDS['vela-sculpt-sans-manches'],
        variantGid: resolveShopifyVariantId({
          handle: isDiscovery ? 'pack-decouverte' : currentModel.handle,
          color: selectedColor,
          size: 'M',
        }),
        name: localizedModel.title || currentModel.title,
        variantName: selectedColor || 'Standard',
        price: String(currentModel.price || '19.99'),
        quantity: 1,
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [currentModel.handle, currentModel.price, localizedModel.title, selectedColor, isDiscovery]);

  const availableColors = useMemo(() => {
    return currentModel.colors.map((c) => {
      const found = colors.find(
        (col) => col.label.toLowerCase() === c.toLowerCase() || col.id === c.toLowerCase().replace(/\s+/g, '-')
      );
      return {
        id: found?.id || c.toLowerCase().replace(/\s+/g, '-'),
        label: c,
        hex: found?.hex || colorHex[c] || '#1a1a1a',
      };
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
          price: 44.99,
          compareAt: 74.97,
          badge: lang === 'fr' ? 'Offre Découverte Black Friday' : 'Black Friday Discovery Offer',
          freeShipping: true,
          highlight: true,
        },
      ];
    }

    const p1 = currentModel.price;
    const c1 = currentModel.compareAt || (p1 === 19.99 ? 39.99 : Math.round(p1 * 1.6 * 100) / 100);
    const p2 = Math.round(p1 * 2 * 100) / 100;
    const c2 = Math.round(c1 * 2 * 100) / 100;
    const p3 = p2;
    const c3 = Math.round(p1 * 3 * 100) / 100;
    const perUnit = (p3 / 3).toFixed(2);

    let nounEn = 'Tank';
    let nounPluralEn = 'Tanks';
    let nounFr = 'Débardeur';
    let nounPluralFr = 'Débardeurs';

    if (currentModel.handle === 'vela-sculpt-demi-manches') {
      nounEn = 'Shirt';
      nounPluralEn = 'Shirts';
      nounFr = 'T-shirt';
      nounPluralFr = 'T-shirts';
    } else if (currentModel.handle === 'vela-sculpt-manches-longues') {
      nounEn = 'Long Sleeve';
      nounPluralEn = 'Long Sleeves';
      nounFr = 'Manches Longues';
      nounPluralFr = 'Manches Longues';
    }

    return [
      {
        id: 1,
        qty: 1,
        title: lang === 'fr' ? `1 ${nounFr}` : `1 ${nounEn}`,
        subtitle: lang === 'fr'
          ? 'Idéal pour tester l’effet gainant et le maintien au quotidien.'
          : 'Ideal for testing slimming support and all-day comfort.',
        price: p1,
        compareAt: c1,
        badge: '',
        freeShipping: true,
      },
      {
        id: 3,
        qty: 3,
        isTwoPlusOne: true,
        title: lang === 'fr'
          ? `3 ${nounPluralFr} — 2 Achetés = 1 OFFERT`
          : `3 ${nounPluralEn} — Buy 2, Get 1 FREE`,
        subtitle: lang === 'fr'
          ? `2 achetés + le 3ème OFFERT (${perUnit.replace('.', ',')} € chacun)`
          : `Buy 2, Get 1 FREE ($${perUnit} each)`,
        price: p3,
        compareAt: c3,
        badge: lang === 'fr' ? '🔥 LE PLUS POPULAIRE' : '🔥 MOST POPULAR',
        freeShipping: true,
        highlight: true,
      },
    ];
  }, [currentModel.handle, currentModel.price, currentModel.compareAt, isDiscovery, lang]);

  const [bundleId, setBundleId] = useState(1);
  const bundle = modelBundles.find((b) => b.id === bundleId) || modelBundles[0];

  const [variants, setVariants] = useState(() =>
    initialModelHandle === 'pack-decouverte' || isDiscoveryOffer
      ? discoveryCategories.map((c) => ({
          handle: c.handle,
          color: c.defaultColor || 'noir',
          size: 'L',
        }))
      : Array.from({ length: 4 }, (_, i) => ({
          handle: initialModelHandle || cutsList[0].handle,
          color: availableColors[i % availableColors.length]?.id || 'noir',
          size: 'L',
        }))
  );

  const [sizeOpen, setSizeOpen] = useState(false);
  const [atcRef, pastAtc] = useScrolledPast();
  const [hasScrolled, setHasScrolled] = useState(false);
  const { add, isCheckingOut } = useCart();

  const numericProductId = (SHOPIFY_PRODUCT_GIDS[isDiscovery ? 'pack-decouverte' : currentModel.handle] || '').replace('gid://shopify/Product/', '') || '16228231905614';

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reload Judge.me widgets when switching product
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initJdgm = () => {
        if (window.jdgm) {
          if (typeof window.jdgm.initializeWidgets === 'function') {
            window.jdgm.initializeWidgets();
          }
          if (typeof window.jdgm.reload === 'function') {
            window.jdgm.reload();
          }
        }
      };
      initJdgm();
      const t = setTimeout(initJdgm, 1200);
      return () => clearTimeout(t);
    }
  }, [numericProductId]);

  const [searchParams] = useSearchParams();
  const queryColor = searchParams.get('color');

  // Synchronize color and variants when switching model or when queryColor changes
  useEffect(() => {
    if (isDiscovery) {
      setBundleId(1);
      setVariants((prev) => {
        if (prev && prev.length === discoveryCategories.length && prev[0].handle) {
          return prev;
        }
        return discoveryCategories.map((c) => ({
          handle: c.handle,
          color: c.defaultColor || 'noir',
          size: 'L',
        }));
      });
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
        handle: v.handle || currentModel.handle,
        ...v,
        color: colorId,
      }))
    );
  }, [currentModel.handle, availableColors, queryColor, isDiscovery]);

  const currentImages = getColorImages(currentModel, selectedColor);
  const chosen = variants.slice(0, bundle.qty);

  const updateVariant = (i, patch) => {
    setVariants((vs) =>
      vs.map((v, j) => {
        if (j !== i) return v;
        const next = { ...v, ...patch };
        if (patch.handle && patch.handle !== v.handle) {
          const nextModel = products.find((p) => p.handle === patch.handle) || products[0];
          const hasColor = nextModel.colors.some(
            (c) => c.toLowerCase() === (next.color || '').toLowerCase()
          );
          if (!hasColor) {
            next.color = 'noir';
          }
        }
        return next;
      })
    );

    const activeHandle = patch.handle || variants[i]?.handle || (isDiscovery ? discoveryCategories[i]?.handle : currentModel.handle);
    if (activeHandle) {
      setSelectedHandle(activeHandle);
      const activeModel = products.find((p) => p.handle === activeHandle) || currentModel;
      const targetColor = patch.color || variants[i]?.color || activeModel.colors[0];
      const matched = activeModel.colors.find(
        (c) => c.toLowerCase() === (targetColor || '').toLowerCase()
      ) || activeModel.colors[0];
      setSelectedColor(matched);
    }
  };

  const handleSelectCut = (handle, colorId) => {
    setSelectedHandle(handle);
    const m = products.find((p) => p.handle === handle) || products[0];
    if (m) {
      const c = m.colors.find((col) => col.toLowerCase() === (colorId || '').toLowerCase()) || m.colors[0];
      setSelectedColor(c);
    }
  };

  const applySize = (size) => {
    setVariants((vs) => vs.map((v) => ({ ...v, size })));
    setSizeOpen(false);
  };

  const handleSelectColor = (colorName) => {
    setSelectedColor(colorName);
    // Update ?color= in the browser URL while preserving all existing parameters (UTMs, etc.)
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        params.set('color', colorName);
        const nextSearch = params.toString();
        const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}${window.location.hash}`;
        window.history.replaceState({}, '', nextUrl);
      } catch (err) {
        // ignore
      }
    }
    const matched = availableColors.find(
      (c) => c.label.toLowerCase() === colorName.toLowerCase() || c.id === colorName.toLowerCase()
    );
    const colorId = matched?.id || colorName.toLowerCase().replace(/\s+/g, '-');
    if (isDiscovery) {
      const cutIdx = discoveryCategories.findIndex((p) => p.handle === selectedHandle);
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
    const detail = chosen
      .map((v, i) => {
        const itemCutHandle = v.handle || (bundle.isDiscoveryPack ? discoveryCategories[i]?.handle : currentModel.handle);
        const itemCut = products.find((p) => p.handle === itemCutHandle) || currentModel;
        const locCut = getLocalizedProduct(itemCut, lang);
        const catColors = itemCut.colors;
        const matchedColor = catColors.find((c) => c.toLowerCase() === (v.color || '').toLowerCase()) || catColors[0];
        const colorLabel = t('color_names.' + matchedColor, matchedColor);
        const cutName = locCut.shortTitle || locCut.title;
        return `${cutName} : ${colorLabel} / ${v.size}`;
      })
      .join(' · ');

    const itemTitle = bundle.isDiscoveryPack
      ? (lang === 'fr' ? 'Pack Découverte — 3 Coupes' : 'Discovery Pack — 3 Fits')
      : `${localizedModel.title} — ${bundle.title}`;

    const itemImage = bundle.isDiscoveryPack
      ? '/images/products/image-decouverte.webp'
      : (currentImages[0] || currentModel.images[0]);

    add({
      id: bundle.isDiscoveryPack
        ? `pack-decouverte-${detail}`
        : `${currentModel.handle}-${bundle.id}-${detail}`,
      handle: bundle.isDiscoveryPack ? 'pack-decouverte' : currentModel.handle,
      title: itemTitle,
      detail,
      image: itemImage,
      color: colorHex[selectedColor] || '#1a1a1a',
      price: bundle.price,
      compareAt: bundle.compareAt,
      freeShipping: Boolean(bundle.freeShipping),
      bundleId: bundle.id,
      isTwoPlusOne: Boolean(bundle.isTwoPlusOne),
      isDiscoveryPack: Boolean(bundle.isDiscoveryPack),
      paidQty: bundle.isDiscoveryPack ? 1 : (bundle.isTwoPlusOne ? 2 : (bundle.qty || 1)),
      chosenVariants: chosen.map((v, i) => ({
        handle: v.handle || (bundle.isDiscoveryPack ? (discoveryCategories[i]?.handle || 'pack-decouverte') : currentModel.handle),
        color: v.color,
        size: v.size,
      })),
    }, { replace: true });
  };

  const currentLineItem = useMemo(() => {
    const detail = chosen
      .map((v, i) => {
        const itemCutHandle = v.handle || (bundle.isDiscoveryPack ? discoveryCategories[i]?.handle : currentModel.handle);
        const itemCut = products.find((p) => p.handle === itemCutHandle) || currentModel;
        const locCut = getLocalizedProduct(itemCut, lang);
        const catColors = itemCut.colors;
        const matchedColor = catColors.find((c) => c.toLowerCase() === (v.color || '').toLowerCase()) || catColors[0];
        const colorLabel = t('color_names.' + matchedColor, matchedColor);
        const cutName = locCut.shortTitle || locCut.title;
        return `${cutName} : ${colorLabel} / ${v.size}`;
      })
      .join(' · ');

    const itemTitle = bundle.isDiscoveryPack
      ? (lang === 'fr' ? 'Pack Découverte — 3 Coupes' : 'Discovery Pack — 3 Fits')
      : `${localizedModel.title} — ${bundle.title}`;

    const itemImage = bundle.isDiscoveryPack
      ? '/images/products/image-decouverte.webp'
      : (currentImages[0] || currentModel.images[0]);

    return {
      id: bundle.isDiscoveryPack
        ? `pack-decouverte-${bundle.id}`
        : `${currentModel.handle}-${bundle.id}`,
      handle: bundle.isDiscoveryPack ? 'pack-decouverte' : currentModel.handle,
      title: itemTitle,
      detail,
      image: itemImage,
      price: bundle.price,
      compareAt: bundle.compareAt,
      qty: 1,
      freeShipping: Boolean(bundle.freeShipping),
      bundleId: bundle.id,
      isTwoPlusOne: Boolean(bundle.isTwoPlusOne),
      isDiscoveryPack: Boolean(bundle.isDiscoveryPack),
      paidQty: bundle.isDiscoveryPack ? 1 : (bundle.isTwoPlusOne ? 2 : (bundle.qty || 1)),
      chosenVariants: chosen.map((v, i) => ({
        handle: v.handle || (bundle.isDiscoveryPack ? (discoveryCategories[i]?.handle || 'pack-decouverte') : currentModel.handle),
        color: v.color,
        size: v.size,
      })),
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
        {/* 1. Titre produit accrocheur */}
        <h1 className="product__title">
          {lang === 'fr'
            ? 'Vela Sculpt™ — Paraissez plus mince sous n’importe quel vêtement, instantanément'
            : 'Vela Sculpt™ — Look slimmer under any shirt, instantly'}
        </h1>

        {/* 2. Étoiles & Recommandation clients */}
        <div className="product__rating-box">
          <div
            className="jdgm-widget jdgm-preview-badge"
            data-id={numericProductId}
            data-template="index"
            data-auto-install="false"
          />
          <a
            href="#reviews"
            className="product__rating"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('judgeme-reviews') || document.getElementById('reviews');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.pushState(null, '', '#reviews');
              }
            }}
            title={lang === 'fr' ? 'Consulter les avis clients' : 'Read customer reviews'}
          >
            <span style={{ color: '#d4af37', fontWeight: 700 }}>⭐ 4.9</span>
            <span className="product__rating-label" style={{ marginLeft: 6, fontWeight: 600 }}>
              · {lang === 'fr' ? 'Recommandé par nos clients' : 'Loved by US customers'}
            </span>
          </a>
        </div>

        {/* 3. Bloc Prix barré + sous-texte par unité */}
        <div className="product__top-pricing">
          <div className="product__top-price-row">
            <span className="product__top-price">{price(bundle.price)}</span>
            {bundle.compareAt && (
              <span className="product__top-compare">{price(bundle.compareAt)}</span>
            )}
            <span className="product__top-badge">
              {bundle.isTwoPlusOne
                ? (lang === 'fr' ? '1 OFFERT 🎁' : '1 FREE 🎁')
                : (lang === 'fr' ? 'Offre Spéciale' : 'Special Offer')}
            </span>
          </div>
          <p className="product__top-subtext">
            {bundle.isTwoPlusOne
              ? (lang === 'fr'
                  ? `Seulement ${currentModel.handle === 'vela-sculpt-sans-manches' ? '13,33 €' : currentModel.handle === 'vela-sculpt-demi-manches' ? '16,66 €' : '19,99 €'} par pièce avec l’offre 2 Achetés = 1 Offert`
                  : `Just ${currentModel.handle === 'vela-sculpt-sans-manches' ? '$13.33' : currentModel.handle === 'vela-sculpt-demi-manches' ? '$16.66' : '$19.99'} each with Buy 2, Get 1 Free`)
              : (lang === 'fr'
                  ? `Ou seulement ${currentModel.handle === 'vela-sculpt-sans-manches' ? '13,33 €' : currentModel.handle === 'vela-sculpt-demi-manches' ? '16,66 €' : '19,99 €'} chacun avec l’offre 2 Achetés = 1 Offert`
                  : `Or just ${currentModel.handle === 'vela-sculpt-sans-manches' ? '$13.33' : currentModel.handle === 'vela-sculpt-demi-manches' ? '$16.66' : '$19.99'} each with Buy 2, Get 1 Free`)}
          </p>
        </div>

        {showModelSelector && (
          <div className="product__model-selector">
            <label className="product__model-label">
              {lang === 'fr' ? 'Coupe ergonomique :' : 'Ergonomic fit:'}
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

        {/* 4. Sélecteur couleur (uniquement pour les produits individuels, car le Pack Découverte a ses propres sélecteurs par article) */}
        {!isDiscovery && (
          <div className="product__color-picker">
            <div className="product__color-header">
              <span className="product__color-label">
                {lang === 'fr' ? 'Couleur sélectionnée :' : 'Selected color:'}{' '}
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
        )}

        {/* Guide des tailles bien visible juste au-dessus du sélecteur de taille */}
        <div className="product__size-guide-row">
          <div className="product__size-guide-phrase">
            <span>💡</span>
            <span>{lang === 'fr' ? 'Choisissez votre taille habituelle de T-shirt.' : 'Pick your usual T-shirt size.'}</span>
          </div>
          <button
            type="button"
            className="product__size-guide-btn"
            onClick={() => setSizeOpen(true)}
          >
            <span>📏</span>
            <span>{lang === 'fr' ? 'Guide des tailles — quelle taille choisir ?' : 'Size guide — which size should I get?'}</span>
          </button>
        </div>

        {/* BundlePicker (sélection des tailles et offres) */}
        <BundlePicker
          selectedId={bundleId}
          onSelect={setBundleId}
          variants={chosen}
          onVariantChange={updateVariant}
          onSelectCut={handleSelectCut}
          selectedHandle={selectedHandle}
          productImage={currentImages[0]}
          availableColors={availableColors}
          colorImages={currentModel.colorImages}
          model={currentModel}
          items={modelBundles}
        />

        {/* 5. Bouton d'achat, rassurance taille/échange, garantie, avis photos & réassurance */}
        <div className="product__actions">
          <button
            ref={atcRef}
            className={`btn btn--dark btn--block atc ${isCheckingOut ? 'is-loading' : ''}`}
            onClick={addToCart}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? (
              lang === 'fr' ? 'Chargement en cours...' : 'Processing...'
            ) : lang === 'fr' ? (
              `Ajouter au panier — ${price(bundle.price)}`
            ) : (
              `Add to cart — ${price(bundle.price)}`
            )}
          </button>

          {/* Rassurance Taille + Échange (2 lignes sous le bouton Add to cart) */}
          <div className="product__atc-reassurance">
            <div className="product__atc-reassurance-item">
              <span className="product__atc-reassurance-icon" aria-hidden="true">📏</span>
              <span className="product__atc-reassurance-text">
                {lang === 'fr'
                  ? 'Un doute sur votre taille ? Mauvaise taille = Échange 100% GRATUIT.'
                  : 'Not sure about your size? Wrong size = FREE exchange.'}
              </span>
            </div>
            <div className="product__atc-reassurance-item">
              <span className="product__atc-reassurance-icon" aria-hidden="true">🚚</span>
              <span className="product__atc-reassurance-text">
                {lang === 'fr'
                  ? 'Livraison suivie gratuite · Zéro frais cachés'
                  : 'Free tracked shipping · No hidden fees'}
              </span>
            </div>
          </div>

          <ExpressPaymentButtons lineItem={currentLineItem} />

          {/* 8. Bloc garantie juste sous le bouton d'achat */}
          <div className="product__guarantee-highlight">
            <span className="product__guarantee-icon">🛡️</span>
            <p>
              {lang === 'fr'
                ? 'Essayez-le pendant 30 jours. Pas convaincu ? Remboursement intégral sans poser de question.'
                : 'Try it for 30 days. Don’t love it? Full refund — no questions asked.'}
            </p>
          </div>

          {/* 9. Photos de vrais clients juste sous le bouton */}
          <ProductCustomerPhotos
            onScrollToReviews={() => {
              const el = document.getElementById('reviews');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          />

          <ProductTrustBlock />

          <ShopifyPaymentBadges showSecurityNote={false} />
        </div>

        {/* Éléments détaillés situés sous le bloc principal d'achat */}
        <InlineSizeGuide onOpenCalculator={() => setSizeOpen(true)} />

        <BlackFridayDeal model={currentModel} isDiscovery={isDiscovery} />

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
            <Icon name="truck" size={14} /> {lang === 'fr' ? 'Livraison 100% gratuite · Suivi complet en direct' : '🚚 Free tracked shipping · 🎄 Order by Dec 10 for Christmas delivery'}
          </span>
          <span>
            <Icon name="shield" size={14} /> {lang === 'fr' ? 'Garantie satisfait ou remboursé 30j' : '30-Day Money-Back Guarantee'}
          </span>
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

        {/* Widget officiel d'avis Judge.me */}
        <div className="product__judgeme-wrapper" id="judgeme-reviews" style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
          <div
            id="judgeme_product_reviews"
            className="jdgm-widget jdgm-review-widget"
            data-id={numericProductId}
            data-auto-install="false"
          />
        </div>

        <ProductDetails model={currentModel} />
      </div>

      <SizeFinder open={sizeOpen} onClose={() => setSizeOpen(false)} onApply={applySize} />
      <StickyCart
        visible={hasScrolled || pastAtc}
        bundle={bundle}
        onAdd={addToCart}
        productImage={bundle.isDiscoveryPack ? '/images/products/image-decouverte.webp' : currentImages[0]}
        title={
          bundle.isDiscoveryPack
            ? (lang === 'fr' ? 'Pack Découverte — 3 Coupes' : 'Discovery Pack — 3 Fits')
            : `${localizedModel.title} (${t('color_names.' + selectedColor, selectedColor)})`
        }
      />
    </section>
  );
}
