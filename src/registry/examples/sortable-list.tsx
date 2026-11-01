"use client"
import * as React from "react"
import { SortableList } from "@/registry/ui/sortable-list"
import type { Example } from "./types"

const STAGES = [
  { id: "lead", label: "Lead", detail: "12" },
  { id: "qualified", label: "Qualified", detail: "8" },
  { id: "proposal", label: "Proposal sent", detail: "5" },
  { id: "negotiation", label: "Negotiation", detail: "3" },
  { id: "won", label: "Won", detail: "2" },
]

const COLUMNS = [
  { id: "invoice", label: "Invoice" },
  { id: "customer", label: "Customer" },
  { id: "amount", label: "Amount" },
  { id: "due", label: "Due date" },
  { id: "status", label: "Status" },
]

function ColumnOrderDemo() {
  const [order, setOrder] = React.useState(COLUMNS.map((c) => c.label))
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <SortableList items={COLUMNS} onReorder={(items) => setOrder(items.map((i) => i.label))} />
      <p className="text-xs text-fg-muted">Column order: {order.join(", ")}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom items",
    description: "Each item needs a stable id and a label; detail is an optional right aligned note.",
    code: `const STAGES = [
  { id: "lead", label: "Lead", detail: "12" },
  { id: "qualified", label: "Qualified", detail: "8" },
  { id: "proposal", label: "Proposal sent", detail: "5" },
  { id: "negotiation", label: "Negotiation", detail: "3" },
  { id: "won", label: "Won", detail: "2" },
]

<SortableList items={STAGES} />`,
    node: <SortableList items={STAGES} />,
  },
  {
    title: "Read the new order",
    description: "onReorder gets the full list after every drag or arrow key move, ready to persist.",
    code: `const COLUMNS = [
  { id: "invoice", label: "Invoice" },
  { id: "customer", label: "Customer" },
  { id: "amount", label: "Amount" },
  { id: "due", label: "Due date" },
  { id: "status", label: "Status" },
]

function ColumnOrderDemo() {
  const [order, setOrder] = React.useState(COLUMNS.map((c) => c.label))
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <SortableList items={COLUMNS} onReorder={(items) => setOrder(items.map((i) => i.label))} />
      <p className="text-xs text-fg-muted">Column order: {order.join(", ")}</p>
    </div>
  )
}`,
    node: <ColumnOrderDemo />,
  },
]
