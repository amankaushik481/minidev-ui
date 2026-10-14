"use client"
import * as React from "react"
import { KeyboardIcon, SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/registry/ui/dialog"
import { Input } from "@/registry/ui/input"
import { Kbd, KbdGroup } from "@/registry/ui/kbd"

/**
 * A keyboard shortcuts cheat sheet in a dialog, opened with the ? key or a trigger button, with search and the right modifier glyphs for the viewer's platform.
 * Shortcuts are grouped, filtered as you type, and written once with
 * portable names (mod, shift, alt, enter) that render as ⌘ ⇧ ⌥ ↵ on a Mac
 * and Ctrl, Shift, Alt, Enter elsewhere. The platform is read after mount,
 * so server and client markup match.
 */
type KeyboardShortcut = {
  /** Keys pressed together. Use mod for Command or Control, plus shift, alt, ctrl, enter, esc, tab, backspace, space, up, down, left, right. */
  keys: string[]
  label: string
}

type KeyboardShortcutGroup = {
  title: string
  shortcuts: KeyboardShortcut[]
}

type KeyboardShortcutsProps = {
  groups?: KeyboardShortcutGroup[]
  title?: string
  /** Key that opens the sheet from anywhere on the page, outside text fields. Empty disables it. */
  hotkey?: string
  /** Controlled open state. Leave undefined for internal state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Render the built-in trigger button. */
  showTrigger?: boolean
  triggerLabel?: string
  className?: string
}

const SAMPLE_GROUPS: KeyboardShortcutGroup[] = [
  {
    title: "Navigation",
    shortcuts: [
      { keys: ["mod", "K"], label: "Command palette" },
      { keys: ["G", "O"], label: "Go to overview" },
      { keys: ["G", "I"], label: "Go to invoices" },
      { keys: ["G", "C"], label: "Go to customers" },
      { keys: ["/"], label: "Search" },
    ],
  },
  {
    title: "Invoices",
    shortcuts: [
      { keys: ["N"], label: "New invoice" },
      { keys: ["mod", "enter"], label: "Send invoice" },
      { keys: ["mod", "shift", "P"], label: "Mark as paid" },
      { keys: ["mod", "D"], label: "Duplicate" },
      { keys: ["mod", "backspace"], label: "Archive" },
    ],
  },
  {
    title: "Editor",
    shortcuts: [
      { keys: ["mod", "B"], label: "Bold" },
      { keys: ["mod", "I"], label: "Italic" },
      { keys: ["mod", "Z"], label: "Undo" },
      { keys: ["mod", "shift", "Z"], label: "Redo" },
      { keys: ["mod", "S"], label: "Save draft" },
    ],
  },
]

const MAC: Record<string, string> = { mod: "⌘", shift: "⇧", alt: "⌥", ctrl: "⌃", enter: "↵", backspace: "⌫", esc: "Esc", tab: "⇥", space: "Space", up: "↑", down: "↓", left: "←", right: "→" }
const OTHER: Record<string, string> = { mod: "Ctrl", shift: "Shift", alt: "Alt", ctrl: "Ctrl", enter: "Enter", backspace: "Backspace", esc: "Esc", tab: "Tab", space: "Space", up: "↑", down: "↓", left: "←", right: "→" }
/** Words a search should also match, so "command" finds ⌘ shortcuts on a Mac. */
const ALIASES: Record<string, string> = { mod: "command cmd control ctrl", shift: "shift", alt: "alt option", ctrl: "control ctrl", enter: "enter return", backspace: "backspace delete", esc: "escape", tab: "tab" }

function keyLabel(key: string, mac: boolean) {
  const k = key.toLowerCase()
  return (mac ? MAC : OTHER)[k] ?? key
}

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false
  return el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)
}

function KeyboardShortcuts({
  groups = SAMPLE_GROUPS,
  title = "Keyboard shortcuts",
  hotkey = "?",
  open,
  onOpenChange,
  showTrigger = true,
  triggerLabel = "Keyboard shortcuts",
  className,
}: KeyboardShortcutsProps) {
  const id = React.useId()
  const [inner, setInner] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [mac, setMac] = React.useState(false)
  const isOpen = open ?? inner
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInner(next)
      onOpenChange?.(next)
    },
    [open, onOpenChange]
  )

  React.useEffect(() => {
    const nav = navigator as Navigator & { userAgentData?: { platform?: string } }
    const platform = nav.userAgentData?.platform ?? nav.platform ?? nav.userAgent
    setMac(/mac|iphone|ipad|ipod/i.test(platform))
  }, [])

  React.useEffect(() => {
    if (!hotkey) return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      // Some layouts report Shift+/ with key "/" instead of "?".
      const hit = e.key === hotkey || (hotkey === "?" && e.key === "/" && e.shiftKey)
      if (!hit || isTypingTarget(e.target)) return
      e.preventDefault()
      setOpen(true)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [hotkey, setOpen])

  React.useEffect(() => {
    if (!isOpen) setQuery("")
  }, [isOpen])

  const q = query.trim().toLowerCase()
  const visible = groups
    .map((g) => ({
      ...g,
      shortcuts: q
        ? g.shortcuts.filter((s) => {
            const hay = [s.label, g.title, ...s.keys.flatMap((k) => [k, keyLabel(k, mac), ALIASES[k.toLowerCase()] ?? ""])].join(" ").toLowerCase()
            return hay.includes(q)
          })
        : g.shortcuts,
    }))
    .filter((g) => g.shortcuts.length)
  const count = visible.reduce((n, g) => n + g.shortcuts.length, 0)

  return (
    <div data-slot="keyboard-shortcuts" className={cn("inline-flex", className)}>
      {showTrigger ? (
        <Button type="button" variant="outline" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={isOpen} data-slot="keyboard-shortcuts-trigger">
          <KeyboardIcon />
          {triggerLabel}
          {hotkey ? <Kbd className="ml-1">{hotkey}</Kbd> : null}
        </Button>
      ) : null}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 sm:max-w-xl" data-slot="keyboard-shortcuts-sheet">
          <DialogHeader className="border-b border-border px-5 pt-5 pb-4">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {hotkey ? (
                <>
                  Press <Kbd>{hotkey}</Kbd> anywhere to open this sheet.
                </>
              ) : (
                "Everything you can do without leaving the keyboard."
              )}
            </DialogDescription>
            <div className="relative mt-2">
              <SearchIcon aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-subtle" />
              <Input
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shortcuts"
                aria-label="Search shortcuts"
                data-slot="keyboard-shortcuts-search"
                className="pl-9"
              />
            </div>
          </DialogHeader>
          <div data-slot="keyboard-shortcuts-body" className="max-h-[min(60vh,480px)] overflow-y-auto px-5 py-4">
            {count ? (
              <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {visible.map((g, gi) => (
                  <section key={g.title} data-slot="keyboard-shortcuts-group" aria-labelledby={`${id}-g${gi}`} className="min-w-0">
                    <h3 id={`${id}-g${gi}`} className="mb-1 text-[11px] font-medium tracking-[0.02em] text-fg-subtle uppercase">
                      {g.title}
                    </h3>
                    <ul className="divide-y divide-border">
                      {g.shortcuts.map((s) => (
                        <li key={s.label} className="flex h-9 items-center justify-between gap-4">
                          <span className="truncate text-sm text-fg">{s.label}</span>
                          <KbdGroup aria-label={s.keys.map((k) => keyLabel(k, mac)).join(" ")}>
                            {s.keys.map((k, i) => (
                              <Kbd key={`${k}-${i}`} aria-hidden>
                                {keyLabel(k, mac)}
                              </Kbd>
                            ))}
                          </KbdGroup>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-fg-muted">No shortcuts match “{query.trim()}”.</p>
            )}
          </div>
          <div className="flex items-center justify-between rounded-b-2xl border-t border-border bg-sunken px-5 py-2.5 text-xs text-fg-muted">
            <span>
              {count} {count === 1 ? "shortcut" : "shortcuts"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Kbd>Esc</Kbd> to close
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { KeyboardShortcuts }
export type { KeyboardShortcutsProps, KeyboardShortcut, KeyboardShortcutGroup }
