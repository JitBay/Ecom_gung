import { useEffect, useRef } from 'react';
import {
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
  AnalyticsPageType,
  useShopifyCookies,
} from '@shopify/hydrogen-react';

export const SHOPIFY_SHOP_ID = 'gid://shopify/Shop/109890175310';
export const SHOPIFY_STORE_DOMAIN = 'msxkej-wu.myshopify.com';
export const SHOPIFY_CHECKOUT_DOMAIN = 'checkout.zvar-shop.com';
export const SHOPIFY_STOREFRONT_TOKEN =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SHOPIFY_STOREFRONT_TOKEN) ||
  '06705ec8a9335df76b9e68a23ee31bf5';
export const SHOPIFY_STOREFRONT_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SHOPIFY_STOREFRONT_ID) || '44204366';
export const SHOPIFY_CURRENCY = 'USD';
export const SHOPIFY_COOKIE_DOMAIN =
  typeof window !== 'undefined' && window.location.hostname.includes('zvar-shop.com')
    ? 'zvar-shop.com'
    : undefined;

export const SHOPIFY_PRODUCT_GIDS = {
  'vela-sculpt-sans-manches': 'gid://shopify/Product/16228231905614',
  'vela-sculpt-demi-manches': 'gid://shopify/Product/16228233380174',
  'vela-sculpt-manches-longues': 'gid://shopify/Product/16228245340494',
  'pack-decouverte': 'gid://shopify/Product/16228308484430',
};

// ──────────────────────────────────────────────────────────────
// FIX #2 — Capture the initial referrer at module load time.
// In an SPA, document.referrer is only correct on the very first page load.
// After internal navigation React Router updates the URL but document.referrer
// stays the same (or becomes empty).  We capture it once here.
// ──────────────────────────────────────────────────────────────
const _initialReferrer =
  typeof document !== 'undefined' ? document.referrer : '';

// ──────────────────────────────────────────────────────────────
// FIX #5 — Dedup guard: prevent sending the same page view twice
//   within a 500ms window (React StrictMode double-mount or
//   two components both firing for the same page).
// ──────────────────────────────────────────────────────────────
let _lastPageViewKey = '';
let _lastPageViewTime = 0;
const DEDUP_WINDOW_MS = 500;

function isDuplicatePageView(key) {
  const now = Date.now();
  if (key === _lastPageViewKey && now - _lastPageViewTime < DEDUP_WINDOW_MS) {
    return true;
  }
  _lastPageViewKey = key;
  _lastPageViewTime = now;
  return false;
}

/**
 * Loads and initializes the official Shopify Customer Privacy API.
 * For US visitors (no banner required), tracking consent is granted by default.
 */
export function useCustomerPrivacy({
  checkoutDomain = SHOPIFY_CHECKOUT_DOMAIN,
  storefrontAccessToken = SHOPIFY_STOREFRONT_TOKEN,
  onVisitorConsentCollected,
  onReady,
} = {}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const grantConsent = () => {
      try {
        const privacy = window.Shopify?.customerPrivacy;
        if (privacy && typeof privacy.setTrackingConsent === 'function') {
          privacy.setTrackingConsent(
            {
              analytics: true,
              marketing: true,
              preferences: true,
              sale_of_data: true,
              headlessStorefront: true,
              rootDomain: SHOPIFY_COOKIE_DOMAIN || 'zvar-shop.com',
            },
            (err) => {
              if (err) console.warn('[Shopify Customer Privacy] Consent error:', err);
            }
          );
          if (onReady) onReady();
        }
      } catch (err) {
        console.warn('[Shopify Customer Privacy] Init error:', err);
      }
    };

    if (onVisitorConsentCollected && typeof document !== 'undefined') {
      document.addEventListener('visitorConsentCollected', onVisitorConsentCollected);
    }

    if (window.Shopify?.customerPrivacy?.setTrackingConsent) {
      grantConsent();
    } else {
      let script = document.querySelector('script[src*="consent-tracking-api.js"]');
      if (!script) {
        script = document.createElement('script');
        script.src = 'https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.1/consent-tracking-api.js';
        script.async = true;
        document.head.appendChild(script);
      }
      const handleLoad = () => grantConsent();
      script.addEventListener('load', handleLoad);
      return () => {
        script.removeEventListener('load', handleLoad);
        if (onVisitorConsentCollected && typeof document !== 'undefined') {
          document.removeEventListener('visitorConsentCollected', onVisitorConsentCollected);
        }
      };
    }

    return () => {
      if (onVisitorConsentCollected && typeof document !== 'undefined') {
        document.removeEventListener('visitorConsentCollected', onVisitorConsentCollected);
      }
    };
  }, [checkoutDomain, storefrontAccessToken]);
}

/**
 * Root cookies hook:
 * 1. Loads Customer Privacy API and grants consent.
 * 2. Uses official useShopifyCookies with fetchTrackingValues enabled to synchronize backend tokens.
 */
export function useZvarShopifyCookies(hasUserConsent = true) {
  useCustomerPrivacy({
    checkoutDomain: SHOPIFY_CHECKOUT_DOMAIN,
    storefrontAccessToken: SHOPIFY_STOREFRONT_TOKEN,
  });

  useShopifyCookies({
    hasUserConsent,
    domain: SHOPIFY_COOKIE_DOMAIN,
    checkoutDomain: SHOPIFY_CHECKOUT_DOMAIN,
    storefrontAccessToken: SHOPIFY_STOREFRONT_TOKEN,
    fetchTrackingValues: true,
  });
}

function getConsentValues() {
  const privacy = typeof window !== 'undefined' ? window.Shopify?.customerPrivacy : null;
  const isAnalyticsAllowed = privacy?.analyticsProcessingAllowed
    ? privacy.analyticsProcessingAllowed()
    : true;
  const isMarketingAllowed = privacy?.marketingAllowed
    ? privacy.marketingAllowed()
    : true;
  const isSaleOfDataAllowed = privacy?.saleOfDataAllowed
    ? privacy.saleOfDataAllowed()
    : true;

  return {
    hasUserConsent: isAnalyticsAllowed,
    analyticsAllowed: isAnalyticsAllowed,
    marketingAllowed: isMarketingAllowed,
    saleOfDataAllowed: isSaleOfDataAllowed,
  };
}

// ──────────────────────────────────────────────────────────────
// FIX #1 & #2 — Build the base payload.
//   getClientBrowserParameters() reads location.search, document.referrer, etc.
//   We override referrer with the captured _initialReferrer when
//   document.referrer is empty (SPA internal navigation).
//   We also force url/search/path from window.location at call time
//   so that the values are always up to date.
// FIX #4 — Read document.title at call time (via getClientBrowserParameters).
//   The caller is responsible for calling this AFTER the title has updated
//   (e.g. via requestAnimationFrame or setTimeout).
// ──────────────────────────────────────────────────────────────
function base(hasUserConsent = true) {
  const consent = getConsentValues();
  const browser = getClientBrowserParameters();

  // Force correct browser values from window.location
  // (getClientBrowserParameters reads them, but let's be explicit)
  if (typeof window !== 'undefined') {
    browser.url = window.location.href;
    browser.path = window.location.pathname;
    browser.search = window.location.search;
    browser.title = document.title;
    // Use initial referrer if document.referrer is empty
    // (happens after SPA navigation — initial referrer is the external source)
    if (!browser.referrer && _initialReferrer) {
      browser.referrer = _initialReferrer;
    }
  }

  return {
    shopId: SHOPIFY_SHOP_ID,
    currency: SHOPIFY_CURRENCY,
    hasUserConsent: consent.hasUserConsent && hasUserConsent,
    analyticsAllowed: consent.analyticsAllowed && hasUserConsent,
    marketingAllowed: consent.marketingAllowed && hasUserConsent,
    saleOfDataAllowed: consent.saleOfDataAllowed && hasUserConsent,
    storefrontId: SHOPIFY_STOREFRONT_ID || '0',
    hydrogenSubchannelId: SHOPIFY_STOREFRONT_ID || '0',
    acceptedLanguage:
      typeof navigator !== 'undefined' && navigator.language?.startsWith('fr') ? 'FR' : 'EN',
    ...browser,
  };
}

/**
 * Page view: call on every route change for NON-PRODUCT pages.
 * For product pages, use trackShopifyProductView() instead (fix #3 & #5).
 *
 * @param {string} pageType - AnalyticsPageType (home, collection, page)
 * @param {boolean} hasUserConsent
 */
export function trackShopifyPageView(pageType = AnalyticsPageType.page, hasUserConsent = true) {
  // FIX #5 — dedup: skip if we already sent for this key within DEDUP_WINDOW_MS
  const key = `pv:${typeof window !== 'undefined' ? window.location.pathname + window.location.search : ''}`;
  if (isDuplicatePageView(key)) {
    return;
  }
  try {
    sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload: { ...base(hasUserConsent), pageType },
    });
  } catch (err) {
    console.warn('[Shopify Analytics] page_view error:', err);
  }
}

/**
 * Product view: call on the product page.
 * This sends PAGE_VIEW with pageType=product AND products[] filled (fix #3).
 * ScrollToTop must NOT also send a generic pageView for product pages (fix #5).
 *
 * @param {Object} product - { productGid, variantGid, name, variantName, brand, price, quantity, handle }
 * @param {boolean} hasUserConsent
 */
export function trackShopifyProductView(product, hasUserConsent = true) {
  // FIX #5 — dedup
  const key = `pv:${typeof window !== 'undefined' ? window.location.pathname + window.location.search : ''}`;
  if (isDuplicatePageView(key)) {
    return;
  }
  try {
    const handle = product.handle || 'vela-sculpt-sans-manches';
    const productGid = product.productGid || SHOPIFY_PRODUCT_GIDS[handle] || SHOPIFY_PRODUCT_GIDS['vela-sculpt-sans-manches'];
    const rawVariant = product.variantGid || product.variantId || '61545454993742';
    const variantGid = String(rawVariant).startsWith('gid://')
      ? String(rawVariant)
      : `gid://shopify/ProductVariant/${rawVariant}`;

    const productData = {
      productGid,
      variantGid,
      name: product.name || product.title || 'Vela Sculpt™',
      variantName: product.variantName || product.variantTitle || 'Standard',
      brand: product.brand ?? 'ZVAR',
      price: String(product.price || '19.99'),
      quantity: product.quantity ?? 1,
    };

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload: {
        ...base(hasUserConsent),
        pageType: AnalyticsPageType.product,
        resourceId: productGid,
        totalValue: parseFloat(productData.price),
        products: [productData],
      },
    });
  } catch (err) {
    console.warn('[Shopify Analytics] product_view error:', err);
  }
}

/**
 * Add to cart: call right after the Storefront API cart creation/mutation.
 * @param {string} cartId - Full Shopify Cart GID
 * @param {Array} products - Array of { productGid, variantGid, name, variantName, brand, price, quantity }
 * @param {boolean} hasUserConsent
 */
export function trackShopifyAddToCart(cartId, products = [], hasUserConsent = true) {
  try {
    const totalValue = (Array.isArray(products) ? products : [products]).reduce(
      (sum, p) => sum + parseFloat(p.price || '0') * (p.quantity || 1),
      0
    );

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.ADD_TO_CART,
      payload: {
        ...base(hasUserConsent),
        cartId: cartId || '',
        totalValue,
        products: (Array.isArray(products) ? products : [products]).map((p) => {
          const handle = p.handle || 'vela-sculpt-sans-manches';
          const productGid = p.productGid || SHOPIFY_PRODUCT_GIDS[handle] || SHOPIFY_PRODUCT_GIDS['vela-sculpt-sans-manches'];
          const rawVariant = p.variantGid || p.variantId || '61545454993742';
          const variantGid = String(rawVariant).startsWith('gid://')
            ? String(rawVariant)
            : `gid://shopify/ProductVariant/${rawVariant}`;

          return {
            productGid,
            variantGid,
            name: p.name || p.title || 'Vela Sculpt™',
            variantName: p.variantName || p.variantTitle || 'Standard',
            brand: p.brand ?? 'ZVAR',
            price: String(p.price || '19.99'),
            quantity: p.quantity ?? 1,
          };
        }),
      },
    });
  } catch (err) {
    console.warn('[Shopify Analytics] add_to_cart error:', err);
  }
}

export { AnalyticsPageType, AnalyticsEventName };
