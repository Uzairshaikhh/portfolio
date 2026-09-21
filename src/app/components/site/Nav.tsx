import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, profile } from "../../data/resume";
import { useActiveSection } from "../../hooks/useActiveSection";

const SECTIONS = ["top", "about", "skills", "work", "experience", "process", "statement", "github", "resume", "contact"];
/** Sections without their own nav link highlight the nearest one. */
const NAV_FOR: Record<string, string> = {
  about: "about", skills: "skills", work: "work", experience: "experience",
  process: "experience", statement: "experience", github: "contact", resume: "contact", contact: "contact",
};

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Nav() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const active = NAV_FOR[useActiveSection(SECTIONS) ?? ""] ?? null;

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  useMotionValueEvent(scrollY, "change", (v) => setCompact(v > 48));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const link = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => goTo(id));
  };

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-signal" aria-hidden />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
        <nav
          aria-label="Primary"
          className={`pointer-events-auto flex w-full max-w-fit items-center gap-1 rounded-full border backdrop-blur-xl transition-all duration-500 ${
            compact
              ? "border-white/[0.14] bg-void/80 p-1 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]"
              : "border-white/[0.08] bg-void/40 p-1.5"
          }`}
        >
          <a
            href="#top"
            onClick={link("top")}
            aria-label={`${profile.name} — back to top`}
            className="grid size-9 place-items-center rounded-full bg-white/[0.06] font-mono text-xs font-medium tracking-wider text-signal transition-colors hover:bg-signal hover:text-void"
          >
            {profile.monogram}
          </a>

          <ul className="mx-1 hidden items-center md:flex">
            {nav.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={link(l.id)}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`relative block rounded-full px-4 py-2 text-sm transition-colors ${
                    active === l.id ? "text-void" : "text-mute hover:text-ink"
                  }`}
                >
                  {active === l.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-signal" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={link("contact")}
            className="group ml-1 hidden items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-signal hover:bg-signal hover:text-void md:inline-flex"
          >
            Let's Talk
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="ml-auto inline-flex h-9 items-center gap-2 rounded-full bg-white/[0.06] pl-4 pr-3 text-sm md:hidden"
          >
            Menu <Menu className="size-4" aria-hidden />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col bg-void px-6 pb-8 pt-5 md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-mute">Navigate</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-11 place-items-center rounded-full border border-white/15">
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <ul className="my-auto space-y-1 py-10">
              {nav.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={link(l.id)}
                    className="flex items-baseline gap-4 py-2 text-[2.75rem] font-semibold leading-none tracking-tight"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.2, 0.7, 0.1, 1] }}
                  >
                    <span className="font-mono text-xs font-normal text-signal">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            <div className="space-y-4 border-t border-line pt-6">
              <a href="#contact" onClick={link("contact")} className="flex h-14 items-center justify-center gap-2 rounded-full bg-signal font-medium text-void">
                Let's Talk <ArrowUpRight className="size-5" aria-hidden />
              </a>
              <a href={`mailto:${profile.email}`} className="block text-center text-sm text-mute">
                {profile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
