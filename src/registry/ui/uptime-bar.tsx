"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function UptimeBar({
  label = "API",
  days = 90,
  downtimes = [12, 44],
  className,
}: {
  label?: string
  days?: number
  downtimes?: number[]
  className?: string
}) {
  const cells = Array.from({ length: days }, (_, i) => downtimes.includes(i))
  return (
    <div data-slot="uptime-bar" className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-fg">{label}</span>
        <span className="tabular-nums text-fg-muted">{(((days - downtimes.length) / days) * 100).toFixed(2)}%</span>
      </div>
      <div className="flex gap-px" role="img" aria-label={`${label} uptime over ${days} days`}>
        {cells.map((down, i) => (
          <div
            key={i}
            className={cn("h-8 flex-1 rounded-[1px]", down ? "bg-danger" : "bg-success/70")}
            title={down ? "Degraded" : "Operational"}
          />
        ))}
      </div>
    </div>
  )
}
export { UptimeBar }
