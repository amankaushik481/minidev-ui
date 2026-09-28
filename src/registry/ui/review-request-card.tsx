"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { StatusBadge } from "@/registry/ui/status-badge"

function ReviewRequestCard({
  title = "Premium motion elevation",
  repo = "lux-css",
  author = "Aman",
  className,
}: {
  title?: string
  repo?: string
  author?: string
  className?: string
}) {
  return (
    <div data-slot="review-request-card" className={cn("rounded-xl border border-border bg-surface p-4 shadow-highlight", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <StatusBadge tone="accent">Review requested</StatusBadge>
          <h3 className="mt-2 text-sm font-medium text-fg">{title}</h3>
          <p className="mt-1 text-xs text-fg-muted">{repo}</p>
        </div>
        <Avatar className="size-8"><AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
      </div>
      <div className="mt-4 flex gap-2">
        <Button size="sm">Review</Button>
        <Button size="sm" variant="outline">View diff</Button>
      </div>
    </div>
  )
}
export { ReviewRequestCard }
