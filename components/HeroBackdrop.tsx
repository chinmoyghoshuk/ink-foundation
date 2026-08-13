'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { LeafFallback } from './LeafFallback'
import { canRender3D } from '@/lib/device'

// three.js is ~230 kB gzipped. It is never in the page's JS graph — this
// import only resolves on devices that pass canRender3D().
const LeafScene = dynamic(() => import('./three/LeafScene').then((m) => m.LeafScene), {
  ssr: false,
  loading: () => null,
})

export function HeroBackdrop({ className = '' }: { className?: string }) {
  const [use3D, setUse3D] = useState(false)

  useEffect(() => {
    if (canRender3D()) setUse3D(true)
  }, [])

  return use3D ? <LeafScene className={className} /> : <LeafFallback className={className} />
}
