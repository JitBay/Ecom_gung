import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { redirectToShopifyCheckout, resolveShopifyVariantId, syncShopifyCart } from '../lib/shopify.js';
import { trackAddToCart } from '../lib/analytics.js';
import { SHOPIFY_PRODUCT_GIDS, trackShopifyAddToCart } from '../lib/shopifyAnalytics.js';
import { useLanguage } from './LanguageContext.jsx';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'vela_labs_cart_v1';
const CART_SESSION_KEY = 'vela_cart_session_v1';

// Cart lines: { id, variantId, title, detail, price, compareAt, qty, image, freeShipping }
export function CartProvider({ children }) {
  const languageCtx = useLanguage();
  const activeLang = languageCtx?.lang;
  const [lines, setLines] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      // Vérifier si la session courante est active dans sessionStorage
      const isSessionActive = sessionStorage.getItem(CART_SESSION_KEY);
      if (!isSessionActive) {
        // Nouvelle visite / nouvel onglet : on repart d'un panier propre
        localStorage.removeItem(CART_STORAGE_KEY);
        sessionStorage.setItem(CART_SESSION_KEY, '1');
        return [];
      }
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

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

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
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
        const itemHandle = line.handle || (line.id ? line.id.split('-').slice(0, 2).join('-') : null);
        // Remplacer la configuration existante du même produit (évite d'accumuler 3 + 3 + 3 = 12 articles)
        if (shouldReplace && itemHandle) {
          const others = prev.filter((l) => (l.handle || l.id.split('-').slice(0, 2).join('-')) !== itemHandle);
          return [...others, { ...line, handle: itemHandle, qty: lineQty }];
        }
        const found = prev.find((l) => l.id === line.id);
        if (found) return prev.map((l) => (l.id === line.id ? { ...l, qty: l.qty + lineQty } : l));
        return [...prev, { ...line, qty: lineQty }];
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
