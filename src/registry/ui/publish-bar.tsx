"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { StatusBadge } from "@/registry/ui/status-badge"

/**
 * PublishBar — a status badge, a save note and Preview / Publish buttons for a CMS or editor.
 *
 * Use it pinned above or below an editor to show draft, scheduled or published state. For a
 * floating unsaved-changes prompt use a toast or a save bar instead.
 *
 * @example
 * <PublishBar status="draft" onPreview={openPreview} onPublish={publish} publishing={isPending} />
 */

type PublishStatus = "draft" | "published" | "scheduled"

const labels: Record<PublishStatus, string> = { draft: "Draft", published: "Published", scheduled: "Scheduled" }

function PublishBar({
  status = "draft",
  note = "Changes save automatically",
  onPublish,
  onPreview,
  publishing = false,
  className,
}: {
  /** Current state, shown as a badge. */
  status?: PublishStatus
  /** Muted line next to the badge. */
  note?: React.ReactNode
  /** Fires when Publish is pressed. */
  onPublish?: () => void
  /** Fires when Preview is pressed. */
  onPreview?: () => void
  /** True while publishing: the button is disabled and reads "Publishing…". */
  publishing?: boolean
  className?: string
}) {
  return (
    <div data-slot="publish-bar" className={cn("flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-highlight", className)}>
      <div className="flex items-center gap-2">
        <StatusBadge tone={status === "published" ? "success" : status === "scheduled" ? "accent" : "neutral"}>{labels[status]}</StatusBadge>
        {note ? <p className="text-sm text-fg-muted">{note}</p> : null}
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onPreview}>Preview</Button>
        <Button type="button" size="sm" onClick={onPublish} disabled={publishing} aria-busy={publishing || undefined}>
          {publishing ? "Publishing…" : "Publish"}
        </Button>
      </div>
    </div>
  )
}
export { PublishBar }
export type { PublishStatus }
