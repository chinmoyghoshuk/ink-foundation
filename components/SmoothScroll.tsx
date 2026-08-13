'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { isCoarsePointer, prefersReducedMotion } from '@/lib/device'

const LenisRuntime = dynamic(() => import('./LenisRuntime').then((m) => m.LenisRuntime), {
  ssr: false,
})

/**
 * Smooth scrolling is a pointer-device luxury. Lenis drives the scroll from
 * requestAnimationFrame, so on a touch device an rAF stall would leave the page
 * unable to scroll at all — and its code (plus GSAP's ticker) is dead weight
 * there. Gated behind a runtime check so phones never request the chunk.
 */
export function SmoothScroll() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion() || isCoarsePointer()) return
    setEnabled(true)
  }, [])

  return enabled ? <LenisRuntime /> : null
}
