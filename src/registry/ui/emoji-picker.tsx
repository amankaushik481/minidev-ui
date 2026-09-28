"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const DEFAULT = ["👍","❤️","😂","🎉","🔥","👀","✅","❌","🚀","💡","📎","🙏"]

function EmojiPicker({
  emojis = DEFAULT,
  onSelect,
  className,
}: {
  emojis?: string[]
  onSelect?: (emoji: string) => void
  className?: string
}) {
  return (
    <div
      data-slot="emoji-picker"
      role="listbox"
      aria-label="Emoji picker"
      className={cn(
        "grid grid-cols-6 gap-1 rounded-xl border border-border bg-raised p-2",
        "shadow-lg",
        className
      )}
    >
      {emojis.map((e) => (
        <button
          key={e}
          type="button"
          role="option"
          aria-label={e}
          className="grid size-8 place-items-center rounded-lg text-base hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent outline-none"
          onClick={() => onSelect?.(e)}
        >
          {e}
        </button>
      ))}
    </div>
  )
}
export { EmojiPicker }
