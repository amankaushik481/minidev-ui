"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
function SessionList({
  sessions,
  className,
}: {
  sessions: { id: string; device: string; location: string; current?: boolean }[]
  className?: string
}) {
  return (
    <div data-slot="session-list" className={cn("divide-y divide-border rounded-xl border border-border", className)}>
      {sessions.map((s) => (
        <div key={s.id} className="flex items-center justify-between gap-3 px-3 py-3 text-sm">
          <div>
            <p className="font-medium text-fg">
              {s.device} {s.current ? <span className="text-xs text-accent">(this device)</span> : null}
            </p>
            <p className="text-xs text-fg-muted">{s.location}</p>
          </div>
          {!s.current ? (
            <Button size="sm" variant="outline">
              Revoke
            </Button>
          ) : null}
        </div>
      ))}
    </div>
  )
}
export { SessionList }
