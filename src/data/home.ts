import { Briefcase, Github, Mail, User } from "lucide-react";

export const pages = [
  {
    value: "about" as const,
    label: "About",
    description: "Who I am and what I'm exploring.",
    icon: User,
  },
  {
    value: "projects" as const,
    label: "Projects",
    description: "Selected work and experiments.",
    icon: Briefcase,
  },
  {
    value: "contact" as const,
    label: "Contact",
    description: "Ways to reach me around the web.",
    icon: Mail,
  },
];

export type PageValue = (typeof pages)[number]["value"];

export const highlights = [
  {
    label: "Email",
    href: "mailto:zhexuanma@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    href: "https://github.com/zx-ma",
    icon: Github,
    external: true,
  },
  {
    label: "Projects",
    href: "#projects",
    icon: Briefcase,
  },
];

export const latestWriting = [
  {
    label: "Hyprland motion system",
    href: "/blog/hyprland-motion",
  },
  {
    label: "Building command palettes",
    href: "/blog/command-palette",
  },
  {
    label: "Tailwind v4 migration notes",
    href: "/blog/tailwind-v4-migration",
  },
  {
    label: "Designing UI motion systems",
    href: "/blog/ui-motion-systems",
  },
];

export const aboutContent = {
  intro: `Replace this paragraph with your story. Talk about what you're building,
what you're learning, and what visitors should explore next.`,
  currently: [
    "Experimenting with terminal-inspired web UIs.",
    "Writing about tools, workflows, and creative coding.",
    "Exploring declarative window managers like Hyprland/Niri.",
  ],
};

export const projectsContent = [
  {
    title: "terminal-ui",
    description:
      "A playful terminal puzzle that unlocks this portfolio experience.",
  },
  {
    title: "personal-site",
    description:
      "A Vite + React + Tailwind playground for experimenting with motion and UI states.",
  },
  {
    title: "writing",
    description:
      "Notes on workflow, open source contributions, and daily tooling tweaks.",
  },
];

export const contactContent = {
  intro: "Drop a note or follow along where I'm most active.",
  entries: [
    { label: "Email", value: "hello@example.com" },
    { label: "GitHub", value: "github.com/yourname" },
    { label: "Newsletter", value: "Share notes, deep dives, or upcoming talks here." },
  ],
};
