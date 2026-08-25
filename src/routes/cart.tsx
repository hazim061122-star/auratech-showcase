import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Novexa" },
      { name: "description", content: "Review the Novexa gadgets in your cart before checkout." },
      { property: "og:title", content: "Your Cart — Novexa" },
      { property: "og:description", content: "Review your Novexa order before checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, subtotal, shipping, tax, total, setQty, remove } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="eyebrow">Bag</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Your cart</h1>
      </Reveal>

      {detailed.length === 0 ? (
        <Reveal delay={100}>
          <div className="surface-panel mt-12 rounded-3xl px-8 py-20 text-center">
            <p className="font-display text-xl">Nothing here yet.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Pick something out — the earbuds are a good place to start.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 active:scale-95"
            >
              Browse products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div className="space-y-4">
            {detailed.map((line, i) => (
              <Reveal key={line.product.slug + line.color} delay={i * 70}>
                <div className="surface-panel flex gap-5 rounded-2xl p-4 transition-colors hover:border-primary/40">
                  <Link
                    to="/product/$slug"
                    params={{ slug: line.product.slug }}
                    className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-background"
                  >
                    <img
                      src={line.product.image}
                      alt={line.product.name}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-display text-lg font-semibold">{line.product.name}</h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {line.color} · {line.product.category}
                        </p>
                      </div>
                      <p className="font-display text-lg">{formatPrice(line.lineTotal)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-border p-1">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQty(line.product.slug, line.color, line.qty - 1)}
                          className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary active:scale-90"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm">{line.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQty(line.product.slug, line.color, line.qty + 1)}
                          className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary active:scale-90"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.product.slug, line.color)}
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="lg:sticky lg:top-24">
            <div className="surface-panel space-y-4 rounded-2xl p-7">
              <h2 className="font-display text-lg font-semibold">Summary</h2>
              <dl className="space-y-3 text-sm">
                {[
                  ["Subtotal", formatPrice(subtotal)],
                  ["Shipping", shipping === 0 ? "Free" : formatPrice(shipping)],
                  ["Estimated tax", formatPrice(tax)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex justify-between border-t border-border pt-4 font-display text-xl">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 active:scale-95"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-center text-xs text-muted-foreground">
                Simulated checkout — no payment is taken.
              </p>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}
