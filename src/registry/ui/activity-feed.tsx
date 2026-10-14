"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { ListItem } from "@/registry/ui/list-item"

type ActivityItem = { id: string; user: string; action: string; time: string }

type ActivityFeedProps = {
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

/** A compact feed of who did what, with avatars and timestamps, for dashboards and detail panes. */
function ActivityFeed({ items = SAMPLE_ITEMS, className }: ActivityFeedProps) {
  return (
    <div data-slot="activity-feed" className={cn("w-full max-w-md rounded-xl border border-border bg-surface", className)}>
      {items.map((item) => (
        <ListItem
          key={item.id}
          leading={<Avatar className="size-8"><AvatarFallback>{item.user.slice(0,2).toUpperCase()}</AvatarFallback></Avatar>}
          heading={<><span className="font-medium">{item.user}</span> <span className="font-normal text-fg-muted">{item.action}</span></>}
          trailing={<span className="text-xs tabular-nums text-fg-muted">{item.time}</span>}
        />
      ))}
    </div>
  )
}
export { ActivityFeed }
export type { ActivityFeedProps, ActivityItem }
