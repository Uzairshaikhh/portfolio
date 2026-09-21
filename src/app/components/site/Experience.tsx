import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { timeline } from "../../data/resume";
import { MaskLine, Reveal, SectionLabel } from "./Reveal";

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.3 });

  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionLabel index="04">Experience</SectionLabel>
        </Reveal>
        <h2 className="mt-8 text-[clamp(2.25rem,6.5vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
          <MaskLine>Learning by</MaskLine>
          <MaskLine delay={0.1}>
            <span className="font-serif font-normal italic tracking-[-0.02em] text-signal">shipping.</span>
          </MaskLine>
        </h2>

        <ol ref={ref} className="relative mt-14 lg:mt-20">
          <span aria-hidden className="absolute bottom-0 left-[0.4rem] top-2 w-px bg-line lg:left-[calc(25%-0.5px)]" />
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-[0.4rem] top-2 w-px origin-top bg-signal lg:left-[calc(25%-0.5px)]"
          />

          {timeline.map((t, i) => (
            <li key={t.when} className="relative grid gap-4 pb-14 pl-9 last:pb-0 lg:grid-cols-4 lg:gap-0 lg:pb-20 lg:pl-0">
              <span aria-hidden className="absolute left-0 top-2 size-[0.85rem] rounded-full border-2 border-signal bg-void lg:left-[calc(25%-0.4rem)]" />
              <Reveal className="lg:pr-12 lg:text-right">
                <p className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] text-outline">
                  {t.when}
                </p>
              </Reveal>
              <Reveal delay={0.08} className="lg:col-span-3 lg:pl-12">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-mute">{t.meta}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{t.title}</h3>
                <ul className="mt-5 max-w-2xl space-y-3 text-mute">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7rem] size-1 shrink-0 rounded-full bg-signal" />
                      {p}
                    </li>
                  ))}
                </ul>
                {i === timeline.length - 1 && (
                  <a href="#contact" className="link-underline mt-6 inline-block py-1 text-sm font-semibold uppercase tracking-[0.1em] text-signal">
                    Let's talk →
                  </a>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
