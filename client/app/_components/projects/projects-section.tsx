import { sectionFont } from "@/app/fonts";
import { projects, type Project } from "@/data/projects";
import { smartEggSorter } from "@/data/smart-egg-sorter";
import { ProjectsShowcase } from "./projects-showcase";

const previews = [
  smartEggSorter,
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
  return (
    <ProjectsShowcase
      className={sectionFont.className}
      projects={projects.length ? projects : previews}
      featured={projects[0] ?? smartEggSorter}
      featuredPlaceholder={!projects.length}
    />
  );
}
