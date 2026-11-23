/**
 * Shopify Headless Commerce Integration Layer for zvar-shop.com
 * 
 * Manages Shopify cart permalinks and direct checkout redirection.
 * Synchronized with real Shopify variants from zvar-shop.com.
 */

import { trackInitiateCheckout } from './analytics.js';

const configuredDomain =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SHOPIFY_STORE_DOMAIN) || 'checkout.zvar-shop.com';

// Always route checkout requests to checkout.zvar-shop.com (Shopify), never to the Vercel frontend (zvar-shop.com / www.zvar-shop.com)
export const SHOPIFY_STORE_DOMAIN =
  !configuredDomain || configuredDomain === 'zvar-shop.com' || configuredDomain === 'www.zvar-shop.com'
    ? 'checkout.zvar-shop.com'
    : configuredDomain;

export const SHOPIFY_STOREFRONT_TOKEN =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SHOPIFY_STOREFRONT_TOKEN) || '06705ec8a9335df76b9e68a23ee31bf5';

/**
 * Exact Shopify Product Variant IDs from zvar-shop.com
 * Maps model:size:color combinations directly to the 14-digit numeric Shopify variant ID.
 */
export const SHOPIFY_VARIANTS_MAP = {
  "vela-sculpt-sans-manches:S:black": "61545454993742",
  "vela-sculpt-sans-manches:S:noir": "61545454993742",
  "vela-sculpt-sans-manches:S": "61545454993742",
  "vela-sculpt-sans-manches": "61545454993742",
  "vela-sculpt-sans-manches:S:gray": "61545455026510",
  "vela-sculpt-sans-manches:S:gris": "61545455026510",
  "vela-sculpt-sans-manches:S:gris-chine": "61545455026510",
  "vela-sculpt-sans-manches:S:white": "61545455059278",
  "vela-sculpt-sans-manches:S:blanc": "61545455059278",
  "vela-sculpt-sans-manches:S:yellow": "61545455092046",
  "vela-sculpt-sans-manches:S:black-or": "61545455092046",
  "vela-sculpt-sans-manches:S:or": "61545455092046",
  "vela-sculpt-sans-manches:M:black": "61545455124814",
  "vela-sculpt-sans-manches:M:noir": "61545455124814",
  "vela-sculpt-sans-manches:M": "61545455124814",
  "vela-sculpt-sans-manches:M:gray": "61545455157582",
  "vela-sculpt-sans-manches:M:gris": "61545455157582",
  "vela-sculpt-sans-manches:M:gris-chine": "61545455157582",
  "vela-sculpt-sans-manches:M:white": "61545455190350",
  "vela-sculpt-sans-manches:M:blanc": "61545455190350",
  "vela-sculpt-sans-manches:M:yellow": "61545455223118",
  "vela-sculpt-sans-manches:M:black-or": "61545455223118",
  "vela-sculpt-sans-manches:M:or": "61545455223118",
  "vela-sculpt-sans-manches:L:black": "61545455255886",
  "vela-sculpt-sans-manches:L:noir": "61545455255886",
  "vela-sculpt-sans-manches:L": "61545455255886",
  "vela-sculpt-sans-manches:L:gray": "61545455288654",
  "vela-sculpt-sans-manches:L:gris": "61545455288654",
  "vela-sculpt-sans-manches:L:gris-chine": "61545455288654",
  "vela-sculpt-sans-manches:L:white": "61545455321422",
  "vela-sculpt-sans-manches:L:blanc": "61545455321422",
  "vela-sculpt-sans-manches:L:yellow": "61545455354190",
  "vela-sculpt-sans-manches:L:black-or": "61545455354190",
  "vela-sculpt-sans-manches:L:or": "61545455354190",
  "vela-sculpt-sans-manches:XL:black": "61545455386958",
  "vela-sculpt-sans-manches:XL:noir": "61545455386958",
  "vela-sculpt-sans-manches:XL": "61545455386958",
  "vela-sculpt-sans-manches:XL:gray": "61545455419726",
  "vela-sculpt-sans-manches:XL:gris": "61545455419726",
  "vela-sculpt-sans-manches:XL:gris-chine": "61545455419726",
  "vela-sculpt-sans-manches:XL:white": "61545455452494",
  "vela-sculpt-sans-manches:XL:blanc": "61545455452494",
  "vela-sculpt-sans-manches:XL:yellow": "61545455485262",
  "vela-sculpt-sans-manches:XL:black-or": "61545455485262",
  "vela-sculpt-sans-manches:XL:or": "61545455485262",
  "vela-sculpt-sans-manches:2XL:black": "61545455518030",
  "vela-sculpt-sans-manches:2XL:noir": "61545455518030",
  "vela-sculpt-sans-manches:2XL": "61545455518030",
  "vela-sculpt-sans-manches:2XL:gray": "61545455550798",
  "vela-sculpt-sans-manches:2XL:gris": "61545455550798",
  "vela-sculpt-sans-manches:2XL:gris-chine": "61545455550798",
  "vela-sculpt-sans-manches:2XL:white": "61545455583566",
  "vela-sculpt-sans-manches:2XL:blanc": "61545455583566",
  "vela-sculpt-sans-manches:2XL:yellow": "61545455616334",
  "vela-sculpt-sans-manches:2XL:black-or": "61545455616334",
  "vela-sculpt-sans-manches:2XL:or": "61545455616334",
  "vela-sculpt-demi-manches:S:gray": "61545474425166",
  "vela-sculpt-demi-manches:S:gris": "61545474425166",
  "vela-sculpt-demi-manches:S:gris-chine": "61545474425166",
  "vela-sculpt-demi-manches:S": "61545474425166",
  "vela-sculpt-demi-manches": "61545474425166",
  "vela-sculpt-demi-manches:M:gray": "61545687187790",
  "vela-sculpt-demi-manches:M:gris": "61545687187790",
  "vela-sculpt-demi-manches:M:gris-chine": "61545687187790",
  "vela-sculpt-demi-manches:M": "61545687187790",
  "vela-sculpt-demi-manches:L:gray": "61545687220558",
  "vela-sculpt-demi-manches:L:gris": "61545687220558",
  "vela-sculpt-demi-manches:L:gris-chine": "61545687220558",
  "vela-sculpt-demi-manches:L": "61545687220558",
  "vela-sculpt-demi-manches:XL:gray": "61545687253326",
  "vela-sculpt-demi-manches:XL:gris": "61545687253326",
  "vela-sculpt-demi-manches:XL:gris-chine": "61545687253326",
  "vela-sculpt-demi-manches:XL": "61545687253326",
  "vela-sculpt-demi-manches:2XL:gray": "61545687286094",
  "vela-sculpt-demi-manches:2XL:gris": "61545687286094",
  "vela-sculpt-demi-manches:2XL:gris-chine": "61545687286094",
  "vela-sculpt-demi-manches:2XL": "61545687286094",
  "vela-sculpt-demi-manches:S:black": "61545474457934",
  "vela-sculpt-demi-manches:S:noir": "61545474457934",
  "vela-sculpt-demi-manches:M:black": "61545687318862",
  "vela-sculpt-demi-manches:M:noir": "61545687318862",
  "vela-sculpt-demi-manches:L:black": "61545687351630",
  "vela-sculpt-demi-manches:L:noir": "61545687351630",
  "vela-sculpt-demi-manches:XL:black": "61545687384398",
  "vela-sculpt-demi-manches:XL:noir": "61545687384398",
  "vela-sculpt-demi-manches:2XL:black": "61545687417166",
  "vela-sculpt-demi-manches:2XL:noir": "61545687417166",
  "vela-sculpt-demi-manches:S:white": "61545474490702",
  "vela-sculpt-demi-manches:S:blanc": "61545474490702",
  "vela-sculpt-demi-manches:M:white": "61545687449934",
  "vela-sculpt-demi-manches:M:blanc": "61545687449934",
  "vela-sculpt-demi-manches:L:white": "61545687482702",
  "vela-sculpt-demi-manches:L:blanc": "61545687482702",
  "vela-sculpt-demi-manches:XL:white": "61545687515470",
  "vela-sculpt-demi-manches:XL:blanc": "61545687515470",
  "vela-sculpt-demi-manches:2XL:white": "61545687548238",
  "vela-sculpt-demi-manches:2XL:blanc": "61545687548238",
  "vela-sculpt-manches-longues:S:black": "61545675096398",
  "vela-sculpt-manches-longues:S:noir": "61545675096398",
  "vela-sculpt-manches-longues:S": "61545675096398",
  "vela-sculpt-manches-longues": "61545675096398",
  "vela-sculpt-manches-longues:S:gray": "61545675129166",
  "vela-sculpt-manches-longues:S:gris": "61545675129166",
  "vela-sculpt-manches-longues:S:gris-chine": "61545675129166",
  "vela-sculpt-manches-longues:S:white": "61545675161934",
  "vela-sculpt-manches-longues:S:blanc": "61545675161934",
  "vela-sculpt-manches-longues:M:black": "61545675194702",
  "vela-sculpt-manches-longues:M:noir": "61545675194702",
  "vela-sculpt-manches-longues:M": "61545675194702",
  "vela-sculpt-manches-longues:M:gray": "61545675227470",
  "vela-sculpt-manches-longues:M:gris": "61545675227470",
  "vela-sculpt-manches-longues:M:gris-chine": "61545675227470",
  "vela-sculpt-manches-longues:M:white": "61545675260238",
  "vela-sculpt-manches-longues:M:blanc": "61545675260238",
  "vela-sculpt-manches-longues:L:black": "61545675293006",
  "vela-sculpt-manches-longues:L:noir": "61545675293006",
  "vela-sculpt-manches-longues:L": "61545675293006",
  "vela-sculpt-manches-longues:L:gray": "61545675325774",
  "vela-sculpt-manches-longues:L:gris": "61545675325774",
  "vela-sculpt-manches-longues:L:gris-chine": "61545675325774",
  "vela-sculpt-manches-longues:L:white": "61545675358542",
  "vela-sculpt-manches-longues:L:blanc": "61545675358542",
  "vela-sculpt-manches-longues:XL:black": "61545675391310",
  "vela-sculpt-manches-longues:XL:noir": "61545675391310",
  "vela-sculpt-manches-longues:XL": "61545675391310",
  "vela-sculpt-manches-longues:XL:gray": "61545675424078",
  "vela-sculpt-manches-longues:XL:gris": "61545675424078",
  "vela-sculpt-manches-longues:XL:gris-chine": "61545675424078",
  "vela-sculpt-manches-longues:XL:white": "61545675456846",
  "vela-sculpt-manches-longues:XL:blanc": "61545675456846",
  "vela-sculpt-manches-longues:2XL:black": "61545675489614",
  "vela-sculpt-manches-longues:2XL:noir": "61545675489614",
  "vela-sculpt-manches-longues:2XL": "61545675489614",
  "vela-sculpt-manches-longues:2XL:gray": "61545675522382",
  "vela-sculpt-manches-longues:2XL:gris": "61545675522382",
  "vela-sculpt-manches-longues:2XL:gris-chine": "61545675522382",
  "vela-sculpt-manches-longues:2XL:white": "61545675555150",
  "vela-sculpt-manches-longues:2XL:blanc": "61545675555150",

  // Vela Sculpt™ — Pack Découverte (3 Coupes) (Product ID: 16228308484430)
  "pack-decouverte:S": "61546779443534",
  "pack-decouverte:M": "61546779476302",
  "pack-decouverte:L": "61546779509070",
  "pack-decouverte:XL": "61546779541838",
  "pack-decouverte:2XL": "61546779574606",
  "pack-decouverte": "61546779476302"
};

/**
 * Normalizes color strings for lookup.
 */
function normalizeColor(colorStr = '') {
  const c = String(colorStr).toLowerCase().trim();
  if (
    c.includes('black-or') ||
    c.includes('black or') ||
    c.includes('yellow') ||
    c === 'or' ||
    c === '#241f17' ||
    c === '#221e17'
  ) {
    return 'yellow';
  }
  if (c.includes('noir') || c.includes('black') || c === '#1a1a1a') {
    return 'black';
  }
  if (c.includes('blanc') || c.includes('white') || c === '#f4f4f6' || c === '#f8f8fa') {
    return 'white';
  }
  if (
    c.includes('gris') ||
    c.includes('gray') ||
    c.includes('grey') ||
    c === '#72757d' ||
    c === '#63666f' ||
    c === '#5a5d66'
  ) {
    return 'gray';
  }
  return c;
}

/**
 * Normalizes size strings for lookup.
 */
function normalizeSize(sizeStr = '') {
  const match = String(sizeStr).match(/\b(2XL|XXL|XL|L|M|S)\b/i);
  if (match) {
    const s = match[1].toUpperCase();
    return s === 'XXL' ? '2XL' : s;
  }
  return 'M';
}

/**
 * Normalizes model handle for lookup.
 */
function normalizeModel(str = '', context = '') {
  const direct = String(str).toLowerCase().trim();

  // 1. Direct handle check has priority
  if (direct === 'pack-decouverte' || direct.includes('pack-decouverte')) {
    return 'pack-decouverte';
  }
  if (direct.includes('manches-longues') || direct.includes('long-sleeves')) {
    return 'vela-sculpt-manches-longues';
  }
  if (direct.includes('demi-manches') || direct.includes('short-sleeves')) {
    return 'vela-sculpt-demi-manches';
  }
  if (direct.includes('sans-manches') || direct.includes('sleeveless') || direct.includes('tank-top')) {
    return 'vela-sculpt-sans-manches';
  }

  // 2. Scan combined context only when direct handle wasn't specific
  const s = `${str} ${context}`.toLowerCase();
  if (
    s.includes('pack-decouverte-3-coupes') ||
    s.includes('pack decouverte') ||
    s.includes('pack découverte') ||
    s.includes('discovery pack') ||
    s.includes('3 coupes') ||
    s.includes('3 fits')
  ) {
    return 'pack-decouverte';
  }
  if (s.includes('manches-longues') || s.includes('manches longues') || s.includes('long sleeves')) {
    return 'vela-sculpt-manches-longues';
  }
  if (s.includes('demi-manches') || s.includes('demi manches') || s.includes('short sleeves')) {
    return 'vela-sculpt-demi-manches';
  }
  return 'vela-sculpt-sans-manches';
}

/**
 * Resolves the numeric Shopify variant ID for any cart item line.
 * @param {Object} line - Cart line item
 * @returns {string} 14-digit numeric variant ID
 */
export function resolveShopifyVariantId(line = {}) {
  // 1. Explicit numeric variant ID
  if (line.variantId && /^\d+$/.test(String(line.variantId))) {
    return String(line.variantId);
  }

  const isDiscovery =
    line.handle === 'pack-decouverte' ||
    Boolean(line.isDiscoveryPack) ||
    (typeof line.id === 'string' && line.id.includes('pack-decouverte')) ||
    (typeof line.title === 'string' && /pack.*d[eé]couverte|discovery/i.test(line.title));

  // If chosenVariants has an item, use it for exact variant attributes
  const firstChosen = Array.isArray(line.chosenVariants) && line.chosenVariants[0]
    ? line.chosenVariants[0]
    : null;

  // Prioritize line.handle when present so pack-decouverte or specific models aren't overwritten
  const targetHandle = isDiscovery
    ? 'pack-decouverte'
    : (line.handle && line.handle !== ''
        ? line.handle
        : (firstChosen?.handle || line.id || line.title || ''));

  const textToScan = `${line.id || ''} ${line.detail || ''} ${line.title || ''} ${firstChosen?.detail || ''}`;
  const model = isDiscovery ? 'pack-decouverte' : normalizeModel(targetHandle, textToScan);

  // Extract size: prioritize line.size, then firstChosen.size, then textToScan
  const size = normalizeSize(line.size || firstChosen?.size || textToScan);

  // Extract color: prioritize line.selectedColor, line.color, firstChosen.color, textToScan
  const color = normalizeColor(line.selectedColor || line.color || firstChosen?.color || textToScan);

  // Pack Découverte resolution (only genuine 3-cut pack discovery)
  if (model === 'pack-decouverte' || isDiscovery) {
    const packSizeKey = `pack-decouverte:${size}`;
    if (SHOPIFY_VARIANTS_MAP[packSizeKey]) {
      return SHOPIFY_VARIANTS_MAP[packSizeKey];
    }
    return SHOPIFY_VARIANTS_MAP['pack-decouverte'] || '61546779476302';
  }

  // Exact match model:size:color
  const exactKey = `${model}:${size}:${color}`;
  if (SHOPIFY_VARIANTS_MAP[exactKey]) {
    return SHOPIFY_VARIANTS_MAP[exactKey];
  }

  // Model + size fallback
  const sizeKey = `${model}:${size}`;
  if (SHOPIFY_VARIANTS_MAP[sizeKey]) {
    return SHOPIFY_VARIANTS_MAP[sizeKey];
  }

  // Model default fallback
  if (SHOPIFY_VARIANTS_MAP[model]) {
    return SHOPIFY_VARIANTS_MAP[model];
  }

  // First available variant
  return '61545454993742';
}

/**
 * Returns the canonical Shopify checkout hostname, never the Vercel storefront domain.
 */
function getCleanShopifyDomain() {
  let cleanDomain = SHOPIFY_STORE_DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '');
  if (!cleanDomain || cleanDomain === 'zvar-shop.com' || cleanDomain === 'www.zvar-shop.com') {
    return 'checkout.zvar-shop.com';
  }
  return cleanDomain;
}

/**
 * Resolves active storefront locale ('fr' | 'en') for Shopify Checkout.
 */
function getCheckoutLocale(options = {}) {
  const candidate = String(
    options.locale ||
      (typeof document !== 'undefined' ? document.documentElement?.lang : '') ||
      (typeof localStorage !== 'undefined'
        ? localStorage.getItem('zvar_lang') || localStorage.getItem('velalabs_lang')
        : '') ||
      'fr'
  )
    .toLowerCase()
    .trim();

  return candidate.startsWith('en') ? 'en' : 'fr';
}

/**
 * Resolves buyer country code aligned with Shopify Markets ('FR' or 'US').
 */
function getCheckoutCountryCode(options = {}, locale = 'fr') {
  const explicit = String(options.countryCode || '').toUpperCase().trim();
  if (/^[A-Z]{2}$/.test(explicit)) return explicit;

  try {
    const geo = String(
      (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('zvar_geo_country') : '') || ''
    )
      .toUpperCase()
      .trim();
    if (geo === 'FR' || geo === 'US') return geo;
  } catch {
    // Session storage unavailable
  }

  return locale === 'fr' ? 'FR' : 'US';
}

/**
 * Consolidates cart lines into Shopify variant quantities, optional line selection details,
 * and a clean server-side order summary note.
 */
function resolveCartVariantEntries(lines = []) {
  const variantMap = new Map();

  const addEntry = (variantId, qty, detail = '') => {
    const existing = variantMap.get(variantId) || { qty: 0, details: new Set() };
    existing.qty += qty;
    if (detail) {
      existing.details.add(detail);
    }
    variantMap.set(variantId, existing);
  };

  lines.forEach((line) => {
    const lineQty = Math.max(1, parseInt(line.qty, 10) || 1);
    const detailText = typeof line.detail === 'string' ? line.detail.trim() : '';

    // 1. Pack Découverte (Single dedicated Shopify product at 44.99 $ USD)
    const isDiscovery =
      line.handle === 'pack-decouverte' ||
      Boolean(line.isDiscoveryPack) ||
      (typeof line.id === 'string' && line.id.includes('pack-decouverte')) ||
      (typeof line.title === 'string' && /pack.*d[eé]couverte|discovery/i.test(line.title)) ||
      (Number(line.price) === 44.99 && line.bundleId !== 1);

    if (isDiscovery) {
      addEntry(resolveShopifyVariantId({ ...line, handle: 'pack-decouverte', isDiscoveryPack: true }), lineQty, detailText);
      return;
    }

    // 2. Check if this is a 2+1 Offer bundle (2 paid shirts, 3rd free)
    const isTwoPlusOne =
      Boolean(line.isTwoPlusOne) ||
      line.bundleId === 2 ||
      String(line.bundleId) === '2' ||
      line.paidQty === 2 ||
      (typeof line.id === 'string' && line.id.includes('-2-')) ||
      (typeof line.title === 'string' && /2\s*(t-shirts?|shirts?)\s*\+\s*1\s*(offert|free)|2\+1/i.test(line.title)) ||
      (line.price && (Math.abs(line.price - 39.98) < 0.05 || Math.abs(line.price - 49.98) < 0.05 || Math.abs(line.price - 59.98) < 0.05));

    // 3. Check if this is a 3-shirt pack (3 paid shirts)
    const isPackThree =
      line.bundleId === 3 ||
      String(line.bundleId) === '3' ||
      line.paidQty === 3 ||
      (typeof line.title === 'string' && /(pack semaine|week pack)/i.test(line.title));

    if (isTwoPlusOne) {
      if (Array.isArray(line.chosenVariants) && line.chosenVariants.length >= 3) {
        for (let i = 0; i < 3; i++) {
          const vId = resolveShopifyVariantId({ handle: line.handle, ...line.chosenVariants[i] });
          addEntry(vId, 1 * lineQty, i === 0 ? detailText : '');
        }
      } else if (Array.isArray(line.chosenVariants) && line.chosenVariants.length === 2) {
        const v1 = resolveShopifyVariantId({ handle: line.handle, ...line.chosenVariants[0] });
        const v2 = resolveShopifyVariantId({ handle: line.handle, ...line.chosenVariants[1] });
        addEntry(v1, 1 * lineQty, detailText);
        addEntry(v2, 1 * lineQty);
        addEntry(v1, 1 * lineQty);
      } else {
        addEntry(resolveShopifyVariantId(line), 3 * lineQty, detailText);
      }
      return;
    }

    if (isPackThree) {
      if (Array.isArray(line.chosenVariants) && line.chosenVariants.length >= 3) {
        for (let i = 0; i < 3; i++) {
          const vId = resolveShopifyVariantId({ handle: line.handle, ...line.chosenVariants[i] });
          addEntry(vId, 1 * lineQty, i === 0 ? detailText : '');
        }
      } else {
        addEntry(resolveShopifyVariantId(line), 3 * lineQty, detailText);
      }
      return;
    }

    // 4. Standard single item (Pack 1 t-shirt)
    let vId;
    if (Array.isArray(line.chosenVariants) && line.chosenVariants.length > 0) {
      vId = resolveShopifyVariantId({
        handle: line.handle,
        ...line.chosenVariants[0],
      });
    } else {
      vId = resolveShopifyVariantId(line);
    }
    const paidQty = (line.paidQty || 1) * lineQty;
    addEntry(vId, paidQty, detailText);
  });

  const orderNote = lines
    .map((l) => `${l.title} (${l.detail || 'Standard'}) x${l.qty || 1}`)
    .join(' | ');

  return { variantMap, orderNote };
}

/**
 * Builds a fallback direct Shopify Cart Checkout Permalink URL.
 *
 * @param {Array} lines - Cart items
 * @param {Object} options - Optional discount code or locale
 * @returns {string} Fully qualified Shopify Checkout URL
 */
export function buildShopifyCartPermalink(lines, options = {}) {
  if (!lines || lines.length === 0) return '';

  const cleanDomain = getCleanShopifyDomain();
  const locale = getCheckoutLocale(options);
  const { variantMap, orderNote } = resolveCartVariantEntries(lines);

  const segments = Array.from(variantMap.entries()).map(
    ([vId, entry]) => `${encodeURIComponent(vId)}:${entry.qty}`
  );

  const cartPath = `/cart/${segments.join(',')}`;
  const searchParams = new URLSearchParams();
  searchParams.set('locale', locale);

  if (options.discount) {
    searchParams.set('discount', options.discount);
  }

  if (orderNote) {
    searchParams.set('note', orderNote);
  }

  const query = searchParams.toString();
  return `https://${cleanDomain}${cartPath}${query ? `?${query}` : ''}`;
}

/**
 * Synchronizes the cart with Shopify Storefront API.
 * Returns the exact server-side cost (subtotalAmount, totalAmount) and the verified cart ID / checkout URL.
 *
 * @param {Array} lines - Cart items
 * @param {Object} options - Checkout / sync options (countryCode, discount, locale)
 * @returns {Promise<{ cartId: string, checkoutUrl: string, subtotal: number, total: number, currency: string } | null>}
 */
export async function syncShopifyCart(lines, options = {}) {
  if (!lines || lines.length === 0) return null;

  const cleanDomain = getCleanShopifyDomain();
  const locale = getCheckoutLocale(options);
  const countryCode = getCheckoutCountryCode(options, locale);
  const { variantMap, orderNote } = resolveCartVariantEntries(lines);
  const attrKey = locale === 'fr' ? 'Sélection' : 'Selection';

  const cartLines = Array.from(variantMap.entries()).map(([variantId, entry]) => {
    const item = {
      merchandiseId: `gid://shopify/ProductVariant/${variantId}`,
      quantity: entry.qty,
    };
    const combinedDetail = Array.from(entry.details).join(' | ').trim();
    if (combinedDetail) {
      item.attributes = [{ key: attrKey, value: combinedDetail.slice(0, 255) }];
    }
    return item;
  });

  const input = {
    lines: cartLines,
    buyerIdentity: { countryCode },
  };

  if (orderNote) {
    input.note = orderNote;
  }
  if (options.discount) {
    input.discountCodes = [options.discount];
  }

  const mutation = `
    mutation CartSync($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), 4000) : null;

  try {
    const res = await fetch(`https://${cleanDomain}/api/2026-10/graphql.json`, {
      method: 'POST',
      signal: controller ? controller.signal : undefined,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: { input },
      }),
    });

    if (res.ok) {
      const json = await res.json();
      const payload = json?.data?.cartCreate;
      const cart = payload?.cart;
      const rawUrl = cart?.checkoutUrl;

      if (rawUrl && (!payload.userErrors || payload.userErrors.length === 0)) {
        let checkoutUrl = rawUrl;
        try {
          const parsedUrl = new URL(rawUrl);
          if (parsedUrl.hostname === 'zvar-shop.com' || parsedUrl.hostname === 'www.zvar-shop.com') {
            parsedUrl.hostname = cleanDomain;
          }
          parsedUrl.searchParams.set('locale', locale);
          parsedUrl.searchParams.delete('note');
          parsedUrl.searchParams.delete('cart_link_id');
          parsedUrl.searchParams.delete('_s');
          parsedUrl.searchParams.delete('_y');
          checkoutUrl = parsedUrl.toString();
        } catch {
          // Keep rawUrl if parsing fails
        }

        const subtotal = Number(cart?.cost?.subtotalAmount?.amount) || 0;
        const total = Number(cart?.cost?.totalAmount?.amount) || 0;
        const currency = cart?.cost?.totalAmount?.currencyCode || 'USD';

        return {
          cartId: cart.id,
          checkoutUrl,
          subtotal,
          total,
          currency,
        };
      }
    }
  } catch (err) {
    console.warn('[Shopify] Cart sync fallback:', err?.message || err);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }

  return null;
}

/**
 * Creates a clean Shopify Checkout session via Storefront API `cartCreate`.
 * Keeps bundle selections as structured line-item attributes and stores order notes
 * server-side instead of exposing long `?note=` strings in the checkout URL.
 * Falls back transparently to the cart permalink if Storefront API fails.
 */
export async function createShopifyCheckoutUrl(lines, options = {}) {
  if (!lines || lines.length === 0) return '';

  const synced = await syncShopifyCart(lines, options);
  if (synced?.checkoutUrl) {
    return synced.checkoutUrl;
  }

  const locale = getCheckoutLocale(options);
  return buildShopifyCartPermalink(lines, { ...options, locale });
}

/**
 * Computes an instant, synchronous checkout URL for the current cart lines.
 * Uses the pre-synchronized Storefront API checkoutUrl if available,
 * otherwise falls back immediately to the deterministic cart permalink.
 *
 * @param {Array} lines - Cart lines
 * @param {Object} options - Checkout options (locale, shopifyCart, discount, etc.)
 * @returns {string} Fully qualified Shopify checkout URL
 */
export function getInstantCheckoutUrl(lines, options = {}) {
  if (!lines || lines.length === 0) return '';
  if (options.checkoutUrl) return options.checkoutUrl;
  if (options.shopifyCart?.checkoutUrl) return options.shopifyCart.checkoutUrl;

  const locale = getCheckoutLocale(options);
  return buildShopifyCartPermalink(lines, { ...options, locale });
}

/**
 * Redirects the user directly to Shopify's secure checkout page.
 * Synchronous and in-app browser safe (WebKit/Instagram/Facebook).
 *
 * @param {Array} lines - Array of cart lines
 * @param {Object} options - Additional checkout options
 */
export function redirectToShopifyCheckout(lines, options = {}) {
  if (!lines || lines.length === 0) {
    console.warn('[Shopify] Cart is empty, cannot proceed to checkout.');
    return false;
  }

  const total = lines.reduce((sum, l) => sum + (Number(l.price) || 0) * (Number(l.qty) || 1), 0);
  try {
    trackInitiateCheckout({ items: lines, total });
  } catch (err) {
    console.warn('[Shopify] trackInitiateCheckout warning:', err);
  }

  const checkoutUrl = getInstantCheckoutUrl(lines, options);
  if (!checkoutUrl) {
    console.error('[Shopify] Could not compute checkout URL');
    return false;
  }

  console.log('[Shopify Checkout] Navigating to:', checkoutUrl);

  if (typeof window !== 'undefined') {
    try {
      window.location.assign(checkoutUrl);
    } catch {
      window.location.href = checkoutUrl;
    }
    // Fallback timer for WebKit webviews
    setTimeout(() => {
      try {
        if (window.location.href !== checkoutUrl) {
          window.location.href = checkoutUrl;
        }
      } catch {
        // Ignored
      }
    }, 2000);
  }
  return true;
}

/**
 * Generates a random temporary password for Storefront API newsletter customer registration.
 */
function generateTempPassword() {
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const bytes = new Uint8Array(12);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}zVar!9`;
}

/**
 * Subscribes a visitor email directly to Shopify Customer Marketing via Storefront API.
 * If the email is already registered in Shopify, it resolves cleanly as subscribed.
 *
 * @param {string} rawEmail
 * @returns {Promise<{ ok: boolean, alreadySubscribed?: boolean, error?: string }>}
 */
export async function subscribeToShopifyNewsletter(rawEmail) {
  const email = (rawEmail || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'INVALID_EMAIL' };
  }

  const cleanDomain = getCleanShopifyDomain();

  const mutation = `
    mutation NewsletterSubscribe($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          acceptsMarketing
        }
        customerUserErrors {
          code
          message
        }
      }
    }
  `;

  try {
    const res = await fetch(`https://${cleanDomain}/api/2026-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: {
            email,
            password: generateTempPassword(),
            acceptsMarketing: true,
          },
        },
      }),
    });

    if (!res.ok) {
      return { ok: false, error: `HTTP_${res.status}` };
    }

    const json = await res.json();
    const payload = json?.data?.customerCreate;
    const userErrors = payload?.customerUserErrors || [];

    if (payload?.customer?.id) {
      return { ok: true, alreadySubscribed: false };
    }

    const taken = userErrors.some((e) => e.code === 'TAKEN');
    if (taken) {
      return { ok: true, alreadySubscribed: true };
    }

    const firstMsg = userErrors[0]?.message || json?.errors?.[0]?.message || 'UNKNOWN_ERROR';
    return { ok: false, error: firstMsg };
  } catch (err) {
    return { ok: false, error: err?.message || 'NETWORK_ERROR' };
  }
}
