"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** QuotaBar — a labelled usage meter that reads "used / max" and fills to the percentage. */

type QuotaBarProps = {
  label?: string
  used?: number
  max?: number
  className?: string
}

function QuotaBar({
  label = "API requests",
  used = 72400,
  max = 100000,
  className,
}: QuotaBarProps) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.round((used / max) * 100))
  return (
    <div data-slot="quota-bar" className={cn("min-w-64 space-y-1.5", className)}>
      <div className="flex justify-between text-xs">
        <span className="font-medium text-fg">{label}</span>
        <span className="tabular-nums text-fg-muted">{used.toLocaleString()} / {max.toLocaleString()}</span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-sunken"
        role="progressbar"
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full rounded-full bg-accent transition-[width] duration-[140ms]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
export { QuotaBar }
export type { QuotaBarProps }
