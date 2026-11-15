"use client"
import * as React from "react"
import { SortableHeader } from "@/registry/ui/sortable-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"
import type { Example } from "./types"

type SortDir = "asc" | "desc" | false
type SortCol = "customer" | "amount"

const balances = [
  { customer: "Northwind Labs", amount: 12400 },
  { customer: "Acme Robotics", amount: 3890 },
  { customer: "Halcyon Health", amount: 890 },
  { customer: "Fathom Analytics", amount: 5200 },
]

function SortableBalances() {
  const [sort, setSort] = React.useState<{ col: SortCol; dir: SortDir }>({ col: "amount", dir: "desc" })
  const dirOf = (col: SortCol): SortDir => (sort.col === col ? sort.dir : false)
  const ariaSort = (col: SortCol): "ascending" | "descending" | "none" => (dirOf(col) === "asc" ? "ascending" : dirOf(col) === "desc" ? "descending" : "none")
  const cycle = (col: SortCol) => {
    const d = dirOf(col)
    setSort({ col, dir: d === false ? "asc" : d === "asc" ? "desc" : false })
  }
  const rows = [...balances]
  if (sort.dir) {
    rows.sort((a, b) => (sort.col === "amount" ? a.amount - b.amount : a.customer.localeCompare(b.customer)))
    if (sort.dir === "desc") rows.reverse()
  }
  return (
    <div className="w-full max-w-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead aria-sort={ariaSort("customer")}>
              <SortableHeader label="Customer" direction={dirOf("customer")} onToggle={() => cycle("customer")} />
            </TableHead>
            <TableHead aria-sort={ariaSort("amount")} className="text-right">
              <SortableHeader label="Balance" direction={dirOf("amount")} onToggle={() => cycle("amount")} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.customer}>
              <TableCell>{r.customer}</TableCell>
              <TableCell className="text-right">${r.amount.toLocaleString("en-US")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Sorting a Table",
    description: "Keep one sorted column in state, cycle it on toggle and mirror it in aria-sort on the header cell.",
    code: `type SortDir = "asc" | "desc" | false
type SortCol = "customer" | "amount"

const balances = [
  { customer: "Northwind Labs", amount: 12400 },
  { customer: "Acme Robotics", amount: 3890 },
  { customer: "Halcyon Health", amount: 890 },
  { customer: "Fathom Analytics", amount: 5200 },
]

function SortableBalances() {
  const [sort, setSort] = React.useState<{ col: SortCol; dir: SortDir }>({ col: "amount", dir: "desc" })
  const dirOf = (col: SortCol): SortDir => (sort.col === col ? sort.dir : false)
  const ariaSort = (col: SortCol): "ascending" | "descending" | "none" => (dirOf(col) === "asc" ? "ascending" : dirOf(col) === "desc" ? "descending" : "none")
  const cycle = (col: SortCol) => {
    const d = dirOf(col)
    setSort({ col, dir: d === false ? "asc" : d === "asc" ? "desc" : false })
  }
  const rows = [...balances]
  if (sort.dir) {
    rows.sort((a, b) => (sort.col === "amount" ? a.amount - b.amount : a.customer.localeCompare(b.customer)))
    if (sort.dir === "desc") rows.reverse()
  }
  return (
    <div className="w-full max-w-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead aria-sort={ariaSort("customer")}>
              <SortableHeader label="Customer" direction={dirOf("customer")} onToggle={() => cycle("customer")} />
            </TableHead>
            <TableHead aria-sort={ariaSort("amount")} className="text-right">
              <SortableHeader label="Balance" direction={dirOf("amount")} onToggle={() => cycle("amount")} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.customer}>
              <TableCell>{r.customer}</TableCell>
              <TableCell className="text-right">\${r.amount.toLocaleString("en-US")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}`,
    node: <SortableBalances />,
  },
]
