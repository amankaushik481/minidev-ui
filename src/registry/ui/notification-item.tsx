"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { RelativeTime } from "@/registry/ui/relative-time"
function NotificationItem({ title, body, date, unread, className }: { title: string; body: string; date: string | Date; unread?: boolean; className?: string }) {
  return (
    <div data-slot="notification-item" className={cn("flex gap-3 border-b border-border px-3 py-3", unread && "bg-accent/5", className)}>
      <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", unread ? "bg-accent" : "bg-transparent")} aria-hidden />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-fg">{title}</p>
          <RelativeTime date={date} />
        </div>
        <p className="mt-0.5 text-xs text-fg-muted">{body}</p>
      </div>
    </div>
  )
}
export { NotificationItem }
