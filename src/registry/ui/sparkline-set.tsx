"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AreaChart } from "@/registry/ui/area-chart"
import { MetricDelta } from "@/registry/ui/metric-delta"

/** A grid of KPI cards, each with a value, a delta and a small area sparkline, for dashboard overviews. */
type SparklineItem = { label: string; value: string; delta: number; data: number[] }

type SparklineSetProps = {
  /** One card per metric. Defaults to Lumen's revenue, customer and churn trends. */
  items?: SparklineItem[]
  className?: string
}

// Deltas colour by sign, so the sample sticks to metrics where up is good.
const SAMPLE_ITEMS: SparklineItem[] = [
  { label: "Revenue", value: "$128,400", delta: 12.4, data: [62, 68, 66, 74, 79, 77, 85, 90, 96, 101, 108, 118] },
  { label: "Active customers", value: "1,284", delta: 3.1, data: [920, 948, 970, 1004, 1012, 1060, 1088, 1120, 1150, 1210, 1246, 1284] },
  { label: "Invoices sent", value: "312", delta: -4.6, data: [180, 196, 210, 205, 228, 240, 236, 255, 270, 284, 327, 312] },
]

function SparklineSet({ items = SAMPLE_ITEMS, className }: SparklineSetProps) {
  return (
    <div data-slot="sparkline-set" className={cn("grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-border bg-surface p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-fg-muted">{item.label}</span>
            <MetricDelta value={item.delta} />
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
