import { portfolioLinks } from "@/data/portfolio-links";
import { projects } from "@/data/projects";

export const heroContent = {
  name: { first: "John", last: "Enabore" },
  role: "Aspiring Full Stack Developer",
  introduction: "I love building application that has a purpose",
  availability: "Available for hire and collaboration",
  portraitSrc: "/hero-portrait.webp",
  collaborateLabel: "Let's collaborate",
};

export const heroNavigation: readonly { label: string; count?: string; href?: string }[] = [
  {
    label: "Projects",
    count: String(projects.length).padStart(2, "0"),
    href: "#projects",
  },
  { label: "Service" },
  { label: "Experience" },
  { label: "Contact", href: portfolioLinks.collaborate },
];

export const heroSocials = [
  { id: "linkedin", label: "LinkedIn", href: portfolioLinks.linkedin },
  { id: "github", label: "GitHub", href: portfolioLinks.github },
] as const;
