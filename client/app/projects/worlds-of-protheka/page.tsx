import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CaseStudyNav } from "@/app/_components/projects/case-study-nav";
import { NextProject } from "@/app/_components/projects/next-project";
import { ProjectScreenshots } from "@/app/_components/projects/project-screenshots";
import { sectionFont } from "@/app/fonts";
import { Badge } from "@/components/ui/badge";
import { worldsOfProtheka } from "@/data/projects";
import { worldsOfProthekaScreens } from "@/data/worlds-of-protheka";

const title = "Worlds of Protheka | John Enabore";
const description = worldsOfProtheka.description;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { type: "article", title, description },
  twitter: { card: "summary_large_image", title, description },
};

const sections = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How the map works" },
  { id: "screenshots", label: "Screenshots" },
  { id: "technical-notes", label: "Technical notes" },
  { id: "outcome", label: "Outcome" },
];

const steps = [
  { title: "Arrive through the clouds", description: "A welcome screen sits over moving clouds. Explore the map starts the music and dives down through them onto the map." },
  { title: "Explore in three levels", description: "Drag to pan. Scroll, pinch, the 1–3 keys, or the I/II/III control step between three zoom levels, each tilting and turning the map a little further." },
  { title: "Discover a kingdom", description: "Kingdoms glow when you hover them. Tap one and the map tilts toward it, a parchment drawer opens with its line, and Enter kingdom dives in. The kingdoms you visit are joined by a dotted journey that's remembered." },
  { title: "Find your way", description: "Search the ten kingdoms by name or title (press /), pick up where you left off with Continue reading, and switch between day and night or turn the music off." },
];

const notes = [
  { title: "Hand-written WebGL atmosphere", text: "The sea is a custom shader with ripples, crests, and shoreline foam drawn from a mask. Three cloud layers are shaders too, darkened at night and parted when you enter a kingdom, with image clouds as a fallback when WebGL isn't available." },
  { title: "3D relief under the page", text: "A three.js terrain mesh, raised from a height map, sits exactly under the page's layers by matching the CSS perspective. It only renders while the camera moves." },
  { title: "A living world", text: "Sea serpents and boats, bird flocks crossing every half minute, castle windows lighting up one by one at night, and a cloud sweep for the day and night switch." },
  { title: "Smooth on phones", text: "One shared frame loop takes turns between the WebGL layers and holds them still during moves. Phones get a flat relief instead of 3D, animations stay on the compositor, and style variables are only written when they change." },
  { title: "Light to load, kind to motion", text: "Drawers, search, and the theme sweep load on demand and prefetch when the browser is idle; three.js and the music load later. With reduced motion, dives and sweeps become fades, the sea and clouds hold still, and the birds stay home." },
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

export default function WorldsOfProthekaPage() {
  const { links } = worldsOfProtheka;

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
              <p data-project-entry className="mb-4 text-xs font-semibold tracking-[.16em] text-[#8a3f1c] uppercase site-motion:animate-case-details">Case study · Freelance</p>
              <div className="overflow-hidden pb-2">
                <h1 data-project-entry tabIndex={-1} className="max-w-[10ch] text-[clamp(3rem,6.4vw,6rem)] leading-[.9] font-semibold tracking-[-.075em] focus:outline-none site-motion:animate-case-title">
                  {worldsOfProtheka.title}
                </h1>
              </div>
              <div data-project-entry className="mt-4 site-motion:animate-case-details">
                <p className="max-w-[30ch] text-[clamp(1.1rem,1.8vw,1.5rem)] leading-[1.35] tracking-[-.025em]">{description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Project tags">
                  {worldsOfProtheka.tags.map((tag) => (
                    <li key={tag}><Badge variant="outline" className="bg-accent px-3 py-1">{tag}</Badge></li>
                  ))}
                </ul>
                <a href="#how-it-works" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4">
                  See how the map works <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <figure data-project-entry className="rounded-[clamp(1.25rem,2.4vw,1.9rem)] bg-black/[.055] p-[clamp(.4rem,.9vw,.7rem)] site-motion:animate-case-art">
              <Image
                src={worldsOfProtheka.thumbnail.src}
                alt={worldsOfProtheka.thumbnail.alt}
                width={1800}
                height={1200}
                sizes="(min-width: 1344px) 650px, (min-width: 768px) 49vw, 91vw"
                loading="eager"
                className="h-auto w-full rounded-[clamp(.9rem,1.8vw,1.4rem)]"
              />
            </figure>
          </header>

          <div data-project-entry className="mt-10 grid gap-3 border-y border-border py-4 text-sm site-motion:animate-case-meta sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            <p><span className="mr-2 text-ring">Role</span> {worldsOfProtheka.contribution}</p>
            <p><span className="mr-2 text-ring">Client</span> {worldsOfProtheka.client} · Freelance</p>
            <p><span className="mr-2 text-ring">Live site</span> <ExternalLink href={links.live}>worldsofprotheka.app</ExternalLink></p>
            <p><span className="mr-2 text-ring">Source code</span> Private repo</p>
          </div>

          <div className="mt-[clamp(2.5rem,6vw,5rem)] grid items-start gap-x-[8%] gap-y-9 md:grid-cols-[minmax(8rem,1fr)_minmax(0,3fr)]">
            <CaseStudyNav sections={sections} />

            <div className="min-w-0 space-y-14">
              <section id="overview" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Overview</h2>
                <p className="max-w-[65ch] leading-relaxed text-[#484848]">
                  Worlds of Protheka is a fantasy reading app for a client in California, USA. Readers go a page at a time, choose what happens next, or write their own move, and every book is set somewhere in the world of Protheka.
                </p>
                <p className="mt-4 max-w-[65ch] leading-relaxed text-[#484848]">
                  I joined the project as a freelance developer and built its interactive world map: ten kingdoms on a hand-drawn map, brought to life with a moving sea, clouds, and a day and night sky.
                </p>
              </section>

              <section id="how-it-works" tabIndex={-1} className="scroll-mt-8">
                <h2 className="mb-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">How the map works</h2>
                <ol className="divide-y divide-border border-y border-border">
                  {steps.map(({ title, description }, index) => (
                    <li key={title} className="grid grid-cols-[2rem_1fr] gap-2 py-4">
                      <span aria-hidden="true" className="font-mono text-sm text-[#8a3f1c]">0{index + 1}</span>
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
                <ProjectScreenshots shots={worldsOfProthekaScreens} />
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
                  Readers get a world to wander: ten kingdoms, each with its own place on the map and its own line, in a living scene that stays smooth on phones as well as desktops.
                </p>
              </section>
            </div>
          </div>

          <NextProject currentId={worldsOfProtheka.id} />

          <footer className="mt-12 border-t border-border pt-4">
            <BackToProjects />
          </footer>
        </article>
      </div>
    </main>
  );
}
