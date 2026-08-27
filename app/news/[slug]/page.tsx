import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WbImage } from "@/lib/img";
import Reveal from "@/components/Reveal";
import SplitHeadline from "@/components/SplitHeadline";
import { TransitionLink } from "@/components/PageTransition";
import { newsArticles } from "@/lib/content";

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { images: [`/images/${article.image.src}`] },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    datePublished: article.date,
    image: [`https://www.winterbrook.ie/images/${article.image.src}`],
    publisher: { "@type": "Organization", name: "Winterbrook" },
  };

  const more = newsArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="bg-paper pb-12 pt-36 md:pt-48">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-mist">Posted {article.dateLabel}</p>
          </Reveal>
          <SplitHeadline
            text={article.title}
            as="h1"
            onMount
            delay={120}
            stagger={40}
            className="mt-5 text-3xl leading-[1.12] sm:text-5xl"
          />
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <figure>
            <div className="relative aspect-[16/9] overflow-hidden bg-stone">
              <WbImage
                src={article.image.src}
                alt={article.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
            {article.image.kind === "cgi" && (
              <figcaption className="pt-3 text-xs uppercase tracking-[0.2em] text-mist">
                Imagery: CGI / architectural visualisation
              </figcaption>
            )}
          </figure>
        </Reveal>
      </div>
      <div className="mx-auto max-w-3xl space-y-7 px-5 pb-4 pt-16 text-lg leading-[1.8] text-ink/80 sm:px-8">
        {article.body.map((para, i) => (
          <Reveal as="p" key={i} delay={i * 60}>
            {para}
          </Reveal>
        ))}
      </div>

      {/* editorial photo set — restrained two-up, captions from alt text */}
      {article.gallery && article.gallery.length > 0 && (
        <section className="mx-auto max-w-5xl px-5 pt-10 sm:px-8" aria-label="Photographs">
          <div className="grid gap-8 sm:grid-cols-2">
            {article.gallery.map((img, i) => (
              <Reveal as="figure" key={img.src} delay={i * 120} className={article.gallery!.length % 2 !== 0 && i === 0 ? "sm:col-span-2" : ""}>
                <div className="relative aspect-[3/2] overflow-hidden bg-stone">
                  <WbImage
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 512px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="pt-3 text-xs leading-relaxed text-mist">{img.alt}</figcaption>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-3xl px-5 pb-16 pt-12 sm:px-8">
        <Reveal>
          <TransitionLink
            href="/news"
            className="group inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.22em] text-ink"
          >
            <span className="h-px w-10 bg-terracotta transition-all duration-400 group-hover:w-16" aria-hidden="true" />
            All posts
          </TransitionLink>
        </Reveal>
      </div>

      <aside className="border-t border-ink/10 bg-stone/50 py-20" aria-label="More news">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <h2 className="font-display text-3xl">More from Winterbrook</h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-3">
            {more.map((a) => (
              <li key={a.slug}>
                <TransitionLink href={`/news/${a.slug}`} data-cursor="Read" className="group block">
                  <div className="img-duotone relative aspect-[3/2] overflow-hidden bg-stone">
                    <WbImage src={a.image.src} alt={a.image.alt} fill sizes="33vw" className="object-cover" />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.25em] text-mist">{a.dateLabel}</p>
                  <h3 className="font-display mt-2 text-xl leading-snug transition-colors duration-300 group-hover:text-terracotta-deep">
                    {a.title}
                  </h3>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </article>
  );
}
