import Image from 'next/image'
import { HeroBackdrop } from './HeroBackdrop'
import { RevealWords } from './RevealWords'

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-navy-900 pt-28 pb-20 lg:pt-32"
    >
      {/* depth wash sits behind the canvas so the leaves keep their colour */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(120%_90%_at_15%_10%,#0d3c73_0%,#072f5c_55%,#04203f_100%)]" />
      <div className="pointer-events-none absolute -top-40 -left-40 -z-20 h-[38rem] w-[38rem] rounded-full bg-leaf-500/20 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-12rem] bottom-[-14rem] -z-20 h-[36rem] w-[36rem] rounded-full bg-navy-600/35 blur-[140px]" />

      <HeroBackdrop className="absolute inset-0 -z-10" />

      {/* legibility wash over the copy side only */}
      <div className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-r from-navy-950/75 via-navy-950/25 to-transparent" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p
            className="enter-up eyebrow flex items-center gap-3 text-leaf-400"
            style={{ animationDelay: '0.15s' }}
          >
            <span className="h-px w-10 bg-leaf-400/60" />
            The charitable foundation of PEN Group Holdings
          </p>

          <h1 className="mt-7 font-display text-[clamp(2.6rem,6.6vw,5rem)] leading-[1.03] font-semibold tracking-[-0.03em] text-white">
            <RevealWords text="Success carries" />
            <br className="hidden sm:block" />
            <RevealWords text="a responsibility." delay={0.18} highlight={['responsibility']} />
          </h1>

          <p
            className="enter-up mt-8 max-w-xl text-lg leading-relaxed text-navy-100/80"
            style={{ animationDelay: '0.7s' }}
          >
            The PEN Group Foundation supports charitable, educational and community-focused
            initiatives around the world — investing in people, backing worthwhile causes, and
            building brighter futures at home and across the globe.
          </p>

          <div
            className="enter-up mt-11 flex flex-wrap items-center gap-4"
            style={{ animationDelay: '0.85s' }}
          >
            <a
              href="#focus"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-leaf-500 px-8 py-4 font-semibold text-navy-950 transition-colors hover:bg-leaf-400"
            >
              <span className="relative z-10">Explore our work</span>
              <Arrow className="relative z-10 h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" />
            </a>
            <a
              href="#foundation"
              className="inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5"
            >
              About the Foundation
            </a>
          </div>

          <div
            className="enter-up mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-navy-100/55"
            style={{ animationDelay: '1.05s' }}
          >
            <span className="flex items-center gap-2">
              <Dot /> Charitable, educational &amp; community
            </span>
            <span className="flex items-center gap-2">
              <Dot /> Independently governed
            </span>
          </div>
        </div>

        <div className="enter-scale relative lg:col-span-5" style={{ animationDelay: '0.45s' }}>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="absolute -inset-3 rounded-[2rem] border border-white/10" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] shadow-2xl shadow-navy-950/50">
              <Image
                src="/img/hero-community.webp"
                alt="Four people looking out over a city skyline at dusk"
                fill
                priority
                sizes="(max-width: 1023px) 92vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
            </div>

            <div className="animate-float absolute -bottom-7 -left-6 w-[16rem] rounded-2xl border border-white/10 bg-navy-950/85 p-5 backdrop-blur-md sm:-left-10">
              <p className="eyebrow text-leaf-400">In partnership with</p>
              <p className="mt-3 font-display text-lg leading-snug font-semibold text-white">
                Mosaic · Lincoln City FC
              </p>
              <p className="mt-2 text-sm leading-snug text-navy-100/60">
                and organisations like them
              </p>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#foundation"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[11px] tracking-[0.3em] text-white/45 uppercase lg:flex"
      >
        Scroll
        <span className="relative block h-12 w-px overflow-hidden bg-white/15">
          <span className="animate-scroll-cue absolute inset-x-0 block h-6 bg-leaf-400" />
        </span>
      </a>
    </section>
  )
}

function Dot() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full bg-leaf-500" />
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M1 8h13M9 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
