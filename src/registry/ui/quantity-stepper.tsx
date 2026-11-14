"use client"
import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * QuantityStepper — minus and plus buttons around a number, clamped between `min` and `max`.
 *
 * Use it for cart quantities, seat counts and guest numbers where people nudge a small integer.
 * For free numeric entry use NumberInput; for a continuous range use Slider.
 *
 * @example
 * const [qty, setQty] = React.useState(1)
 * <QuantityStepper value={qty} onChange={setQty} min={1} max={10} aria-label="Tickets" />
 */
function QuantityStepper({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  step = 1,
  onChange,
  disabled,
  "aria-label": ariaLabel = "Quantity",
  className,
}: {
  /** Controlled quantity. */
  value?: number
  /** Starting quantity when uncontrolled. */
  defaultValue?: number
  /** Lowest allowed value; the minus button disables there. */
  min?: number
  /** Highest allowed value; the plus button disables there. */
  max?: number
  /** Amount each press adds or removes. */
  step?: number
  /** Fires with the clamped new value. */
  onChange?: (n: number) => void
  disabled?: boolean
  /** Names the group and the buttons, e.g. "Tickets" gives "Decrease tickets". */
  "aria-label"?: string
  className?: string
}) {
  const [inner, setInner] = React.useState(defaultValue)
  const n = value ?? inner
  const set = (next: number) => {
    const v = Math.min(max, Math.max(min, next))
    if (v === n) return
    onChange?.(v)
    if (value === undefined) setInner(v)
  }
  const noun = ariaLabel.toLowerCase()
  return (
    <div
      data-slot="quantity-stepper"
      role="group"
      aria-label={ariaLabel}
      className={cn("inline-flex items-center gap-1 rounded-lg border border-border bg-surface p-1", disabled && "opacity-45", className)}
    >
      <Button type="button" size="icon-sm" variant="ghost" aria-label={`Decrease ${noun}`} onClick={() => set(n - step)} disabled={disabled || n <= min}>
        <MinusIcon aria-hidden />
      </Button>
      <output aria-live="polite" className="min-w-8 text-center font-mono text-sm tabular-nums text-fg">
        {n}
      </output>
      <Button type="button" size="icon-sm" variant="ghost" aria-label={`Increase ${noun}`} onClick={() => set(n + step)} disabled={disabled || n >= max}>
        <PlusIcon aria-hidden />
      </Button>
    </div>
  )
}
export { QuantityStepper }
