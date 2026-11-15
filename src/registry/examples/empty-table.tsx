"use client"
import * as React from "react"
import { EmptyTable } from "@/registry/ui/empty-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"
import type { Example } from "./types"

function ApiKeys() {
  const [keys, setKeys] = React.useState<{ id: string; name: string; created: string }[]>([])
  if (!keys.length) {
    return (
      <EmptyTable
        title="No API keys"
        description="Create a key to call the Lumen API from your server."
        actionLabel="Create key"
        onAction={() => setKeys([{ id: "key_prod", name: "Production server", created: "Nov 15" }])}
        className="w-full max-w-xl"
      />
    )
  }
  return (
    <div className="w-full max-w-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keys.map((k) => (
            <TableRow key={k.id}>
              <TableCell>{k.name}</TableCell>
              <TableCell className="text-fg-muted">{k.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "First run with a create action",
    description: "The button only renders when actionLabel is set.",
    code: `<EmptyTable
  title="No invoices yet"
  description="Invoices you send show up here with their status and due date."
  actionLabel="New invoice"
  onAction={() => {}}
  className="w-full max-w-xl"
/>`,
    node: (
      <EmptyTable
        title="No invoices yet"
        description="Invoices you send show up here with their status and due date."
        actionLabel="New invoice"
        onAction={() => {}}
        className="w-full max-w-xl"
      />
    ),
  },
  {
    title: "Nothing to do yet",
    description: "Leave actionLabel out when rows appear on their own.",
    code: `<EmptyTable
  title="No payouts this period"
  description="Payouts show up here two business days after a payment settles."
  className="w-full max-w-xl"
/>`,
    node: (
      <EmptyTable
        title="No payouts this period"
        description="Payouts show up here two business days after a payment settles."
        className="w-full max-w-xl"
      />
    ),
  },
  {
    title: "Swapping in the table",
    description: "Render EmptyTable instead of the table while the list is empty, then the table once there are rows.",
    code: `function ApiKeys() {
  const [keys, setKeys] = React.useState<{ id: string; name: string; created: string }[]>([])
  if (!keys.length) {
    return (
      <EmptyTable
        title="No API keys"
        description="Create a key to call the Lumen API from your server."
        actionLabel="Create key"
        onAction={() => setKeys([{ id: "key_prod", name: "Production server", created: "Nov 15" }])}
        className="w-full max-w-xl"
      />
    )
  }
  return (
    <div className="w-full max-w-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keys.map((k) => (
            <TableRow key={k.id}>
              <TableCell>{k.name}</TableCell>
              <TableCell className="text-fg-muted">{k.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}`,
    node: <ApiKeys />,
  },
]
