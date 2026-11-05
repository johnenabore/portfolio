import type { Metadata } from "next";
import Link from "next/link";
import { EggSorterPlaceholder } from "@/app/_components/projects/egg-sorter-placeholder";
import { sectionFont } from "@/app/fonts";
import { Badge } from "@/components/ui/badge";
import { smartEggSorter } from "@/data/smart-egg-sorter";

const title = "Smart Egg Sorter | John Enabore";
const description = smartEggSorter.description;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { type: "article", title, description },
  twitter: { card: "summary_large_image", title, description },
};

const sections = [
  { id: "overview", label: "Overview" },
  { id: "walkthrough", label: "Walkthrough" },
  { id: "screenshots", label: "Screenshots" },
  { id: "technical-notes", label: "Technical notes" },
  { id: "outcome", label: "Outcome" },
];

const steps = [
  { title: "Pair the device", description: "Connect to the ESP32 over its local Wi-Fi network." },
  { title: "Detect an egg", description: "Show how the app receives live events from the infrared sensor." },
  { title: "Review the classification", description: "Show how the app classifies the egg’s species on the device." },
];

function BackToProjects() {
  return (
    <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline focus-visible:underline">
      <span aria-hidden="true">←</span> Back to Projects
    </Link>
  );
}

export default function SmartEggSorterPage() {
  return (
    <main className={`${sectionFont.className} min-h-svh bg-background text-foreground`}>
      <div className="mx-auto w-[90.6%] max-w-[76rem]">
        <nav aria-label="Project navigation" className="flex flex-wrap items-center justify-between gap-x-4 border-b border-border py-2 sm:py-3">
          <BackToProjects />
          <span className="text-xs font-medium tracking-[.15em] text-ring uppercase">John Enabore · Projects</span>
        </nav>

        <article className="pt-[clamp(2.4rem,5.5vw,4.75rem)] pb-[clamp(3rem,7vw,6rem)]">
          <header className="grid items-center gap-x-[6%] gap-y-8 md:grid-cols-[minmax(0,.95fr)_minmax(0,1.25fr)]">
            <div className="min-w-0">
              <p data-project-entry className="mb-4 text-xs font-semibold tracking-[.16em] text-[#3a6245] uppercase site-motion:animate-case-details">Case study · Thesis project</p>
              <div className="overflow-hidden pb-2">
                <h1 data-project-entry tabIndex={-1} className="max-w-[10ch] text-[clamp(3.3rem,7.1vw,6.65rem)] leading-[.9] font-semibold tracking-[-.075em] focus:outline-none site-motion:animate-case-title">
                  {smartEggSorter.title}
                </h1>
              </div>
              <div data-project-entry className="mt-4 site-motion:animate-case-details">
                <p className="max-w-[27ch] text-[clamp(1.1rem,1.8vw,1.5rem)] leading-[1.35] tracking-[-.025em]">An offline-first app for egg fertility research.</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Project tags">
                  {smartEggSorter.tags.map((tag) => (
                    <li key={tag}><Badge variant="outline" className="bg-accent px-3 py-1">{tag}</Badge></li>
                  ))}
                </ul>
                <a href="#walkthrough" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4">
                  Jump to walkthrough <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <figure data-project-entry className="overflow-hidden rounded-2xl bg-[#18211c] text-[#e6ecdf] shadow-[0_1.5rem_3.5rem_#18211c24] site-motion:animate-case-art">
              <div className="aspect-[47/33.5] w-full">
                <EggSorterPlaceholder />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-white/15 px-4 py-3 text-xs sm:px-5 sm:text-sm">
                <span>Concept illustration</span>
                <span className="text-white/65">Placeholder artwork</span>
              </figcaption>
            </figure>
          </header>

          <div data-project-entry className="mt-10 grid gap-3 border-y border-border py-4 text-sm site-motion:animate-case-meta sm:grid-cols-3 sm:gap-5">
            <p><span className="mr-2 text-ring">Role</span> Web app and device integration</p>
            <p><span className="mr-2 text-ring">Live demo</span> Link pending</p>
            <p><span className="mr-2 text-ring">Source code</span> Link pending</p>
          </div>

          <div className="mt-[clamp(2.5rem,6vw,5rem)] grid items-start gap-x-[8%] gap-y-9 md:grid-cols-[minmax(8rem,1fr)_minmax(0,3fr)]">
            <nav aria-label="On this page" className="border-t border-border pt-4 md:sticky md:top-8">
              <p className="text-xs font-semibold tracking-[.14em] text-ring uppercase">On this page</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm md:grid">
                {sections.map(({ id, label }) => (
                  <li key={id}>
                    <a className="inline-flex min-h-9 items-center underline-offset-4 hover:underline focus-visible:underline" href={`#${id}`}>{label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0 space-y-14">
              <section id="overview" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Overview</h2>
                <p className="max-w-[65ch] leading-relaxed text-[#484848]">
                  Smart Egg Sorter is my thesis project on computer vision for egg fertility detection. For the companion app, the challenge was keeping the workflow useful on farms with unreliable internet.
                </p>
                <p className="mt-4 max-w-[65ch] leading-relaxed text-[#484848]">
                  I rebuilt the app as an offline-first progressive web app, integrated the ESP32 for pairing and live egg detection, and worked on comparing models across duck, chicken, and quail datasets.
                </p>
              </section>

              <section id="walkthrough" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Walkthrough</h2>
                <figure className="grid aspect-video place-content-center justify-items-center gap-3 rounded-2xl border border-white/15 bg-primary p-4 text-center text-primary-foreground">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-9 text-[#b9d7aa]" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="m10 8 6 4-6 4z" />
                  </svg>
                  <figcaption className="text-sm text-white/80">Walkthrough video placeholder</figcaption>
                </figure>
                <ol className="mt-5 divide-y divide-border border-y border-border">
                  {steps.map(({ title, description }, index) => (
                    <li key={title} className="grid grid-cols-[2rem_1fr] gap-2 py-4">
                      <span aria-hidden="true" className="font-mono text-sm text-[#3a6245]">0{index + 1}</span>
                      <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-[#484848]">{description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section id="screenshots" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Screenshots</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {steps.map(({ title }, index) => (
                    <figure key={title} className="overflow-hidden rounded-xl border border-border">
                      <div className="grid aspect-[4/3] place-content-center justify-items-center gap-2 bg-[#e9ede4] px-3 text-center text-[#3a6245]">
                        <span aria-hidden="true" className="font-mono text-2xl">0{index + 1}</span>
                        <span className="text-xs font-medium">Screenshot placeholder</span>
                      </div>
                      <figcaption className="px-3 py-3 text-sm font-medium">{title}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>

              <section id="technical-notes" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-5 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Technical notes</h2>
                <div className="space-y-5 border-y border-border py-5">
                  <div>
                    <h3 className="font-semibold">Offline-first classification</h3>
                    <p className="mt-1 max-w-[65ch] text-sm leading-relaxed text-[#484848]">The app runs species classification on the device, so that step can work without internet access.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Local hardware connection</h3>
                    <p className="mt-1 max-w-[65ch] text-sm leading-relaxed text-[#484848]">The ESP32’s local wireless access point handles pairing. An infrared sensor reports egg detection to the app.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Web stack</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#484848]">Next.js, TypeScript, Tailwind CSS, and Supabase.</p>
                  </div>
                </div>
              </section>
              <section id="outcome" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Outcome</h2>
                <p className="max-w-[65ch] leading-relaxed text-[#484848]">
                  The prototype brings device pairing, live sensor events, and on-device species classification into one app. The walkthrough will show how those parts work together in the field workflow.
                </p>
              </section>
            </div>
          </div>

          <footer className="mt-12 border-t border-border pt-4">
            <BackToProjects />
          </footer>
        </article>
      </div>
    </main>
  );
}
