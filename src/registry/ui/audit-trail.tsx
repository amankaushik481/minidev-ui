"use client"
import * as React from "react"
import { AuditLogEntry } from "@/registry/ui/audit-log-entry"
import { cn } from "@/lib/utils"

/**
 * A bordered list of audit log entries, newest first, each with a relative timestamp.
 *
 * Use on security and admin pages to show who changed what. Pair it with `AuditFilterBar` above.
 * Prefer `ActivityFeed` for casual activity, and `DataTable` when the log needs paging and sorting.
 *
 * @example
 * <AuditTrail entries={[{ id: "1", actor: "Maya Chen", action: "approved refund on", target: "INV-2041", time: "2026-11-14T09:12:00Z" }]} />
 */
type AuditEntry = {
  /** Stable key for the row. */
  id: string
  /** Who did it. */
  actor: string
  /** What they did, written to follow the name. */
  action: string
  /** ISO timestamp (or anything `new Date()` parses). */
  time: string
  /** The record acted on, emphasised after the action. */
  target?: string
}

type AuditTrailProps = {
  /** Entries to show. Omit for a sample trail with times relative to now. */
  entries?: AuditEntry[]
  className?: string
}

/** Sample rows, as minutes ago; turned into ISO timestamps at render time so the relative labels stay fresh. */
const SAMPLE_ROWS: { id: string; actor: string; action: string; target?: string; minutesAgo: number }[] = [
  { id: "t1", actor: "Maya Chen", action: "approved refund on", target: "INV-2041", minutesAgo: 4 },
  { id: "t2", actor: "Theo Okafor", action: "deployed", target: "lumen-web v2.4.0", minutesAgo: 38 },
  { id: "t3", actor: "Priya Raman", action: "changed the role of", target: "Sam Lowe to Write", minutesAgo: 140 },
  { id: "t4", actor: "Sam Lowe", action: "exported customers to CSV", minutesAgo: 300 },
  { id: "t5", actor: "Ada Novak", action: "rotated the API key for", target: "Northwind", minutesAgo: 1560 },
]

// Floored to the minute so the server and client render the same sample timestamps.
const flooredNow = () => Math.floor(Date.now() / 60_000) * 60_000

function sampleEntries(now: number): AuditEntry[] {
  return SAMPLE_ROWS.map(({ minutesAgo, ...row }) => ({ ...row, time: new Date(now - minutesAgo * 60_000).toISOString() }))
}

function AuditTrail({ entries, className }: AuditTrailProps) {
  const list = React.useMemo(() => entries ?? sampleEntries(flooredNow()), [entries])
  return (
    <div data-slot="audit-trail" className={cn("w-full max-w-md rounded-xl border border-border px-3", className)}>
      {list.map((e) => (
        <AuditLogEntry key={e.id} actor={e.actor} action={e.action} date={e.time} target={e.target} />
      ))}
    </div>
  )
}
export { AuditTrail }
export type { AuditTrailProps, AuditEntry }
