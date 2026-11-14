"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * DonutChart — a single value as a ring filled to a percentage of `max`, with the percentage in the centre.
 *
 * Use for one ratio at a glance (storage used, goal reached). For several
 * slices use `PieChart`; for concentric rings use `RadialChart`; for a half
 * dial use `GaugeChart`; for a labelled linear bar use `Meter` or `Progress`.
 *
 * @example
 * <DonutChart value={68} label="Seats used" />
 * <DonutChart value={3.4} max={5} label="Storage, GB" />
 */
type DonutChartProps = {
  /** Current value, clamped to 0..max. */
  value: number
  /** Value that fills the ring. */
  max?: number
  className?: string
  /** What the value measures. Used in the accessible name, e.g. "Seats used: 68%". */
  label?: string
}

function DonutChart({ value, max = 100, className, label = "Donut" }: DonutChartProps) {
  const pct = max > 0 ? Math.max(0, Math.min(1, value / max)) : 0
  const shown = Math.round(pct * 100)
  const r = 36
  const c = 2 * Math.PI * r
  const dash = pct * c
  return (
    <svg data-slot="donut-chart" role="img" aria-label={`${label}: ${shown}%`} viewBox="0 0 96 96" className={cn("size-24", className)}>
      <circle cx="48" cy="48" r={r} fill="none" stroke="var(--sunken)" strokeWidth="10" />
      {/* A round cap on a zero-length arc would still draw a dot. */}
      {dash > 0 ? (
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          transform="rotate(-90 48 48)"
        />
      ) : null}
      <text x="48" y="52" textAnchor="middle" className="fill-fg font-medium tabular-nums" style={{ fontSize: 14 }}>
        {shown}%
      </text>
    </svg>
  )
}
export { DonutChart }
export type { DonutChartProps }
