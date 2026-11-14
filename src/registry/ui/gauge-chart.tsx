"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * GaugeChart — a half-circle dial filled to a percentage of `max`, with the percentage inside and a caption below.
 *
 * Use for one bounded score (health, quota, NPS-style index). For a full ring
 * use `DonutChart`; for a goal ring with a target use `GoalRing`; for a
 * linear labelled bar use `Meter`.
 *
 * @example
 * <GaugeChart value={72} label="Uptime score" />
 * <GaugeChart value={41} max={50} label="Seats" />
 */
type GaugeChartProps = {
  /** Current value, clamped to 0..max. */
  value: number
  /** Value that fills the dial. */
  max?: number
  /** Caption under the dial; also used in the accessible name. */
  label?: string
  className?: string
}

function GaugeChart({ value, max = 100, label = "Gauge", className }: GaugeChartProps) {
  const pct = max > 0 ? Math.max(0, Math.min(1, value / max)) : 0
  const shown = Math.round(pct * 100)
  const r = 40
  const c = Math.PI * r
  const dash = pct * c
  return (
    <div data-slot="gauge-chart" className={cn("inline-flex flex-col items-center", className)}>
      <svg role="img" aria-label={`${label}: ${shown}%`} viewBox="0 0 100 60" className="h-20 w-36">
        <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="var(--sunken)" strokeWidth="8" strokeLinecap="round" />
        {/* A round cap on a zero-length arc would still draw a dot. */}
        {dash > 0 ? (
          <path
            d="M10 50 A40 40 0 0 1 90 50"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c - dash}`}
          />
        ) : null}
        <text x="50" y="48" textAnchor="middle" className="fill-fg tabular-nums" style={{ fontSize: 14, fontWeight: 500 }}>
          {shown}%
        </text>
      </svg>
      <span aria-hidden className="text-xs text-fg-muted">
        {label}
      </span>
    </div>
  )
}
export { GaugeChart }
export type { GaugeChartProps }
