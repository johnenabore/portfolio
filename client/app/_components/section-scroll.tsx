"use client";

import { useEffect } from "react";

const edgeTolerance = 2;
const snapApproach = 28;
const wheelIdle = 150;
const snapDuration = 520;
const glideTimeConstant = 52;

type Transition = {
  frame: number;
  direction: number;
  lastWheelAt: number;
  reverseDelta?: number;
};

type Glide = {
  frame: number;
  position: number;
  target: number;
  lastFrameAt: number;
  edgeDelta?: number;
};

export function SectionScroll() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > [data-scroll-section]"));
    if (sections.length < 2) return;

    const root = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let transition: Transition | undefined;
    let landing: Pick<Transition, "direction" | "lastWheelAt"> | undefined;
    let glide: Glide | undefined;
    let freeScrollTop: number | undefined;
    let touch: { x: number; y: number; top: number; target?: number } | undefined;

    function motionEnabled() {
      return motion.matches && !root.hasAttribute("data-reduce-motion");
    }

    function resetScroll() {
      if (transition) cancelAnimationFrame(transition.frame);
      stopGlide();
      transition = undefined;
      landing = undefined;
    }

    function stopGlide() {
      if (glide) cancelAnimationFrame(glide.frame);
      glide = undefined;
      freeScrollTop = undefined;
    }

    function scrollTo(top: number) {
      window.scrollTo({ top, behavior: "instant" });
    }

    function glideTo(target: number, now: number) {
      freeScrollTop = target;
      if (glide) {
        glide.target = target;
        glide.edgeDelta = undefined;
        return;
      }

      const position = window.scrollY;
      if (Math.abs(target - position) < 0.5) return;
      const active: Glide = { frame: 0, position, target, lastFrameAt: now };
      glide = active;

      function animate(time: number) {
        if (!motionEnabled()) {
          resetScroll();
          return;
        }

        const elapsed = Math.max(0, time - active.lastFrameAt);
        active.lastFrameAt = time;
        const blend = 1 - Math.exp(-elapsed / glideTimeConstant);
        active.position += (active.target - active.position) * blend;

        if (Math.abs(active.target - active.position) < 0.5) {
          scrollTo(active.target);
          glide = undefined;
          if (active.edgeDelta) move(active.edgeDelta, time);
          return;
        }

        scrollTo(active.position);
        active.frame = requestAnimationFrame(animate);
      }

      active.frame = requestAnimationFrame(animate);
    }

    function snapTo(target: number, direction: number, now: number) {
      const from = window.scrollY;
      const top = Math.min(target, root.scrollHeight - root.clientHeight);
      const active: Transition = { frame: 0, direction, lastWheelAt: now };
      stopGlide();
      transition = active;

      function animate(time: number) {
        if (!motionEnabled()) {
          resetScroll();
          return;
        }

        const progress = Math.max(0, Math.min(1, (time - now) / snapDuration));
        const eased = progress * progress * (3 - 2 * progress);
        scrollTo(from + (top - from) * eased);

        if (progress < 1) {
          active.frame = requestAnimationFrame(animate);
          return;
        }

        transition = undefined;
        landing = { direction, lastWheelAt: active.lastWheelAt };
        if (active.reverseDelta) move(active.reverseDelta, time);
      }

      active.frame = requestAnimationFrame(animate);
    }

    function sectionBounds(top: number, direction: number) {
      const starts = sections.map((section) => section.getBoundingClientRect().top + window.scrollY);
      const index = Math.max(0, starts.findLastIndex((start) => start <= top + edgeTolerance));
      const start = starts[index];
      const next = starts[index + 1];
      const end = Math.max(start, (next ?? root.scrollHeight) - root.clientHeight);
      return { start, end, next, target: starts[index + direction] };
    }

    function inDialog(target: EventTarget | null) {
      return target instanceof Element && Boolean(target.closest('[role="dialog"], dialog[open]'));
    }

    function move(delta: number, now: number) {
      const direction = Math.sign(delta);
      if (transition) {
        transition.lastWheelAt = now;
        // Finish the current landing before applying a reversal from the same burst.
        transition.reverseDelta = direction === transition.direction ? undefined : delta;
        return;
      }

      if (landing?.direction === direction && now - landing.lastWheelAt < wheelIdle) {
        landing.lastWheelAt = now;
        return;
      }
      landing = undefined;

      const top = window.scrollY;
      const { start, end, next, target } = sectionBounds(top, direction);

      // Recover when an external scroll stops in the transition space.
      if (top > end + edgeTolerance) {
        const nearNext = next !== undefined && next - top <= snapApproach;
        const recovery = direction > 0 ? next ?? end : nearNext ? start : end;
        snapTo(recovery, direction, now);
        return;
      }

      const edge = direction > 0 ? end : start;
      const from = glide?.target ?? (freeScrollTop !== undefined && Math.abs(freeScrollTop - top) < 1 ? freeScrollTop : top);
      const atEdge = Math.abs(edge - from) <= edgeTolerance;
      const nearEdge = !glide && Math.abs(edge - top) <= snapApproach;
      if ((atEdge || nearEdge) && target !== undefined) {
        if (glide && Math.abs(edge - top) > edgeTolerance) {
          // Let the gallery reach its edge before handing off to the next section.
          glide.edgeDelta = delta;
        } else {
          snapTo(target, direction, now);
        }
        return;
      }

      glideTo(Math.max(start, Math.min(end, from + delta)), now);
    }

    function handleWheel(event: WheelEvent) {
      const { deltaMode, deltaX, deltaY } = event;
      if (
        !motionEnabled() ||
        event.defaultPrevented ||
        !event.cancelable ||
        event.ctrlKey ||
        event.shiftKey ||
        Math.abs(deltaY) <= Math.abs(deltaX) ||
        inDialog(event.target)
      ) return;

      // Claim the first vertical wheel event so native momentum cannot interrupt a later snap.
      event.preventDefault();
      const unit = deltaMode === WheelEvent.DOM_DELTA_PAGE ? root.clientHeight : deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : 1;
      move(deltaY * unit, performance.now());
    }

    function startTouch(event: TouchEvent) {
      touch = undefined;
      if (!motionEnabled() || event.touches.length !== 1 || inDialog(event.target)) return;

      const { clientX, clientY } = event.touches[0];
      touch = { x: clientX, y: clientY, top: window.scrollY };
    }

    function moveTouch(event: TouchEvent) {
      if (!touch || event.touches.length !== 1 || !motionEnabled()) {
        touch = undefined;
        return;
      }
      if (!event.cancelable || event.defaultPrevented) return;

      const { clientX, clientY } = event.touches[0];
      const distance = touch.y - clientY;
      touch.target = undefined;
      if (Math.abs(distance) <= Math.abs(touch.x - clientX)) return;

      const { start, end, target } = sectionBounds(touch.top, Math.sign(distance));
      const edge = distance > 0 ? end : start;
      if (target === undefined || Math.abs(touch.top - edge) > snapApproach) return;

      // Claim a swipe at the edge. Leave touch scrolling inside tall sections native.
      event.preventDefault();
      if (Math.abs(distance) >= 24) touch.target = target;
    }

    function endTouch(event: TouchEvent) {
      const target = touch?.target;
      touch = undefined;
      if (event.type === "touchend" && target !== undefined && motionEnabled()) {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", startTouch, { passive: true });
    window.addEventListener("touchmove", moveTouch, { passive: false });
    window.addEventListener("touchend", endTouch);
    window.addEventListener("touchcancel", endTouch);
    window.addEventListener("pointerdown", resetScroll, { passive: true });
    window.addEventListener("keydown", resetScroll);
    return () => {
      resetScroll();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", startTouch);
      window.removeEventListener("touchmove", moveTouch);
      window.removeEventListener("touchend", endTouch);
      window.removeEventListener("touchcancel", endTouch);
      window.removeEventListener("pointerdown", resetScroll);
      window.removeEventListener("keydown", resetScroll);
    };
  }, []);

  return null;
}
