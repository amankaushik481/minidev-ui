"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { DateTimePicker } from "@/registry/ui/date-time-picker"
import type { Example } from "./types"

function ScheduleSend() {
  const [when, setWhen] = React.useState<Date | null>(null)
  // Read the clock once on mount; days before today and earlier slots today are disabled.
  const [now] = React.useState(() => new Date())
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <label htmlFor="send-at" className="text-sm font-medium text-fg">
        Send invoice reminder
      </label>
      <DateTimePicker id="send-at" value={when} onValueChange={setWhen} min={now} aria-label="Send at" />
      <p className="text-xs text-fg-subtle">{when ? `Northwind Traders gets the reminder at ${when.toLocaleString("en-US")}.` : "Past times today are greyed out."}</p>
    </div>
  )
}

function DeployWindow() {
  const [sent, setSent] = React.useState<string | null>(null)
  return (
    <form
      className="flex w-full max-w-sm flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(String(new FormData(e.currentTarget).get("deployAt")))
      }}
    >
      <DateTimePicker
        name="deployAt"
        defaultValue={new Date(2026, 10, 18, 22, 0)}
        minuteStep={30}
        hour12={false}
        weekStartsOn={1}
        timeZoneLabel={`Times in ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}
        aria-label="Deploy at"
      />
      <div className="flex items-center gap-3">
        <Button type="submit" size="sm">
          Schedule deploy
        </Button>
        {sent !== null ? <code className="truncate font-mono text-xs text-fg-muted">deployAt={sent || "(empty)"}</code> : null}
      </div>
    </form>
  )
}

export const examples: Example[] = [
  {
    title: "Schedule a send",
    description: "With min set to now, earlier days and the past slots of today cannot be picked.",
    code: `function ScheduleSend() {
  const [when, setWhen] = React.useState<Date | null>(null)
  const [now] = React.useState(() => new Date())
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="send-at" className="text-sm font-medium">Send invoice reminder</label>
      <DateTimePicker id="send-at" value={when} onValueChange={setWhen} min={now} aria-label="Send at" />
    </div>
  )
}`,
    node: <ScheduleSend />,
  },
  {
    title: "24 hour clock in a form",
    description: "Half-hour slots, a 24 hour clock and a note naming the browser time zone, which is the zone the picker uses. With name set, FormData gets an ISO string in UTC.",
    code: `<form onSubmit={(e) => { e.preventDefault(); console.log(new FormData(e.currentTarget).get("deployAt")) }}>
  <DateTimePicker
    name="deployAt"
    defaultValue={new Date(2026, 10, 18, 22, 0)}
    minuteStep={30}
    hour12={false}
    weekStartsOn={1}
    timeZoneLabel={\`Times in \${Intl.DateTimeFormat().resolvedOptions().timeZone}\`}
    aria-label="Deploy at"
  />
  <Button type="submit" size="sm">Schedule deploy</Button>
</form>`,
    node: <DeployWindow />,
  },
]
