"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { StatusBadge } from "@/registry/ui/status-badge"

function PublishBar({
  status = "draft",
  onPublish,
  className,
}: {
  status?: "draft" | "published" | "scheduled"
  onPublish?: () => void
  className?: string
}) {
  return (
    <div data-slot="publish-bar" className={cn("flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]", className)}>
      <div className="flex items-center gap-2">
        <StatusBadge tone={status === "published" ? "success" : status === "scheduled" ? "accent" : "neutral"}>{status}</StatusBadge>
        <p className="text-sm text-fg-muted">Changes save automatically</p>
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm">Preview</Button>
        <Button type="button" size="sm" onClick={onPublish}>Publish</Button>
      </div>
    </div>
  )
}
export { PublishBar }
