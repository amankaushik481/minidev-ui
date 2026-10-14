"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AreaChart } from "@/registry/ui/area-chart"

/** A KPI card with a big number, a coloured delta and a trend sparkline bleeding off the bottom edge. */
type StatWithSparklineProps = {
  label?: string
  value?: string
  /** A signed delta such as "+12.4%"; a leading minus turns the card red. */
  delta?: string
  /** Trend points, oldest first. Defaults to twelve months of Lumen revenue. */
  points?: number[]
  className?: string
}

const SAMPLE_POINTS = [62, 68, 66, 74, 79, 77, 85, 90, 96, 101, 108, 118]

function StatWithSparkline({
  label = "Monthly revenue",
  value = "$128,400",
  delta = "+12.4%",
  points = SAMPLE_POINTS,
  className,
}: StatWithSparklineProps) {
  const up = delta ? !/^[-−▼]/.test(delta.trim()) : true
  return (
    <div data-slot="stat-with-sparkline" className={cn("w-full max-w-xs overflow-hidden rounded-xl border border-border bg-surface shadow-raised", className)}>
      <div className="p-4 pb-0">
        <p className="text-[0.8125rem] text-fg-muted">{label}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-medium tabular-nums tracking-[-0.025em] text-fg">{value}</p>
          {delta ? <span className={cn("text-xs font-medium tabular-nums", up ? "text-success" : "text-danger")}>{delta}</span> : null}
        </div>
      </div>
      <AreaChart data={points} grid={false} tone={up ? "accent" : "danger"} highlight={points.length - 1} className="mt-2 h-12" label={`${label} trend`} />
    </div>
  )
}
export { StatWithSparkline }
export type { StatWithSparklineProps }
