"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A small toggle chip for adding context to an AI prompt (a file, a page, a selection), shown pressed when active.
 *
 * Use in a row above PromptInput to let people switch context sources on and off. It is a toggle button (`aria-pressed`).
 * For an attached item with a remove button use ContextPill; for suggested prompts use SuggestionChips; for filters use ChipFilter.
 *
 * @example
 * <ContextChip active={useFile} onClick={() => setUseFile((v) => !v)}>invoice.pdf</ContextChip>
 */
type ContextChipProps = React.ComponentProps<"button"> & {
  /** Pressed state. When defined the chip announces as a toggle button. */
  active?: boolean
}

function ContextChip({ children, className, active, ...props }: ContextChipProps) {
  return (
    <button
      type="button"
      data-slot="context-chip"
      data-active={active || undefined}
      aria-pressed={active}
      className={cn(
        "inline-flex h-6 items-center rounded-md border px-2 text-xs outline-none transition-[border-color,background-color,color] duration-[70ms] ease-hairline",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "disabled:pointer-events-none disabled:opacity-45",
        active ? "border-accent-line bg-accent-soft text-fg" : "border-border bg-sunken text-fg-muted hover:border-fg-subtle hover:text-fg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
export { ContextChip }
export type { ContextChipProps }
