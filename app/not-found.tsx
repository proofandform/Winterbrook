import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-paper px-5 pt-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.42em] text-terracotta">404</p>
      <h1 className="font-display mt-4 max-w-[18ch] text-4xl leading-tight sm:text-6xl">
        This page has moved on — like all good homes, it found an owner.
      </h1>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.22em] text-ink"
      >
        <span className="h-px w-10 bg-terracotta transition-all duration-400 group-hover:w-16" aria-hidden="true" />
        Back to the homepage
      </Link>
    </section>
  );
}
