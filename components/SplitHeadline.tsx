"use client";

import { useEffect, useRef, createElement } from "react";

interface SplitHeadlineProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** ms before the first word starts */
  delay?: number;
  /** ms between words */
  stagger?: number;
  /** reveal immediately on mount (hero) instead of on scroll into view */
  onMount?: boolean;
}

/**
 * Staggered word-by-word fade-up. Words are real text nodes server-side
 * (SEO/no-JS safe); the mask-and-rise treatment only applies under html.js.
 */
export default function SplitHeadline({
  text,
  as = "h1",
  className,
  delay = 0,
  stagger = 70,
  onMount = false,
}: SplitHeadlineProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => el.classList.add("is-split-revealed");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }
    if (onMount) {
      const t = setTimeout(reveal, 30);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onMount]);

  const words = text.split(" ");
  return createElement(
    as,
    { ref, className: `split-headline ${className ?? ""}`, "aria-label": text },
    words.map((word, i) => (
      <span key={i} aria-hidden="true" className="split-word-mask">
        <span
          className="split-word"
          style={{ transitionDelay: `${delay + i * stagger}ms` }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      </span>
    ))
  );
}
