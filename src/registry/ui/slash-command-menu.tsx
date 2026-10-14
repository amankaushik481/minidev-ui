"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** A floating list of slash commands filtered by what the user has typed after the slash. */
type Item = { id: string; label: string; hint?: string }

type SlashCommandMenuProps = {
  /** Commands to offer. Defaults to Lumen's composer commands. */
  items?: Item[]
  /** The text typed after the slash; filters the list. */
  query?: string
  onSelect?: (item: Item) => void
  className?: string
}

const SAMPLE_ITEMS: Item[] = [
  { id: "invoice", label: "invoice", hint: "Create an invoice" },
  { id: "customer", label: "customer", hint: "Add a customer" },
  { id: "remind", label: "remind", hint: "Send a payment reminder" },
  { id: "note", label: "note", hint: "Attach an internal note" },
  { id: "deploy", label: "deploy", hint: "Trigger a deploy" },
  { id: "status", label: "status", hint: "Check system status" },
]

function SlashCommandMenu({
  items = SAMPLE_ITEMS,
  query = "",
  onSelect,
  className,
}: SlashCommandMenuProps) {
  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
  return (
    <div
      data-slot="slash-command-menu"
      role="listbox"
      aria-label="Slash commands"
      className={cn(
        "w-72 overflow-hidden rounded-xl border border-border bg-raised p-1",
        "shadow-lg",
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
            aria-selected={false}
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
export type { SlashCommandMenuProps }
