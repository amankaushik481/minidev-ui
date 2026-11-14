"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A short beam of light that travels around the border of any box to mark the one thing that matters.
 *
 * Wrap a card, input or pricing tier with it. The beam is a rotating conic
 * gradient masked to the border ring, so the content inside is untouched; it
 * animates transform only and holds still for reduced motion. Set `radius` to
 * match the child's corner radius. For light flowing between elements use
 * AnimatedBeam; for a static highlight use a `border-accent` ring.
 *
 * @example
 * <BorderBeam radius={12} duration={8}>
 *   <Card className="w-80">…</Card>
 * </BorderBeam>
 */
type BorderBeamProps = {
  children?: React.ReactNode
  /** Seconds per lap. */
  duration?: number
  /** Border width in pixels. */
  width?: number
  /** Beam length, as a fraction of the lap, 0 to 1. */
  length?: number
  /** Corner radius in pixels; match the wrapped element. */
  radius?: number
  className?: string
}

function BorderBeam({ children, duration = 6, width = 1.5, length = 0.18, radius = 18, className }: BorderBeamProps) {
  const reduce = useReducedMotion()
  const deg = Math.round(length * 360)
  return (
    <div data-slot="border-beam" className={cn("relative isolate w-fit max-w-full", className)} style={{ borderRadius: radius }}>
      {/* The spinner is centred by Tailwind's `translate` property, so the keyframes rotate only. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          borderRadius: radius,
          padding: width,
          WebkitMask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
          mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
        }}
      >
        <span
          className="absolute top-1/2 left-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, transparent ${360 - deg}deg, var(--accent-2) ${360 - deg * 0.6}deg, var(--accent) 356deg, transparent 360deg)`,
            animation: reduce ? undefined : `border-beam-spin ${duration}s linear infinite`,
          }}
        />
      </span>
      {children ?? (
        <div className="w-[340px] max-w-full rounded-[inherit] border border-border bg-surface p-6 shadow-raised">
          <p className="text-[12px] font-medium tracking-[0.06em] text-accent-fg uppercase">Most popular</p>
          <p className="mt-2 text-3xl font-medium tracking-[-0.04em] text-fg tabular-nums">$24<span className="text-base text-fg-muted"> / month</span></p>
          <p className="mt-2 text-sm leading-[1.6] text-fg-muted">Everything in Starter, plus unlimited projects and priority support.</p>
        </div>
      )}
      <style>{`@keyframes border-beam-spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

export { BorderBeam }
export type { BorderBeamProps }
