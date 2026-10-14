"use client"
import * as React from "react"
import { AuditLogEntry } from "@/registry/ui/audit-log-entry"
import { cn } from "@/lib/utils"

type AuditEntry = { id: string; actor: string; action: string; time: string; target?: string }

/** A bordered list of audit log entries, newest first, each with a relative timestamp. */
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

function sampleEntries(now: number): AuditEntry[] {
  return SAMPLE_ROWS.map(({ minutesAgo, ...row }) => ({ ...row, time: new Date(now - minutesAgo * 60_000).toISOString() }))
}

function AuditTrail({ entries, className }: AuditTrailProps) {
  const list = React.useMemo(() => entries ?? sampleEntries(Date.now()), [entries])
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
