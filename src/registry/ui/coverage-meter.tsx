"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A labelled bar for a percentage score such as test coverage, coloured green, amber or red by thresholds.
 *
 * Use on CI, repo and quality dashboards. It is a `role="meter"`, so screen readers hear the label and percent.
 * For usage against a limit use UsageMeter or QuotaBar; for task progress use Progress.
 *
 * @example
 * <CoverageMeter label="Branch coverage" value={72} good={80} warn={60} />
 */
type CoverageMeterProps = {
  /** What is measured. Defaults to "Line coverage". */
  label?: string
  /** Percent, 0-100. Values outside are clamped. */
  value?: number
  /** At or above this the bar is green. Defaults to 80. */
  good?: number
  /** At or above this (and below `good`) the bar is amber; below it, red. Defaults to 60. */
  warn?: number
  className?: string
}

function CoverageMeter({ label = "Line coverage", value = 86, good = 80, warn = 60, className }: CoverageMeterProps) {
  const id = React.useId()
  const v = Math.min(100, Math.max(0, value))
  const shown = Math.round(v * 10) / 10
  const tone = v >= good ? "bg-success" : v >= warn ? "bg-warning" : "bg-danger"
  return (
    <div data-slot="coverage-meter" className={cn("space-y-1.5", className)}>
      <div className="flex justify-between text-xs">
        <span id={id} className="font-medium text-fg">
          {label}
        </span>
        <span aria-hidden className="tabular-nums text-fg">
          {shown}%
        </span>
      </div>
      <div
        role="meter"
        aria-labelledby={id}
        aria-valuenow={shown}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${shown}%`}
        className="h-2 overflow-hidden rounded-full bg-sunken"
      >
        <div className={cn("h-full rounded-full", tone)} style={{ width: `${v}%` }} />
      </div>
    </div>
  )
}
export { CoverageMeter }
export type { CoverageMeterProps }
