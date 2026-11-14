"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A wrap of pill buttons offering follow-up prompts in an AI chat ("Summarize", "Find bugs").
 *
 * Clicking a chip calls `onSelect` with its text; send it or put it in the composer.
 * For filters that stay on use ToggleGroup.
 *
 * @example
 * <SuggestionChips items={["Summarize", "Explain this code"]} onSelect={(text) => send(text)} />
 */
type SuggestionChipsProps = {
  /** Prompt texts, one chip each. */
  items?: string[]
  /** Called with the chip's text. */
  onSelect?: (item: string) => void
  /** Accessible name for the group. */
  label?: string
  className?: string
}

function SuggestionChips({ items = ["Summarize", "Rewrite", "Find bugs"], onSelect, label = "Suggestions", className }: SuggestionChipsProps) {
  return (
    <div data-slot="suggestion-chips" role="group" aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item, i) => (
        <button
          key={`${item}-${i}`}
          type="button"
          onClick={() => onSelect?.(item)}
          className="h-7 rounded-full border border-border bg-surface px-3 text-xs font-medium text-fg outline-none transition-[border-color] duration-[70ms] hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent"
        >
          {item}
        </button>
      ))}
    </div>
  )
}
export { SuggestionChips }
export type { SuggestionChipsProps }
