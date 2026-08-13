# Ink Foundation — one-page site

A single-page site for the Ink Foundation charity, built around the existing logo's
navy (`#05274E`) and leaf-green (`#89A748`) palette.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** — brand tokens live in `src/index.css` under `@theme`
- **Framer Motion** — reveals, headline word masks, nav, carousel, donation panel
- **GSAP + ScrollTrigger** — stat counters, pinned horizontal "how a gift grows" section
- **three.js / @react-three/fiber** — drifting leaf field behind the hero (lazy-loaded)
- **Lenis** — smooth scrolling, driven off the GSAP ticker so ScrollTrigger stays in sync

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # → dist/
npm run preview
```

## Deploy

`Dockerfile` builds the site and serves `dist/` with nginx on port 80
(`nginx.conf` handles SPA fallback, gzip and asset caching). Deployed on Shipyard.

## Assets

- `public/logo.png`, `logo-light.png`, `mark.png`, `mark-light.png`, `favicon.png` are
  generated from the supplied logo artwork — the white background is keyed out, and the
  `-light` variants recolour the navy to white for use on dark sections.
- `public/img/*` are stock photographs from [Unsplash](https://unsplash.com), used under
  the Unsplash licence. Swap them for real programme photography before launch.

## Content note

Programme names, statistics, quotes and the registered-charity number are illustrative
placeholders — replace them with the foundation's real details before going live.
