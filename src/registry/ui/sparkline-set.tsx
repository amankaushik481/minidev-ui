"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AreaChart } from "@/registry/ui/area-chart"
import { MetricDelta } from "@/registry/ui/metric-delta"

/**
 * A grid of KPI cards, each with a value, a delta and a small area sparkline, for dashboard overviews.
 *
 * Use it for 2 to 6 headline metrics. For one metric use StatSparkline or StatCard; for a single
 * flat row of numbers without charts use StatsStrip.
 *
 * @example
 * <SparklineSet items={[{ label: "Revenue", value: "$12,400", delta: 8.2, data: [4, 6, 5, 8, 9] }]} />
 */
type SparklineItem = {
  /** Metric name; also labels the chart for screen readers. */
  label: string
  /** Pre-formatted current value, e.g. "$128,400". */
  value: string
  /** Percent change; positive renders green, negative red (flipped by `invert`). */
  delta: number
  /** Down is good (churn, cost): a negative delta shows green and a positive one red. Defaults to false. */
  invert?: boolean
  /** Series for the sparkline, oldest first. */
  data: number[]
}

type SparklineSetProps = {
  /** One card per metric. Defaults to Lumen's revenue, customer and churn trends. */
  items?: SparklineItem[]
  className?: string
}

const SAMPLE_ITEMS: SparklineItem[] = [
  { label: "Revenue", value: "$128,400", delta: 12.4, data: [62, 68, 66, 74, 79, 77, 85, 90, 96, 101, 108, 118] },
  { label: "Active customers", value: "1,284", delta: 3.1, data: [920, 948, 970, 1004, 1012, 1060, 1088, 1120, 1150, 1210, 1246, 1284] },
  { label: "Churn", value: "2.1%", delta: -4.6, invert: true, data: [3.4, 3.3, 3.1, 3.2, 2.9, 2.8, 2.7, 2.6, 2.5, 2.3, 2.2, 2.1] },
]

function SparklineSet({ items = SAMPLE_ITEMS, className }: SparklineSetProps) {
  return (
    <div data-slot="sparkline-set" className={cn("grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-border bg-surface p-3 shadow-highlight">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-fg-muted">{item.label}</span>
            <MetricDelta value={item.delta} invert={item.invert} />
          </div>
          <p className="mt-1 text-lg font-medium tabular-nums text-fg">{item.value}</p>
          <AreaChart data={item.data} label={item.label} className="mt-2 h-16" />
        </div>
      ))}
    </div>
  )
}
export { SparklineSet }
export type { SparklineSetProps, SparklineItem }
