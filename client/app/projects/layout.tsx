import type { ReactNode } from "react";
import { CaseStudyMotion } from "@/app/_components/projects/case-study-motion";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return <CaseStudyMotion>{children}</CaseStudyMotion>;
}
