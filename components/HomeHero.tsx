"use client";

import { useEffect, useRef, useState } from "react";
import SplitHeadline from "./SplitHeadline";
import Magnetic from "./Magnetic";
import { TransitionLink } from "./PageTransition";

/** The Poplars film is decorative; the first frame remains visible when motion is reduced or playback fails. */
export default function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOk(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!motionOk) {
      videoRef.current?.pause();
      return;
    }
    videoRef.current?.play().catch(() => setMotionOk(false));
  }, [motionOk]);

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-paper">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-[position:50%_45%]"
        style={{ backgroundImage: "url('/images/poplars-home-hero-poster.jpg')" }}
        aria-hidden="true"
      />
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-[54%_center] md:object-center"
        src={motionOk ? "/video/poplars-home-hero.mp4" : undefined}
        poster="/images/poplars-home-hero-poster.jpg"
        autoPlay={motionOk}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        onError={() => setMotionOk(false)}
      />
      {/* light cinematic scrim — enough for legibility, no heavy overlay */}
      <div
        className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-navy-deep/85 via-navy-deep/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-deep/45 via-navy-deep/10 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-24 pt-40 sm:px-8 md:pb-28">
        <p
          className="font-display mb-6 text-xl italic tracking-[0.02em] text-stone/90 sm:text-2xl"
          data-reveal="up"
          ref={(el) => {
            if (el) setTimeout(() => el.classList.add("is-revealed"), 200);
          }}
        >
          Family owned. Expertly delivered.
        </p>
        <SplitHeadline
          text="Thoughtfully creating places to call home"
          as="h1"
          onMount
          delay={350}
          stagger={110}
          className="max-w-[21ch] text-5xl leading-[1.06] sm:text-7xl lg:text-[6.5rem]"
        />
        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
          <Magnetic>
            <TransitionLink
              href="/homes"
              data-cursor="Explore"
              className="group inline-flex items-center gap-4 rounded-full border border-paper/35 px-8 py-4 text-[13px] uppercase tracking-[0.2em] backdrop-blur-[2px] transition-colors duration-500 hover:border-paper hover:bg-paper hover:text-ink"
            >
              Current developments
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true" className="transition-transform duration-400 group-hover:translate-x-1">
                <path d="M1 5h14m0 0L11 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </TransitionLink>
          </Magnetic>

        </div>
      </div>

      {/* A quiet credit makes the footage identifiable without competing with the headline. */}
      <div
        className="absolute bottom-10 right-8 hidden text-right text-[11px] uppercase tracking-[0.24em] text-stone/80 md:block"
      >
        The Poplars <span className="mx-2 text-stone/50">·</span> Shankill, Co. Dublin
      </div>
    </section>
  );
}
