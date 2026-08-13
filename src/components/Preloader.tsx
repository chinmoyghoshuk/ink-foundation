import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogoMark } from './BrandLogo'
import { isCoarsePointer, prefersReducedMotion } from '../lib/device'

/**
 * Brief navy curtain that lifts once the first paint is done.
 *
 * Two hard rules, learned the hard way: it never covers the page for longer
 * than its own timers regardless of whether its exit animation ever runs (a
 * throttled rAF used to leave it stuck on screen forever), and it never
 * intercepts input. Touch devices skip it entirely.
 */
export function Preloader() {
  const skip = typeof window !== 'undefined' && (prefersReducedMotion() || isCoarsePointer())
  const [done, setDone] = useState(skip)
  const [unmounted, setUnmounted] = useState(skip)

  useEffect(() => {
    if (skip) return
    const lift = setTimeout(() => setDone(true), 1100)
    // Safety net: drop it from the tree no matter what the animation is doing.
    const evict = setTimeout(() => setUnmounted(true), 2600)
    return () => {
      clearTimeout(lift)
      clearTimeout(evict)
    }
  }, [skip])

  if (unmounted) return null

  return (
    <AnimatePresence onExitComplete={() => setUnmounted(true)}>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-navy-950"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <LogoMark className="logo-on-dark h-12 text-white sm:h-14" />
            </motion.div>
            <div className="mt-8 h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full bg-leaf-400"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
