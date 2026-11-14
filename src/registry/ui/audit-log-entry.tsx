"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { RelativeTime } from "@/registry/ui/relative-time"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

/**
 * One line of an audit log: who did what to which record, with a relative timestamp.
 *
 * Use for a single event; stack several in `AuditTrail`. Prefer `ActivityFeed` for casual
 * "recent activity" without exact times. The timestamp is a `<time datetime>` for machines.
 *
 * @example
 * <AuditLogEntry actor="Maya Chen" action="approved refund on" target="INV-2041" date="2026-11-14T09:12:00Z" />
 */
type AuditLogEntryProps = {
  /** Who did it; initials are derived for the avatar. */
  actor?: string
  /** What they did, written to follow the name ("archived invoice"). */
  action?: string
  /** The record acted on, shown emphasised after the action. */
  target?: string
  /** When it happened. Defaults to about two hours ago. */
  date?: string | Date
  className?: string
}

const SAMPLE_AGE_MS = 2 * 60 * 60 * 1000
// Floored to the minute so the server and client render the same sample timestamp.
const flooredNow = () => Math.floor(Date.now() / 60_000) * 60_000

function AuditLogEntry({
  actor = "Priya Raman",
  action = "archived invoice INV-2038 for Northwind",
  target,
  date,
  className,
}: AuditLogEntryProps) {
  const when = React.useMemo(() => date ?? new Date(flooredNow() - SAMPLE_AGE_MS), [date])
  return (
    <div
      data-slot="audit-log-entry"
      className={cn(
        "flex items-start gap-3 border-b border-border px-3 py-2.5 last:border-b-0",
        className
      )}
    >
      <Avatar className="size-7">
        <AvatarFallback aria-hidden>{actor.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()}</AvatarFallback>
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
