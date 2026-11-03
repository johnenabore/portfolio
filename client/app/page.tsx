import { Hero } from "./_components/hero/hero";
import { ProjectsSection } from "./_components/projects/projects-section";
import { SectionScroll } from "./_components/section-scroll";

export default function Home() {
  return (
    <main>
      <SectionScroll />
      <Hero />
      <ProjectsSection />
    </main>
  );
}
