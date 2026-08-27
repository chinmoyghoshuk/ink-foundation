'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { canPlayAmbientVideo } from '@/lib/device'

/**
 * A looping background clip that behaves itself.
 *
 * `children` is the server-rendered poster image, so the frame is filled from
 * the prerendered HTML with no JavaScript at all. The <video> is only mounted
 * on pointer devices wide enough to warrant it, and only once the frame is
 * near the viewport — so the clip is never in the critical path, and phones
 * never request it. It fades in over the poster once it can actually play,
 * and pauses whenever it scrolls away or the tab is hidden.
 */
export function AmbientVideo({
  src,
  children,
  className = '',
}: {
  src: string
  children: ReactNode
  className?: string
}) {
  const wrap = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)

  // Decide whether this device gets a video at all, then wait until it is close
  // to the viewport before putting one in the DOM.
  useEffect(() => {
    const el = wrap.current
    if (!el || !canPlayAmbientVideo()) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        setMounted(true)
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Don't decode frames nobody is looking at.
  useEffect(() => {
    if (!mounted) return
    const el = wrap.current
    const v = video.current
    if (!el || !v) return

    const play = () => {
      if (!document.hidden) v.play().catch(() => {})
    }
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : v.pause()),
      { threshold: 0.2 },
    )
    io.observe(el)

    const onVisibility = () => (document.hidden ? v.pause() : play())
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [mounted])

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      {children}
      {mounted && (
        <video
          ref={video}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}
