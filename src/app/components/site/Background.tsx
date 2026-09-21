import { useEffect, useRef } from "react";
import { useFinePointer } from "../../hooks/useFinePointer";

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/** Fixed, barely-there depth: grid, glow, moving light and film grain. */
export function Background() {
  const light = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();

  useEffect(() => {
    if (!fine) return;
    let raf = 0, tx = window.innerWidth / 2, ty = window.innerHeight / 3, cx = tx, cy = ty;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      light.current?.style.setProperty("transform", `translate3d(${cx - 350}px,${cy - 350}px,0)`);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, [fine]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void">
      {/* fine grid, faded toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 100%)",
        }}
      />
      {/* top glow */}
      <div
        className="absolute left-1/2 top-[-18rem] h-[36rem] w-[60rem] -translate-x-1/2 rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--color-signal), transparent)" }}
      />
      {/* moving light: follows the cursor on desktop, drifts slowly on touch */}
      <div
        ref={light}
        className={`absolute left-0 top-0 h-[700px] w-[700px] rounded-full opacity-[0.07] ${fine ? "" : "[animation:drift_22s_ease-in-out_infinite]"}`}
        style={{ background: "radial-gradient(closest-side, var(--color-signal), transparent)" }}
      />
      {/* film grain */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: NOISE }} />
    </div>
  );
}
