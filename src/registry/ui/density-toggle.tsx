"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ToggleGroup } from "@/registry/ui/toggle-group"
import { Toggle } from "@/registry/ui/toggle"

function DensityToggle({
  value = "comfortable",
  onChange,
  className,
}: {
  value?: "compact" | "comfortable"
  onChange?: (value: "compact" | "comfortable") => void
  className?: string
}) {
  return (
    <ToggleGroup
      data-slot="density-toggle"
      className={cn(className)}
      value={value ? [value] : []}
      onValueChange={(v) => {
        const next = v[0] as "compact" | "comfortable" | undefined
        if (next) onChange?.(next)
      }}
    >
      <Toggle value="compact" size="sm" aria-label="Compact">
        Compact
      </Toggle>
      <Toggle value="comfortable" size="sm" aria-label="Comfortable">
        Comfortable
      </Toggle>
    </ToggleGroup>
  )
}
export { DensityToggle }
