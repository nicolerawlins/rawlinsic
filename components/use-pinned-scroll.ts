"use client";

import { useEffect, type RefObject } from "react";

/**
 * Sticky-pin horizontal scroll. A tall `pin` wrapper reserves scroll distance;
 * while it's pinned, native vertical scroll drives the `track` sideways via
 * transform. No wheel hijack and no blocked scrolling, so it never traps, and it
 * works the same on desktop and touch. Ends exactly when the last card is in view
 * (mirroring the first card's inset), so there's no blank run.
 *
 * Structure the markup as:
 *   <section>
 *     <div ref={pinRef}>                 // .ei-pin  — height set here
 *       <div class="ei-sticky">          // position: sticky; height: 100dvh
 *         ...header / controls...
 *         <div ref={viewportRef}>        // .ei-viewport — overflow: hidden
 *           <div ref={trackRef}>…cards…  // transform: translateX
 *         </div>
 *       </div>
 *     </div>
 *   </section>
 *
 * @param setProgress optional 0–1 progress reporter (drives a progress bar)
 */
export function usePinnedScroll(
  pinRef: RefObject<HTMLElement | null>,
  viewportRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  setProgress?: (p: number) => void
) {
  useEffect(() => {
    const pin = pinRef.current;
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!pin || !vp || !track || track.children.length === 0) return;

    let overflowPx = 0;

    const onScroll = () => {
      const total = pin.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -pin.getBoundingClientRect().top / total)) : 0;
      track.style.transform = `translateX(${-p * overflowPx}px)`;
      setProgress?.(p);
    };

    const layout = () => {
      // Measure untransformed. The end inset mirrors the first card's start inset,
      // wherever the padding lives (on the track or the viewport).
      track.style.transform = "none";
      const first = track.firstElementChild as HTMLElement;
      const last = track.lastElementChild as HTMLElement;
      const vpLeft = vp.getBoundingClientRect().left;
      const startInset = first.getBoundingClientRect().left - vpLeft;
      const lastRight = last.getBoundingClientRect().right - vpLeft;
      overflowPx = Math.max(0, lastRight - vp.clientWidth + startInset);
      pin.style.height = window.innerHeight + overflowPx + "px";
      onScroll();
    };

    layout();
    // Re-measure once fonts/images settle, and on deep-link/resize, so landing
    // directly on the section's anchor still gets the right pin height.
    const settle = setTimeout(layout, 400);
    const relayout = () => layout();
    window.addEventListener("load", relayout);
    window.addEventListener("hashchange", relayout);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", relayout);
    return () => {
      clearTimeout(settle);
      window.removeEventListener("load", relayout);
      window.removeEventListener("hashchange", relayout);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", relayout);
    };
  }, [pinRef, viewportRef, trackRef, setProgress]);
}
