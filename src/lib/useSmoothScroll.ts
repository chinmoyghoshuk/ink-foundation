import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'
import { isCoarsePointer, prefersReducedMotion } from './device'

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger and
 * Lenis stay on exactly the same frame.
 *
 * Pointer devices only. Lenis takes over the scroll and drives it from
 * requestAnimationFrame, so anything that starves rAF — a backgrounded tab,
 * battery saver, GPU contention — leaves a touch device unable to scroll at
 * all, with no way back. Phones already have momentum scrolling; native
 * scrolling there is both better and impossible to freeze.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || isCoarsePointer()) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Anchor links go through Lenis so they inherit the same easing
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -80 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}

/** Native smooth scrolling for in-page anchors when Lenis is not running. */
export function useNativeAnchorScroll() {
  useEffect(() => {
    if (!prefersReducedMotion() && !isCoarsePointer()) return

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id) as HTMLElement | null
      if (!target) return
      e.preventDefault()
      const top = target.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
