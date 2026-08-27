import Image from 'next/image'
import { AmbientVideo } from './AmbientVideo'
import { RevealWords } from './RevealWords'

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy-950 pt-28 pb-16 sm:pb-20 lg:pb-24"
    >
      <div className="absolute inset-0 -z-20">
        <AmbientVideo src="/video/hero.mp4" className="h-full w-full">
          <Image
            src="/img/hero-poster.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </AmbientVideo>
      </div>

      {/* Legibility: a floor the copy sits on, plus a wash from the left edge. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/30" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/85 via-navy-950/35 to-transparent" />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <h1 className="font-display text-[clamp(2.8rem,6.8vw,5.4rem)] leading-[1.03] font-semibold tracking-[-0.03em] text-white">
            <RevealWords text="Success carries" />
            <br className="hidden sm:block" />
            <RevealWords text="a responsibility." delay={0.18} highlight={['responsibility']} />
          </h1>

          <p
            className="enter-up mt-8 max-w-xl text-lg leading-relaxed text-navy-100/80"
            style={{ animationDelay: '0.7s' }}
          >
            The PEN Group Foundation supports charitable, educational and community-focused
            initiatives around the world, investing in people, backing worthwhile causes and
            building brighter futures at home and across the globe.
          </p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute right-8 bottom-16 hidden flex-col items-center gap-3 text-[11px] tracking-[0.3em] text-white/40 uppercase lg:flex"
      >
        Scroll
        <span className="relative block h-12 w-px overflow-hidden bg-white/15">
          <span className="animate-scroll-cue absolute inset-x-0 block h-6 bg-leaf-400" />
        </span>
      </span>
    </section>
  )
}
