"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { StatusBadge } from "@/registry/ui/status-badge"

/**
 * ReviewRequestCard — a pull request awaiting your review: title, repo, author avatar and Review / View diff buttons.
 *
 * Use it in inboxes, dashboards and notification panels for code review requests. For a full PR
 * row with checks and labels use a list item of your own.
 *
 * @example
 * <ReviewRequestCard title="Add invoice export" repo="lumen/web" author="Maya Chen" onReview={() => router.push(prUrl)} onViewDiff={openDiff} />
 */
function ReviewRequestCard({
  title = "Premium motion elevation",
  repo = "lumen/web",
  author = "Maya Chen",
  onReview,
  onViewDiff,
  className,
}: {
  /** Pull request title, rendered as an h3. */
  title?: string
  /** Repository the PR lives in. */
  repo?: string
  /** Author name; the avatar shows its initials. */
  author?: string
  /** Fires when Review is pressed. */
  onReview?: () => void
  /** Fires when View diff is pressed. */
  onViewDiff?: () => void
  className?: string
}) {
  const initials = author.split(/\s+/).filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase()
  return (
    <div data-slot="review-request-card" className={cn("rounded-xl border border-border bg-surface p-4 shadow-highlight", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <StatusBadge tone="accent">Review requested</StatusBadge>
          <h3 className="mt-2 text-sm font-medium text-fg">{title}</h3>
          <p className="mt-1 truncate text-xs text-fg-muted">
            {repo} · by {author}
          </p>
        </div>
        <Avatar className="size-8 shrink-0" aria-hidden>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-4 flex gap-2">
        <Button type="button" size="sm" onClick={onReview}>Review</Button>
        <Button type="button" size="sm" variant="outline" onClick={onViewDiff}>View diff</Button>
      </div>
    </div>
  )
}
export { ReviewRequestCard }
