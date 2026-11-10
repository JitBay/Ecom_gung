/**
 * Unified E-Commerce Marketing & Analytics Layer for ZVAR
 * Supports Meta (Facebook/Instagram) Pixel, TikTok Pixel, Google Analytics 4, and Microsoft Clarity.
 * Reads IDs from Vite environment variables so zero credentials are hardcoded.
 */

const META_PIXEL_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_META_PIXEL_ID) || '';
const TIKTOK_PIXEL_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_TIKTOK_PIXEL_ID) || '';
const GA4_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GA4_ID) || '';
const CLARITY_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLARITY_ID) || '';

let analyticsInitialized = false;

export function hasActivePixels() {
  if (typeof window === 'undefined') return false;
  return Boolean(
    META_PIXEL_ID ||
      TIKTOK_PIXEL_ID ||
      GA4_ID ||
      typeof window.fbq === 'function' ||
      typeof window.ttq === 'object' ||
      typeof window.gtag === 'function'
  );
}

function injectMetaPixel(id) {
  if (!id || typeof window.fbq === 'function') return;
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq('init', id);
}

function injectTikTokPixel(id) {
  if (!id || window.ttq) return;
  /* eslint-disable */
  !(function (w, d, t) {
    w.TiktokAnalyticsObject = t;
    var ttq = (w[t] = w[t] || []);
    ttq.methods = [
      'page',
      'track',
      'identify',
      'instances',
      'debug',
      'on',
      'off',
      'once',
      'ready',
      'alias',
      'group',
      'enableCookie',
      'disableCookie',
      'holdConsent',
      'revokeConsent',
      'grantConsent',
    ];
    ttq.setAndDefer = function (t, e) {
      t[e] = function () {
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
    ttq.instance = function (t) {
      for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
      return e;
    };
    ttq.load = function (e, n) {
      var r = 'https://analytics.tiktok.com/i18n/pixel/events.js';
      ttq._i = ttq._i || {};
      ttq._i[e] = [];
      ttq._i[e]._u = r;
      ttq._t = ttq._t || {};
      ttq._t[e] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[e] = n || {};
      var o = d.createElement('script');
      o.type = 'text/javascript';
      o.async = !0;
      o.src = r + '?sdkid=' + e + '&lib=' + t;
      var a = d.getElementsByTagName('script')[0];
      a.parentNode.insertBefore(o, a);
    };
    ttq.load(id);
  })(window, document, 'ttq');
  /* eslint-enable */
}

function injectGA4(id) {
  if (!id || typeof window.gtag === 'function') return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false });
}

function injectClarity(id) {
  if (!id || window.clarity) return;
  /* eslint-disable */
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', id);
  /* eslint-enable */
}

/**
 * Injects configured third-party tracking scripts once on startup.
 */
export function initAnalytics() {
  if (typeof window === 'undefined' || analyticsInitialized) return;
  analyticsInitialized = true;

  if (META_PIXEL_ID) injectMetaPixel(META_PIXEL_ID);
  if (TIKTOK_PIXEL_ID) injectTikTokPixel(TIKTOK_PIXEL_ID);
  if (GA4_ID) injectGA4(GA4_ID);
  if (CLARITY_ID) injectClarity(CLARITY_ID);
}

/**
 * Tracks a virtual SPA page view on route changes.
 */
export function trackPageView(path) {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
  if (window.ttq && typeof window.ttq.page === 'function') {
    window.ttq.page();
  }
  if (typeof window.gtag === 'function' && GA4_ID) {
    window.gtag('event', 'page_view', { page_path: path });
  }
}

/**
 * Tracks a product detail impression.
 */
export function trackViewContent({ id, title, price, currency = 'USD' }) {
  if (typeof window === 'undefined' || !id) return;
  const value = Number(price) || 0;

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_ids: [id],
      content_name: title,
      content_type: 'product',
      value,
      currency,
    });
  }
  if (window.ttq && typeof window.ttq.track === 'function') {
    window.ttq.track('ViewContent', {
      content_id: id,
      content_name: title,
      content_type: 'product',
      value,
      currency,
    });
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'view_item', {
      currency,
      value,
      items: [{ item_id: id, item_name: title, price: value }],
    });
  }
}

/**
 * Tracks when a shopper adds an item or bundle to their cart.
 */
export function trackAddToCart({ id, title, price, qty = 1, currency = 'USD' }) {
  if (typeof window === 'undefined' || !id) return;
  const value = (Number(price) || 0) * (Number(qty) || 1);

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'AddToCart', {
      content_ids: [id],
      content_name: title,
      content_type: 'product',
      value,
      currency,
    });
  }
  if (window.ttq && typeof window.ttq.track === 'function') {
    window.ttq.track('AddToCart', {
      content_id: id,
      content_name: title,
      content_type: 'product',
      quantity: qty,
      value,
      currency,
    });
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'add_to_cart', {
      currency,
      value,
      items: [{ item_id: id, item_name: title, price: Number(price) || 0, quantity: qty }],
    });
  }
}

/**
 * Tracks when a shopper initiates redirect to Shopify Checkout.
 */
export function trackInitiateCheckout({ items = [], total = 0, currency = 'USD' }) {
  if (typeof window === 'undefined') return;
  const value = Number(total) || 0;
  const ids = items.map((l) => l.handle || l.id).filter(Boolean);
  const numItems = items.reduce((sum, l) => sum + (Number(l.qty) || 1), 0);

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: ids,
      content_type: 'product',
      num_items: numItems,
      value,
      currency,
    });
  }
  if (window.ttq && typeof window.ttq.track === 'function') {
    window.ttq.track('InitiateCheckout', {
      contents: items.map((l) => ({
        content_id: l.handle || l.id,
        content_name: l.title,
        quantity: Number(l.qty) || 1,
        price: Number(l.price) || 0,
      })),
      value,
      currency,
    });
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', {
      currency,
      value,
      items: items.map((l) => ({
        item_id: l.handle || l.id,
        item_name: l.title,
        price: Number(l.price) || 0,
        quantity: Number(l.qty) || 1,
      })),
    });
  }
}
