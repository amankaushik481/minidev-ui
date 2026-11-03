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
  React.useEffect(() => {
    if (active) setUsed(true)
  }, [active])

  // Hold Alt to peek, Esc to leave.
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Alt" && !e.repeat) set({ peek: true })
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
      title="Blueprint (hold ⌥ to peek)"
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
