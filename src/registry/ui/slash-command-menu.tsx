"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type Item = { id: string; label: string; hint?: string }

function SlashCommandMenu({
  items,
  query = "",
  onSelect,
  className,
}: {
  items: Item[]
  query?: string
  onSelect?: (item: Item) => void
  className?: string
}) {
  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
  return (
    <div
      data-slot="slash-command-menu"
      role="listbox"
      aria-label="Slash commands"
      className={cn(
        "w-72 overflow-hidden rounded-xl border border-border bg-raised p-1",
        "shadow-[0_8px_24px_oklch(0.35_0.02_250/0.10)]",
        className
      )}
    >
      {filtered.length === 0 ? (
        <p className="px-2.5 py-2 text-xs text-fg-muted">No commands</p>
      ) : (
        filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            role="option"
            className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm hover:bg-sunken outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => onSelect?.(item)}
          >
            <span className="font-medium text-fg">/{item.label}</span>
            {item.hint ? <span className="text-xs text-fg-muted">{item.hint}</span> : null}
          </button>
        ))
      )}
    </div>
  )
}
export { SlashCommandMenu }
