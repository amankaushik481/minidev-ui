"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** RelativeTime — a time element that reads "3h ago" and carries the exact ISO timestamp for machines. */

// A fixed offset from now, floored to the minute so server and client agree.
function minutesAgo(minutes: number) {
  return new Date(Math.floor(Date.now() / 60000) * 60000 - minutes * 60000)
}

type RelativeTimeProps = {
  /** The instant to describe. Defaults to three hours ago. */
  date?: string | Date
  className?: string
}

function RelativeTime({ date, className }: RelativeTimeProps) {
  const d = React.useMemo(() => (date == null ? minutesAgo(180) : typeof date === "string" ? new Date(date) : date), [date])
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
export type { RelativeTimeProps }
