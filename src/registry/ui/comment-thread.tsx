"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

/** A vertical thread of comments, each with an avatar, author, time and body. */
type Comment = { id: string; author: string; body: string; time?: string }

const SAMPLE_COMMENTS: Comment[] = [
  { id: "c1", author: "Maya Chen", body: "Northwind's INV-2041 is still open at $12,400. Can we send a reminder before the end of the month?", time: "3h ago" },
  { id: "c2", author: "Theo Okafor", body: "Sent a reminder from Lumen this morning. Their AP contact said it's in the Friday payment run.", time: "2h ago" },
  { id: "c3", author: "Priya Raman", body: "Let's mark it as promised and move it out of the overdue list so it stops paging the finance channel.", time: "1h ago" },
  { id: "c4", author: "Sam Lowe", body: "Done. I'll close the thread once the payment lands.", time: "20m ago" },
]

type CommentThreadProps = {
  /** Comments in display order. Defaults to a short Lumen thread. */
  comments?: Comment[]
  className?: string
}

function CommentThread({
  comments = SAMPLE_COMMENTS,
  className,
}: CommentThreadProps) {
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
export type { CommentThreadProps, Comment as CommentThreadComment }
