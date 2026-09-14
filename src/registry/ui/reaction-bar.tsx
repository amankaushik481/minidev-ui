"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type Reaction = { emoji: string; count: number; active?: boolean }

function ReactionBar({
  reactions,
  onToggle,
  className,
}: {
  reactions: Reaction[]
  onToggle?: (emoji: string) => void
  className?: string
}) {
  return (
    <div data-slot="reaction-bar" className={cn("flex flex-wrap gap-1.5", className)}>
      {reactions.map((r) => (
        <button
          key={r.emoji}
          type="button"
          aria-pressed={!!r.active}
          className={cn(
            "inline-flex h-7 items-center gap-1 rounded-full border px-2 text-xs font-medium tabular-nums text-fg outline-none",
            "focus-visible:ring-2 focus-visible:ring-accent",
            r.active ? "border-accent bg-surface" : "border-border bg-surface hover:border-fg-subtle"
          )}
          onClick={() => onToggle?.(r.emoji)}
        >
          <span aria-hidden>{r.emoji}</span>
          {r.count}
        </button>
      ))}
    </div>
  )
}
export { ReactionBar }
