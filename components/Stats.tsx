import { Counter } from './Counter'
import { Reveal } from './Reveal'

const STATS = [
  { value: 64, label: 'initiatives supported since inception', suffix: '' },
  { value: 30, label: 'partner organisations', suffix: '+' },
  { value: 12, label: 'countries reached', suffix: '' },
  { value: 100, label: 'of public donations reaching programmes', suffix: '%' },
]

export function Stats() {
  return (
    <section className="bg-cream pb-24 sm:pb-32">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-leaf-600">By the numbers</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.02em]">
            Committed carefully. Measured honestly.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div>
                <div className="flex items-baseline font-display text-[clamp(2.6rem,5vw,3.6rem)] leading-none font-semibold tracking-[-0.03em] text-navy-900">
                  <Counter value={stat.value} />
                  <span className="text-leaf-500">{stat.suffix}</span>
                </div>
                <div className="mt-6 h-px w-full bg-navy-900/15" aria-hidden="true" />
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
