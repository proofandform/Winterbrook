"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { WbImage } from "@/lib/img";
import type { PastProject, ProjectCategory } from "@/lib/content";

type CategoryFilter = "all" | ProjectCategory;

const categoryFilters: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "international", label: "International" },
];

const categoryLabel: Record<ProjectCategory, string> = {
  residential: "Residential",
  commercial: "Commercial",
  international: "International",
};

/**
 * Concise, categorised index of the non-featured archive. Each entry is a
 * compact card; the fuller description sits in an accessible expandable
 * panel (native details/summary) rather than as a visible wall of text.
 */
export default function ArchiveIndex({ projects }: { projects: PastProject[] }) {
  const [category, setCategory] = useState<CategoryFilter>("all");

  const matches = useMemo(
    () => projects.filter((p) => category === "all" || p.category === category),
    [projects, category]
  );

  return (
    <div>
      <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter archive by category">
        {categoryFilters.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={category === f.value}
            onClick={() => setCategory(f.value)}
            className={`rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.16em] transition-colors duration-300 ${
              category === f.value
                ? "border-ink bg-ink text-paper"
                : "border-ink/20 text-ink/70 hover:border-ink/60 hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <motion.ul layout className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {matches.map((p) => (
              <motion.li
                key={p.slug}
                layout
                id={p.slug}
                className="scroll-mt-28"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="group">
                  <div className="img-duotone relative aspect-[4/3] overflow-hidden bg-stone">
                    <WbImage
                      src={p.gallery[0].src}
                      alt={p.gallery[0].alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl leading-snug sm:text-2xl">{p.name}</h3>
                    <span className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-mist">{p.years}</span>
                  </div>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-brass">
                    {categoryLabel[p.category]}
                  </p>
                  <details className="group/details mt-3">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-mist transition-colors duration-300 hover:text-ink [&::-webkit-details-marker]:hidden">
                      About this project
                      <svg
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform duration-300 group-open/details:rotate-180"
                      >
                        <path d="M1 1.5L5 5.5L9 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.description}</p>
                  </details>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </div>
  );
}
