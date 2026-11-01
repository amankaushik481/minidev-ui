"use client"
import * as React from "react"
import { FormField } from "@/registry/ui/form-field"
import { TimePicker } from "@/registry/ui/time-picker"
import type { Example } from "./types"

function ControlledDemo() {
  const [time, setTime] = React.useState("09:30")
  return (
    <div className="flex flex-col gap-3">
      <TimePicker value={time} onChange={setTime} aria-label="Standup time" />
      <p className="text-xs text-fg-muted">
        Daily standup at <span className="font-medium tabular-nums text-fg">{time || "no time set"}</span>
      </p>
    </div>
  )
}

function RangeDemo() {
  const [start, setStart] = React.useState("09:00")
  const [end, setEnd] = React.useState("17:30")
  const invalid = Boolean(start && end && end <= start)
  return (
    <div className="flex flex-wrap items-start gap-4">
      <FormField id="hours-start" label="Opens" className="w-40">
        <TimePicker id="hours-start" value={start} onChange={setStart} />
      </FormField>
      <FormField id="hours-end" label="Closes" className="w-40" error={invalid ? "Closing time must be after opening." : undefined}>
        <TimePicker id="hours-end" value={end} onChange={setEnd} />
      </FormField>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled value",
    description: "The value is a 24 hour HH:MM string, so it can be stored and compared as text.",
    code: `function ControlledDemo() {
  const [time, setTime] = React.useState("09:30")
  return (
    <div className="flex flex-col gap-3">
      <TimePicker value={time} onChange={setTime} aria-label="Standup time" />
      <p className="text-xs text-fg-muted">
        Daily standup at <span className="font-medium tabular-nums text-fg">{time || "no time set"}</span>
      </p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Start and end",
    description: "Two pickers in form fields; the id links each label, and a string comparison validates the range.",
    code: `function RangeDemo() {
  const [start, setStart] = React.useState("09:00")
  const [end, setEnd] = React.useState("17:30")
  const invalid = Boolean(start && end && end <= start)
  return (
    <div className="flex flex-wrap items-start gap-4">
      <FormField id="hours-start" label="Opens" className="w-40">
        <TimePicker id="hours-start" value={start} onChange={setStart} />
      </FormField>
      <FormField id="hours-end" label="Closes" className="w-40" error={invalid ? "Closing time must be after opening." : undefined}>
        <TimePicker id="hours-end" value={end} onChange={setEnd} />
      </FormField>
    </div>
  )
}`,
    node: <RangeDemo />,
  },
  {
    title: "Disabled",
    description: "A disabled picker keeps its value readable but cannot be changed.",
    code: `<TimePicker value="17:00" disabled aria-label="Report delivery time" />`,
    node: <TimePicker value="17:00" disabled aria-label="Report delivery time" />,
  },
]
