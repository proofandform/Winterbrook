"use client";

import { WbImage } from "@/lib/img";
import type { Development } from "@/lib/content";
import { TransitionLink } from "./PageTransition";
import DaftCta from "./DaftCta";

export function StatusBadge({ status }: { status: Development["status"] | "past" }) {
  const label =
    status === "available" ? "Available" : status === "coming-soon" ? "Coming Soon" : "Completed";
  const dot =
    status === "available" ? "bg-terracotta" : status === "coming-soon" ? "bg-brass" : "bg-mist";
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em]">
      <span className={`h-[7px] w-[7px] rounded-full ${dot}`} aria-hidden="true" />
      {label}
    </span>
  );
}

/**
 * Editorial development card: full-colour imagery with a slow, quiet zoom;
 * the scheme name set in the display serif below the frame rather than
 * overlaid — gallery, not portal. `feature` renders the large variant.
 *
 * The card itself is Winterbrook's internal journey (development detail
 * page). When a development carries a client-supplied `daftUrl`, a separate
 * restrained secondary action renders beneath the card — a sibling of the
 * card link, never wrapping it, so internal navigation is preserved and the
 * markup stays valid (no nested anchors).
 */
export default function DevelopmentCard({
  dev,
  feature = false,
  onHover,
  active = false,
}: {
  dev: Development;
  feature?: boolean;
  onHover?: (slug: string | null) => void;
  active?: boolean;
}) {
  return (
    <div
      onMouseEnter={() => onHover?.(dev.slug)}
      onMouseLeave={() => onHover?.(null)}
    >
      <TransitionLink
        href={`/homes/${dev.slug}`}
        data-cursor="View"
        className="group relative block outline-offset-4"
        onNavigate={() => onHover?.(null)}
      >
        <div
          className={`img-duotone relative overflow-hidden bg-stone ${
            feature ? "aspect-[16/10]" : "aspect-[4/3]"
          } ${active ? "ring-1 ring-ink ring-offset-4 ring-offset-paper" : ""}`}
        >
          <WbImage
            src={dev.hero.src}
            alt={dev.hero.alt}
            fill
            sizes={feature ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover"
          />
          {dev.hero.kind === "cgi" && (
            <span className="absolute right-4 top-4 rounded-full bg-navy-deep/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-paper/85 backdrop-blur-sm">
              CGI
            </span>
          )}
        </div>

        <div className="pt-5 sm:pt-6">
          <div className="flex items-baseline justify-between gap-6">
            <StatusBadge status={dev.status} />
            <span className="text-[11px] uppercase tracking-[0.18em] text-mist max-sm:hidden">
              {dev.typeLabel}
            </span>
          </div>
          <h3
            className={`font-display mt-2.5 leading-[1.1] text-ink ${
              feature ? "text-3xl sm:text-5xl" : "text-2xl sm:text-[1.75rem]"
            }`}
          >
            {dev.name}
            <span className="font-display text-mist"> — {dev.location}</span>
          </h3>
          <span
            aria-hidden="true"
            className="mt-4 block h-px w-10 bg-ink/25 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full group-hover:bg-ink/60"
          />
        </div>
      </TransitionLink>

      {/* Secondary external action — renders only with a client-supplied URL */}
      {dev.daftUrl && (
        <div className="mt-3">
          <DaftCta dev={dev} location="development_card" />
        </div>
      )}
    </div>
  );
}
