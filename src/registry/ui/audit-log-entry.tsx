"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { RelativeTime } from "@/registry/ui/relative-time"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

/** One line of an audit log: who did what to which record, with a relative timestamp. */
type AuditLogEntryProps = {
  actor?: string
  action?: string
  target?: string
  /** When it happened. Defaults to about two hours ago. */
  date?: string | Date
  className?: string
}

const SAMPLE_AGE_MS = 2 * 60 * 60 * 1000

function AuditLogEntry({
  actor = "Priya Raman",
  action = "archived invoice INV-2038 for Northwind",
  target,
  date,
  className,
}: AuditLogEntryProps) {
  const when = React.useMemo(() => date ?? new Date(Date.now() - SAMPLE_AGE_MS), [date])
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
        <p className="mt-0.5 text-xs text-fg-muted"><RelativeTime date={when} /></p>
      </div>
    </div>
  )
}
export { AuditLogEntry }
export type { AuditLogEntryProps }
