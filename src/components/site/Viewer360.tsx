import { RotateCw } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  image: string;
  name: string;
  badge?: string | undefined;
};

/**
 * Pseudo-360° viewer: click-and-drag (or touch-drag) rotates the product by
 * cycling the image through a series of tilt/rotate transforms, faking a
 * turntable spin. Auto-spins slowly when idle and pauses while dragging.
 */
export function Viewer360({ image, name, badge }: Props) {
  const [angle, setAngle] = useState(0); // degrees, -180..180 feel
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const dragState = useRef<{ startX: number; startAngle: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragState.current = { startX: e.clientX, startAngle: angle };
      setDragging(true);
      setInteracted(true);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [angle],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const s = dragState.current;
    if (!s) return;
    const delta = e.clientX - s.startX;
    setAngle(s.startAngle + delta * 0.5);
  }, []);

  const endDrag = useCallback(() => {
    dragState.current = null;
    setDragging(false);
  }, []);

  // Idle auto-spin: slowly rotate until the user first interacts
  // (pauses automatically while dragging).
  const autoSpin = !interacted;

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative aspect-square touch-none select-none overflow-hidden rounded-3xl border border-border/70 bg-surface/40",
        dragging ? "cursor-grabbing" : "cursor-grab",
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      role="img"
      aria-label={`360 degree view of ${name}`}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.12),transparent_65%)]" />

      <div className="absolute inset-0 grid place-items-center p-10" style={{ perspective: "1200px" }}>
        <img
          src={image}
          alt={name}
          draggable={false}
          className={cn(
            "max-h-full max-w-full rounded-2xl object-contain shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] will-change-transform",
            autoSpin && "animate-[spin-slow_18s_linear_infinite]",
          )}
          style={
            autoSpin
              ? undefined
              : {
                  transform: `rotateY(${angle % 360}deg) rotateX(${Math.sin(angle / 90) * 4}deg)`,
                  transition: dragging ? "none" : "transform 400ms cubic-bezier(0.22,1,0.36,1)",
                }
          }
        />
      </div>

      {/* soft ground shadow */}
      <div className="pointer-events-none absolute inset-x-[20%] bottom-[8%] h-6 rounded-[50%] bg-black/50 blur-xl" />

      {badge && (
        <span className="absolute left-5 top-5 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-[11px] font-medium tracking-wide text-primary backdrop-blur">
          {badge}
        </span>
      )}

      {/* drag hint */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-xs text-muted-foreground backdrop-blur transition-opacity duration-500",
          interacted ? "opacity-0" : "opacity-100",
        )}
      >
        <RotateCw className="h-3.5 w-3.5 text-primary" />
        Drag to rotate 360°
      </div>
    </div>
  );
}
