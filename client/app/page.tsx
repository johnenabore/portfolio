import { IntroLoader } from "./_components/intro-loader";
import { AboutSection } from "./_components/about/about-section";
import { CertificatesSection } from "./_components/certificates/certificates-section";
import { ContactSection } from "./_components/contact/contact-section";
import { Hero } from "./_components/hero/hero";
import { ProjectsSection } from "./_components/projects/projects-section";
import { SectionRail } from "./_components/section-rail";
import { SectionScroll } from "./_components/section-scroll";
import { ServicesSection } from "./_components/services/services-section";

export default function Home() {
  return (
    <main>
      <IntroLoader />
      <SectionScroll />
      <SectionRail />
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <CertificatesSection />
      <ServicesSection />
      <ContactSection />
    </main>
  );
}
