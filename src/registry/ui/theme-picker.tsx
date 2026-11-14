"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A three-way Light / Dark / System radio group. Pass `applyToDocument` to have it toggle the `dark` class on `<html>`.
 *
 * Works uncontrolled, or controlled with `value` + `onChange` when you persist the choice (cookie, localStorage). Arrow keys move and select, per the WAI-ARIA radio group pattern. Use `SegmentedControl` for any other small exclusive choice.
 *
 * @example
 * <ThemePicker applyToDocument value={mode} onChange={(m) => { setMode(m); localStorage.theme = m }} />
 */
type ThemeMode = "light" | "dark" | "system"

type ThemePickerProps = {
  /** Controlled mode. Pair with `onChange`. */
  value?: ThemeMode
  /** Initial mode for the uncontrolled picker. */
  defaultValue?: ThemeMode
  /** Called with the chosen mode. */
  onChange?: (value: ThemeMode) => void
  /** Toggle the `dark` class on `<html>` when the mode changes. Off by default so demos and apps that apply the theme themselves are not affected. */
  applyToDocument?: boolean
  className?: string
}

const MODES = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
] as const

function applyMode(mode: ThemeMode) {
  const dark = mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  document.documentElement.classList.toggle("dark", dark)
}

function ThemePicker({ value, defaultValue = "system", onChange, applyToDocument = false, className }: ThemePickerProps) {
  const [internal, setInternal] = React.useState<ThemeMode>(defaultValue)
  const current = value ?? internal
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])

  const select = (mode: ThemeMode) => {
    if (value === undefined) setInternal(mode)
    onChange?.(mode)
    if (applyToDocument) applyMode(mode)
  }

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0
    const to = e.key === "Home" ? 0 : e.key === "End" ? MODES.length - 1 : step ? (i + step + MODES.length) % MODES.length : -1
    if (to < 0) return
    e.preventDefault()
    refs.current[to]?.focus()
    select(MODES[to].id)
  }

  return (
    <div
      data-slot="theme-picker"
      role="radiogroup"
      aria-label="Theme"
      className={cn("inline-flex rounded-lg border border-border bg-surface p-1", className)}
    >
      {MODES.map((m, i) => (
        <button
          key={m.id}
          ref={(el) => {
            refs.current[i] = el
          }}
          type="button"
          role="radio"
          aria-checked={current === m.id}
          tabIndex={current === m.id ? 0 : -1}
          onClick={() => select(m.id)}
          onKeyDown={(e) => onKeyDown(e, i)}
          className={cn(
            "h-7 rounded-md px-2.5 text-xs font-medium outline-none transition-colors duration-[70ms]",
            "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            current === m.id ? "bg-sunken text-fg" : "text-fg-muted hover:text-fg"
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
export { ThemePicker }
export type { ThemePickerProps, ThemeMode }
