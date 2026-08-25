import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, formatPrice, products, type Category } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Gadgets — Novexa" },
      {
        name: "description",
        content:
          "Filter and sort the full Novexa range: earbuds, smartwatches, speakers, power banks and desk chargers.",
      },
      { property: "og:title", content: "Shop All Gadgets — Novexa" },
      {
        property: "og:description",
        content: "Browse premium audio, wearables, power and desk accessories from Novexa.",
      },
    ],
  }),
  component: Shop,
});

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

const sorts: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

function Shop() {
  const [active, setActive] = useState<Category | "All">("All");
  const [maxPrice, setMaxPrice] = useState(400);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<Sort>("featured");

  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        (active === "All" || p.category === active) &&
        p.price <= maxPrice &&
        p.rating >= minRating,
    );
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [active, maxPrice, minRating, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="eyebrow">Catalogue</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          Everything we make
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Six products, no filler. Filter by category, price and rating to find the one that fits
          your setup.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[260px_1fr]">
        <Reveal as="aside" className="lg:sticky lg:top-24 lg:self-start">
          <div className="surface-panel space-y-8 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
            </div>

            <div>
              <p className="eyebrow">Category</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(["All", ...categories] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActive(c)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-xs transition-all duration-300 active:scale-95",
                      active === c
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="eyebrow">Max price</p>
                <span className="text-xs text-primary">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={80}
                max={400}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="Maximum price"
                className="mt-4 h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
              />
            </div>

            <div>
              <p className="eyebrow">Minimum rating</p>
              <div className="mt-4 flex gap-2">
                {[0, 4.5, 4.7, 4.8].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setMinRating(r)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs transition-all duration-300 active:scale-95",
                      minRating === r
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50",
                    )}
                  >
                    {r === 0 ? "Any" : `${r}+`}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setActive("All");
                setMaxPrice(400);
                setMinRating(0);
                setSort("featured");
              }}
              className="w-full rounded-full border border-border py-2.5 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              Reset filters
            </button>
          </div>
        </Reveal>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">{filtered.length}</span> product
              {filtered.length === 1 ? "" : "s"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sorts.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setSort(s.value)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs transition-all duration-300 active:scale-95",
                    sort === s.value
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="py-24 text-center text-sm text-muted-foreground">
              Nothing matches those filters yet. Try widening the price range.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p.slug} delay={i * 70}>
                  <ProductCard product={p} index={i} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
