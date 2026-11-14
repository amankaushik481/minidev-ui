"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

/**
 * A date field on the browser's native date input: a localised format, a built-in calendar popup and full keyboard and screen-reader support for free.
 *
 * The value is an ISO date string ("2026-11-14"), so store, compare (`a < b`) and send it as is. Uncontrolled unless `value` is passed;
 * set the value to "" to clear. Use `min` / `max` to bound it. For a start-end pair use DateRangePicker; for times use TimePicker;
 * for an always-visible month grid use CalendarMonth. Label it with FormField (same `id`) or `aria-label`.
 *
 * @example
 * const [due, setDue] = React.useState("2026-11-14")
 * <FormField id="due" label="Due date"><DatePicker id="due" value={due} onChange={setDue} min="2026-11-01" /></FormField>
 */
type DatePickerProps = {
  /** Controlled ISO date ("YYYY-MM-DD"), or "" for empty. Leave undefined for an uncontrolled field. */
  value?: string
  /** Initial ISO date for the uncontrolled field. */
  defaultValue?: string
  /** Called with the ISO date string, or "" when cleared. */
  onChange?: (value: string) => void
  /** Earliest selectable ISO date. */
  min?: string
  /** Latest selectable ISO date. */
  max?: string
  /** Form field name for FormData. */
  name?: string
  required?: boolean
  disabled?: boolean
  className?: string
  /** Id for a `<label htmlFor>` or FormField. */
  id?: string
  "aria-label"?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
}

function DatePicker({ value, defaultValue = "", onChange, min, max, name, required, disabled, className, id, ...aria }: DatePickerProps) {
  // Internal state backs the uncontrolled case, so the input is always controlled and never flips modes when `value` arrives later.
  const [inner, setInner] = React.useState(defaultValue)
  return (
    <input
      id={id}
      type="date"
      data-slot="date-picker"
      name={name}
      min={min}
      max={max}
      required={required}
      disabled={disabled}
      value={value ?? inner}
      aria-label={aria["aria-label"]}
      aria-invalid={aria["aria-invalid"]}
      aria-describedby={aria["aria-describedby"]}
      onChange={(e) => {
        if (value === undefined) setInner(e.target.value)
        onChange?.(e.target.value)
      }}
      className={cn(inputVariants({ size: "default" }), "w-44 tabular-nums", className)}
    />
  )
}
export { DatePicker }
export type { DatePickerProps }
