"use client";

import { useEffect, type RefObject } from "react";

/**
 * Turns a horizontal-scroll carousel into a "pinned" one: while the section is
 * centered in the viewport, a vertical wheel/trackpad gesture scrolls the track
 * sideways instead of moving the page. Once the track reaches either end, the
 * page resumes scrolling vertically — so the reader is never trapped.
 *
 * It drives the element's own scrollLeft, so the existing arrows, drag, and
 * progress bar keep working untouched. It engages only on pointer devices with
 * motion allowed: touch (native swipe is better there) and reduced-motion users
 * keep the plain manual scroll.
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

    // Native swipe wins on touch; honour reduced-motion.
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Bind to the enclosing section so we only capture while the pointer is
    // over this block, never elsewhere on the page.
    const zone: HTMLElement = track.closest("section") ?? track;

    const onWheel = (e: WheelEvent) => {
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 1) return; // nothing to scroll sideways

      // Only engage once the block is roughly filling the viewport, so the
      // hijack starts when the reader has actually arrived at it.
      const r = zone.getBoundingClientRect();
      const vh = window.innerHeight;
      const centered = r.top < vh * 0.5 && r.bottom > vh * 0.5;
      if (!centered) return;

      // Prefer the dominant axis so a genuinely horizontal gesture still works.
      const delta =
        Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta === 0) return;

      const atStart = track.scrollLeft <= 0;
      const atEnd = track.scrollLeft >= max - 1;

      // Release at the ends: scrolling up at the start, or down at the end,
      // falls through to the page so vertical scrolling continues.
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;

      e.preventDefault();
      track.scrollLeft += delta;
    };

    zone.addEventListener("wheel", onWheel, { passive: false });
    return () => zone.removeEventListener("wheel", onWheel);
  }, [trackRef, enabled]);
}
