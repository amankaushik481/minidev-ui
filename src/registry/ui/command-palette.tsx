"use client"
import * as React from "react"
import { SearchIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Kbd } from "@/registry/ui/kbd"
import { Dialog, DialogContent, DialogTitle } from "@/registry/ui/dialog"

/** A searchable command dialog: type to filter, pick a command, opened from a trigger button or ⌘K. */
type Command = { id: string; label: string; onSelect?: () => void }

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

type CommandPaletteProps = {
  /** Controlled open state. Omit it and the palette manages itself: it renders a trigger and listens for ⌘K / Ctrl+K. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Commands to search. Defaults to a set of Lumen actions. */
  commands?: Command[]
  /** Rendered when the palette is uncontrolled. Defaults to a search button with a ⌘K hint. */
  trigger?: React.ReactNode
}

function CommandPalette({ open, onOpenChange, commands = SAMPLE_COMMANDS, trigger }: CommandPaletteProps) {
  const controlled = open !== undefined
  const [innerOpen, setInnerOpen] = React.useState(false)
  const isOpen = controlled ? open : innerOpen
  const setOpen = (o: boolean) => {
    if (!controlled) setInnerOpen(o)
    onOpenChange?.(o)
  }
  const [q, setQ] = React.useState("")
  const filtered = commands.filter(c => c.label.toLowerCase().includes(q.toLowerCase()))

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

  return (
    <div data-slot="command-palette">
      {!controlled
        ? trigger ?? (
            <Button type="button" variant="outline" className="w-64 justify-start gap-2 pr-2 font-normal text-fg-muted" onClick={() => setOpen(true)}>
              <SearchIcon />
              <span className="flex-1 text-left">Search commands…</span>
              <Kbd>⌘K</Kbd>
            </Button>
          )
        : null}
      <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="top-[20%] max-w-lg translate-y-0 gap-0 overflow-hidden p-0" showCloseButton={false}>
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <div className="flex items-center gap-2 border-b border-border px-3">
          <SearchIcon className="size-4 text-fg-muted" />
          <input aria-label="Command search" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Type a command…" className="h-11 w-full bg-transparent text-sm outline-none" />
        </div>
        <ul className="max-h-64 overflow-auto p-1">
          {filtered.map(c => (
            <li key={c.id}>
              <button type="button" className="flex w-full rounded-lg px-2.5 py-2 text-left text-sm hover:bg-sunken" onClick={() => { c.onSelect?.(); setOpen(false) }}>{c.label}</button>
            </li>
          ))}
          {filtered.length===0 ? <li className="px-2.5 py-3 text-xs text-fg-muted">No commands</li> : null}
        </ul>
      </DialogContent>
    </Dialog>
    </div>
  )
}
export { CommandPalette }
export type { CommandPaletteProps, Command as CommandPaletteCommand }
