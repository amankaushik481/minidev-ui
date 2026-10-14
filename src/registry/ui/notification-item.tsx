"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { RelativeTime } from "@/registry/ui/relative-time"

/** NotificationItem — one row of a notification list: title, body, relative time and an unread dot. */

// A fixed offset from now, floored to the minute so server and client agree.
function minutesAgo(minutes: number) {
  return new Date(Math.floor(Date.now() / 60000) * 60000 - minutes * 60000)
}

type NotificationItemProps = {
  title?: string
  body?: string
  /** When it happened. Defaults to 42 minutes ago. */
  date?: string | Date
  unread?: boolean
  className?: string
}

function NotificationItem({
  title = "Invoice INV-2041 paid",
  body = "Northwind paid $12,400.00 by bank transfer. Funds settle in two business days.",
  date,
  unread,
  className,
}: NotificationItemProps) {
  const when = React.useMemo(() => date ?? minutesAgo(42), [date])
  return (
    <div data-slot="notification-item" className={cn("flex gap-3 border-b border-border px-3 py-3", unread && "bg-accent/5", className)}>
      <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", unread ? "bg-accent" : "bg-transparent")} aria-hidden />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-fg">{title}</p>
          <RelativeTime date={when} />
        </div>
        <p className="mt-0.5 text-xs text-fg-muted">{body}</p>
      </div>
    </div>
  )
}
export { NotificationItem }
export type { NotificationItemProps }
