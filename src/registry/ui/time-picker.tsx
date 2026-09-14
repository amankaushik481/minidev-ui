"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

type TimePickerProps = {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
  id?: string
  "aria-label"?: string
}

function TimePicker({ value, onChange, disabled, className, id, ...a11y }: TimePickerProps) {
  return (
    <input
      id={id}
      type="time"
      data-slot="time-picker"
      disabled={disabled}
      value={value ?? ""}
      aria-label={a11y["aria-label"]}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(inputVariants({ size: "default" }), "w-40", className)}
    />
  )
}
export { TimePicker }
