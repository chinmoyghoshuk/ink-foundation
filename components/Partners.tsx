import { PARTNERS } from '@/lib/partners'

/**
 * A quiet strip of the organisations the Foundation works with. Wordmarks are
 * typographic placeholders — set `logo` on a partner in lib/partners.ts and the
 * supplied artwork is used instead, at the same optical height.
 */
export function Partners() {
  return (
    <section id="partners" className="border-y border-navy-900/10 bg-sand py-10 sm:py-12">
      <div className="container-x flex flex-col items-center gap-8 text-center sm:gap-10">
        <p className="eyebrow text-navy-900/45">Working alongside</p>

        <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 sm:gap-x-20">
          {PARTNERS.map((partner) => (
            <li key={partner.name}>
              <PartnerMark partner={partner} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function PartnerMark({
  partner,
  className = '',
}: {
  partner: (typeof PARTNERS)[number]
  className?: string
}) {
  if (partner.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- partner artwork is
      // supplied at its own intrinsic size; we only constrain the height.
      <img
        src={partner.logo}
        alt={partner.name}
        className={`h-9 w-auto object-contain sm:h-11 ${className}`}
      />
    )
  }

  return (
    <span className={`block ${className}`}>
      <span className="block font-display text-xl font-semibold tracking-[0.14em] text-navy-900/70 uppercase sm:text-2xl">
        {partner.name}
      </span>
      {partner.kind && (
        <span className="mt-2 block text-[11px] tracking-[0.24em] text-navy-900/35 uppercase">
          {partner.kind}
        </span>
      )}
    </span>
  )
}
