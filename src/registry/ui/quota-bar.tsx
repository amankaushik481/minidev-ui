"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * QuotaBar — a labelled usage meter that reads "used / max" and fills to the percentage.
 *
 * Use it on billing and usage pages for anything metered against a limit. The fill turns
 * warning at `warnAt` percent and danger once the limit is reached. For task progress toward a
 * finish use Progress; for many quotas at once use ResourceQuotaGrid.
 *
 * @example
 * <QuotaBar label="Seats" used={18} max={25} />
 * <QuotaBar label="Storage" used={46.2} max={50} format={(n) => `${n} GB`} />
 */

type QuotaBarProps = {
  /** What is being metered; also the meter's accessible name. */
  label?: string
  /** Amount consumed. */
  used?: number
  /** The limit. */
  max?: number
  /** Formats `used` and `max` for display. Defaults to en-US grouping, so server and client render the same text. */
  format?: (n: number) => string
  /** Percent at which the fill turns to the warning tone. */
  warnAt?: number
  className?: string
}

const en = new Intl.NumberFormat("en-US")

function QuotaBar({
  label = "API requests",
  used = 72400,
  max = 100000,
  format = (n: number) => en.format(n),
  warnAt = 90,
  className,
}: QuotaBarProps) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.round((used / max) * 100))
  const tone = pct >= 100 ? "bg-danger" : pct >= warnAt ? "bg-warning" : "bg-accent"
  const text = `${format(used)} / ${format(max)}`
  return (
    <div data-slot="quota-bar" className={cn("min-w-64 space-y-1.5", className)}>
      <div className="flex justify-between gap-3 text-xs">
        <span className="truncate font-medium text-fg">{label}</span>
        <span className="shrink-0 tabular-nums text-fg-muted">{text}</span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-sunken"
        role="meter"
        aria-label={label}
        aria-valuenow={Math.min(used, Math.max(max, 0))}
        aria-valuemin={0}
        aria-valuemax={Math.max(max, 0)}
        aria-valuetext={`${text}, ${pct}%`}
      >
        <div
          data-slot="quota-bar-fill"
          className={cn("h-full rounded-full transition-[width,background-color] duration-200 ease-hairline", tone)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
export { QuotaBar }
export type { QuotaBarProps }
