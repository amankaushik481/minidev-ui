"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A 10-column grid of squares with the first `value` filled, for "42 of 100" style part-to-whole stats.
 *
 * Keep `total` at 100 or less so each square stays countable. Use `ProgressCircle` or `GoalRing` for a single percentage and `PieChart` for several parts.
 *
 * @example
 * <WaffleChart label="Invoices paid on time" value={42} total={100} />
 */
type WaffleChartProps = {
  /** Filled squares. Clamped to 0…total. */
  value?: number
  /** Total squares, ten per row. */
  total?: number
  /** Name of the stat; also the accessible name. */
  label?: string
  className?: string
}

function WaffleChart({ value = 42, total = 100, label = "Adoption", className }: WaffleChartProps) {
  const count = Math.max(0, Math.floor(total))
  const filled = Math.max(0, Math.min(count, Math.round(value)))
  return (
    <div data-slot="waffle-chart" className={cn("space-y-2", className)}>
      <div className="flex justify-between gap-3 text-xs">
        <span className="font-medium text-fg">{label}</span>
        <span className="tabular-nums text-fg-muted">
          {filled}/{count}
        </span>
      </div>
      <div className="grid grid-cols-10 gap-1" role="img" aria-label={`${label}: ${filled} of ${count}`}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className={cn("aspect-square rounded-[2px]", i < filled ? "bg-accent" : "bg-sunken")} />
        ))}
      </div>
    </div>
  )
}
export { WaffleChart }
export type { WaffleChartProps }
