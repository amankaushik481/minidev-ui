"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"
import { CopyButton } from "@/registry/ui/copy-button"
import { Maximize2Icon } from "lucide-react"

function ArtifactPreview({
  title,
  children,
  className,
  copyValue,
  onExpand,
}: {
  title: string
  children: React.ReactNode
  className?: string
  copyValue?: string
  onExpand?: () => void
}) {
  return (
    <div
      data-slot="artifact-preview"
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface shadow-highlight",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border bg-sunken px-3 py-2">
        <p className="truncate text-xs font-medium text-fg-muted">{title}</p>
        <div className="flex items-center gap-1">
          {copyValue ? <CopyButton value={copyValue} size="sm" /> : null}
          {onExpand ? (
            <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Expand artifact" onClick={onExpand}>
              <Maximize2Icon />
            </IconButton>
          ) : null}
        </div>
      </div>
      <div className="p-3">{children}</div>
    </div>
  )
}
export { ArtifactPreview }
