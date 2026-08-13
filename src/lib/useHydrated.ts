import { useEffect, useState } from 'react'
import { isCoarsePointer, prefersReducedMotion } from './device'

/**
 * False during the prerender and on the first client render, true once the
 * page has hydrated. Anything that would change the markup must wait for this,
 * or the prerendered HTML and React's first render disagree.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}

/**
 * Whether JS-driven scroll animations should run at all.
 *
 * Only pointer devices, and only after hydration. Everything below the fold is
 * therefore plain, visible markup in the HTML — a phone on a slow connection
 * reads the whole page before the bundle has finished parsing, instead of
 * staring at hidden elements waiting for Framer Motion to start.
 */
export function useScrollAnimations() {
  const hydrated = useHydrated()
  return hydrated && !isCoarsePointer() && !prefersReducedMotion()
}
