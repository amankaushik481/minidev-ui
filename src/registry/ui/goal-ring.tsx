"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * GoalRing — a circular progress ring for one goal, with the percentage in the centre and a caption below.
 *
 * Use it for a single target read at a glance (weekly goal, quota met). For a
 * linear bar use Progress, for a bounded measurement use Meter, and for several
 * values in one ring use RadialChart.
 *
 * @example
 * <GoalRing value={72} label="Weekly goal" />
 */
type GoalRingProps = {
  /** Progress from 0 to 100. Values outside the range are clamped. */
  value?: number
  /** Caption under the ring; also the accessible name. */
  label?: string
  className?: string
}

function GoalRing({ value = 72, label = "Weekly goal", className }: GoalRingProps) {
  const r = 36
  const c = 2 * Math.PI * r
  const pct = Math.round(Math.min(100, Math.max(0, value)))
  return (
    <div data-slot="goal-ring" className={cn("inline-flex flex-col items-center gap-2", className)}>
      <svg width="96" height="96" viewBox="0 0 96 96" role="img" aria-label={`${label}: ${pct}%`}>
        <circle cx="48" cy="48" r={r} fill="none" className="stroke-sunken" strokeWidth="8" />
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          className="stroke-accent transition-[stroke-dashoffset] duration-500 ease-hairline motion-reduce:transition-none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
          transform="rotate(-90 48 48)"
        />
        <text x="48" y="54" textAnchor="middle" aria-hidden className="fill-fg font-medium tabular-nums" style={{ fontSize: 16 }}>
          {pct}%
        </text>
      </svg>
      <p aria-hidden className="text-xs text-fg-muted">{label}</p>
    </div>
  )
}
export { GoalRing }
export type { GoalRingProps }
