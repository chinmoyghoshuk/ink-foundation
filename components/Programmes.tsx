import Image from 'next/image'
import { Reveal } from './Reveal'

const PROGRAMMES = [
  {
    tag: 'Literacy',
    title: 'Reading Rooms',
    body: 'Bright, stocked, properly staffed reading spaces inside schools and community hubs — open after the bell and through the holidays.',
    image: '/img/library.webp',
    alt: 'A reader browsing tall library shelves',
  },
  {
    tag: 'Books',
    title: 'Book Bundles',
    body: 'Six books a year that a child chooses and keeps. Not a loan, not a shared copy — the first shelf of their own library.',
    image: '/img/books.webp',
    alt: 'A stack of brightly coloured books',
  },
  {
    tag: 'Environment',
    title: 'Learning Gardens',
    body: 'Outdoor classrooms where lessons happen among growing things, and where every school leaves a greener street behind it.',
    image: '/img/forest.webp',
    alt: 'Sunlight falling through tall green trees',
  },
  {
    tag: 'Opportunity',
    title: 'Bright Futures',
    body: 'Bursaries that quietly cover the things that stop a bright student: uniforms, travel, exam fees, a laptop that works.',
    image: '/img/graduation.webp',
    alt: 'Graduates throwing their caps into the air',
  },
]

export function Programmes() {
  return (
    <section id="programmes" className="relative bg-navy-900 py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_0%,rgba(137,167,72,0.16),transparent_60%)]" />

      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow text-leaf-400">What we fund</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.06] font-semibold tracking-[-0.025em]">
                Four programmes. One long-term promise.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="max-w-sm text-[15px] leading-relaxed text-navy-100/60">
              Each programme is costed, published and reviewed every year — so you can see exactly
              what your gift holds up.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {PROGRAMMES.map((programme, i) => (
            <Reveal key={programme.title} delay={i * 0.07}>
              <article className="group relative h-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-navy-950/40">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={programme.image}
                    alt={programme.alt}
                    fill
                    sizes="(max-width: 639px) 92vw, (max-width: 1239px) 46vw, 570px"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-transparent" />
                  <span className="absolute top-5 left-5 rounded-full bg-navy-950/70 px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] text-leaf-400 uppercase backdrop-blur-sm">
                    {programme.tag}
                  </span>
                </div>

                <div className="relative p-7 sm:p-8">
                  <h3 className="font-display text-2xl font-semibold">{programme.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-navy-100/65">
                    {programme.body}
                  </p>
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
