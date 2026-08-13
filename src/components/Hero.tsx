import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LazyLeafScene } from './three/LazyLeafScene'
import { LeafFallback } from './LeafFallback'
import { canRender3D } from '../lib/device'
import { RevealWords } from './Reveal'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const [use3D] = useState(canRender3D)

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden bg-navy-900 pt-28 pb-20 lg:pt-32"
    >
      {/* depth wash sits behind the canvas so the leaves keep their colour */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(120%_90%_at_15%_10%,#0d3c73_0%,#072f5c_55%,#04203f_100%)]" />
      <div className="pointer-events-none absolute -top-40 -left-40 -z-20 h-[38rem] w-[38rem] rounded-full bg-leaf-500/20 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-12rem] bottom-[-14rem] -z-20 h-[36rem] w-[36rem] rounded-full bg-navy-600/35 blur-[140px]" />

      {use3D ? (
        <LazyLeafScene className="absolute inset-0 -z-10" />
      ) : (
        <LeafFallback className="absolute inset-0 -z-10" />
      )}

      {/* legibility wash over the copy side only */}
      <div className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-r from-navy-950/75 via-navy-950/25 to-transparent" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <motion.div style={{ y: textY, opacity: fade }} className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="eyebrow flex items-center gap-3 text-leaf-400"
          >
            <span className="h-px w-10 bg-leaf-400/60" />
            The charitable foundation of PEN Group Holdings
          </motion.p>

          <h1 className="mt-7 font-display text-[clamp(2.8rem,7.2vw,5.4rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-white">
            <RevealWords text="Where every story" />
            <br className="hidden sm:block" />
            <RevealWords text="takes root." delay={0.18} highlight={['root']} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-navy-100/80"
          >
            We put books, learning and green community space within reach of children who are
            growing up without them — then we stay for the long chapters, not just the first page.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            <a
              href="#donate"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-leaf-500 px-8 py-4 font-semibold text-navy-950 transition-colors hover:bg-leaf-400"
            >
              <span className="relative z-10">Donate today</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform duration-400 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 8h13M9 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5"
            >
              Our story
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.15 }}
            className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-navy-100/55"
          >
            <span className="flex items-center gap-2">
              <Dot /> 100% of public gifts reach programmes
            </span>
            <span className="flex items-center gap-2">
              <Dot /> Independently audited
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="absolute -inset-3 rounded-[2rem] border border-white/10" />
            <div className="relative overflow-hidden rounded-[1.7rem] shadow-2xl shadow-navy-950/50">
              <img
                src="/img/hero-children.jpg"
                alt="Children laughing together outside a community learning centre"
                className="aspect-[4/5] w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-7 -left-6 w-[15rem] rounded-2xl border border-white/10 bg-navy-950/85 p-5 backdrop-blur-md sm:-left-10"
            >
              <p className="font-display text-3xl font-semibold text-leaf-400">12,480</p>
              <p className="mt-1 text-sm leading-snug text-navy-100/70">
                children reading with us this year
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[11px] tracking-[0.3em] text-white/45 uppercase lg:flex"
      >
        Scroll
        <span className="relative block h-12 w-px overflow-hidden bg-white/15">
          <motion.span
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-x-0 block h-6 bg-leaf-400"
          />
        </span>
      </motion.a>
    </section>
  )
}

function Dot() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full bg-leaf-500" />
}
