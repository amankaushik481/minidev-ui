"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ToggleGroup } from "@/registry/ui/toggle-group"
import { Toggle } from "@/registry/ui/toggle"

/**
 * DensityToggle — a two-option Compact / Comfortable switch for table and list row density.
 *
 * Use in a table toolbar or view menu. For other short option sets use
 * `SegmentedControl`; for on/off settings use `Switch`.
 *
 * @example
 * const [density, setDensity] = React.useState<Density>("comfortable")
 * <DensityToggle value={density} onChange={setDensity} />
 */
type Density = "compact" | "comfortable"

type DensityToggleProps = {
  /** Controlled density. */
  value?: "compact" | "comfortable"
  /** Initial density when uncontrolled. */
  defaultValue?: "compact" | "comfortable"
  /** Called with the newly chosen density. Never called with an empty selection. */
  onChange?: (value: "compact" | "comfortable") => void
  className?: string
}

function DensityToggle({ value: valueProp, defaultValue = "comfortable", onChange, className }: DensityToggleProps) {
  const [inner, setInner] = React.useState<Density>(defaultValue)
  const value = valueProp ?? inner
  return (
    <ToggleGroup
      data-slot="density-toggle"
      aria-label="Density"
      className={cn(className)}
      value={[value]}
      onValueChange={(v) => {
        const next = v[0] as Density | undefined
        if (!next) return
        if (valueProp === undefined) setInner(next)
        onChange?.(next)
      }}
    >
      <Toggle value="compact" size="sm">
        Compact
      </Toggle>
      <Toggle value="comfortable" size="sm">
        Comfortable
      </Toggle>
    </ToggleGroup>
  )
}
export { DensityToggle }
export type { DensityToggleProps, Density }
