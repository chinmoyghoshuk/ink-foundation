import type { Partner } from '@/lib/partners'

/**
 * A partner's mark. Typographic until real artwork is supplied — set `logo` on
 * the partner in lib/partners.ts and the file is used instead, at the same
 * optical height. Partners appear only in the "Who we work with" section.
 */
export function PartnerMark({
  partner,
  className = '',
}: {
  partner: Partner
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
