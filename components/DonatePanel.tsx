'use client'

import { useState } from 'react'

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

export function DonatePanel() {
  const [mode, setMode] = useState<Mode>('monthly')
  const [selected, setSelected] = useState(1)
  const options = AMOUNTS[mode]
  const active = options[selected]

  return (
      <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md sm:p-9">
        <div className="relative flex rounded-full border border-white/10 bg-navy-950/50 p-1.5">
          <span
            aria-hidden="true"
            className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-leaf-500 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: mode === 'monthly' ? 'translateX(0)' : 'translateX(100%)' }}
          />
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
          <p
            key={`${mode}-${selected}`}
            className="fade-in-up text-[15px] leading-relaxed text-navy-100/70"
          >
            <span className="text-leaf-400">Your gift:</span> {active.impact}
          </p>
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
  )
}
