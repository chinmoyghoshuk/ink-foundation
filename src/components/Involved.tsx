import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'

const WAYS = [
  {
    title: 'Volunteer',
    body: 'Read with a child, tend a garden bed, or help sort a delivery. Two hours a month is enough to matter.',
    image: '/img/hands-unity.jpg',
    alt: 'Hands stacked together in the centre of a group',
    cta: 'Find a role',
  },
  {
    title: 'Partner',
    body: 'Schools, hubs and employers who want a reading room, a garden or a bursary scheme on their doorstep.',
    image: '/img/community.jpg',
    alt: 'A community gathering under festival lights',
    cta: 'Start a conversation',
  },
  {
    title: 'Fundraise',
    body: 'Run, bake, shave, sponsor a shelf. We will send the kit and cheer embarrassingly loudly.',
    image: '/img/hands-reach.jpg',
    alt: 'Two hands reaching towards each other',
    cta: 'Get the kit',
  },
]

export function Involved() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <section id="involved" className="bg-cream py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow text-leaf-600">Get involved</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.06] font-semibold tracking-[-0.025em]">
              There is more than one way to hand someone a book.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {WAYS.map((way, i) => (
            <Reveal key={way.title} delay={i * 0.08}>
              <motion.a
                href="#donate"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-navy-900/10 bg-white"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={way.image}
                    alt={way.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-2xl font-semibold">{way.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-navy-900/60">
                    {way.body}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 font-medium text-leaf-600">
                    {way.cta}
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1"
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
                  </span>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-20 grid items-center gap-10 rounded-[1.8rem] bg-navy-900 px-8 py-12 text-white sm:px-12 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight font-semibold tracking-[-0.02em]">
                Six updates a year. Nothing else, ever.
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-navy-100/65">
                Where the money went, what grew, and the occasional photograph of a very proud
                seven-year-old holding a book.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email.trim()) setSent(true)
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label className="flex-1">
                <span className="sr-only">Email address</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-white/15 bg-white/5 px-6 py-4 text-white placeholder:text-white/35 focus:border-leaf-400 focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="rounded-full bg-leaf-500 px-8 py-4 font-semibold text-navy-950 transition-colors hover:bg-leaf-400"
              >
                {sent ? 'Thank you' : 'Sign up'}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
