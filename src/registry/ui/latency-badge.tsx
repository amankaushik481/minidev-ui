"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * LatencyBadge — a small monospace badge for a response time, coloured fast, slow or very slow.
 *
 * Under `fast` ms is success, under `slow` ms is warning, anything above is
 * danger. Use it in endpoint lists, traces and status tables. For a trend over
 * time use StatSparkline, and for a waterfall of spans use TraceWaterfall.
 *
 * @example
 * <LatencyBadge ms={182} />
 * <LatencyBadge ms={950} thresholds={{ fast: 300, slow: 1000 }} />
 */
type LatencyBadgeProps = {
  /** Response time in milliseconds. */
  ms: number
  /** Upper bounds in ms for the success and warning colours. Defaults to 100 and 400. */
  thresholds?: { fast: number; slow: number }
  className?: string
}

const TONE = {
  fast: "text-success",
  slow: "text-[color-mix(in_oklch,var(--warning)_70%,var(--fg))]",
  "very-slow": "text-danger",
} as const

function LatencyBadge({ ms, thresholds = { fast: 100, slow: 400 }, className }: LatencyBadgeProps) {
  const speed = ms < thresholds.fast ? "fast" : ms < thresholds.slow ? "slow" : "very-slow"
  return (
    <span
      data-slot="latency-badge"
      data-speed={speed}
      className={cn(
        "inline-flex h-5 items-center rounded-md border border-border bg-sunken px-1.5 font-mono text-[11px] tabular-nums",
        TONE[speed],
        className
      )}
    >
      {Math.round(ms)}
      <abbr title="milliseconds" className="no-underline">ms</abbr>
    </span>
  )
}
export { LatencyBadge }
export type { LatencyBadgeProps }
