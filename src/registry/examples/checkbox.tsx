"use client"
import * as React from "react"
import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"
import type { Example } from "./types"

const REVIEWERS = [
  { id: "maya", name: "Maya Chen" },
  { id: "theo", name: "Theo Okafor" },
  { id: "priya", name: "Priya Raman" },
]

function SelectAllDemo() {
  const [checked, setChecked] = React.useState<string[]>(["maya"])
  const all = checked.length === REVIEWERS.length
  const some = checked.length > 0 && !all
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="all-reviewers" checked={all} indeterminate={some} onCheckedChange={(next) => setChecked(next ? REVIEWERS.map((r) => r.id) : [])} />
        <Label htmlFor="all-reviewers">Notify all reviewers</Label>
      </div>
      <div className="ml-2 flex flex-col gap-2.5 border-l border-border pl-4">
        {REVIEWERS.map((r) => (
          <div key={r.id} className="flex items-center gap-2">
            <Checkbox
              id={"reviewer-" + r.id}
              checked={checked.includes(r.id)}
              onCheckedChange={(next) => setChecked(next ? [...checked, r.id] : checked.filter((id) => id !== r.id))}
            />
            <Label htmlFor={"reviewer-" + r.id}>{r.name}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "With label",
    description: "Give the checkbox an id and point a Label at it so the text toggles it too.",
    code: `<div className="flex items-center gap-2">
  <Checkbox id="paid-alert" defaultChecked />
  <Label htmlFor="paid-alert">Email me when an invoice is paid</Label>
</div>`,
    node: (
      <div className="flex items-center gap-2">
        <Checkbox id="paid-alert" defaultChecked />
        <Label htmlFor="paid-alert">Email me when an invoice is paid</Label>
      </div>
    ),
  },
  {
    title: "With description",
    description: "Align the box to the first line and keep the helper text in the same column as the label.",
    code: `<div className="flex items-start gap-3">
  <Checkbox id="auto-renew" defaultChecked className="mt-0.5" />
  <div className="grid gap-1">
    <Label htmlFor="auto-renew">Auto-renew the Northwind plan</Label>
    <p className="text-xs text-fg-muted">Charges the card on file on the 1st of each month.</p>
  </div>
</div>`,
    node: (
      <div className="flex items-start gap-3">
        <Checkbox id="auto-renew" defaultChecked className="mt-0.5" />
        <div className="grid gap-1">
          <Label htmlFor="auto-renew">Auto-renew the Northwind plan</Label>
          <p className="text-xs text-fg-muted">Charges the card on file on the 1st of each month.</p>
        </div>
      </div>
    ),
  },
  {
    title: "Select all",
    description: "The parent is checked when every child is, indeterminate when only some are, and toggles the whole list.",
    code: `const REVIEWERS = [
  { id: "maya", name: "Maya Chen" },
  { id: "theo", name: "Theo Okafor" },
  { id: "priya", name: "Priya Raman" },
]

function SelectAllDemo() {
  const [checked, setChecked] = React.useState<string[]>(["maya"])
  const all = checked.length === REVIEWERS.length
  const some = checked.length > 0 && !all
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="all-reviewers" checked={all} indeterminate={some} onCheckedChange={(next) => setChecked(next ? REVIEWERS.map((r) => r.id) : [])} />
        <Label htmlFor="all-reviewers">Notify all reviewers</Label>
      </div>
      <div className="ml-2 flex flex-col gap-2.5 border-l border-border pl-4">
        {REVIEWERS.map((r) => (
          <div key={r.id} className="flex items-center gap-2">
            <Checkbox
              id={"reviewer-" + r.id}
              checked={checked.includes(r.id)}
              onCheckedChange={(next) => setChecked(next ? [...checked, r.id] : checked.filter((id) => id !== r.id))}
            />
            <Label htmlFor={"reviewer-" + r.id}>{r.name}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}`,
    node: <SelectAllDemo />,
  },
  {
    title: "Disabled and invalid",
    description: "Disabled boxes keep their state but dim; aria-invalid adds a red ring until the box is checked.",
    code: `<div className="flex items-center gap-2">
  <Checkbox id="two-factor" disabled defaultChecked />
  <Label htmlFor="two-factor">Two-factor sign-in, required by Northwind</Label>
</div>
<div className="flex items-center gap-2">
  <Checkbox id="sso" disabled />
  <Label htmlFor="sso">Single sign-on, Business plan only</Label>
</div>
<div className="flex flex-col gap-1.5">
  <div className="flex items-center gap-2">
    <Checkbox id="terms" aria-invalid />
    <Label htmlFor="terms">I agree to the terms of service</Label>
  </div>
  <p role="alert" className="text-xs text-danger">Accept the terms to continue.</p>
</div>`,
    node: (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Checkbox id="two-factor" disabled defaultChecked />
          <Label htmlFor="two-factor">Two-factor sign-in, required by Northwind</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="sso" disabled />
          <Label htmlFor="sso">Single sign-on, Business plan only</Label>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" aria-invalid />
            <Label htmlFor="terms">I agree to the terms of service</Label>
          </div>
          <p role="alert" className="text-xs text-danger">Accept the terms to continue.</p>
        </div>
      </div>
    ),
  },
]
