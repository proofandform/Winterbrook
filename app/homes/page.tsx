import type { Metadata } from "next";
import HomesExplorer from "@/components/HomesExplorer";
import Reveal from "@/components/Reveal";
import SplitHeadline from "@/components/SplitHeadline";
import { developments } from "@/lib/content";

export const metadata: Metadata = {
  title: "Current Developments — New Homes in Dublin, Wicklow & Kildare",
  description:
    "Explore Winterbrook's current developments: The Poplars in Shankill, Somerville in Howth, Pinehurst in Enniskerry, Emmet Gardens in Dundrum and Highpoint Park in Leopardstown.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Winterbrook current developments",
  itemListElement: developments.map((d, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Residence",
      name: `${d.name}, ${d.location}`,
      description: d.excerpt,
      url: `https://www.winterbrook.ie/homes/${d.slug}/`,
      geo: { "@type": "GeoCoordinates", latitude: d.lat, longitude: d.lng },
    },
  })),
};

export default function HomesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* typography-led editorial introduction — consistent with Past
          Developments and About; the collection is the visual focus */}
      <section className="bg-paper pb-16 pt-36 md:pt-48">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Reveal>
            <p className="text-[13px] uppercase tracking-[0.42em] text-terracotta sm:text-sm">
              Current Developments
            </p>
          </Reveal>
          <SplitHeadline
            text="Thoughtful by design. Disciplined in delivery."
            as="h1"
            onMount
            delay={150}
            stagger={60}
            className="mt-6 max-w-[22ch] text-4xl leading-[1.1] sm:text-6xl"
          />
          <Reveal delay={400} className="mt-8 max-w-2xl text-lg leading-[1.8] text-ink/70">
            <p>Explore Winterbrook&rsquo;s current and upcoming developments across Ireland.</p>
          </Reveal>
        </div>
      </section>

      {/* the collection */}
      <section id="developments" className="scroll-mt-16 bg-paper">
        <HomesExplorer />
      </section>
    </>
  );
}
