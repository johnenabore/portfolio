import { AboutSection } from "./_components/about/about-section";
import { ContactSection } from "./_components/contact/contact-section";
import { Hero } from "./_components/hero/hero";
import { ProjectsSection } from "./_components/projects/projects-section";
import { SectionRail } from "./_components/section-rail";
import { SectionScroll } from "./_components/section-scroll";

export default function Home() {
  return (
    <main>
      <SectionScroll />
      <SectionRail />
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
