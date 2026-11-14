"use client"
import * as React from "react"
import { RulerIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/*
 * Blueprint: the site-wide X-ray. Toggle it (or hold ⌥ / Alt) and every
 * component on the page shows its spec: box, padding, gaps, radius, type,
 * and the exact token classes it is built from. Like Figma's inspect, but on
 * the live product. It works on any element that carries data-slot.
 *
 * This module is the light half every page loads: the store, the keys and
 * the header button. The overlay that measures and draws loads on first use.
 */

/* ── store ─────────────────────────────────────────────────────────────── */
type State = { on: boolean; peek: boolean }
let state: State = { on: false, peek: false }
const subs = new Set<() => void>()
const set = (p: Partial<State>) => {
  state = { ...state, ...p }
  const active = state.on || state.peek
  if (typeof document !== "undefined") {
    if (active) document.documentElement.setAttribute("data-blueprint", "")
    else document.documentElement.removeAttribute("data-blueprint")
  }
  subs.forEach((f) => f())
}
/** True when the event comes from a field the user is typing in. */
export function isTyping(t: EventTarget | null) {
  const el = t instanceof Element ? t : null
  return !!el && (/^(input|textarea|select)$/i.test(el.tagName) || (el instanceof HTMLElement && el.isContentEditable))
}

/** Current state, for code outside React. */
export function blueprintState() {
  return state
}

export function useBlueprint() {
  const s = React.useSyncExternalStore(
    (f) => {
      subs.add(f)
      return () => subs.delete(f)
    },
    () => state,
    () => state
  )
  return { ...s, active: s.on || s.peek, toggle: () => set({ on: !state.on }), setOn: (on: boolean) => set({ on }) }
}

const Overlay = React.lazy(() => import("@/components/blueprint/blueprint-overlay"))

/** Mount once near the root. Wires the keyboard and loads the overlay the first time the mode turns on. */
export function BlueprintLayer() {
  const { active } = useBlueprint()
  const [used, setUsed] = React.useState(false)
  if (active && !used) setUsed(true)

  // Hold Alt to peek, Alt+Shift+B to toggle, Esc to leave. Not while typing: on a Mac, Option types characters.
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "KeyB" && e.altKey && e.shiftKey && !e.metaKey && !e.ctrlKey && !isTyping(e.target)) {
        e.preventDefault()
        set({ on: !state.on })
        return
      }
      if (e.key === "Alt" && !e.repeat && !isTyping(e.target)) set({ peek: true })
      if (e.key === "Escape" && state.on) set({ on: false })
    }
    const up = (e: KeyboardEvent) => e.key === "Alt" && set({ peek: false })
    const blur = () => set({ peek: false })
    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    window.addEventListener("blur", blur)
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
      window.removeEventListener("blur", blur)
    }
  }, [])

  if (!used) return null
  return (
    <React.Suspense fallback={null}>
      <Overlay />
    </React.Suspense>
  )
}

/** Header button. */
export function BlueprintToggle({ className }: { className?: string }) {
  const { on, toggle } = useBlueprint()
  return (
    <button
      type="button"
      data-blueprint-ignore
      onClick={toggle}
      aria-pressed={on}
      aria-label="Blueprint mode: show every component's spec. Hold Option or Alt to peek."
      aria-keyshortcuts="Alt+Shift+B"
      title="Blueprint (⌥⇧B, hold ⌥ to peek)"
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-lg outline-none transition-colors duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent",
        on ? "bg-accent text-on-accent shadow-ink" : "text-fg-muted hover:bg-sunken hover:text-fg",
        className
      )}
    >
      <RulerIcon className="size-4" />
    </button>
  )
}
