"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A row of colour swatches that works as a radio group: pick one colour, get its CSS colour string back.
 *
 * Use for labels, tags, calendars and brand accents where a fixed palette beats a free picker. Uncontrolled unless `value` is passed.
 * Each swatch has a spoken name ("Violet"), so pass `{ value, label }` objects for custom palettes.
 * Keyboard: Tab enters the group, arrow keys move and select, Home/End jump to the ends. For a theme switcher use ThemePicker.
 *
 * @example
 * const [color, setColor] = React.useState("oklch(0.52 0.12 150)")
 * <ColorPicker label="Label colour" value={color} onChange={setColor} />
 */
type ColorPickerProps = {
  /** Controlled selection (a CSS colour string from `colors`). Leave undefined for an uncontrolled picker. */
  value?: string
  /** Initial selection for the uncontrolled picker. Defaults to the first colour. */
  defaultValue?: string
  /** Called with the chosen swatch's CSS colour string. */
  onChange?: (value: string) => void
  /** The palette. Plain strings are named by their value, so prefer `{ value, label }` for readable names. */
  colors?: (string | ColorSwatch)[]
  /** Accessible name for the group. Defaults to "Color". */
  label?: string
  disabled?: boolean
  className?: string
}

type ColorSwatch = { value: string; label: string }

const SWATCHES: ColorSwatch[] = [
  { value: "oklch(0.55 0.15 285)", label: "Violet" },
  { value: "oklch(0.55 0.15 250)", label: "Blue" },
  { value: "oklch(0.55 0.14 200)", label: "Teal" },
  { value: "oklch(0.52 0.12 150)", label: "Green" },
  { value: "oklch(0.62 0.13 75)", label: "Amber" },
  { value: "oklch(0.55 0.19 25)", label: "Red" },
  { value: "oklch(0.45 0.02 250)", label: "Slate" },
  { value: "oklch(0.85 0.01 250)", label: "Silver" },
]

const NEXT: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

function ColorPicker({ value, defaultValue, onChange, colors = SWATCHES, label = "Color", disabled, className }: ColorPickerProps) {
  const swatches = colors.map((c) => (typeof c === "string" ? { value: c, label: c } : c))
  const [internal, setInternal] = React.useState(defaultValue ?? swatches[0]?.value)
  const current = value ?? internal
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const selectedIndex = swatches.findIndex((c) => c.value === current)
  const tabStop = selectedIndex === -1 ? 0 : selectedIndex

  const select = (i: number) => {
    const c = swatches[i]
    if (!c) return
    refs.current[i]?.focus()
    if (c.value === current) return
    if (value === undefined) setInternal(c.value)
    onChange?.(c.value)
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled || undefined}
      data-slot="color-picker"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {swatches.map((c, i) => {
        const selected = c.value === current
        return (
          <button
            key={c.value}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={c.label}
            title={c.label}
            disabled={disabled}
            tabIndex={i === tabStop ? 0 : -1}
            className={cn(
              "size-8 rounded-lg border border-border outline-none",
              "transition-[box-shadow,transform] duration-[70ms] ease-hairline active:translate-y-[0.5px]",
              "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              "disabled:cursor-not-allowed disabled:opacity-45",
              selected && "ring-2 ring-accent ring-offset-2 ring-offset-bg"
            )}
            style={{ background: c.value }}
            onClick={() => select(i)}
            onKeyDown={(e) => {
              const n = swatches.length
              const to = e.key in NEXT ? (i + NEXT[e.key] + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : null
              if (to === null) return
              e.preventDefault()
              select(to)
            }}
          />
        )
      })}
    </div>
  )
}
export { ColorPicker }
export type { ColorPickerProps, ColorSwatch }
