"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

type DatePickerProps = {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
  id?: string
  "aria-label"?: string
}

function DatePicker({ value, onChange, disabled, className, id, ...a11y }: DatePickerProps) {
  return (
    <input
      id={id}
      type="date"
      data-slot="date-picker"
      disabled={disabled}
      value={value ?? ""}
      aria-label={a11y["aria-label"]}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(inputVariants({ size: "default" }), "w-44", className)}
    />
  )
}
export { DatePicker }
