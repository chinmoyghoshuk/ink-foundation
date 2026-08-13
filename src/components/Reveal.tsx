import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

/** Standard scroll-in reveal used across the page (Framer Motion). */
export function Reveal({ children, delay = 0, y = 28, className, once = true }: Props) {
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

/** Word-by-word headline reveal, each word masked by its own overflow box. */
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
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.26em] inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className={
              highlight.includes(word.replace(/[^\w]/g, ''))
                ? 'inline-block text-leaf-400'
                : 'inline-block'
            }
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: '0%', opacity: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
