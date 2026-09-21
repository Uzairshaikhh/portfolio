import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "motion/react";
import { profile, rolesShort } from "../../data/resume";

const KEY = "intro-seen";

/** Plays once per browser session, and never with reduced motion. */
export const introWillPlay = (() => {
  if (typeof window === "undefined") return false;
  try {
    if (sessionStorage.getItem(KEY)) return false;
  } catch {}
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
})();

/** Seconds the hero waits so its entrance lines up with the curtain lifting. */
export const introDelay = introWillPlay ? 1.35 : 0;

const HOLD_MS = 1750;

function Counter() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const c = animate(0, 100, { duration: 1.4, ease: [0.4, 0, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, []);
  return <span>{String(n).padStart(3, "0")}</span>;
}

export function Intro() {
  const [show, setShow] = useState(introWillPlay);

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setShow(false), HOLD_MS);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          role="presentation"
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-void px-5 py-6 sm:px-10 sm:py-9"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">
            {rolesShort.join(" · ")}
          </p>

          <div>
            {[profile.name.split(" ")[0], profile.name.split(" ")[1]].map((word, i) => (
              <span key={word} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block text-[clamp(3.5rem,15vw,13rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em] ${i === 1 ? "text-outline" : ""}`}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.2, 0.7, 0.1, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="h-px flex-1 bg-white/10">
              <motion.div
                className="h-px origin-left bg-signal"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
            <p className="font-mono text-sm text-signal">
              <Counter />
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
