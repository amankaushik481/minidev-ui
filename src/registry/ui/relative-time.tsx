"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * RelativeTime — a time element that reads "3h ago" and carries the exact ISO timestamp for machines.
 *
 * Use it in feeds, comments, activity logs and table cells. Hover shows the full local date.
 * Set `live` to refresh the label every minute. Server and client may disagree by a minute, so
 * the text is hydration-safe. An invalid date renders nothing. For a fixed date use a formatted
 * string in a time element.
 *
 * @example
 * <RelativeTime date={comment.createdAt} />
 * <RelativeTime date="2026-11-14T09:30:00Z" live />
 */

// A fixed offset from now, floored to the minute so server and client agree.
function minutesAgo(minutes: number) {
  return new Date(Math.floor(Date.now() / 60000) * 60000 - minutes * 60000)
}

function relative(mins: number) {
  const day = 60 * 24
  if (mins >= day * 365) return `${Math.floor(mins / (day * 365))}y ago`
  if (mins >= day * 30) return `${Math.floor(mins / (day * 30))}mo ago`
  if (mins >= day) return `${Math.floor(mins / day)}d ago`
  if (mins >= 60) return `${Math.floor(mins / 60)}h ago`
  if (mins >= 1) return `${mins}m ago`
  return "just now"
}

type RelativeTimeProps = {
  /** The instant to describe: a Date or any string `new Date()` parses (ISO 8601 is safest). Defaults to three hours ago. */
  date?: string | Date
  /** Re-render once a minute so the label stays current. */
  live?: boolean
  className?: string
}

function RelativeTime({ date, live = false, className }: RelativeTimeProps) {
  const d = React.useMemo(() => (date == null ? minutesAgo(180) : typeof date === "string" ? new Date(date) : date), [date])
  const [now, setNow] = React.useState(() => Date.now())
  React.useEffect(() => {
    if (!live) return
    const id = setInterval(() => setNow(Date.now()), 60000)
    return () => clearInterval(id)
  }, [live])
  if (Number.isNaN(d.getTime())) return null
  const mins = Math.max(0, Math.floor((now - d.getTime()) / 60000))
  return (
    <time
      data-slot="relative-time"
      dateTime={d.toISOString()}
      className={cn("text-xs text-fg-muted tabular-nums", className)}
      title={d.toLocaleString()}
      suppressHydrationWarning
    >
      {relative(mins)}
    </time>
  )
}
export { RelativeTime }
export type { RelativeTimeProps }
