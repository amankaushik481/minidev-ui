"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const levels = [
  { value: "low", label: "Low", color: "bg-fg-subtle" },
  { value: "medium", label: "Medium", color: "bg-warning" },
  { value: "high", label: "High", color: "bg-danger" },
  { value: "urgent", label: "Urgent", color: "bg-danger" },
] as const

function PriorityPicker({
  value,
  onChange,
  className,
}: {
  value?: string
  onChange?: (value: string) => void
  className?: string
}) {
  return (
    <div data-slot="priority-picker" role="radiogroup" aria-label="Priority" className={cn("flex flex-wrap gap-1.5", className)}>
      {levels.map((l) => {
        const on = l.value === value
        return (
          <button
            key={l.value}
            type="button"
            role="radio"
            aria-checked={on}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded-md border px-2 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-accent",
              on ? "border-border bg-sunken text-fg" : "border-transparent text-fg-muted hover:bg-sunken"
            )}
            onClick={() => onChange?.(l.value)}
          >
            <span className={cn("size-1.5 rounded-full", l.color)} aria-hidden />
            {l.label}
          </button>
        )
      })}
    </div>
  )
}
export { PriorityPicker }
