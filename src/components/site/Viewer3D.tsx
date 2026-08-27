import { Loader2, MousePointer2, RotateCcw } from "lucide-react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import type { ModelKind } from "./three/models";

const Scene = lazy(() => import("./three/Scene"));

function Fallback() {
  return (
    <div className="grid aspect-square place-items-center text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
}

/**
 * Real-time 3D product viewer (react-three-fiber). Lazy-mounted once the
 * viewer scrolls into view so the Three.js bundle never blocks first paint.
 */
export function Viewer3D({ kind, name }: { kind: ModelKind; name: string }) {
  const holder = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [sceneKey, setSceneKey] = useState(0);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="surface-panel relative overflow-hidden rounded-3xl">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-60" />
      <div
        ref={holder}
        onPointerDown={() => setHint(false)}
        className="relative aspect-square touch-none cursor-grab select-none active:cursor-grabbing"
        aria-label={`${name} — interactive 3D model, drag to rotate`}
        role="img"
      >
        {inView ? (
          <Suspense fallback={<Fallback />}>
            <Scene key={sceneKey} kind={kind} />
          </Suspense>
        ) : (
          <Fallback />
        )}

        {hint && (
          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
            <span className="animate-pulse rounded-full border border-primary/40 bg-background/70 px-4 py-2 text-xs text-primary backdrop-blur">
              Drag to rotate
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <MousePointer2 className="h-3.5 w-3.5 text-primary" /> Interactive 3D · drag to orbit
        </span>
        <button
          type="button"
          onClick={() => setSceneKey((k) => k + 1)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 transition-colors hover:border-primary/60 hover:text-primary"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset view
        </button>
      </div>
    </div>
  );
}
