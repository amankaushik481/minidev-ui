"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const SWATCHES = [
  "oklch(0.55 0.15 285)",
  "oklch(0.55 0.15 250)",
  "oklch(0.55 0.14 200)",
  "oklch(0.52 0.12 150)",
  "oklch(0.62 0.13 75)",
  "oklch(0.55 0.19 25)",
  "oklch(0.45 0.02 250)",
  "oklch(0.85 0.01 250)",
]

type ColorPickerProps = {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  const [internal, setInternal] = React.useState(SWATCHES[0])
  const current = value ?? internal
  return (
    <div role="listbox" aria-label="Color" data-slot="color-picker" className={cn("flex flex-wrap gap-2", className)}>
      {SWATCHES.map((c) => {
        const selected = c === current
        return (
          <button
            key={c}
            type="button"
            role="option"
            aria-selected={selected}
            aria-label={c}
            className={cn(
              "size-8 rounded-lg border border-border outline-none",
              "transition-[box-shadow,transform] duration-[70ms] active:translate-y-[0.5px]",
              "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              selected && "ring-2 ring-accent ring-offset-2 ring-offset-bg"
            )}
            style={{ background: c }}
            onClick={() => { if (value === undefined) setInternal(c); onChange?.(c) }}
          />
        )
      })}
    </div>
  )
}
export { ColorPicker }
