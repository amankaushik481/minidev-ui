"use client"
import * as React from "react"
import { Badge } from "@/registry/ui/badge"
import { ChipFilter } from "@/registry/ui/chip-filter"
import type { Example } from "./types"

const ENVIRONMENTS = [
  { value: "all", label: "All" },
  { value: "production", label: "Production" },
  { value: "staging", label: "Staging" },
  { value: "preview", label: "Preview" },
]

const INVOICES = [
  { id: "INV-2041", customer: "Northwind Traders", status: "pending" },
  { id: "INV-2040", customer: "Summit Dental Group", status: "paid" },
  { id: "INV-2039", customer: "Helix Biotech", status: "overdue" },
  { id: "INV-2038", customer: "Blue Harbor Co.", status: "paid" },
  { id: "INV-2037", customer: "Meridian Freight", status: "pending" },
]

function InvoiceFilterDemo() {
  const [status, setStatus] = React.useState("all")
  const rows = status === "all" ? INVOICES : INVOICES.filter((i) => i.status === status)
  return (
    <div className="flex w-80 flex-col gap-3">
      <ChipFilter
        options={[
          { value: "all", label: "All" },
          { value: "paid", label: "Paid" },
          { value: "pending", label: "Pending" },
          { value: "overdue", label: "Overdue" },
        ]}
        value={status}
        onChange={setStatus}
      />
      <ul className="divide-y divide-border rounded-xl border border-border bg-surface text-sm" aria-live="polite">
        {rows.map((i) => (
          <li key={i.id} className="flex items-center justify-between px-3 py-2">
            <span className="text-fg">{i.id} · {i.customer}</span>
            <Badge variant={i.status === "overdue" ? "destructive" : i.status === "paid" ? "secondary" : "accent"}>{i.status}</Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom options",
    description: "Options are value and label pairs; defaultValue picks the starting chip without taking control.",
    code: `const ENVIRONMENTS = [
  { value: "all", label: "All" },
  { value: "production", label: "Production" },
  { value: "staging", label: "Staging" },
  { value: "preview", label: "Preview" },
]

<ChipFilter options={ENVIRONMENTS} defaultValue="production" />`,
    node: <ChipFilter options={ENVIRONMENTS} defaultValue="production" />,
  },
  {
    title: "Filter a list",
    description: "Control the value and derive the visible rows from it; the chips announce as one radio group.",
    code: `const INVOICES = [
  { id: "INV-2041", customer: "Northwind Traders", status: "pending" },
  { id: "INV-2040", customer: "Summit Dental Group", status: "paid" },
  { id: "INV-2039", customer: "Helix Biotech", status: "overdue" },
  { id: "INV-2038", customer: "Blue Harbor Co.", status: "paid" },
  { id: "INV-2037", customer: "Meridian Freight", status: "pending" },
]

function InvoiceFilterDemo() {
  const [status, setStatus] = React.useState("all")
  const rows = status === "all" ? INVOICES : INVOICES.filter((i) => i.status === status)
  return (
    <div className="flex w-80 flex-col gap-3">
      <ChipFilter
        options={[
          { value: "all", label: "All" },
          { value: "paid", label: "Paid" },
          { value: "pending", label: "Pending" },
          { value: "overdue", label: "Overdue" },
        ]}
        value={status}
        onChange={setStatus}
      />
      <ul className="divide-y divide-border rounded-xl border border-border bg-surface text-sm" aria-live="polite">
        {rows.map((i) => (
          <li key={i.id} className="flex items-center justify-between px-3 py-2">
            <span className="text-fg">{i.id} · {i.customer}</span>
            <Badge variant={i.status === "overdue" ? "destructive" : i.status === "paid" ? "secondary" : "accent"}>{i.status}</Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}`,
    node: <InvoiceFilterDemo />,
  },
]
