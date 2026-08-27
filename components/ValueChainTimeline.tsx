"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { valueChain } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * "What happens to your site" — a vertical scrolling timeline of the five
 * stages of the Winterbrook development lifecycle. The left column stays
 * sticky while the stages pass; a hairline draws itself down the page in
 * step with scroll, and each stage carries its director-level owner.
 * Static (fully visible) under reduced motion or without JS.
 */
export default function ValueChainTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (lineRef.current) lineRef.current.style.transform = "scaleY(1)";
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-ink py-24 text-paper md:py-32"
      aria-labelledby="timeline-heading"
    >
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
        {/* sticky intro */}
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.42em] text-brass">
              How we capture value
            </p>
            <h2 id="timeline-heading" className="font-display mt-5 text-4xl leading-[1.12] sm:text-5xl">
              Five stages.
              <br />
              Each owned at director level.
            </h2>
            <p className="mt-7 max-w-md text-lg leading-[1.8] text-stone/65">
              Every Winterbrook scheme moves through a defined operating structure with a named
              director accountable for each stage. It is how our schemes finish on time, on budget
              and to a standard we put our name to.
            </p>
          </Reveal>
        </div>

        {/* timeline */}
        <ol className="relative">
          {/* track + progress line */}
          <div className="absolute bottom-6 left-[7px] top-6 w-px bg-stone/15" aria-hidden="true" />
          <div
            ref={lineRef}
            aria-hidden="true"
            className="absolute bottom-6 left-[7px] top-6 w-px origin-top bg-brass"
            style={{ transform: "scaleY(0)" }}
          />
          {valueChain.map((stage, i) => (
            <Reveal as="li" key={stage.stage} delay={i * 60} className="relative pb-16 pl-12 last:pb-0">
              {/* node */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.6rem] flex h-[15px] w-[15px] items-center justify-center rounded-full border border-brass bg-ink"
              >
                <span className="h-[5px] w-[5px] rounded-full bg-brass" />
              </span>
              <p className="text-[11px] uppercase tracking-[0.35em] text-brass">
                Stage 0{i + 1} — {stage.stage}
              </p>
              <h3 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{stage.title}</h3>
              <p className="mt-4 max-w-lg text-[17px] leading-[1.8] text-stone/65">{stage.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
