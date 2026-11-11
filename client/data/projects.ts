export type ProjectArtwork = "web" | "editorial" | "dashboard" | "mobile" | "egg-sorter";

export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  href?: string;
  image?: { src: string; alt: string };
  tags?: readonly string[];
};

export const smartEggSorter = {
  id: "smart-egg-sorter",
  title: "Smart Egg Sorter",
  subtitle: "Offline-first computer vision",
  description: "A thesis project exploring how poultry farmers can check egg fertility where connectivity is unreliable.",
  href: "/projects/smart-egg-sorter",
  image: {
    src: "/projects/smart-egg-sorter/thesis-cover.webp",
    alt: "The Smart Egg Sorter prototype with its central egg chute and sorting gates.",
  },
  tags: ["Computer Vision", "Offline-first PWA", "ESP32"],
} satisfies Project;

export const projects: readonly Project[] = [smartEggSorter];
