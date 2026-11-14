"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Kbd } from "@/registry/ui/kbd"

/**
 * A titled card listing keyboard shortcuts: action on the left, keycaps on the right.
 *
 * Use it in a help panel or behind a "?" shortcut. For a single inline shortcut hint use Kbd;
 * for a searchable list of actions use CommandPalette.
 *
 * @example
 * <ShortcutCheatSheet rows={[{ keys: ["⌘", "K"], action: "Command palette" }, { keys: ["?"], action: "Show shortcuts" }]} />
 */
type Row = {
  /** Keys pressed together or in sequence, e.g. ["⌘", "K"] or ["G", "I"]. Symbols are spoken by name. */
  keys: string[]
  /** What the shortcut does. */
  action: string
}

type ShortcutCheatSheetProps = {
  /** Shortcuts to list. Defaults to a short set of app shortcuts. */
  rows?: Row[]
  /** Heading above the list. */
  title?: string
  className?: string
}

const SPOKEN: Record<string, string> = { "⌘": "Command", "⇧": "Shift", "⌥": "Option", "⌃": "Control", "↵": "Enter", "⌫": "Backspace", "⎋": "Escape", "↑": "Up", "↓": "Down", "←": "Left", "→": "Right", "?": "Question mark" }

const SAMPLE_ROWS: Row[] = [
  { keys: ["⌘", "K"], action: "Command palette" },
  { keys: ["⌘", "⇧", "P"], action: "Switch project" },
  { keys: ["G", "I"], action: "Go to inbox" },
  { keys: ["?"], action: "Show shortcuts" },
]

function ShortcutCheatSheet({ rows = SAMPLE_ROWS, title = "Keyboard shortcuts", className }: ShortcutCheatSheetProps) {
  const id = React.useId()
  return (
    <div data-slot="shortcut-cheat-sheet" className={cn("overflow-hidden rounded-xl border border-border bg-surface", className)}>
      <div className="border-b border-border bg-sunken px-4 py-2.5">
        <p id={id} className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{title}</p>
      </div>
      <ul aria-labelledby={id} className="divide-y divide-border">
        {rows.map((r, i) => (
          <li key={`${r.action}-${i}`} className="flex items-center justify-between gap-4 px-4 py-2.5">
            <span className="text-sm text-fg">{r.action}</span>
            <span className="sr-only">{r.keys.map((k) => SPOKEN[k] ?? k).join(" ")}</span>
            <span aria-hidden className="flex items-center gap-1">
              {r.keys.map((k, j) => (
                <Kbd key={j}>{k}</Kbd>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export { ShortcutCheatSheet }
export type { ShortcutCheatSheetProps }
