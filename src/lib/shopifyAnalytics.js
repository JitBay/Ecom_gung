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
// Cookie & Token Management for First-Time Visitors (Meta Ads)
// When a new visitor lands from a Meta ad, document.cookie has no
// _shopify_y (user token) or _shopify_s (session token) yet.
// If sent with empty tokens, Shopify Monorail cannot create a session
// and cannot attribute UTMs. We ensure valid tokens exist synchronously.
// ──────────────────────────────────────────────────────────────
function getCookie(name) {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : '';
}

function setCookie(name, value, maxAgeSeconds) {
  if (typeof document === 'undefined') return;
  const domainPart =
    window.location.hostname.includes('zvar-shop.com') ? '; domain=.zvar-shop.com' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}${domainPart}; SameSite=Lax`;
}

function generateShopifyUUID() {
  const tokenHash = 'xxxx-4xxx-xxxx-xxxxxxxxxxxx';
  let hash = '';
  try {
    const crypto = window.crypto;
    const randomValuesArray = new Uint16Array(31);
    crypto.getRandomValues(randomValuesArray);
    let i = 0;
    hash = tokenHash.replace(/[x]/g, (c) => {
      const r = randomValuesArray[i] % 16;
      const v = c === 'x' ? r : (r & 3) | 8;
      i++;
      return v.toString(16);
    }).toUpperCase();
  } catch {
    hash = tokenHash.replace(/[x]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 3) | 8).toString(16);
    }).toUpperCase();
  }
  const timeHex = Math.abs(Date.now()).toString(16).toLowerCase().padStart(8, '0');
  return `${timeHex}-${hash}`;
}

export function ensureShopifyTrackingTokens() {
  if (typeof window === 'undefined') return { uniqueToken: '', visitToken: '' };

  let y = getCookie('_shopify_y');
  if (!y) {
    try {
      y = localStorage.getItem('_shopify_y') || '';
    } catch {}
  }
  if (!y) {
    y = generateShopifyUUID();
    setCookie('_shopify_y', y, 31536000); // 1 year
    try { localStorage.setItem('_shopify_y', y); } catch {}
  }

  let s = getCookie('_shopify_s');
  if (!s) {
    s = generateShopifyUUID();
    setCookie('_shopify_s', s, 1800); // 30 minutes
  }

  return { uniqueToken: y, visitToken: s };
}

// ──────────────────────────────────────────────────────────────
// Capture the initial referrer at module load time.
// In an SPA, document.referrer is only present on the very first page load.
// ──────────────────────────────────────────────────────────────
const _initialReferrer =
  typeof document !== 'undefined' ? document.referrer : '';

// ──────────────────────────────────────────────────────────────
// Dedup guard: prevent sending the same page view twice
// within a 500ms window (React StrictMode or multiple triggers).
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

    // Ensure tokens are created immediately in cookies
    ensureShopifyTrackingTokens();

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
 * 2. Synchronizes backend tokens.
 */
export function useZvarShopifyCookies(hasUserConsent = true) {
  useCustomerPrivacy({
    checkoutDomain: SHOPIFY_CHECKOUT_DOMAIN,
    storefrontAccessToken: SHOPIFY_STOREFRONT_TOKEN,
  });

  useShopifyCookies({
    hasUserConsent,
    domain: SHOPIFY_COOKIE_DOMAIN,
    checkoutDomain: `https://${SHOPIFY_CHECKOUT_DOMAIN}`,
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
    hasUserConsent: true,
    analyticsAllowed: isAnalyticsAllowed !== false,
    marketingAllowed: isMarketingAllowed !== false,
    saleOfDataAllowed: isSaleOfDataAllowed !== false,
  };
}

/**
 * Build the base payload with guaranteed tokens, UTM search query, referrer, and consent flags.
 */
function base(hasUserConsent = true) {
  const consent = getConsentValues();
  const browser = getClientBrowserParameters();
  const tokens = ensureShopifyTrackingTokens();

  // Force correct browser values from window.location and ensure tokens are never empty
  if (typeof window !== 'undefined') {
    browser.url = window.location.href;
    browser.path = window.location.pathname;
    browser.search = window.location.search;
    browser.title = document.title;
    if (!browser.uniqueToken) {
      browser.uniqueToken = tokens.uniqueToken;
    }
    if (!browser.visitToken) {
      browser.visitToken = tokens.visitToken;
    }
    if (!browser.referrer && _initialReferrer) {
      browser.referrer = _initialReferrer;
    }
  }

  // Determine active locale
  const activeLang =
    (typeof document !== 'undefined' && document.documentElement?.lang?.startsWith('fr')) ||
    (typeof navigator !== 'undefined' && navigator.language?.startsWith('fr'))
      ? 'FR'
      : 'EN';

  return {
    shopId: SHOPIFY_SHOP_ID,
    currency: SHOPIFY_CURRENCY,
    hasUserConsent: true,
    analyticsAllowed: consent.analyticsAllowed && hasUserConsent,
    marketingAllowed: consent.marketingAllowed && hasUserConsent,
    saleOfDataAllowed: consent.saleOfDataAllowed && hasUserConsent,
    storefrontId: SHOPIFY_STOREFRONT_ID || '0',
    hydrogenSubchannelId: SHOPIFY_STOREFRONT_ID || '0',
    acceptedLanguage: activeLang,
    ...browser,
    uniqueToken: browser.uniqueToken || tokens.uniqueToken,
    visitToken: browser.visitToken || tokens.visitToken,
  };
}

/**
 * Page view: call on every route change for NON-PRODUCT pages.
 * @param {string} pageType - AnalyticsPageType (home, collection, page)
 * @param {boolean} hasUserConsent
 */
export function trackShopifyPageView(pageType = AnalyticsPageType.page, hasUserConsent = true) {
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
 * Sends PAGE_VIEW with pageType=product AND products[] filled.
 *
 * @param {Object} product - { productGid, variantGid, name, variantName, brand, price, quantity, handle }
 * @param {boolean} hasUserConsent
 */
export function trackShopifyProductView(product, hasUserConsent = true) {
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
