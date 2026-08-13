'use client'

import { useEffect } from 'react'
import { isCoarsePointer, prefersReducedMotion } from '@/lib/device'

/** Native smooth scrolling for in-page anchors where Lenis is not running. */
export function AnchorScroll() {
  useEffect(() => {
    if (!prefersReducedMotion() && !isCoarsePointer()) return

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      const id = link?.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id) as HTMLElement | null
      if (!target) return
      e.preventDefault()
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
