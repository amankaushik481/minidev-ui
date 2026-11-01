"use client"
import * as React from "react"
import { KeyboardIcon } from "lucide-react"
import { KeyboardShortcuts, type KeyboardShortcutGroup } from "@/registry/ui/keyboard-shortcuts"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const boardGroups: KeyboardShortcutGroup[] = [
  {
    title: "Board",
    shortcuts: [
      { keys: ["C"], label: "New card" },
      { keys: ["F"], label: "Filter cards" },
      { keys: ["mod", "shift", "F"], label: "Clear filters" },
      { keys: ["["], label: "Collapse column" },
      { keys: ["]"], label: "Expand column" },
    ],
  },
  {
    title: "Card",
    shortcuts: [
      { keys: ["A"], label: "Assign to me" },
      { keys: ["L"], label: "Add label" },
      { keys: ["D"], label: "Set due date" },
      { keys: ["mod", "enter"], label: "Move to done" },
      { keys: ["esc"], label: "Close card" },
    ],
  },
]

function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 shadow-raised">
      <span className="text-sm font-medium text-fg">Lumen</span>
      <span className="text-xs text-fg-subtle">Invoices</span>
      <Button variant="ghost" size="icon-sm" aria-label="Keyboard shortcuts" className="ml-6" onClick={() => setOpen(true)}>
        <KeyboardIcon />
      </Button>
      <KeyboardShortcuts open={open} onOpenChange={setOpen} showTrigger={false} hotkey="" />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom groups",
    description: "groups is any list of sections; keys use portable names like mod, shift and enter so the sheet shows the viewer's modifier glyphs.",
    code: `const boardGroups: KeyboardShortcutGroup[] = [
  {
    title: "Board",
    shortcuts: [
      { keys: ["C"], label: "New card" },
      { keys: ["F"], label: "Filter cards" },
      { keys: ["mod", "shift", "F"], label: "Clear filters" },
      { keys: ["["], label: "Collapse column" },
      { keys: ["]"], label: "Expand column" },
    ],
  },
  {
    title: "Card",
    shortcuts: [
      { keys: ["A"], label: "Assign to me" },
      { keys: ["L"], label: "Add label" },
      { keys: ["D"], label: "Set due date" },
      { keys: ["mod", "enter"], label: "Move to done" },
      { keys: ["esc"], label: "Close card" },
    ],
  },
]

<KeyboardShortcuts groups={boardGroups} title="Board shortcuts" triggerLabel="Shortcuts" hotkey="" />`,
    node: <KeyboardShortcuts groups={boardGroups} title="Board shortcuts" triggerLabel="Shortcuts" hotkey="" />,
  },
  {
    title: "Controlled from your own trigger",
    description: "showTrigger false and open plus onOpenChange let a toolbar icon open the sheet; an empty hotkey leaves the global key to your app.",
    code: `function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 shadow-raised">
      <span className="text-sm font-medium text-fg">Lumen</span>
      <span className="text-xs text-fg-subtle">Invoices</span>
      <Button variant="ghost" size="icon-sm" aria-label="Keyboard shortcuts" className="ml-6" onClick={() => setOpen(true)}>
        <KeyboardIcon />
      </Button>
      <KeyboardShortcuts open={open} onOpenChange={setOpen} showTrigger={false} hotkey="" />
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
]
