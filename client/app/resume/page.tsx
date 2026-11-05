import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sectionFont } from "@/app/fonts";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Résumé | John Enabore",
  description: "View John Enabore’s résumé and download it as a PDF or Word document.",
};

const resumePath = "/documents/john-enabore-resume";
const pages = [
  { number: 1, description: "Education, experience, and projects" },
  { number: 2, description: "Leadership, activities, skills, and interests" },
];

export default function ResumePage() {
  return (
    <main className={`${sectionFont.className} min-h-svh bg-accent px-[5%] pt-[clamp(1.5rem,4vw,3rem)] pb-16`}>
      <div className="mx-auto max-w-[56rem]">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm underline-offset-4 hover:underline focus-visible:underline">
          <span aria-hidden="true">←</span> Back to portfolio
        </Link>

        <header className="mt-4 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-b border-border pb-5">
          <div>
            <p className="mb-2 text-xs font-medium tracking-[.16em] text-ring uppercase">John Enabore</p>
            <h1 className="text-[clamp(2rem,4.3vw,3.5rem)] leading-none font-[520] tracking-[-.018em] uppercase">Résumé</h1>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Download formats">
            <Button asChild size="pill" className="min-h-11 text-sm">
              <a href={`${resumePath}.pdf`} download>Download PDF</a>
            </Button>
            <Button asChild variant="outline" size="pill" className="min-h-11 text-sm">
              <a href={`${resumePath}.docx`} download>Download Word (.docx)</a>
            </Button>
          </div>
        </header>

        <div className="my-4 flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="text-ring">Résumé preview · {pages.length} pages</p>
          <a href={`${resumePath}.pdf`} target="_blank" rel="noreferrer" className="underline underline-offset-4">
            Open text PDF in a new tab
          </a>
        </div>

        <ol className="space-y-5">
          {pages.map(({ number, description }) => (
            <li key={number} className="overflow-hidden rounded-xl border border-border bg-background shadow-xs">
              <figure>
                <Image
                  src={`${resumePath}-${number}.png`}
                  alt={`Résumé page ${number}. ${description}.`}
                  width={1360}
                  height={1760}
                  loading={number === 1 ? "eager" : "lazy"}
                  unoptimized
                  className="h-auto w-full"
                />
                <figcaption className="border-t border-border px-4 py-3 text-center text-xs text-ring">
                  Page {number} of {pages.length}
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
