# PEN Group Foundation — one-page site

A single-page site for the PEN Group Foundation, the charitable organisation of
[PEN Group Holdings](https://www.pengroup.com), built around the logo's navy (`#05274E`)
and leaf-green (`#89A748`) palette.

## Stack

- **Next.js 16 (App Router) + React 19 + TypeScript**, statically generated
- **Tailwind CSS v4** — brand tokens live in `app/globals.css` under `@theme`
- **GSAP + ScrollTrigger** — the pinned horizontal "how support becomes impact" section (desktop only)
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
  stat counters, scroll progress bar, ambient video and the reveal observer — nothing else.
- **Nothing is hidden by JS.** `Reveal` renders visible markup and only adds its hidden
  class to elements that are already below the fold, so content is never invisible
  waiting for a bundle.
- **Above-the-fold motion is CSS keyframes** (hero entrance, headline word rise,
  floating chip, scroll cue) — it runs on the compositor straight from the HTML.
- **Lenis, GSAP, three.js and video are desktop-only and dynamically imported**, gated
  behind a runtime check so a phone never requests those chunks. Lenis in particular
  drives the scroll from rAF, which on touch can leave a page unable to scroll at all.

Measured on a 390px viewport with a cold cache: ~336 kB total, 156 kB JS, 2 image
requests, **no video and no third-party requests**.

## Video

`components/AmbientVideo.tsx` wraps a looping clip. The poster image is passed in as
`children` so it is server-rendered and fills the frame with zero JavaScript; the
`<video>` is only mounted on pointer devices ≥1024px wide, and only once the frame is
within 300px of the viewport. It pauses when scrolled away or when the tab is hidden.

Source clips are from [Mixkit](https://mixkit.co) (free licence) and are re-encoded
before committing — 720–960px wide, audio stripped, H.264 CRF 31–33, ~7–9s, plus a
WebP poster:

```bash
ffmpeg -ss 0 -t 8 -i source.mp4 -an \
  -vf "scale=960:-2:flags=lanczos,fps=24" \
  -c:v libx264 -profile:v high -preset veryslow -crf 31 \
  -pix_fmt yuv420p -movflags +faststart public/video/name.mp4
```

Each clip lands at 300–400 kB. Keep them there — they are decoration, not content.

## Partners

`lib/partners.ts` holds the organisations shown in the partners strip and the
"Who we work with" section. Each entry renders as a typographic wordmark until a real
logo file is supplied — drop the artwork into `public/partners/` and set `logo` on the
entry, and it is used everywhere that partner appears, constrained to a common height.

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
  the Unsplash licence. Swap them for real photography before launch.

## Content note

The following are illustrative placeholders and must be replaced with the Foundation's
real details before going live:

- **Partner descriptions.** The Mosaic and Lincoln City FC entries describe the *kind* of
  work the Foundation supports, not anything either organisation has agreed to. Confirm
  the wording with each partner, and obtain permission before using their logos.
- **Statistics** in the "By the numbers" section, and the donation amounts and their
  stated impact in `components/DonatePanel.tsx`.
- **Testimonials** in `components/Stories.tsx` — attributed to unnamed roles rather than
  real people, precisely because they are not yet real.
- **Contact details, registered office and charity number** in `components/Footer.tsx`.
- The **Donate button is not wired to a payment provider.**
