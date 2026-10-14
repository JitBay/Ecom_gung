import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

// Cart lines: { id, title, detail, price, compareAt, qty }
export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [open, setOpen] = useState(false);

  const value = useMemo(() => {
    const add = (line) => {
      setLines((prev) => {
        const found = prev.find((l) => l.id === line.id);
        if (found) return prev.map((l) => (l.id === line.id ? { ...l, qty: l.qty + 1 } : l));
        return [...prev, { ...line, qty: 1 }];
      });
      setOpen(true);
    };
    const setQty = (id, qty) =>
      setLines((prev) => (qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))));
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((n, l) => n + l.qty * l.price, 0);
    return { lines, open, setOpen, add, setQty, count, total };
  }, [lines, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
