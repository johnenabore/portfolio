import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CaseStudyNav } from "@/app/_components/projects/case-study-nav";
import { NextProject } from "@/app/_components/projects/next-project";
import { ProjectScreenshots } from "@/app/_components/projects/project-screenshots";
import { sectionFont } from "@/app/fonts";
import { Badge } from "@/components/ui/badge";
import { gwaPredictScreens } from "@/data/gwa-predict";
import { gwaPredict } from "@/data/projects";

const title = "GWAPredict | John Enabore";
const description = gwaPredict.description;

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
  { title: "Export screen time", description: "Students export a week of app usage from StayFree as a spreadsheet." },
  { title: "Upload or enter usage", description: "They upload the file, or type in their usage if they don’t have an export." },
  { title: "Get a prediction", description: "The model predicts whether their social media habits match a high or low performer." },
];

function BackToProjects() {
  return (
    <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline focus-visible:underline">
      <span aria-hidden="true">←</span> Back to Projects
    </Link>
  );
}

export default function GwaPredictPage() {
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
              <p data-project-entry className="mb-4 text-xs font-semibold tracking-[.16em] text-[#3a6245] uppercase site-motion:animate-case-details">Case study · Mini capstone</p>
              <div className="overflow-hidden pb-2">
                <h1 data-project-entry tabIndex={-1} className="text-[clamp(2.8rem,5.6vw,5.25rem)] leading-[.9] font-semibold tracking-[-.075em] focus:outline-none site-motion:animate-case-title">
                  {gwaPredict.title}
                </h1>
              </div>
              <div data-project-entry className="mt-4 site-motion:animate-case-details">
                <p className="max-w-[27ch] text-[clamp(1.1rem,1.8vw,1.5rem)] leading-[1.35] tracking-[-.025em]">{description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Project tags">
                  {gwaPredict.tags.map((tag) => (
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
                src={gwaPredict.thumbnail.src}
                alt={gwaPredict.thumbnail.alt}
                width={1800}
                height={1200}
                sizes="(min-width: 1344px) 650px, (min-width: 768px) 49vw, 91vw"
                loading="eager"
                className="h-auto w-full rounded-[clamp(.9rem,1.8vw,1.4rem)]"
              />
            </figure>
          </header>

          <div data-project-entry className="mt-10 grid gap-3 border-y border-border py-4 text-sm site-motion:animate-case-meta sm:grid-cols-3 sm:gap-5">
            <p><span className="mr-2 text-ring">Role</span> {gwaPredict.contribution}</p>
            <p><span className="mr-2 text-ring">Live demo</span> Link pending</p>
            <p><span className="mr-2 text-ring">Source code</span> Link pending</p>
          </div>

          <div className="mt-[clamp(2.5rem,6vw,5rem)] grid items-start gap-x-[8%] gap-y-9 md:grid-cols-[minmax(8rem,1fr)_minmax(0,3fr)]">
            <CaseStudyNav sections={sections} />

            <div className="min-w-0 space-y-14">
              <section id="overview" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Overview</h2>
                <p className="max-w-[65ch] leading-relaxed text-[#484848]">
                  Our mini capstone asks whether social media habits can predict academic performance among Filipino college students. Instead of a survey, the app reads real screen-time data and looks at how long and how often students open social apps.
                </p>
                <p className="mt-4 max-w-[65ch] leading-relaxed text-[#484848]">
                  I was the frontend developer. I built the React interface, from the animated landing page and intro carousel to the upload and manual-entry forms and the result view, and connected it to the team’s FastAPI prediction endpoints.
                </p>
              </section>

              <section id="how-it-works" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">How it works</h2>
                <ol className="divide-y divide-border border-y border-border">
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
                <h2 className="mb-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Screenshots</h2>
                <p className="mb-4 text-sm text-ring">Choose a card, then select it again to view it full size.</p>
                <ProjectScreenshots shots={gwaPredictScreens} />
              </section>

              <section id="technical-notes" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-5 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Technical notes</h2>
                <div data-case-group className="space-y-5 border-y border-border py-5">
                  <div>
                    <h3 className="font-semibold">From spreadsheet to features</h3>
                    <p className="mt-1 max-w-[65ch] text-sm leading-relaxed text-[#484848]">The server reads the usage-time and usage-count sheets of a StayFree export, keeps only social apps, and turns them into three features: average daily sessions, session intensity, and sessions per day.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Two ways to submit</h3>
                    <p className="mt-1 max-w-[65ch] text-sm leading-relaxed text-[#484848]">File uploads and manual entries go to separate endpoints, and both feed the same {gwaPredict.model} model.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Stack</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#484848]">React, TypeScript, Vite, Tailwind CSS, and React Query on the frontend. Python, FastAPI, pandas, and scikit-learn on the backend.</p>
                  </div>
                </div>
              </section>
              <section id="outcome" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Outcome</h2>
                <p className="max-w-[65ch] leading-relaxed text-[#484848]">
                  The app turns a week of screen-time data into a performance prediction in one step. It shows students the usage features behind each result, so they can see which habits the model is looking at.
                </p>
              </section>
            </div>
          </div>

          <NextProject currentId={gwaPredict.id} />

          <footer className="mt-12 border-t border-border pt-4">
            <BackToProjects />
          </footer>
        </article>
      </div>
    </main>
  );
}
