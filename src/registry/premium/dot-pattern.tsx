"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A background of dots or grid lines drawn as one SVG pattern, faded at the edges, with an optional glow that lights the pattern under the pointer.
 *
 * The pattern sits behind your children with pointer-events off. The glow
 * writes CSS variables on pointer move, so React never re-renders while it
 * follows; it is off for reduced motion. Use it as a quiet section or hero
 * backdrop; for animated texture use FlickeringGrid, for a reactive grid of
 * boxes use BackgroundBoxes.
 *
 * @example
 * <DotPattern variant="grid" gap={24} className="h-[420px]">
 *   <h2 className="text-3xl text-fg">Every pixel, accounted for</h2>
 * </DotPattern>
 */
type DotPatternProps = {
  /** Dots at each cell centre, or hairline grid lines. */
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
  const spot = "radial-gradient(160px circle at var(--dp-x, -999px) var(--dp-y, -999px), black, transparent)"
  return (
    <div
      ref={ref}
      data-slot="dot-pattern"
      onPointerMove={(e) => {
        const el = ref.current
        if (!glow || reduce || !el) return
        const r = el.getBoundingClientRect()
        el.style.setProperty("--dp-x", `${e.clientX - r.left}px`)
        el.style.setProperty("--dp-y", `${e.clientY - r.top}px`)
        el.style.setProperty("--dp-on", "1")
      }}
      onPointerLeave={() => ref.current?.style.setProperty("--dp-on", "0")}
      className={cn("relative isolate h-[320px] w-full overflow-hidden rounded-2xl border border-border bg-bg", className)}
    >
      <svg aria-hidden className="pointer-events-none absolute inset-0 -z-10 size-full" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        <defs>
          {pattern("base")}
          {pattern("lit")}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id}-b)`} />
      </svg>
      {glow && !reduce ? (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 size-full opacity-[var(--dp-on,0)] transition-opacity duration-200"
          style={{ maskImage: spot, WebkitMaskImage: spot }}
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
