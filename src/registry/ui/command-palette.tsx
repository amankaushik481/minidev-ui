"use client"
import * as React from "react"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Kbd } from "@/registry/ui/kbd"
import { Dialog, DialogContent, DialogTitle } from "@/registry/ui/dialog"

/**
 * A searchable command dialog: type to filter, arrow keys to move, Enter to run, opened from a trigger button or ⌘K / Ctrl+K.
 *
 * Use as the app-wide "do anything" launcher. Uncontrolled it renders its own trigger and listens for ⌘K; pass `open` + `onOpenChange`
 * to launch it from your own button or shortcut. For a ready trigger-plus-dialog pair use CommandDialog; for one row use CommandItem;
 * for "/" commands inside an editor use SlashCommandMenu. Follows the APG combobox-with-listbox pattern.
 *
 * @example
 * <CommandPalette
 *   commands={[
 *     { id: "new-invoice", label: "Create invoice", shortcut: "⌘N", onSelect: () => router.push("/invoices/new") },
 *     { id: "theme", label: "Toggle dark mode", keywords: ["theme", "light"], onSelect: toggleTheme },
 *   ]}
 * />
 */
type CommandPaletteProps = {
  /** Controlled open state. Omit it and the palette manages itself: it renders a trigger and listens for ⌘K / Ctrl+K. */
  open?: boolean
  /** Called with the next open state (Escape, outside click, after running a command). */
  onOpenChange?: (open: boolean) => void
  /** Commands to search. Defaults to a set of Lumen actions. */
  commands?: Command[]
  /** Rendered when the palette is uncontrolled. Defaults to a search button with a ⌘K hint. */
  trigger?: React.ReactNode
  /** Search field placeholder. Defaults to "Type a command…". */
  placeholder?: string
  /** Shown when nothing matches. Defaults to "No commands". */
  emptyText?: string
}

type Command = {
  /** Unique id; also the React key. */
  id: string
  /** Text shown and searched. */
  label: string
  /** Extra search terms that do not show, e.g. ["theme", "appearance"]. */
  keywords?: string[]
  /** Shortcut hint shown at the row's end. Display only. */
  shortcut?: string
  /** Runs when the command is picked; the palette then closes. */
  onSelect?: () => void
}

const SAMPLE_COMMANDS: Command[] = [
  { id: "dashboard", label: "Go to dashboard" },
  { id: "new-invoice", label: "Create invoice" },
  { id: "new-customer", label: "Add customer" },
  { id: "deploys", label: "View deploys" },
  { id: "invite", label: "Invite teammate" },
  { id: "billing", label: "Open billing settings" },
  { id: "workspace", label: "Switch workspace: Northwind" },
  { id: "theme", label: "Toggle dark mode" },
]

function CommandPalette({
  open,
  onOpenChange,
  commands = SAMPLE_COMMANDS,
  trigger,
  placeholder = "Type a command…",
  emptyText = "No commands",
}: CommandPaletteProps) {
  const controlled = open !== undefined
  const [innerOpen, setInnerOpen] = React.useState(false)
  const isOpen = controlled ? open : innerOpen
  const [q, setQ] = React.useState("")
  const [active, setActive] = React.useState(0)
  const id = React.useId()
  const listRef = React.useRef<HTMLUListElement>(null)

  const setOpen = (o: boolean) => {
    if (!controlled) setInnerOpen(o)
    if (!o) {
      setQ("")
      setActive(0)
    }
    onOpenChange?.(o)
  }

  const needle = q.trim().toLowerCase()
  const filtered = commands.filter(
    (c) => c.label.toLowerCase().includes(needle) || c.keywords?.some((k) => k.toLowerCase().includes(needle))
  )
  const current = Math.min(active, filtered.length - 1)

  React.useEffect(() => {
    if (controlled) return
    const onKey = (e: KeyboardEvent) => {
      // Another handler (an app-level search, say) that already claimed ⌘K wins.
      if (e.defaultPrevented) return
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setInnerOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [controlled])

  // Keep the highlighted option in view while arrowing through a long list.
  React.useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: "nearest" })
  }, [current])

  const run = (c: Command | undefined) => {
    if (!c) return
    c.onSelect?.()
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const n = filtered.length
    if (!n) return
    if (e.key === "ArrowDown") setActive((current + 1) % n)
    else if (e.key === "ArrowUp") setActive((current - 1 + n) % n)
    else if (e.key === "Home") setActive(0)
    else if (e.key === "End") setActive(n - 1)
    else if (e.key === "Enter") run(filtered[current])
    else return
    e.preventDefault()
  }

  const optionId = (c: Command) => `${id}-opt-${c.id}`

  return (
    <div data-slot="command-palette">
      {!controlled
        ? trigger ?? (
            <Button type="button" variant="outline" className="w-64 justify-start gap-2 pr-2 font-normal text-fg-muted" onClick={() => setOpen(true)}>
              <SearchIcon aria-hidden />
              <span className="flex-1 text-left">Search commands…</span>
              <Kbd>⌘K</Kbd>
            </Button>
          )
        : null}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="top-[20%] max-w-lg translate-y-0 gap-0 overflow-hidden p-0" showCloseButton={false}>
          <DialogTitle className="sr-only">Command palette</DialogTitle>
          <div className="flex items-center gap-2 border-b border-border px-3">
            <SearchIcon aria-hidden className="size-4 shrink-0 text-fg-muted" />
            <input
              role="combobox"
              aria-label="Command search"
              aria-expanded
              aria-controls={`${id}-list`}
              aria-autocomplete="list"
              aria-activedescendant={filtered[current] ? optionId(filtered[current]) : undefined}
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                setActive(0)
              }}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              autoComplete="off"
              spellCheck={false}
              className="h-11 w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
            />
          </div>
          <ul ref={listRef} id={`${id}-list`} role="listbox" aria-label="Commands" className="max-h-64 overflow-auto p-1">
            {filtered.map((c, i) => (
              <li
                key={c.id}
                id={optionId(c)}
                role="option"
                aria-selected={i === current}
                data-active={i === current}
                onMouseMove={() => i !== current && setActive(i)}
                onClick={() => run(c)}
                className={cn(
                  "flex w-full cursor-default items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm text-fg",
                  "transition-[background-color] duration-[70ms]",
                  i === current && "bg-sunken"
                )}
              >
                <span className="truncate">{c.label}</span>
                {c.shortcut ? <kbd className="shrink-0 font-mono text-2xs text-fg-muted">{c.shortcut}</kbd> : null}
              </li>
            ))}
          </ul>
          {filtered.length === 0 ? (
            <p role="status" className="px-3.5 pt-1 pb-4 text-xs text-fg-muted">
              {emptyText}
            </p>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
export { CommandPalette }
export type { CommandPaletteProps, Command as CommandPaletteCommand }
