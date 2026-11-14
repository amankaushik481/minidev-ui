"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A status-page uptime strip: one bar per day, red where there was downtime, with the uptime percentage.
 *
 * `downtimes` holds zero-based day indexes counted from the oldest day. Use `HealthIndicator` for a single live status, and `IncidentBanner` to announce an ongoing outage.
 *
 * @example
 * <UptimeBar label="Payments API" days={90} downtimes={[12, 44]} />
 */
type UptimeBarProps = {
  /** Service name. */
  label?: string
  /** Number of days shown, oldest on the left. */
  days?: number
  /** Indexes (0 = oldest day) of days with downtime. */
  downtimes?: number[]
  className?: string
}

function UptimeBar({ label = "API", days = 90, downtimes = [12, 44], className }: UptimeBarProps) {
  const down = new Set(downtimes.filter((d) => d >= 0 && d < days))
  const uptime = days > 0 ? (((days - down.size) / days) * 100).toFixed(2) : "100.00"
  return (
    <div data-slot="uptime-bar" className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-fg">{label}</span>
        <span className="tabular-nums text-fg-muted">{uptime}%</span>
      </div>
      <div
        className="flex gap-px"
        role="img"
        aria-label={`${label}: ${uptime}% uptime over ${days} days, ${down.size} ${down.size === 1 ? "day" : "days"} with downtime`}
      >
        {Array.from({ length: days }, (_, i) => (
          <div key={i} className={cn("h-8 flex-1 rounded-[1px]", down.has(i) ? "bg-danger" : "bg-success")} title={down.has(i) ? "Degraded" : "Operational"} />
        ))}
      </div>
    </div>
  )
}
export { UptimeBar }
export type { UptimeBarProps }
