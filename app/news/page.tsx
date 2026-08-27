import type { Metadata } from "next";
import { WbImage } from "@/lib/img";
import Reveal from "@/components/Reveal";
import SplitHeadline from "@/components/SplitHeadline";
import { TransitionLink } from "@/components/PageTransition";
import { newsArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Launches, Planning & Milestones",
  description:
    "The latest from Winterbrook: 129 social and affordable homes signed at Emmet Gardens, The Poplars launching in Shankill, and planning lodged for Somerville in Howth.",
};

export default function NewsPage() {
  const [featured, ...others] = newsArticles;
  return (
    <>
      <section className="bg-paper pb-16 pt-36 md:pt-48">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">Blog</p>
          </Reveal>
          <SplitHeadline
            text="Launches, planning and milestones."
            as="h1"
            onMount
            delay={150}
            className="mt-5 max-w-[16ch] text-5xl leading-[1.05] sm:text-7xl"
          />
        </div>
      </section>

      <section className="bg-paper pb-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          {/* featured */}
          <Reveal>
            <TransitionLink
              href={`/news/${featured.slug}`}
              data-cursor="Read"
              className="group grid gap-8 border-t border-ink/10 py-12 md:grid-cols-[1.4fr_1fr] md:gap-16"
            >
              <div className="img-duotone relative aspect-[16/9] overflow-hidden bg-stone">
                <WbImage
                  src={featured.image.src}
                  alt={featured.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="self-center">
                <p className="text-xs uppercase tracking-[0.25em] text-mist">{featured.dateLabel}</p>
                <h2 className="font-display mt-4 text-3xl leading-tight transition-colors duration-300 group-hover:text-terracotta-deep sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink/70">{featured.excerpt}</p>
                <span className="group mt-6 inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.22em]">
                  Read more
                  <span className="h-px w-10 bg-terracotta transition-all duration-400 group-hover:w-16" aria-hidden="true" />
                </span>
              </div>
            </TransitionLink>
          </Reveal>

          {/* the rest */}
          <ul className="grid gap-x-10 gap-y-16 border-t border-ink/10 pt-16 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((article, i) => (
              <Reveal as="li" key={article.slug} delay={(i % 3) * 120}>
                <TransitionLink href={`/news/${article.slug}`} data-cursor="Read" className="group block">
                  <div className="img-duotone relative aspect-[3/2] overflow-hidden bg-stone">
                    <WbImage
                      src={article.image.src}
                      alt={article.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-5 text-xs uppercase tracking-[0.25em] text-mist">{article.dateLabel}</p>
                  <h2 className="font-display mt-2 text-2xl leading-snug transition-colors duration-300 group-hover:text-terracotta-deep">
                    {article.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/60">{article.excerpt}</p>
                </TransitionLink>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
