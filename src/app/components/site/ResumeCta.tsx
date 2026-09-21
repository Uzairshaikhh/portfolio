import { ArrowUpRight, Download } from "lucide-react";
import { profile, rolesShort } from "../../data/resume";
import { MaskLine, Reveal } from "./Reveal";
import { Spotlight } from "./Spotlight";

export function ResumeCta() {
  return (
    <section id="resume" className="pb-24 sm:pb-32">
      <div className="wrap">
        <Reveal y={30}>
          <Spotlight className="group/card overflow-hidden rounded-3xl border border-white/10 bg-panel px-6 py-14 sm:px-14 sm:py-20">
            <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-signal/[0.09] blur-3xl" />
            <h2 className="relative max-w-3xl text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              <MaskLine>Want to know more</MaskLine>
              <MaskLine delay={0.1}>
                about my <span className="font-serif font-normal italic tracking-[-0.02em] text-signal">work?</span>
              </MaskLine>
            </h2>
            <p className="relative mt-5 max-w-md text-lg text-mute">
              The full story — skills, projects and education — on a single page.
            </p>
            <div aria-hidden className="absolute bottom-0 right-12 hidden w-60 translate-y-10 rotate-[4deg] rounded-t-xl border border-white/10 bg-deep p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover/card:translate-y-4 group-hover/card:rotate-0 lg:block">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-signal">{profile.name}</p>
              <p className="mt-0.5 text-[0.6rem] italic text-mute">{rolesShort.join(" • ")}</p>
              <div className="mt-5 space-y-2">
                {[92, 100, 84, 96, 60].map((w, i) => (
                  <span key={i} className="block h-1.5 rounded-full bg-white/10" style={{ width: `${w}%` }} />
                ))}
              </div>
              <p className="mt-6 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-mute">Projects</p>
              <div className="mt-2 space-y-2">
                {[88, 70, 94, 78].map((w, i) => (
                  <span key={i} className="block h-1.5 rounded-full bg-white/[0.07]" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="h-28" />
            </div>
            <div className="relative mt-9 flex flex-wrap gap-3">
              <a
                href={profile.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine group inline-flex h-14 items-center gap-2.5 rounded-full bg-signal px-7 text-sm font-semibold uppercase tracking-[0.12em] text-void transition-colors hover:bg-ink"
              >
                View resume
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
              <a
                href={profile.resumeHref}
                download="Uzair_Shaikh_Resume.pdf"
                className="group inline-flex h-14 items-center gap-2.5 rounded-full border border-white/20 px-7 text-sm font-semibold uppercase tracking-[0.12em] transition-colors hover:border-signal hover:text-signal"
              >
                Download resume
                <Download className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
              </a>
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
