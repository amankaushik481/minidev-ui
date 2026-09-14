"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function QuantityStepper({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  className,
}: {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  onChange?: (n: number) => void
  className?: string
}) {
  const [inner, setInner] = React.useState(defaultValue)
  const n = value ?? inner
  const set = (next: number) => {
    const v = Math.min(max, Math.max(min, next))
    onChange?.(v)
    if (value === undefined) setInner(v)
  }
  return (
    <div data-slot="quantity-stepper" className={cn("inline-flex items-center gap-1 rounded-lg border border-border bg-surface p-1", className)}>
      <Button type="button" size="icon-sm" variant="ghost" aria-label="Decrease" onClick={() => set(n - 1)} disabled={n <= min}>−</Button>
      <span className="min-w-8 text-center font-mono text-sm tabular-nums text-fg">{n}</span>
      <Button type="button" size="icon-sm" variant="ghost" aria-label="Increase" onClick={() => set(n + 1)} disabled={n >= max}>+</Button>
    </div>
  )
}
export { QuantityStepper }
