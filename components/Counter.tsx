'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/device'

/** Counts up once, when it first scrolls into view. No animation library. */
export function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.textContent = value.toLocaleString('en-GB')
      return
    }

    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const duration = 2100
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          el.textContent = Math.round(value * eased).toLocaleString('en-GB')
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [value])

  return <span ref={ref}>{value.toLocaleString('en-GB')}</span>
}
