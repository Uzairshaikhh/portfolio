import { motion, useSpring, useTransform, type MotionValue } from "motion/react";

/** A floating code window that describes Uzair — real facts from the resume, not filler. */
const lines: [string, string?][] = [
  ["const ", "uzair = {"],
  ["  roles: ", '["Frontend", "Backend", "Full-Stack"],'],
  ["  stack: ", '["React", "Vite", "Tailwind"],'],
  ["  shipped: ", "4,"],
  ["  base: ", '"Mumbai, IN",'],
  ["  openTo: ", '"remote roles",'],
  ["};"],
  [""],
  ["uzair.", "build();"],
];

function Line({ parts }: { parts: [string, string?] }) {
  const [a, b] = parts;
  const isKey = a.startsWith("  ");
  const isStr = b?.startsWith('"') || b?.startsWith("[");
  const isNum = b && /^\d/.test(b);
  return (
    <>
      <span className={a.startsWith("const") ? "text-mute" : isKey ? "text-ink" : "text-ink"}>{a}</span>
      {b && <span className={isStr ? "text-signal" : isNum ? "text-signal" : "text-ink"}>{b}</span>}
    </>
  );
}

export function Terminal({ mx, my, d = 0 }: { mx: MotionValue<number>; my: MotionValue<number>; d?: number }) {
  const x = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 90, damping: 20 });
  const y = useSpring(useTransform(my, [-1, 1], [-10, 10]), { stiffness: 90, damping: 20 });

  return (
    <motion.div style={{ x, y }} className="relative">
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-signal/[0.07] blur-3xl" />
      <motion.figure
        aria-label="A code snippet describing Uzair Shaikh"
        className="w-full overflow-hidden rounded-2xl border border-white/10 bg-panel/90 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] backdrop-blur"
        initial={{ opacity: 0, y: 40, rotate: 1.5 }}
        animate={{ opacity: 1, y: [0, -8, 0], rotate: 0 }}
        transition={{
          opacity: { duration: 0.9, delay: 0.7 + d },
          rotate: { duration: 0.9, delay: 0.7 + d },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.6 + d },
        }}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-[0.7rem] text-mute">uzair.ts</span>
        </div>
        <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.66rem] leading-[1.8] sm:px-5 sm:text-[0.84rem] sm:leading-[1.75]">
          <code>
            {lines.map((l, i) => (
              <motion.span
                key={i}
                className="block whitespace-pre"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + d + i * 0.11, duration: 0.4 }}
              >
                <Line parts={l} />
                {i === lines.length - 1 && (
                  <span className="ml-0.5 inline-block h-[1.05em] w-[0.5ch] translate-y-[0.2em] bg-signal [animation:caret_1.1s_steps(1)_infinite]" />
                )}
              </motion.span>
            ))}
          </code>
        </pre>
        <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-2.5 font-mono text-[0.68rem] text-mute [@media(max-height:800px)]:hidden">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-signal" /> ready to build
          </span>
          <span>TypeScript</span>
        </div>
      </motion.figure>
    </motion.div>
  );
}
