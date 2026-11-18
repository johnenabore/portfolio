import type { ReactNode } from "react";
import { CaseStudyMotion } from "@/app/_components/projects/case-study-motion";
import { ReadingProgress } from "@/app/_components/projects/reading-progress";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ReadingProgress />
      <CaseStudyMotion>{children}</CaseStudyMotion>
    </>
  );
}
