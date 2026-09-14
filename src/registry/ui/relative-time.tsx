"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function RelativeTime({
  date,
  className,
}: {
  date: string | Date
  className?: string
}) {
  const d = typeof date === "string" ? new Date(date) : date
  const diff = Date.now() - d.getTime()
  const mins = Math.max(0, Math.floor(diff / 60000))
  let label = "just now"
  if (mins >= 60 * 24) label = `${Math.floor(mins / (60 * 24))}d ago`
  else if (mins >= 60) label = `${Math.floor(mins / 60)}h ago`
  else if (mins >= 1) label = `${mins}m ago`
  return (
    <time
      data-slot="relative-time"
      dateTime={d.toISOString()}
      className={cn("text-xs text-fg-muted tabular-nums", className)}
      title={d.toLocaleString()}
    >
      {label}
    </time>
  )
}
export { RelativeTime }
