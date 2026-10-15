"use client"
import * as React from "react"
import { DatePicker } from "@/registry/ui/date-picker"
import { FormField } from "@/registry/ui/form-field"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function ControlledDemo() {
  const [due, setDue] = React.useState("2026-11-14")
  const label = due
    ? new Date(due + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    : "no date yet"
  return (
    <div className="flex flex-col gap-3">
      <DatePicker value={due} onChange={setDue} aria-label="Due date" />
      <p className="text-xs text-fg-muted">
        INV-2041 is due on <span className="font-medium text-fg">{label}</span>
      </p>
    </div>
  )
}

function ValidatedDemo() {
  const issued = "2026-10-15"
  const [due, setDue] = React.useState("2026-10-01")
  const error = due && due < issued ? "Due date must be on or after the issue date." : undefined
  return (
    <FormField id="due-date" label="Due date" description="Issued 15 Oct 2026 on net 30 terms." error={error}>
      <DatePicker id="due-date" value={due} onChange={setDue} />
    </FormField>
  )
}

function ClearableDemo() {
  const [date, setDate] = React.useState("2026-10-20")
  return (
    <div className="flex items-center gap-2">
      <DatePicker value={date} onChange={setDate} aria-label="Follow up on" />
      <Button variant="ghost" size="sm" disabled={!date} onClick={() => setDate("")}>
        Clear
      </Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled value",
    description: "The value is an ISO date string, so it is easy to store, compare and format.",
    code: `function ControlledDemo() {
  const [due, setDue] = React.useState("2026-11-14")
  const label = due
    ? new Date(due + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    : "no date yet"
  return (
    <div className="flex flex-col gap-3">
      <DatePicker value={due} onChange={setDue} aria-label="Due date" />
      <p className="text-xs text-fg-muted">
        INV-2041 is due on <span className="font-medium text-fg">{label}</span>
      </p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Validated form field",
    description: "Compare ISO strings directly and pass the message to FormField's error prop.",
    code: `function ValidatedDemo() {
  const issued = "2026-10-15"
  const [due, setDue] = React.useState("2026-10-01")
  const error = due && due < issued ? "Due date must be on or after the issue date." : undefined
  return (
    <FormField id="due-date" label="Due date" description="Issued 15 Oct 2026 on net 30 terms." error={error}>
      <DatePicker id="due-date" value={due} onChange={setDue} />
    </FormField>
  )
}`,
    node: (
      <div className="w-64">
        <ValidatedDemo />
      </div>
    ),
  },
  {
    title: "Clearable",
    description: "Set the value to an empty string to clear the field.",
    code: `function ClearableDemo() {
  const [date, setDate] = React.useState("2026-10-20")
  return (
    <div className="flex items-center gap-2">
      <DatePicker value={date} onChange={setDate} aria-label="Follow up on" />
      <Button variant="ghost" size="sm" disabled={!date} onClick={() => setDate("")}>
        Clear
      </Button>
    </div>
  )
}`,
    node: <ClearableDemo />,
  },
  {
    title: "Disabled",
    description: "A disabled picker still shows its date for context.",
    code: `<DatePicker value="2026-09-30" disabled aria-label="Issue date" />`,
    node: <DatePicker value="2026-09-30" disabled aria-label="Issue date" />,
  },
]
