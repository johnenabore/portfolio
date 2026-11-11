import type { ProjectArtwork } from "./projects";

type Service = {
  id: string;
  title: string;
  description: string;
} & ({ artwork: ProjectArtwork } | { image: string });

export const services = [
  {
    id: "web-development",
    title: "Web Design & Development",
    description: "Responsive websites and web apps, from layout to implementation.",
    artwork: "web",
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Computer vision prototypes, from image preprocessing to model evaluation.",
    image: "/projects/smart-egg-sorter/classification.webp",
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    description: "Mobile apps with clear interfaces and support for offline workflows.",
    artwork: "mobile",
  },
  {
    id: "microcontroller-development",
    title: "ESP32 & Microcontrollers",
    description: "Firmware and prototypes that connect sensors, motors, and apps.",
    image: "/projects/smart-egg-sorter/sort.webp",
  },
] as const satisfies readonly Service[];
