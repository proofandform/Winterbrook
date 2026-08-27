"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { developments, type HomeType } from "@/lib/content";
import DevelopmentCard from "./DevelopmentCard";
import { TransitionLink } from "./PageTransition";

const DevelopmentsMap = dynamic(() => import("./DevelopmentsMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[320px] items-center justify-center bg-stone text-sm uppercase tracking-[0.2em] text-mist">
      Loading map…
    </div>
  ),
});

type StatusFilter = "all" | "available" | "coming-soon";
type TypeFilter = "all" | HomeType;

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "coming-soon", label: "Coming Soon" },
];
const typeFilters: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All homes" },
  { value: "house", label: "Houses" },
  { value: "apartment", label: "Apartments" },
  { value: "duplex", label: "Duplexes" },
];

/**
 * Current developments only: status + home-type filters with FLIP re-flow,
 * and the region map with two-way pin/card hover sync. The archive lives on
 * its own page and is linked, not repeated, here.
 */
export default function HomesExplorer() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [homeType, setHomeType] = useState<TypeFilter>("all");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const matches = useMemo(
    () =>
      developments.filter(
        (d) =>
          (status === "all" || d.status === status) &&
          (homeType === "all" || d.homeTypes.includes(homeType))
      ),
    [status, homeType]
  );

  const filterBtn = (isActive: boolean) =>
    `rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.16em] transition-colors duration-300 ${
      isActive
        ? "border-ink bg-ink text-paper"
        : "border-ink/20 text-ink/70 hover:border-ink/60 hover:text-ink"
    }`;

  return (
    <div>
      {/* filters */}
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-y border-ink/10 py-5">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            <fieldset className="flex flex-wrap items-center gap-2">
              <legend className="sr-only">Filter by status</legend>
              <span className="mr-1 text-[11px] uppercase tracking-[0.25em] text-mist" aria-hidden="true">
                Status
              </span>
              {statusFilters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={status === f.value}
                  onClick={() => setStatus(f.value)}
                  className={filterBtn(status === f.value)}
                >
                  {f.label}
                </button>
              ))}
            </fieldset>
            <fieldset className="flex flex-wrap items-center gap-2">
              <legend className="sr-only">Filter by home type</legend>
              <span className="mr-1 text-[11px] uppercase tracking-[0.25em] text-mist" aria-hidden="true">
                Type
              </span>
              {typeFilters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={homeType === f.value}
                  onClick={() => setHomeType(f.value)}
                  className={filterBtn(homeType === f.value)}
                >
                  {f.label}
                </button>
              ))}
            </fieldset>
          </div>
          <TransitionLink
            href="/past-developments"
            className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-mist transition-colors duration-300 hover:text-ink"
          >
            Past &amp; international developments
            <span className="h-px w-8 bg-ink/30 transition-all duration-400 group-hover:w-12 group-hover:bg-ink/60" aria-hidden="true" />
          </TransitionLink>
        </div>
      </div>

      {/* developments + map */}
      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8">
        <LayoutGroup>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <motion.ul layout className="grid content-start gap-x-8 gap-y-14 sm:grid-cols-2" aria-live="polite">
              <AnimatePresence mode="popLayout">
                {matches.map((dev) => (
                  <motion.li
                    key={dev.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <DevelopmentCard
                      dev={dev}
                      onHover={setActiveSlug}
                      active={activeSlug === dev.slug}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
              {matches.length === 0 && (
                <li className="col-span-full py-10 text-mist">
                  No developments match those filters at present — try widening the selection, or{" "}
                  <TransitionLink href="/contact" className="underline decoration-ink/30 underline-offset-4 hover:text-ink">
                    register your interest
                  </TransitionLink>{" "}
                  for upcoming launches.
                </li>
              )}
            </motion.ul>

            <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
              <DevelopmentsMap
                activeSlug={activeSlug}
                onPinHover={setActiveSlug}
                className="h-[320px] overflow-hidden border border-ink/10 sm:h-[420px] lg:h-full"
              />
              <p className="mt-3 text-xs text-mist max-lg:hidden">
                Hover a pin to highlight its scheme — or hover a card to find it on the map.
              </p>
            </div>
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
