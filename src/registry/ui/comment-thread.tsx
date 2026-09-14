"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

type Comment = { id: string; author: string; body: string; time?: string }

function CommentThread({
  comments,
  className,
}: {
  comments: Comment[]
  className?: string
}) {
  return (
    <ul data-slot="comment-thread" className={cn("space-y-4", className)}>
      {comments.map((c) => (
        <li key={c.id} className="flex gap-3">
          <Avatar className="size-8">
            <AvatarFallback>{c.author.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-3 py-2">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-sm font-medium text-fg">{c.author}</span>
              {c.time ? <span className="text-xs text-fg-muted">{c.time}</span> : null}
            </div>
            <p className="text-sm text-fg-muted">{c.body}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
export { CommentThread }
