"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * HorizontalBarChart — labelled horizontal bars scaled to the largest value, for ranking categories at a glance.
 *
 * Use it for top-N lists with long labels (customers, pages, endpoints). For
 * values over time use BarChart or AreaChart, and for parts of a whole use
 * StackedBarChart or DonutChart.
 *
 * @example
 * <HorizontalBarChart label="Invoices by customer" data={[{ label: "Northwind", value: 124 }, { label: "Globex", value: 52 }]} />
 */
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
  /** Formats the value shown at the end of each bar. Defaults to the plain number. */
  format?: (value: number) => string
  className?: string
  /** Accessible name for the chart. */
  label?: string
}

function HorizontalBarChart({
  data = SAMPLE_DATA,
  format = String,
  className,
  label = "Horizontal bar chart",
}: HorizontalBarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    // A list, not role="img": screen readers read every label and value.
    <ul data-slot="horizontal-bar-chart" aria-label={label} className={cn("w-full max-w-sm space-y-2", className)}>
      {data.map((d, i) => (
        <li key={`${d.label}-${i}`} className="grid grid-cols-[88px_1fr_40px] items-center gap-2">
          <span className="truncate text-xs text-fg-muted" title={d.label}>{d.label}</span>
          <div aria-hidden className="h-2 overflow-hidden rounded-full bg-sunken">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-500 ease-hairline motion-reduce:transition-none"
              style={{ width: `${(Math.max(0, d.value) / max) * 100}%` }}
            />
          </div>
          <span className="text-right text-xs tabular-nums text-fg">{format(d.value)}</span>
        </li>
      ))}
    </ul>
  )
}
export { HorizontalBarChart }
export type { HorizontalBarChartProps, Bar as HorizontalBar }
