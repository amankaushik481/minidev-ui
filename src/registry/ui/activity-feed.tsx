"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { ListItem } from "@/registry/ui/list-item"

/**
 * A compact feed of who did what, with avatars and timestamps, for dashboards and detail panes.
 *
 * Use for a short "recent activity" card. Prefer `AuditTrail` for compliance logs with exact
 * timestamps, and `Timeline` for a dated sequence of milestones. Renders as a list for screen readers.
 *
 * @example
 * <ActivityFeed items={[{ id: "1", user: "Maya Chen", action: "paid invoice INV-2041", time: "2m ago" }]} />
 */
type ActivityItem = {
  /** Stable key for the row. */
  id: string
  /** Who did it; initials are derived for the avatar. */
  user: string
  /** What they did, written to follow the name ("paid invoice INV-2041"). */
  action: string
  /** Display time, already formatted ("2m ago", "Yesterday"). */
  time: string
}

type ActivityFeedProps = {
  /** Rows, newest first. Omit for sample data. */
  items?: ActivityItem[]
  className?: string
}

const SAMPLE_ITEMS: ActivityItem[] = [
  { id: "a1", user: "Maya Chen", action: "paid invoice INV-2041", time: "2m ago" },
  { id: "a2", user: "Theo Okafor", action: "deployed lumen-web to production", time: "18m ago" },
  { id: "a3", user: "Priya Raman", action: "added Northwind as a customer", time: "1h ago" },
  { id: "a4", user: "Sam Lowe", action: "commented on INV-2038", time: "3h ago" },
  { id: "a5", user: "Ada Novak", action: "changed the billing plan to Scale", time: "Yesterday" },
]

const initials = (name: string) => name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()

function ActivityFeed({ items = SAMPLE_ITEMS, className }: ActivityFeedProps) {
  return (
    <div data-slot="activity-feed" role="list" className={cn("w-full max-w-md rounded-xl border border-border bg-surface", className)}>
      {items.map((item) => (
        <ListItem
          key={item.id}
          role="listitem"
          leading={<Avatar className="size-8"><AvatarFallback aria-hidden>{initials(item.user)}</AvatarFallback></Avatar>}
          heading={<><span className="font-medium">{item.user}</span> <span className="font-normal text-fg-muted">{item.action}</span></>}
          trailing={<span className="text-xs tabular-nums text-fg-muted">{item.time}</span>}
        />
      ))}
    </div>
  )
}
export { ActivityFeed }
export type { ActivityFeedProps, ActivityItem }
