"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A floating list of slash commands filtered by what the user has typed after the slash.
 *
 * Presentational: you own the editor and pass `query` (text after "/"). The list is a listbox
 * with roving focus: Arrow Up/Down, Home/End move, Enter or click selects, Escape calls `onClose`.
 * For a global action search use CommandPalette; for a menu from a button use DropdownMenu.
 *
 * @example
 * {open ? <SlashCommandMenu query={afterSlash} onSelect={(c) => run(c.id)} onClose={() => setOpen(false)} /> : null}
 */
type Item = {
  /** Stable id, passed back through `onSelect`. */
  id: string
  /** Command name shown after the slash and matched against `query`. */
  label: string
  /** Short description on the right. */
  hint?: string
}

type SlashCommandMenuProps = {
  /** Commands to offer. Defaults to Lumen's composer commands. */
  items?: Item[]
  /** The text typed after the slash; filters the list (case-insensitive substring). */
  query?: string
  /** Called with the chosen command. */
  onSelect?: (item: Item) => void
  /** Called on Escape so you can hide the menu and return focus to the editor. */
  onClose?: () => void
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
  onClose,
  className,
}: SlashCommandMenuProps) {
  const q = query.toLowerCase()
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q))
  const [active, setActive] = React.useState(0)
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  // a new query resets the highlight to the first match
  const [lastQuery, setLastQuery] = React.useState(query)
  if (lastQuery !== query) {
    setLastQuery(query)
    setActive(0)
  }
  const current = Math.min(active, Math.max(filtered.length - 1, 0))

  const move = (next: number) => {
    const n = (next + filtered.length) % filtered.length
    setActive(n)
    refs.current[n]?.focus()
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault()
      onClose?.()
      return
    }
    if (!filtered.length) return
    if (e.key === "ArrowDown") move(current + 1)
    else if (e.key === "ArrowUp") move(current - 1)
    else if (e.key === "Home") move(0)
    else if (e.key === "End") move(filtered.length - 1)
    else return
    e.preventDefault()
  }

  return (
    <div
      data-slot="slash-command-menu"
      role="listbox"
      aria-label="Slash commands"
      onKeyDown={onKeyDown}
      className={cn("w-72 overflow-hidden rounded-xl border border-border bg-raised p-1 shadow-overlay", className)}
    >
      {filtered.length === 0 ? (
        <p role="status" className="px-2.5 py-2 text-xs text-fg-muted">No commands</p>
      ) : (
        filtered.map((item, i) => (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="option"
            aria-selected={i === current}
            tabIndex={i === current ? 0 : -1}
            data-active={i === current || undefined}
            className="flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-left text-sm outline-none transition-[background-color] duration-[70ms] hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent data-[active]:bg-sunken"
            onMouseMove={() => setActive(i)}
            onClick={() => onSelect?.(item)}
          >
            <span className="font-medium text-fg">/{item.label}</span>
            {item.hint ? <span className="truncate text-xs text-fg-muted">{item.hint}</span> : null}
          </button>
        ))
      )}
    </div>
  )
}
export { SlashCommandMenu }
export type { SlashCommandMenuProps }
