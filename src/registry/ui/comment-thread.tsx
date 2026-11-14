"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

/**
 * A vertical thread of comments, each with an avatar, author, time and body.
 *
 * Use on issues, invoices, reviews and docs. Pair with CommentComposer underneath to add replies.
 * For chat between a person and an AI use ChatThread; for a system event log use ActivityFeed or AuditTrail.
 *
 * @example
 * <CommentThread comments={[{ id: "c1", author: "Maya Chen", body: "Sent the reminder.", time: "2h ago" }]} />
 */
type Comment = {
  /** Stable unique id; also the React key. */
  id: string
  /** Display name. Initials are derived for the avatar. */
  author: string
  body: string
  /** Pre-formatted time label, e.g. "2h ago". */
  time?: string
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

const SAMPLE_COMMENTS: Comment[] = [
  { id: "c1", author: "Maya Chen", body: "Northwind's INV-2041 is still open at $12,400. Can we send a reminder before the end of the month?", time: "3h ago" },
  { id: "c2", author: "Theo Okafor", body: "Sent a reminder from Lumen this morning. Their AP contact said it's in the Friday payment run.", time: "2h ago" },
  { id: "c3", author: "Priya Raman", body: "Let's mark it as promised and move it out of the overdue list so it stops paging the finance channel.", time: "1h ago" },
  { id: "c4", author: "Sam Lowe", body: "Done. I'll close the thread once the payment lands.", time: "20m ago" },
]

type CommentThreadProps = {
  /** Comments in display order. Defaults to a short Lumen thread. */
  comments?: Comment[]
  /** Accessible name for the list. Defaults to "Comments". */
  label?: string
  className?: string
}

function CommentThread({
  comments = SAMPLE_COMMENTS,
  label = "Comments",
  className,
}: CommentThreadProps) {
  return (
    <ul data-slot="comment-thread" aria-label={label} className={cn("space-y-4", className)}>
      {comments.map((c) => (
        <li key={c.id} className="flex gap-3">
          <Avatar aria-hidden className="size-8 shrink-0">
            <AvatarFallback>{initials(c.author)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-3 py-2">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-sm font-medium text-fg">{c.author}</span>
              {c.time ? <span className="text-xs text-fg-muted">{c.time}</span> : null}
            </div>
            <p className="text-sm text-pretty break-words text-fg-muted">{c.body}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
export { CommentThread }
export type { CommentThreadProps, Comment as CommentThreadComment }
