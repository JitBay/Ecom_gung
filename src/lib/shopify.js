/**
 * Shopify Headless Commerce Integration Layer for zvar-shop.com
 * 
 * Manages Shopify cart permalinks and direct checkout redirection.
 * Synchronized with real Shopify variants from zvar-shop.com.
 */

export const SHOPIFY_STORE_DOMAIN =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SHOPIFY_STORE_DOMAIN) || 'checkout.zvar-shop.com';

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
  if (c.includes('black or') || c.includes('black-or') || c.includes('yellow') || c.includes('or')) return 'yellow';
  if (c.includes('noir') || c.includes('black')) return 'black';
  if (c.includes('blanc') || c.includes('white')) return 'white';
  if (c.includes('gris') || c.includes('gray')) return 'gray';
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
  const s = `${str} ${context}`.toLowerCase();
  if (
    s.includes('pack-decouverte') ||
    s.includes('pack decouverte') ||
    s.includes('pack découverte') ||
    s.includes('discovery') ||
    s.includes('decouverte') ||
    s.includes('découverte')
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

  const textToScan = `${line.id || ''} ${line.detail || ''} ${line.title || ''}`;
  const model = normalizeModel(line.handle || line.id || line.title, textToScan);
  const size = normalizeSize(textToScan);
  const color = normalizeColor(line.color || textToScan);

  // Pack Découverte resolution
  if (model === 'pack-decouverte') {
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
 * Builds a direct Shopify Cart Checkout Permalink URL.
 * Format: https://zvar-shop.com/cart/{variant_id}:{quantity}?channel=headless_front
 * 
 * @param {Array} lines - Cart items
 * @param {Object} options - Optional discount code or custom attributes
 * @returns {string} Fully qualified Shopify Checkout URL
 */
export function buildShopifyCartPermalink(lines, options = {}) {
  if (!lines || lines.length === 0) return '';

  const cleanDomain = SHOPIFY_STORE_DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '');

  // Format variant segments with resolved numeric IDs
  const segments = lines.map((line) => {
    const variantId = resolveShopifyVariantId(line);
    const qty = Math.max(1, parseInt(line.qty, 10) || 1);
    return `${encodeURIComponent(variantId)}:${qty}`;
  });

  const cartPath = `/cart/${segments.join(',')}`;
  const searchParams = new URLSearchParams();

  searchParams.set('channel', 'headless_front');
  if (options.discount) {
    searchParams.set('discount', options.discount);
  }

  const attributes = lines
    .map((l) => `${l.title} (${l.detail || 'Standard'}) x${l.qty || 1}`)
    .join(' | ');
  if (attributes) {
    searchParams.set('note', attributes);
  }

  return `https://${cleanDomain}${cartPath}?${searchParams.toString()}`;
}

/**
 * Redirects the user directly to Shopify's secure checkout page.
 * 
 * @param {Array} lines - Array of cart lines
 * @param {Object} options - Additional checkout options
 */
export async function redirectToShopifyCheckout(lines, options = {}) {
  if (!lines || lines.length === 0) {
    console.warn('[Shopify] Cart is empty, cannot proceed to checkout.');
    return false;
  }

  const checkoutUrl = buildShopifyCartPermalink(lines, options);
  console.log('[Shopify Checkout] Navigating to:', checkoutUrl);

  if (typeof window !== 'undefined') {
    window.location.href = checkoutUrl;
  }
  return true;
}
