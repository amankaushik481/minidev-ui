"use client"
import * as React from "react"
import { PaperclipIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function AttachmentChip({
  name,
  onRemove,
  className,
}: {
  name: string
  onRemove?: () => void
  className?: string
}) {
  return (
    <span
      data-slot="attachment-chip"
      className={cn(
        "inline-flex h-7 max-w-56 items-center gap-1.5 rounded-md border border-border bg-sunken px-2 text-xs text-fg",
        className
      )}
    >
      <PaperclipIcon className="size-3 shrink-0 text-fg-muted" aria-hidden />
      <span className="truncate">{name}</span>
      {onRemove ? (
        <button type="button" aria-label={`Remove ${name}`} className="text-fg-muted hover:text-fg" onClick={onRemove}>
          <XIcon className="size-3" />
        </button>
      ) : null}
    </span>
  )
}
export { AttachmentChip }
