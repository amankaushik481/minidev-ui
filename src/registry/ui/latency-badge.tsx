"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function LatencyBadge({
  ms,
  className,
}: {
  ms: number
  className?: string
}) {
  const tone = ms < 100 ? "text-success" : ms < 400 ? "text-warning" : "text-danger"
  return (
    <span
      data-slot="latency-badge"
      className={cn(
        "inline-flex h-5 items-center rounded-md border border-border bg-sunken px-1.5 font-mono text-[11px] tabular-nums",
        tone,
        className
      )}
    >
      {ms}ms
    </span>
  )
}
export { LatencyBadge }
