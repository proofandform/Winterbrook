import type { Metadata } from "next";
import HomeHero from "@/components/HomeHero";
import Reveal from "@/components/Reveal";
import SplitHeadline from "@/components/SplitHeadline";
import Counter from "@/components/Counter";
import Parallax from "@/components/Parallax";
import Magnetic from "@/components/Magnetic";
import DevelopmentCard from "@/components/DevelopmentCard";
import { TransitionLink } from "@/components/PageTransition";
import { WbImage } from "@/lib/img";
import { company, developments, newsArticles, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Winterbrook — Homebuilding for over 40 years",
  description:
    "Family-owned Irish property developer with four decades of experience, delivering considered homes and enduring communities across Dublin, Wicklow and Kildare.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Winterbrook",
  slogan: company.tagline,
  telephone: "+353 1 690 9590",
  email: "info@winterbrook.ie",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ashgrove Works, Kill Avenue",
    addressLocality: "Dun Laoghaire",
    addressRegion: "Co. Dublin",
    postalCode: "A96 V8C2",
    addressCountry: "IE",
  },
  sameAs: [company.instagram],
};

export default function HomePage() {
  const [poplars, somerville, pinehurst, emmet, highpoint] = [
    developments.find((d) => d.slug === "the-poplars-shankill-co-dublin")!,
    developments.find((d) => d.slug === "somerville-howth-d13")!,
    developments.find((d) => d.slug === "pinehurst-enniskerry-co-wicklow")!,
    developments.find((d) => d.slug === "mount-saint-marys-dundrum-d14")!,
    developments.find((d) => d.slug === "highpoint-park-leopardstown-d18")!,
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHero />

      {/* Manifesto */}
      <section className="relative bg-paper py-24 md:py-36" aria-labelledby="overview-heading">
        <div className="mx-auto grid max-w-[1600px] gap-14 px-5 sm:px-8 md:grid-cols-[1fr_1.2fr] md:gap-24">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">Overview</p>
            <SplitHeadline
              as="h2"
              text="We don’t just build homes — we design communities that last."
              stagger={40}
              className="mt-6 text-4xl leading-[1.12] sm:text-5xl"
            />
            <span id="overview-heading" className="sr-only">
              Overview
            </span>
          </Reveal>
          <div className="space-y-6 self-end text-lg leading-relaxed text-ink/75">
            {company.overview.slice(1).map((para, i) => (
              <Reveal key={i} as="p" delay={i * 120}>
                {para}
              </Reveal>
            ))}
            <Reveal delay={360}>
              <TransitionLink
                href="/about"
                className="group mt-2 inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.22em] text-ink"
              >
                About Winterbrook
                <span className="h-px w-10 bg-terracotta transition-all duration-400 group-hover:w-16" aria-hidden="true" />
              </TransitionLink>
            </Reveal>
          </div>
        </div>

      </section>

      {/* Developments showcase — asymmetric editorial grid */}
      <section className="bg-stone/60 py-24 md:py-36" aria-labelledby="find-home-heading">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">For home buyers — Current developments</p>
              <h2 id="find-home-heading" className="font-display mt-4 text-4xl sm:text-6xl">
                Find your new home
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <Magnetic>
                <TransitionLink
                  href="/homes"
                  data-cursor="Explore"
                  className="inline-flex items-center gap-4 rounded-full border border-ink/25 px-7 py-3.5 text-[13px] uppercase tracking-[0.2em] transition-colors duration-400 hover:border-ink hover:bg-ink hover:text-paper"
                >
                  All developments
                </TransitionLink>
              </Magnetic>
            </Reveal>
          </div>

          {/* row 1: The Poplars feature + Somerville */}
          <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-[1.7fr_1fr]">
            <Reveal>
              <DevelopmentCard dev={poplars} feature />
            </Reveal>
            <Reveal delay={140} className="md:self-end">
              <DevelopmentCard dev={somerville} />
            </Reveal>
          </div>
          {/* row 2: three across */}
          <div className="mt-14 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-3">
            <Reveal>
              <DevelopmentCard dev={pinehurst} />
            </Reveal>
            <Reveal delay={120}>
              <DevelopmentCard dev={emmet} />
            </Reveal>
            <Reveal delay={240}>
              <DevelopmentCard dev={highpoint} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Operating scale */}
      <section className="bg-paper py-20 md:py-24" aria-label="Winterbrook in numbers">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <dl className="grid grid-cols-2 gap-y-12 border-y border-ink/10 py-12 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 110} className="px-2 text-center md:px-6">
                <dt className="order-2 mt-3 block text-[12px] uppercase tracking-[0.18em] text-mist">
                  {s.label}
                </dt>
                <dd className="font-display text-5xl text-ink sm:text-6xl lg:text-7xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Land & Partnerships pitch */}
      <section className="bg-ink py-24 text-paper md:py-32" aria-labelledby="land-heading">
        <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.42em] text-brass">For landowners & partners — Land</p>
              <h2 id="land-heading" className="font-display mt-4 max-w-[16ch] text-4xl leading-[1.1] sm:text-5xl">
                Have land in Dublin, Wicklow or Kildare?
              </h2>
            </Reveal>
            <Reveal delay={140} className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-stone/75">
              <p>
                With 239 homes under construction and a secured pipeline of 420 more, Winterbrook is
                actively seeking new sites — with or without planning. Options, joint ventures,
                outright purchase or public partnership: we structure deals around your circumstances,
                and we honour every commitment we make.
              </p>
            </Reveal>
            <Reveal delay={280} className="mt-9">
              <Magnetic>
                <TransitionLink
                  href="/land"
                  data-cursor="Explore"
                  className="inline-flex items-center gap-4 rounded-full border border-paper/40 px-8 py-4 text-[13px] uppercase tracking-[0.2em] transition-colors duration-400 hover:border-terracotta hover:bg-terracotta"
                >
                  How a partnership works
                </TransitionLink>
              </Magnetic>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <ul className="divide-y divide-stone/15 border-y border-stone/15">
              {[
                ["Option Agreement", "We fund planning at our risk — you keep ownership until consent"],
                ["Joint Venture", "Contribute land as equity and share the development profit"],
                ["Outright Purchase", "Clean or staged sales shaped around your timing"],
                ["Public-Sector Partnership", "209 affordable & social homes underway with DLR County Council"],
              ].map(([title, sub]) => (
                <li key={title} className="flex items-baseline justify-between gap-6 py-5">
                  <span className="font-display text-xl sm:text-2xl">{title}</span>
                  <span className="max-w-[26ch] text-right text-sm text-stone/60">{sub}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Full-bleed parallax interlude — Sika Woods photography */}
      <section aria-label="Sika Woods, Enniskerry — completed development" className="relative">
        <Parallax amount={14} className="h-[70vh] md:h-[86vh]">
          <div className="relative h-[130%] w-full -translate-y-[12%]">
            <WbImage
              src="dji_0517.jpg"
              alt="Aerial photograph of Sika Woods, Enniskerry, with the sea beyond"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Parallax>
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-deep/75 via-transparent to-transparent">
          <div className="mx-auto w-full max-w-[1600px] px-5 pb-14 sm:px-8">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.42em] text-stone/80">From the archive</p>
              <p className="font-display mt-3 max-w-2xl text-3xl leading-snug text-paper sm:text-5xl">
                Sika Woods, Enniskerry — 47 homes in the Garden of Ireland
              </p>
              <TransitionLink
                href="/past-developments"
                className="group mt-6 inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.22em] text-paper"
              >
                Past developments
                <span className="h-px w-10 bg-brass transition-all duration-400 group-hover:w-16" aria-hidden="true" />
              </TransitionLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="news-heading">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">Latest news</p>
            <h2 id="news-heading" className="font-display mt-4 text-4xl sm:text-5xl">
              What we’re building next
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {newsArticles.slice(0, 3).map((article, i) => (
              <Reveal key={article.slug} delay={i * 130}>
                <TransitionLink href={`/news/${article.slug}`} data-cursor="Read" className="group block">
                  <div className="img-duotone relative aspect-[3/2] overflow-hidden bg-stone">
                    <WbImage
                      src={article.image.src}
                      alt={article.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-5 text-xs uppercase tracking-[0.25em] text-mist">{article.dateLabel}</p>
                  <h3 className="font-display mt-2 text-2xl leading-snug transition-colors duration-300 group-hover:text-terracotta-deep">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/60">{article.excerpt}</p>
                </TransitionLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink py-24 text-paper md:py-36">
        <div className="mx-auto max-w-[1600px] px-5 text-center sm:px-8">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.42em] text-brass">{company.tagline}</p>
            <SplitHeadline
              as="h2"
              text="A conversation is how every Winterbrook project begins."
              stagger={50}
              className="mx-auto mt-6 max-w-[16ch] text-4xl leading-tight sm:text-6xl"
            />
          </Reveal>
          <Reveal delay={300} className="mt-12">
            <Magnetic>
              <TransitionLink
                href="/contact"
                data-cursor="Enquire"
                className="inline-flex items-center gap-4 rounded-full bg-terracotta px-10 py-5 text-[13px] uppercase tracking-[0.2em] text-paper transition-colors duration-400 hover:bg-terracotta-deep"
              >
                Start a conversation
              </TransitionLink>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
