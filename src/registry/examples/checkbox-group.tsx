"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { CheckboxGroup } from "@/registry/ui/checkbox-group"
import { Label } from "@/registry/ui/label"
import type { Example } from "./types"

function NotifyForm() {
  const [sent, setSent] = React.useState<string[] | null>(null)
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(new FormData(e.currentTarget).getAll("notify").map(String))
      }}
    >
      <CheckboxGroup label="Email me about">
        <Label className="flex items-center gap-2"><Checkbox name="notify" value="invoices" defaultChecked /> Paid invoices</Label>
        <Label className="flex items-center gap-2"><Checkbox name="notify" value="reports" /> Weekly reports</Label>
        <Label className="flex items-center gap-2"><Checkbox name="notify" value="security" defaultChecked /> New sign-ins</Label>
      </CheckboxGroup>
      <div className="flex items-center gap-3">
        <Button type="submit" size="sm">Save</Button>
        {sent ? <span className="text-xs text-fg-muted">Saved: {sent.join(", ") || "nothing"}</span> : null}
      </div>
    </form>
  )
}

export const examples: Example[] = [
  {
    title: "Read the choices with FormData",
    description: "Give every checkbox the same name; getAll returns the checked values.",
    code: `function NotifyForm() {
  const [sent, setSent] = React.useState<string[] | null>(null)
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(new FormData(e.currentTarget).getAll("notify").map(String))
      }}
    >
      <CheckboxGroup label="Email me about">
        <Label className="flex items-center gap-2"><Checkbox name="notify" value="invoices" defaultChecked /> Paid invoices</Label>
        <Label className="flex items-center gap-2"><Checkbox name="notify" value="reports" /> Weekly reports</Label>
        <Label className="flex items-center gap-2"><Checkbox name="notify" value="security" defaultChecked /> New sign-ins</Label>
      </CheckboxGroup>
      <div className="flex items-center gap-3">
        <Button type="submit" size="sm">Save</Button>
        {sent ? <span className="text-xs text-fg-muted">Saved: {sent.join(", ") || "nothing"}</span> : null}
      </div>
    </form>
  )
}`,
    node: <NotifyForm />,
  },
  {
    title: "Days in a row",
    description: "orientation=\"horizontal\" wraps short options in a row under the label.",
    code: `<CheckboxGroup label="Send the digest on" orientation="horizontal">
  <Label className="flex items-center gap-2"><Checkbox name="days" value="mon" defaultChecked /> Mon</Label>
  <Label className="flex items-center gap-2"><Checkbox name="days" value="tue" /> Tue</Label>
  <Label className="flex items-center gap-2"><Checkbox name="days" value="wed" defaultChecked /> Wed</Label>
  <Label className="flex items-center gap-2"><Checkbox name="days" value="thu" /> Thu</Label>
  <Label className="flex items-center gap-2"><Checkbox name="days" value="fri" defaultChecked /> Fri</Label>
</CheckboxGroup>`,
    node: (
      <CheckboxGroup label="Send the digest on" orientation="horizontal">
        <Label className="flex items-center gap-2"><Checkbox name="days" value="mon" defaultChecked /> Mon</Label>
        <Label className="flex items-center gap-2"><Checkbox name="days" value="tue" /> Tue</Label>
        <Label className="flex items-center gap-2"><Checkbox name="days" value="wed" defaultChecked /> Wed</Label>
        <Label className="flex items-center gap-2"><Checkbox name="days" value="thu" /> Thu</Label>
        <Label className="flex items-center gap-2"><Checkbox name="days" value="fri" defaultChecked /> Fri</Label>
      </CheckboxGroup>
    ),
  },
]
