import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { redirectToShopifyCheckout, resolveShopifyVariantId, syncShopifyCart } from '../lib/shopify.js';
import { trackAddToCart } from '../lib/analytics.js';
import { SHOPIFY_PRODUCT_GIDS, trackShopifyAddToCart } from '../lib/shopifyAnalytics.js';
import { useLanguage } from './LanguageContext.jsx';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'vela_labs_cart_v1';
const CART_SESSION_KEY = 'vela_cart_session_v1';
const CART_TIME_KEY = 'vela_cart_timestamp_v1';
const CART_MAX_AGE_MS = 2 * 60 * 60 * 1000; // 2 heures max pour un panier inactif

export function getProductCategory(l) {
  if (!l) return 'unknown';
  if (l.handle) return l.handle;
  const id = String(l.id || '');
  if (id.startsWith('vela-sculpt-sans-manches')) return 'vela-sculpt-sans-manches';
  if (id.startsWith('vela-sculpt-demi-manches')) return 'vela-sculpt-demi-manches';
  if (id.startsWith('vela-sculpt-manches-longues')) return 'vela-sculpt-manches-longues';
  if (id.startsWith('pack-decouverte')) return 'pack-decouverte';
  return id.split('-')[0] || 'product';
}

function getInitialCartLines() {
  if (typeof window === 'undefined') return [];
  try {
    const urlParams = new URLSearchParams(window.location.search);
    // 1. Visiteur arrivant via un lien pub (Facebook, Google, TikTok, UTMs) : départ d'un panier vierge
    const isAdLanding =
      urlParams.has('fbclid') ||
      urlParams.has('gclid') ||
      urlParams.has('ttclid') ||
      urlParams.has('utm_source');

    if (isAdLanding) {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CART_TIME_KEY);
      sessionStorage.setItem(CART_SESSION_KEY, String(Date.now()));
      return [];
    }

    // 2. Nouvelle visite / nouvel onglet (sessionStorage non initialisé)
    const isSessionActive = sessionStorage.getItem(CART_SESSION_KEY);
    if (!isSessionActive) {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CART_TIME_KEY);
      sessionStorage.setItem(CART_SESSION_KEY, String(Date.now()));
      return [];
    }

    // 3. Expiration d'inactivité (2 heures)
    const lastActive = localStorage.getItem(CART_TIME_KEY);
    if (lastActive && Date.now() - parseInt(lastActive, 10) > CART_MAX_AGE_MS) {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CART_TIME_KEY);
      return [];
    }

    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    // Nettoyage immédiat des éventuels résidus d'anciennes sessions : max 1 sélection par catégorie
    const deduped = [];
    const seenCategories = new Set();
    for (const item of parsed) {
      const cat = getProductCategory(item);
      if (!seenCategories.has(cat)) {
        seenCategories.add(cat);
        deduped.push({ ...item, handle: cat });
      }
    }
    return deduped;
  } catch {
    return [];
  }
}

// Cart lines: { id, variantId, title, detail, price, compareAt, qty, image, freeShipping }
export function CartProvider({ children }) {
  const languageCtx = useLanguage();
  const activeLang = languageCtx?.lang;
  const [lines, setLines] = useState(getInitialCartLines);

  const [open, setOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shopifyCart, setShopifyCart] = useState(null);

  // Open CartDrawer automatically when redirected back from Shopify Checkout cart icon (?cart=open)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('cart') === 'open') {
      setOpen(true);
      params.delete('cart');
      const nextSearch = params.toString();
      const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}${window.location.hash}`;
      window.history.replaceState({}, '', nextUrl);
    }
  }, []);

  // Sync to localStorage with timestamp
  useEffect(() => {
    try {
      if (lines.length > 0) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
        localStorage.setItem(CART_TIME_KEY, String(Date.now()));
      } else {
        localStorage.removeItem(CART_STORAGE_KEY);
        localStorage.removeItem(CART_TIME_KEY);
      }
    } catch {
      // Storage unavailable / quota exceeded
    }
  }, [lines]);

  // Synchronize cart with Shopify Storefront API to retrieve verified cost and checkout URL
  useEffect(() => {
    if (lines.length === 0) {
      setShopifyCart(null);
      return;
    }
    let cancelled = false;
    syncShopifyCart(lines, { locale: activeLang }).then((result) => {
      if (!cancelled && result) {
        setShopifyCart(result);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [lines, activeLang]);

  const value = useMemo(() => {
    const add = (line, options = {}) => {
      const lineQty = line.qty || 1;
      const shouldReplace = options.replace ?? true;

      setLines((prev) => {
        const targetCategory = line.handle || getProductCategory(line);
        // Toujours remplacer la configuration existante du même produit (évite d'accumuler 3 + 3 = 6 ou 12 débardeurs)
        if (shouldReplace && targetCategory) {
          const others = prev.filter((l) => getProductCategory(l) !== targetCategory);
          return [...others, { ...line, handle: targetCategory, qty: lineQty }];
        }
        const found = prev.find((l) => l.id === line.id);
        if (found) return prev.map((l) => (l.id === line.id ? { ...l, qty: l.qty + lineQty } : l));
        return [...prev, { ...line, handle: targetCategory, qty: lineQty }];
      });

      // Meta Pixel tracking (keep intact)
      trackAddToCart({
        id: line.handle || line.id,
        title: line.title,
        price: line.price,
        qty: lineQty,
      });

      // Shopify Analytics tracking
      try {
        const vId = resolveShopifyVariantId(line);
        trackShopifyAddToCart(shopifyCart?.cartId || '', [
          {
            handle: line.handle,
            productGid: SHOPIFY_PRODUCT_GIDS[line.handle] || SHOPIFY_PRODUCT_GIDS['vela-sculpt-sans-manches'],
            variantGid: `gid://shopify/ProductVariant/${vId}`,
            name: line.title || 'Vela Sculpt™',
            variantName: line.detail || 'Standard',
            price: String(line.price || '19.99'),
            quantity: lineQty,
          },
        ]);
      } catch (err) {
        console.warn('[Shopify Analytics] Add to cart track error:', err);
      }

      setOpen(true);
    };

    const setQty = (id, qty) =>
      setLines((prev) =>
        qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))
      );

    const clearCart = () => {
      setLines([]);
      setShopifyCart(null);
    };

    const checkout = (options = {}) => {
      if (lines.length === 0 || isCheckingOut) return;
      setIsCheckingOut(true);
      try {
        redirectToShopifyCheckout(lines, {
          locale: activeLang,
          shopifyCart,
          checkoutUrl: shopifyCart?.checkoutUrl,
          ...options,
        });
      } finally {
        setTimeout(() => {
          setIsCheckingOut(false);
        }, 3500);
      }
    };

    const count = lines.reduce((n, l) => n + l.qty, 0);
    const localTotal = lines.reduce((n, l) => n + l.qty * l.price, 0);
    const displayTotal =
      shopifyCart && typeof shopifyCart.subtotal === 'number' && shopifyCart.subtotal > 0
        ? shopifyCart.subtotal
        : localTotal;

    return {
      lines,
      open,
      setOpen,
      add,
      setQty,
      clearCart,
      checkout,
      isCheckingOut,
      count,
      total: localTotal,
      displayTotal,
      shopifyCart,
      shopifySubtotal: shopifyCart?.subtotal ?? null,
    };
  }, [lines, open, isCheckingOut, activeLang, shopifyCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
