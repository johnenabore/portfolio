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
  description: "An offline-first app for checking egg fertility on farms with unreliable internet.",
  href: "/projects/smart-egg-sorter",
  image: {
    src: "/projects/smart-egg-sorter/thesis-website-mockup.webp",
    alt: "Smart Egg Sorter on a laptop, tablet, and phone showing the prototype, species selection, and a scan result.",
  },
  tags: ["Computer Vision", "Offline-first PWA", "ESP32"],
  contribution: "Web app & ESP32 integration",
  duckTestAccuracy: "87.5%",
} satisfies Project & { contribution: string; duckTestAccuracy: string };

export const projects: readonly Project[] = [
  smartEggSorter,
  {
    id: "developer-portfolio",
    title: "Developer Portfolio",
    subtitle: "Next.js site with interactive case studies and live Spotify activity.",
    href: "/projects/developer-portfolio",
  },
];
