// Visitor preferences from the menu, saved in localStorage so they survive reloads.
export const reduceMotionKey = "portfolio-reduce-motion";
export const soundKey = "portfolio-sound";

// Runs inline in <head> before first paint, so a saved "Reduce motion" never flashes animation.
export const preferenceScript = `try{if(localStorage.getItem("${reduceMotionKey}")==="on")document.documentElement.setAttribute("data-reduce-motion","")}catch(e){}`;

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
