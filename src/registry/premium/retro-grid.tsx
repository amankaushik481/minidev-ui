"use client"
import * as React from "react"
import { useInView, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A retro perspective grid floor that recedes to a glowing horizon and scrolls slowly toward you.
 * Lines are tinted with the accent and fade out before they reach the
 * horizon, so they never shimmer. The floor sits behind the content, ignores
 * the pointer, pauses off screen and holds still for reduced motion.
 */
type RetroGridProps = {
  /** Tilt of the floor in degrees. Higher is flatter and longer. */
  angle?: number
  /** Size of one grid cell in pixels, at the front of the floor. */
  cellSize?: number
  /** Cells per second travelled toward the viewer. */
  speed?: number
  /** Where the floor meets the sky, as a percent of the height from the top. */
  horizon?: number
  className?: string
  children?: React.ReactNode
}

/** Camera distance in pixels. Short enough for a strong vanishing point. */
const DEPTH = 320
/** Length of the floor in pixels. Far enough that its end sits on the horizon. */
const FLOOR = 3200

function RetroGrid({ angle = 68, cellSize = 48, speed = 0.7, horizon = 56, className, children }: RetroGridProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "80px" })
  const tilt = Math.min(85, Math.max(30, angle))
  // A floor tilted by `tilt` vanishes DEPTH * cot(tilt) above the perspective origin,
  // so the origin is pushed down by that much to land the horizon where asked.
  const lift = DEPTH / Math.tan((tilt * Math.PI) / 180)
  const fade = `linear-gradient(to bottom, transparent ${horizon}%, black ${Math.min(100, horizon + 26)}%)`
  const lines = "linear-gradient(to right, var(--accent-line) 2px, transparent 2px), linear-gradient(to bottom, var(--accent-line) 2px, transparent 2px)"

  return (
    <div
      ref={ref}
      data-slot="retro-grid"
      className={cn("relative isolate h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-bg", className)}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(60% 34% at 50% ${horizon}%, var(--accent-soft), transparent 75%)` }}
        />
        <div
          className="absolute inset-x-0 h-px"
          style={{ top: `${horizon}%`, background: "linear-gradient(to right, transparent, var(--accent-line) 30%, var(--accent-line) 70%, transparent)" }}
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            perspective: DEPTH,
            perspectiveOrigin: `50% calc(${horizon}% + ${lift.toFixed(1)}px)`,
            maskImage: fade,
            WebkitMaskImage: fade,
          }}
        >
          <div
            className="absolute bottom-0 left-[-250%] w-[600%]"
            style={{ height: FLOOR, transformOrigin: "50% 100%", transform: `rotateX(${tilt}deg)` }}
          >
            <div
              data-slot="retro-grid-lines"
              className="absolute inset-x-0 bottom-0 will-change-transform"
              style={{
                top: -cellSize,
                backgroundImage: lines,
                backgroundSize: `${cellSize}px ${cellSize}px`,
                backgroundPosition: "50% 0",
                ["--retro-cell" as string]: `${cellSize}px`,
                animation: reduce || speed <= 0 ? undefined : `retro-grid-scroll ${(1 / speed).toFixed(3)}s linear infinite`,
                animationPlayState: inView ? "running" : "paused",
              }}
            />
          </div>
        </div>
      </div>
      <div className="relative z-10 h-full">
        {children ?? (
          <div className="flex h-full flex-col items-center gap-4 px-6 pt-10 text-center">
            <span className="rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-fg">
              Northwind deploys
            </span>
            <p className="max-w-[18ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">
              Every release, right on schedule
            </p>
            <Button>
              View pipeline
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
      <style>{`@keyframes retro-grid-scroll{to{transform:translateY(var(--retro-cell))}}`}</style>
    </div>
  )
}

export { RetroGrid }
export type { RetroGridProps }
