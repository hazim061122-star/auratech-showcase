import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Studio — Novexa" },
      {
        name: "description",
        content:
          "How Novexa designs premium gadgets: hand-built first articles, published tuning curves and a five-year parts guarantee.",
      },
      { property: "og:title", content: "The Studio — Novexa" },
      {
        property: "og:description",
        content: "Inside the Novexa design studio: process, materials and repairability.",
      },
    ],
  }),
  component: About,
});

const timeline = [
  { year: "2019", title: "A basement and a CNC mill", body: "Two engineers, one borrowed anechoic chamber, and the first Pulse prototype." },
  { year: "2021", title: "Pulse Air ships", body: "12,000 units in the first quarter, entirely word of mouth." },
  { year: "2023", title: "Titanium program", body: "We bring wearables in-house and commit to grade-5 titanium cases." },
  { year: "2026", title: "Repairable by default", body: "Every current product ships with modular internals and a parts catalogue." },
];

function About() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          width={1920}
          height={1080}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <Reveal>
            <p className="eyebrow">The studio</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-6xl">
              Hardware should earn its <span className="text-gradient">place</span> on your desk.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Novexa is a small design and engineering studio making a deliberately short list of
              products. We would rather ship six things we obsess over than sixty we tolerate.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
        <div className="space-y-4">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 90}>
              <div className="surface-panel grid gap-4 rounded-2xl p-7 transition-colors duration-300 hover:border-primary/50 sm:grid-cols-[120px_1fr]">
                <span className="font-display text-2xl font-semibold text-gradient">{t.year}</span>
                <div>
                  <h2 className="font-display text-lg font-semibold">{t.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-16 text-center">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 active:scale-95"
            >
              See what we build
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
