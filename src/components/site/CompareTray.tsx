import { Link } from "@tanstack/react-router";
import { GitCompare, X } from "lucide-react";
import { MAX_COMPARE, useCompare } from "@/lib/compare";
import { formatPrice, getProduct } from "@/lib/products";
import { useProductReviews } from "@/lib/reviews";
import { StarRating } from "./StarRating";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function RatingCell({ slug }: { slug: string }) {
  const { summary } = useProductReviews(slug);
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <StarRating value={summary.average} size={13} />
      <span className="text-foreground">{summary.average.toFixed(1)}</span>
      <span>({summary.total})</span>
    </div>
  );
}

export function CompareTray() {
  const { slugs, remove, clear, open, setOpen } = useCompare();
  const items = slugs.map((s) => getProduct(s)).filter((p) => !!p);

  if (items.length === 0) return null;

  const specLabels = Array.from(
    new Set(items.flatMap((p) => p.specs.map((s) => s.label))),
  );

  return (
    <>
      <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
        <div className="surface-panel flex items-center gap-3 rounded-full py-2 pl-3 pr-2 backdrop-blur-xl">
          <div className="flex -space-x-2">
            {items.map((p) => (
              <img
                key={p.slug}
                src={p.image}
                alt=""
                aria-hidden
                className="h-9 w-9 rounded-full border border-border object-cover"
              />
            ))}
          </div>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {items.length} of {MAX_COMPARE} selected
          </span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 active:scale-95"
          >
            <GitCompare className="h-4 w-4" /> Compare ({items.length})
          </button>
          <button
            type="button"
            onClick={clear}
            aria-label="Clear comparison"
            className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[88vh] max-w-4xl overflow-y-auto border-border bg-card">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Compare products</DialogTitle>
          </DialogHeader>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-32 p-3 text-left align-bottom">
                    <span className="eyebrow">Product</span>
                  </th>
                  {items.map((p) => (
                    <th key={p.slug} className="p-3 text-left align-bottom">
                      <div className="space-y-2">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-24 w-full rounded-xl object-cover"
                        />
                        <Link
                          to="/product/$slug"
                          params={{ slug: p.slug }}
                          onClick={() => setOpen(false)}
                          className="block font-display text-base font-semibold text-foreground hover:text-primary"
                        >
                          {p.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => remove(p.slug)}
                          className="text-xs text-muted-foreground hover:text-destructive"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-3 text-muted-foreground">Price</td>
                  {items.map((p) => (
                    <td key={p.slug} className="p-3 font-display text-base text-foreground">
                      {formatPrice(p.price)}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 text-muted-foreground">Rating</td>
                  {items.map((p) => (
                    <td key={p.slug} className="p-3">
                      <RatingCell slug={p.slug} />
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 text-muted-foreground">Category</td>
                  {items.map((p) => (
                    <td key={p.slug} className="p-3 text-foreground">
                      {p.category}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 text-muted-foreground">Colours</td>
                  {items.map((p) => (
                    <td key={p.slug} className="p-3 text-foreground">
                      {p.colors.join(", ")}
                    </td>
                  ))}
                </tr>
                {specLabels.map((label) => (
                  <tr key={label} className="border-t border-border">
                    <td className="p-3 text-muted-foreground">{label}</td>
                    {items.map((p) => (
                      <td key={p.slug} className="p-3 text-foreground">
                        {p.specs.find((s) => s.label === label)?.value ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
