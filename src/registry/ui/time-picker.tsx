"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

/**
 * A native time field (`<input type="time">`) in the kit's input styling; the value is a 24-hour "HH:mm" string.
 *
 * The browser supplies the locale-aware picker and keyboard support. Works controlled (`value` + `onChange`) or uncontrolled (`defaultValue`), and passes through `name`, `min`, `max`, `step` and `required`. Use `DatePicker` for dates.
 *
 * @example
 * <TimePicker value={time} onChange={setTime} min="09:00" max="17:00" aria-label="Standup time" />
 */
type TimePickerProps = Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange" | "size"> & {
  /** Controlled value, "HH:mm" (or "HH:mm:ss" with a seconds `step`). Use "" for empty. */
  value?: string
  /** Initial value for the uncontrolled field. */
  defaultValue?: string
  /** Called with the new "HH:mm" string, or "" when cleared. */
  onChange?: (value: string) => void
  /** Field height. */
  size?: "sm" | "default" | "lg"
}

function TimePicker({ value, defaultValue, onChange, size = "default", className, ...props }: TimePickerProps) {
  return (
    <input
      type="time"
      data-slot="time-picker"
      value={value}
      defaultValue={value === undefined ? defaultValue : undefined}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(inputVariants({ size }), "w-40 tabular-nums", className)}
      {...props}
    />
  )
}
export { TimePicker }
export type { TimePickerProps }
