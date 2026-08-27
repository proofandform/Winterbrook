"use client";

import dynamic from "next/dynamic";
import type { Development } from "@/lib/content";
import { WbImage } from "@/lib/img";
import Reveal from "./Reveal";
import SplitHeadline from "./SplitHeadline";
import Parallax from "./Parallax";
import Magnetic from "./Magnetic";
import EnquiryForm from "./EnquiryForm";
import { StatusBadge } from "./DevelopmentCard";
import { TransitionLink } from "./PageTransition";
import DaftCta from "./DaftCta";

// Schemes delivered with Dún Laoghaire–Rathdown County Council; these carry
// a link to the Council's affordable-housing information page.
const AFFORDABLE_SCHEMES = new Set([
  "mount-saint-marys-dundrum-d14",
  "highpoint-park-leopardstown-d18",
]);

const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center bg-stone text-sm uppercase tracking-[0.2em] text-mist">
      Loading map…
    </div>
  ),
});

/**
 * Development detail template: cinematic hero, overview, specification
 * highlights, editorial gallery (CGI-labelled where relevant), location map
 * and a scheme-specific enquiry form.
 */
export default function DevelopmentDetail({ dev }: { dev: Development }) {
  // editorial gallery rhythm: alternate full-bleed moments and detail pairs
  const [first, ...rest] = dev.gallery;

  return (
    <article>
      {/* hero */}
      <header className="relative flex min-h-[86svh] items-end overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0">
          <WbImage
            src={dev.hero.src}
            alt={dev.hero.alt}
            fill
            priority
            sizes="100vw"
            className="kenburns object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-16 pt-44 sm:px-8">
          <Reveal className="mb-5 flex items-center gap-3">
            <StatusBadge status={dev.status} />
            {dev.hero.kind === "cgi" && (
              <span className="rounded-full border border-paper/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-paper/90">
                Imagery: CGI
              </span>
            )}
          </Reveal>
          <SplitHeadline
            text={dev.name}
            as="h1"
            onMount
            delay={200}
            className="text-6xl leading-none sm:text-8xl"
          />
          <Reveal delay={420} className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-stone/90">
            <p className="text-lg">{dev.location}</p>
            <span className="hidden h-px w-10 bg-terracotta sm:block" aria-hidden="true" />
            <p className="text-sm uppercase tracking-[0.2em] text-stone/70">{dev.typeLabel}</p>
          </Reveal>
        </div>
      </header>

      {/* overview + specs */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="overview-h">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">Overview</p>
              <h2 id="overview-h" className="font-display mt-5 max-w-[22ch] text-3xl leading-[1.15] sm:text-4xl">
                {dev.excerpt}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink/75">
              {dev.overview.map((para, i) => (
                <Reveal key={i} as="p" delay={i * 120}>
                  {para}
                </Reveal>
              ))}
            </div>
            {dev.website && (
              <Reveal delay={300} className="mt-8">
                <a
                  href={dev.website}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.22em] text-ink"
                >
                  Visit {dev.website.replace("https://www.", "")}
                  <span className="h-px w-10 bg-terracotta transition-all duration-400 group-hover:w-16" aria-hidden="true" />
                </a>
              </Reveal>
            )}
            {AFFORDABLE_SCHEMES.has(dev.slug) && (
              <Reveal delay={340} className="mt-6">
                <a
                  href="https://www.dlrcoco.ie/housing"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.22em] text-ink"
                >
                  Affordable housing with DLR County Council
                  <span className="h-px w-10 bg-terracotta transition-all duration-400 group-hover:w-16" aria-hidden="true" />
                </a>
              </Reveal>
            )}
          </div>

          <Reveal delay={150} className="lg:pl-8">
            <div className="border border-ink/10 bg-stone/40 p-8 sm:p-10">
              <h3 className="text-[11px] uppercase tracking-[0.42em] text-terracotta">
                Specification highlights
              </h3>
              <dl className="mt-6 divide-y divide-ink/10">
                {dev.specs.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="shrink-0 text-xs uppercase tracking-[0.2em] text-mist">{spec.label}</dt>
                    <dd className="text-right font-medium leading-snug">{spec.value}</dd>
                  </div>
                ))}
              </dl>
              {dev.agent && (
                <p className="mt-6 text-sm text-mist">
                  Selling agent: <span className="text-ink">{dev.agent}</span>
                </p>
              )}
              <Magnetic className="mt-8">
                <a
                  href="#enquire"
                  data-cursor="Enquire"
                  className="inline-flex items-center gap-4 rounded-full bg-ink px-8 py-4 text-[13px] uppercase tracking-[0.2em] text-paper transition-colors duration-400 hover:bg-terracotta"
                >
                  Enquire about {dev.name}
                </a>
              </Magnetic>
              {dev.daftUrl && (
                <div className="mt-5">
                  <DaftCta dev={dev} location="development_detail" />
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* gallery */}
      <section className="bg-stone/60 py-24 md:py-32" aria-label={`${dev.name} gallery`}>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">Gallery</p>
            <h2 className="font-display mt-4 text-3xl sm:text-5xl">
              A closer look{dev.hero.kind === "cgi" ? " — CGI impressions" : ""}
            </h2>
          </Reveal>
        </div>

        {/* full-bleed parallax moment */}
        <Reveal className="mt-14">
          <figure>
            <Parallax amount={12} className="h-[60vh] md:h-[80vh]">
              <div className="relative h-[126%] w-full -translate-y-[10%]">
                <WbImage src={first.src} alt={first.alt} fill sizes="100vw" className="object-cover" />
              </div>
            </Parallax>
            <figcaption className="mx-auto max-w-[1600px] px-5 pt-3 text-xs uppercase tracking-[0.2em] text-mist sm:px-8">
              {first.alt} {first.kind === "cgi" && "· CGI"}
            </figcaption>
          </figure>
        </Reveal>

        {/* asymmetric detail grid */}
        <div className="mx-auto mt-8 grid max-w-[1600px] gap-8 px-5 sm:px-8 md:grid-cols-12">
          {rest.map((img, i) => {
            const spans = ["md:col-span-7", "md:col-span-5 md:mt-24", "md:col-span-5", "md:col-span-7 md:-mt-16", "md:col-span-6", "md:col-span-6 md:mt-20", "md:col-span-8", "md:col-span-4 md:mt-12"];
            return (
              <Reveal key={img.src} delay={(i % 2) * 140} className={spans[i % spans.length]}>
                <figure>
                  <div className="img-duotone group relative aspect-[4/3] overflow-hidden bg-stone">
                    <WbImage
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="pt-3 text-xs uppercase tracking-[0.2em] text-mist">
                    {img.alt} {img.kind === "cgi" && "· CGI"}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* location */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="location-h">
        <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">Location</p>
            <h2 id="location-h" className="font-display mt-4 text-3xl sm:text-5xl">
              {dev.location}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">{dev.excerpt}</p>
          </Reveal>
          <Reveal delay={150}>
            <LocationMap
              lat={dev.lat}
              lng={dev.lng}
              label={`${dev.name}, ${dev.location}`}
              className="h-[420px] w-full overflow-hidden border border-ink/10 md:h-[520px]"
            />
          </Reveal>
        </div>
      </section>

      {/* enquiry */}
      <section id="enquire" className="bg-ink py-24 text-paper md:py-32" aria-labelledby="enquire-h">
        <div className="mx-auto grid max-w-[1600px] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.42em] text-brass">Enquire</p>
            <h2 id="enquire-h" className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
              Interested in {dev.name}?
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-stone/70">
              Register your interest and the team will be in touch with availability, pricing and
              viewing arrangements{dev.agent ? ` via ${dev.agent}` : ""}.
            </p>
            <address className="mt-8 space-y-2 text-sm not-italic text-stone/70">
              <p>
                <a href="tel:+35316909590" className="hover:text-terracotta">
                  T +353 (0)1 690 9590
                </a>
              </p>
              <p>
                <a href="mailto:info@winterbrook.ie" className="hover:text-terracotta">
                  E info@winterbrook.ie
                </a>
              </p>
            </address>
          </Reveal>
          <Reveal delay={150}>
            <EnquiryForm development={dev.slug} dark showDaftCta={false} />
          </Reveal>
        </div>
      </section>

      {/* next development */}
      <NextDevelopment currentSlug={dev.slug} />
    </article>
  );
}

import { developments } from "@/lib/content";

function NextDevelopment({ currentSlug }: { currentSlug: string }) {
  const idx = developments.findIndex((d) => d.slug === currentSlug);
  const next = developments[(idx + 1) % developments.length];
  return (
    <TransitionLink
      href={`/homes/${next.slug}`}
      data-cursor="Next"
      className="group relative block overflow-hidden bg-ink"
      aria-label={`Next development: ${next.name}, ${next.location}`}
    >
      <div className="img-duotone relative h-[46vh]">
        <WbImage
          src={next.hero.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-80"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-paper">
        <p className="text-[11px] uppercase tracking-[0.42em] text-stone/70">Next development</p>
        <p className="font-display mt-3 text-4xl sm:text-6xl">{next.name}</p>
        <p className="mt-2 text-stone/80">{next.location}</p>
      </div>
    </TransitionLink>
  );
}
