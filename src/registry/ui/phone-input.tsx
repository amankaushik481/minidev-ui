"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

type PhoneInputProps = {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
  id?: string
  "aria-label"?: string
  placeholder?: string
}

function PhoneInput({
  value,
  onChange,
  disabled,
  className,
  id,
  placeholder = "+1 (555) 000-0000",
  ...a11y
}: PhoneInputProps) {
  return (
    <input
      id={id}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      disabled={disabled}
      value={value}
      placeholder={placeholder}
      aria-label={a11y["aria-label"] ?? "Phone number"}
      data-slot="phone-input"
      className={cn(inputVariants({ size: "default" }), "tabular-nums", className)}
      onChange={(e) => onChange?.(e.target.value)}
    />
  )
}
export { PhoneInput }
