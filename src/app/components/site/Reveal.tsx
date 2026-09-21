import type { ReactNode } from "react";
import { motion } from "motion/react";

const ease = [0.2, 0.7, 0.1, 1] as const;

/** Subtle fade-up. Honors reduced motion via <MotionConfig reducedMotion="user"> in App. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 18,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** One line of a headline that slides up from behind a mask. */
export function MaskLine({
  children,
  delay = 0,
  className = "",
  onLoad = false,
  innerClassName = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Animate on mount (hero) instead of on scroll. */
  onLoad?: boolean;
  innerClassName?: string;
}) {
  const target = { y: "0%" };
  return (
    <span className={`block overflow-hidden pb-[0.1em] -mb-[0.1em] ${className}`}>
      <motion.span
        className={`block ${innerClassName}`}
        initial={{ y: "108%" }}
        {...(onLoad
          ? { animate: target }
          : { whileInView: target, viewport: { once: true, margin: "0px 0px -10% 0px" } })}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-mute">
      <span className="text-signal">{index}</span>
      <span aria-hidden className="h-px w-8 bg-line" />
      {children}
    </p>
  );
}
