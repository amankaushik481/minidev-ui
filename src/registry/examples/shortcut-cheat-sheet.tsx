"use client"
import { ShortcutCheatSheet } from "@/registry/ui/shortcut-cheat-sheet"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Editor shortcuts",
    description: "Symbols such as ⌘ and ⇧ get spoken names for screen readers automatically.",
    code: `<ShortcutCheatSheet
  className="w-full max-w-sm"
  title="Invoice editor"
  rows={[
    { keys: ["⌘", "K"], action: "Command palette" },
    { keys: ["⌘", "↵"], action: "Send invoice" },
    { keys: ["⌘", "⇧", "D"], action: "Duplicate line item" },
    { keys: ["⎋"], action: "Close without saving" },
  ]}
/>`,
    node: (
      <ShortcutCheatSheet
        className="w-full max-w-sm"
        title="Invoice editor"
        rows={[
          { keys: ["⌘", "K"], action: "Command palette" },
          { keys: ["⌘", "↵"], action: "Send invoice" },
          { keys: ["⌘", "⇧", "D"], action: "Duplicate line item" },
          { keys: ["⎋"], action: "Close without saving" },
        ]}
      />
    ),
  },
  {
    title: "Key sequences",
    description: "Sequences look like chords, so say \"then\" in the action text.",
    code: `<ShortcutCheatSheet
  className="w-full max-w-sm"
  title="Go to"
  rows={[
    { keys: ["G", "I"], action: "Invoices (G, then I)" },
    { keys: ["G", "C"], action: "Customers (G, then C)" },
    { keys: ["G", "S"], action: "Settings (G, then S)" },
    { keys: ["?"], action: "Show this list" },
  ]}
/>`,
    node: (
      <ShortcutCheatSheet
        className="w-full max-w-sm"
        title="Go to"
        rows={[
          { keys: ["G", "I"], action: "Invoices (G, then I)" },
          { keys: ["G", "C"], action: "Customers (G, then C)" },
          { keys: ["G", "S"], action: "Settings (G, then S)" },
          { keys: ["?"], action: "Show this list" },
        ]}
      />
    ),
  },
]
