"use client"
import * as React from "react"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * MetricDelta — a small arrow and percentage showing how a metric moved, green for good and red for bad.
 *
 * Positive values point up, negative point down, zero is neutral with no arrow.
 * Set `invert` for metrics where down is good (latency, churn, cost). Screen readers
 * hear "Up 12%" or "Down 3%". Use it inside StatCard or a KPI row.
 *
 * @example
 * <MetricDelta value={12.4} />
 * <MetricDelta value={-8} invert />  // latency fell: shown green
 */
type MetricDeltaProps = {
  /** Change in percent. 12 means +12%. The sign sets the arrow. */
  value: number
  /** Down is good: negative values turn green and positive values red. */
  invert?: boolean
  className?: string
}

function MetricDelta({ value, invert = false, className }: MetricDeltaProps) {
  const dir = value > 0 ? "up" : value < 0 ? "down" : "flat"
  const good = dir === "flat" ? null : (dir === "up") !== invert
  return (
    <span
      data-slot="metric-delta"
      data-direction={dir}
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
        good === null ? "text-fg-muted" : good ? "text-success" : "text-danger",
        className
      )}
    >
      {dir === "up" ? <ArrowUpIcon aria-hidden className="size-3" /> : dir === "down" ? <ArrowDownIcon aria-hidden className="size-3" /> : null}
      <span className="sr-only">{dir === "up" ? "Up " : dir === "down" ? "Down " : "No change, "}</span>
      {Math.abs(value)}%
    </span>
  )
}
export { MetricDelta }
export type { MetricDeltaProps }
