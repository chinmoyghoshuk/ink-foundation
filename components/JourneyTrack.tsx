'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

const DesktopPin = dynamic(() => import('./DesktopPin').then((m) => m.DesktopPin), { ssr: false })

/**
 * Holds the card track. On desktop it also mounts the GSAP pin; on a phone the
 * track is just a native horizontal swipe and no animation code is fetched.
 * `children` is server-rendered markup passed straight through.
 */
export function JourneyTrack({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null)
  const [pin, setPin] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setPin(true)
  }, [])

  return (
    <>
      <div
        ref={track}
        className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:w-max lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {children}
      </div>
      {pin && <DesktopPin trackRef={track} />}
    </>
  )
}
