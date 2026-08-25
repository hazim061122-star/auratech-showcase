import { Link } from "@tanstack/react-router";
import { Eye, Plus, Star } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { QuickView } from "./QuickView";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [quick, setQuick] = useState(false);
  const { add } = useCart();

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 8, y: px * 10 });
  };

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ perspective: "1200px", ["--reveal-delay" as string]: `${index * 70}ms` }}
        className="group relative"
      >
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
          }}
          className="surface-panel relative overflow-hidden rounded-2xl transition-[transform,box-shadow] duration-300 ease-out group-hover:glow-ring"
        >
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="block"
            aria-label={product.name}
          >
            <div className="relative aspect-square overflow-hidden bg-background/60">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-0"
              />
              <img
                src={product.altImage}
                alt=""
                aria-hidden
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full border border-primary/40 bg-background/70 px-3 py-1 text-[11px] font-medium tracking-wide text-primary backdrop-blur">
                  {product.badge}
                </span>
              )}
            </div>
          </Link>

          <div className="relative space-y-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link to="/product/$slug" params={{ slug: product.slug }}>
                  <h3 className="font-display text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                    {product.name}
                  </h3>
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">{product.category}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-lg font-semibold">{formatPrice(product.price)}</p>
                {product.compareAt && (
                  <p className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.compareAt)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="text-foreground">{product.rating}</span>
              <span>· {product.reviews} reviews</span>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  add(product.slug, 1, product.colors[0]);
                  toast.success(`${product.name} added to cart`);
                }}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 active:scale-95"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
              <button
                type="button"
                onClick={() => setQuick(true)}
                aria-label={`Quick view ${product.name}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary active:scale-95"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <QuickView product={product} open={quick} onOpenChange={setQuick} />
    </>
  );
}
