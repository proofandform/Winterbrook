import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { developments, getDevelopment } from "@/lib/content";
import DevelopmentDetail from "@/components/DevelopmentDetail";
import { TransitionLink } from "@/components/PageTransition";

export function generateStaticParams() {
  return developments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const dev = getDevelopment((await params).slug);
  if (!dev) return {};
  return {
    title: `${dev.name}, ${dev.location}`,
    description: dev.excerpt,
    openGraph: { images: [`/images/${dev.hero.src}`] },
  };
}

export default async function DevelopmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const dev = getDevelopment((await params).slug);
  if (!dev) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: `${dev.name}, ${dev.location}`,
    description: dev.excerpt,
    url: `https://www.winterbrook.ie/homes/${dev.slug}/`,
    geo: { "@type": "GeoCoordinates", latitude: dev.lat, longitude: dev.lng },
    address: { "@type": "PostalAddress", addressLocality: dev.location, addressCountry: "IE" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DevelopmentDetail dev={dev} />
      {dev.slug === "mount-saint-marys-dundrum-d14" && (
        <section className="border-t border-ink/10 bg-paper px-5 py-14 sm:px-8" aria-label="Emmet Gardens project news">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs uppercase tracking-[0.25em] text-terracotta-deep">Project news</p>
            <h2 className="font-display mt-4 text-3xl sm:text-4xl">
              <TransitionLink href="/news/construction-begins-emmet-gardens-129-homes" className="underline decoration-terracotta/60 underline-offset-4 hover:text-terracotta-deep">
                Breaking ground on 129 new homes at Emmet Gardens
              </TransitionLink>
            </h2>
          </div>
        </section>
      )}
    </>
  );
}
