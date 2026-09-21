import { useEffect, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { profile, repos } from "../../data/resume";
import { MaskLine, Reveal, SectionLabel } from "./Reveal";

const CACHE_KEY = "gh-repos-v1";

/** Last-push dates come from the public GitHub API; the list itself is curated. */
function useRepoDates() {
  const [dates, setDates] = useState<Record<string, string>>({});
  useEffect(() => {
    const ctrl = new AbortController();
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) return setDates(JSON.parse(cached));
    } catch {}
    fetch(`https://api.github.com/users/${profile.github.handle}/repos?per_page=100`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((list: { name: string; pushed_at: string }[]) => {
        const map = Object.fromEntries(list.map((r) => [r.name, r.pushed_at]));
        setDates(map);
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(map)); } catch {}
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);
  return dates;
}

const fmt = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";

export function GitHub() {
  const dates = useRepoDates();
  return (
    <section id="github" className="py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel index="07">GitHub</SectionLabel>
          </Reveal>
          <h2 className="mt-8 text-[clamp(2.25rem,5.4vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            <MaskLine>Straight from</MaskLine>
            <MaskLine delay={0.1}>
              the <span className="font-serif font-normal italic tracking-[-0.02em] text-signal">repo.</span>
            </MaskLine>
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-lg text-mute">A few repositories from my GitHub — the code behind the work.</p>
            <a
              href={profile.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex h-12 items-center gap-2.5 rounded-full border border-white/20 px-6 text-sm font-semibold tracking-[0.04em] transition-colors hover:border-signal hover:text-signal"
            >
              <Github className="size-4" aria-hidden />@{profile.github.handle}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ul className="border-t border-line">
            {repos.map((r) => (
              <li key={r.name} className="border-b border-line">
                <a
                  href={`${profile.github.href}/${r.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-5 transition-[padding] duration-300 hover:pl-3 sm:py-6"
                >
                  <span className="min-w-0 flex-1 truncate font-mono text-base text-ink transition-colors group-hover:text-signal sm:text-xl">
                    {r.name}
                  </span>
                  <span className="hidden font-mono text-xs text-mute sm:inline">{r.language}</span>
                  <span className="w-20 text-right font-mono text-xs text-mute">{fmt(dates[r.name])}</span>
                  <ArrowUpRight className="size-5 text-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
