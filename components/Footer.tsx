import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/content";

const cols = [
  { href: "/homes", label: "Current Developments" },
  { href: "/past-developments", label: "Past Developments" },
  { href: "/land", label: "Land & Partnerships" },
  { href: "/about", label: "About" },
  { href: "/news", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-navy-deep text-stone">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 pb-20 pt-20 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:pb-24 md:pt-28">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/logo.svg" alt="" width={34} height={39} className="h-10 w-auto" />
            <Image src="/images/logotext.svg" alt="Winterbrook" width={143} height={16} className="h-4 w-auto" />
          </div>
          <p className="font-display mt-9 max-w-sm text-3xl leading-[1.25] text-paper">
            {company.motto}
          </p>
          <p className="mt-5 text-[12px] uppercase tracking-[0.25em] text-stone/45">
            {company.tagline}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs uppercase tracking-[0.25em] text-stone/50">Explore</h2>
          <ul className="mt-5 space-y-3">
            {cols.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-stone/90 transition-colors hover:text-terracotta">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs uppercase tracking-[0.25em] text-stone/50">Get in touch</h2>
          <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-stone/90">
            <p>
              {company.address.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p>
              <a href={company.phoneHref} className="transition-colors hover:text-terracotta">
                T {company.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="transition-colors hover:text-terracotta">
                E {company.email}
              </a>
            </p>
          </address>
          <div className="mt-6 flex gap-5">
            <a
              href={company.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-stone/70 transition-colors hover:text-terracotta"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-stone/10">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-stone/40 sm:px-8">
          <p>© {new Date().getFullYear()} Winterbrook. All rights reserved.</p>
          <p>Registered in Ireland · Dun Laoghaire, Co. Dublin</p>
        </div>
      </div>
    </footer>
  );
}
