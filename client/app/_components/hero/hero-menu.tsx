"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { setUiSoundsEnabled } from "@/lib/ui-sounds";
import { heroNavigation } from "./hero-content";

const menuLinks = [{ label: "Home", href: "#home" }, ...heroNavigation];
const menuButtonClass = "size-[2.9em] min-h-11 min-w-11 rounded-full border border-[#353535] bg-[linear-gradient(#242424,#171717_55%)] shadow-[0_.25rem_.65rem_#0004]";

function MenuIcon() {
  const line = "origin-center site-motion:transition-[translate,rotate,opacity] site-motion:duration-300 site-motion:ease-in-out";

  return (
    <svg aria-hidden="true" className="size-[1.15em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M4 12h16" className={`${line} -translate-y-[6px] group-open/menu:translate-y-0 group-open/menu:rotate-45 group-open/menu:starting:-translate-y-[6px] group-open/menu:starting:rotate-0`} />
      <path d="M4 12h16" className={`${line} group-open/menu:opacity-0 group-open/menu:starting:opacity-100`} />
      <path d="M4 12h16" className={`${line} translate-y-[6px] group-open/menu:translate-y-0 group-open/menu:-rotate-45 group-open/menu:starting:translate-y-[6px] group-open/menu:starting:rotate-0`} />
    </svg>
  );
}

export function HeroMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialogId = useId();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  function positionMenu() {
    const menu = dialog.current;
    const button = trigger.current?.getBoundingClientRect();
    if (!menu || !button) return;

    const x = button.left + button.width / 2;
    const y = button.top + button.height / 2;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const radius = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));

    menu.style.setProperty("--menu-origin-x", `${x}px`);
    menu.style.setProperty("--menu-origin-y", `${y}px`);
    menu.style.setProperty("--menu-trigger-size", `${button.width}px`);
    menu.style.setProperty("--menu-viewport-width", `${width}px`);
    menu.style.setProperty("--menu-radius", `${Math.ceil(radius)}px`);
  }

  useEffect(() => {
    if (!open) return;
    window.addEventListener("resize", positionMenu);
    return () => window.removeEventListener("resize", positionMenu);
  }, [open]);

  function openMenu() {
    const menu = dialog.current;
    if (!menu || menu.open) return;

    positionMenu();
    if (!menu.hasAttribute("data-scroll-lock")) {
      const root = document.documentElement;
      root.style.setProperty("--menu-scrollbar-width", `${window.innerWidth - root.clientWidth}px`);
      menu.setAttribute("data-scroll-lock", "");
    }
    menu.showModal();
    setOpen(true);
  }

  async function finishClose() {
    const menu = dialog.current;
    if (!menu || menu.open) return;

    setOpen(false);
    await Promise.allSettled(menu.getAnimations().map((animation) => animation.finished));
    if (menu.open) return;

    menu.removeAttribute("data-scroll-lock");
    document.documentElement.style.removeProperty("--menu-scrollbar-width");
  }

  function toggleMotion() {
    document.documentElement.toggleAttribute("data-reduce-motion", !reduceMotion);
    setReduceMotion(!reduceMotion);
  }

  function toggleSound() {
    setUiSoundsEnabled(!soundEnabled);
    setSoundEnabled(!soundEnabled);
  }

  return (
    <>
      <Button
        ref={trigger}
        type="button"
        aria-label="Open navigation"
        aria-haspopup="dialog"
        aria-controls={dialogId}
        aria-expanded={open}
        size="icon"
        onClick={openMenu}
        className={menuButtonClass}
      >
        <MenuIcon />
      </Button>

      <dialog
        ref={dialog}
        id={dialogId}
        data-portfolio-menu
        aria-labelledby={titleId}
        onClose={finishClose}
        className="group/menu fixed inset-0 m-0 h-dvh max-h-none w-(--menu-viewport-width) max-w-none overflow-hidden bg-primary text-primary-foreground backdrop:bg-transparent"
      >
        <Button
          type="button"
          aria-label="Close navigation"
          size="icon"
          className={`${menuButtonClass} absolute top-(--menu-origin-y) left-(--menu-origin-x) z-10 size-(--menu-trigger-size) -translate-1/2 focus-visible:ring-white`}
          onClick={() => dialog.current?.close()}
        >
          <MenuIcon />
        </Button>
        <div className="h-full overflow-y-auto overscroll-contain [scrollbar-width:none]">
          <div className="mx-auto flex min-h-full w-[90%] max-w-[90rem] flex-col py-[clamp(1.35rem,3.7dvh,3rem)]">
            <header className="flex min-h-[calc(var(--menu-trigger-size)+1.25rem)] items-center border-b border-white/20 pb-5 pe-14">
              <h2 id={titleId} className="text-xs font-medium tracking-[.18em] uppercase">Portfolio menu</h2>
            </header>

            <div className="grid flex-1 content-center gap-x-[8%] gap-y-10 py-[clamp(2rem,9dvh,7rem)] md:grid-cols-[1fr_minmax(15rem,22rem)]">
              <nav aria-label="Portfolio sections">
                <ul className="list-none border-t border-white/20 p-0">
                  {menuLinks.map(({ label, href, count }) => href && (
                    <li key={label} className="border-b border-white/20">
                      <a
                        href={href}
                        onClick={() => dialog.current?.close()}
                        className="flex items-center justify-between gap-4 py-3 text-[clamp(2.5rem,7vw,7.5rem)] leading-[.95] font-semibold tracking-[-.065em] uppercase hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4"
                      >
                        <span>{label}</span>
                        {count && <span className="text-sm font-normal tracking-normal text-white/70">[{count}]</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <section aria-labelledby={`${titleId}-accessibility`} className="self-end">
                <h3 id={`${titleId}-accessibility`} className="mb-3 text-xs font-medium tracking-[.18em] text-white/75 uppercase">Accessibility</h3>
                <Button
                  type="button"
                  role="switch"
                  aria-checked={reduceMotion}
                  aria-label="Reduce motion"
                  onClick={toggleMotion}
                  className="h-auto min-h-12 w-full justify-between rounded-none border-t border-white/20 bg-transparent px-2 py-3 hover:bg-white/10 focus-visible:ring-white"
                >
                  Reduce motion <span aria-hidden="true" className="text-white/75">{reduceMotion ? "On" : "Off"}</span>
                </Button>
                <Button
                  type="button"
                  role="switch"
                  aria-checked={soundEnabled}
                  aria-label="Sound effects"
                  onClick={toggleSound}
                  className="h-auto min-h-12 w-full justify-between rounded-none border-y border-white/20 bg-transparent px-2 py-3 hover:bg-white/10 focus-visible:ring-white"
                >
                  Sound effects <span aria-hidden="true" className="text-white/75">{soundEnabled ? "On" : "Off"}</span>
                </Button>
                <p className="mt-3 text-xs leading-relaxed text-white/75">Your device’s reduced-motion setting also applies.</p>
              </section>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
