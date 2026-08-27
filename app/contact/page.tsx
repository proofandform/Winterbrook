import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SplitHeadline from "@/components/SplitHeadline";
import EnquiryForm from "@/components/EnquiryForm";
import OfficeMap from "@/components/OfficeMap";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — Enquiries & Viewings",
  description:
    "Contact Winterbrook: Ashgrove Works, Kill Avenue, Dun Laoghaire, Co. Dublin. Call +353 (0)1 690 9590 or email info@winterbrook.ie.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "HomeAndConstructionBusiness",
    name: "Winterbrook",
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
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-paper pb-24 pt-36 md:pt-48">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">Contact</p>
          </Reveal>
          <SplitHeadline
            text="We’d love to hear from you"
            as="h1"
            onMount
            delay={150}
            className="mt-5 max-w-[14ch] text-5xl leading-[1.05] sm:text-7xl"
          />

          <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_1.5fr]">
            <Reveal delay={200}>
              <h2 className="text-[11px] uppercase tracking-[0.42em] text-mist">Visit or call</h2>
              <address className="mt-6 space-y-6 not-italic">
                <p className="font-display text-2xl leading-snug">
                  {company.address.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <p>
                  <a
                    href={company.phoneHref}
                    className="text-lg underline decoration-terracotta decoration-1 underline-offset-8 transition-colors hover:text-terracotta-deep"
                  >
                    {company.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-lg underline decoration-terracotta decoration-1 underline-offset-8 transition-colors hover:text-terracotta-deep"
                  >
                    {company.email}
                  </a>
                </p>
              </address>
              <div className="mt-10 flex gap-6 text-sm uppercase tracking-[0.2em]">
                <a href={company.instagram} target="_blank" rel="noreferrer" className="text-mist transition-colors hover:text-terracotta">
                  Instagram
                </a>
              </div>
              <div className="mt-10">
                <OfficeMap />
              </div>
              <p className="mt-10 max-w-sm text-sm leading-relaxed text-mist">
                Receive the latest news, events and property updates — follow{" "}
                <a href={company.instagram} target="_blank" rel="noreferrer" className="text-ink underline decoration-terracotta underline-offset-4">
                  {company.instagramHandle}
                </a>{" "}
                on Instagram.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <h2 className="mb-8 text-[11px] uppercase tracking-[0.42em] text-mist">Send an enquiry</h2>
              <EnquiryForm />
              <p className="mt-10 border-l-2 border-terracotta bg-stone/40 py-4 pl-6 pr-4 text-sm leading-relaxed text-ink/70">
                Landowner, agent or potential partner? We have a dedicated route for land and
                partnership conversations —{" "}
                <a href="/land" className="font-medium text-ink underline decoration-terracotta underline-offset-4">
                  visit Land &amp; Partnerships
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
