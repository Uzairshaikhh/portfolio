/**
 * Single source of truth for portfolio content (from Uzair's resume).
 * Anything not stated in the resume is deliberately left out.
 */

export const profile = {
  name: "Uzair Shaikh",
  monogram: "UZ",
  roles: [
    "Frontend Developer",
    "React Developer",
    "Full-Stack Developer",
    "Backend Developer",
    "Web Developer",
    "JavaScript Developer",
  ],
  location: "Mumbai, India",
  phone: "+91 73048 93326",
  phoneHref: "tel:+917304893326",
  email: "uzair.shaikh.01kb@gmail.com",
  github: { handle: "Uzairshaikhh", href: "https://github.com/Uzairshaikhh" },
  linkedin: { href: "https://www.linkedin.com/in/uzair-shaikh-1b9a8b274/" },
  resumeHref: "/Uzair_Shaikh.pdf",
  seeking: "Remote Frontend, React, Backend & Full-Stack roles — internship or entry-level",
};

/** "Frontend Developer" → "Frontend" (for tight spaces like the intro and marquee). */
export const rolesShort = profile.roles.map((r) => r.replace(/ Developer$/, ""));

export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const aboutFacts = [
  { label: "Based in", value: "Mumbai, India" },
  { label: "Studying", value: "B.Sc. IT · Vivek College of Commerce" },
  { label: "Graduating", value: "2027 (expected)" },
  { label: "Focus", value: "Frontend · React · Backend · Full-Stack" },
];

export const softSkills = [
  "Problem Solving",
  "Communication",
  "Time Management",
  "Quick Learning",
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  name: string;
  kind: string;
  blurb: string;
  stack: string[];
  domain: string;
  /** Present only when the site is actually reachable. */
  href?: string;
  github?: string;
  /** Screenshot of the real site. Omitted when the site is offline. */
  image?: { src: string; alt: string };
  study: {
    overview: string;
    built: string;
    features: string[];
    challenge: string;
    solution: string;
  };
};

export const projects: Project[] = [
  {
    slug: "sm-fabrication",
    name: "SM Fabrication",
    kind: "Industrial business inquiry website",
    blurb:
      "A client-facing inquiry site for an industrial fabrication business — designed, built and deployed end to end, with every form submission emailed to the client the moment it's sent.",
    stack: ["React.js", "Vite", "TailwindCSS", "Node.js/SMTP"],
    domain: "smfabrications.co.in",
    href: "https://smfabrications.co.in/",
    image: {
      src: "/projects/sm-fabrication.jpg",
      alt: "Screenshot of the SM Fabrication website: a storage racking solutions landing page with an inquiry-focused layout.",
    },
    study: {
      overview:
        "A client-facing inquiry website for an industrial fabrication business, delivered end to end — from design through deployment.",
      built:
        "The full frontend in React.js, Vite and TailwindCSS, plus a Node.js/SMTP backend service that turns every form submission into an email to the client.",
      features: [
        "Inquiry forms with handling and validation",
        "Automated SMTP email delivery for each submission",
        "Responsive layout across devices",
        "Live domain hosting and deployment",
      ],
      challenge: "Inquiries were being tracked manually.",
      solution:
        "An automated SMTP email pipeline, so every form submission reaches the client instantly and manual inquiry tracking is no longer needed.",
    },
  },
  {
    slug: "amazing-groups",
    name: "Amazing Groups",
    kind: "Corporate & personalized gifting website",
    blurb:
      "A B2B website for a corporate gifting manufacturer and supplier — a catalog-style experience for buyers browsing bulk-order products and branding services.",
    stack: ["React.js", "Vite", "TailwindCSS"],
    domain: "amazinggroups.in",
    href: "https://amazinggroups.in/",
    image: {
      src: "/projects/amazing-groups.jpg",
      alt: "Screenshot of the Amazing Groups website: a dark, gold-accented corporate gifting landing page with a product showcase.",
    },
    study: {
      overview:
        "A B2B website for a corporate gifting manufacturer/supplier, showcasing bulk-order product catalogs and branding services.",
      built:
        "Independently designed, built and deployed in React.js, Vite and TailwindCSS — a responsive, catalog-style UI.",
      features: [
        "Catalog-style product browsing",
        "Bulk custom-order requests",
        "Branding services showcase",
        "Responsive across devices",
      ],
      challenge:
        "Presenting bulk-order catalogs and branding services so B2B buyers can browse and request custom orders.",
      solution:
        "A responsive, catalog-style UI optimized for B2B buyers browsing and requesting bulk custom orders.",
    },
  },
  {
    slug: "saheb-foundation",
    name: "Saheb Foundation",
    kind: "NGO / non-profit website",
    blurb:
      "A public-facing site for a charitable organization — built to communicate their mission, programs and outreach with accessible, donor-friendly UI/UX.",
    stack: ["React.js", "Vite", "TailwindCSS"],
    domain: "sahebfoundation.org",
    href: "https://sahebfoundation.org/",
    image: {
      src: "/projects/saheb-foundation.jpg",
      alt: "Screenshot of the Saheb Foundation website: a full-bleed hero image with a navigation bar and a Donate Now button.",
    },
    study: {
      overview:
        "A public-facing website for a charitable organization, covering their mission, programs and outreach.",
      built:
        "End-to-end build and deployment in React.js, Vite and TailwindCSS, with a focus on accessible, donor-friendly UI/UX.",
      features: [
        "Mission, programs and outreach content",
        "Accessible, donor-friendly UI/UX",
        "Responsive across devices",
        "Live deployment",
      ],
      challenge:
        "Clearly communicating the foundation's cause and initiatives to visitors.",
      solution:
        "Accessible, donor-friendly UI/UX that puts the foundation's mission and programs front and center.",
    },
  },
  {
    slug: "animedropzone",
    name: "AnimeDropZone",
    kind: "Anime streaming / content platform",
    blurb:
      "A production-ready, fully responsive content site built to handle live traffic — powered by a reusable React component library and ongoing performance tuning.",
    stack: ["React.js", "Vite", "TailwindCSS"],
    domain: "animedropzone.com",
    github: "https://github.com/Uzairshaikhh/animedropzone",
    study: {
      overview:
        "A production-ready, fully responsive content site built for an anime streaming / content platform, handling live traffic.",
      built:
        "The frontend in React.js, Vite and TailwindCSS, including a reusable component library shared across pages.",
      features: [
        "Fully responsive layouts",
        "Reusable React component library",
        "Ongoing performance and layout optimization",
      ],
      challenge: "Avoiding duplicate UI code across pages while keeping the site fast.",
      solution:
        "A reusable React component library that cut duplicate UI code across pages, plus ongoing performance and layout optimization.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export type Tech = {
  id: string;
  name: string;
  blurb: string;
  /** Matches an entry in a project's `stack`, used to show where it's used. */
  stackKey?: string;
};

export type SkillGroup = { group: string; note: string; items: Tech[] };

export const skillGroups: SkillGroup[] = [
  {
    group: "Frontend",
    note: "Where I spend most of my time",
    items: [
      { id: "react", name: "React.js", stackKey: "React.js", blurb: "My primary stack — the component architecture behind all four production sites." },
      { id: "html", name: "HTML5", blurb: "Semantic markup as the foundation of every page." },
      { id: "css", name: "CSS3", blurb: "Layout and responsive behavior, from phone to desktop." },
      { id: "tailwind", name: "TailwindCSS", stackKey: "TailwindCSS", blurb: "The styling system across every production site." },
      { id: "vite", name: "Vite", stackKey: "Vite", blurb: "Build tooling and dev server across every project." },
      { id: "responsive", name: "Responsive UI", blurb: "Interfaces that adapt cleanly across devices." },
      { id: "components", name: "Component Architecture", blurb: "A reusable component library on AnimeDropZone cut duplicate UI code across pages." },
    ],
  },
  {
    group: "Backend & APIs",
    note: "Enough of the stack to ship real workflows",
    items: [
      { id: "node", name: "Node.js", stackKey: "Node.js/SMTP", blurb: "SMTP integration for form handling and automated email workflows." },
      { id: "rest", name: "REST API Integration", blurb: "Connecting frontends to backend services and APIs." },
      { id: "forms", name: "Form Handling & Validation", blurb: "Inquiry forms wired to real email delivery." },
    ],
  },
  {
    group: "Languages",
    note: "",
    items: [
      { id: "js", name: "JavaScript", blurb: "The language every project is built on." },
      { id: "ts", name: "TypeScript (basic)", blurb: "Basic proficiency, used alongside React." },
      { id: "c", name: "C", blurb: "Programming fundamentals from my IT coursework." },
      { id: "cpp", name: "C++", blurb: "Programming fundamentals from my IT coursework." },
    ],
  },
  {
    group: "Tools & Workflow",
    note: "",
    items: [
      { id: "git", name: "Git", blurb: "Version control with a clean, organized commit history." },
      { id: "github", name: "GitHub", blurb: "Where every project lives." },
      { id: "vscode", name: "VS Code", blurb: "Where the code gets written." },
      { id: "devtools", name: "Chrome DevTools", blurb: "Debugging, layout inspection and performance checks." },
    ],
  },
  {
    group: "Deployment",
    note: "",
    items: [
      { id: "hosting", name: "Domain Hosting", blurb: "Connecting projects to live domains." },
      { id: "deploy", name: "Live Deployment", blurb: "Shipping to production, not just localhost." },
      { id: "maintain", name: "Production Maintenance", blurb: "Ongoing updates and fixes on live sites." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const timeline = [
  {
    when: "2024",
    title: "Independent Web Developer",
    meta: "2024 — Present · Freelance / Self-Directed · Mumbai, India",
    points: [
      "Designed, developed and deployed four client/production websites end to end with React.js, Vite and TailwindCSS.",
      "Integrated backend form handling with SMTP-based email automation for real-time client notifications.",
      "Managed hosting, deployment pipelines and ongoing production maintenance independently across all projects.",
      "Used Git/GitHub for version control, maintaining a clean, organized commit history.",
    ],
  },
  {
    when: "2027",
    title: "B.Sc. Information Technology",
    meta: "Vivek College of Commerce, Mumbai · Expected graduation",
    points: [
      "Relevant coursework: Web Development, Database Concepts, Data Structures (Basics), Operating Systems, Computer Networks.",
    ],
  },
  {
    when: "Next",
    title: "Joining a team",
    meta: "Remote · Internship or entry-level",
    points: [
      "Looking for a Frontend, React, Backend or Full-Stack role where I can bring the same end-to-end ownership to a team.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const processSteps = [
  { title: "Discover", text: "Understand the problem, the audience and what the site has to achieve — before a single component exists." },
  { title: "Design", text: "Plan the component architecture and a responsive UI system that will hold up across pages and devices." },
  { title: "Develop", text: "Build with React.js, Vite and TailwindCSS, wiring up APIs and Node.js/SMTP form handling where the project needs it." },
  { title: "Refine", text: "Test across screen sizes, optimize performance and layout, and polish the details." },
  { title: "Ship", text: "Deploy to a live domain — then keep maintaining and updating it in production." },
];

/* ------------------------------------------------------------------ */
/* GitHub                                                              */
/* ------------------------------------------------------------------ */

/** Curated repositories. Language is static; the last-push date is fetched live. */
export const repos = [
  { name: "animedropzone", language: "TypeScript" },
  { name: "portfolio", language: "TypeScript" },
  { name: "inquriy-webpage", language: "TypeScript" },
  { name: "landing-page", language: "JavaScript" },
  { name: "fitness-tracker", language: "JavaScript" },
];
