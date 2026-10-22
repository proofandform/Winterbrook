import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WbImage } from "@/lib/img";
import Reveal from "@/components/Reveal";
import SplitHeadline from "@/components/SplitHeadline";
import { TransitionLink } from "@/components/PageTransition";
import { newsArticles, type ArticleInline, type ArticleBlock } from "@/lib/content";

const SITE = "https://www.winterbrook.ie";

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return {};
  const url = `${SITE}/news/${article.slug}`;
  const description = article.metaDescription ?? article.excerpt;
  const socialDescription = article.socialDescription ?? description;
  const images = [{ url: `${SITE}/images/${article.image.src}`, alt: article.image.alt }];
  return {
    title: article.seoTitle ? { absolute: article.seoTitle } : article.title,
    description,
    authors: [{ name: article.author ?? "Winterbrook", url: `${SITE}/about` }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "Winterbrook",
      locale: "en_IE",
      title: article.title,
      description: socialDescription,
      url,
      publishedTime: article.date,
      images,
    },
    twitter: { card: "summary_large_image", title: article.title, description: socialDescription, images },
  };
}

function Inline({ content }: { content: ArticleInline[] }) {
  return <>{content.map((part, index) => part.href ? (
    <TransitionLink key={index} href={part.href} className="underline decoration-terracotta/70 underline-offset-4 transition-colors hover:text-terracotta-deep">
      {part.text}
    </TransitionLink>
  ) : <span key={index}>{part.text}</span>)}</>;
}

function EditorialBlock({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p><Inline content={block.content} /></p>;
    case "heading":
      return <h2 className="font-display !mt-14 text-3xl leading-tight text-ink sm:text-4xl">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="space-y-5 border-l-2 border-terracotta pl-5 text-ink sm:pl-7">
          {block.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </blockquote>
      );
    case "image":
      return (
        <figure className="!my-10">
          <div className="relative aspect-[3/2] overflow-hidden bg-stone">
            <WbImage src={block.image.src} alt={block.image.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>
          <figcaption className="mt-3 text-sm leading-relaxed text-ink/65">{block.caption}</figcaption>
        </figure>
      );
    case "cta":
      return (
        <section className="!mt-12 border-t border-ink/15 bg-stone/40 px-6 py-8 sm:px-8" aria-label={block.title}>
          <h2 className="font-display text-3xl text-ink">{block.title}</h2>
          <p className="mt-4"><Inline content={block.content} /></p>
        </section>
      );
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) notFound();
  const url = `${SITE}/news/${article.slug}`;
  const articleImages = [article.image, ...(article.blocks?.flatMap((block) => block.type === "image" ? [block.image] : []) ?? article.gallery ?? [])];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": article.blocks ? "Article" : "NewsArticle",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.metaDescription ?? article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "en-IE",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: articleImages.map((image) => `${SITE}/images/${image.src}`),
    author: { "@type": "Organization", name: article.author ?? "Winterbrook", url: `${SITE}/about` },
    publisher: { "@type": "Organization", name: "Winterbrook", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/images/logo.svg` } },
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/news` },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };
  const more = newsArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <article data-article-slug={article.slug}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbs]).replace(/</g, "\\u003c") }} />
      <header className="bg-paper pb-12 pt-36 md:pt-48">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          {article.category && <p className="mb-5 text-xs uppercase tracking-[0.25em] text-terracotta-deep">Winterbrook news / {article.category}</p>}
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-mist">
              {article.author && <>{article.author} <span aria-hidden="true">/</span> </>}
              Posted <time dateTime={article.date}>{article.dateLabel}</time>
            </p>
          </Reveal>
          <SplitHeadline text={article.title} as="h1" onMount delay={120} stagger={40} className="mt-5 text-3xl leading-[1.12] sm:text-5xl" />
          {article.standfirst && <p className="mt-7 text-lg leading-relaxed text-ink/85 sm:text-xl" data-article-standfirst><Inline content={article.standfirst} /></p>}
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <figure>
            <div className={`relative overflow-hidden bg-stone ${article.blocks ? "aspect-[3/2]" : "aspect-[16/9]"}`}>
              <WbImage src={article.image.src} alt={article.image.alt} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
            </div>
            {article.heroCaption ? (
              <figcaption className="pt-3 text-sm leading-relaxed text-ink/65">{article.heroCaption}</figcaption>
            ) : article.image.kind === "cgi" && (
              <figcaption className="pt-3 text-xs uppercase tracking-[0.2em] text-mist">Imagery: CGI / architectural visualisation</figcaption>
            )}
          </figure>
        </Reveal>
      </div>
      <div className="mx-auto max-w-3xl space-y-7 px-5 pb-4 pt-12 text-lg leading-[1.8] text-ink/80 sm:px-8" data-article-body>
        {article.blocks ? article.blocks.map((block, index) => <EditorialBlock key={index} block={block} />) : article.body.map((paragraph, index) => (
          <Reveal as="p" key={index} delay={index * 60}>{paragraph}</Reveal>
        ))}
      </div>

      {article.gallery && article.gallery.length > 0 && (
        <section className="mx-auto max-w-5xl px-5 pt-10 sm:px-8" aria-label="Photographs">
          <div className="grid gap-8 sm:grid-cols-2">
            {article.gallery.map((image, index) => (
              <Reveal as="figure" key={image.src} delay={index * 120} className={article.gallery!.length % 2 !== 0 && index === 0 ? "sm:col-span-2" : ""}>
                <div className="relative aspect-[3/2] overflow-hidden bg-stone">
                  <WbImage src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, 512px" className="object-cover" />
                </div>
                <figcaption className="pt-3 text-xs leading-relaxed text-mist">{image.alt}</figcaption>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-3xl px-5 pb-16 pt-12 sm:px-8">
        <Reveal>
          <TransitionLink href="/news" className="group inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.22em] text-ink">
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
                    <WbImage src={a.image.src} alt={a.image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.25em] text-mist">{a.dateLabel}</p>
                  <h3 className="font-display mt-2 text-xl leading-snug transition-colors duration-300 group-hover:text-terracotta-deep">{a.title}</h3>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </article>
  );
}
