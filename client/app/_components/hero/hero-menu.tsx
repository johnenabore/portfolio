import * as Popover from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { heroNavigation } from "./hero-content";

const items: typeof heroNavigation = [{ label: "Home", href: "#home" }, ...heroNavigation];

export function HeroMenu() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          type="button"
          aria-label="Navigation menu"
          size="icon"
          className="group/menu size-[2.9em] rounded-full border border-[#353535] bg-[linear-gradient(#242424,#171717_55%)] shadow-[0_.25rem_.65rem_#0004]"
        >
          <svg
            aria-hidden="true"
            className="size-[1.15em] group-data-[state=open]/menu:hidden"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            aria-hidden="true"
            className="hidden size-[1.15em] group-data-[state=open]/menu:block"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          aria-label="Portfolio navigation"
          align="end"
          sideOffset={12}
          collisionPadding={16}
          className="z-10 w-56 max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-background p-2 text-sm text-foreground shadow-[0_1rem_2rem_#00000020]"
        >
          <nav aria-label="Menu">
            <ul className="m-0 list-none p-0">
              {items.map(({ label, href, count }) => (
                <li key={label}>
                  {href ? (
                    <Popover.Close asChild>
                      <a href={href} className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring">
                        {label}
                        {count && <span className="text-xs text-[#696969]">[{count}]</span>}
                      </a>
                    </Popover.Close>
                  ) : (
                    <span className="flex items-center justify-between px-3 py-2.5 text-[#696969]" aria-disabled="true">
                      {label}
                      {count && <span className="text-xs">[{count}]</span>}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
