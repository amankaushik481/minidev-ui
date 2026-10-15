"use client"
import * as React from "react"
import { Switch } from "@/registry/ui/switch"
import { Label } from "@/registry/ui/label"
import type { Example } from "./types"

function AsyncDemo() {
  const [on, setOn] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const toggle = (next: boolean) => {
    setOn(next)
    setSaving(true)
    setTimeout(() => setSaving(false), 900)
  }
  return (
    <div className="w-full max-w-sm">
      <Switch
        label="Weekly digest"
        description="A summary of paid and overdue invoices every Monday."
        checked={on}
        loading={saving}
        onCheckedChange={toggle}
      />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Settings rows",
    description: "Pass label and description to get a full-width row where the whole line toggles the switch.",
    code: `<div className="flex w-full max-w-sm flex-col divide-y divide-border">
  <Switch className="py-3" label="Email receipts" description="Send Maya Chen a PDF for every paid invoice." defaultChecked />
  <Switch className="py-3" label="Overdue reminders" description="Nudge customers 3 days after the due date." />
  <Switch className="py-3" label="Usage alerts" description="Warn at 80% of the plan's API quota." defaultChecked />
</div>`,
    node: (
      <div className="flex w-full max-w-sm flex-col divide-y divide-border">
        <Switch className="py-3" label="Email receipts" description="Send Maya Chen a PDF for every paid invoice." defaultChecked />
        <Switch className="py-3" label="Overdue reminders" description="Nudge customers 3 days after the due date." />
        <Switch className="py-3" label="Usage alerts" description="Warn at 80% of the plan's API quota." defaultChecked />
      </div>
    ),
  },
  {
    title: "Async toggle",
    description: "Flip the value right away and set loading while the request is in flight; the thumb shows a spinner and cannot be toggled again until it clears.",
    code: `function AsyncDemo() {
  const [on, setOn] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const toggle = (next: boolean) => {
    setOn(next)
    setSaving(true)
    setTimeout(() => setSaving(false), 900)
  }
  return (
    <div className="w-full max-w-sm">
      <Switch
        label="Weekly digest"
        description="A summary of paid and overdue invoices every Monday."
        checked={on}
        loading={saving}
        onCheckedChange={toggle}
      />
    </div>
  )
}`,
    node: <AsyncDemo />,
  },
  {
    title: "Sizes",
    description: "sm fits dense tables and toolbars; default is for settings pages.",
    code: `<div className="flex items-center gap-2">
  <Switch size="sm" id="compact" defaultChecked />
  <Label htmlFor="compact">Compact rows</Label>
</div>
<div className="flex items-center gap-2">
  <Switch id="dark-mode" />
  <Label htmlFor="dark-mode">Dark mode</Label>
</div>`,
    node: (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Switch size="sm" id="compact" defaultChecked />
          <Label htmlFor="compact">Compact rows</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="dark-mode" />
          <Label htmlFor="dark-mode">Dark mode</Label>
        </div>
      </div>
    ),
  },
  {
    title: "Disabled and read-only",
    description: "Disabled dims the row, read-only keeps it focusable but fixed, and aria-invalid outlines the track in red.",
    code: `<div className="flex w-full max-w-sm flex-col divide-y divide-border">
  <Switch className="py-3" label="Two-factor sign-in" description="Required by Northwind's security policy." defaultChecked disabled />
  <Switch className="py-3" label="Single sign-on" description="Managed by your identity provider." defaultChecked readOnly />
  <Switch className="py-3" label="Public status page" description="Add a custom domain before turning this on." aria-invalid />
</div>`,
    node: (
      <div className="flex w-full max-w-sm flex-col divide-y divide-border">
        <Switch className="py-3" label="Two-factor sign-in" description="Required by Northwind's security policy." defaultChecked disabled />
        <Switch className="py-3" label="Single sign-on" description="Managed by your identity provider." defaultChecked readOnly />
        <Switch className="py-3" label="Public status page" description="Add a custom domain before turning this on." aria-invalid />
      </div>
    ),
  },
]
