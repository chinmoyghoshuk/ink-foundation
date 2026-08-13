import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { Reveal } from './Reveal'

const STEPS = [
  {
    n: '01',
    title: 'You give',
    body: '£25 becomes six books a child picks out themselves. £60 keeps a reading room lit and staffed for a week.',
    image: '/img/make-a-change.webp',
    alt: 'Hands holding coins and a handwritten note reading make a change',
  },
  {
    n: '02',
    title: 'We match it locally',
    body: 'Partner schools and hubs nominate the children in front of them. No waiting lists drawn up in an office far away.',
    image: '/img/classroom.webp',
    alt: 'Pupils working together in a classroom',
  },
  {
    n: '03',
    title: 'Volunteers deliver',
    body: 'Sorted, wrapped and handed over in person by people from the same neighbourhood — usually on a Saturday morning.',
    image: '/img/volunteers-food.webp',
    alt: 'Volunteers packing boxes of supplies for the community',
  },
  {
    n: '04',
    title: 'We stay for the long chapters',
    body: 'Reading progress is tracked for three years and published in full, whether the numbers flatter us or not.',
    image: '/img/kids-group.webp',
    alt: 'A group of smiling children standing together',
  },
]

export function Journey() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // Pinned horizontal scroll — desktop only; small screens swipe instead.
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const el = track.current
        if (!el) return
        const distance = () => el.scrollWidth - window.innerWidth + 96

        gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        gsap.to('[data-journey-progress]', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="impact"
      ref={root}
      className="relative overflow-hidden bg-sand py-24 lg:h-screen lg:overflow-hidden lg:py-0"
    >
      <div className="container-x flex h-full flex-col justify-center">
        <div className="lg:pt-24">
          <Reveal>
            <p className="eyebrow text-leaf-600">How a gift grows</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.06] font-semibold tracking-[-0.025em]">
              From your hands to theirs, in four steps.
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-14 lg:mt-16">
          <div
            ref={track}
            className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:w-max lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {STEPS.map((step) => (
              <article
                key={step.n}
                className="group w-[80vw] shrink-0 snap-center overflow-hidden rounded-[1.6rem] bg-white shadow-lg shadow-navy-950/5 sm:w-[26rem] lg:w-[30rem]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <span className="absolute bottom-0 left-0 bg-navy-900 px-5 py-2 font-display text-sm font-semibold tracking-[0.15em] text-leaf-400">
                    {step.n}
                  </span>
                </div>
                <div className="p-7 sm:p-8">
                  <h3 className="font-display text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-navy-900/60">{step.body}</p>
                </div>
              </article>
            ))}

            <a
              href="#donate"
              className="group flex w-[80vw] shrink-0 snap-center flex-col justify-between rounded-[1.6rem] bg-navy-900 p-8 text-white sm:w-[26rem] lg:w-[30rem]"
            >
              <div>
                <p className="eyebrow text-leaf-400">And then?</p>
                <h3 className="mt-6 font-display text-[clamp(1.7rem,2.4vw,2.2rem)] leading-tight font-semibold tracking-[-0.02em]">
                  A child who owns books reads 4× more by the time they are eleven.
                </h3>
                <p className="mt-5 text-[15px] leading-relaxed text-navy-100/60">
                  That is the whole thesis. Everything we fund is in service of it.
                </p>
              </div>
              <span className="mt-10 inline-flex items-center gap-3 font-semibold text-leaf-400">
                Start the first chapter
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M1 8h13M9 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>

          <div className="mt-8 hidden h-px w-full bg-navy-900/10 lg:mt-12 lg:block">
            <div
              data-journey-progress
              className="h-px w-full origin-left scale-x-0 bg-leaf-500"
              aria-hidden="true"
            />
          </div>
          <p className="mt-6 text-sm text-navy-900/40 lg:hidden">Swipe to follow the journey →</p>
        </div>
      </div>
    </section>
  )
}
