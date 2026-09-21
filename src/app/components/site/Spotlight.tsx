import type { ReactNode } from "react";

/** Wrapper whose surface lights up around the pointer (glow + edge highlight). */
export function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  const layer =
    "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100";
  return (
    <div onPointerMove={onMove} className={`spot group/spot relative ${className}`}>
      {children}
      <span aria-hidden className={`spot-glow ${layer}`} />
      <span aria-hidden className={`spot-edge ${layer}`} />
    </div>
  );
}
