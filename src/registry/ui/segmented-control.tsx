"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ToggleGroup } from "@/registry/ui/toggle-group"
import { Toggle } from "@/registry/ui/toggle"

function SegmentedControl({
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
    <ToggleGroup
      data-slot="segmented-control"
      className={cn(className)}
      value={value ? [value] : []}
      onValueChange={(v) => {
        if (v[0]) onChange?.(v[0])
      }}
    >
      {options.map((o) => (
        <Toggle key={o.value} value={o.value} size="sm" aria-label={o.label}>
          {o.label}
        </Toggle>
      ))}
    </ToggleGroup>
  )
}
export { SegmentedControl }
