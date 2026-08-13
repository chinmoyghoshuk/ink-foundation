# PEN Group Foundation — one-page site

A single-page site for PEN Group Foundation, the charitable organisation of
[PEN Group Holdings](https://www.pengroup.com), built around the logo's navy (`#05274E`)
and leaf-green (`#89A748`) palette.

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

- `src/assets/brand/logo.svg` and `mark.svg` are traced vector versions of the supplied
  logo artwork, inlined into the page by `src/components/BrandLogo.tsx`. Their navy paths
  use `currentColor` and the leaf reads `--logo-leaf`, so the mark recolours itself for
  navy sections (`.logo-on-dark`) with no second asset.
- Regenerate them from a new bitmap with:

  ```bash
  python scripts/trace-logo.py path/to/logo.png src/assets/brand public
  ```

  which also rewrites `public/favicon.png`, `apple-touch-icon.png` and the `og.png`
  social card. Needs `potrace` and Pillow.
- `public/img/*` are stock photographs from [Unsplash](https://unsplash.com), used under
  the Unsplash licence. Swap them for real programme photography before launch.

## Content note

Programme names, statistics, quotes and the registered-charity number are illustrative
placeholders — replace them with the foundation's real details before going live.
