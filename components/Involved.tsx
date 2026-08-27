import Image from 'next/image'
import { Arrow } from './Arrow'
import { NewsletterForm } from './NewsletterForm'
import { Reveal } from './Reveal'

const WAYS = [
  {
    title: 'Partner',
    body: 'For organisations whose work overlaps with ours: education, community, sport or international development. Tell us what you are trying to do and what stands in the way.',
    image: '/img/partner-talk.webp',
    alt: 'Two colleagues in conversation beside a bright office window',
    cta: 'Start a conversation',
  },
  {
    title: 'Volunteer',
    body: 'Mentor, coach, sit on a panel, or lend a professional skill our partners would otherwise have to buy. A few hours a month is genuinely useful.',
    image: '/img/volunteers-tee.webp',
    alt: 'Volunteers at a community event',
    cta: 'Find a role',
  },
  {
    title: 'Fundraise',
    body: 'Workplace schemes, events, matched giving and legacies. We will help you set it up and account for every pound it raises.',
    image: '/img/community-together.webp',
    alt: 'A group of people sitting together looking out over the water',
    cta: 'Get the details',
  },
]

export function Involved() {
  return (
    <section id="involved" className="bg-cream py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow text-leaf-600">Get involved</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.06] font-semibold tracking-[-0.025em]">
              There is more than one way to be useful.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {WAYS.map((way, i) => (
            <Reveal key={way.title} delay={i * 0.08}>
              <a
                href="mailto:hello@pengroupfoundation.org"
                className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-navy-900/10 bg-white transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={way.image}
                    alt={way.alt}
                    fill
                    sizes="(max-width: 767px) 92vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-2xl font-semibold">{way.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-navy-900/60">
                    {way.body}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 font-medium text-leaf-600">
                    {way.cta}
                    <Arrow className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-20 grid items-center gap-10 rounded-[1.8rem] bg-navy-900 px-8 py-12 text-white sm:px-12 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight font-semibold tracking-[-0.02em]">
                Four updates a year. Nothing else, ever.
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-navy-100/65">
                Where the money went, which commitments were made, and what the organisations we
                fund managed to do with it.
              </p>
            </div>

            <NewsletterForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
