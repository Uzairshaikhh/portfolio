/**
 * "US" monogram: a serif U with an italic S tucked into it, inside fine double
 * rings — the same upright/italic serif pairing used in the hero headline.
 * Letterforms are the real Instrument Serif outlines converted to paths, so the
 * mark renders identically everywhere without waiting for a web font.
 *
 * When an ancestor with the `group` class is hovered (the nav badge) the rings
 * light up and the S eases away from the U.
 */
const U_PATH =
  "M25.82 47.89Q23.5 47.89 21.71 46.79Q19.92 45.69 18.93 43.73Q17.94 41.77 17.94 39.23V19.34Q17.94 18.44 17.66 18.14Q17.38 17.83 16.48 17.66L15.49 17.49Q14.93 17.36 14.93 16.97Q14.93 16.5 15.57 16.5H23.45Q24.1 16.5 24.1 17.02Q24.1 17.4 23.62 17.49L22.46 17.66Q21.6 17.79 21.3 18.14Q21 18.48 21 19.38V39.28Q21 42.55 22.46 44.36Q23.93 46.17 26.55 46.17Q29.22 46.17 30.69 44.36Q32.15 42.55 32.15 39.28V20.25Q32.15 17.92 30.69 17.66L29.52 17.49Q29.05 17.4 29.05 17.02Q29.05 16.5 29.7 16.5H35.9Q36.54 16.5 36.54 16.97Q36.54 17.36 35.98 17.49L34.99 17.66Q33.53 17.92 33.53 20.2V39.23Q33.53 43.15 31.42 45.52Q29.31 47.89 25.82 47.89Z";
const S_PATH =
  "M37.32 47.89Q36.12 47.89 34.76 47.63Q33.41 47.37 32.22 46.92Q31.04 46.47 30.35 45.86Q30.13 45.65 30.07 45.43Q30 45.22 30.09 44.79L31.3 38.03Q31.42 37.25 31.98 37.25Q32.5 37.25 32.5 38.11L32.54 39.79Q32.63 43.41 33.79 45Q34.96 46.6 37.58 46.6Q39.99 46.6 41.59 44.85Q43.18 43.11 43.18 40.18Q43.18 38.29 42.15 36.22Q41.11 34.15 39.26 32.09Q37.07 29.63 36.01 27.61Q34.96 25.58 34.96 23.35Q34.96 21.58 35.82 19.92Q36.68 18.27 38.42 17.17Q40.17 16.07 42.88 16.07Q46.62 16.07 48.6 17.75Q49.21 18.22 49.03 19.17L47.83 25.46Q47.7 26.1 47.23 26.1Q46.75 26.1 46.67 25.37L46.62 24.47Q46.45 20.98 45.65 19.15Q44.86 17.32 42.49 17.32Q40.77 17.32 39.73 18.09Q38.7 18.87 38.23 20.01Q37.75 21.15 37.75 22.27Q37.75 23.52 38.1 24.66Q38.44 25.8 39.28 27.07Q40.12 28.34 41.59 30.15Q43.65 32.6 44.82 34.84Q45.98 37.08 45.98 39.19Q45.98 41.73 44.84 43.69Q43.7 45.65 41.76 46.77Q39.82 47.89 37.32 47.89Z";

export function Logo({ className = "size-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={`select-none ${className}`}>
      <circle cx="32" cy="32" r="30.6" fill="none" strokeWidth=".9" className="stroke-white/30 transition-colors duration-300 group-hover:stroke-signal/70" />
      <circle cx="32" cy="32" r="28.2" fill="none" strokeWidth=".55" className="stroke-signal/75 transition-colors duration-300 group-hover:stroke-signal" />
      <g strokeWidth=".7" strokeLinejoin="round">
        <path d={U_PATH} className="fill-ink stroke-ink" />
        <path d={S_PATH} className="fill-signal stroke-signal transition-transform duration-500 ease-out group-hover:translate-x-[1.4px]" />
      </g>
    </svg>
  );
}
