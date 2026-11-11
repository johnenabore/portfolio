"use client";

import { useEffect } from "react";

const edgeTolerance = 2;
const snapApproach = 28;
const wheelIdle = 150;
const snapDuration = 520;
const glideTimeConstant = 68;
const touchSettleDelay = 120;
const touchSnapDistance = 24;

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

type TouchGesture = { x: number; y: number; top: number; section: HTMLElement; target?: HTMLElement };
type TouchRelease = Pick<TouchGesture, "top" | "section"> & { distance: number };

export function SectionScroll() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > [data-scroll-section]"));
    if (sections.length < 2) return;

    const root = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const nativeTouch = window.matchMedia("(hover: none) and (pointer: coarse)");
    let transition: Transition | undefined;
    let landing: Pick<Transition, "direction" | "lastWheelAt"> | undefined;
    let glide: Glide | undefined;
    let freeScrollTop: number | undefined;
    let touch: TouchGesture | undefined;
    let settlingTouch: TouchRelease | undefined;
    let touchTimer: number | undefined;

    function motionEnabled() {
      return motion.matches && !root.hasAttribute("data-reduce-motion");
    }

    function resetScroll() {
      if (transition) cancelAnimationFrame(transition.frame);
      stopGlide();
      cancelTouchSettle();
      transition = undefined;
      landing = undefined;
      root.removeAttribute("data-section-snapping");
    }

    function stopGlide() {
      if (glide) cancelAnimationFrame(glide.frame);
      glide = undefined;
      freeScrollTop = undefined;
    }

    function scrollTo(top: number) {
      window.scrollTo({ top, behavior: "instant" });
    }

    function glideTo(target: number, now: number, edgeDelta?: number) {
      freeScrollTop = target;
      if (glide) {
        glide.target = target;
        glide.edgeDelta = edgeDelta;
        return;
      }

      const position = window.scrollY;
      if (Math.abs(target - position) < 0.5) return;
      const active: Glide = { frame: 0, position, target, lastFrameAt: now, edgeDelta };
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

    function snapTo(target: HTMLElement | number, direction: number, now: number) {
      const from = window.scrollY;
      const active: Transition = { frame: 0, direction, lastWheelAt: now };
      stopGlide();
      root.setAttribute("data-section-snapping", "");
      transition = active;

      function animate(time: number) {
        if (!motionEnabled()) {
          resetScroll();
          return;
        }

        const progress = Math.max(0, Math.min(1, (time - now) / snapDuration));
        const eased = progress * progress * (3 - 2 * progress);
        const destination = typeof target === "number" ? target : sectionTop(target);
        const top = Math.min(destination, root.scrollHeight - root.clientHeight);
        scrollTo(from + (top - from) * eased);

        if (progress < 1) {
          active.frame = requestAnimationFrame(animate);
          return;
        }

        transition = undefined;
        root.removeAttribute("data-section-snapping");
        landing = { direction, lastWheelAt: active.lastWheelAt };
        if (active.reverseDelta) move(active.reverseDelta, time);
      }

      active.frame = requestAnimationFrame(animate);
    }

    function sectionTop(section: HTMLElement) {
      return section.getBoundingClientRect().top + window.scrollY;
    }

    function sectionAt(top: number) {
      return sections.findLast((section) => sectionTop(section) <= top + edgeTolerance) ?? sections[0];
    }

    function sectionBounds(section: HTMLElement) {
      const index = sections.indexOf(section);
      const start = sectionTop(section);
      const next = sections[index + 1];
      const bottom = next ? sectionTop(next) : root.scrollHeight;
      const end = Math.max(start, bottom - root.clientHeight);
      return { start, end, next, previous: sections[index - 1] };
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
      const { start, end, next, previous } = sectionBounds(sectionAt(top));
      const target = direction > 0 ? next : previous;

      // Recover when an external scroll stops in the transition space.
      if (top > end + edgeTolerance) {
        const nearNext = next !== undefined && sectionTop(next) - top <= snapApproach;
        const recovery = direction > 0 ? next ?? end : nearNext ? start : end;
        snapTo(recovery, direction, now);
        return;
      }

      const edge = direction > 0 ? end : start;
      const from = glide?.target ?? (freeScrollTop !== undefined && Math.abs(freeScrollTop - top) < 1 ? freeScrollTop : top);
      if (target && Math.abs(edge - top) <= edgeTolerance) {
        snapTo(target, direction, now);
        return;
      }

      const intendedTop = from + delta;
      const clampedTop = Math.max(start, Math.min(end, intendedTop));
      // Carry wheel movement past an edge into the snap once free scrolling reaches it.
      const edgeDelta = target && Math.abs(intendedTop - clampedTop) > edgeTolerance ? delta : undefined;
      glideTo(clampedTop, now, edgeDelta);
    }

    function handleWheel(event: WheelEvent) {
      const { deltaMode, deltaX, deltaY } = event;
      if (
        !motionEnabled() ||
        nativeTouch.matches ||
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
      cancelTouchSettle();
      move(deltaY * unit, performance.now());
    }

    function cancelTouchSettle() {
      window.clearTimeout(touchTimer);
      settlingTouch = undefined;
    }

    function settleTouch() {
      const gesture = settlingTouch;
      if (!gesture) return;
      if (!motionEnabled()) {
        cancelTouchSettle();
        return;
      }

      const top = window.scrollY;
      const { start, end, next, previous } = sectionBounds(gesture.section);
      const direction = Math.sign(gesture.distance);
      const edge = direction > 0 ? end : start;
      const target = direction > 0 ? next : previous;
      const travelPastEdge = direction * (top - edge);
      const swipedPastEdge = direction * (gesture.top + gesture.distance - edge) >= touchSnapDistance;

      // Hand off as soon as native scrolling reaches an edge the swipe crosses.
      if (target && travelPastEdge >= -edgeTolerance && (travelPastEdge > edgeTolerance || swipedPastEdge)) {
        const targetTop = Math.min(sectionTop(target), root.scrollHeight - root.clientHeight);
        cancelTouchSettle();
        if (direction * (targetTop - top) > edgeTolerance) snapTo(target, direction, performance.now());
        return;
      }

      window.clearTimeout(touchTimer);
      touchTimer = window.setTimeout(cancelTouchSettle, touchSettleDelay);
    }

    function startTouch(event: TouchEvent) {
      cancelTouchSettle();
      touch = undefined;
      if (!motionEnabled() || event.touches.length !== 1 || inDialog(event.target)) return;

      const { clientX, clientY } = event.touches[0];
      const top = window.scrollY;
      touch = { x: clientX, y: clientY, top, section: sectionAt(top) };
    }

    function moveTouch(event: TouchEvent) {
      if (!touch || event.touches.length !== 1 || !motionEnabled() || !event.cancelable || event.defaultPrevented) return;

      const { clientX, clientY } = event.touches[0];
      const distance = touch.y - clientY;
      touch.target = undefined;
      if (Math.abs(distance) <= Math.abs(touch.x - clientX)) return;

      const { start, end, next, previous } = sectionBounds(touch.section);
      const target = distance > 0
        ? (touch.top >= end - snapApproach ? next : undefined)
        : (touch.top <= start + snapApproach ? previous : undefined);
      if (target === undefined) return;

      event.preventDefault();
      if (Math.abs(distance) >= touchSnapDistance) touch.target = target;
    }

    function endTouch(event: TouchEvent) {
      const gesture = touch;
      touch = undefined;
      if (event.type !== "touchend" || !gesture || !motionEnabled()) return;

      const end = event.changedTouches[0];
      if (!end) return;
      const distance = gesture.y - end.clientY;
      if (gesture.target) {
        snapTo(gesture.target, Math.sign(distance), performance.now());
        return;
      }
      if (Math.abs(distance) < Math.max(12, Math.abs(gesture.x - end.clientX))) return;
      settlingTouch = { top: gesture.top, section: gesture.section, distance };
      settleTouch();
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", startTouch, { passive: true });
    // Register before the gesture so Safari can cancel an edge swipe from its first move.
    window.addEventListener("touchmove", moveTouch, { passive: false });
    window.addEventListener("scroll", settleTouch, { passive: true });
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
      window.removeEventListener("scroll", settleTouch);
      window.removeEventListener("touchcancel", endTouch);
      window.removeEventListener("pointerdown", resetScroll);
      window.removeEventListener("keydown", resetScroll);
    };
  }, []);

  return null;
}
