import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "../../data/resume";
import { MaskLine } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { Terminal } from "./Terminal";
import { TechIcon } from "./TechIcon";
import { introDelay as d } from "./Intro";

function RoleRotator() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <p className="flex items-center gap-3 text-xl font-medium sm:text-2xl">
      <span aria-hidden className="h-px w-8 bg-signal sm:w-12" />
      <span className="sr-only">{profile.roles.join(", ")}</span>
      <span aria-hidden className="relative block h-[1.4em] overflow-hidden">
        <span className="invisible block h-0">{profile.roles.reduce((a, b) => (b.length > a.length ? b : a))}</span>
        {reduce ? (
          profile.roles.join(" · ")
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={i}
              className="block text-signal"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.55, ease: [0.2, 0.7, 0.1, 1] }}
            >
              {profile.roles[i]}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </p>
  );
}

/** Small floating badges that drift and parallax around the terminal (desktop only). */
function FloatChips({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const chips = [
    { id: "react", label: "React", cls: "-left-12 -top-16", depth: 26, dur: 6 },
    { id: "vite", label: "Vite", cls: "-right-3 -top-10", depth: 38, dur: 7.5 },
    { id: "tailwind", label: "Tailwind", cls: "-right-8 bottom-20", depth: 20, dur: 5.5 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {chips.map((c, i) => (
        <Chip key={c.id} {...c} i={i} mx={mx} my={my} />
      ))}
    </div>
  );
}

function Chip({ id, label, cls, depth, dur, i, mx, my }: { id: string; label: string; cls: string; depth: number; dur: number; i: number; mx: MotionValue<number>; my: MotionValue<number> }) {
  const x = useTransform(mx, [-1, 1], [depth, -depth]);
  const y = useTransform(my, [-1, 1], [depth * 0.7, -depth * 0.7]);
  return (
    <motion.div style={{ x, y }} className={`absolute ${cls}`}>
      <motion.div
        className="flex items-center gap-2.5 rounded-full border border-white/10 bg-panel/80 py-2 pl-3 pr-4 text-sm font-medium shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] backdrop-blur"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { delay: 1.6 + d + i * 0.15, duration: 0.6 },
          scale: { delay: 1.6 + d + i * 0.15, duration: 0.6 },
          y: { duration: dur, repeat: Infinity, ease: "easeInOut", delay: 2 + d },
        }}
      >
        <TechIcon id={id} className="size-4 text-signal" />
        {label}
      </motion.div>
    </motion.div>
  );
}

/** Thin concentric rings with slow-moving dots, centered behind the terminal. */
function Orbits() {
  const rings = [
    { size: 100, dur: 46, rev: false },
    { size: 72, dur: 32, rev: true },
    { size: 46, dur: 22, rev: false },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden size-[46rem] -translate-x-1/2 -translate-y-1/2 lg:block">
      {rings.map((r) => (
        <div key={r.size} className="absolute rounded-full border border-white/[0.11]" style={{ inset: `${(100 - r.size) / 2}%` }}>
          <div
            className="absolute inset-0 rounded-full"
            style={{ animation: `orbit ${r.dur}s linear infinite ${r.rev ? "reverse" : "normal"}` }}
          >
            <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_14px_var(--color-signal)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-x-clip pb-14 pt-24 sm:pt-28 [@media(max-height:800px)]:pb-8 [@media(max-height:800px)]:pt-[4.75rem]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
    >
      <div className="wrap">
        <motion.div
          className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute sm:mb-9 sm:text-xs [@media(max-height:800px)]:sm:mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + d, duration: 0.8 }}
        >
          <span className="flex items-center gap-4">
            <span className="text-ink">{profile.name}</span>
            <span aria-hidden className="hidden h-3 w-px bg-white/20 sm:block" />
            <span className="hidden sm:inline">{profile.location}</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-3 pr-4 normal-case tracking-normal text-ink">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        <h1 className="text-[clamp(2.25rem,min(7.7vw,12.5vh),7.25rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em]">
          <MaskLine onLoad delay={0.1 + d} innerClassName="bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-transparent">Building digital</MaskLine>
          <MaskLine onLoad delay={0.22 + d} innerClassName="bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-transparent">Experiences that</MaskLine>
          <MaskLine onLoad delay={0.34 + d} innerClassName="bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-transparent">
            feel{" "}
            <span className="text-shine font-serif font-normal normal-case italic tracking-[-0.02em]">different.</span>
          </MaskLine>
        </h1>

        <div className="mt-9 grid items-end gap-10 sm:mt-11 lg:grid-cols-12 lg:gap-8 [@media(max-height:800px)]:sm:mt-5">
          <motion.div
            className="min-w-0 space-y-6 lg:col-span-6 [@media(max-height:800px)]:lg:space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + d, duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}
          >
            <RoleRotator />
            <p className="max-w-xl text-lg leading-relaxed text-mute">
              I design, build and ship fast, responsive products with{" "}
              <span className="text-ink">React.js, Vite and TailwindCSS</span> — four production websites so far,
              each owned end to end, from component architecture and Node.js form services to live deployment.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Magnetic className="block w-full sm:inline-block sm:w-auto">
                <a
                  href="#work"
                  className="btn-shine group flex h-14 w-full items-center justify-between gap-3 rounded-full bg-signal pl-7 pr-3 sm:inline-flex sm:w-auto sm:justify-start text-sm font-semibold uppercase tracking-[0.12em] text-void transition-colors hover:bg-ink"
                >
                  View my work
                  <span className="relative grid size-9 place-items-center overflow-hidden rounded-full bg-void text-signal">
                    <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-6" aria-hidden />
                    <ArrowDown className="absolute inset-0 m-auto size-4 -translate-y-6 transition-transform duration-300 group-hover:translate-y-0" aria-hidden />
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.2} className="block w-full sm:inline-block sm:w-auto">
                <a
                  href="#contact"
                  className="group flex h-14 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-7 sm:inline-flex sm:w-auto text-sm font-semibold uppercase tracking-[0.12em] transition-colors hover:border-signal hover:text-signal"
                >
                  Let's connect
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
              </Magnetic>
            </div>
          </motion.div>

          <div className="relative min-w-0 lg:col-span-5 lg:col-start-8">
            <Orbits />
            <Terminal mx={mx} my={my} d={d} />
            <FloatChips mx={mx} my={my} />
          </div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mute xl:flex [@media(max-height:800px)]:!hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 + d, duration: 1 }}
      >
        Scroll
        <span className="relative h-8 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-3 bg-signal [animation:scrollcue_1.8s_ease-in-out_infinite]" />
        </span>
      </motion.a>
    </section>
  );
}
