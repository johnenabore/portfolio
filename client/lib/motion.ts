// Shared checks for JS-driven motion. CSS uses the matching `site-motion:` variant.
export function motionAllowed() {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches &&
    !document.documentElement.hasAttribute("data-reduce-motion");
}

export function finePointer() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
