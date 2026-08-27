export type Partner = {
  /** Displayed as a wordmark until a real logo file is supplied. */
  name: string
  /**
   * Path to a logo in /public/partners (SVG preferred, transparent PNG fine).
   * When set it replaces the wordmark everywhere the partner appears.
   */
  logo?: string
  /** Optional second line under the wordmark in the partners strip. */
  kind?: string
  href?: string
}

/**
 * Organisations the Foundation works alongside.
 *
 * Descriptions are deliberately high-level: they say how the Foundation
 * engages, not what either organisation has committed to. Confirm the wording
 * with each partner before launch, and drop their supplied logo file into
 * /public/partners to replace the typographic wordmark.
 */
export const PARTNERS: Partner[] = [
  { name: 'Mosaic', kind: 'Mentoring' },
  { name: 'Lincoln City FC', kind: 'Community sport' },
]
