"use client"
import * as React from "react"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function MetricDelta({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const up = value >= 0
  return (
    <span
      data-slot="metric-delta"
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
        up ? "text-success" : "text-danger",
        className
      )}
    >
      {up ? <ArrowUpIcon className="size-3" /> : <ArrowDownIcon className="size-3" />}
      {Math.abs(value)}%
    </span>
  )
}
export { MetricDelta }
