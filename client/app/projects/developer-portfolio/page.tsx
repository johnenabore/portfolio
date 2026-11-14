import type { Metadata } from "next";
import Link from "next/link";
import { sectionFont } from "@/app/fonts";
import { cn } from "@/lib/utils";

const notes = [
  {
    id: "browsing",
    title: "Browsing the work",
    description: "Each project has a short summary on the homepage. The thesis case study goes deeper with a walkthrough, clips, and technical notes.",
  },
  {
    id: "navigation",
    title: "Motion and navigation",
    description: "The homepage snaps between sections and lets you scroll freely through longer ones. Project links use a diagonal transition, and the menu includes controls for motion and sound.",
  },
  {
    id: "spotify",
    title: "A personal touch",
    description: "The About section shows what I’m listening to on Spotify, alongside the tools I use to build projects.",
  },
];

export const metadata: Metadata = {
  title: "Developer Portfolio | John Enabore",
  description: "How I built my portfolio with Next.js, TypeScript, and Tailwind CSS.",
};

export default function DeveloperPortfolioPage() {
  return (
    <main className={cn("min-h-svh bg-background text-foreground", sectionFont.className)}>
      <article className="mx-auto w-[90.6%] max-w-[75rem]">
        <nav aria-label="Project navigation" className="border-b border-black/15 py-2">
          <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline focus-visible:underline">
            <span aria-hidden="true">←</span> All projects
          </Link>
        </nav>

        <header className="pt-[clamp(3rem,7vw,6rem)] pb-8 sm:pb-12">
          <div className="overflow-hidden pb-2">
            <h1 data-project-entry tabIndex={-1} className="max-w-[14ch] text-[clamp(2.9rem,8vw,7rem)] leading-[.95] font-[560] tracking-[-.07em] site-motion:animate-case-title">
              Developer Portfolio
            </h1>
          </div>
          <div data-project-entry className="mt-4 site-motion:animate-case-details">
            <p className="max-w-[48ch] text-base leading-relaxed text-[#484848] sm:text-lg">
              I built this site to share what I’m working on and show how each project came together.
            </p>
            <p className="mt-4 text-sm text-ring">Next.js · TypeScript · Tailwind CSS</p>
          </div>
        </header>

        <div className="border-t border-black/15 pb-[clamp(3rem,8vw,7rem)]">
          {notes.map(({ id, title, description }) => (
            <section
              key={id}
              id={id}
              className="grid gap-2 border-b border-black/15 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-8 sm:py-6"
            >
              <h2 className="text-xl font-medium tracking-tight">{title}</h2>
              <p className="max-w-[56ch] text-sm leading-relaxed text-[#484848] sm:text-base">{description}</p>
            </section>
          ))}
          <Link href="/#projects" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4">
            Back to portfolio <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
