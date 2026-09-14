"use client"
import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"
import { IconButton } from "@/registry/ui/icon-button"

type NumberInputProps = {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
  id?: string
  "aria-label"?: string
}

function NumberInput({
  value,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1,
  disabled,
  className,
  id,
  ...a11y
}: NumberInputProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value ?? internal
  const set = (n: number) => {
    let next = n
    if (min != null) next = Math.max(min, next)
    if (max != null) next = Math.min(max, next)
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  return (
    <div data-slot="number-input" className={cn("inline-flex items-center gap-1", className)}>
      <IconButton type="button" variant="outline" size="icon-sm" aria-label="Decrease" disabled={disabled} onClick={() => set(current - step)}>
        <MinusIcon />
      </IconButton>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        disabled={disabled}
        value={current}
        min={min}
        max={max}
        step={step}
        aria-label={a11y["aria-label"] ?? "Number"}
        className={cn(inputVariants({ size: "default" }), "w-20 text-center tabular-nums")}
        onChange={(e) => set(Number(e.target.value))}
      />
      <IconButton type="button" variant="outline" size="icon-sm" aria-label="Increase" disabled={disabled} onClick={() => set(current + step)}>
        <PlusIcon />
      </IconButton>
    </div>
  )
}
export { NumberInput }
