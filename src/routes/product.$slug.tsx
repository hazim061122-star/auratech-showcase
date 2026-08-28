import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";
import { Reviews } from "@/components/site/Reviews";
import { StarRating } from "@/components/site/StarRating";
import { Viewer360 } from "@/components/site/Viewer360";
import { ProductCard } from "@/components/site/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice, getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useProductReviews } from "@/lib/reviews";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable — Novexa" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${product.tagline} | Novexa`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description.slice(0, 155) },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  // Remount on slug change so all local state (color, qty, gallery) resets
  return <ProductDetailView key={product.slug} />;
}

function ProductDetailView() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const { summary } = useProductReviews(product.slug);
  const [color, setColor] = useState(product.colors[0]!);
  const [qty, setQty] = useState(1);

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <Link
        to="/shop"
        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Back to shop
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <Viewer3D kind={product.model} name={product.name} />
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{product.tagline}</p>

          <div className="mt-5 flex items-center gap-2 text-sm">
            <StarRating value={summary.average} size={16} />
            <span className="text-foreground">{summary.average.toFixed(1)}</span>
            <a href="#reviews" className="text-muted-foreground transition-colors hover:text-primary">
              · {summary.total} reviews
            </a>
          </div>

          <div className="mt-7 flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8">
            <p className="eyebrow">Finish</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-all duration-300 active:scale-95",
                    color === c
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50",
                  )}
                >
                  {color === c && <Check className="h-3.5 w-3.5" />}
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-border p-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-primary active:scale-90"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(9, q + 1))}
                aria-label="Increase quantity"
                className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-primary active:scale-90"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                add(product.slug, qty, color);
                toast.success(`${qty} × ${product.name} (${color}) added`);
              }}
              className="flex-1 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 active:scale-95 sm:flex-none"
            >
              Add to cart · {formatPrice(product.price * qty)}
            </button>
            <Link
              to="/checkout"
              onClick={() => add(product.slug, qty, color)}
              className="rounded-full border border-border px-8 py-3.5 text-sm transition-colors hover:border-primary/60 hover:text-primary"
            >
              Buy now
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { icon: Truck, label: "Free 2-day shipping over RM 500" },
              { icon: ShieldCheck, label: "5-year parts guarantee" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 rounded-xl border border-border/70 bg-surface/40 px-4 py-3 text-xs text-muted-foreground"
              >
                <f.icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.6} />
                {f.label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* SPEC TABS */}
      <Reveal className="mt-20">
        <Tabs defaultValue="specs">
          <TabsList className="bg-surface">
            <TabsTrigger value="specs">Specs</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
            <TabsTrigger value="box">In the box</TabsTrigger>
          </TabsList>

          <TabsContent value="specs" className="mt-6">
            <dl className="surface-panel grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-6 bg-card px-6 py-5 text-sm">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="text-right text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </TabsContent>

          <TabsContent value="highlights" className="mt-6">
            <ul className="surface-panel space-y-4 rounded-2xl p-7 text-sm">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{h}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="box" className="mt-6">
            <ul className="surface-panel space-y-4 rounded-2xl p-7 text-sm">
              {product.inBox.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-1 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </Reveal>

      <Reviews slug={product.slug} productName={product.name} />

      {/* RELATED */}
      <section className="mt-24">
        <Reveal>
          <p className="eyebrow">Pairs well with</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Complete the setup
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
