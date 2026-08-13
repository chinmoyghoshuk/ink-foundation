import { logoSvg } from './brand-logo'
import { markSvg } from './brand-mark'

type Props = {
  /** Sets the height; the SVG keeps its own aspect ratio. */
  className?: string
  label?: string
}

/**
 * The logo is traced vector art inlined into the page. Its navy strokes are
 * filled with `currentColor`, so the colour is inherited from whatever wraps
 * it, and the leaf reads `--logo-leaf` (see `.logo-on-dark`).
 *
 * Keep these in server components: the traced paths are ~70 kB of string and
 * have no business in the client bundle.
 */
function Inline({ svg, className = '', label }: Props & { svg: string }) {
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-block [&>svg]:block [&>svg]:h-full [&>svg]:w-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

/** Full lockup: wordmark, "GROUP FOUNDATION" and the heart rule. */
export function LogoLockup(props: Props) {
  return <Inline svg={logoSvg} {...props} />
}

/** Compact mark: wordmark and leaf only, for the nav bar. */
export function LogoMark(props: Props) {
  return <Inline svg={markSvg} {...props} />
}
