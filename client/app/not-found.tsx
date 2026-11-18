import type { Metadata } from "next";
import Link from "next/link";
import { sectionFont } from "@/app/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found | John Enabore",
};

const links = [
  { label: "Back to the portfolio", href: "/" },
  { label: "Browse projects", href: "/projects" },
  { label: "Get in touch", href: "/#contact" },
];

export default function NotFound() {
  return (
    <main className={cn("grid min-h-svh bg-primary text-primary-foreground", sectionFont.className)}>
      <div className="mx-auto grid w-[90.6%] max-w-[90rem] grid-rows-[auto_1fr_auto] py-6 sm:py-8">
        <p className="text-xs font-medium tracking-[.16em] text-white/70 uppercase">John Enabore</p>

        <div className="self-center">
          <div className="overflow-hidden pb-2">
            <h1 className="text-[clamp(7rem,30vw,22rem)] leading-[.8] font-semibold tracking-[-.08em] site-motion:animate-case-title">404</h1>
          </div>
          <p className="mt-6 max-w-[34ch] text-[clamp(1.1rem,1.9vw,1.5rem)] leading-[1.4] tracking-[-.02em] text-white/85 site-motion:animate-case-details">
            This page wandered off. The work you’re looking for is probably one click away.
          </p>
        </div>

        <nav aria-label="Helpful links" className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/25 pt-3 text-sm site-motion:animate-case-meta">
          {links.map(({ label, href }) => (
            <Link key={href} href={href} className="group/link inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline focus-visible:underline">
              {label}
              <span aria-hidden="true" className="site-motion:transition-transform site-motion:duration-300 site-motion:group-hover/link:translate-x-1 site-motion:group-hover/link:-translate-y-1">↗</span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
