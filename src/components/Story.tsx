import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from './Reveal'

const PILLARS = [
  {
    title: 'Books first',
    body: 'A child with a book of their own reads for pleasure, not for marks. We start there.',
  },
  {
    title: 'Places to belong',
    body: 'Reading rooms, gardens and after-school spaces that stay open long after we launch them.',
  },
  {
    title: 'Local hands',
    body: 'Every programme is run by people who already live on the street it serves.',
  },
]

export function Story() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yA = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const yB = useTransform(scrollYProgress, [0, 1], ['-6%', '10%'])

  return (
    <section id="story" className="relative overflow-hidden bg-cream pt-8 pb-24 sm:pb-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div ref={ref} className="relative order-2 h-[30rem] sm:h-[38rem] lg:order-1">
          <motion.div
            style={{ y: yA }}
            className="absolute top-0 left-0 w-[62%] overflow-hidden rounded-[1.5rem] shadow-xl shadow-navy-950/10"
          >
            <img
              src="/img/classroom.jpg"
              alt="A teacher working with pupils in a busy classroom"
              className="aspect-[3/4] w-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            style={{ y: yB }}
            className="absolute right-0 bottom-0 w-[58%] overflow-hidden rounded-[1.5rem] shadow-xl shadow-navy-950/10"
          >
            <img
              src="/img/library.jpg"
              alt="A young reader walking between library shelves"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf-100 blur-3xl" />
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow text-leaf-600">Our story</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.06] font-semibold tracking-[-0.025em]">
              A pen is only the beginning. What grows from it is the point.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 text-lg leading-relaxed text-navy-900/70">
              PEN Group Foundation began with a simple observation: in the communities we work
              with, children were not short of curiosity — they were short of pages. So we started
              handing out books, and quickly learned that a book without a quiet, safe, welcoming
              place to read it rarely gets opened twice.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-lg leading-relaxed text-navy-900/70">
              Today we fund reading rooms, learning gardens and the people who keep them running —
              because literacy grows where someone tends it. We are the charitable organisation of{' '}
              <a
                href="https://www.pengroup.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-leaf-600 underline decoration-leaf-500/40 underline-offset-4 transition-colors hover:decoration-leaf-500"
              >
                PEN Group Holdings
              </a>
              , which underwrites our running costs so that public donations go only to programmes.
            </p>
          </Reveal>

          <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-navy-900/10">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.24 + i * 0.07}>
                <div className="group flex gap-5 bg-white/60 px-6 py-6 transition-colors hover:bg-leaf-100/70">
                  <span className="mt-1 font-display text-sm font-semibold text-leaf-600 tabular-nums">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{pillar.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-navy-900/60">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
