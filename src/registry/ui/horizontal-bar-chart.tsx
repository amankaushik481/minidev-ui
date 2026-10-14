"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** Labelled horizontal bars scaled to the largest value, for ranking categories at a glance. */
type Bar = { label: string; value: number }

const SAMPLE_DATA: Bar[] = [
  { label: "Northwind", value: 124 },
  { label: "Acme Robotics", value: 98 },
  { label: "Umbrella", value: 87 },
  { label: "Initech", value: 64 },
  { label: "Globex", value: 52 },
  { label: "Stark Industrial", value: 41 },
  { label: "Wayne Freight", value: 33 },
  { label: "Hooli", value: 18 },
]

type HorizontalBarChartProps = {
  /** One bar per entry, in display order. Defaults to invoices per customer. */
  data?: Bar[]
  className?: string
  /** Accessible name for the chart. */
  label?: string
}

function HorizontalBarChart({
  data = SAMPLE_DATA,
  className,
  label = "Horizontal bar chart",
}: HorizontalBarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div data-slot="horizontal-bar-chart" role="img" aria-label={label} className={cn("w-full max-w-sm space-y-2", className)}>
      {data.map((d) => (
        <div key={d.label} className="grid grid-cols-[88px_1fr_40px] items-center gap-2">
          <span className="truncate text-xs text-fg-muted">{d.label}</span>
          <div className="h-2 overflow-hidden rounded-full bg-sunken">
            <div className="h-full rounded-full bg-accent" style={{ width: `${(d.value / max) * 100}%` }} />
          </div>
          <span className="text-right text-xs tabular-nums text-fg">{d.value}</span>
        </div>
      ))}
    </div>
  )
}
export { HorizontalBarChart }
export type { HorizontalBarChartProps, Bar as HorizontalBar }
