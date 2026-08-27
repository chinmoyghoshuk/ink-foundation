import Image from 'next/image'
import { AmbientVideo } from './AmbientVideo'
import { PartnerMark } from './Partners'
import { Reveal } from './Reveal'
import { PARTNERS } from '@/lib/partners'

const INITIATIVES = [
  {
    partner: PARTNERS[0],
    heading: 'Opening doors that qualifications alone do not',
    body: 'We back mentoring that connects people in under-served communities with role models drawn from business and the professions — the kind of relationship that turns ambition into a plausible next step.',
    points: ['Mentor recruitment', 'Employability workshops', 'Multi-year funding'],
    video: '/video/campus.mp4',
    poster: '/img/campus-poster.webp',
    alt: 'Students walking together across a university campus',
  },
  {
    partner: PARTNERS[1],
    heading: 'A club is the shortest route to a community',
    body: 'Football clubs reach people no foundation could reach on its own. We support community work built around the club — sport, health and education programmes delivered by people the city already trusts.',
    points: ['Youth participation', 'Health & wellbeing', 'Facilities and kit'],
    video: '/video/football.mp4',
    poster: '/img/football-poster.webp',
    alt: 'A floodlit five-a-side match on a community pitch at dusk',
  },
]

export function Initiatives() {
  return (
    <section id="initiatives" className="bg-cream py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow text-leaf-600">Who we work with</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.06] font-semibold tracking-[-0.025em]">
                Partnering with organisations that share our values.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="max-w-sm text-[15px] leading-relaxed text-navy-900/55">
              We fund organisations already established where they work, and commit for long enough
              that they can plan around it.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {INITIATIVES.map((initiative, i) => (
            <Reveal key={initiative.partner.name} delay={i * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-navy-900/10 bg-white">
                <AmbientVideo src={initiative.video} className="aspect-[16/9]">
                  <Image
                    src={initiative.poster}
                    alt={initiative.alt}
                    fill
                    sizes="(max-width: 1023px) 92vw, 560px"
                    className="object-cover"
                  />
                </AmbientVideo>

                <div className="flex flex-1 flex-col p-8 sm:p-10">
                  <PartnerMark partner={initiative.partner} />

                  <h3 className="mt-8 font-display text-[clamp(1.35rem,2vw,1.7rem)] leading-tight font-semibold tracking-[-0.015em]">
                    {initiative.heading}
                  </h3>
                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-navy-900/60">
                    {initiative.body}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {initiative.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full border border-navy-900/12 px-4 py-1.5 text-[13px] text-navy-900/55"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-2xl text-[15px] leading-relaxed text-navy-900/50">
            We are always glad to hear from organisations whose work overlaps with ours.{' '}
            <a
              href="#involved"
              className="font-medium text-leaf-600 underline decoration-leaf-500/40 underline-offset-4 transition-colors hover:decoration-leaf-500"
            >
              Start a conversation
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  )
}
