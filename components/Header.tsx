"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { TransitionLink } from "./PageTransition";

const nav = [
  { href: "/homes", label: "Current Developments" },
  { href: "/past-developments", label: "Past Developments" },
  { href: "/land", label: "Land & Partnerships" },
  { href: "/about", label: "About" },
  { href: "/news", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/**
 * Global header in brand navy at all times. Condenses on scroll; the
 * full-screen menu opens in a deeper navy with staggered items.
 */
export default function Header() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[9900] bg-ink text-paper transition-shadow duration-500 ${
        condensed && !open ? "shadow-[0_1px_0_rgba(250,247,242,0.08),0_12px_40px_rgba(12,31,51,0.35)]" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
          condensed ? "h-16" : "h-[5.5rem]"
        }`}
      >
        <TransitionLink
          href="/"
          className="relative z-[9931] flex items-center gap-3"
          onNavigate={() => setOpen(false)}
          aria-label="Winterbrook — home"
        >
          <Image
            src="/images/logo.svg"
            alt=""
            width={34}
            height={39}
            priority
            className={`w-auto transition-all duration-500 ${condensed ? "h-8" : "h-10"}`}
          />
          <Image
            src="/images/logotext.svg"
            alt="Winterbrook"
            width={143}
            height={16}
            priority
            className="h-4 w-auto max-sm:hidden lg:max-xl:hidden"
          />
        </TransitionLink>

        {/* desktop nav */}
        <nav aria-label="Primary" className="max-lg:hidden">
          <ul className="flex items-center gap-6 xl:gap-7 2xl:gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <TransitionLink
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={`group relative whitespace-nowrap text-[13.5px] uppercase tracking-[0.15em] transition-colors duration-300 xl:text-[14px] 2xl:text-[15px] ${
                    isCurrent(item.href) ? "text-paper" : "text-stone/70"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-paper transition-transform duration-400 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
                      isCurrent(item.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-[9931] flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full bg-paper transition-all duration-300 ${
                open ? "top-1/2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-paper transition-all duration-300 ${
                open ? "bottom-auto top-1/2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9930] flex flex-col justify-between bg-navy-deep px-6 pb-10 pt-28"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <TransitionLink
                      href={item.href}
                      onNavigate={() => setOpen(false)}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      className={`font-display block py-2 text-4xl sm:text-5xl ${
                        isCurrent(item.href) ? "text-brass" : "text-paper"
                      }`}
                    >
                      {item.label}
                    </TransitionLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-sm leading-relaxed text-stone/60"
            >
              <p>Ashgrove Works, Kill Avenue, Dun Laoghaire</p>
              <a href="tel:+35316909590" className="text-stone hover:text-brass">
                +353 (0)1 690 9590
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
