import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useScrollAnimations } from '../lib/useHydrated'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

/**
 * Scroll-in reveal.
 *
 * Renders as plain, visible markup during the prerender, on the first client
 * render, and on touch devices — content must never depend on JS to become
 * visible. Pointer devices upgrade to the Framer Motion version after
 * hydration, by which point anything animated is below the fold anyway.
 */
export function Reveal({ children, delay = 0, y = 28, className, once = true }: Props) {
  const animate = useScrollAnimations()

  if (!animate) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Word-by-word headline reveal, each word masked by its own overflow box.
 *
 * Pure CSS: it is part of the prerendered HTML and runs on the compositor, so
 * the headline is readable immediately and animates without waiting for — or
 * depending on — the JS bundle.
 */
export function RevealWords({
  text,
  className,
  delay = 0,
  highlight = [],
}: {
  text: string
  className?: string
  delay?: number
  highlight?: string[]
}) {
  const words = text.split(' ')
  return (
    <span className={`word-rise ${className ?? ''}`}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.26em] inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <span
            className={
              highlight.includes(word.replace(/[^\w]/g, ''))
                ? 'inline-block text-leaf-400'
                : 'inline-block'
            }
            style={{ animationDelay: `${delay + i * 0.055}s` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}
