"use client"
import * as React from "react"
import { PaperclipIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A small chip for one attached file, with an optional remove button.
 *
 * Use in a composer or form to list files the user has attached. Prefer `FileDropzone` for picking
 * and uploading files, and `PromptInputAttachments` for the AI prompt input. The remove button
 * only renders with `onRemove` and its name is "Remove" followed by the file name.
 *
 * @example
 * <AttachmentChip name="INV-2041.pdf" meta="240 KB" onRemove={() => remove(file)} />
 */
type AttachmentChipProps = {
  /** File name; truncated to fit. */
  name: string
  /** Optional detail after the name, e.g. the file size. */
  meta?: React.ReactNode
  /** Shows a remove button and is called when it is pressed. */
  onRemove?: () => void
  className?: string
}

function AttachmentChip({ name, meta, onRemove, className }: AttachmentChipProps) {
  return (
    <span
      data-slot="attachment-chip"
      title={name}
      className={cn(
        "inline-flex h-7 max-w-56 items-center gap-1.5 rounded-md border border-border bg-sunken px-2 text-xs text-fg",
        onRemove && "pr-1",
        className
      )}
    >
      <PaperclipIcon className="size-3 shrink-0 text-fg-muted" aria-hidden />
      <span className="truncate">{name}</span>
      {meta ? <span className="shrink-0 tabular-nums text-fg-subtle">{meta}</span> : null}
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${name}`}
          className="relative grid size-5 shrink-0 cursor-pointer place-items-center rounded-sm text-fg-muted outline-none transition-[color,background-color] duration-[70ms] after:absolute after:-inset-2 hover:bg-border/60 hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
          onClick={onRemove}
        >
          <XIcon aria-hidden className="size-3" />
        </button>
      ) : null}
    </span>
  )
}
export { AttachmentChip }
export type { AttachmentChipProps }
