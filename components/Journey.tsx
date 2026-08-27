import Image from 'next/image'
import { Arrow } from './Hero'
import { JourneyTrack } from './JourneyTrack'
import { Reveal } from './Reveal'

const STEPS = [
  {
    n: '01',
    title: 'A cause is proposed',
    body: 'Partners, employees and community organisations put causes forward. Every proposal is assessed against the same published criteria, whoever it comes from.',
    image: '/img/meeting-room.webp',
    alt: 'A group discussing a proposal around a table',
  },
  {
    n: '02',
    title: 'We assess and commit',
    body: 'Trustees review need, governance and evidence of delivery — then commit for a defined period, so a partner can plan around the funding rather than reapply for it.',
    image: '/img/event-mingle.webp',
    alt: 'People in conversation at a partner gathering',
  },
  {
    n: '03',
    title: 'Partners deliver',
    body: 'The work is run by organisations already established in the community. We fund them, support them, and stay out of the way of people who know what they are doing.',
    image: '/img/volunteers-garden.webp',
    alt: 'Two volunteers with tools at an outdoor project',
  },
  {
    n: '04',
    title: 'We measure and publish',
    body: 'Outcomes are tracked against what was promised and reported in full each year — whether the numbers flatter us or not.',
    image: '/img/partners-event.webp',
    alt: 'A large group gathered at an annual partner event',
  },
]

export function Journey() {
  return (
    <section
      id="impact"
      className="relative overflow-hidden bg-sand py-24 lg:h-screen lg:overflow-hidden lg:py-0"
    >
      <div className="container-x flex h-full flex-col justify-center">
        <div className="lg:pt-24">
          <Reveal>
            <p className="eyebrow text-leaf-600">How support becomes impact</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.06] font-semibold tracking-[-0.025em]">
              From commitment to outcome, in four steps.
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-14 lg:mt-16">
          <JourneyTrack>
            {STEPS.map((step) => (
              <article
                key={step.n}
                className="group w-[80vw] shrink-0 snap-center overflow-hidden rounded-[1.6rem] bg-white shadow-lg shadow-navy-950/5 sm:w-[26rem] lg:w-[30rem]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 639px) 80vw, 480px"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <span className="absolute bottom-0 left-0 bg-navy-900 px-5 py-2 font-display text-sm font-semibold tracking-[0.15em] text-leaf-400">
                    {step.n}
                  </span>
                </div>
                <div className="p-7 sm:p-8">
                  <h3 className="font-display text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-navy-900/60">{step.body}</p>
                </div>
              </article>
            ))}

            <a
              href="#involved"
              className="group flex w-[80vw] shrink-0 snap-center flex-col justify-between rounded-[1.6rem] bg-navy-900 p-8 text-white sm:w-[26rem] lg:w-[30rem]"
            >
              <div>
                <p className="eyebrow text-leaf-400">And then?</p>
                <h3 className="mt-6 font-display text-[clamp(1.7rem,2.4vw,2.2rem)] leading-tight font-semibold tracking-[-0.02em]">
                  Success carries a responsibility to create opportunities for others.
                </h3>
                <p className="mt-5 text-[15px] leading-relaxed text-navy-100/60">
                  That belief decides everything the Foundation funds — and everyone we choose to
                  fund it alongside.
                </p>
              </div>
              <span className="mt-10 inline-flex items-center gap-3 font-semibold text-leaf-400">
                Work with us
                <Arrow className="h-4 w-4" />
              </span>
            </a>
          </JourneyTrack>

          <div className="mt-8 hidden h-px w-full bg-navy-900/10 lg:mt-12 lg:block">
            <div
              data-journey-progress
              className="h-px w-full origin-left scale-x-0 bg-leaf-500"
              aria-hidden="true"
            />
          </div>
          <p className="mt-6 text-sm text-navy-900/40 lg:hidden">Swipe to follow the process →</p>
        </div>
      </div>
    </section>
  )
}
