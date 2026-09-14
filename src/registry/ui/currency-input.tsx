"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

type CurrencyInputProps = {
  value?: string
  onChange?: (value: string) => void
  currency?: string
  disabled?: boolean
  className?: string
  id?: string
  "aria-label"?: string
}

function CurrencyInput({
  value,
  onChange,
  currency = "USD",
  disabled,
  className,
  id,
  ...a11y
}: CurrencyInputProps) {
  return (
    <div data-slot="currency-input" className={cn("relative w-40", className)}>
      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xs font-medium text-fg-muted">
        {currency}
      </span>
      <input
        id={id}
        inputMode="decimal"
        disabled={disabled}
        value={value}
        aria-label={a11y["aria-label"] ?? `Amount in ${currency}`}
        placeholder="0.00"
        className={cn(inputVariants({ size: "default" }), "pl-12 tabular-nums")}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}
export { CurrencyInput }
