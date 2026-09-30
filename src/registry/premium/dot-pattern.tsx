"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A background of dots or grid lines drawn as one SVG pattern, faded at the
 * edges, with an optional glow that follows the pointer and lights the
 * pattern beneath it. Sits behind content with pointer-events off.
 */
type DotPatternProps = {
  variant?: "dots" | "grid"
  /** Cell size in pixels. */
  gap?: number
  /** Dot radius or line width. */
  weight?: number
  /** Light the pattern under the pointer. */
  glow?: boolean
  /** Fade the edges with a radial mask. */
  fade?: boolean
  className?: string
  children?: React.ReactNode
}

function DotPattern({ variant = "dots", gap = 18, weight = 1, glow = true, fade = true, className, children }: DotPatternProps) {
  const reduce = useReducedMotion()
  const id = React.useId().replace(/:/g, "")
  const ref = React.useRef<HTMLDivElement>(null)
  const [p, setP] = React.useState<{ x: number; y: number } | null>(null)
  const pattern = (color: string) => (
    <pattern id={`${id}-${color === "lit" ? "l" : "b"}`} width={gap} height={gap} patternUnits="userSpaceOnUse">
      {variant === "dots" ? (
        <circle cx={gap / 2} cy={gap / 2} r={weight} fill={color === "lit" ? "var(--accent)" : "var(--border-strong)"} />
      ) : (
        <path d={`M ${gap} 0 L 0 0 0 ${gap}`} fill="none" stroke={color === "lit" ? "var(--accent)" : "var(--border)"} strokeWidth={weight} />
      )}
    </pattern>
  )
  const mask = fade ? "radial-gradient(ellipse at center, black 30%, transparent 75%)" : undefined
  return (
    <div
      ref={ref}
      data-slot="dot-pattern"
      onPointerMove={(e) => {
        if (!glow || reduce) return
        const r = ref.current!.getBoundingClientRect()
        setP({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
      onPointerLeave={() => setP(null)}
      className={cn("relative isolate h-[320px] w-full overflow-hidden rounded-2xl border border-border bg-bg", className)}
    >
      <svg aria-hidden className="pointer-events-none absolute inset-0 -z-10 size-full" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        <defs>
          {pattern("base")}
          {pattern("lit")}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id}-b)`} />
      </svg>
      {glow && p ? (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 size-full"
          style={{ maskImage: `radial-gradient(160px circle at ${p.x}px ${p.y}px, black, transparent)`, WebkitMaskImage: `radial-gradient(160px circle at ${p.x}px ${p.y}px, black, transparent)` }}
        >
          <rect width="100%" height="100%" fill={`url(#${id}-l)`} />
        </svg>
      ) : null}
      {children ?? (
        <div className="grid h-full place-items-center text-center">
          <div>
            <p className="text-2xl font-medium tracking-[-0.035em] text-fg">Move your pointer</p>
            <p className="mt-1 text-sm text-fg-muted">The pattern lights up where you look.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export { DotPattern }
export type { DotPatternProps }
