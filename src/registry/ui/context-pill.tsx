"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A rounded pill naming one item attached to an AI prompt (a file, a URL, a selection), with an optional remove button.
 *
 * Show a row of them above or inside PromptInput for the context the model will see. Pass `onRemove` to make it dismissible.
 * For on/off context toggles use ContextChip; for attached files with a size use AttachmentChip; for a removable tag use TagsInput.
 *
 * @example
 * <ContextPill icon={<FileTextIcon />} onRemove={() => detach("invoice.pdf")}>invoice.pdf</ContextPill>
 */
type ContextPillProps = {
  /** The item's name; truncates when long. */
  children: React.ReactNode
  /** Leading icon, sized to 12px. */
  icon?: React.ReactNode
  /** Shows a remove button that calls this. */
  onRemove?: () => void
  /** Accessible name of the remove button. Defaults to "Remove <children>" when children is text. */
  removeLabel?: string
  className?: string
}

function ContextPill({ children, icon, className, onRemove, removeLabel }: ContextPillProps) {
  return (
    <span
      data-slot="context-pill"
      className={cn(
        "inline-flex h-7 max-w-full items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 text-xs text-fg shadow-highlight",
        onRemove && "pr-1",
        className
      )}
    >
      {icon ? <span aria-hidden className="flex shrink-0 text-fg-muted [&_svg]:size-3">{icon}</span> : null}
      <span className="truncate">{children}</span>
      {onRemove ? (
        <button
          type="button"
          aria-label={removeLabel ?? (typeof children === "string" ? `Remove ${children}` : "Remove")}
          className={cn(
            "relative grid size-5 shrink-0 place-items-center rounded-full text-fg-muted outline-none after:absolute after:-inset-2",
            "transition-[background-color,color] duration-[70ms] hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
          )}
          onClick={onRemove}
        >
          <XIcon aria-hidden className="size-3" />
        </button>
      ) : null}
    </span>
  )
}
export { ContextPill }
export type { ContextPillProps }
