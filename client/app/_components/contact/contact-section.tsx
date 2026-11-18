import { sectionFont } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { portfolioLinks } from "@/data/portfolio-links";
import { cn } from "@/lib/utils";
import { LocalTime } from "../local-time";
import { Magnetic } from "../magnetic";
import { SectionReveal } from "../section-reveal";
import { Wordmark } from "../wordmark";
import { CopyEmail } from "./copy-email";

const reveal = "site-motion:group-data-[reveal=waiting]/reveal:opacity-0 site-motion:group-data-[reveal=visible]/reveal:animate-section-reveal";

export function ContactSection() {
  return (
    <SectionReveal
      id="contact"
      className={cn("flex min-h-dvh snap-start snap-always flex-col bg-primary text-primary-foreground", sectionFont.className)}
    >
      <div className="mx-auto grid w-[90.6%] max-w-[90rem] flex-1 content-center gap-x-[9%] gap-y-10 py-[clamp(4rem,10vw,9rem)] md:grid-cols-[1.3fr_1fr] md:items-end">
        <header>
          <p className={cn("mb-5 text-xs font-medium tracking-[.18em] text-white/70 uppercase", reveal)}>Contact</p>
          <div className="overflow-hidden">
            <h2 id="contact-title" className={cn("max-w-[9ch] text-[clamp(3.4rem,8.8vw,9rem)] leading-[.9] font-semibold tracking-[-.075em] uppercase [--section-enter-delay:.1s] [--hero-slide-from:100%]", reveal)}>
              Get in touch
            </h2>
          </div>
        </header>

        <div className="min-w-0">
          <p className={cn("border-t border-white/25 pt-6 text-[clamp(1.15rem,1.9vw,1.65rem)] leading-[1.4] tracking-[-.02em] [--section-enter-delay:.28s]", reveal)}>
            <span className="block max-w-[32ch]">
              Have a project in mind or a role you’d like to talk about? I’d love to hear from you.
            </span>
          </p>
          <div className={cn("mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 [--section-enter-delay:.45s]", reveal)}>
            <Magnetic>
              <Button asChild variant="outline" size="pill" className="min-h-11 border-white bg-white px-5 text-sm font-medium text-primary">
                <a href={`mailto:${portfolioLinks.contactEmail}`}>
                  Email me
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 12.5 12 4m-7 0h7v7" />
                  </svg>
                </a>
              </Button>
            </Magnetic>
            <CopyEmail email={portfolioLinks.contactEmail} />
            <span className="min-w-0 basis-full wrap-anywhere text-sm text-white/75">{portfolioLinks.contactEmail}</span>
          </div>
          <p className={cn("mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/60 [--section-enter-delay:.55s]", reveal)}>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-[#21be65] site-motion:animate-live-pulse" />
              Based in Laguna, PH
            </span>
            <LocalTime before="· It’s " after=" there now" />
            <span>· Usually replies within a day</span>
          </p>
        </div>
      </div>

      {/* A large signature that wipes up into view at the very end of the page. */}
      <div aria-hidden="true" className="mx-auto w-[90.6%] max-w-[90rem] overflow-hidden pt-4 pb-2">
        <Wordmark
          className="block h-auto w-full fill-current text-white site-motion:group-data-[reveal=waiting]/reveal:opacity-0 site-motion:group-data-[reveal=visible]/reveal:animate-signature"
          firstClassName="fill-none stroke-current stroke-[3px]"
        />
      </div>

      <footer className={cn("mx-auto flex w-[90.6%] max-w-[90rem] flex-wrap items-center justify-between gap-x-6 border-t border-white/25 py-3 text-sm [--section-enter-delay:.62s] [--hero-slide-from:0px]", reveal)}>
        <span className="text-white/75">John Enabore</span>
        <a href="#home" className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline focus-visible:underline">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </SectionReveal>
  );
}
