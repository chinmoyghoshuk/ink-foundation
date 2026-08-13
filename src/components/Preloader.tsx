import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/** Brief navy curtain that lifts once the first paint is done. */
export function Preloader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = setTimeout(() => setDone(true), reduced ? 0 : 1250)
    return () => clearTimeout(id)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950"
        >
          <div className="flex flex-col items-center">
            <motion.img
              src="/mark-light.png"
              alt=""
              initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-12 w-auto sm:h-14"
            />
            <div className="mt-8 h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full bg-leaf-400"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
