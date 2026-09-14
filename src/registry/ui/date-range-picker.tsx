"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { DatePicker } from "@/registry/ui/date-picker"

type DateRangePickerProps = {
  value?: { from?: string; to?: string }
  onChange?: (value: { from?: string; to?: string }) => void
  disabled?: boolean
  className?: string
  fromId?: string
  toId?: string
}

function DateRangePicker({ value, onChange, disabled, className, fromId, toId }: DateRangePickerProps) {
  const uid = React.useId()
  const from = fromId ?? `${uid}-from`
  const to = toId ?? `${uid}-to`
  const [internal, setInternal] = React.useState<{ from?: string; to?: string }>({})
  const current = value ?? internal
  const set = (next: { from?: string; to?: string }) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  return (
    <div data-slot="date-range-picker" className={cn("flex flex-wrap items-center gap-2", className)}>
      <DatePicker id={from} aria-label="Start date" disabled={disabled} value={current.from} onChange={(fromVal) => set({ ...current, from: fromVal })} />
      <span className="text-xs text-fg-muted">to</span>
      <DatePicker id={to} aria-label="End date" disabled={disabled} value={current.to} onChange={(toVal) => set({ ...current, to: toVal })} />
    </div>
  )
}
export { DateRangePicker }
