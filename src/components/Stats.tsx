import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { Reveal } from './Reveal'

const STATS = [
  { value: 12480, label: 'children reading with us', prefix: '', suffix: '' },
  { value: 340, label: 'books placed in young hands', prefix: '', suffix: 'k' },
  { value: 96, label: 'schools & community hubs', prefix: '', suffix: '' },
  { value: 18, label: 'green learning gardens', prefix: '', suffix: '' },
]

export function Stats() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count)
        const counter = { v: 0 }
        gsap.to(counter, {
          v: target,
          duration: 2.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(counter.v).toLocaleString('en-GB')
          },
        })
      })

      gsap.from('[data-stat-line]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-cream py-24 sm:py-32" ref={root}>
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-leaf-600">By the numbers</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.02em]">
            Small beginnings, measured carefully.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div>
                <div className="flex items-baseline font-display text-[clamp(2.6rem,5vw,3.6rem)] leading-none font-semibold tracking-[-0.03em] text-navy-900">
                  <span data-count={stat.value}>0</span>
                  <span className="text-leaf-500">{stat.suffix}</span>
                </div>
                <div
                  data-stat-line
                  className="mt-6 h-px w-full origin-left bg-navy-900/15"
                  aria-hidden="true"
                />
                <p className="mt-4 max-w-[15rem] text-[15px] leading-relaxed text-navy-900/60">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
