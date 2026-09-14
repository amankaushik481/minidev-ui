"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function CoverageMeter({
  label = "Line coverage",
  value = 86,
  className,
}: {
  label?: string
  value?: number
  className?: string
}) {
  const tone = value >= 80 ? "bg-success" : value >= 60 ? "bg-warning" : "bg-danger"
  return (
    <div data-slot="coverage-meter" className={cn("space-y-1.5", className)}>
      <div className="flex justify-between text-xs">
        <span className="font-medium text-fg">{label}</span>
        <span className="tabular-nums text-fg">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-sunken" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className={cn("h-full rounded-full", tone)} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
export { CoverageMeter }
