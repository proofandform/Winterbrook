"use client";

import {
  useEffect,
  useRef,
  createElement,
  type ReactNode,
  type CSSProperties,
} from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in ms */
  delay?: number;
  as?: "div" | "section" | "span" | "li" | "figure" | "article" | "h1" | "h2" | "h3" | "p";
  className?: string;
  /** "up" (default) slides up, "none" fades only */
  variant?: "up" | "none";
}

/**
 * Scroll-triggered reveal built on IntersectionObserver + CSS transitions.
 * Content is fully visible when JS is unavailable (progressive enhancement:
 * the hiding class only applies under `html.js`).
 */
export default function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-revealed");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-revealed");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {};
  return createElement(
    as,
    { ref, "data-reveal": variant, className, style },
    children
  );
}
