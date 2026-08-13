import { lazy, Suspense } from 'react'

// three.js is the heaviest thing on the page — keep it out of the first paint.
const LeafScene = lazy(() =>
  import('./LeafScene').then((m) => ({ default: m.LeafScene })),
)

export function LazyLeafScene({ className = '' }: { className?: string }) {
  return (
    <Suspense fallback={null}>
      <LeafScene className={className} />
    </Suspense>
  )
}
