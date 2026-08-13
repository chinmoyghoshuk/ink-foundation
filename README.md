# PEN Group Foundation — one-page site

A single-page site for PEN Group Foundation, the charitable organisation of
[PEN Group Holdings](https://www.pengroup.com), built around the logo's navy (`#05274E`)
and leaf-green (`#89A748`) palette.

## Stack

- **Next.js 16 (App Router) + React 19 + TypeScript**, statically generated
- **Tailwind CSS v4** — brand tokens live in `app/globals.css` under `@theme`
- **GSAP + ScrollTrigger** — the pinned horizontal "how a gift grows" section (desktop only)
- **three.js / @react-three/fiber** — drifting leaf field behind the hero (desktop only)
- **Lenis** — smooth scrolling (desktop only), driven off the GSAP ticker
- `next/font` self-hosts Outfit and Inter; `next/image` handles responsive sizing

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Rendering rules

The site has to be readable and scrollable on a mid-range phone before any JS runs,
so the architecture is deliberate:

- **Nearly every section is a Server Component** and ships no JavaScript at all. The
  client islands are the nav, testimonial carousel, donation panel, newsletter form,
  stat counters, scroll progress bar and the reveal observer — nothing else.
- **Nothing is hidden by JS.** `Reveal` renders visible markup and only adds its hidden
  class to elements that are already below the fold, so content is never invisible
  waiting for a bundle.
- **Above-the-fold motion is CSS keyframes** (hero entrance, headline word rise,
  floating chip, scroll cue) — it runs on the compositor straight from the HTML.
- **Lenis, GSAP and three.js are desktop-only and dynamically imported**, gated behind a
  runtime check so a phone never requests those chunks. Lenis in particular drives the
  scroll from rAF, which on touch can leave a page unable to scroll at all.

Measured on a 375px viewport: ~145 kB JS, 3 image requests, no third-party requests.

## Deploy

`Dockerfile` builds the standalone server and runs `docker-entry.mjs`, which serves Next
on port 3000 and mirrors it on port 80 for the Shipyard health check. Deployed on Shipyard.

## Assets

- `components/brand-logo.ts` and `brand-mark.ts` hold the traced vector logo, inlined by
  `components/BrandLogo.tsx`. The navy paths use `currentColor` and the leaf reads
  `--logo-leaf`, so the mark recolours itself from whatever wraps it.
- Regenerate from a new bitmap with:

  ```bash
  python scripts/trace-logo.py brand/pen-group-foundation.png assets/brand public
  ```

  which also rewrites `public/favicon.png`, `apple-touch-icon.png` and the `og.png`
  social card. Needs `potrace` and Pillow.
- `public/img/*` are stock photographs from [Unsplash](https://unsplash.com), used under
  the Unsplash licence. Swap them for real programme photography before launch.

## Content note

Programme names, statistics, quotes and the registered-charity number are illustrative
placeholders — replace them with the foundation's real details before going live.
