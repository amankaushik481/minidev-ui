"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function SuggestionChips({
  items = ["Summarize", "Rewrite", "Find bugs"],
  onSelect,
  className,
}: {
  items?: string[]
  onSelect?: (item: string) => void
  className?: string
}) {
  return (
    <div data-slot="suggestion-chips" className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <button
          key={item}
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
