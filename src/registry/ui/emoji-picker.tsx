"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * EmojiPicker — a compact grid of emoji buttons for reactions, with arrow-key navigation and one tab stop.
 *
 * Use inside a `Popover` from a reaction button, or inline under a message.
 * For a row of existing reaction counts use `ReactionBar`. Arrow keys move
 * through the grid, Home and End jump to the ends, Enter or Space picks.
 *
 * @example
 * <EmojiPicker onSelect={(emoji) => addReaction(messageId, emoji)} />
 * <EmojiPicker emojis={["✅", "👀", "🚀"]} columns={3} onSelect={react} />
 */
const DEFAULT = ["👍", "❤️", "😂", "🎉", "🔥", "👀", "✅", "❌", "🚀", "💡", "📎", "🙏"]

type EmojiPickerProps = {
  /** Emoji characters to offer, in order. */
  emojis?: string[]
  /** Called with the chosen emoji character. */
  onSelect?: (emoji: string) => void
  /** Number of grid columns; also the Up/Down arrow step. */
  columns?: number
  /** Accessible name for the group. */
  "aria-label"?: string
  className?: string
}

function EmojiPicker({ emojis = DEFAULT, onSelect, columns = 6, "aria-label": ariaLabel = "Emoji picker", className }: EmojiPickerProps) {
  const [active, setActive] = React.useState(0)
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const tab = Math.min(active, Math.max(0, emojis.length - 1))

  const move = (to: number) => {
    const i = Math.max(0, Math.min(emojis.length - 1, to))
    setActive(i)
    refs.current[i]?.focus()
  }

  return (
    <div
      data-slot="emoji-picker"
      role="group"
      aria-label={ariaLabel}
      className={cn("grid gap-1 rounded-xl border border-border bg-raised p-2 shadow-lg", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      onKeyDown={(e) => {
        const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: columns, ArrowUp: -columns }[e.key]
        if (step !== undefined) move(tab + step)
        else if (e.key === "Home") move(0)
        else if (e.key === "End") move(emojis.length - 1)
        else return
        e.preventDefault()
      }}
    >
      {emojis.map((e, i) => (
        <button
          key={`${i}-${e}`}
          ref={(el) => {
            refs.current[i] = el
          }}
          type="button"
          tabIndex={i === tab ? 0 : -1}
          aria-label={e}
          className="grid size-8 place-items-center rounded-lg text-base outline-none transition-[background-color] duration-[70ms] hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent"
          onFocus={() => setActive(i)}
          onClick={() => onSelect?.(e)}
        >
          {e}
        </button>
      ))}
    </div>
  )
}
export { EmojiPicker }
export type { EmojiPickerProps }
