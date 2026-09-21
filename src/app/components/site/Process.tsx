import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { processSteps } from "../../data/resume";
import { MaskLine, Reveal, SectionLabel } from "./Reveal";

function Step({ i, active, onActive }: { i: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  const s = processSteps[i];

  return (
    <li ref={ref} className={`grid grid-cols-[3.25rem_1fr] gap-4 border-t border-white/10 py-9 transition-opacity duration-500 sm:grid-cols-[5rem_1fr] sm:py-12 lg:min-h-[32vh] ${active ? "opacity-100" : "opacity-40"}`}>
      <span className={`font-mono text-sm transition-colors ${active ? "text-signal" : "text-mute"}`}>0{i + 1}</span>
      <div>
        <h3 className="text-3xl font-semibold tracking-tight sm:text-5xl">{s.title}</h3>
        <p className="mt-3 max-w-lg text-lg leading-relaxed text-mute">{s.text}</p>
      </div>
    </li>
  );
}

/** Deliberately different from the rest of the page: full-bleed band, sticky numeral, scroll-lit steps. */
export function Process() {
  const [active, setActive] = useState(0);
  return (
    <section id="process" className="border-y border-line bg-deep py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionLabel index="05">How I build</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-[clamp(2.25rem,5.4vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
                <MaskLine>From problem</MaskLine>
                <MaskLine delay={0.1}>
                  to <span className="font-serif font-normal italic tracking-[-0.02em] text-signal">production.</span>
                </MaskLine>
              </h2>

              <div aria-hidden className="relative mt-12 hidden h-[15rem] lg:block">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={active}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.35, ease: [0.2, 0.7, 0.1, 1] }}
                    className="absolute inset-0 text-[13rem] font-semibold leading-none tracking-[-0.06em] text-outline"
                  >
                    0{active + 1}
                  </motion.span>
                </AnimatePresence>
                <span className="absolute bottom-0 left-0 flex gap-1.5">
                  {processSteps.map((_, i) => (
                    <span key={i} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-signal" : "w-4 bg-white/15"}`} />
                  ))}
                </span>
              </div>
            </div>
          </div>

          <ol className="border-b border-white/10 lg:col-span-7">
            {processSteps.map((_, i) => (
              <Step key={i} i={i} active={active === i} onActive={setActive} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
