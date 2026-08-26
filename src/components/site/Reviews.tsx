import { useState } from "react";
import { BadgeCheck, PenLine, Star } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";
import { StarRating } from "@/components/site/StarRating";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatReviewDate, useProductReviews } from "@/lib/reviews";
import { cn } from "@/lib/utils";

export function Reviews({ slug, productName }: { slug: string; productName: string }) {
  const { reviews, summary, addReview } = useProductReviews(slug);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(4);

  return (
    <section className="mt-24" id="reviews">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">What owners say</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Customer reviews</h2>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition-all duration-300 hover:border-primary/60 hover:text-primary active:scale-95"
        >
          <PenLine className="h-4 w-4" /> Write a review
        </button>
      </Reveal>

      <Reveal delay={80} className="mt-8">
        <div className="surface-panel grid gap-8 rounded-2xl p-7 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-10">
          <div className="text-center sm:text-left">
            <p className="font-display text-6xl font-semibold leading-none">
              {summary.average.toFixed(1)}
            </p>
            <StarRating value={summary.average} size={18} className="mt-3 justify-center sm:justify-start" />
            <p className="mt-2 text-xs text-muted-foreground">
              Based on {summary.total} {summary.total === 1 ? "review" : "reviews"}
            </p>
          </div>

          <div className="space-y-2.5">
            {summary.distribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-3 text-xs">
                <span className="flex w-10 shrink-0 items-center gap-1 text-muted-foreground">
                  {d.stars}
                  <Star className="h-3 w-3 fill-primary text-primary" />
                </span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <span
                    className="block h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
                    style={{ width: `${d.percent}%` }}
                  />
                </span>
                <span className="w-8 shrink-0 text-right text-muted-foreground">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {reviews.slice(0, visible).map((r, i) => (
          <Reveal key={r.id} delay={i * 70}>
            <article className="surface-panel h-full rounded-2xl p-6 transition-all duration-300 hover:glow-ring">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary">
                    {r.name.trim().charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{formatReviewDate(r.date)}</p>
                  </div>
                </div>
                <StarRating value={r.rating} />
              </div>

              <h3 className="mt-4 font-display text-base font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>

              {r.verified && (
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] text-primary">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified purchase
                </span>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      {visible < reviews.length && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + 4)}
            className="rounded-full border border-border px-7 py-3 text-sm transition-colors hover:border-primary/60 hover:text-primary"
          >
            Show more reviews
          </button>
        </div>
      )}

      <ReviewDialog
        open={open}
        onOpenChange={setOpen}
        productName={productName}
        onSubmit={(data) => {
          addReview?.({ slug, ...data });
          toast.success("Thanks! Your review is live.");
          setOpen(false);
        }}
      />
    </section>
  );
}

function ReviewDialog({
  open,
  onOpenChange,
  productName,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  productName: string;
  onSubmit: (data: { name: string; rating: number; title: string; body: string }) => void;
}) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) {
          setRating(5);
          setName("");
          setTitle("");
          setBody("");
        }
      }}
    >
      <DialogContent className="surface-panel sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Write a review</DialogTitle>
          <DialogDescription>Share your experience with {productName}.</DialogDescription>
        </DialogHeader>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim() || !title.trim() || !body.trim()) {
              toast.error("Please fill in your name, a title and your review.");
              return;
            }
            onSubmit({ name: name.trim(), rating, title: title.trim(), body: body.trim() });
          }}
        >
          <div>
            <p className="eyebrow">Your rating</p>
            <div className="mt-2 flex gap-1" onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`${i} star${i > 1 ? "s" : ""}`}
                  onMouseEnter={() => setHover(i)}
                  onClick={() => setRating(i)}
                  className="transition-transform duration-200 hover:scale-110 active:scale-90"
                >
                  <Star
                    className={cn(
                      "h-7 w-7",
                      (hover || rating) >= i
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/40",
                    )}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
          </div>

          <Field label="Name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Nurul A."
              className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
            />
          </Field>

          <Field label="Review title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sum it up in a few words"
              className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
            />
          </Field>

          <Field label="Your review">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="What did you like or dislike?"
              className="w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
            />
          </Field>

          <button
            type="submit"
            className="w-full rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 active:scale-95"
          >
            Submit review
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}
