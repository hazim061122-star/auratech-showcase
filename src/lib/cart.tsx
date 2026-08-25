import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartLine = { slug: string; qty: number; color: string };

type CartContextValue = {
  lines: CartLine[];
  detailed: { product: Product; qty: number; color: string; lineTotal: number }[];
  count: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  add: (slug: string, qty?: number, color?: string) => void;
  setQty: (slug: string, color: string, qty: number) => void;
  remove: (slug: string, color: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "novexa-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((slug: string, qty = 1, color = "Carbon") => {
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug && l.color === color);
      if (found) {
        return prev.map((l) => (l === found ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { slug, qty, color }];
    });
  }, []);

  const setQty = useCallback((slug: string, color: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.slug === slug && l.color === color))
        : prev.map((l) => (l.slug === slug && l.color === color ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((slug: string, color: string) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.color === color)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const detailed = lines.flatMap((l) => {
      const product = products.find((p) => p.slug === l.slug);
      if (!product) return [];
      return [{ product, qty: l.qty, color: l.color, lineTotal: product.price * l.qty }];
    });
    const subtotal = detailed.reduce((sum, l) => sum + l.lineTotal, 0);
    const shipping = subtotal === 0 || subtotal >= 250 ? 0 : 12;
    const tax = Math.round(subtotal * 0.08);
    return {
      lines,
      detailed,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax,
      add,
      setQty,
      remove,
      clear,
    };
  }, [lines, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
