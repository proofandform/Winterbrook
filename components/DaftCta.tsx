import type { Development } from "@/lib/content";

type CtaLocation = "development_card" | "development_detail" | "contact_page";

/**
 * Secondary, restrained CTA to a development's Daft.ie listing.
 *
 * Single source of truth: renders ONLY when `dev.daftUrl` is populated in
 * lib/content.ts — with the field absent (the current state for every
 * development) this component returns null everywhere, reserving no space.
 * Populating one client-supplied URL in the data lights up the card, detail
 * page and contact form simultaneously; no component changes required.
 *
 * Analytics: no analytics library is configured in this project, so the
 * anchor carries semantic data attributes ready for the future event system.
 * Daft clicks represent outbound intent — they must never be wired up as
 * `generate_lead` or treated as confirmed conversions.
 *
 * Wording is approved per surface: cards and detail pages read "View homes
 * on Daft.ie"; the contact form's contextual CTA reads "View available homes
 * on Daft.ie".
 */
export default function DaftCta({
  dev,
  location,
  short = false,
  dark = false,
  className = "",
}: {
  dev: Pick<Development, "slug" | "name" | "daftUrl">;
  location: CtaLocation;
  /** Compact wording for tight contexts; prefer the full wording. */
  short?: boolean;
  /** Tone for navy surfaces. */
  dark?: boolean;
  className?: string;
}) {
  if (!dev.daftUrl) return null;

  return (
    <a
      href={dev.daftUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View available homes for ${dev.name} on Daft.ie (opens in a new tab)`}
      data-analytics-event="cta_click"
      data-cta="daft_listing"
      data-cta-location={location}
      data-destination-class="external_property_listing"
      data-development={dev.slug}
      className={`group/daft inline-flex min-h-11 items-center gap-2 text-[13px] uppercase tracking-[0.18em] underline decoration-1 underline-offset-8 transition-colors duration-300 ${
        dark
          ? "text-stone/80 decoration-stone/40 hover:text-paper hover:decoration-paper"
          : "text-ink/70 decoration-ink/30 hover:text-ink hover:decoration-terracotta"
      } ${className}`}
    >
      {location === "contact_page"
        ? "View available homes on Daft.ie"
        : short
          ? "View on Daft.ie"
          : "View homes on Daft.ie"}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover/daft:-translate-y-0.5 group-hover/daft:translate-x-0.5">
        ↗
      </span>
    </a>
  );
}
