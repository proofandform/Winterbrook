"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { HeroFilm } from "@/lib/content";

/** The image is the default experience; motion is added only when permitted and playable. */
export default function DevelopmentHeroFilm({ film }: { film: HeroFilm }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionAllowed(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!motionAllowed) {
      videoRef.current?.pause();
      return;
    }
    videoRef.current?.play().catch(() => {
      setVideoReady(false);
      setMotionAllowed(false);
    });
  }, [motionAllowed]);

  return (
    <div className="absolute inset-0">
      <Image
        src={film.poster}
        alt={film.posterAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <video
        ref={videoRef}
        src={motionAllowed ? film.src : undefined}
        poster={film.poster}
        autoPlay={motionAllowed}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoReady && motionAllowed ? "opacity-100" : "opacity-0"}`}
        onLoadedData={() => setVideoReady(true)}
        onError={() => {
          setVideoReady(false);
          setMotionAllowed(false);
        }}
      />
    </div>
  );
}
