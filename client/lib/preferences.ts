// Visitor preferences from the menu, saved in localStorage so they survive reloads.
export const reduceMotionKey = "portfolio-reduce-motion";
export const soundKey = "portfolio-sound";

export const introSeenKey = "portfolio-intro-seen";

// Runs inline in <head> before first paint, so a saved "Reduce motion" never flashes animation.
// It also decides whether the homepage intro shows, so the intro is in the very first paint instead of
// appearing after hydration. If the app never hydrates, the intro is dropped after 8 seconds.
export const preferenceScript = `try{var h=document.documentElement;if(location.hash.length>1&&location.hash!=="#home")h.setAttribute("data-sections-ready","");if(localStorage.getItem("${reduceMotionKey}")==="on")h.setAttribute("data-reduce-motion","")}catch(e){}try{if(location.pathname==="/"&&!sessionStorage.getItem("${introSeenKey}")&&!h.hasAttribute("data-reduce-motion")&&matchMedia("(prefers-reduced-motion: no-preference)").matches){h.setAttribute("data-intro-open","");setTimeout(function(){var d=document.querySelector("[data-development-intro]");if(!d||!d.open)h.removeAttribute("data-intro-open")},8000)}}catch(e){}`;

const listeners = new Set<() => void>();

export function subscribePreferences(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function readPreference(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function savePreference(key: string, value: "on" | "off") {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The choice still applies for this page view when storage is blocked.
  }
  listeners.forEach((listener) => listener());
}
