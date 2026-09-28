"use client"
import { Button } from "@/registry/ui/button"
import { Badge } from "@/registry/ui/badge"
import { cn } from "@/lib/utils"

const SEATS = [
  { name: "Aman Kaushik", email: "aman@minidev.pro", role: "Owner" },
  { name: "Sam Rivera", email: "sam@acme.co", role: "Admin" },
  { name: "Lee Park", email: "lee@north.io", role: "Member" },
]

function SeatManager({ className }: { className?: string }) {
  return (
    <div data-slot="seat-manager" className={cn("overflow-hidden rounded-2xl border border-border bg-surface shadow-highlight", className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h3 className="text-sm font-medium text-fg">Seats</h3>
          <p className="text-xs text-fg-muted">3 of 10 used</p>
        </div>
        <Button size="sm">Invite</Button>
      </div>
      <ul>
        {SEATS.map((s) => (
          <li key={s.email} className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 last:border-b-0">
            <div>
              <p className="text-sm font-medium text-fg">{s.name}</p>
              <p className="text-xs text-fg-muted">{s.email}</p>
            </div>
            <Badge variant="outline">{s.role}</Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}
export { SeatManager }
