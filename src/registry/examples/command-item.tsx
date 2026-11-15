"use client"
import * as React from "react"
import { CreditCardIcon, FilePlusIcon, MoonIcon, UserPlusIcon } from "lucide-react"
import { CommandItem } from "@/registry/ui/command-item"
import type { Example } from "./types"

const ACTIONS = [
  { id: "invoice", label: "New invoice", shortcut: "⌘N", icon: <FilePlusIcon /> },
  { id: "invite", label: "Invite teammate", shortcut: "⌘I", icon: <UserPlusIcon /> },
  { id: "billing", label: "Open billing", icon: <CreditCardIcon /> },
  { id: "theme", label: "Toggle dark mode", shortcut: "⇧⌘L", icon: <MoonIcon /> },
]

function HighlightedList() {
  const [active, setActive] = React.useState("invoice")
  return (
    <div className="w-full max-w-xs rounded-xl border border-border bg-raised p-1 shadow-overlay">
      {ACTIONS.map((a) => (
        <CommandItem
          key={a.id}
          icon={a.icon}
          shortcut={a.shortcut}
          active={a.id === active}
          onMouseEnter={() => setActive(a.id)}
          onFocus={() => setActive(a.id)}
        >
          {a.label}
        </CommandItem>
      ))}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Quick actions card",
    description: "A short list of actions with icons and shortcut hints; the shortcuts are display only.",
    code: `<div className="w-full max-w-xs rounded-xl border border-border bg-surface p-1">
  <CommandItem icon={<FilePlusIcon />} shortcut="⌘N">New invoice</CommandItem>
  <CommandItem icon={<UserPlusIcon />} shortcut="⌘I">Invite teammate</CommandItem>
  <CommandItem icon={<CreditCardIcon />} disabled>Open billing (owners only)</CommandItem>
</div>`,
    node: (
      <div className="w-full max-w-xs rounded-xl border border-border bg-surface p-1">
        <CommandItem icon={<FilePlusIcon />} shortcut="⌘N">New invoice</CommandItem>
        <CommandItem icon={<UserPlusIcon />} shortcut="⌘I">Invite teammate</CommandItem>
        <CommandItem icon={<CreditCardIcon />} disabled>Open billing (owners only)</CommandItem>
      </div>
    ),
  },
  {
    title: "Highlight follows pointer and focus",
    description: "The parent owns which row is active; here it follows the mouse and Tab focus.",
    code: `const ACTIONS = [
  { id: "invoice", label: "New invoice", shortcut: "⌘N", icon: <FilePlusIcon /> },
  { id: "invite", label: "Invite teammate", shortcut: "⌘I", icon: <UserPlusIcon /> },
  { id: "billing", label: "Open billing", icon: <CreditCardIcon /> },
  { id: "theme", label: "Toggle dark mode", shortcut: "⇧⌘L", icon: <MoonIcon /> },
]

function HighlightedList() {
  const [active, setActive] = React.useState("invoice")
  return (
    <div className="w-full max-w-xs rounded-xl border border-border bg-raised p-1 shadow-overlay">
      {ACTIONS.map((a) => (
        <CommandItem
          key={a.id}
          icon={a.icon}
          shortcut={a.shortcut}
          active={a.id === active}
          onMouseEnter={() => setActive(a.id)}
          onFocus={() => setActive(a.id)}
        >
          {a.label}
        </CommandItem>
      ))}
    </div>
  )
}`,
    node: <HighlightedList />,
  },
]
