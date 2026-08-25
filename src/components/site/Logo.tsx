import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="NOVEXA home">
      <span className="relative grid h-8 w-8 place-items-center rounded-md border border-primary/40 bg-primary/10 transition-transform duration-500 group-hover:rotate-[18deg]">
        <span className="block h-3 w-3 rotate-45 rounded-[3px] bg-gradient-to-br from-primary to-accent" />
      </span>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-[0.32em] text-foreground">
          NOVEXA
        </span>
      )}
    </Link>
  );
}
