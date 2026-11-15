"use client"
import * as React from "react"
import { InlineCellEdit } from "@/registry/ui/inline-cell-edit"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"
import type { Example } from "./types"

function EditablePlans() {
  const [plans, setPlans] = React.useState([
    { id: "starter", name: "Starter", price: "$12" },
    { id: "team", name: "Team", price: "$49" },
    { id: "scale", name: "Scale", price: "$199" },
  ])
  const rename = (id: string, name: string) => setPlans((all) => all.map((p) => (p.id === id ? { ...p, name } : p)))
  return (
    <div className="w-full max-w-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plan name</TableHead>
            <TableHead className="text-right">Per seat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <InlineCellEdit value={p.name} label="Plan name" onChange={(name) => rename(p.id, name)} />
              </TableCell>
              <TableCell className="text-right">{p.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function ValidatedPrice() {
  const [price, setPrice] = React.useState("49.00")
  const [error, setError] = React.useState("")
  const save = (next: string) => {
    if (/^\d+(\.\d{1,2})?$/.test(next)) {
      setPrice(next)
      setError("")
    } else {
      setError("Use a number like 49.00. The price is still " + price + ".")
    }
  }
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-sm text-fg-muted">
        Team plan, USD per seat:
        <InlineCellEdit value={price} label="Price per seat" onChange={save} />
      </div>
      {error ? <p role="alert" className="text-xs text-danger">{error}</p> : null}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Renaming rows in a table",
    description: "onChange fires once per committed edit; the parent updates the row and passes the new value back.",
    code: `function EditablePlans() {
  const [plans, setPlans] = React.useState([
    { id: "starter", name: "Starter", price: "$12" },
    { id: "team", name: "Team", price: "$49" },
    { id: "scale", name: "Scale", price: "$199" },
  ])
  const rename = (id: string, name: string) => setPlans((all) => all.map((p) => (p.id === id ? { ...p, name } : p)))
  return (
    <div className="w-full max-w-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plan name</TableHead>
            <TableHead className="text-right">Per seat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <InlineCellEdit value={p.name} label="Plan name" onChange={(name) => rename(p.id, name)} />
              </TableCell>
              <TableCell className="text-right">{p.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}`,
    node: <EditablePlans />,
  },
  {
    title: "Validating a price",
    description: "Parse the string in onChange and keep the old value when it is not a valid amount.",
    code: `function ValidatedPrice() {
  const [price, setPrice] = React.useState("49.00")
  const [error, setError] = React.useState("")
  const save = (next: string) => {
    if (/^\\d+(\\.\\d{1,2})?$/.test(next)) {
      setPrice(next)
      setError("")
    } else {
      setError("Use a number like 49.00. The price is still " + price + ".")
    }
  }
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-sm text-fg-muted">
        Team plan, USD per seat:
        <InlineCellEdit value={price} label="Price per seat" onChange={save} />
      </div>
      {error ? <p role="alert" className="text-xs text-danger">{error}</p> : null}
    </div>
  )
}`,
    node: <ValidatedPrice />,
  },
]
