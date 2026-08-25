import { RotateCcw, MousePointer2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Pseudo-3D product viewer: drag horizontally to spin the product on a CSS
 * 3D turntable. Auto-spins gently until the user grabs it.
 */
export function Viewer360({ image, alt }: { image: string; alt: string }) {
  const [angle, setAngle] = useState(-18);
  const [dragging, setDragging] = useState(false);
  const [auto, setAuto] = useState(true);
  const startX = useRef(0);
  const startAngle = useRef(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!auto || dragging) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setAngle((a) => a + dt * 0.014);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [auto, dragging]);

  const onDown = (clientX: number) => {
    setAuto(false);
    setDragging(true);
    startX.current = clientX;
    startAngle.current = angle;
  };

  const onMove = useCallback(
    (clientX: number) => {
      if (!dragging) return;
      setAngle(startAngle.current + (clientX - startX.current) * 0.55);
    },
    [dragging],
  );

  useEffect(() => {
    const up = () => setDragging(false);
    const move = (e: MouseEvent) => onMove(e.clientX);
    const tmove = (e: TouchEvent) => onMove(e.touches[0]?.clientX ?? 0);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", tmove);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", tmove);
    };
  }, [onMove]);

  const normalized = ((angle % 360) + 360) % 360;
  const shade = 0.35 + 0.4 * Math.abs(Math.cos((normalized * Math.PI) / 180));

  return (
    <div className="surface-panel relative overflow-hidden rounded-3xl">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-60" />
      <div
        role="img"
        aria-label={`${alt} — drag to rotate`}
        onMouseDown={(e) => onDown(e.clientX)}
        onTouchStart={(e) => onDown(e.touches[0]?.clientX ?? 0)}
        className={`relative flex aspect-square touch-none select-none items-center justify-center ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ perspective: "1400px" }}
      >
        <div
          className="relative h-[74%] w-[74%]"
          style={{
            transform: `rotateY(${angle}deg) rotateX(6deg)`,
            transformStyle: "preserve-3d",
            transition: dragging ? "none" : "transform 90ms linear",
          }}
        >
          <img
            src={image}
            alt={alt}
            width={1024}
            height={1024}
            draggable={false}
            className="h-full w-full rounded-2xl object-cover"
            style={{ filter: `brightness(${shade + 0.4}) contrast(1.05)` }}
          />
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl"
            style={{
              transform: "translateZ(-70px) scale(0.96)",
              background: "var(--gradient-accent)",
              opacity: 0.18,
              filter: "blur(28px)",
            }}
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[12%] h-6 w-1/2 rounded-[50%] bg-primary/25 blur-2xl"
        />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <MousePointer2 className="h-3.5 w-3.5 text-primary" /> Drag to rotate ·{" "}
          {Math.round(normalized)}°
        </span>
        <button
          type="button"
          onClick={() => {
            setAngle(-18);
            setAuto(true);
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 transition-colors hover:border-primary/60 hover:text-primary"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>
    </div>
  );
}
