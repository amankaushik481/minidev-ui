"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { ListItem } from "@/registry/ui/list-item"

function ActivityFeed({ items, className }: {
  items: { id: string; user: string; action: string; time: string }[]
  className?: string
}) {
  return (
    <div data-slot="activity-feed" className={cn("rounded-xl border border-border bg-surface", className)}>
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
