import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import type { Project } from "../../data/resume";

/** Browser-window mockup. Shows the real site screenshot, or an honest offline state. */
export function BrowserFrame({ project, children }: { project: Project; children?: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-panel shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)] sm:rounded-2xl">
      <div className="flex items-center gap-3 border-b border-white/[0.07] bg-deep px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div className="mx-auto flex h-6 w-full max-w-[16rem] items-center justify-center gap-1.5 rounded-md bg-white/[0.05] px-3 font-mono text-[0.68rem] text-mute">
          <Lock className="size-3 shrink-0 opacity-60" aria-hidden />
          <span className="truncate">{project.domain}</span>
        </div>
        <div className="w-12" aria-hidden />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-deep">{children}</div>
    </div>
  );
}

export function OfflineScreen({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at 50% 50%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 20%, transparent 75%)",
        }}
      />
      <p className="relative text-[clamp(1.75rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.04em]">
        {project.name}
      </p>
      <p className="relative inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute">
        <span className="size-1.5 rounded-full bg-mute/60" /> Currently offline
      </p>
    </div>
  );
}
