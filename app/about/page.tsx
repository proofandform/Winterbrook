import type { Metadata } from "next";
import { WbImage } from "@/lib/img";
import Reveal from "@/components/Reveal";
import SplitHeadline from "@/components/SplitHeadline";
import Counter from "@/components/Counter";
import Parallax from "@/components/Parallax";
import Magnetic from "@/components/Magnetic";
import { TransitionLink } from "@/components/PageTransition";
import { company, governance, stats, team } from "@/lib/content";
import { TransitionLink as GovLink } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "About Winterbrook — Family-Owned Irish Homebuilders",
  description:
    "Winterbrook is a family owned and operated property development company with over four decades of experience building well-designed homes of exceptional quality.",
};

export default function AboutPage() {
  return (
    <>
      {/* intro */}
      <section className="bg-paper pb-24 pt-36 md:pt-48">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">About Winterbrook</p>
          </Reveal>
          <SplitHeadline
            text="A family business, building for the long term."
            as="h1"
            onMount
            delay={150}
            stagger={40}
            className="mt-6 max-w-[26ch] text-4xl leading-[1.12] sm:text-6xl"
          />
          <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-20">
            {company.about.map((para, i) => (
              <Reveal key={i} as="p" delay={i * 140} className="text-lg leading-relaxed text-ink/75">
                {para}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* parallax interlude — The Lookout, Harbour Road, Dalkey */}
      <section aria-label="The Lookout, Harbour Road, Dalkey" className="relative">
        <Parallax amount={14} className="h-[60vh] md:h-[75vh]">
          <div className="relative h-[130%] w-full -translate-y-[12%]">
            <WbImage
              src="the-lookout-high-res-2.jpg"
              alt="The Lookout, Harbour Road, Dalkey — the completed apartment building above the harbour, with landscaped grounds and the sea beyond"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Parallax>
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent">
          <p className="mx-auto w-full max-w-[1600px] px-5 pb-10 text-xs uppercase tracking-[0.25em] text-stone/80 sm:px-8">
            The Lookout, Harbour Road, Dalkey — completed 2024, sold to Irish Life
          </p>
        </div>
      </section>

      {/* stats */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <dl className="grid grid-cols-2 gap-y-12 border-y border-ink/10 py-12 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 110} className="px-2 text-center md:px-6">
                <dt className="order-2 mt-3 block text-[12px] uppercase tracking-[0.18em] text-mist">{s.label}</dt>
                <dd className="font-display text-5xl sm:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* governance & structure */}
      <section className="bg-ink py-24 text-paper md:py-32" aria-labelledby="governance-heading">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.42em] text-brass">Governance & structure</p>
              <h2 id="governance-heading" className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
                {governance.headline}
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-stone/70">{governance.intro}</p>
              <GovLink
                href="/land"
                className="group mt-8 inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.22em] text-paper"
              >
                Partner with us
                <span className="h-px w-10 bg-brass transition-all duration-400 group-hover:w-16" aria-hidden="true" />
              </GovLink>
            </Reveal>
            <div className="grid content-start gap-6 sm:grid-cols-2">
              {governance.points.map((point, i) => (
                <Reveal key={point.title} delay={i * 110} className="border border-stone/15 p-7">
                  <h3 className="font-display text-xl">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone/65">{point.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* team */}
      <section className="bg-stone/60 py-24 md:py-32" aria-labelledby="team-heading">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">Our team</p>
            <h2 id="team-heading" className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
              The people behind the homes
            </h2>
          </Reveal>
          <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
            {team.map((member, i) => (
              <Reveal as="li" key={member.name} delay={(i % 4) * 110} className="group">
                <div className="relative aspect-square overflow-hidden bg-stone">
                  <WbImage
                    src={member.portrait}
                    alt={`Portrait of ${member.name}, ${member.role} at Winterbrook`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 motion-reduce:transform-none"
                  />
                </div>
                <h3 className="font-display mt-5 text-xl sm:text-2xl">{member.name}</h3>
                <p className="mt-1 text-[12px] uppercase tracking-[0.2em] text-mist">{member.role}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-24 text-paper md:py-32">
        <div className="mx-auto max-w-[1600px] px-5 text-center sm:px-8">
          <Reveal>
            <SplitHeadline
              as="h2"
              text="Passionate about placemaking and communities built to last."
              stagger={45}
              className="mx-auto max-w-[24ch] text-3xl leading-tight sm:text-5xl"
            />
          </Reveal>
          <Reveal delay={250} className="mt-10">
            <Magnetic>
              <TransitionLink
                href="/homes"
                data-cursor="Explore"
                className="inline-flex items-center gap-4 rounded-full bg-terracotta px-10 py-5 text-[13px] uppercase tracking-[0.2em] text-paper transition-colors duration-400 hover:bg-terracotta-deep"
              >
                See our current developments
              </TransitionLink>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
