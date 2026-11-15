"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AreaChart } from "@/registry/ui/area-chart"

/**
 * A KPI card with a big number, a coloured delta and a trend sparkline bleeding off the bottom edge.
 *
 * Exported as `StatWithSparkline`. Use it for one headline metric with its trend; use StatCard
 * without a chart, and SparklineSet for a grid of several. Set `invert` when down is good.
 *
 * @example
 * <StatWithSparkline label="MRR" value="$48,200" delta="+8.2%" points={[31, 34, 33, 38, 41, 48]} />
 */
type StatWithSparklineProps = {
  /** Metric name. */
  label?: string
  /** Pre-formatted value, e.g. "$128,400". */
  value?: string
  /** A signed delta such as "+12.4%"; a leading minus turns the card red (green with `invert`). */
  delta?: string
  /** Down is good (latency, churn): a leading minus shows green and anything else red. Defaults to false. */
  invert?: boolean
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
  invert = false,
  className,
}: StatWithSparklineProps) {
  const up = delta ? !/^[-−▼]/.test(delta.trim()) : true
  // No delta keeps the neutral accent line, even with invert.
  const good = !delta || up !== invert
  return (
    <div data-slot="stat-with-sparkline" className={cn("w-full max-w-xs overflow-hidden rounded-xl border border-border bg-surface shadow-raised", className)}>
      <div className="p-4 pb-0">
        <p className="text-sm text-fg-muted">{label}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-medium tabular-nums tracking-[-0.025em] text-fg">{value}</p>
          {delta ? <span className={cn("text-xs font-medium tabular-nums", good ? "text-success" : "text-danger")}>{delta}</span> : null}
        </div>
      </div>
      <AreaChart data={points} grid={false} tone={good ? "accent" : "danger"} highlight={points.length - 1} className="mt-2 h-12" label={`${label} trend`} />
    </div>
  )
}
// alias: the house rule says exports are PascalCase of the file name
export { StatWithSparkline, StatWithSparkline as StatSparkline }
export type { StatWithSparklineProps }
