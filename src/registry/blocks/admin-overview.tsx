"use client"
import { AdminStatStrip } from "@/registry/ui/admin-stat-strip"
import { ActivityFeed } from "@/registry/ui/activity-feed"
import { Button } from "@/registry/ui/button"

function AdminOverview() {
  return (
    <div data-slot="admin-overview" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-medium tracking-[-0.014em] text-fg">Admin overview</h3>
          <p className="mt-1 text-sm text-fg-muted">Org health, seats, and recent automation.</p>
        </div>
        <Button size="sm">Invite admin</Button>
      </div>
      <AdminStatStrip stats={[
        { label: "Seats", value: "42", delta: 4 },
        { label: "MRR", value: "$18k", delta: 9 },
        { label: "NPS", value: "62", delta: 3 },
        { label: "Churn", value: "1.2%", delta: -0.4 },
      ]} />
      <ActivityFeed items={[
        { id: "1", user: "Aman", action: "raised Premium craft bar", time: "2m" },
        { id: "2", user: "Ops", action: "passed audit gate", time: "14m" },
        { id: "3", user: "Agent", action: "thickened 15 blocks", time: "1h" },
      ]} />
    </div>
  )
}
export { AdminOverview }
