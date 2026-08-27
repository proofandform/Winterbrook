import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { developments, getDevelopment } from "@/lib/content";
import DevelopmentDetail from "@/components/DevelopmentDetail";

export function generateStaticParams() {
  return developments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const dev = getDevelopment((await params).slug);
  if (!dev) return {};
  return {
    title: `${dev.name}, ${dev.location}`,
    description: dev.excerpt,
    openGraph: { images: [`/images/${dev.hero.src}`] },
  };
}

export default async function DevelopmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
    </>
  );
}
