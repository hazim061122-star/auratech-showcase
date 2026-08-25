import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, CreditCard, Loader2, MapPin, PartyPopper, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Novexa" },
      { name: "description", content: "Simulated Novexa checkout flow. No payment is processed." },
      { property: "og:title", content: "Checkout — Novexa" },
      { property: "og:description", content: "Complete your simulated Novexa order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const steps = [
  { id: 0, label: "Contact", icon: User },
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
] as const;

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        {...props}
        className="mt-2 h-12 w-full rounded-xl border border-border bg-background/60 px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/70"
      />
    </label>
  );
}

function Checkout() {
  const { detailed, subtotal, shipping, tax, total, clear } = useCart();
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const placeOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
      clear();
      toast.success("Order confirmed — simulated payment approved");
    }, 1600);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-28 text-center sm:px-8">
        <Reveal>
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary">
            <PartyPopper className="h-7 w-7" />
          </span>
          <h1 className="mt-8 font-display text-4xl font-semibold">Order confirmed</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Reference <span className="text-primary">NVX-{Math.floor(Math.random() * 90000) + 10000}</span>
            . This is a portfolio demo, so nothing was charged and nothing will ship — but the flow
            is complete.
          </p>
          <Link
            to="/shop"
            className="mt-9 inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 active:scale-95"
          >
            Keep browsing
          </Link>
        </Reveal>
      </div>
    );
  }

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-28 text-center sm:px-8">
        <h1 className="font-display text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">Add a product before checking out.</p>
        <Link
          to="/shop"
          className="mt-8 inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="eyebrow">Checkout</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Almost yours</h1>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <Reveal>
          <div className="surface-panel rounded-2xl p-7">
            <div className="flex items-center gap-3">
              {steps.map((s, i) => (
                <div key={s.id} className="flex flex-1 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(s.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-all duration-300",
                      step === s.id
                        ? "border-primary bg-primary/15 text-primary"
                        : step > s.id
                          ? "border-primary/40 text-primary/80"
                          : "border-border text-muted-foreground",
                    )}
                  >
                    {step > s.id ? <Check className="h-3.5 w-3.5" /> : <s.icon className="h-3.5 w-3.5" />}
                    {s.label}
                  </button>
                  {i < steps.length - 1 && (
                    <span
                      className={cn(
                        "hidden h-px flex-1 transition-colors duration-500 sm:block",
                        step > s.id ? "bg-primary/60" : "bg-border",
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            <div key={step} className="mt-8 animate-page-in space-y-5">
              {step === 0 && (
                <>
                  <Field label="Full name" placeholder="Alex Rivera" autoComplete="name" />
                  <Field label="Email" type="email" placeholder="you@domain.com" />
                  <Field label="Phone" placeholder="+1 555 0134" />
                </>
              )}
              {step === 1 && (
                <>
                  <Field label="Address" placeholder="184 Harbour Lane" />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="City" placeholder="Copenhagen" />
                    <Field label="Postal code" placeholder="1050" />
                  </div>
                  <Field label="Country" placeholder="Denmark" />
                </>
              )}
              {step === 2 && (
                <>
                  <Field label="Card number" placeholder="4242 4242 4242 4242" inputMode="numeric" />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Expiry" placeholder="09 / 29" />
                    <Field label="CVC" placeholder="123" inputMode="numeric" />
                  </div>
                  <p className="rounded-xl border border-border/70 bg-surface/50 px-4 py-3 text-xs text-muted-foreground">
                    Demo mode: any details work and no request leaves your browser.
                  </p>
                </>
              )}
            </div>

            <div className="mt-8 flex gap-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="rounded-full border border-border px-6 py-3 text-sm transition-colors hover:border-primary/60 hover:text-primary"
                >
                  Back
                </button>
              )}
              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  className="flex-1 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 active:scale-95"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  disabled={processing}
                  onClick={placeOrder}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 active:scale-95 disabled:opacity-70"
                >
                  {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                  {processing ? "Processing" : `Pay ${formatPrice(total)}`}
                </button>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:sticky lg:top-24">
          <div className="surface-panel space-y-5 rounded-2xl p-7">
            <h2 className="font-display text-lg font-semibold">Order summary</h2>
            <ul className="space-y-4">
              {detailed.map((l) => (
                <li key={l.product.slug + l.color} className="flex gap-4">
                  <img
                    src={l.product.image}
                    alt={l.product.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-foreground">{l.product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {l.color} · Qty {l.qty}
                    </p>
                  </div>
                  <span className="text-sm">{formatPrice(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl className="space-y-3 border-t border-border pt-5 text-sm">
              {[
                ["Subtotal", formatPrice(subtotal)],
                ["Shipping", shipping === 0 ? "Free" : formatPrice(shipping)],
                ["Tax", formatPrice(tax)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
              <div className="flex justify-between border-t border-border pt-4 font-display text-xl">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
