import type { Metadata } from "next";
import { WbImage } from "@/lib/img";
import Reveal from "@/components/Reveal";
import SplitHeadline from "@/components/SplitHeadline";
import ArchiveIndex from "@/components/ArchiveIndex";
import { pastProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Past Developments — 40 Years of Homebuilding",
  description:
    "Four decades of completed Winterbrook developments — from The Lookout in Dalkey and Sika Woods in Enniskerry to Woodstown Village and projects in London and Germany.",
};

export default function PastDevelopmentsPage() {
  const featured = pastProjects.filter((p) => p.featured);
  const archive = pastProjects.filter((p) => !p.featured);

  return (
    <>
      <section className="bg-paper pb-16 pt-36 md:pt-48">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">Past developments</p>
          </Reveal>
          <SplitHeadline
            text="Four decades of delivery, reflected in the homes we’ve created."
            as="h1"
            onMount
            delay={150}
            stagger={45}
            className="mt-6 max-w-[22ch] text-4xl leading-[1.1] sm:text-6xl"
          />
          <Reveal delay={400} className="mt-8 max-w-2xl text-lg leading-[1.8] text-ink/70">
            <p>
              From established neighbourhoods to new communities, our work spans more than four
              decades. A selection of signature schemes comes first, followed by the wider record —
              from Knocklyon in the late 1990s to today, including commercial and international work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* featured archive — signature projects, editorial treatment */}
      <section className="bg-paper pb-24" aria-label="Signature projects">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <ol className="relative">
            {featured.map((project, idx) => {
              const flip = idx % 2 === 1;
              const [lead, ...more] = project.gallery;
              return (
                <li
                  key={project.slug}
                  id={project.slug}
                  className="scroll-mt-28 border-t border-ink/10 py-16 md:py-24"
                >
                  <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
                    <Reveal className={flip ? "md:order-2" : ""}>
                      <div className="img-duotone group relative aspect-[4/3] overflow-hidden bg-stone">
                        <WbImage
                          src={lead.src}
                          alt={lead.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      {more.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-4">
                          {more.slice(0, 3).map((img) => (
                            <div key={img.src} className="img-duotone group relative aspect-[4/3] overflow-hidden bg-stone">
                              <WbImage src={img.src} alt={img.alt} fill sizes="17vw" className="object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </Reveal>
                    <Reveal delay={140} className={`md:sticky md:top-28 ${flip ? "md:order-1" : ""}`}>
                      <p className="font-display text-sm text-terracotta">{project.years}</p>
                      <h2 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{project.name}</h2>
                      <p className="mt-6 max-w-xl text-lg leading-[1.8] text-ink/70">{project.description}</p>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* full archive — concise categorised index */}
      <section className="bg-stone/60 py-24 md:py-28" aria-labelledby="archive-heading">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">The full record</p>
            <h2 id="archive-heading" className="font-display mt-4 text-3xl sm:text-4xl">
              From the archive, 1998–2024
            </h2>
          </Reveal>
          <ArchiveIndex projects={archive} />
        </div>
      </section>
    </>
  );
}
