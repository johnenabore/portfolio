import type { Project } from "./projects";

export const smartEggSorter = {
  id: "smart-egg-sorter",
  title: "Smart Egg Sorter",
  subtitle: "Offline-first computer vision",
  description: "A thesis project exploring how poultry farmers can check egg fertility where connectivity is unreliable.",
  href: "/projects/smart-egg-sorter",
  artwork: "egg-sorter",
  tags: ["Computer Vision", "Offline-first PWA", "ESP32"],
} satisfies Project;

export const smartEggSorterClips = [
  {
    title: "Connect the sorter",
    cover: { label: "Connect", duration: "0:09", crop: "center 50%" },
    description: "The app connects to the sorter over Bluetooth and opens the live scan view.",
    image: { src: "/projects/smart-egg-sorter/connection.webp", alt: "The app confirms the sorter is connected over Bluetooth." },
    video: { src: "/projects/smart-egg-sorter/connection.mp4", width: 720, height: 1558 },
  },
  {
    title: "Classify an egg",
    cover: { label: "Classify", duration: "0:09", crop: "center 48%" },
    description: "The scan returns a fertility result and shows how confident the model is.",
    image: { src: "/projects/smart-egg-sorter/classification.webp", alt: "The scan result reads Infertile with 85% confidence." },
    video: { src: "/projects/smart-egg-sorter/classification.mp4", width: 720, height: 1558 },
  },
  {
    title: "Watch the sorter in action",
    cover: { label: "Sort", duration: "0:07", crop: "center 56%" },
    description: "A close-up shows the servo moving the sorting gate.",
    image: { src: "/projects/smart-egg-sorter/sort.webp", alt: "The sorting gate and servo on the prototype." },
    video: { src: "/projects/smart-egg-sorter/sort.mp4", width: 720, height: 1280 },
  },
] as const;
