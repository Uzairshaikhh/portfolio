import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects, skillGroups } from "../../data/resume";
import { MaskLine, Reveal, SectionLabel } from "./Reveal";
import { TechIcon } from "./TechIcon";
import { Spotlight } from "./Spotlight";

const all = skillGroups.flatMap((g) => g.items.map((t) => ({ ...t, group: g.group })));

export function Skills() {
  const [selected, setSelected] = useState("react");
  const [hover, setHover] = useState<string | null>(null);
  const shown = hover ?? selected;
  const tech = all.find((t) => t.id === shown)!;
  const usedIn = tech.stackKey ? projects.filter((p) => p.stack.includes(tech.stackKey!)) : [];

  return (
    <section id="skills" className="border-y border-line bg-deep/60 py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionLabel index="02">Toolkit</SectionLabel>
        </Reveal>
        <h2 className="mt-8 max-w-4xl text-[clamp(2rem,5.5vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          <MaskLine>The stack behind</MaskLine>
          <MaskLine delay={0.1}>
            every <span className="font-serif font-normal italic tracking-[-0.02em] text-signal">build.</span>
          </MaskLine>
        </h2>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* Detail panel — first on mobile so a tap shows feedback right away */}
          <div className="lg:order-2 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Spotlight className="overflow-hidden rounded-2xl border border-white/10 bg-panel p-6 sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={tech.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    aria-live="polite"
                  >
                    <div className="grid size-16 place-items-center rounded-2xl border border-signal/30 bg-signal/[0.08] text-signal">
                      <TechIcon id={tech.id} className="size-8" />
                    </div>
                    <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-mute">{tech.group}</p>
                    <h3 className="mt-1 text-3xl font-semibold tracking-tight">{tech.name}</h3>
                    <p className="mt-3 min-h-[4.5rem] leading-relaxed text-mute">{tech.blurb}</p>
                    {usedIn.length > 0 && (
                      <div className="mt-5 border-t border-line pt-4">
                        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-mute">Used in</p>
                        <p className="mt-1.5 text-sm text-ink">{usedIn.map((p) => p.name).join(" · ")}</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </Spotlight>
            </div>
          </div>

          <div className="space-y-9 lg:order-1 lg:col-span-8">
            {skillGroups.map((g) => (
              <Reveal key={g.group}>
                <div className="mb-3 flex items-baseline gap-3">
                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink">{g.group}</h3>
                  {g.note && <span className="hidden text-sm text-mute sm:inline">— {g.note}</span>}
                </div>
                <ul className="flex flex-wrap gap-2.5" onPointerLeave={() => setHover(null)}>
                  {g.items.map((t) => {
                    const isActive = shown === t.id;
                    const dim = hover !== null && hover !== t.id;
                    return (
                      <li key={t.id}>
                        <button
                          type="button"
                          onPointerEnter={() => setHover(t.id)}
                          onFocus={() => setSelected(t.id)}
                          onClick={() => setSelected(t.id)}
                          aria-pressed={selected === t.id}
                          className={`inline-flex h-12 items-center gap-2.5 rounded-full border px-5 text-[0.95rem] transition-all duration-300 ${
                            isActive
                              ? "-translate-y-0.5 border-signal bg-signal/10 text-ink"
                              : "border-white/10 bg-white/[0.02] text-ink/85 hover:border-white/25"
                          } ${dim ? "opacity-35" : "opacity-100"}`}
                        >
                          <TechIcon id={t.id} className={`size-[1.05rem] transition-colors ${isActive ? "text-signal" : "text-mute"}`} />
                          {t.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
