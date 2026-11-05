"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { playUiSound } from "@/lib/ui-sounds";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";

type ProjectNavigation = (href: string, title: string) => boolean;

type CurtainRun = {
  source: string;
  destination: string;
  animation: Animation;
  timeout: number;
  opening: boolean;
};

const ProjectNavigationContext = createContext<ProjectNavigation | null>(null);
const closingClip = [
  { clipPath: "polygon(100% 100%, 100% 100%, 100% 100%)" },
  { clipPath: "polygon(100% -100%, 100% 100%, -100% 100%)" },
];
const openingClip = [
  { clipPath: "polygon(0% 0%, 200% 0%, 0% 200%)" },
  { clipPath: "polygon(0% 0%, 0% 0%, 0% 0%)" },
];
const sweepDuration = 1000;
const easing = "cubic-bezier(.65, 0, .35, 1)";

export function ProjectTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const active = useRef<CurtainRun>(null);
  const [title, setTitle] = useState("");

  const openCurtain = useCallback((run: CurtainRun, arrived: boolean) => {
    const element = curtain.current;
    if (!element || active.current !== run || run.opening) return;

    run.opening = true;
    window.clearTimeout(run.timeout);
    if (arrived) {
      document.querySelector<HTMLElement>("main h1")?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    document.documentElement.removeAttribute("data-project-transition");

    const opening = element.animate(
      openingClip,
      { duration: sweepDuration, easing, fill: "forwards" },
    );
    run.animation.cancel();
    run.animation = opening;

    void opening.finished.then(() => {
      if (active.current !== run) return;
      element.removeAttribute("data-active");
      opening.cancel();
      active.current = null;
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const run = active.current;
    if (!run || pathname === run.source) return;

    const frame = window.requestAnimationFrame(() => openCurtain(run, pathname === run.destination));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, openCurtain]);

  useEffect(() => () => {
    const run = active.current;
    if (run) {
      window.clearTimeout(run.timeout);
      run.animation.cancel();
    }
    active.current = null;
    document.documentElement.removeAttribute("data-project-transition");
  }, []);

  const navigate = useCallback<ProjectNavigation>((href, projectTitle) => {
    const element = curtain.current;
    const root = document.documentElement;
    if (active.current) return true;
    if (
      pathname !== "/" ||
      !href.startsWith("/projects/") ||
      !element?.animate ||
      !CSS.supports("clip-path", closingClip[0].clipPath) ||
      !window.matchMedia("(prefers-reduced-motion: no-preference)").matches ||
      root.hasAttribute("data-reduce-motion")
    ) return false;

    setTitle(projectTitle);
    element.setAttribute("data-active", "");
    root.setAttribute("data-project-transition", "");
    const closing = element.animate(
      closingClip,
      { duration: sweepDuration, easing, fill: "forwards" },
    );
    const run: CurtainRun = {
      source: pathname,
      destination: new URL(href, window.location.href).pathname,
      animation: closing,
      timeout: window.setTimeout(() => openCurtain(run, false), 4500),
      opening: false,
    };
    active.current = run;
    playUiSound("projectSweep");

    void closing.finished.then(() => {
      if (active.current === run && !run.opening) router.push(href);
    }).catch(() => {});
    return true;
  }, [openCurtain, pathname, router]);

  return (
    <ProjectNavigationContext.Provider value={navigate}>
      {children}
      <div
        ref={curtain}
        data-project-curtain
        aria-hidden="true"
        className="pointer-events-none invisible fixed inset-0 z-[100] grid place-items-center bg-primary px-6 text-center text-primary-foreground data-active:pointer-events-auto data-active:visible"
      >
        <div>
          <p className="mb-3 text-xs font-medium tracking-[.2em] text-white/65 uppercase">Project</p>
          <p className="text-[clamp(2rem,6vw,5.5rem)] leading-none font-semibold tracking-[-.065em]">{title}</p>
        </div>
      </div>
    </ProjectNavigationContext.Provider>
  );
}

export function ProjectLink({ projectTitle, href, ...props }: Omit<ComponentProps<typeof Link>, "href" | "onNavigate"> & {
  href: string;
  projectTitle: string;
}) {
  const navigate = useContext(ProjectNavigationContext);
  const projectRoute = href.startsWith("/projects/");

  return (
    <Link
      {...props}
      href={href}
      data-project-transition-link={projectRoute ? "" : undefined}
      onNavigate={(event) => {
        if (!projectRoute) return;
        if (navigate?.(href, projectTitle)) event.preventDefault();
        else playUiSound("click");
      }}
    />
  );
}
