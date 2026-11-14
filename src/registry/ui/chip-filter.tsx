"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A row of pill-shaped radio chips for picking one filter, uncontrolled unless a value is passed.
 *
 * Use above a list or table to switch between a few status filters ("All", "Paid", "Overdue"). For many options use Select;
 * for toggling several filters at once use FacetFilter; for switching views use SegmentedControl or Tabs.
 * Keyboard: Tab enters the group, arrow keys move and select, Home/End jump to the ends.
 *
 * @example
 * const [status, setStatus] = React.useState("all")
 * <ChipFilter label="Invoice status" options={[{ value: "all", label: "All" }, { value: "paid", label: "Paid" }]} value={status} onChange={setStatus} />
 */
type ChipFilterProps = {
  /** Chips in order. `value` must be unique. */
  options?: ChipOption[]
  /** Controlled selection. Leave undefined for an uncontrolled filter. */
  value?: string
  /** Initial selection for the uncontrolled filter. */
  defaultValue?: string
  /** Called with the chip's `value` whenever the selection changes. */
  onChange?: (value: string) => void
  /** Accessible name for the radio group. Defaults to "Filter". */
  label?: string
  className?: string
}

type ChipOption = { value: string; label: string }

const SAMPLE_OPTIONS: ChipOption[] = [
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
  { value: "draft", label: "Draft" },
]

const NEXT: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

function ChipFilter({ options = SAMPLE_OPTIONS, value, defaultValue = "all", onChange, label = "Filter", className }: ChipFilterProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const current = value ?? inner
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const selectedIndex = options.findIndex((o) => o.value === current)
  // Roving tabindex: the selected chip (or the first) is the group's single tab stop.
  const tabStop = selectedIndex === -1 ? 0 : selectedIndex

  const select = (i: number) => {
    const o = options[i]
    if (!o) return
    refs.current[i]?.focus()
    if (o.value === current) return
    if (value === undefined) setInner(o.value)
    onChange?.(o.value)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = options.length
    let to: number | null = null
    if (e.key in NEXT) to = (i + NEXT[e.key] + n) % n
    else if (e.key === "Home") to = 0
    else if (e.key === "End") to = n - 1
    if (to === null) return
    e.preventDefault()
    select(to)
  }

  return (
    <div data-slot="chip-filter" role="radiogroup" aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {options.map((o, i) => {
        const on = o.value === current
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={on}
            data-state={on ? "on" : "off"}
            tabIndex={i === tabStop ? 0 : -1}
            className={cn(
              "relative h-7 rounded-full border px-3 text-xs font-medium text-fg outline-none after:absolute after:-inset-y-2 after:inset-x-0",
              "transition-[border-color,background-color] duration-[70ms] ease-hairline",
              "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              on ? "border-accent bg-accent-soft" : "border-border bg-surface hover:border-fg-subtle"
            )}
            onClick={() => select(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
export { ChipFilter }
export type { ChipFilterProps, ChipOption }
