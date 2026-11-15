"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { ColumnVisibilityMenu } from "@/registry/ui/column-visibility-menu"
import { DensityToggle } from "@/registry/ui/density-toggle"
import { TableToolbar } from "@/registry/ui/table-toolbar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"
import type { Example } from "./types"

const projects = [
  { name: "Invoice PDF redesign", owner: "Maya Chen" },
  { name: "Payout reconciliation", owner: "Theo Okafor" },
  { name: "VAT reverse charge", owner: "Priya Raman" },
  { name: "Customer portal dark mode", owner: "Sam Lowe" },
]

function ProjectSearch() {
  const [search, setSearch] = React.useState("")
  const q = search.trim().toLowerCase()
  const rows = projects.filter((p) => (p.name + " " + p.owner).toLowerCase().includes(q))
  return (
    <div className="w-full max-w-lg">
      <TableToolbar search={search} onSearchChange={setSearch} searchPlaceholder="Search projects…" searchLabel="Search projects">
        <Button size="sm">New project</Button>
      </TableToolbar>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Owner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p) => (
            <TableRow key={p.name}>
              <TableCell>{p.name}</TableCell>
              <TableCell className="text-fg-muted">{p.owner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {rows.length === 0 ? <p className="py-6 text-center text-sm text-fg-muted">No projects match.</p> : null}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Searching a table",
    description: "Control the search and filter the rows yourself; a New button sits on the right.",
    code: `const projects = [
  { name: "Invoice PDF redesign", owner: "Maya Chen" },
  { name: "Payout reconciliation", owner: "Theo Okafor" },
  { name: "VAT reverse charge", owner: "Priya Raman" },
  { name: "Customer portal dark mode", owner: "Sam Lowe" },
]

function ProjectSearch() {
  const [search, setSearch] = React.useState("")
  const q = search.trim().toLowerCase()
  const rows = projects.filter((p) => (p.name + " " + p.owner).toLowerCase().includes(q))
  return (
    <div className="w-full max-w-lg">
      <TableToolbar search={search} onSearchChange={setSearch} searchPlaceholder="Search projects…" searchLabel="Search projects">
        <Button size="sm">New project</Button>
      </TableToolbar>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Owner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p) => (
            <TableRow key={p.name}>
              <TableCell>{p.name}</TableCell>
              <TableCell className="text-fg-muted">{p.owner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {rows.length === 0 ? <p className="py-6 text-center text-sm text-fg-muted">No projects match.</p> : null}
    </div>
  )
}`,
    node: <ProjectSearch />,
  },
  {
    title: "With view controls",
    description: "Put ColumnVisibilityMenu, DensityToggle and a primary action in children.",
    code: `<TableToolbar searchPlaceholder="Search customers…" searchLabel="Search customers" className="w-full max-w-2xl">
  <ColumnVisibilityMenu />
  <DensityToggle />
  <Button size="sm">Add customer</Button>
</TableToolbar>`,
    node: (
      <TableToolbar searchPlaceholder="Search customers…" searchLabel="Search customers" className="w-full max-w-2xl">
        <ColumnVisibilityMenu />
        <DensityToggle />
        <Button size="sm">Add customer</Button>
      </TableToolbar>
    ),
  },
]
