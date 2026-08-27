"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { partnershipStructures } from "@/lib/content";

/**
 * Plain-English guides to the deal structures Winterbrook offers
 * landowners. Accessible accordion; each step is a titled, single-line
 * point — editorial, never a wall of text.
 */
export default function StructureGuides() {
  const [open, setOpen] = useState<string | null>(partnershipStructures[0].slug);

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {partnershipStructures.map((s, idx) => {
        const isOpen = open === s.slug;
        const panelId = `structure-panel-${s.slug}`;
        const btnId = `structure-btn-${s.slug}`;
        return (
          <div key={s.slug} id={s.slug} className="scroll-mt-28">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : s.slug)}
                className="group flex w-full items-baseline gap-6 py-8 text-left transition-colors duration-300 hover:text-ink-soft"
              >
                <span className="font-body text-xs tracking-[0.2em] text-brass">0{idx + 1}</span>
                <span className="flex-1">
                  <span className="font-display block text-3xl leading-snug sm:text-4xl">{s.name}</span>
                  <span
                    className={`mt-2 block max-w-xl text-sm leading-relaxed text-mist transition-opacity duration-300 sm:text-[15px] ${isOpen ? "opacity-0" : "opacity-100"}`}
                  >
                    {s.tagline}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`relative top-[-2px] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                    isOpen ? "rotate-45 border-ink bg-ink text-paper" : "border-ink/20 text-ink group-hover:border-ink/60"
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-12 pb-14 pl-0 sm:pl-12 lg:grid-cols-[1fr_1.3fr]">
                    <div>
                      <p className="font-display text-xl italic leading-relaxed text-ink/80 sm:text-2xl">
                        {s.tagline}
                      </p>
                      <p className="mt-5 leading-[1.8] text-ink/70">{s.summary}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.3em] text-brass">{s.stepsHeading}</p>
                      <ol className="mt-5 divide-y divide-ink/8">
                        {s.steps.map((step, i) => (
                          <li key={i} className="flex gap-6 py-4">
                            <span className="font-display mt-0.5 text-lg leading-none text-brass">
                              {i + 1}
                            </span>
                            <div>
                              <p className="font-medium text-ink">{step.title}</p>
                              <p className="mt-1 text-sm leading-relaxed text-mist">{step.body}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
