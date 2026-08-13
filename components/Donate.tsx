import Image from 'next/image'
import { Reveal } from './Reveal'
import { DonatePanel } from './DonatePanel'

export function Donate() {
  return (
    <section id="donate" className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
        <Image
          src="/img/leaf-heart.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_20%_20%,rgba(5,39,78,0.75),#04203f_70%)]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-leaf-500/15 blur-[120px]" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow text-leaf-400">Give</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
              Turn a page into a chapter.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-navy-100/70">
              Every public donation goes straight into programmes — our core costs are covered
              separately, so the number you give is the number that arrives.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-10 space-y-4 text-[15px] text-navy-100/65">
              {[
                'Cancel or change a monthly gift any time',
                'Gift Aid adds 25p to every £1 for UK taxpayers',
                'Annual impact report published in full',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <DonatePanel />
        </Reveal>
      </div>
    </section>
  )
}

function Check({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <path
        d="M6 10.3 8.7 13 14 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
