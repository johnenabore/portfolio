type Picture = { src: string; alt: string };

export type Project = {
  id: string;
  title: string;
  /** Short kind of project shown beside the title on cards, e.g. "Team thesis". */
  label?: string;
  subtitle?: string;
  description?: string;
  href?: string;
  /** Card artwork (brand, headline and devices), used on cards and as the case-study hero. */
  thumbnail?: Picture;
  tags?: readonly string[];
};

export type FeaturedProjectData = Required<Pick<Project, "id" | "title" | "description" | "href" | "thumbnail">> & {
  label: string;
  contribution: string;
};

export const smartEggSorter = {
  label: "Team thesis",
  id: "smart-egg-sorter",
  title: "Smart Egg Sorter",
  subtitle: "Offline-first computer vision",
  description: "An offline-first app that uses computer vision to check egg fertility on Day 5 of incubation.",
  href: "/projects/smart-egg-sorter",
  thumbnail: {
    src: "/projects/smart-egg-sorter/card.webp",
    alt: "Smart Egg Sorter: every egg checked, Day 5, offline. Two phones show the setup screen and an Infertile scan result.",
  },
  tags: ["Computer Vision", "Offline-first PWA", "ESP32"],
  contribution: "Web app & Hardware integration",
  duckTestAccuracy: "87.5%",
  demoVideo: "https://youtu.be/pER-56zkFns",
} satisfies Project & FeaturedProjectData & { duckTestAccuracy: string; demoVideo: string };

export const gwaPredict = {
  label: "Mini capstone",
  id: "gwa-predict",
  title: "GWAPredict",
  subtitle: "Machine learning web app for academic performance",
  description: "A web app that uses machine learning to predict how social media habits relate to the academic performance of Filipino college students.",
  href: "/projects/gwa-predict",
  thumbnail: {
    src: "/projects/gwa-predict/card-phones.webp",
    alt: "GWAPredict: scroll habits in, GWA out. Two phones show the GWAPredict landing page and the CSV upload step.",
  },
  tags: ["Machine Learning", "React", "FastAPI"],
  contribution: "Frontend developer",
  model: "Random Forest",
} satisfies Project & FeaturedProjectData & { model: string };

export const developerPortfolio = {
  id: "developer-portfolio",
  title: "Developer Portfolio",
  label: "Personal site",
  subtitle: "Next.js site with interactive case studies and live Spotify activity.",
  href: "/projects/developer-portfolio",
  thumbnail: {
    src: "/projects/developer-portfolio/card.webp",
    alt: "Developer Portfolio: built to explore, made to stand out. A laptop and phone show the portfolio homepage.",
  },
} satisfies Project;

export const worldsOfProtheka = {
  id: "worlds-of-protheka",
  title: "Worlds of Protheka",
  label: "Freelance",
  subtitle: "Interactive world map for a US fantasy reading app",
  description: "An interactive world map for Worlds of Protheka, a choose-your-path fantasy reading app. Ten kingdoms to explore, with a living sea, clouds, and a day and night sky.",
  href: "/projects/worlds-of-protheka",
  thumbnail: {
    src: "/projects/worlds-of-protheka/card-phones.webp",
    alt: "Worlds of Protheka: ten kingdoms, one living map. Two phones show the map of Protheka and the Kaynvu kingdom drawer.",
  },
  tags: ["Next.js", "three.js", "WebGL"],
  contribution: "Interactive world map",
  client: "California, USA",
  links: { live: "https://www.worldsofprotheka.app" },
} satisfies Project & FeaturedProjectData & { client: string; links: { live: string } };

export const expentra = {
  id: "expentra",
  title: "Expentra",
  label: "Personal project",
  subtitle: "Bill tracker with ML spending forecasts",
  description: "A personal finance app that tracks your bills and uses machine learning to forecast next month's spending.",
  href: "/projects/expentra",
  thumbnail: {
    src: "/projects/expentra/card.webp",
    alt: "Expentra: track every bill, see next month. Two phones show the Expentra landing page and its forecast cards.",
  },
  tags: ["React", "FastAPI", "Prophet"],
  contribution: "Solo · full stack",
} satisfies Project & FeaturedProjectData;

export const theWheel = {
  id: "the-wheel",
  title: "The Wheel",
  label: "Volunteer",
  subtitle: "News site for a university student publication",
  description: "The news site of The Wheel, the student publication of CABHA at Southern Luzon State University, with a built-in editor for its writers.",
  href: "/projects/the-wheel",
  thumbnail: {
    src: "/projects/the-wheel/thumbnail.webp",
    alt: "The Wheel: campus news, one tap away. Two phones show The Wheel's home page and an article.",
  },
  tags: ["React", "Express", "MongoDB"],
  contribution: "Solo · full stack",
  client: "The Wheel · CABHA, SLSU",
  // The live site's database belongs to the publication and is offline, so the case study links to its launch announcement.
  links: { launchPost: "https://www.facebook.com/share/p/1KVDdU4UeK/" },
} satisfies Project & FeaturedProjectData & { client: string; links: { launchPost: string } };

// Shown as large blocks on the homepage, in this order.
export const featuredProjects: readonly FeaturedProjectData[] = [smartEggSorter, gwaPredict, worldsOfProtheka, expentra, theWheel];

export const projects: readonly Project[] = [smartEggSorter, gwaPredict, worldsOfProtheka, expentra, theWheel, developerPortfolio];

// Reading order for the "Next project" link at the end of each case study.
export const caseStudies = [smartEggSorter, gwaPredict, worldsOfProtheka, expentra, theWheel, developerPortfolio] as const;
