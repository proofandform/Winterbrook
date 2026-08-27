# Winterbrook — Rebuilt

A ground-up rebuild of [winterbrook.ie](https://www.winterbrook.ie/) as a luxury
architecture-studio-grade site. All copy, photography, CGIs, team portraits and
map coordinates were crawled from the live WordPress site (July 2026); the
untouched originals live in `/assets` (586 MB), web-optimised copies in
`/public/images`.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run optimize-images   # regenerate /public/images + blur manifest from /assets
```

## Stack

- **Next.js 15** (App Router) + **Tailwind CSS v4**
- **Framer Motion** — mobile menu, FLIP filter grid re-flow
- **GSAP + ScrollTrigger** — scroll-scrubbed parallax
- **Lenis** — site-wide inertia scrolling (pointer-fine devices only)
- **Leaflet** + CARTO tiles — region map with pin↔card hover sync, per-scheme location maps

## Content layer

`lib/content.ts` holds every development, past project, news article and team
member in CMS-shaped typed records — including a `kind: "photo" | "cgi"` flag
per image so renders are labelled honestly in the UI. To move to Sanity or
Contentful, mirror these interfaces as schemas and swap the module for fetch
calls; no component changes needed.

## Experience inventory

Preloader (SVG logo draw-on, once per session) · full-bleed rotating ken-burns
hero with staggered headline · custom cursor with View/Explore pill · curtain
page transitions · scroll-triggered reveals (IntersectionObserver, no-JS safe)
· magnetic CTAs · count-up stats · duotone→colour card hovers · asymmetric
editorial grids · filterable gallery (status + home type) with FLIP re-flow ·
interactive Dublin/Wicklow map · floating-label enquiry form with inline
validation, shake and success states · scroll progress bar + back-to-top ·
ambient drifting background.

All motion respects `prefers-reduced-motion`; content renders fully without
JavaScript (reveal-hiding only applies once `html.js` is set); images are
lazy-loaded with blur-up placeholders via a build-time manifest
(`lib/image-manifest.json`).
