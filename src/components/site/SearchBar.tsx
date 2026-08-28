import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatPrice, products } from "@/lib/products";
import { cn } from "@/lib/utils";

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q),
    )
    .slice(0, 6);
}

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => searchProducts(q), [q]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => {
    setOpen(false);
    setQ("");
  };

  return (
    <div ref={wrapRef} className="relative">
      <div
        className={cn(
          "flex items-center overflow-hidden rounded-full border border-border bg-surface transition-all duration-500 ease-out",
          open ? "w-52 sm:w-72 border-primary/50" : "w-10",
        )}
      >
        <button
          type="button"
          aria-label={open ? "Search products" : "Open search"}
          onClick={() => (open ? inputRef.current?.focus() : setOpen(true))}
          className="grid h-10 w-10 shrink-0 place-items-center text-muted-foreground transition-colors hover:text-primary"
        >
          <Search className="h-4 w-4" strokeWidth={1.7} />
        </button>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results[0]) {
              navigate({ to: "/product/$slug", params: { slug: results[0].slug } });
              close();
            }
          }}
          placeholder="Search gadgets…"
          aria-label="Search products"
          className={cn(
            "h-10 w-full bg-transparent pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground",
            !open && "pointer-events-none",
          )}
        />
        {open && q && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQ("")}
            className="grid h-10 w-9 shrink-0 place-items-center text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && q.trim() && (
        <div className="surface-panel absolute right-0 top-12 z-50 w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl p-2">
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              No products match “{q}”.
            </p>
          ) : (
            <>
              {results.map((p) => (
                <Link
                  key={p.slug}
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  onClick={close}
                  className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-primary/10"
                >
                  <img
                    src={p.image}
                    alt=""
                    aria-hidden
                    className="h-11 w-11 shrink-0 rounded-lg object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-foreground">{p.name}</span>
                    <span className="block text-xs text-muted-foreground">{p.category}</span>
                  </span>
                  <span className="text-sm text-primary">{formatPrice(p.price)}</span>
                </Link>
              ))}
              <Link
                to="/shop"
                search={{ q: q.trim() }}
                onClick={close}
                className="mt-1 block rounded-xl px-3 py-2.5 text-center text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                See all results in shop
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
