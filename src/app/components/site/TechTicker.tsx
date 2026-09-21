import { TechIcon } from "./TechIcon";

const items = [
  { id: "react", name: "React.js" },
  { id: "js", name: "JavaScript" },
  { id: "ts", name: "TypeScript" },
  { id: "tailwind", name: "TailwindCSS" },
  { id: "vite", name: "Vite" },
  { id: "node", name: "Node.js" },
  { id: "html", name: "HTML5" },
  { id: "css", name: "CSS3" },
  { id: "git", name: "Git" },
  { id: "github", name: "GitHub" },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16">
      {items.map((t) => (
        <li key={t.id} className="flex items-center gap-3 whitespace-nowrap text-mute transition-colors hover:text-ink">
          <TechIcon id={t.id} className="size-5" />
          <span className="text-[0.95rem] font-medium tracking-tight">{t.name}</span>
        </li>
      ))}
    </ul>
  );
}

/** Slow ticker of the stack, sitting between the hero and About. */
export function TechTicker() {
  return (
    <section aria-label="Technologies I work with" className="border-y border-line bg-deep/50 py-6">
      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max [animation:marquee_45s_linear_infinite] group-hover:[animation-play-state:paused]">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
