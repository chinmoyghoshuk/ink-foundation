/**
 * Word-by-word headline reveal — pure CSS, rendered on the server. Each word
 * is masked by its own overflow box and rises on the compositor, so the
 * headline is readable and animating with no JS involved at all.
 */
export function RevealWords({
  text,
  className,
  delay = 0,
  highlight = [],
}: {
  text: string
  className?: string
  delay?: number
  highlight?: string[]
}) {
  const words = text.split(' ')
  return (
    <span className={`word-rise ${className ?? ''}`}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.26em] inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <span
            className={
              highlight.includes(word.replace(/[^\w]/g, ''))
                ? 'inline-block text-leaf-400'
                : 'inline-block'
            }
            style={{ animationDelay: `${delay + i * 0.055}s` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}
