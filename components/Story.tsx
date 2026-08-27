import Image from 'next/image'
import { AmbientVideo } from './AmbientVideo'
import { Reveal } from './Reveal'

const PILLARS = [
  {
    title: 'Investing in people',
    body: 'Education, skills and mentoring — along with the practical costs that quietly decide who gets to continue and who does not.',
  },
  {
    title: 'Supporting worthwhile causes',
    body: 'Funding for organisations already doing the work well, chosen on merit and reviewed against evidence rather than profile.',
  },
  {
    title: 'Partnering on shared values',
    body: 'Long-term relationships with institutions whose standards match our own, at home and internationally.',
  },
]

export function Story() {
  return (
    <section id="foundation" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <AmbientVideo
            src="/video/foundation.mp4"
            className="aspect-[4/3] rounded-[1.6rem] shadow-xl shadow-navy-950/10"
          >
            <Image
              src="/img/foundation-poster.webp"
              alt="Hands settling a young plant into a bed of soil"
              fill
              sizes="(max-width: 1023px) 92vw, 46vw"
              className="object-cover"
            />
          </AmbientVideo>

          <div className="absolute -right-4 -bottom-12 hidden w-[42%] overflow-hidden rounded-[1.4rem] border-4 border-cream shadow-xl shadow-navy-950/10 sm:block">
            <div className="relative aspect-[4/3]">
              <Image
                src="/img/global-village.webp"
                alt="A riverside village surrounded by dense green forest"
                fill
                sizes="22vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf-100 blur-3xl" />
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow text-leaf-600">The Foundation</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.06] font-semibold tracking-[-0.025em]">
              The heart of our commitment to giving back.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 text-lg leading-relaxed text-navy-900/70">
              The PEN Group Foundation was created to support charitable, educational and
              community-focused initiatives around the world. It reflects our belief that success
              carries a responsibility to create opportunities for others.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-lg leading-relaxed text-navy-900/70">
              By investing in people, supporting worthwhile causes and partnering with organisations
              that share our values, we aim to deliver lasting social impact — and help build
              brighter futures for communities both at home and across the globe.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="mt-5 text-lg leading-relaxed text-navy-900/70">
              We are the charitable organisation of{' '}
              <a
                href="https://www.pengroup.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-leaf-600 underline decoration-leaf-500/40 underline-offset-4 transition-colors hover:decoration-leaf-500"
              >
                PEN Group Holdings
              </a>
              , which underwrites our running costs so that public donations go only to programmes.
            </p>
          </Reveal>

          <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-navy-900/10">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.3 + i * 0.07}>
                <div className="group flex gap-5 bg-white/60 px-6 py-6 transition-colors hover:bg-leaf-100/70">
                  <span className="mt-1 font-display text-sm font-semibold text-leaf-600 tabular-nums">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{pillar.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-navy-900/60">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
