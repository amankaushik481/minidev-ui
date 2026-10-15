"use client"
import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select"
import type { Example } from "./types"

const INTERVALS = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly, two months free" },
]

const TEAM = [
  { value: "maya-chen", label: "Maya Chen" },
  { value: "theo-okafor", label: "Theo Okafor" },
]

const CONTRACTORS = [
  { value: "priya-raman", label: "Priya Raman" },
  { value: "sam-lowe", label: "Sam Lowe" },
]

const STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
  { value: "void", label: "Void" },
]

function ControlledDemo() {
  const [status, setStatus] = React.useState("sent")
  return (
    <div className="flex flex-col gap-3">
      <Select items={STATUSES} value={status} onValueChange={(v) => setStatus(v as string)}>
        <SelectTrigger className="w-48" aria-label="Invoice status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-fg-muted">
        INV-2041 is <span className="font-medium text-fg">{status}</span>
        {status === "paid" ? ", nothing left to do" : status === "void" ? ", hidden from reports" : ""}
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Default value",
    description: "Pass items to the root so the trigger shows the label, and defaultValue for the initial choice.",
    code: `const INTERVALS = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly, two months free" },
]

<Select items={INTERVALS} defaultValue="monthly">
  <SelectTrigger className="w-56" aria-label="Billing interval">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {INTERVALS.map((i) => (
      <SelectItem key={i.value} value={i.value}>
        {i.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>`,
    node: (
      <Select items={INTERVALS} defaultValue="monthly">
        <SelectTrigger className="w-56" aria-label="Billing interval">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {INTERVALS.map((i) => (
            <SelectItem key={i.value} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    title: "Grouped items",
    description: "SelectGroup and SelectLabel section the list; SelectValue shows the placeholder until something is picked.",
    code: `<Select items={[...TEAM, ...CONTRACTORS]}>
  <SelectTrigger className="w-56" aria-label="Assignee">
    <SelectValue placeholder="Assign to" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Your team</SelectLabel>
      {TEAM.map((p) => (
        <SelectItem key={p.value} value={p.value}>
          {p.label}
        </SelectItem>
      ))}
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Contractors</SelectLabel>
      {CONTRACTORS.map((p) => (
        <SelectItem key={p.value} value={p.value}>
          {p.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>`,
    node: (
      <Select items={[...TEAM, ...CONTRACTORS]}>
        <SelectTrigger className="w-56" aria-label="Assignee">
          <SelectValue placeholder="Assign to" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Your team</SelectLabel>
            {TEAM.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Contractors</SelectLabel>
            {CONTRACTORS.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
  },
  {
    title: "Controlled value",
    description: "Use value and onValueChange to keep the choice in state and react to it elsewhere.",
    code: `const STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
  { value: "void", label: "Void" },
]

function ControlledDemo() {
  const [status, setStatus] = React.useState("sent")
  return (
    <div className="flex flex-col gap-3">
      <Select items={STATUSES} value={status} onValueChange={(v) => setStatus(v as string)}>
        <SelectTrigger className="w-48" aria-label="Invoice status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-fg-muted">
        INV-2041 is <span className="font-medium text-fg">{status}</span>
        {status === "paid" ? ", nothing left to do" : status === "void" ? ", hidden from reports" : ""}
      </p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Sizes and disabled",
    description: "SelectTrigger takes size sm, default or lg; disabled on the root locks the whole select.",
    code: `<Select items={INTERVALS} defaultValue="monthly">
  <SelectTrigger size="sm" className="w-48" aria-label="Small">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {INTERVALS.map((i) => (
      <SelectItem key={i.value} value={i.value}>
        {i.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

<Select items={INTERVALS} defaultValue="yearly">
  <SelectTrigger size="lg" className="w-56" aria-label="Large">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {INTERVALS.map((i) => (
      <SelectItem key={i.value} value={i.value}>
        {i.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

<Select items={INTERVALS} defaultValue="monthly" disabled>
  <SelectTrigger className="w-48" aria-label="Disabled">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {INTERVALS.map((i) => (
      <SelectItem key={i.value} value={i.value}>
        {i.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>`,
    node: (
      <div className="flex flex-col items-start gap-3">
        <Select items={INTERVALS} defaultValue="monthly">
          <SelectTrigger size="sm" className="w-48" aria-label="Small">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {INTERVALS.map((i) => (
              <SelectItem key={i.value} value={i.value}>
                {i.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select items={INTERVALS} defaultValue="yearly">
          <SelectTrigger size="lg" className="w-56" aria-label="Large">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {INTERVALS.map((i) => (
              <SelectItem key={i.value} value={i.value}>
                {i.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select items={INTERVALS} defaultValue="monthly" disabled>
          <SelectTrigger className="w-48" aria-label="Disabled">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {INTERVALS.map((i) => (
              <SelectItem key={i.value} value={i.value}>
                {i.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ),
  },
]
