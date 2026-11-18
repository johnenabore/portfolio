import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CaseStudyNav } from "@/app/_components/projects/case-study-nav";
import { NextProject } from "@/app/_components/projects/next-project";
import { ProjectScreenshots } from "@/app/_components/projects/project-screenshots";
import { sectionFont } from "@/app/fonts";
import { Badge } from "@/components/ui/badge";
import { caseStudyMetadata } from "@/lib/case-study-metadata";
import { theWheel } from "@/data/projects";
import { theWheelScreens } from "@/data/the-wheel";

const title = "The Wheel | John Enabore";
const description = theWheel.description;

export const metadata: Metadata = caseStudyMetadata(title, description, theWheel);

const sections = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How it works" },
  { id: "screenshots", label: "Screenshots" },
  { id: "technical-notes", label: "Technical notes" },
  { id: "outcome", label: "Outcome" },
];

const steps = [
  { title: "Catch up on the home page", description: "The latest stories, the most-read ones, a Hall of Fame pick, and the newest News pieces are all on one page." },
  { title: "Browse by section", description: "News, Opinion, Sports, Feature, Literary, Photo, and Archive each have their own page, a tap away in the sidebar." },
  { title: "Read and share", description: "Every article has its own link. Readers can share it to Facebook or X or copy the link, and each read adds to its view count." },
  { title: "Write and publish", description: "Editors sign in to a rich-text editor with headings, lists, links, highlights, and images, then publish or come back later to edit or delete." },
];

const notes = [
  { title: "A full editor in the browser", text: "The editor is built on Tiptap, and each article is saved as Tiptap's JSON document and turned back into HTML for readers." },
  { title: "Images on publish", text: "Images dropped into an article stay in the browser until it's published. The server then uploads them to Cloudinary, five at a time, and swaps each one for its hosted link." },
  { title: "Links and most-read", text: "Each article gets a readable link made from its title, and each read adds to a view count that sorts the most-viewed lists." },
  { title: "Editor sign-in", text: "Editor passwords are hashed with bcrypt, and signing in sets a JWT in an HTTP-only cookie that lasts a day." },
  { title: "Free hosting", text: "The React client runs on Vercel and the Express and MongoDB API runs on Render's free tier, so the site shows a warming-up message while the server wakes." },
];

function BackToProjects() {
  return (
    <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline focus-visible:underline">
      <span aria-hidden="true">←</span> Back to Projects
    </Link>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4 hover:decoration-2">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function TheWheelPage() {
  const { links } = theWheel;

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
              <p data-project-entry className="mb-4 text-xs font-semibold tracking-[.16em] text-[#1c3f74] uppercase site-motion:animate-case-details">Case study · Volunteer</p>
              <div className="overflow-hidden pb-2">
                <h1 data-project-entry tabIndex={-1} className="max-w-[10ch] text-[clamp(3rem,6.4vw,6rem)] leading-[.9] font-semibold tracking-[-.075em] focus:outline-none site-motion:animate-case-title">
                  {theWheel.title}
                </h1>
              </div>
              <div data-project-entry className="mt-4 site-motion:animate-case-details">
                <p className="max-w-[30ch] text-[clamp(1.1rem,1.8vw,1.5rem)] leading-[1.35] tracking-[-.025em]">{description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Project tags">
                  {theWheel.tags.map((tag) => (
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
                src={theWheel.thumbnail.src}
                alt={theWheel.thumbnail.alt}
                width={1800}
                height={1200}
                sizes="(min-width: 1344px) 650px, (min-width: 768px) 49vw, 91vw"
                loading="eager"
                className="h-auto w-full rounded-[clamp(.9rem,1.8vw,1.4rem)]"
              />
            </figure>
          </header>

          <div data-project-entry className="mt-10 grid gap-3 border-y border-border py-4 text-sm site-motion:animate-case-meta sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            <p><span className="mr-2 text-ring">Role</span> {theWheel.contribution}</p>
            <p><span className="mr-2 text-ring">For</span> {theWheel.client}</p>
            <p><span className="mr-2 text-ring">Launched</span> <ExternalLink href={links.launchPost}>Aug 2025 · launch post</ExternalLink></p>
            <p><span className="mr-2 text-ring">Source code</span> Private repo</p>
          </div>

          <div className="mt-[clamp(2.5rem,6vw,5rem)] grid items-start gap-x-[8%] gap-y-9 md:grid-cols-[minmax(8rem,1fr)_minmax(0,3fr)]">
            <CaseStudyNav sections={sections} />

            <div className="min-w-0 space-y-14">
              <section id="overview" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Overview</h2>
                <p className="max-w-[65ch] leading-relaxed text-[#484848]">
                  The Wheel is the official student publication of the College of Administration, Business, Hospitality, and Accountancy (CABHA) at Southern Luzon State University. Its writers cover campus news, opinion, sports, features, and literary work.
                </p>
                <p className="mt-4 max-w-[65ch] leading-relaxed text-[#484848]">
                  Through a referral, I built its website on my own as a volunteer: the reader that students use, the editor the staff publish with, and the API and database behind both.
                </p>
              </section>

              <section id="how-it-works" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">How it works</h2>
                <ol className="divide-y divide-border border-y border-border">
                  {steps.map(({ title, description }, index) => (
                    <li key={title} className="grid grid-cols-[2rem_1fr] gap-2 py-4">
                      <span aria-hidden="true" className="font-mono text-sm text-[#1c3f74]">0{index + 1}</span>
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
                <p className="mb-4 text-sm text-ring">Shown running locally with sample articles; the live site&apos;s stories belong to the publication. Choose a card, then select it again to view it full size.</p>
                <ProjectScreenshots shots={theWheelScreens} />
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
                  The publication has its own site to publish on, with sections that match its print beats and an editor its staff can use without touching code.
                </p>
                <p className="mt-4 max-w-[65ch] leading-relaxed text-[#484848]">
                  The Wheel announced the site&apos;s official launch on its Facebook page on August 11, 2025, crediting me as its developer.{" "}
                  <ExternalLink href={links.launchPost}>Read the launch post</ExternalLink>
                </p>
              </section>
            </div>
          </div>

          <NextProject currentId={theWheel.id} />

          <footer className="mt-12 border-t border-border pt-4">
            <BackToProjects />
          </footer>
        </article>
      </div>
    </main>
  );
}
