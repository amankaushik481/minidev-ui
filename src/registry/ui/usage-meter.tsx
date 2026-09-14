"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Progress } from "@/registry/ui/progress"

function UsageMeter({
  label,
  used,
  limit,
  className,
}: {
  label: string
  used: number
  limit: number
  className?: string
}) {
  const id = React.useId()
  const pct = Math.min(100, Math.round((used / limit) * 100))
  return (
    <div data-slot="usage-meter" className={cn("space-y-1.5", className)}>
      <div className="flex justify-between text-xs">
        <span className="text-fg" id={id}>{label}</span>
        <span className="tabular-nums text-fg-muted">{used}/{limit}</span>
      </div>
      <Progress value={pct} aria-labelledby={id} />
    </div>
  )
}
export { UsageMeter }
