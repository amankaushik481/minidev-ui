"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Progress } from "@/registry/ui/progress"

/**
 * One labelled usage bar with "used/limit" on the right, for seats, storage or API calls.
 *
 * The bar caps at 100%. Use `UsageBreakdown` for several resources, `TokenUsageMeter` for an LLM token budget card, and `Meter` for a value in a known range that is not usage.
 *
 * @example
 * <UsageMeter label="Seats" used={18} limit={25} />
 */
type UsageMeterProps = {
  /** Resource name; also labels the bar for screen readers. */
  label: string
  used: number
  limit: number
  className?: string
}

// Fixed locale so the server and the browser render the same digits.
const fmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 })

function UsageMeter({ label, used, limit, className }: UsageMeterProps) {
  const id = React.useId()
  const pct = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0
  return (
    <div data-slot="usage-meter" className={cn("space-y-1.5", className)}>
      <div className="flex justify-between gap-3 text-xs">
        <span className="text-fg" id={id}>
          {label}
        </span>
        <span className="tabular-nums text-fg-muted">
          {fmt.format(used)}/{fmt.format(limit)}
        </span>
      </div>
      <Progress value={pct} aria-labelledby={id} getAriaValueText={() => `${fmt.format(used)} of ${fmt.format(limit)}, ${pct}%`} />
    </div>
  )
}
export { UsageMeter }
export type { UsageMeterProps }
