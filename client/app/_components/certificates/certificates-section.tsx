import { sectionFont } from "@/app/fonts";
import { certificateIssuers, certificates, formatIssued } from "@/data/certificates";
import { cn } from "@/lib/utils";
import { SectionReveal } from "../section-reveal";
import { CertificateDeck } from "./certificate-deck";
import { CountUp } from "./count-up";

const reveal = "site-motion:group-data-[reveal=waiting]/reveal:opacity-0 site-motion:group-data-[reveal=visible]/reveal:animate-section-reveal";
const latest = certificates.reduce((newest, item) => (item.issued > newest ? item.issued : newest), certificates[0]?.issued ?? "");

export function CertificatesSection() {
  return (
    <SectionReveal
      id="certificates"
      className={cn("relative isolate min-h-svh snap-start snap-always overflow-clip bg-primary pb-[clamp(4rem,8vw,7rem)] text-primary-foreground", sectionFont.className)}
    >
      {/* A soft spotlight behind the deck. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[18%] -z-10 mx-auto h-[38rem] max-w-[70rem] rounded-full bg-[radial-gradient(closest-side,#b5c7aa1f,transparent)]" />

      <header className="relative grid justify-items-center overflow-hidden pt-[clamp(5rem,9.4vw,7.75rem)]">
        <span aria-hidden="true" className="pointer-events-none absolute top-[clamp(1.4rem,2.45vw,2rem)] left-1/2 -translate-x-1/2 text-[clamp(3.3rem,10.3vw,10rem)] leading-none font-bold tracking-[.13em] whitespace-nowrap text-white/[.05] site-motion:group-data-[reveal=waiting]/reveal:opacity-0 site-motion:group-data-[reveal=visible]/reveal:animate-project-heading">
          CREDENTIALS
        </span>
        <div className="relative overflow-hidden pb-0.5">
          <h2 id="certificates-title" className={cn("text-center text-[clamp(2rem,4.3vw,3.5rem)] leading-[1.05] font-[520] tracking-[-.018em] uppercase [--section-enter-delay:.1s]", reveal)}>
            /Certificates
          </h2>
        </div>
        <p className={cn("mt-4 max-w-[44ch] px-6 text-center text-sm leading-relaxed text-white/65 [--section-enter-delay:.2s] [--hero-slide-from:1rem] sm:text-base", reveal)}>
          Courses and certifications I’ve completed along the way. Select one to view it and verify it.
        </p>
      </header>

      <div className="mx-auto mt-[clamp(1.75rem,3.5vw,3rem)] w-[90.6%] max-w-[75rem]">
        <dl className={cn("mx-auto mb-[clamp(1.75rem,3.5vw,2.75rem)] grid max-w-[40rem] grid-cols-3 border-y border-white/15 text-center [--section-enter-delay:.3s] [--hero-slide-from:1rem]", reveal)}>
          <div className="py-4">
            <dt className="text-[.68rem] tracking-[.14em] text-white/55 uppercase">Certificates</dt>
            <dd className="mt-1 text-[clamp(1.5rem,3vw,2.25rem)] leading-none font-semibold tracking-[-.04em]"><CountUp value={certificates.length} /></dd>
          </div>
          <div className="border-x border-white/15 py-4">
            <dt className="text-[.68rem] tracking-[.14em] text-white/55 uppercase">Issuers</dt>
            <dd className="mt-1 text-[clamp(1.5rem,3vw,2.25rem)] leading-none font-semibold tracking-[-.04em]"><CountUp value={certificateIssuers.length} /></dd>
          </div>
          <div className="py-4">
            <dt className="text-[.68rem] tracking-[.14em] text-white/55 uppercase">Latest</dt>
            <dd className="mt-1 text-[clamp(1.5rem,3vw,2.25rem)] leading-none font-semibold tracking-[-.04em]">{latest && formatIssued(latest)}</dd>
          </div>
        </dl>

        <CertificateDeck />
      </div>
    </SectionReveal>
  );
}
