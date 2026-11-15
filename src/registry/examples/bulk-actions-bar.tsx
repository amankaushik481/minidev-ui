"use client"
import * as React from "react"
import { BulkActionsBar } from "@/registry/ui/bulk-actions-bar"
import { Button } from "@/registry/ui/button"
import { RowSelection } from "@/registry/ui/row-selection"
import { Table, TableBody, TableCell, TableRow } from "@/registry/ui/table"
import type { Example } from "./types"

const openInvoices = [
  { id: "INV-2041", customer: "Northwind Labs", amount: "$12,400.00" },
  { id: "INV-2040", customer: "Acme Robotics", amount: "$3,890.00" },
  { id: "INV-2039", customer: "Halcyon Health", amount: "$890.00" },
  { id: "INV-2038", customer: "Fathom Analytics", amount: "$5,200.00" },
]

function SelectableInvoices() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const toggle = (id: string, on: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (on) next.add(id)
      else next.delete(id)
      return next
    })
  return (
    <div className="w-full max-w-lg">
      <Table>
        <TableBody>
          {openInvoices.map((inv) => (
            <TableRow key={inv.id} data-selected={selected.has(inv.id) || undefined}>
              <TableCell className="w-10">
                <RowSelection checked={selected.has(inv.id)} onCheckedChange={(on) => toggle(inv.id, on)} aria-label={"Select " + inv.id} />
              </TableCell>
              <TableCell className="font-mono text-xs text-fg-muted">{inv.id}</TableCell>
              <TableCell>{inv.customer}</TableCell>
              <TableCell className="text-right">{inv.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BulkActionsBar count={selected.size} onClear={() => setSelected(new Set())} className="mt-3">
        <Button size="sm" variant="outline">Send reminder</Button>
        <Button size="sm" variant="destructive">Void</Button>
      </BulkActionsBar>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "With Table and RowSelection",
    description: "Select invoices and the bar appears with the count; Clear empties the selection and hides it.",
    code: `const openInvoices = [
  { id: "INV-2041", customer: "Northwind Labs", amount: "$12,400.00" },
  { id: "INV-2040", customer: "Acme Robotics", amount: "$3,890.00" },
  { id: "INV-2039", customer: "Halcyon Health", amount: "$890.00" },
  { id: "INV-2038", customer: "Fathom Analytics", amount: "$5,200.00" },
]

function SelectableInvoices() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const toggle = (id: string, on: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (on) next.add(id)
      else next.delete(id)
      return next
    })
  return (
    <div className="w-full max-w-lg">
      <Table>
        <TableBody>
          {openInvoices.map((inv) => (
            <TableRow key={inv.id} data-selected={selected.has(inv.id) || undefined}>
              <TableCell className="w-10">
                <RowSelection checked={selected.has(inv.id)} onCheckedChange={(on) => toggle(inv.id, on)} aria-label={"Select " + inv.id} />
              </TableCell>
              <TableCell className="font-mono text-xs text-fg-muted">{inv.id}</TableCell>
              <TableCell>{inv.customer}</TableCell>
              <TableCell className="text-right">{inv.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BulkActionsBar count={selected.size} onClear={() => setSelected(new Set())} className="mt-3">
        <Button size="sm" variant="outline">Send reminder</Button>
        <Button size="sm" variant="destructive">Void</Button>
      </BulkActionsBar>
    </div>
  )
}`,
    node: <SelectableInvoices />,
  },
  {
    title: "Files with a custom region name",
    description: "Name the region after what is selected so it reads clearly in the landmarks list.",
    code: `<BulkActionsBar count={12} label="Selected files" onClear={() => {}}>
  <Button size="sm" variant="outline">Move</Button>
  <Button size="sm" variant="outline">Download</Button>
</BulkActionsBar>`,
    node: (
      <BulkActionsBar count={12} label="Selected files" onClear={() => {}}>
        <Button size="sm" variant="outline">Move</Button>
        <Button size="sm" variant="outline">Download</Button>
      </BulkActionsBar>
    ),
  },
]
