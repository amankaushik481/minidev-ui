"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const regions = [
  { id: "us-east", label: "US East", latency: "18ms" },
  { id: "eu-west", label: "EU West", latency: "42ms" },
  { id: "ap-south", label: "AP South", latency: "68ms" },
]

function RegionPicker({
  value = "us-east",
  onChange,
  className,
}: {
  value?: string
  onChange?: (id: string) => void
  className?: string
}) {
  return (
    <div data-slot="region-picker" role="radiogroup" aria-label="Region" className={cn("grid gap-2 sm:grid-cols-3", className)}>
      {regions.map((r) => {
        const on = r.id === value
        return (
          <button
            key={r.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange?.(r.id)}
            className={cn(
              "rounded-xl border px-3 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent",
              on ? "border-accent/40 bg-accent/10" : "border-border bg-surface hover:border-fg-subtle"
            )}
          >
            <p className="text-sm font-medium text-fg">{r.label}</p>
            <p className="mt-1 font-mono text-xs tabular-nums text-fg-muted">{r.latency}</p>
          </button>
        )
      })}
    </div>
  )
}
export { RegionPicker }
