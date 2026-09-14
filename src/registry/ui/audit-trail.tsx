"use client"
import { AuditLogEntry } from "@/registry/ui/audit-log-entry"
import { cn } from "@/lib/utils"
function AuditTrail({
  entries,
  className,
}: {
  entries: { id: string; actor: string; action: string; time: string; target?: string }[]
  className?: string
}) {
  return (
    <div data-slot="audit-trail" className={cn("rounded-xl border border-border px-3", className)}>
      {entries.map((e) => (
        <AuditLogEntry key={e.id} actor={e.actor} action={e.action} date={e.time} target={e.target} />
      ))}
    </div>
  )
}
export { AuditTrail }
