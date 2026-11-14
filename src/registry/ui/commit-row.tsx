"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { CopyButton } from "@/registry/ui/copy-button"
import { RelativeTime } from "@/registry/ui/relative-time"

/**
 * One git commit as a list row: author avatar, message, author and relative time, the short SHA and a copy button.
 *
 * Stack several inside a bordered container for a commit history on deploy, release or PR screens.
 * For CI status per commit add a CheckRunList; for a code change view use DiffView.
 *
 * @example
 * <CommitRow sha="f90e1ab" message="Fix invoice rounding" author="Maya Chen" date="2026-11-12T09:30:00Z" />
 */
type CommitRowProps = {
  /** Short SHA, shown and copied as is. */
  sha?: string
  /** Commit subject line; truncates to one line. */
  message?: string
  /** Author display name. Initials are derived for the avatar. */
  author?: string
  /** Commit time (ISO string or Date). Pass a fixed value from your data so server and client render the same. */
  date?: string | Date
  className?: string
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

function CommitRow({
  sha = "a1b2c3d",
  message = "Raise Premium motion bar",
  author = "Aman",
  date,
  className,
}: CommitRowProps) {
  return (
    <div data-slot="commit-row" className={cn("flex items-center gap-3 border-b border-border px-3 py-2.5", className)}>
      <Avatar aria-hidden className="size-7 shrink-0">
        <AvatarFallback>{initials(author)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg" title={message}>
          {message}
        </p>
        <p className="text-xs text-fg-muted">
          {author} · <RelativeTime date={date} />
        </p>
      </div>
      <code className="rounded-md border border-border bg-sunken px-1.5 py-0.5 font-mono text-2xs text-fg">{sha}</code>
      <CopyButton value={sha} aria-label={`Copy commit ${sha}`} />
    </div>
  )
}
export { CommitRow }
export type { CommitRowProps }
