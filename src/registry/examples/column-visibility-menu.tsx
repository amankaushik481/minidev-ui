"use client"
import * as React from "react"
import { ColumnVisibilityMenu } from "@/registry/ui/column-visibility-menu"
import { DataTable, type Column } from "@/registry/ui/data-table"
import type { Example } from "./types"

type Payout = { id: string; account: string; method: string; arrives: string; amount: number }

const payouts: Payout[] = [
  { id: "po_31", account: "Northwind Labs", method: "SEPA", arrives: "Nov 17", amount: 12400 },
  { id: "po_30", account: "Halcyon Health", method: "ACH", arrives: "Nov 18", amount: 3890 },
  { id: "po_29", account: "Fathom Analytics", method: "Wire", arrives: "Nov 20", amount: 21750 },
]

const payoutColumns: Column<Payout>[] = [
  { id: "account", header: "Account", cell: (p) => p.account },
  { id: "method", header: "Method", cell: (p) => p.method },
  { id: "arrives", header: "Arrives", cell: (p) => p.arrives },
  { id: "amount", header: "Amount", align: "right", cell: (p) => "$" + p.amount.toLocaleString("en-US") },
]

function PayoutsWithColumns() {
  const [visible, setVisible] = React.useState(["account", "arrives", "amount"])
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <div className="flex justify-end">
        <ColumnVisibilityMenu
          columns={payoutColumns.map((c) => ({ id: c.id, label: String(c.header) }))}
          visible={visible}
          onChange={setVisible}
        />
      </div>
      <DataTable columns={payoutColumns.filter((c) => visible.includes(c.id))} data={payouts} getRowId={(p) => p.id} caption="Payouts" />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlling DataTable columns",
    description: "Keep the visible ids in state and filter the DataTable columns with them; Method starts hidden.",
    code: `type Payout = { id: string; account: string; method: string; arrives: string; amount: number }

const payouts: Payout[] = [
  { id: "po_31", account: "Northwind Labs", method: "SEPA", arrives: "Nov 17", amount: 12400 },
  { id: "po_30", account: "Halcyon Health", method: "ACH", arrives: "Nov 18", amount: 3890 },
  { id: "po_29", account: "Fathom Analytics", method: "Wire", arrives: "Nov 20", amount: 21750 },
]

const payoutColumns: Column<Payout>[] = [
  { id: "account", header: "Account", cell: (p) => p.account },
  { id: "method", header: "Method", cell: (p) => p.method },
  { id: "arrives", header: "Arrives", cell: (p) => p.arrives },
  { id: "amount", header: "Amount", align: "right", cell: (p) => "$" + p.amount.toLocaleString("en-US") },
]

function PayoutsWithColumns() {
  const [visible, setVisible] = React.useState(["account", "arrives", "amount"])
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <div className="flex justify-end">
        <ColumnVisibilityMenu
          columns={payoutColumns.map((c) => ({ id: c.id, label: String(c.header) }))}
          visible={visible}
          onChange={setVisible}
        />
      </div>
      <DataTable columns={payoutColumns.filter((c) => visible.includes(c.id))} data={payouts} getRowId={(p) => p.id} caption="Payouts" />
    </div>
  )
}`,
    node: <PayoutsWithColumns />,
  },
  {
    title: "Uncontrolled with a custom label",
    description: "defaultVisible sets the first state and the menu tracks changes itself.",
    code: `<ColumnVisibilityMenu
  label="Display"
  columns={[
    { id: "name", label: "Customer" },
    { id: "plan", label: "Plan" },
    { id: "mrr", label: "MRR" },
    { id: "seats", label: "Seats" },
    { id: "renewal", label: "Renewal date" },
  ]}
  defaultVisible={["name", "plan", "mrr"]}
/>`,
    node: (
      <ColumnVisibilityMenu
        label="Display"
        columns={[
          { id: "name", label: "Customer" },
          { id: "plan", label: "Plan" },
          { id: "mrr", label: "MRR" },
          { id: "seats", label: "Seats" },
          { id: "renewal", label: "Renewal date" },
        ]}
        defaultVisible={["name", "plan", "mrr"]}
      />
    ),
  },
]
