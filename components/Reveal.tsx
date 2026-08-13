'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { isCoarsePointer, prefersReducedMotion } from '@/lib/device'

/**
 * Scroll-in reveal, done with a class and a CSS transition.
 *
 * The element renders visible from the server. The hidden state is only ever
 * applied by this effect, and only to elements that are below the fold when it
 * runs — so content is never invisible while a bundle is still loading, and
 * anything already on screen is left exactly as the server rendered it.
 *
 * `children` stays a server component: it is passed through, not re-rendered
 * on the client, so none of the page's markup ends up in the JS bundle.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || isCoarsePointer() || prefersReducedMotion()) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    el.classList.add('reveal-hidden')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.remove('reveal-hidden')
        io.disconnect()
      },
      { rootMargin: '-80px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} data-reveal className={className} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  )
}
