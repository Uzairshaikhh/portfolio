import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

type W = { t: string; em?: boolean; br?: boolean };
const words: W[] = [
  { t: "Code" }, { t: "is" }, { t: "the", br: true }, { t: "foundation.", em: true, br: true },
  { t: "Experience" }, { t: "is", br: true }, { t: "the" }, { t: "product.", em: true },
];

function Word({ w, i, p, reduce }: { w: W; i: number; p: MotionValue<number>; reduce: boolean }) {
  const start = 0.12 + (i / words.length) * 0.58;
  const opacity = useTransform(p, [start, start + 0.12], [0.14, 1]);
  const y = useTransform(p, [start, start + 0.12], [14, 0]);
  return (
    <>
      <motion.span
        style={reduce ? undefined : { opacity, y }}
        className={`inline-block ${w.em ? "font-serif font-normal italic tracking-[-0.02em] text-signal" : ""}`}
      >
        {w.t}
      </motion.span>{" "}
      {w.br && <br />}
    </>
  );
}

/** Personal-brand statement: words light up as you scroll through a pinned screen. */
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rule = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section id="statement" ref={ref} className="relative h-[210vh] max-sm:h-[170vh]" aria-label="Principle">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center">
        <div className="wrap">
          <p className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-mute">
            <span className="text-signal">06</span>
            <span aria-hidden className="h-px w-8 bg-line" />
            Principle
          </p>
          <p className="text-[clamp(2.75rem,14.5vw,3.75rem)] font-semibold leading-[0.95] sm:text-[clamp(3.75rem,9vw,9rem)] tracking-[-0.05em]">
            {words.map((w, i) => (
              <Word key={i} w={w} i={i} p={scrollYProgress} reduce={reduce} />
            ))}
          </p>
          <div className="mt-12 h-px w-full bg-line">
            <motion.div style={{ width: reduce ? "100%" : rule }} className="h-px bg-signal" />
          </div>
        </div>
      </div>
    </section>
  );
}
