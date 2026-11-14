"use client"
import * as React from "react"
import { FileIcon, DownloadIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * FileRow — one file as a bordered row: icon, name, metadata line and an optional download button.
 *
 * Use alone for a single attachment, or let `FileList` render a stack. For
 * an attachment pill in a composer use `AttachmentChip`; for upload progress
 * use `FileDropzone`.
 *
 * @example
 * <FileRow name="Q3-revenue-report.xlsx" meta="Spreadsheet · 1.2 MB" onDownload={() => download("q3")} />
 */
type FileRowProps = {
  /** File name, truncated when long. */
  name: string
  /** Secondary line, e.g. "PDF · 184 KB". */
  meta?: string
  /** When set, shows a download icon button labelled "Download {name}". */
  onDownload?: () => void
  className?: string
}

function FileRow({ name, meta, onDownload, className }: FileRowProps) {
  return (
    <div data-slot="file-row" className={cn("flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2", className)}>
      <FileIcon className="size-4 shrink-0 text-fg-muted" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg" title={name}>
          {name}
        </p>
        {meta ? <p className="truncate text-xs text-fg-muted tabular-nums">{meta}</p> : null}
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
export type { FileRowProps }
