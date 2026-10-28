/**
 * Shopify Headless Commerce Integration Layer
 * 
 * Manages Shopify cart permalinks and direct checkout redirection.
 * No backend required: Shopify handles inventory, discounts, taxes, and payments.
 */

// Configure your Shopify store domain here or via environment variable VITE_SHOPIFY_STORE_DOMAIN
export const SHOPIFY_STORE_DOMAIN =
  import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'velalabs-officiel.myshopify.com';

export const SHOPIFY_STOREFRONT_TOKEN =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

/**
 * Default fallback variant mapping if real Shopify numeric variant IDs are not provided yet.
 * In Shopify admin, each variant has a numeric ID (e.g. 45192837482910).
 */
export const DEFAULT_SHOPIFY_VARIANTS = {
  // Sans manches
  'vela-sculpt-sans-manches-1': '45192837482910',
  'vela-sculpt-sans-manches-2': '45192837482911',
  'vela-sculpt-sans-manches-3': '45192837482912',
  // Demi manches
  'vela-sculpt-demi-manches-1': '45192837482920',
  'vela-sculpt-demi-manches-2': '45192837482921',
  'vela-sculpt-demi-manches-3': '45192837482922',
  // Manches longues
  'vela-sculpt-manches-longues-1': '45192837482930',
  'vela-sculpt-manches-longues-2': '45192837482931',
  'vela-sculpt-manches-longues-3': '45192837482932',
};

/**
 * Builds a direct Shopify Cart Checkout Permalink URL.
 * Format: https://{store_domain}/cart/{variant_id}:{quantity},{variant_id}:{quantity}?note=...
 * 
 * @param {Array} lines - Cart items [{ id, variantId, qty, title, detail }]
 * @param {Object} options - Optional discount code or custom attributes
 * @returns {string} Fully qualified Shopify Checkout URL
 */
export function buildShopifyCartPermalink(lines, options = {}) {
  if (!lines || lines.length === 0) return '';

  const cleanDomain = SHOPIFY_STORE_DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '');
  
  // Format variant segments
  const segments = lines.map((line) => {
    // Prefer explicit Shopify variantId if available, or generate a clean identifier
    const variantId = line.variantId || DEFAULT_SHOPIFY_VARIANTS[line.id] || line.id;
    return `${encodeURIComponent(variantId)}:${line.qty || 1}`;
  });

  const cartPath = `/cart/${segments.join(',')}`;
  const searchParams = new URLSearchParams();

  // Add standard Shopify cart parameters
  searchParams.set('channel', 'headless_front');
  if (options.discount) {
    searchParams.set('discount', options.discount);
  }

  // Pass line details as checkout note / custom attributes if helpful
  const attributes = lines
    .map((l) => `${l.title} (${l.detail || 'Standard'}) x${l.qty}`)
    .join(' | ');
  if (attributes) {
    searchParams.set('note', attributes);
  }

  return `https://${cleanDomain}${cartPath}?${searchParams.toString()}`;
}

/**
 * Redirects the user directly to Shopify's secure checkout page.
 * If running in development with a placeholder store, shows a confirmation dialog.
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

  // If using default placeholder in dev, inform the developer/merchant
  const isPlaceholder = SHOPIFY_STORE_DOMAIN.includes('velalabs-officiel.myshopify.com');
  if (isPlaceholder && typeof window !== 'undefined') {
    const proceed = window.confirm(
      `[Shopify Checkout]\n\nVous allez être redirigé vers la page de paiement sécurisée Shopify :\n${checkoutUrl}\n\n` +
      `Astuce : Définissez la variable VITE_SHOPIFY_STORE_DOMAIN dans votre fichier .env pour pointer vers votre propre boutique Shopify.\n\n` +
      `Cliquez sur OK pour tester la redirection.`
    );
    if (!proceed) return false;
  }

  if (typeof window !== 'undefined') {
    window.location.href = checkoutUrl;
  }
  return true;
}
