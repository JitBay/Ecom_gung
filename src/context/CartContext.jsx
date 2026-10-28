import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { redirectToShopifyCheckout } from '../lib/shopify.js';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'vela_labs_cart_v1';

// Cart lines: { id, variantId, title, detail, price, compareAt, qty, image, freeShipping }
export function CartProvider({ children }) {
  const [lines, setLines] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [open, setOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage unavailable / quota exceeded
    }
  }, [lines]);

  const value = useMemo(() => {
    const add = (line) => {
      setLines((prev) => {
        const found = prev.find((l) => l.id === line.id);
        if (found) return prev.map((l) => (l.id === line.id ? { ...l, qty: l.qty + (line.qty || 1) } : l));
        return [...prev, { ...line, qty: line.qty || 1 }];
      });
      setOpen(true);
    };

    const setQty = (id, qty) =>
      setLines((prev) =>
        qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))
      );

    const clearCart = () => setLines([]);

    const checkout = async (options = {}) => {
      if (lines.length === 0 || isCheckingOut) return;
      setIsCheckingOut(true);
      try {
        await redirectToShopifyCheckout(lines, options);
      } finally {
        setIsCheckingOut(false);
      }
    };

    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((n, l) => n + l.qty * l.price, 0);

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
      total,
    };
  }, [lines, open, isCheckingOut]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
