"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Badge } from "@/registry/ui/badge"
import { cn } from "@/lib/utils"

/**
 * SeatManager — a card listing workspace members with their roles, a seats-used count and an Invite button.
 *
 * Use it on billing and team settings pages. The "N of M used" line is computed from `seats`
 * and `limit`. For editing a member's role use RolePicker; for permissions use
 * RolePermissionMatrix.
 *
 * @example
 * <SeatManager seats={[{ name: "Maya Chen", email: "maya@lumen.app", role: "Owner" }]} limit={10} onInvite={openInvite} />
 */

type Seat = { name: string; email: string; role: string }

// Members of the Lumen workspace.
const SAMPLE_SEATS: Seat[] = [
  { name: "Maya Chen", email: "maya@lumen.app", role: "Owner" },
  { name: "Theo Okafor", email: "theo@lumen.app", role: "Admin" },
  { name: "Lee Park", email: "lee@lumen.app", role: "Member" },
]

function SeatManager({
  seats = SAMPLE_SEATS,
  limit = 10,
  onInvite,
  className,
}: {
  /** Members holding a seat, keyed by email. */
  seats?: Seat[]
  /** Seats the plan includes. */
  limit?: number
  /** Fires when Invite is pressed. The button disables once every seat is used. */
  onInvite?: () => void
  className?: string
}) {
  const full = seats.length >= limit
  return (
    <div data-slot="seat-manager" className={cn("overflow-hidden rounded-2xl border border-border bg-surface shadow-highlight", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <h3 className="text-sm font-medium text-fg">Seats</h3>
          <p className="text-xs tabular-nums text-fg-muted">
            {seats.length} of {limit} used
          </p>
        </div>
        <Button type="button" size="sm" onClick={onInvite} disabled={full}>
          Invite
        </Button>
      </div>
      <ul>
        {seats.map((s) => (
          <li key={s.email} className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 last:border-b-0">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-fg">{s.name}</p>
              <p className="truncate text-xs text-fg-muted">{s.email}</p>
            </div>
            <Badge variant="outline">{s.role}</Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}
export { SeatManager }
export type { Seat }
