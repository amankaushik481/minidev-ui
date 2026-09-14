"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function Meter({
  value,
  max = 100,
  label,
  className,
}: {
  value: number
  max?: number
  label?: string
  className?: string
}) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.round((value / max) * 100))
  return (
    <div data-slot="meter" className={cn("space-y-1", className)}>
      {label ? <p className="text-xs text-fg-muted">{label}</p> : null}
      <div
        role="meter"
        aria-label={label ?? "Meter"}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="h-2 overflow-hidden rounded-full bg-sunken"
      >
        <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
export { Meter }
