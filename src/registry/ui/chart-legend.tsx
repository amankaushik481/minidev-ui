"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A row of colour swatches and series names to sit under a chart.
 *
 * Pass the same colours your chart uses so the key matches. Swatches are decorative; the label carries the meaning.
 * Use inside ChartCard below the chart.
 *
 * @example
 * <ChartLegend items={[{ label: "Revenue", color: "var(--accent)" }, { label: "Refunds", color: "var(--danger)" }]} />
 */
type ChartLegendProps = {
  /** Series to list. Colors fall back to accent, success, warning and danger in turn. */
  items?: LegendItem[]
  /** Accessible name for the list. Defaults to "Legend". */
  label?: string
  className?: string
}

type LegendItem = {
  /** Series name. Also the React key, so keep it unique. */
  label: string
  /** Any CSS colour, ideally a token such as "var(--accent)". */
  color?: string
}

const SAMPLE_ITEMS: LegendItem[] = [
  { label: "Revenue" },
  { label: "Collected" },
  { label: "Outstanding" },
  { label: "Refunded" },
]

const FALLBACK = ["var(--accent)", "var(--success)", "var(--warning)", "var(--danger)"]

function ChartLegend({ items = SAMPLE_ITEMS, label = "Legend", className }: ChartLegendProps) {
  return (
    <ul data-slot="chart-legend" aria-label={label} className={cn("flex flex-wrap gap-3", className)}>
      {items.map((item, i) => (
        <li key={item.label} className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
          <span className="size-2 shrink-0 rounded-sm" style={{ background: item.color ?? FALLBACK[i % FALLBACK.length] }} aria-hidden />
          {item.label}
        </li>
      ))}
    </ul>
  )
}
export { ChartLegend }
export type { ChartLegendProps, LegendItem as ChartLegendItem }
