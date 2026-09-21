import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useFinePointer } from "../../hooks/useFinePointer";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "../../data/resume";
import { BrowserFrame, OfflineScreen } from "./BrowserFrame";
import { CaseStudy } from "./CaseStudy";
import { MaskLine, Reveal, SectionLabel } from "./Reveal";

function Preview({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-1.5%", "1.5%"]);

  // Gentle 3D tilt + glare that follow the pointer (fine pointers only).
  const fine = useFinePointer();
  const rx = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 7);
    rx.set(-(py - 0.5) * 7);
    e.currentTarget.style.setProperty("--gx", `${px * 100}%`);
    e.currentTarget.style.setProperty("--gy", `${py * 100}%`);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-cursor="view"
      aria-label={`Open case study: ${project.name}`}
      className="group relative block w-full text-left"
    >
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] bg-signal/[0.06] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
      <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1400 }} className="transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.02]">
        <BrowserFrame project={project}>
          {project.image ? (
            <motion.img
              src={project.image.src}
              alt={project.image.alt}
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
              style={{ y, scale: 1.04 }}
              className="size-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <OfflineScreen project={project} />
          )}
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(520px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.11), transparent 55%)" }} />
          <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-void/85 via-void/10 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-7">
            <span className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.image ? project.name : ""}</span>
            <span className="grid size-11 place-items-center rounded-full bg-signal text-void">
              <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </span>
          </div>
        </BrowserFrame>
      </motion.div>
    </button>
  );
}

function Showcase({ project, i, onOpen }: { project: Project; i: number; onOpen: () => void }) {
  const flip = i % 2 === 1;
  return (
    <div
      className="[@media(min-width:1024px)_and_(min-height:780px)]:sticky"
      style={{ top: `calc(6rem + ${i * 1.1}rem)` }}
    >
    <article className="grid items-center gap-8 rounded-3xl border border-white/10 bg-[#0e0e0e] p-5 shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.9)] sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
      <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`} y={40}>
        <Preview project={project} onOpen={onOpen} />
      </Reveal>

      <Reveal delay={0.08} className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-mute">
          <span className="text-signal">0{i + 1}</span>
          <span aria-hidden className="h-px w-8 bg-line" />
          <span>{project.kind}</span>
        </div>

        <h3 className="mt-5 text-[clamp(2.25rem,4.4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
          {project.name}
        </h3>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-mute">{project.blurb}</p>

        <dl className="mt-7 grid max-w-md grid-cols-[6.5rem_1fr] gap-y-3 border-t border-line pt-5 text-sm">
          <dt className="font-mono text-xs uppercase tracking-[0.16em] text-mute">Technology</dt>
          <dd className="text-ink">{project.stack.join(" · ")}</dd>
          <dt className="font-mono text-xs uppercase tracking-[0.16em] text-mute">Status</dt>
          <dd className="flex items-center gap-2 text-ink">
            <span className={`size-1.5 rounded-full ${project.href ? "bg-signal" : "bg-mute/60"}`} />
            {project.href ? "Live in production" : "Currently offline"}
          </dd>
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine group inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-sm font-semibold uppercase tracking-[0.1em] text-void transition-colors hover:bg-ink"
            >
              View project
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
          ) : null}
          <button type="button" onClick={onOpen} className="link-underline inline-flex items-center gap-1.5 py-1 text-sm font-semibold uppercase tracking-[0.1em]">
            Case study →
          </button>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1.5 py-1 text-sm font-semibold uppercase tracking-[0.1em] text-mute hover:text-ink">
              <Github className="size-4" aria-hidden /> GitHub ↗
            </a>
          )}
        </div>
      </Reveal>
    </article>
    </div>
  );
}

export function Work() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  return (
    <section id="work" className="overflow-x-clip py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionLabel index="03">Selected work</SectionLabel>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(2.25rem,7vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            <MaskLine>Products,</MaskLine>
            <MaskLine delay={0.1}>
              <span className="font-serif font-normal italic tracking-[-0.02em] text-signal">not</span> pages.
            </MaskLine>
          </h2>
          <p className="max-w-xs text-mute">
            Four production websites — designed, built, deployed and maintained end to end.
          </p>
        </div>

        <div className="mt-10 space-y-6 lg:space-y-10">
          {projects.map((p, i) => (
            <Showcase key={p.slug} project={p} i={i} onOpen={() => { setIdx(i); setOpen(true); }} />
          ))}
        </div>
      </div>

      <CaseStudy project={projects[idx]} index={idx} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
