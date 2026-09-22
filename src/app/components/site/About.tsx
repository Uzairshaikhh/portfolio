import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { aboutFacts, projects, softSkills } from "../../data/resume";
import { Spotlight } from "./Spotlight";
import { MaskLine, Reveal, SectionLabel } from "./Reveal";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.5, ease: [0.2, 0.7, 0.1, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return <span ref={ref}>{String(v).padStart(2, "0")}</span>;
}

const stats = [
  { value: projects.length, label: "Websites shipped" },
  { value: projects.filter((p) => p.href).length, label: "Live in production" },
];

const Key = ({ children }: { children: React.ReactNode }) => (
  <span className="text-ink underline decoration-signal/60 underline-offset-[5px]">
    {children}
  </span>
);

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionLabel index="01">About</SectionLabel>
        </Reveal>

        <h2 className="mt-8 max-w-5xl text-[clamp(2rem,6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          <MaskLine>I don't just write code.</MaskLine>
          <MaskLine delay={0.1}>
            I build <span className="font-serif font-normal italic tracking-[-0.02em] text-signal">experiences.</span>
          </MaskLine>
        </h2>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-6 text-lg leading-relaxed text-mute lg:col-span-6">
            <Reveal>
              <p>
                I'm an <Key>IT undergraduate</Key> and <Key>self-taught web developer</Key> who specializes in frontend
                development with <Key>React.js</Key>.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                I've independently designed, built and deployed <Key>five production websites</Key> — a content platform,
                B2B, law firm and NGO sites — and I own each one end to end: component architecture, responsive UI,
                backend integration and live deployment.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                I'm just as comfortable across the stack, with <Key>Node.js/SMTP</Key> services for form handling and
                automated email workflows — and strong Git/GitHub habits with a fast learning curve.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <dl className="divide-y divide-line border-y border-line">
              {aboutFacts.map((f) => (
                <div key={f.label} className="group grid grid-cols-[6.5rem_1fr] gap-4 py-4 transition-colors sm:grid-cols-[8rem_1fr]">
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-mute">{f.label}</dt>
                  <dd className="text-ink transition-transform duration-300 group-hover:translate-x-1">{f.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-4 sm:grid-cols-[8rem_1fr]">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-mute">Status</dt>
                <dd className="flex items-start gap-2.5 text-ink">
                  <span className="relative mt-2 flex size-2 shrink-0">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-signal" />
                  </span>
                  Available for opportunities — remote internship or entry-level
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-16 sm:mt-20">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((st) => (
              <Spotlight key={st.label} className="rounded-2xl border border-white/10 bg-panel p-6 sm:p-8">
                <p className="text-[clamp(3.5rem,7vw,6rem)] font-semibold leading-none tracking-[-0.05em]">
                  <CountUp to={st.value} />
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-mute">{st.label}</p>
              </Spotlight>
            ))}
            <Spotlight className="rounded-2xl border border-white/10 bg-panel p-6 sm:p-8">
              <p className="text-[clamp(3.5rem,7vw,6rem)] font-semibold leading-none tracking-[-0.05em] text-signal">2024</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-mute">Building since</p>
            </Spotlight>
          </div>
        </Reveal>

        <Reveal className="mt-12 sm:mt-16">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-mute">How I work</p>
          <div className="group relative overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
            <ul className="flex w-max gap-12 [animation:marquee_28s_linear_infinite] group-hover:[animation-play-state:paused]">
              {[...softSkills, ...softSkills, ...softSkills, ...softSkills].map((s, i) => (
                <li key={i} aria-hidden={i >= softSkills.length} className="flex items-center gap-12 whitespace-nowrap text-2xl font-medium tracking-tight text-ink/80 sm:text-3xl">
                  {s}
                  <span aria-hidden className="text-signal">✦</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
