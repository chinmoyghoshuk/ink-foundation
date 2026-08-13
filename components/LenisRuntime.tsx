'use client'

import { useEffect } from 'react'

/** Lenis wired to the GSAP ticker so ScrollTrigger stays on the same frame. */
export function LenisRuntime() {
  useEffect(() => {
    let destroy: (() => void) | undefined
    let cancelled = false

    void (async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('@/lib/gsap'),
      ])
      if (cancelled) return

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      lenis.on('scroll', ScrollTrigger.update)

      const raf = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      const onClick = (e: MouseEvent) => {
        const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
        const id = link?.getAttribute('href')
        if (!id || id === '#') return
        const target = document.querySelector(id)
        if (!target) return
        e.preventDefault()
        lenis.scrollTo(target as HTMLElement, { offset: -80 })
      }
      document.addEventListener('click', onClick)

      destroy = () => {
        document.removeEventListener('click', onClick)
        gsap.ticker.remove(raf)
        lenis.destroy()
      }
    })()

    return () => {
      cancelled = true
      destroy?.()
    }
  }, [])

  return null
}
