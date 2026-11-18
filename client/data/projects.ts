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
    src: "/projects/gwa-predict/card.webp",
    alt: "GWAPredict: scroll habits in, GWA out. A laptop and phone show the GWAPredict landing page.",
  },
  tags: ["Machine Learning", "React", "FastAPI"],
  contribution: "Frontend developer",
  model: "Random Forest",
} satisfies Project & FeaturedProjectData & { model: string };

export const featuredProjects: readonly FeaturedProjectData[] = [smartEggSorter, gwaPredict];

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

export const projects: readonly Project[] = [smartEggSorter, gwaPredict, developerPortfolio];

// Reading order for the "Next project" link at the end of each case study.
export const caseStudies = [smartEggSorter, gwaPredict, developerPortfolio] as const;
