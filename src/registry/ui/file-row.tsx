"use client"
import * as React from "react"
import { FileIcon, DownloadIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

function FileRow({
  name,
  meta,
  onDownload,
  className,
}: {
  name: string
  meta?: string
  onDownload?: () => void
  className?: string
}) {
  return (
    <div
      data-slot="file-row"
      className={cn(
        "flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2",
        className
      )}
    >
      <FileIcon className="size-4 text-fg-muted" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{name}</p>
        {meta ? <p className="text-xs text-fg-muted">{meta}</p> : null}
      </div>
      {onDownload ? (
        <IconButton type="button" variant="ghost" size="icon-sm" aria-label={`Download ${name}`} onClick={onDownload}>
          <DownloadIcon />
        </IconButton>
      ) : null}
    </div>
  )
}
export { FileRow }
