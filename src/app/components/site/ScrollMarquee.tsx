import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { rolesShort } from "../../data/resume";

const A = [...rolesShort, ...rolesShort].map((r) => `${r} ✦ `).join("");
const B = "Design ✦ Build ✦ Ship ✦ Design ✦ Build ✦ Ship ✦ Design ✦ Build ✦ ";

/** Big type band whose two rows slide in opposite directions as you scroll past. */
export function ScrollMarquee() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["4%", "-28%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], reduce ? ["-12%", "-12%"] : ["-30%", "2%"]);
  const row = "whitespace-nowrap text-[clamp(3.25rem,10.5vw,9.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.05em]";

  return (
    <section ref={ref} aria-hidden className="select-none overflow-hidden border-y border-line py-10 sm:py-14">
      <motion.p style={{ x: x1 }} className={`${row} text-outline`}>
        {A}
      </motion.p>
      <motion.p style={{ x: x2 }} className={`${row} text-ink/90 [&]:[word-spacing:0.1em]`}>
        {B.split("✦").map((w, i, arr) => (
          <span key={i}>
            {w}
            {i < arr.length - 1 && <span className="text-signal">✦</span>}
          </span>
        ))}
      </motion.p>
    </section>
  );
}
