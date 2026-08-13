'use client'

import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * The pinned horizontal scrub for the journey section. Split into its own
 * module and rendered only once the desktop check passes, so GSAP's ~42 kB
 * never reaches a phone.
 */
export function DesktopPin({ trackRef }: { trackRef: RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const el = trackRef.current
    const section = el?.closest('section')
    if (!el || !section) return

    let revert: (() => void) | undefined
    let cancelled = false

    void import('@/lib/gsap').then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return
      const ctx = gsap.context(() => {
        const distance = () => el.scrollWidth - window.innerWidth + 96

        gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: section,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        gsap.to('[data-journey-progress]', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      }, section)

      // Images settle after the pin is measured — re-measure once they have.
      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh)
      const settle = setTimeout(refresh, 1500)

      revert = () => {
        window.removeEventListener('load', refresh)
        clearTimeout(settle)
        ctx.revert()
      }
    })

    return () => {
      cancelled = true
      revert?.()
    }
  }, [trackRef])

  return null
}
