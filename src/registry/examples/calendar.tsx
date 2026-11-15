"use client"
import * as React from "react"
import { Calendar, type CalendarPreset, type DateRange } from "@/registry/ui/calendar"
import type { Example } from "./types"

// Fixed "today" so the docs page renders the same on the server and in the browser. In an app, use new Date().
const TODAY = new Date(2026, 10, 14)
const daysAgo = (n: number) => new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() - n)
const PRESETS: CalendarPreset[] = [
  { label: "Today", range: { from: TODAY, to: TODAY } },
  { label: "Last 7 days", range: { from: daysAgo(6), to: TODAY } },
  { label: "Last 30 days", range: { from: daysAgo(29), to: TODAY } },
  { label: "This month", range: { from: new Date(2026, 10, 1), to: TODAY } },
  { label: "Last month", range: { from: new Date(2026, 9, 1), to: new Date(2026, 9, 31) } },
]
const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" })

function DeliveryDay() {
  const [day, setDay] = React.useState<Date>()
  return (
    <div className="flex flex-col items-start gap-3">
      <Calendar
        value={day}
        onValueChange={setDay}
        defaultMonth={TODAY}
        min={new Date(2026, 10, 16)}
        max={new Date(2026, 11, 18)}
        disabled={(d) => d.getDay() === 0 || d.getDay() === 6}
        weekStartsOn={1}
        className="rounded-xl border border-border bg-surface shadow-raised"
      />
      <p className="text-sm text-fg-muted">{day ? `Delivery on ${fmt.format(day)}, between 8am and 1pm.` : "Weekdays only, from Monday 16 November."}</p>
    </div>
  )
}

function ReportPeriod() {
  const [range, setRange] = React.useState<DateRange>({ from: daysAgo(6), to: TODAY })
  return (
    <div className="flex flex-col items-start gap-3">
      <Calendar mode="range" months={2} value={range} onValueChange={setRange} presets={PRESETS} max={TODAY} defaultMonth={new Date(2026, 9, 1)} className="rounded-xl border border-border bg-surface shadow-raised" />
      <p className="text-sm text-fg-muted tabular-nums">
        Revenue report: {fmt.format(range.from)} to {range.to ? fmt.format(range.to) : "pick an end day"}
      </p>
    </div>
  )
}

function OnCallDays() {
  const [days, setDays] = React.useState<Date[]>([new Date(2026, 10, 20), new Date(2026, 10, 21)])
  return (
    <div className="flex flex-col items-start gap-3">
      <Calendar mode="multiple" value={days} onValueChange={setDays} defaultMonth={TODAY} weekStartsOn={1} className="rounded-xl border border-border bg-surface shadow-raised" />
      <p className="text-sm text-fg-muted">
        Theo is on call for {days.length} {days.length === 1 ? "day" : "days"} in this rota.
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Delivery day",
    description: "One day, bounded by min and max, with weekends disabled by a test function and Monday as the first column.",
    code: `function DeliveryDay() {
  const [day, setDay] = React.useState<Date>()
  return (
    <Calendar
      value={day}
      onValueChange={setDay}
      min={new Date(2026, 10, 16)}
      max={new Date(2026, 11, 18)}
      disabled={(d) => d.getDay() === 0 || d.getDay() === 6}
      weekStartsOn={1}
      className="rounded-xl border border-border bg-surface shadow-raised"
    />
  )
}`,
    node: <DeliveryDay />,
  },
  {
    title: "Report period with presets",
    description: "Two months side by side and a rail of preset ranges. After the first click, the band previews the range under the pointer.",
    code: `const today = new Date()
const daysAgo = (n: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() - n)
const presets: CalendarPreset[] = [
  { label: "Today", range: { from: today, to: today } },
  { label: "Last 7 days", range: { from: daysAgo(6), to: today } },
  { label: "Last 30 days", range: { from: daysAgo(29), to: today } },
  { label: "This month", range: { from: new Date(today.getFullYear(), today.getMonth(), 1), to: today } },
]

function ReportPeriod() {
  const [range, setRange] = React.useState<DateRange>({ from: daysAgo(6), to: today })
  return <Calendar mode="range" months={2} value={range} onValueChange={setRange} presets={presets} max={today} className="rounded-xl border border-border bg-surface shadow-raised" />
}`,
    node: <ReportPeriod />,
  },
  {
    title: "On-call rota",
    description: "Multiple mode toggles each day on and off and returns the days sorted.",
    code: `function OnCallDays() {
  const [days, setDays] = React.useState<Date[]>([new Date(2026, 10, 20), new Date(2026, 10, 21)])
  return <Calendar mode="multiple" value={days} onValueChange={setDays} weekStartsOn={1} className="rounded-xl border border-border bg-surface shadow-raised" />
}`,
    node: <OnCallDays />,
  },
]
