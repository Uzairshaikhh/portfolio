import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "../../hooks/useFinePointer";

type Mode = "default" | "link" | "view";

const INTERACTIVE = "a, button, input, textarea, select, summary, [role='button'], [data-cursor]";

/**
 * Desktop-only custom cursor: a dot plus a trailing ring.
 *  - links / buttons → ring expands
 *  - elements with data-cursor="view" → ring becomes a "VIEW" label
 * Mounted only on fine pointers without reduced motion.
 */
export function Cursor() {
  const fine = useFinePointer();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      setVisible(true);
    };
    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(INTERACTIVE);
      if (!el) return setMode("default");
      setMode(el.getAttribute("data-cursor") === "view" ? "view" : "link");
    };
    const leave = () => setVisible(false);
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [fine]);

  if (!fine) return null;

  const size = mode === "view" ? 92 : mode === "link" ? 60 : 34;
  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
      <div ref={ring} className="fixed left-0 top-0 will-change-transform">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border font-mono text-[0.65rem] font-medium tracking-[0.18em] transition-[width,height,background-color,border-color,color] duration-300 ease-out ${
            mode === "view"
              ? "border-signal bg-signal text-void"
              : mode === "link"
                ? "border-signal/70 bg-signal/10 text-transparent"
                : "border-white/30 text-transparent"
          }`}
          style={{ width: size, height: size, transform: `scale(${down ? 0.86 : 1})` }}
        >
          {mode === "view" ? "VIEW" : ""}
        </div>
      </div>
      <div ref={dot} className="fixed left-0 top-0 will-change-transform">
        <div className={`-translate-x-1/2 -translate-y-1/2 size-1.5 rounded-full transition-opacity duration-200 ${mode === "view" ? "opacity-0" : "bg-signal"}`} />
      </div>
    </div>
  );
}
