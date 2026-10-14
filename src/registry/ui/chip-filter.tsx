"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type ChipOption = { value: string; label: string }

/** A row of pill-shaped radio chips for picking one filter, uncontrolled unless a value is passed. */
type ChipFilterProps = {
  options?: ChipOption[]
  /** Controlled selection. Leave undefined for an uncontrolled filter. */
  value?: string
  /** Initial selection for the uncontrolled filter. */
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

const SAMPLE_OPTIONS: ChipOption[] = [
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
  { value: "draft", label: "Draft" },
]

function ChipFilter({ options = SAMPLE_OPTIONS, value, defaultValue = "all", onChange, className }: ChipFilterProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const current = value ?? inner
  return (
    <div data-slot="chip-filter" role="radiogroup" className={cn("flex flex-wrap gap-1.5", className)}>
      {options.map((o) => {
        const on = o.value === current
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            className={cn(
              "h-7 rounded-full border px-3 text-xs font-medium text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent",
              on ? "border-accent bg-surface shadow-[inset_0_0_0_1px_var(--accent)]" : "border-border bg-surface hover:border-fg-subtle"
            )}
            onClick={() => {
              if (value === undefined) setInner(o.value)
              onChange?.(o.value)
            }}
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
