"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { DatePicker } from "@/registry/ui/date-picker"

/**
 * DateRangePicker — a start and end date as two native date inputs in one labelled group.
 *
 * Use for from/to filters, reporting periods and bookings. For a single date
 * use `DatePicker`; for a visible month grid use `CalendarMonth`.
 * Dates are ISO day strings ("2026-11-14"), the format `<input type="date">` uses.
 *
 * @example
 * const [range, setRange] = React.useState<DateRange>({ from: "2026-11-01", to: "2026-11-30" })
 * <DateRangePicker value={range} onChange={setRange} />
 * <DateRangePicker fromName="from" toName="to" /> // submits both days with a <form>
 */
type DateRange = {
  /** Start day as an ISO string, e.g. "2026-11-01". */
  from?: string
  /** End day as an ISO string, inclusive. */
  to?: string
}

type DateRangePickerProps = {
  /** Controlled range. Leave out to let the picker hold its own state. */
  value?: DateRange
  /** Initial range when uncontrolled. */
  defaultValue?: DateRange
  /** Called with the whole range whenever either end changes. */
  onChange?: (value: DateRange) => void
  disabled?: boolean
  className?: string
  /** Id for the start input, to point an external <label> at it. */
  fromId?: string
  /** Id for the end input. */
  toId?: string
  /** Form field name for the start date, so FormData includes it. No name by default. */
  fromName?: string
  /** Form field name for the end date. */
  toName?: string
  /** Accessible name for the group. */
  "aria-label"?: string
}

function DateRangePicker({
  value,
  defaultValue,
  onChange,
  disabled,
  className,
  fromId,
  toId,
  fromName,
  toName,
  "aria-label": ariaLabel = "Date range",
}: DateRangePickerProps) {
  const uid = React.useId()
  const from = fromId ?? `${uid}-from`
  const to = toId ?? `${uid}-to`
  const [internal, setInternal] = React.useState<DateRange>(defaultValue ?? {})
  const current = value ?? internal
  const set = (next: DateRange) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  return (
    <div role="group" aria-label={ariaLabel} data-slot="date-range-picker" className={cn("flex flex-wrap items-center gap-2", className)}>
      <DatePicker id={from} name={fromName} aria-label="Start date" disabled={disabled} value={current.from} onChange={(fromVal) => set({ ...current, from: fromVal })} />
      <span aria-hidden className="text-xs text-fg-muted">
        to
      </span>
      <DatePicker id={to} name={toName} aria-label="End date" disabled={disabled} value={current.to} onChange={(toVal) => set({ ...current, to: toVal })} />
    </div>
  )
}
export { DateRangePicker }
export type { DateRangePickerProps, DateRange }
