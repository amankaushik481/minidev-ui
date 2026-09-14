"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Kbd } from "@/registry/ui/kbd"

type Row = { keys: string[]; action: string }

function ShortcutCheatSheet({
  rows = [
    { keys: ["⌘", "K"], action: "Command palette" },
    { keys: ["⌘", "⇧", "P"], action: "Switch project" },
    { keys: ["G", "I"], action: "Go to inbox" },
    { keys: ["?"], action: "Show shortcuts" },
  ],
  className,
}: {
  rows?: Row[]
  className?: string
}) {
  return (
    <div data-slot="shortcut-cheat-sheet" className={cn("overflow-hidden rounded-xl border border-border bg-surface", className)}>
      <div className="border-b border-border bg-sunken px-4 py-2.5">
        <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Keyboard shortcuts</p>
      </div>
      <ul className="divide-y divide-border">
        {rows.map((r) => (
          <li key={r.action} className="flex items-center justify-between gap-4 px-4 py-2.5">
            <span className="text-sm text-fg">{r.action}</span>
            <span className="flex items-center gap-1">
              {r.keys.map((k) => (
                <Kbd key={k}>{k}</Kbd>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export { ShortcutCheatSheet }
