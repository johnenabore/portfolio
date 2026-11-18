import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CaseStudyNav } from "@/app/_components/projects/case-study-nav";
import { NextProject } from "@/app/_components/projects/next-project";
import { ProjectScreenshots } from "@/app/_components/projects/project-screenshots";
import { sectionFont } from "@/app/fonts";
import { Badge } from "@/components/ui/badge";
import { expentra } from "@/data/projects";
import { expentraScreens } from "@/data/expentra";

const title = "Expentra | John Enabore";
const description = expentra.description;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { type: "article", title, description },
  twitter: { card: "summary_large_image", title, description },
};

const sections = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How it works" },
  { id: "screenshots", label: "Screenshots" },
  { id: "technical-notes", label: "Technical notes" },
  { id: "outcome", label: "Outcome" },
];

const steps = [
  { title: "Add your expenses", description: "Sign in with Google, then add your bills and daily expenses with a category, so each one lands in the right place." },
  { title: "Visualize and analyze", description: "The dashboard turns those entries into charts and summaries: cash flow, trends by category, and where the money goes each month." },
  { title: "Predict and plan ahead", description: "A forecasting model estimates the next months of each bill, and reminders flag what's coming up before it's due." },
];

const notes = [
  { title: "A typed React client", text: "React, TypeScript and Vite, styled with Tailwind and Radix-based components. React Query handles fetching and caching, and Recharts draws the bill and spending charts." },
  { title: "Google sign-in", text: "Firebase Authentication signs people in with Google, and each user's bills and forecasts are kept to their own account." },
  { title: "A forecasting service", text: "A separate Python FastAPI service reads a user's bill history from MongoDB and fits a Prophet model with monthly seasonality per category to forecast the coming months." },
  { title: "Honest predictions", text: "When every bill is the same amount, or Prophet returns a flat line, the service switches to a fallback model. Every forecast carries a confidence score built from data-quality checks, so a thin history doesn't look more certain than it is." },
];

function BackToProjects() {
  return (
    <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline focus-visible:underline">
      <span aria-hidden="true">←</span> Back to Projects
    </Link>
  );
}


export default function ExpentraPage() {
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
              <p data-project-entry className="mb-4 text-xs font-semibold tracking-[.16em] text-[#1f7a64] uppercase site-motion:animate-case-details">Case study · Personal project</p>
              <div className="overflow-hidden pb-2">
                <h1 data-project-entry tabIndex={-1} className="max-w-[10ch] text-[clamp(3rem,6.4vw,6rem)] leading-[.9] font-semibold tracking-[-.075em] focus:outline-none site-motion:animate-case-title">
                  {expentra.title}
                </h1>
              </div>
              <div data-project-entry className="mt-4 site-motion:animate-case-details">
                <p className="max-w-[30ch] text-[clamp(1.1rem,1.8vw,1.5rem)] leading-[1.35] tracking-[-.025em]">{description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Project tags">
                  {expentra.tags.map((tag) => (
                    <li key={tag}><Badge variant="outline" className="bg-accent px-3 py-1">{tag}</Badge></li>
                  ))}
                </ul>
                <a href="#how-it-works" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4">
                  See how it works <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <figure data-project-entry className="rounded-[clamp(1.25rem,2.4vw,1.9rem)] bg-black/[.055] p-[clamp(.4rem,.9vw,.7rem)] site-motion:animate-case-art">
              <Image
                src={expentra.thumbnail.src}
                alt={expentra.thumbnail.alt}
                width={1800}
                height={1200}
                sizes="(min-width: 1344px) 650px, (min-width: 768px) 49vw, 91vw"
                loading="eager"
                className="h-auto w-full rounded-[clamp(.9rem,1.8vw,1.4rem)]"
              />
            </figure>
          </header>

          <div data-project-entry className="mt-10 grid gap-3 border-y border-border py-4 text-sm site-motion:animate-case-meta sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            <p><span className="mr-2 text-ring">Role</span> {expentra.contribution}</p>
            <p><span className="mr-2 text-ring">Type</span> Personal project</p>
            <p><span className="mr-2 text-ring">Live demo</span> Link pending</p>
            <p><span className="mr-2 text-ring">Source code</span> Link pending</p>
          </div>

          <div className="mt-[clamp(2.5rem,6vw,5rem)] grid items-start gap-x-[8%] gap-y-9 md:grid-cols-[minmax(8rem,1fr)_minmax(0,3fr)]">
            <CaseStudyNav sections={sections} />

            <div className="min-w-0 space-y-14">
              <section id="overview" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Overview</h2>
                <p className="max-w-[65ch] leading-relaxed text-[#484848]">
                  Expentra is a personal finance app for keeping household bills in one place. You log what you pay, see where it goes, and get a forecast of what next month will cost, with reminders before bills are due.
                </p>
                <p className="mt-4 max-w-[65ch] leading-relaxed text-[#484848]">
                  I built it on my own, end to end: the React client, Google sign-in, and the Python service that does the forecasting.
                </p>
              </section>

              <section id="how-it-works" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">How it works</h2>
                <ol className="divide-y divide-border border-y border-border">
                  {steps.map(({ title, description }, index) => (
                    <li key={title} className="grid grid-cols-[2rem_1fr] gap-2 py-4">
                      <span aria-hidden="true" className="font-mono text-sm text-[#1f7a64]">0{index + 1}</span>
                      <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-[#484848]">{description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section id="screenshots" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Screenshots</h2>
                <p className="mb-4 text-sm text-ring">Choose a card, then select it again to view it full size.</p>
                <ProjectScreenshots shots={expentraScreens} />
              </section>

              <section id="technical-notes" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-5 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Technical notes</h2>
                <div data-case-group className="space-y-5 border-y border-border py-5">
                  {notes.map(({ title, text }) => (
                    <div key={title}>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 max-w-[65ch] text-sm leading-relaxed text-[#484848]">{text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="outcome" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Outcome</h2>
                <p className="max-w-[65ch] leading-relaxed text-[#484848]">
                  A working full-stack app that goes from a list of bills to a forecast of next month, built and wired together by one developer across a React client and a Python model service.
                </p>
              </section>
            </div>
          </div>

          <NextProject currentId={expentra.id} />

          <footer className="mt-12 border-t border-border pt-4">
            <BackToProjects />
          </footer>
        </article>
      </div>
    </main>
  );
}
