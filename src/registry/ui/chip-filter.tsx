"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function ChipFilter({
  options,
  value,
  onChange,
  className,
}: {
  options: { value: string; label: string }[]
  value?: string
  onChange?: (value: string) => void
  className?: string
}) {
  return (
    <div data-slot="chip-filter" role="radiogroup" className={cn("flex flex-wrap gap-1.5", className)}>
      {options.map((o) => {
        const on = o.value === value
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
            onClick={() => onChange?.(o.value)}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
export { ChipFilter }
