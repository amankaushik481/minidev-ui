"use client"
import * as React from "react"
import { DateRangePicker } from "@/registry/ui/date-range-picker"
import { FormField } from "@/registry/ui/form-field"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

type Range = { from?: string; to?: string }

function ControlledDemo() {
  const [range, setRange] = React.useState<Range>({ from: "2026-10-01", to: "2026-10-31" })
  const days = range.from && range.to ? Math.round((Date.parse(range.to) - Date.parse(range.from)) / 86400000) + 1 : 0
  return (
    <div className="flex flex-col gap-3">
      <DateRangePicker value={range} onChange={setRange} />
      <p className="text-xs text-fg-muted">{days > 0 ? "The report covers " + days + " days" : "Pick a start and an end date"}</p>
    </div>
  )
}

function PresetsDemo() {
  const [range, setRange] = React.useState<Range>({})
  const iso = (d: Date) => d.toISOString().slice(0, 10)
  const lastDays = (n: number) => {
    const to = new Date()
    const from = new Date(to)
    from.setDate(to.getDate() - (n - 1))
    setRange({ from: iso(from), to: iso(to) })
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => lastDays(7)}>Last 7 days</Button>
        <Button size="sm" variant="outline" onClick={() => lastDays(30)}>Last 30 days</Button>
        <Button size="sm" variant="ghost" onClick={() => setRange({})}>Clear</Button>
      </div>
      <DateRangePicker value={range} onChange={setRange} />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled range",
    description: "The value is an object with from and to as ISO strings, which makes the maths simple.",
    code: `type Range = { from?: string; to?: string }

function ControlledDemo() {
  const [range, setRange] = React.useState<Range>({ from: "2026-10-01", to: "2026-10-31" })
  const days = range.from && range.to ? Math.round((Date.parse(range.to) - Date.parse(range.from)) / 86400000) + 1 : 0
  return (
    <div className="flex flex-col gap-3">
      <DateRangePicker value={range} onChange={setRange} />
      <p className="text-xs text-fg-muted">{days > 0 ? "The report covers " + days + " days" : "Pick a start and an end date"}</p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Preset ranges",
    description: "Buttons set the range from today; Clear resets both fields with an empty object.",
    code: `function PresetsDemo() {
  const [range, setRange] = React.useState<Range>({})
  const iso = (d: Date) => d.toISOString().slice(0, 10)
  const lastDays = (n: number) => {
    const to = new Date()
    const from = new Date(to)
    from.setDate(to.getDate() - (n - 1))
    setRange({ from: iso(from), to: iso(to) })
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => lastDays(7)}>Last 7 days</Button>
        <Button size="sm" variant="outline" onClick={() => lastDays(30)}>Last 30 days</Button>
        <Button size="sm" variant="ghost" onClick={() => setRange({})}>Clear</Button>
      </div>
      <DateRangePicker value={range} onChange={setRange} />
    </div>
  )
}`,
    node: <PresetsDemo />,
  },
  {
    title: "With form field",
    description: "Give the start input an id with fromId so the FormField label focuses it.",
    code: `<FormField id="period-from" label="Billing period" description="Usage inside this window appears on INV-2041." className="w-fit">
  <DateRangePicker fromId="period-from" toId="period-to" />
</FormField>`,
    node: (
      <FormField id="period-from" label="Billing period" description="Usage inside this window appears on INV-2041." className="w-fit">
        <DateRangePicker fromId="period-from" toId="period-to" />
      </FormField>
    ),
  },
  {
    title: "Disabled",
    description: "Both inputs are disabled together and keep their dates visible.",
    code: `<DateRangePicker disabled value={{ from: "2026-09-01", to: "2026-09-30" }} />`,
    node: <DateRangePicker disabled value={{ from: "2026-09-01", to: "2026-09-30" }} />,
  },
]
