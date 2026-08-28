import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export const MAX_COMPARE = 3;

type CompareCtx = {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => boolean;
  remove: (slug: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CompareCtx | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const toggle = useCallback(
    (slug: string) => {
      let ok = true;
      setSlugs((prev) => {
        if (prev.includes(slug)) return prev.filter((s) => s !== slug);
        if (prev.length >= MAX_COMPARE) {
          ok = false;
          return prev;
        }
        return [...prev, slug];
      });
      return ok;
    },
    [],
  );

  const remove = useCallback((slug: string) => {
    setSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => {
    setSlugs([]);
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ slugs, has, toggle, remove, clear, open, setOpen }),
    [slugs, has, toggle, remove, clear, open],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCompare() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
