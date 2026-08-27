import type { Metadata } from "next";
import { WbImage } from "@/lib/img";
import Reveal from "@/components/Reveal";
import SplitHeadline from "@/components/SplitHeadline";
import Counter from "@/components/Counter";
import Magnetic from "@/components/Magnetic";
import StructureGuides from "@/components/StructureGuides";
import ValueChainTimeline from "@/components/ValueChainTimeline";
import LandEnquiryForm from "@/components/LandEnquiryForm";
import { TransitionLink } from "@/components/PageTransition";
import { landCriteria, landCaseStudies, positioning } from "@/lib/content";

export const metadata: Metadata = {
  title: "Land & Partnerships — Sell, Option or JV Your Land",
  description:
    "Winterbrook is actively seeking land across Dublin, Wicklow and Kildare. Option agreements, joint ventures, outright purchase and public partnerships — clear guides and a confidential conversation for landowners.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Land & Partnerships — Winterbrook",
  description:
    "Winterbrook is actively seeking land opportunities across Dublin, Wicklow and Kildare through option agreements, joint ventures, outright purchase and public partnerships.",
  mainEntity: {
    "@type": "HomeAndConstructionBusiness",
    name: "Winterbrook",
    areaServed: ["Dublin", "Wicklow", "Kildare"],
    telephone: "+353 1 690 9590",
    email: "info@winterbrook.ie",
  },
};

const heroStats = [
  { value: 40, suffix: "+", label: "Years of homebuilding" },
  { value: 239, suffix: "", label: "Homes under construction" },
  { value: 420, suffix: "+", label: "Homes in secured pipeline" },
];

export default function LandPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* hero with integrated scale strip */}
      <header className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0">
          <WbImage
            src="dji_0517.jpg"
            alt="Aerial photograph of a completed Winterbrook development in the Wicklow landscape, with the sea beyond"
            fill
            priority
            sizes="100vw"
            className="kenburns object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pt-44 sm:px-8">
          <Reveal>
            <p className="text-[13px] uppercase tracking-[0.42em] text-terracotta sm:text-sm">Land & Partnerships</p>
          </Reveal>
          <SplitHeadline
            text="Your land deserves a partner who honours their commitment."
            as="h1"
            onMount
            delay={200}
            stagger={60}
            className="mt-5 max-w-[20ch] text-4xl leading-[1.08] sm:text-6xl lg:text-7xl"
          />
          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6">
            <Reveal delay={450} className="max-w-xl text-lg leading-relaxed text-stone/85">
              <p>
                We are actively seeking sites across Dublin, Wicklow and Kildare — with or without
                planning. Options, joint ventures, sale or public partnership: structured around you.
              </p>
            </Reveal>
            <Reveal delay={600}>
              <Magnetic>
                <a
                  href="#land-enquiry"
                  data-cursor="Talk"
                  className="inline-flex items-center gap-4 rounded-full bg-terracotta px-9 py-4 text-[13px] uppercase tracking-[0.2em] text-paper transition-colors duration-400 hover:bg-terracotta-deep"
                >
                  Discuss your land in confidence
                </a>
              </Magnetic>
            </Reveal>
          </div>
        </div>
        {/* scale strip: verified figures, with the 2030 ambition set apart */}
        <div className="relative z-10 mt-14 border-t border-paper/15 bg-ink/40 backdrop-blur-sm">
          <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-y-6 px-5 py-7 sm:px-8 md:grid-cols-4">
            <dl className="contents">
              {heroStats.map((s, i) => (
                <Reveal key={s.label} delay={700 + i * 90} variant="none">
                  <dd className="font-display text-4xl sm:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-1 text-[11px] uppercase tracking-[0.16em] text-stone/70">{s.label}</dt>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={970} variant="none" className="md:border-l md:border-paper/15 md:pl-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-brass">Our 2030 ambition</p>
              <p className="font-display mt-1.5 text-xl italic leading-snug text-stone/90 sm:text-2xl">
                1,500 homes under construction
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      {/* value-chain timeline — the journey a site takes with us */}
      <ValueChainTimeline />

      {/* criteria + guides */}
      <section className="bg-paper py-24 md:py-28" aria-labelledby="structures-heading">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">Active requirements</p>
                <h2 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
                  We are actively seeking
                </h2>
              </Reveal>
              <ul className="mt-8 space-y-4">
                {landCriteria.map((c, i) => (
                  <Reveal as="li" key={c} delay={i * 70} className="flex items-start gap-3.5">
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta" aria-hidden="true">
                      <svg width="10" height="8" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5.5L4.5 9L11 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="leading-relaxed text-ink/80">{c}</span>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={200} className="mt-8 border-l-2 border-terracotta pl-5 text-sm leading-relaxed text-mist">
                <p>
                  Landowner, agent or local authority — every introduction is confidential, without
                  obligation, and handled by decision-makers from the first conversation.
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">How a deal can work</p>
                <h2 id="structures-heading" className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
                  Four ways to unlock the value in your land
                </h2>
              </Reveal>
              <Reveal delay={120} className="mt-8">
                <StructureGuides />
              </Reveal>
            </div>
          </div>

        </div>
      </section>

      {/* case studies */}
      <section className="bg-stone/60 py-24 md:py-28" aria-labelledby="cases-heading">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">In practice</p>
              <h2 id="cases-heading" className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
                Partnership, proven
              </h2>
            </div>
            <p className="max-w-xs text-sm text-mist">{positioning}</p>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {landCaseStudies.map((cs, i) => (
              <Reveal key={cs.title} delay={i * 130}>
                <TransitionLink href={cs.href} data-cursor="View" className="group block">
                  <div className="img-duotone relative aspect-[4/3] overflow-hidden bg-stone">
                    <WbImage
                      src={cs.image.src}
                      alt={cs.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-ink/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-stone backdrop-blur-sm">
                      {cs.structure}
                    </span>
                    {cs.image.kind === "cgi" && (
                      <span className="absolute right-5 top-5 rounded-full border border-paper/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-paper/90 backdrop-blur-sm">
                        CGI
                      </span>
                    )}
                  </div>
                  <h3 className="font-display mt-5 text-2xl leading-snug transition-colors duration-300 group-hover:text-terracotta-deep">
                    {cs.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{cs.body}</p>
                </TransitionLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* enquiry */}
      <section id="land-enquiry" className="bg-ink py-24 text-paper md:py-28" aria-labelledby="land-enquiry-h">
        <div className="mx-auto grid max-w-[1600px] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.42em] text-brass">Start a conversation</p>
            <h2 id="land-enquiry-h" className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
              Tell us about your land
            </h2>
            <div className="mt-10 border-l-2 border-terracotta pl-6">
              <p className="font-display text-xl">Conor Rhatigan</p>
              <p className="mt-1 text-sm uppercase tracking-[0.2em] text-stone/60">Managing Director</p>
              <address className="mt-4 space-y-1.5 text-sm not-italic text-stone/70">
                <p>
                  <a href="mailto:info@winterbrook.ie?subject=Land%20opportunity" className="hover:text-terracotta">
                    info@winterbrook.ie
                  </a>
                </p>
                <p>
                  <a href="tel:+35316909590" className="hover:text-terracotta">
                    +353 (0)1 690 9590
                  </a>
                </p>
              </address>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <LandEnquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
