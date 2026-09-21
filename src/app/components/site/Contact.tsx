import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "../../data/resume";
import { MaskLine, Reveal } from "./Reveal";

const rows = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, ext: false },
  { icon: Linkedin, label: "LinkedIn", value: "Connect on LinkedIn", href: profile.linkedin.href, ext: true },
  { icon: Github, label: "GitHub", value: `@${profile.github.handle}`, href: profile.github.href, ext: true },
  { icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref, ext: false },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line pb-16 pt-24 sm:pt-32">
      <div aria-hidden className="absolute bottom-[-20rem] left-1/2 h-[32rem] w-[64rem] -translate-x-1/2 rounded-full bg-signal/[0.08] blur-3xl" />
      <div className="wrap relative">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-mute">
          <span className="text-signal">08</span>
          <span aria-hidden className="h-px w-8 bg-line" />
          Contact
        </p>

        <h2 className="mt-8 text-[clamp(2.75rem,10.5vw,10rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em]">
          <MaskLine>Let's build</MaskLine>
          <MaskLine delay={0.1}>
            something{" "}
            <span className="font-serif font-normal normal-case italic tracking-[-0.02em] text-signal">great.</span>
          </MaskLine>
        </h2>

        <Reveal className="mt-8">
          <p className="max-w-lg text-xl text-mute">Have an idea, opportunity, or project? Let's talk.</p>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20">
          <ul className="border-t border-line">
            {rows.map(({ icon: Icon, label, value, href, ext }) => (
              <li key={label} className="border-b border-line">
                <div className="flex items-center gap-3">
                  <a
                    href={href}
                    {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-w-0 flex-1 items-center gap-3 py-5 transition-[padding] duration-300 hover:pl-3 sm:py-8"
                  >
                    <span className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-8">
                      <span className="flex shrink-0 items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-mute sm:w-36">
                        <Icon className="size-4" aria-hidden />
                        {label}
                      </span>
                      <span className="min-w-0 break-words text-[clamp(1.1rem,2.6vw,2.25rem)] font-medium tracking-tight transition-colors group-hover:text-signal sm:truncate">
                        {value}
                      </span>
                    </span>
                    <ArrowUpRight className="size-5 shrink-0 text-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal sm:size-6" aria-hidden />
                  </a>
                  {label === "Email" && (
                    <button
                      type="button"
                      onClick={copy}
                      aria-label="Copy email address"
                      className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3 font-mono text-xs text-mute transition-colors hover:border-signal hover:text-signal"
                    >
                      {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
                      <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
