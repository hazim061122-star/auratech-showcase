import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BatteryCharging, Radio, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import heroBg from "@/assets/hero-bg.jpg";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Novexa — Gadgets Engineered to Feel Inevitable" },
      {
        name: "description",
        content:
          "Wireless earbuds, titanium smartwatches, 360° speakers and GaN power. Novexa builds premium tech accessories with obsessive detail.",
      },
      { property: "og:title", content: "Novexa — Gadgets Engineered to Feel Inevitable" },
      {
        property: "og:description",
        content: "Premium wireless audio, wearables and power accessories from Novexa Labs.",
      },
    ],
  }),
  component: Home,
});

const usps = [
  {
    icon: Radio,
    title: "Acoustic-first engineering",
    body: "Every driver is tuned in an anechoic chamber against a reference curve we published openly.",
  },
  {
    icon: BatteryCharging,
    title: "Power that outlasts you",
    body: "Silicon-anode cells and adaptive draw give our devices days, not hours, of real-world use.",
  },
  {
    icon: ShieldCheck,
    title: "Repairable by design",
    body: "Modular internals, standard screws and a five-year parts guarantee on every product.",
  },
];

const testimonials = [
  {
    quote:
      "The Pulse Air Pro is the first pair of buds I've forgotten I was wearing. The ANC is uncanny.",
    name: "Mara Ellison",
    role: "Sound designer",
  },
  {
    quote:
      "Chrono X1 replaced two devices on my wrist and still ends the week above 40 percent battery.",
    name: "Devin Okafor",
    role: "Ultra runner",
  },
  {
    quote: "Novexa's packaging and unboxing feels like opening a piece of hardware from 2035.",
    name: "Su-Jin Park",
    role: "Industrial designer",
  },
];

function Home() {
  const [email, setEmail] = useState("");
  const featured = products.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="pointer-events-none absolute inset-0 grid-backdrop" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-32 lg:pt-32">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-1.5 text-xs tracking-wide text-primary">
                <Sparkles className="h-3.5 w-3.5" /> New — Chrono X1 titanium
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-7 font-display text-5xl font-bold leading-[0.95] text-foreground drop-shadow-[0_0_28px_oklch(0.7_0.15_220/0.35)] sm:text-6xl lg:text-7xl">
                Gadgets that feel <span className="text-gradient">inevitable</span>.
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Audio, wearables and power built around one question: how should this feel in the
                first three seconds? Everything else follows from the answer.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 active:scale-95"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-7 py-3.5 text-sm text-foreground backdrop-blur transition-all duration-300 hover:border-primary/60 hover:text-primary"
                >
                  Explore the range
                </Link>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
                {[
                  ["4.8/5", "Average rating"],
                  ["120k+", "Units shipped"],
                  ["5 yr", "Parts guarantee"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="font-display text-2xl font-semibold text-foreground">{v}</dt>
                    <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-4 rounded-full bg-primary/25 blur-3xl" />
              <div className="absolute -right-2 bottom-8 h-40 w-40 rounded-full bg-accent/25 blur-3xl" />
              <img
                src={products[0]!.image}
                alt="Pulse Air Pro wireless earbuds"
                width={1024}
                height={1024}
                className="relative h-full w-full animate-float rounded-[2rem] object-cover glow-ring"
              />
              <div className="surface-panel absolute -left-4 bottom-10 flex animate-float items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur-xl [animation-delay:600ms]">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Star className="h-4 w-4 fill-current" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">4.8 / 5</span>
                  <span className="block text-[11px] text-muted-foreground">2,400+ reviews</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative overflow-hidden border-y border-border bg-surface/40 py-4">
          <div className="flex w-max animate-marquee gap-12 pr-12">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex gap-12">
                {[
                  "Adaptive ANC",
                  "Titanium builds",
                  "140W GaN",
                  "Free 2-day shipping",
                  "5-year parts",
                  "Carbon neutral delivery",
                ].map((t) => (
                  <span
                    key={t + dup}
                    className="eyebrow whitespace-nowrap text-foreground/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">Featured</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold sm:text-5xl">
              Three products doing the heavy lifting
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 text-sm text-primary transition-colors"
            >
              View all products
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* STORY / USP */}
      <section className="relative overflow-hidden border-y border-border bg-surface/30">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">The studio</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              We prototype in metal before we ever draw a landing page.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Novexa started in a Copenhagen basement with a CNC mill, a borrowed anechoic chamber
              and a stubborn belief that consumer electronics had stopped feeling special. Six
              years later we still build every first article by hand before it sees a factory.
            </p>
            <div className="mt-8 space-y-5">
              {usps.map((u, i) => (
                <Reveal key={u.title} delay={i * 110}>
                  <div className="flex gap-4 rounded-2xl border border-border/70 bg-background/40 p-5 transition-colors duration-300 hover:border-primary/50">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                      <u.icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold">{u.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {u.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {products.slice(1, 5).map((p, i) => (
                <div
                  key={p.slug}
                  className={`surface-panel overflow-hidden rounded-2xl ${i % 2 === 1 ? "translate-y-8" : ""}`}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="eyebrow">Field notes</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
            What people say after month three
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 110}>
              <figure className="surface-panel h-full rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1.5">
                <div className="flex gap-1 text-primary">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-primary" />
                  ))}
                </div>
                <blockquote className="mt-5 text-base leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-5 text-sm">
                  <span className="font-medium text-foreground">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-5 pb-28 sm:px-8">
        <Reveal className="mx-auto max-w-5xl">
          <div className="surface-panel relative overflow-hidden rounded-3xl px-7 py-14 text-center sm:px-14">
            <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-70" />
            <div className="relative">
              <p className="eyebrow">Dispatch</p>
              <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
                Get the drop list before anyone else
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
                One email a month: new hardware, teardown notes, and early access windows. No
                noise.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!email.includes("@")) {
                    toast.error("Enter a valid email address");
                    return;
                  }
                  toast.success("You're on the list — welcome to Novexa.");
                  setEmail("");
                }}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  aria-label="Email address"
                  className="h-12 flex-1 rounded-full border border-border bg-background/60 px-5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/70"
                />
                <button
                  type="submit"
                  className="h-12 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
