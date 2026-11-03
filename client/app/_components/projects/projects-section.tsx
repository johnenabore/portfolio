import localFont from "next/font/local";
import { projects, type Project } from "@/data/projects";
import { ProjectsShowcase } from "./projects-showcase";

const inter = localFont({
  src: "../../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  preload: false,
});

const previews = [
  {
    id: "preview-web-app",
    title: "Project 01 — Full Stack Web App",
    subtitle: "Landing Page Preview",
    category: "real",
    tags: ["Web App", "Full Stack"],
    artwork: "web",
  },
  {
    id: "preview-landing-page",
    title: "Project 02 — Responsive Website",
    subtitle: "Landing Page Preview",
    category: "real",
    tags: ["Landing Page", "Web Design"],
    artwork: "editorial",
  },
  {
    id: "preview-dashboard",
    title: "Project 03 — Analytics Dashboard",
    subtitle: "Dashboard Preview",
    category: "exploration",
    tags: ["Dashboard", "Exploration"],
    artwork: "dashboard",
  },
  {
    id: "preview-mobile",
    title: "Project 04 — Personal Finance",
    subtitle: "Mobile App Preview",
    category: "real",
    tags: ["Mobile App", "UI Design"],
    artwork: "mobile",
  },
] satisfies readonly Project[];

export function ProjectsSection() {
  return <ProjectsShowcase className={inter.className} projects={projects.length ? projects : previews} />;
}
