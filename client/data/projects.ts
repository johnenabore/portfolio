export type ProjectArtwork = "web" | "editorial" | "dashboard" | "mobile" | "egg-sorter";

export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  href?: string;
  image?: { src: string; alt: string };
  artwork?: ProjectArtwork;
  category?: "real" | "exploration";
  tags?: readonly string[];
};

export const projects: readonly Project[] = [];
