const LEAVES = [
  { left: '6%', top: '14%', size: 52, dur: 15, delay: 0, tint: '#a7d16a', spin: -18, o: 0.3, blur: 1 },
  { left: '80%', top: '7%', size: 38, dur: 19, delay: -4, tint: '#c3dc93', spin: 24, o: 0.4, blur: 0 },
  { left: '64%', top: '33%', size: 26, dur: 13, delay: -8, tint: '#89a748', spin: -35, o: 0.5, blur: 0 },
  { left: '14%', top: '48%', size: 30, dur: 21, delay: -2, tint: '#a7d16a', spin: 12, o: 0.28, blur: 2 },
  { left: '90%', top: '56%', size: 46, dur: 17, delay: -11, tint: '#89a748', spin: -8, o: 0.35, blur: 1 },
  { left: '44%', top: '72%', size: 22, dur: 23, delay: -6, tint: '#c3dc93', spin: 30, o: 0.45, blur: 0 },
  { left: '4%', top: '80%', size: 34, dur: 16, delay: -14, tint: '#a7d16a', spin: -25, o: 0.3, blur: 2 },
  { left: '74%', top: '88%', size: 28, dur: 20, delay: -9, tint: '#89a748', spin: 16, o: 0.42, blur: 0 },
  { left: '32%', top: '20%', size: 18, dur: 25, delay: -17, tint: '#c3dc93', spin: -12, o: 0.35, blur: 0 },
]

/**
 * The hero backdrop on devices that do not get the WebGL scene. Pure CSS
 * keyframes, so it keeps drifting on the compositor even when the main thread
 * or requestAnimationFrame is starved.
 */
export function LeafFallback({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {LEAVES.map((leaf, i) => (
        <span
          key={i}
          className="animate-leaf-drift absolute block"
          style={{
            left: leaf.left,
            top: leaf.top,
            width: leaf.size,
            height: leaf.size,
            color: leaf.tint,
            opacity: leaf.o,
            filter: leaf.blur ? `blur(${leaf.blur}px)` : undefined,
            animationDuration: `${leaf.dur}s`,
            animationDelay: `${leaf.delay}s`,
            ['--leaf-spin' as string]: `${leaf.spin}deg`,
          }}
        >
          <svg viewBox="0 0 32 40" fill="none" className="h-full w-full">
            {/* almond leaf, echoing the sprig in the logo */}
            <path
              d="M16 1c9 7.5 13 14.6 13 21.2C29 31.4 23 39 16 39S3 31.4 3 22.2C3 15.6 7 8.5 16 1Z"
              fill="currentColor"
            />
            <path
              d="M16 6v29"
              stroke="#04203f"
              strokeOpacity="0.28"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ))}
    </div>
  )
}
