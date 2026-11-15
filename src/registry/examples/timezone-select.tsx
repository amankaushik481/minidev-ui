"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { FormField } from "@/registry/ui/form-field"
import { TimezoneSelect } from "@/registry/ui/timezone-select"
import type { Example } from "./types"

function ReminderSettings() {
  const [tz, setTz] = React.useState("America/New_York")
  return (
    <FormField id="reminder-tz" label="Send reminders in" description="Overdue reminders go out at 9:00 local time.">
      <TimezoneSelect id="reminder-tz" value={tz} onValueChange={setTz} />
    </FormField>
  )
}

const OFFICES = ["America/Los_Angeles", "America/New_York", "Europe/London", "Europe/Berlin", "Asia/Kolkata", "Asia/Tokyo"]

function TeamForm() {
  const [sent, setSent] = React.useState<string | null>(null)
  return (
    <form
      className="flex flex-col items-start gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(String(new FormData(e.currentTarget).get("timezone")))
      }}
    >
      <FormField id="member-tz" label="Working hours time zone">
        <TimezoneSelect id="member-tz" name="timezone" required />
      </FormField>
      <Button type="submit" size="sm">Save</Button>
      <p aria-live="polite" className="text-[0.8125rem] text-fg-muted">
        {sent ? <>Saved <code className="font-mono text-fg">{sent}</code></> : null}
      </p>
    </form>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled field",
    description: "Pair it with FormField through the same id. The value is an IANA id you can pass straight to Intl or your date library.",
    code: `function ReminderSettings() {
  const [tz, setTz] = React.useState("America/New_York")
  return (
    <FormField id="reminder-tz" label="Send reminders in" description="Overdue reminders go out at 9:00 local time.">
      <TimezoneSelect id="reminder-tz" value={tz} onValueChange={setTz} />
    </FormField>
  )
}`,
    node: <ReminderSettings />,
  },
  {
    title: "Your own short list",
    description: "Pass zones to offer only the ones that matter. Without groups the list is sorted by offset, Detected stays on top.",
    code: `<TimezoneSelect
  aria-label="Office"
  defaultValue="Europe/London"
  zones={["America/Los_Angeles", "America/New_York", "Europe/London", "Europe/Berlin", "Asia/Kolkata", "Asia/Tokyo"]}
  groupByRegion={false}
/>`,
    node: <TimezoneSelect aria-label="Office" defaultValue="Europe/London" zones={OFFICES} groupByRegion={false} />,
  },
  {
    title: "Plain form submit",
    description: "With name, the zone id is posted like any input. Uncontrolled, it starts on the browser's own zone.",
    code: `<form onSubmit={(e) => { e.preventDefault(); save(new FormData(e.currentTarget).get("timezone")) }}>
  <FormField id="member-tz" label="Working hours time zone">
    <TimezoneSelect id="member-tz" name="timezone" required />
  </FormField>
  <Button type="submit" size="sm">Save</Button>
</form>`,
    node: <TeamForm />,
  },
]
