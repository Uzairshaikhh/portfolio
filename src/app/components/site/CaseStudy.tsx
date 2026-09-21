import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Github, X } from "lucide-react";
import type { Project } from "../../data/resume";
import { BrowserFrame, OfflineScreen } from "./BrowserFrame";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2.5 font-mono text-xs uppercase tracking-[0.18em] text-signal">{title}</h3>
      {children}
    </section>
  );
}

export function CaseStudy({ project, index, open, onClose }: { project: Project; index: number; open: boolean; onClose: () => void }) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-void/80 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className="fixed inset-0 z-[90] overflow-y-auto overscroll-contain outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-6 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {(
            <div className="mx-auto my-0 min-h-full max-w-5xl border-white/10 bg-panel sm:my-10 sm:min-h-0 sm:rounded-3xl sm:border">
              <div className="flex items-center justify-between px-5 pt-5 sm:px-10 sm:pt-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">
                  <span className="text-signal">Case study</span> · 0{index + 1}
                </p>
                <Dialog.Close
                  aria-label="Close case study"
                  className="grid size-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-signal hover:text-signal"
                >
                  <X className="size-5" aria-hidden />
                </Dialog.Close>
              </div>

              <div className="px-5 pb-10 pt-4 sm:px-10 sm:pb-12">
                <Dialog.Title className="text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.04em]">
                  {project.name}
                </Dialog.Title>
                <Dialog.Description className="mt-3 text-lg text-mute">{project.kind}</Dialog.Description>

                <div className="mt-8">
                  <BrowserFrame project={project}>
                    {project.image ? (
                      <img src={project.image.src} alt={project.image.alt} width={1440} height={900} className="size-full object-cover object-top" />
                    ) : (
                      <OfflineScreen project={project} />
                    )}
                  </BrowserFrame>
                </div>

                <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-14 md:gap-y-10">
                  <Block title="Overview">
                    <p className="leading-relaxed text-mute">{project.study.overview}</p>
                  </Block>
                  <Block title="What I built">
                    <p className="leading-relaxed text-mute">{project.study.built}</p>
                  </Block>
                  <Block title="Key features">
                    <ul className="space-y-2 text-mute">
                      {project.study.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-signal" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Block>
                  <Block title="Technology">
                    <ul className="flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <li key={s} className="rounded-full border border-white/10 px-3.5 py-1.5 font-mono text-xs text-ink">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Block>
                  <Block title="Challenge">
                    <p className="leading-relaxed text-mute">{project.study.challenge}</p>
                  </Block>
                  <Block title="Solution">
                    <p className="leading-relaxed text-mute">{project.study.solution}</p>
                  </Block>
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-8">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-sm font-semibold uppercase tracking-[0.1em] text-void transition-colors hover:bg-ink"
                    >
                      Live project
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </a>
                  ) : (
                    <span className="inline-flex h-12 items-center rounded-full border border-white/10 px-6 font-mono text-xs uppercase tracking-[0.14em] text-mute">
                      {project.domain} · currently offline
                    </span>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold uppercase tracking-[0.1em] transition-colors hover:border-signal hover:text-signal"
                    >
                      <Github className="size-4" aria-hidden /> GitHub
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
