import { Link } from "@tanstack/react-router";
import { Github, Instagram, Twitter } from "lucide-react";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All products", to: "/shop" },
      { label: "Cart", to: "/cart" },
      { label: "Checkout", to: "/checkout" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About Novexa", to: "/about" },
      { label: "Design process", to: "/about" },
      { label: "Sustainability", to: "/about" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface/40">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Novexa builds sound, time and power tools for people who care how the small things
              feel. Designed in Copenhagen, engineered in Taipei.
            </p>
            <div className="mt-6 flex gap-2">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <span
                  key={i}
                  className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.6} />
                </span>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="eyebrow">Portfolio note</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              This is a concept storefront built as a front-end showcase. Products, pricing and
              checkout are simulated — no payments are processed.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Novexa Labs. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Concept build · Not a real store</p>
        </div>
      </div>
    </footer>
  );
}
