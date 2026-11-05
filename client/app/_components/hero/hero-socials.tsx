import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { heroSocials } from "./hero-content";

const icons: Record<(typeof heroSocials)[number]["id"], ReactNode> = {
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v6m0-9v.1m4 9v-6m0 2a2 2 0 0 1 4 0v4" />
    </>
  ),
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.8a5.3 5.3 0 0 0-1.4-3.7 4.9 4.9 0 0 0-.1-3.7s-1.1-.3-3.8 1.4a13 13 0 0 0-6.8 0C5.5 1 4.4 1.3 4.4 1.3a4.9 4.9 0 0 0-.1 3.7 5.3 5.3 0 0 0-1.4 3.7c0 5.2 3.2 6.4 6.2 6.8a3.4 3.4 0 0 0-.9 2.6V22" />
  ),
};

export function HeroSocials() {
  return (
    <ul
      className="absolute right-[6.5%] bottom-[3%] z-2 m-0 grid list-none gap-[clamp(.5em,calc((30.25svh_-_11.6em)/3),1.5em)] p-0 text-hero-ui compact:relative compact:inset-auto compact:mt-[1.35rem] compact:flex compact:flex-wrap compact:gap-[.6rem]"
      aria-label="Social profiles"
    >
      {heroSocials.map(({ id, label, href }, index) => {
        const content = (
          <>
            <svg
              className="size-[1.15em]"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {icons[id]}
            </svg>
            {label}
          </>
        );

        return (
          <li
            key={id}
            className="site-motion:animate-hero-social"
            style={{ animationDelay: `${700 + index * 80}ms` }}
          >
            <Button
              asChild={Boolean(href)}
              variant="outline"
              size="pill"
              className="w-full shadow-none disabled:pointer-events-auto disabled:opacity-100"
              type={href ? undefined : "button"}
              disabled={!href}
            >
              {href ? <a href={href} target="_blank" rel="noreferrer">{content}</a> : content}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
