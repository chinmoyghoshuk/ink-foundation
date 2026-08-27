'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

const LINKS = [
  { label: 'Foundation', href: '#foundation' },
  { label: 'Our work', href: '#focus' },
  { label: 'Partners', href: '#initiatives' },
  { label: 'Impact', href: '#impact' },
  { label: 'Get involved', href: '#involved' },
]

export function Nav({ logo }: { logo: ReactNode }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="enter-down fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          solid
            ? 'border-b border-navy-900/10 bg-cream/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-x flex h-20 items-center justify-between gap-6">
          <a
            href="#top"
            aria-label="PEN Group Foundation — home"
            className={`flex h-8 items-center transition-colors duration-500 sm:h-9 ${
              solid ? 'text-navy-900' : 'logo-on-dark text-white'
            }`}
          >
            {logo}
          </a>

          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative text-[15px] font-medium transition-colors ${
                  solid ? 'text-navy-900/80 hover:text-navy-900' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-leaf-500 transition-all duration-400 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#donate"
              className={`hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 sm:inline-flex ${
                solid
                  ? 'bg-navy-900 text-white hover:bg-navy-800'
                  : 'bg-leaf-500 text-navy-950 hover:bg-leaf-400'
              }`}
            >
              Support us
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${
                solid ? 'border-navy-900/15 text-navy-900' : 'border-white/25 text-white'
              }`}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute top-0 left-0 block h-[2px] w-5 bg-current transition-transform duration-300 ${
                    open ? 'translate-y-[5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 block h-[2px] w-5 bg-current transition-transform duration-300 ${
                    open ? '-translate-y-[5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <nav
        className={`grid overflow-hidden border-b bg-cream transition-all duration-500 lg:hidden ${
          open ? 'grid-rows-[1fr] border-navy-900/10' : 'grid-rows-[0fr] border-transparent'
        }`}
      >
        <div className="min-h-0">
          <div className="container-x flex flex-col gap-1 py-6">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-navy-900/5 py-3 font-display text-xl text-navy-900"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#donate"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-navy-900 px-6 py-4 text-center font-semibold text-white"
            >
              Support us
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
