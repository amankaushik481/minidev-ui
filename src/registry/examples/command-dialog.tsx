"use client"
import * as React from "react"
import { CommandDialog } from "@/registry/ui/command-dialog"
import { Button } from "@/registry/ui/button"
import { Kbd } from "@/registry/ui/kbd"
import type { Example } from "./types"

function HandlersDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col items-center gap-3">
      <CommandDialog
        commands={[
          { id: "new-invoice", label: "New invoice", shortcut: "N", onSelect: () => setLast("New invoice") },
          { id: "customers", label: "Go to customers", keywords: ["clients", "contacts"], onSelect: () => setLast("Go to customers") },
          { id: "theme", label: "Toggle dark mode", keywords: ["theme", "appearance"], onSelect: () => setLast("Toggle dark mode") },
          { id: "export", label: "Export invoices to CSV", keywords: ["download", "spreadsheet"], onSelect: () => setLast("Export invoices to CSV") },
        ]}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{last ? "Ran: " + last : "Try searching \"clients\" or \"theme\"."}</p>
    </div>
  )
}

function ShortcutDemo() {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" onClick={() => setOpen(true)} aria-haspopup="dialog">
        Jump to
      </Button>
      <span className="text-xs text-fg-muted">
        or press <Kbd>⌘J</Kbd> / <Kbd>Ctrl J</Kbd>
      </span>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        commands={[
          { id: "overview", label: "Overview" },
          { id: "invoices", label: "Invoices" },
          { id: "reports", label: "Reports", keywords: ["analytics"] },
        ]}
      />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Commands with handlers and keywords",
    description: "onSelect runs and the dialog closes; keywords match searches without showing in the list.",
    code: `function HandlersDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col items-center gap-3">
      <CommandDialog
        commands={[
          { id: "new-invoice", label: "New invoice", shortcut: "N", onSelect: () => setLast("New invoice") },
          { id: "customers", label: "Go to customers", keywords: ["clients", "contacts"], onSelect: () => setLast("Go to customers") },
          { id: "theme", label: "Toggle dark mode", keywords: ["theme", "appearance"], onSelect: () => setLast("Toggle dark mode") },
          { id: "export", label: "Export invoices to CSV", keywords: ["download", "spreadsheet"], onSelect: () => setLast("Export invoices to CSV") },
        ]}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{last ? "Ran: " + last : "Try searching \\"clients\\" or \\"theme\\"."}</p>
    </div>
  )
}`,
    node: <HandlersDemo />,
  },
  {
    title: "Your own trigger and shortcut",
    description: "Pass open and onOpenChange to drop the built-in button, then add the key listener yourself; CommandDialog has none.",
    code: `function ShortcutDemo() {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" onClick={() => setOpen(true)} aria-haspopup="dialog">
        Jump to
      </Button>
      <span className="text-xs text-fg-muted">
        or press <Kbd>⌘J</Kbd> / <Kbd>Ctrl J</Kbd>
      </span>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        commands={[
          { id: "overview", label: "Overview" },
          { id: "invoices", label: "Invoices" },
          { id: "reports", label: "Reports", keywords: ["analytics"] },
        ]}
      />
    </div>
  )
}`,
    node: <ShortcutDemo />,
  },
]
