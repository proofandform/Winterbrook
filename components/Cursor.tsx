"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Custom cursor: a standard arrow pointer that keeps the brand's contextual
 * colouring — cream over any navy surface (.bg-ink / .bg-navy-deep /
 * .bg-navy: the header, navy sections and cards, the mobile menu, the
 * footer), ink on light surfaces — with a hairline outline in the opposite
 * colour so it stays legible over photography and video.
 *
 * Theme detection is class-based rather than per-page (any future navy
 * surface is covered automatically) and must not rely on mousemove alone:
 * scrolling or navigating changes the surface beneath a stationary pointer,
 * so the same closest() check is re-run against elementFromPoint on scroll
 * (rAF-throttled) and after route changes.
 *
 * Tracking is 1:1 with the pointer (no easing), so it behaves like the
 * native cursor. Only active for fine pointers without reduced motion; the
 * native cursor is suppressed via CSS on .cursor-host (pointer-fine only),
 * so touch devices and reduced-motion users keep the OS cursor untouched.
 */

const DARK_SURFACE_SELECTOR = ".bg-ink, .bg-navy-deep, .bg-navy";

export default function Cursor() {
  const arrowRef = useRef<HTMLDivElement>(null);
  const point = useRef({ x: -100, y: -100 });
  const [onDark, setOnDark] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.classList.add("cursor-host");

    let raf = 0;
    const applyTheme = () => {
      raf = 0;
      const { x, y } = point.current;
      const el = document.elementFromPoint(x, y);
      setOnDark(!!el?.closest?.(DARK_SURFACE_SELECTOR));
    };
    const queueTheme = () => {
      if (!raf) raf = requestAnimationFrame(applyTheme);
    };

    const onMove = (e: MouseEvent) => {
      point.current.x = e.clientX;
      point.current.y = e.clientY;
      const el = arrowRef.current;
      if (el) el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const t = e.target as Element | null;
      setOnDark(!!t?.closest?.(DARK_SURFACE_SELECTOR));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    // capture: true so scrolls inside nested containers also re-theme
    window.addEventListener("scroll", queueTheme, { passive: true, capture: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", queueTheme, { capture: true });
      if (raf) cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-host");
    };
  }, []);

  // After a route change the page beneath a stationary pointer is new
  // content; re-check once the transition has painted (and again after the
  // exit/enter animation settles).
  useEffect(() => {
    if (!enabled) return;
    const check = () => {
      const { x, y } = point.current;
      const el = document.elementFromPoint(x, y);
      setOnDark(!!el?.closest?.(DARK_SURFACE_SELECTOR));
    };
    const raf = requestAnimationFrame(check);
    const settle = setTimeout(check, 900);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, [pathname, enabled]);

  if (!enabled) return null;

  const fill = onDark ? "var(--color-cream)" : "var(--color-ink)";
  const outline = onDark ? "var(--color-navy-deep)" : "var(--color-paper)";

  return (
    <div
      ref={arrowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      {/* classic arrow pointer; the tip sits exactly on the hotspot */}
      <svg width="22" height="24" viewBox="0 0 17 20" fill="none">
        <path
          d="M1 1v14.9l4.1-3.8 2.4 5.6c.11.25.4.37.66.26l1.5-.64a.5.5 0 0 0 .26-.66L7.5 11.1l5.6-.55L1 1Z"
          fill={fill}
          stroke={outline}
          strokeWidth="1.1"
          strokeLinejoin="round"
          style={{ transition: "fill 0.15s ease, stroke 0.15s ease" }}
        />
      </svg>
    </div>
  );
}
