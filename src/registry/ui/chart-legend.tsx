"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type LegendItem = { label: string; color?: string }

/** A row of colour swatches and series names to sit under a chart. */
type ChartLegendProps = {
  /** Series to list. Colors fall back to accent, success, warning and danger in turn. */
  items?: LegendItem[]
  className?: string
}

const SAMPLE_ITEMS: LegendItem[] = [
  { label: "Revenue" },
  { label: "Collected" },
  { label: "Outstanding" },
  { label: "Refunded" },
]

function ChartLegend({ items = SAMPLE_ITEMS, className }: ChartLegendProps) {
  const fallback = ["var(--accent)", "var(--success)", "var(--warning)", "var(--danger)"]
  return (
    <ul data-slot="chart-legend" className={cn("flex flex-wrap gap-3", className)}>
      {items.map((item, i) => (
        <li key={item.label} className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
          <span className="size-2 rounded-sm" style={{ background: item.color ?? fallback[i % fallback.length] }} aria-hidden />
          {item.label}
        </li>
      ))}
    </ul>
  )
}
export { ChartLegend }
export type { ChartLegendProps, LegendItem as ChartLegendItem }
