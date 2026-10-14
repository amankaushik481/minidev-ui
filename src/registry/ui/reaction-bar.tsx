"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** ReactionBar — emoji reaction pills with counts; the ones you pressed get the accent border. */

type Reaction = { emoji: string; count: number; active?: boolean }

// Reactions on a Lumen changelog post.
const SAMPLE_REACTIONS: Reaction[] = [
  { emoji: "👍", count: 12, active: true },
  { emoji: "🎉", count: 5 },
  { emoji: "❤️", count: 3 },
  { emoji: "👀", count: 1 },
]

type ReactionBarProps = {
  reactions?: Reaction[]
  /** Called with the emoji that was pressed. Omit it and the bar toggles its own counts. */
  onToggle?: (emoji: string) => void
  className?: string
}

function ReactionBar({
  reactions = SAMPLE_REACTIONS,
  onToggle,
  className,
}: ReactionBarProps) {
  // Uncontrolled mode: remember which pills were flipped and adjust the counts from the props.
  const [flipped, setFlipped] = React.useState<Record<string, boolean>>({})
  const list = reactions.map((r) => {
    const on = flipped[r.emoji]
    if (onToggle || on === undefined || on === !!r.active) return r
    return { ...r, active: on, count: r.count + (on ? 1 : -1) }
  })
  const toggle = (emoji: string) => {
    if (onToggle) return onToggle(emoji)
    const current = list.find((r) => r.emoji === emoji)
    setFlipped((f) => ({ ...f, [emoji]: !current?.active }))
  }
  return (
    <div data-slot="reaction-bar" className={cn("flex flex-wrap gap-1.5", className)}>
      {list.map((r) => (
        <button
          key={r.emoji}
          type="button"
          aria-pressed={!!r.active}
          aria-label={`${r.emoji} ${r.count}`}
          className={cn(
            "inline-flex h-7 items-center gap-1 rounded-full border px-2 text-xs font-medium tabular-nums text-fg outline-none",
            "focus-visible:ring-2 focus-visible:ring-accent",
            r.active ? "border-accent bg-surface" : "border-border bg-surface hover:border-fg-subtle"
          )}
          onClick={() => toggle(r.emoji)}
        >
          <span aria-hidden>{r.emoji}</span>
          {r.count}
        </button>
      ))}
    </div>
  )
}
export { ReactionBar }
export type { ReactionBarProps, Reaction }
