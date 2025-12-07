import { Briefcase, Github, Mail, User } from "lucide-react";

export const pages = [
  {
    value: "about" as const,
    label: "About",
    description: "me....",
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
    description: "contact me",
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
    label: "to do",
    href: "to do",
  },
];

export const aboutContent = {
  intro: `about`,
  currently: ["to do"],
};

export const projectsContent = [
  {
    title: "to do",
    description: "to do",
  },
];

export const contactContent = {
  intro: "contact me",
  entries: [
    { label: "Email", value: "zhexuanma@gmail.com" },
    { label: "GitHub", value: "github.com/zx-ma" },
  ],
};
