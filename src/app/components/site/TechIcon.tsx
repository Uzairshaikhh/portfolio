import {
  siReact, siJavascript, siTypescript, siC, siCplusplus, siHtml5, siCss,
  siTailwindcss, siNodedotjs, siVite, siGit, siGithub, siGooglechrome,
} from "simple-icons";
import {
  Code2, Globe, Rocket, Wrench, Smartphone, Blocks, Webhook, TextCursorInput,
  type LucideIcon,
} from "lucide-react";

const brand: Record<string, { path: string }> = {
  react: siReact, js: siJavascript, ts: siTypescript, c: siC, cpp: siCplusplus,
  html: siHtml5, css: siCss, tailwind: siTailwindcss, node: siNodedotjs,
  vite: siVite, git: siGit, github: siGithub, devtools: siGooglechrome,
};

const generic: Record<string, LucideIcon> = {
  vscode: Code2, hosting: Globe, deploy: Rocket, maintain: Wrench,
  responsive: Smartphone, components: Blocks, rest: Webhook, forms: TextCursorInput,
};

export function TechIcon({ id, className = "size-5" }: { id: string; className?: string }) {
  const b = brand[id];
  if (b) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
        <path d={b.path} />
      </svg>
    );
  }
  const Icon = generic[id] ?? Code2;
  return <Icon className={className} strokeWidth={1.6} aria-hidden />;
}
