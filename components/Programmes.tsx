import Image from 'next/image'
import { Reveal } from './Reveal'

const FOCUS_AREAS = [
  {
    tag: 'Education',
    title: 'Education & skills',
    body: 'Scholarships, bursaries, vocational training and apprenticeships, together with the practical costs that decide whether someone finishes what they started.',
    image: '/img/skills-workshop.webp',
    alt: 'Trainees working at a metalwork bench in a vocational workshop',
  },
  {
    tag: 'Community',
    title: 'Community & wellbeing',
    body: 'The local organisations that hold a neighbourhood together: food provision, health, advice and the ordinary spaces people rely on when things go wrong.',
    image: '/img/volunteers-pack.webp',
    alt: 'Volunteers packing supplies into bags at a community centre',
  },
  {
    tag: 'Sport',
    title: 'Sport & youth development',
    body: 'Sport as a route into discipline, belonging and opportunity, delivered through clubs and coaches already trusted in the places they serve.',
    image: '/img/sport-pitch.webp',
    alt: 'A floodlit football pitch at night',
  },
  {
    tag: 'Global',
    title: 'Global outreach',
    body: 'International programmes in the regions where the Group operates, run with partners who know the ground and are accountable to the people on it.',
    image: '/img/global-women.webp',
    alt: 'Women talking together in a rural community',
  },
]

export function Programmes() {
  return (
    <section id="focus" className="relative bg-navy-900 py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_0%,rgba(137,167,72,0.16),transparent_60%)]" />

      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow text-leaf-400">What we support</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.06] font-semibold tracking-[-0.025em]">
                Four areas. One standard.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="max-w-sm text-[15px] leading-relaxed text-navy-100/60">
              Every commitment is assessed on evidence, governed independently, and reviewed against
              what it set out to achieve.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {FOCUS_AREAS.map((area, i) => (
            <Reveal key={area.title} delay={i * 0.07}>
              <article className="group relative h-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-navy-950/40">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.alt}
                    fill
                    sizes="(max-width: 639px) 92vw, (max-width: 1239px) 46vw, 570px"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-transparent" />
                  <span className="absolute top-5 left-5 rounded-full bg-navy-950/70 px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] text-leaf-400 uppercase backdrop-blur-sm">
                    {area.tag}
                  </span>
                </div>

                <div className="relative p-7 sm:p-8">
                  <h3 className="font-display text-2xl font-semibold">{area.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-navy-100/65">{area.body}</p>
                  <span className="mt-7 block h-px w-10 bg-leaf-500 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-20" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
