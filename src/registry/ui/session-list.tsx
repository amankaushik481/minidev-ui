"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/** A list of signed-in devices with a revoke action on every session except the current one. */
type Session = { id: string; device: string; location: string; current?: boolean }

type SessionListProps = {
  /** Active sessions, most recent first. Defaults to Maya Chen's Lumen sessions. */
  sessions?: Session[]
  className?: string
}

const SAMPLE_SESSIONS: Session[] = [
  { id: "ses_01", device: "MacBook Pro · Chrome", location: "San Francisco, US · active now", current: true },
  { id: "ses_02", device: "iPhone 16 · Lumen for iOS", location: "San Francisco, US · 2 hours ago" },
  { id: "ses_03", device: "Windows · Edge", location: "Lagos, NG · yesterday" },
  { id: "ses_04", device: "iPad Air · Safari", location: "Chennai, IN · Mar 2, 2026" },
]

function SessionList({ sessions = SAMPLE_SESSIONS, className }: SessionListProps) {
  return (
    <div data-slot="session-list" className={cn("w-full max-w-md divide-y divide-border rounded-xl border border-border bg-surface", className)}>
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
export type { SessionListProps, Session }
