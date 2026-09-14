"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { RelativeTime } from "@/registry/ui/relative-time"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

function AuditLogEntry({
  actor,
  action,
  target,
  date = new Date().toISOString(),
  className,
}: {
  actor: string
  action: string
  target?: string
  date?: string | Date
  className?: string
}) {
  return (
    <div
      data-slot="audit-log-entry"
      className={cn(
        "flex items-start gap-3 border-b border-border px-3 py-2.5 last:border-b-0",
        className
      )}
    >
      <Avatar className="size-7">
        <AvatarFallback>{actor.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-fg">
          <span className="font-medium">{actor}</span>{" "}
          <span className="text-fg-muted">{action}</span>
          {target ? <> <span className="font-medium text-fg">{target}</span></> : null}
        </p>
        <p className="mt-0.5 text-xs text-fg-muted"><RelativeTime date={date} /></p>
      </div>
    </div>
  )
}
export { AuditLogEntry }
