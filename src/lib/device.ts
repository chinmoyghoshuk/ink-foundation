const matches = (query: string) =>
  typeof window !== 'undefined' && window.matchMedia(query).matches

export const prefersReducedMotion = () => matches('(prefers-reduced-motion: reduce)')

/** True for touch-first devices (phones, tablets) — no mouse or trackpad. */
export const isCoarsePointer = () => matches('(pointer: coarse)') || !matches('(pointer: fine)')

/**
 * Only real pointer devices with room to show it get the WebGL hero.
 * Phones fall back to CSS-animated leaves: the 880 kB three.js chunk and a
 * continuously rendering canvas are the first things to starve a mobile GPU,
 * and the scene is scrolled past within a couple of seconds anyway.
 */
export const canRender3D = () =>
  matches('(min-width: 1024px)') && !isCoarsePointer() && !prefersReducedMotion()
