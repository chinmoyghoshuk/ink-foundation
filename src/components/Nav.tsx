import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { LogoMark } from './BrandLogo'

const LINKS = [
  { label: 'Our story', href: '#story' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'Impact', href: '#impact' },
  { label: 'Get involved', href: '#involved' },
]

export function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 80))

  // A restored scroll position fires no change event — seed the state on mount
  useEffect(() => setSolid(window.scrollY > 80), [])

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
          <a href="#top" aria-label="PEN Group Foundation — home" className="flex items-center">
            <LogoMark
              className={`h-8 transition-colors duration-500 sm:h-9 ${
                solid ? 'text-navy-900' : 'logo-on-dark text-white'
              }`}
            />
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
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
              Donate
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
                <motion.span
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  className="absolute top-0 left-0 block h-[2px] w-5 bg-current"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  className="absolute bottom-0 left-0 block h-[2px] w-5 bg-current"
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-navy-900/10 bg-cream lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-6">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                  className="border-b border-navy-900/5 py-3 font-display text-xl text-navy-900"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#donate"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-navy-900 px-6 py-4 text-center font-semibold text-white"
              >
                Donate
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
