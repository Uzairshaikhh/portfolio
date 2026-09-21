import { Github, Linkedin } from "lucide-react";
import { nav, profile, rolesShort } from "../../data/resume";

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line">
      <p
        aria-hidden
        className="wrap select-none whitespace-nowrap pt-10 text-[clamp(2.5rem,14vw,16rem)] font-semibold uppercase leading-[0.9] tracking-[-0.055em] bg-gradient-to-b from-white/40 to-transparent bg-clip-text text-transparent"
      >
        {profile.name}
      </p>
      <div className="wrap flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight">{profile.name}</p>
          <p className="text-mute">{rolesShort.slice(0, 4).join(" · ")} Developer · {profile.location}</p>
          <p className="mt-4 font-mono text-xs text-mute">Built with curiosity &amp; code.</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mute">
          {nav.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="link-underline py-1 hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={profile.github.href} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-10 place-items-center rounded-full border border-white/15 text-mute transition-colors hover:border-signal hover:text-signal">
            <Github className="size-4" aria-hidden />
          </a>
          <a href={profile.linkedin.href} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full border border-white/15 text-mute transition-colors hover:border-signal hover:text-signal">
            <Linkedin className="size-4" aria-hidden />
          </a>
        </div>
      </div>
      <p className="wrap pb-8 text-xs text-mute/70">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
    </footer>
  );
}
