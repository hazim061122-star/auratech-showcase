import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function QuickView({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { add } = useCart();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-border bg-card p-0 sm:max-w-3xl">
        <div className="grid gap-0 sm:grid-cols-2">
          <div className="relative aspect-square overflow-hidden bg-background">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 p-6">
            <DialogHeader className="space-y-1 text-left">
              <p className="eyebrow">{product.category}</p>
              <DialogTitle className="font-display text-2xl">{product.name}</DialogTitle>
            </DialogHeader>
            <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {product.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>
            <p className="font-display text-2xl">{formatPrice(product.price)}</p>
            <div className="mt-auto flex gap-2">
              <button
                type="button"
                onClick={() => {
                  add(product.slug, 1, product.colors[0]);
                  toast.success(`${product.name} added to cart`);
                  onOpenChange(false);
                }}
                className="flex-1 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 active:scale-95"
              >
                Add to cart
              </button>
              <Link
                to="/product/$slug"
                params={{ slug: product.slug }}
                onClick={() => onOpenChange(false)}
                className="rounded-full border border-border px-5 py-3 text-sm text-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
