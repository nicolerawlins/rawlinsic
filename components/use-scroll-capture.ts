"use client";

import { useEffect, type RefObject } from "react";

/**
 * Turns a horizontal-scroll carousel into a "pinned" one: while the section is
 * across the middle of the viewport, a vertical wheel/trackpad gesture scrolls
 * the track sideways instead of moving the page. Once the track reaches either
 * end, the page resumes scrolling vertically — so the reader is never trapped.
 *
 * It drives the element's own scrollLeft, so the existing arrows, drag, and
 * progress bar keep working. The listener is on the window (not the section), so
 * it fires no matter where the cursor is. It steps aside on touch devices, where
 * native swipe is better. It deliberately does NOT opt out for reduced-motion —
 * this is scroll-linked navigation the user asked for, not decorative animation.
 *
 * @param trackRef  the horizontally-scrolling element (overflow-x: auto)
 * @param enabled   opt-out switch (defaults on)
 */
export function useScrollCapture(
  trackRef: RefObject<HTMLElement | null>,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;
    const track = trackRef.current;
    if (!track) return;

    // Touch devices keep their native swipe — wheel-capture is a pointer thing.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const section: HTMLElement = track.closest("section") ?? track;

    const onWheel = (e: WheelEvent) => {
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 1) return; // nothing to scroll sideways (e.g. cards already fit)

      // Engage while the section straddles the middle of the viewport, so the
      // hijack begins once the reader has arrived at it and lets go before it
      // leaves. A generous band means a quick flick still catches it.
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (!(r.top < vh * 0.6 && r.bottom > vh * 0.4)) return;

      // Use the dominant axis so a real horizontal gesture still works.
      const delta =
        Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta === 0) return;

      const atStart = track.scrollLeft <= 0;
      const atEnd = track.scrollLeft >= max - 1;

      // Release at the ends — scrolling up at the start, or down at the end,
      // falls through to the page so vertical scrolling continues.
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;

      e.preventDefault();
      track.scrollLeft += delta;
    };

    // On the window so it fires regardless of cursor position.
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [trackRef, enabled]);
}
