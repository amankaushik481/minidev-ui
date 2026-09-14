"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { CopyButton } from "@/registry/ui/copy-button"
import { RelativeTime } from "@/registry/ui/relative-time"

function CommitRow({
  sha = "a1b2c3d",
  message = "Raise Premium motion bar",
  author = "Aman",
  date = new Date().toISOString(),
  className,
}: {
  sha?: string
  message?: string
  author?: string
  date?: string | Date
  className?: string
}) {
  return (
    <div data-slot="commit-row" className={cn("flex items-center gap-3 border-b border-border px-3 py-2.5", className)}>
      <Avatar className="size-7"><AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{message}</p>
        <p className="text-xs text-fg-muted">{author} · <RelativeTime date={date} /></p>
      </div>
      <code className="rounded-md border border-border bg-sunken px-1.5 py-0.5 font-mono text-[11px] text-fg">{sha}</code>
      <CopyButton value={sha} aria-label="Copy SHA" />
    </div>
  )
}
export { CommitRow }
