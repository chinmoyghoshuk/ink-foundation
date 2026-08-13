const WORDS = [
  'Read',
  'Belong',
  'Grow',
  'Imagine',
  'Learn',
  'Thrive',
  'Create',
  'Together',
]

function Leaf({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M20 4c0 8.5-4.8 13-11 13H5c0-8.3 4.9-13 11-13h4Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M4 21c2-6.5 6-10.2 11.5-12.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function Marquee() {
  const row = [...WORDS, ...WORDS]
  return (
    <div className="relative overflow-hidden border-y border-navy-900/10 bg-sand py-5">
      <div className="flex w-max animate-marquee items-center">
        {row.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center">
            <span className="px-8 font-display text-2xl font-medium tracking-tight text-navy-900/75 sm:text-3xl">
              {word}
            </span>
            <Leaf className="h-4 w-4 shrink-0 text-leaf-500" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-sand to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-sand to-transparent" />
    </div>
  )
}
