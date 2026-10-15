"use client"
import * as React from "react"
import { SearchIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { CommandPalette } from "@/registry/ui/command-palette"
import type { Example } from "./types"

function HandlersDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  const commands = [
    { id: "new-invoice", label: "Create invoice", onSelect: () => setLast("Create invoice") },
    { id: "new-customer", label: "Add customer", onSelect: () => setLast("Add customer") },
    { id: "export", label: "Export invoices as CSV", onSelect: () => setLast("Export invoices as CSV") },
    { id: "payouts", label: "Go to payouts", onSelect: () => setLast("Go to payouts") },
    { id: "theme", label: "Toggle dark mode", onSelect: () => setLast("Toggle dark mode") },
  ]
  return (
    <div className="flex flex-col items-center gap-3">
      <CommandPalette commands={commands} />
      <p className="text-xs text-fg-muted">{last ? "Ran: " + last : "Pick a command, or press ⌘K."}</p>
    </div>
  )
}

function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <SearchIcon /> Search Lumen
      </Button>
      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  )
}

export const examples: Example[] = [
  {
    title: "Commands with handlers",
    description: "Each command gets an onSelect; the palette runs it and closes.",
    code: `function HandlersDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  const commands = [
    { id: "new-invoice", label: "Create invoice", onSelect: () => setLast("Create invoice") },
    { id: "new-customer", label: "Add customer", onSelect: () => setLast("Add customer") },
    { id: "export", label: "Export invoices as CSV", onSelect: () => setLast("Export invoices as CSV") },
    { id: "payouts", label: "Go to payouts", onSelect: () => setLast("Go to payouts") },
    { id: "theme", label: "Toggle dark mode", onSelect: () => setLast("Toggle dark mode") },
  ]
  return (
    <div className="flex flex-col items-center gap-3">
      <CommandPalette commands={commands} />
      <p className="text-xs text-fg-muted">{last ? "Ran: " + last : "Pick a command, or press ⌘K."}</p>
    </div>
  )
}`,
    node: <HandlersDemo />,
  },
  {
    title: "Controlled open",
    description: "Own the open state to launch the palette from your own button or shortcut; the built in trigger and ⌘K listener step aside.",
    code: `function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <SearchIcon /> Search Lumen
      </Button>
      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  )
}`,
    node: <ControlledDemo />,
  },
]
