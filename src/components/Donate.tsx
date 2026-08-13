import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from './Reveal'

type Mode = 'once' | 'monthly'

const AMOUNTS: Record<Mode, { value: number; impact: string }[]> = {
  once: [
    { value: 10, impact: 'Two books a child chooses and keeps for good.' },
    { value: 25, impact: 'A full bundle of six books for one young reader.' },
    { value: 50, impact: 'A week of after-school reading for an entire class.' },
    { value: 100, impact: 'A month of growing costs for one Learning Garden.' },
  ],
  monthly: [
    { value: 5, impact: 'A book a month, every month, for one child.' },
    { value: 15, impact: 'Keeps a reading room stocked with new titles all year.' },
    { value: 30, impact: 'Funds a weekly reading volunteer in a partner school.' },
    { value: 60, impact: 'Covers a bursary place — uniform, travel and exam fees.' },
  ],
}

export function Donate() {
  const [mode, setMode] = useState<Mode>('monthly')
  const [selected, setSelected] = useState(1)
  const options = AMOUNTS[mode]
  const active = options[selected]

  return (
    <section id="donate" className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
        <img src="/img/leaf-heart.webp" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_20%_20%,rgba(5,39,78,0.75),#04203f_70%)]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-leaf-500/15 blur-[120px]" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow text-leaf-400">Give</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
              Turn a page into a chapter.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-navy-100/70">
              Every public donation goes straight into programmes — our core costs are covered
              separately, so the number you give is the number that arrives.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-10 space-y-4 text-[15px] text-navy-100/65">
              {[
                'Cancel or change a monthly gift any time',
                'Gift Aid adds 25p to every £1 for UK taxpayers',
                'Annual impact report published in full',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md sm:p-9">
            <div className="flex rounded-full border border-white/10 bg-navy-950/50 p-1.5">
              {(['monthly', 'once'] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMode(m)
                    setSelected(1)
                  }}
                  className="relative flex-1 rounded-full px-4 py-3 text-sm font-semibold transition-colors"
                >
                  {mode === m && (
                    <motion.span
                      layoutId="donate-mode"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-leaf-500"
                    />
                  )}
                  <span className={mode === m ? 'relative text-navy-950' : 'relative text-white/70'}>
                    {m === 'monthly' ? 'Monthly' : 'One-off'}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {options.map((option, i) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelected(i)}
                  className={`relative rounded-2xl border px-3 py-5 font-display text-xl font-semibold transition-colors ${
                    selected === i
                      ? 'border-leaf-400 bg-leaf-500/15 text-white'
                      : 'border-white/10 text-white/70 hover:border-white/30'
                  }`}
                >
                  £{option.value}
                </button>
              ))}
            </div>

            <div className="mt-5 min-h-[3.5rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={`${mode}-${selected}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="text-[15px] leading-relaxed text-navy-100/70"
                >
                  <span className="text-leaf-400">Your gift:</span> {active.impact}
                </motion.p>
              </AnimatePresence>
            </div>

            <label className="mt-2 block">
              <span className="sr-only">Other amount</span>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-4 focus-within:border-white/40">
                <span className="font-display text-lg text-white/50">£</span>
                <input
                  type="number"
                  min={1}
                  placeholder="Other amount"
                  className="w-full bg-transparent text-white placeholder:text-white/35 focus:outline-none"
                />
              </div>
            </label>

            <button
              type="button"
              className="group mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-leaf-500 px-8 py-5 font-semibold text-navy-950 transition-colors hover:bg-leaf-400"
            >
              Give £{active.value}
              {mode === 'monthly' ? ' a month' : ''}
              <svg
                className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1"
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
            </button>
            <p className="mt-4 text-center text-xs text-white/40">
              Secure payment · Registered charity no. 000000
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Check({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <path
        d="M6 10.3 8.7 13 14 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
