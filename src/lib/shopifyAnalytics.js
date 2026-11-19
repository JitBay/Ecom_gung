import { useEffect } from 'react';
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

/**
 * Ensures _shopify_y and _shopify_s cookies are created on the shared cookie domain
 * (.zvar-shop.com) so visitor sessions carry over seamlessly to checkout.zvar-shop.com.
 */
export function ensureShopifyCookies() {
  if (typeof document === 'undefined') return;
  const domain = SHOPIFY_COOKIE_DOMAIN;
  const domainAttr = domain ? `; domain=${domain}` : '';
  const now = Date.now();

  const generateToken = () => {
    const hex = (now >>> 0).toString(16).padStart(8, '0');
    const rand = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    return `${hex}-${rand}`;
  };

  if (!/(^|;)\s*_shopify_y=/.test(document.cookie)) {
    document.cookie = `_shopify_y=${generateToken()}; path=/; max-age=31536000; SameSite=Lax${domainAttr}`;
  }

  if (!/(^|;)\s*_shopify_s=/.test(document.cookie)) {
    document.cookie = `_shopify_s=${generateToken()}; path=/; max-age=1800; SameSite=Lax${domainAttr}`;
  }
}

/**
 * Call ONCE at the root of the app (App.jsx) to set and sync the _shopify_y / _shopify_s cookies.
 * Setting domain to 'zvar-shop.com' ensures cookies are shared between www and checkout.
 */
export function useZvarShopifyCookies(hasUserConsent = true) {
  useEffect(() => {
    ensureShopifyCookies();
  }, []);

  useShopifyCookies({
    checkoutDomain: SHOPIFY_CHECKOUT_DOMAIN,
    storefrontAccessToken: '06705ec8a9335df76b9e68a23ee31bf5',
    fetchTrackingValues: false,
  });
}

function base(hasUserConsent = true) {
  ensureShopifyCookies();
  return {
    shopId: SHOPIFY_SHOP_ID,
    currency: SHOPIFY_CURRENCY,
    hasUserConsent,
    acceptedLanguage:
      typeof navigator !== 'undefined' && navigator.language?.startsWith('fr') ? 'FR' : 'EN',
    ...getClientBrowserParameters(),
  };
}

/**
 * Page view: call on every route change.
 * @param {string} pageType - AnalyticsPageType (home, collection, product, page)
 * @param {boolean} hasUserConsent
 */
export function trackShopifyPageView(pageType = AnalyticsPageType.page, hasUserConsent = true) {
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
 * @param {Object} product - { productGid, variantGid, name, variantName, brand, price, quantity }
 * @param {boolean} hasUserConsent
 */
export function trackShopifyProductView(product, hasUserConsent = true) {
  try {
    const handle = product.handle || 'vela-sculpt-sans-manches';
    const productGid = product.productGid || SHOPIFY_PRODUCT_GIDS[handle] || SHOPIFY_PRODUCT_GIDS['vela-sculpt-sans-manches'];
    const rawVariant = product.variantGid || product.variantId || '61545454993742';
    const variantGid = String(rawVariant).startsWith('gid://')
      ? String(rawVariant)
      : `gid://shopify/ProductVariant/${rawVariant}`;

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload: {
        ...base(hasUserConsent),
        pageType: AnalyticsPageType.product,
        resourceId: productGid,
        products: [
          {
            productGid,
            variantGid,
            name: product.name || product.title || 'Vela Sculpt™',
            variantName: product.variantName || product.variantTitle || 'Standard',
            brand: product.brand ?? 'ZVAR',
            price: String(product.price || '19.99'),
            quantity: product.quantity ?? 1,
          },
        ],
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
    sendShopifyAnalytics({
      eventName: AnalyticsEventName.ADD_TO_CART,
      payload: {
        ...base(hasUserConsent),
        cartId: cartId || '',
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
