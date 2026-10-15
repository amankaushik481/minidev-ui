"use client"
import * as React from "react"
import { DownloadIcon, EllipsisIcon, SendIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { DataTable, type Column } from "@/registry/ui/data-table"
import type { Example } from "./types"

type Deploy = {
  id: string
  service: string
  env: "production" | "preview"
  author: string
  status: "live" | "building" | "failed"
  duration: string
}

const deploys: Deploy[] = [
  { id: "dpl_412", service: "lumen-web", env: "production", author: "Theo Okafor", status: "live", duration: "1m 48s" },
  { id: "dpl_411", service: "lumen-api", env: "production", author: "Maya Chen", status: "live", duration: "2m 10s" },
  { id: "dpl_410", service: "lumen-web", env: "preview", author: "Priya Raman", status: "building", duration: "0m 32s" },
  { id: "dpl_409", service: "billing-worker", env: "preview", author: "Sam Lowe", status: "failed", duration: "0m 51s" },
  { id: "dpl_408", service: "lumen-api", env: "preview", author: "Maya Chen", status: "live", duration: "1m 59s" },
]

const STATUS_DOT: Record<Deploy["status"], string> = { live: "bg-success", building: "bg-warning", failed: "bg-danger" }

const columns: Column<Deploy>[] = [
  { id: "service", header: "Service", sortValue: (d) => d.service, cell: (d) => <span className="font-medium text-fg">{d.service}</span> },
  { id: "env", header: "Environment", sortValue: (d) => d.env, cell: (d) => <span className="capitalize text-fg-muted">{d.env}</span> },
  { id: "author", header: "Author", sortValue: (d) => d.author, cell: (d) => d.author },
  {
    id: "status",
    header: "Status",
    sortValue: (d) => d.status,
    cell: (d) => (
      <span className="inline-flex items-center gap-1.5 capitalize">
        <span aria-hidden className={"size-1.5 rounded-full " + STATUS_DOT[d.status]} />
        {d.status}
      </span>
    ),
  },
  { id: "duration", header: "Duration", align: "right", cell: (d) => <span className="font-mono text-xs">{d.duration}</span> },
]

function RowActionsDemo() {
  const [opened, setOpened] = React.useState<string | null>(null)
  return (
    <div className="w-full space-y-3">
      <DataTable
        density="compact"
        maxHeight={240}
        onRowClick={(row) => setOpened(row.id)}
        rowActions={(row) => (
          <Button variant="ghost" size="icon-xs" aria-label={"More actions for " + row.id}>
            <EllipsisIcon />
          </Button>
        )}
      />
      <p className="text-xs text-fg-muted">{opened ? "Opened " + opened : "Click a row to open it. The header stays put while you scroll."}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Selection and bulk actions",
    description: "selectable adds a checkbox column and bulkActions fills the floating bar while rows are selected.",
    code: `<DataTable
  selectable
  getRowId={(row) => row.id}
  bulkActions={() => (
    <>
      <Button size="sm" variant="ghost"><SendIcon /> Send reminder</Button>
      <Button size="sm" variant="ghost"><DownloadIcon /> Export</Button>
    </>
  )}
/>`,
    node: (
      <DataTable
        selectable
        getRowId={(row) => row.id}
        bulkActions={() => (
          <>
            <Button size="sm" variant="ghost"><SendIcon /> Send reminder</Button>
            <Button size="sm" variant="ghost"><DownloadIcon /> Export</Button>
          </>
        )}
      />
    ),
  },
  {
    title: "Custom columns",
    description: "Columns are typed by the row, sortValue turns sorting on per column and defaultSort picks the first order.",
    code: `type Deploy = {
  id: string
  service: string
  env: "production" | "preview"
  author: string
  status: "live" | "building" | "failed"
  duration: string
}

const deploys: Deploy[] = [
  { id: "dpl_412", service: "lumen-web", env: "production", author: "Theo Okafor", status: "live", duration: "1m 48s" },
  { id: "dpl_411", service: "lumen-api", env: "production", author: "Maya Chen", status: "live", duration: "2m 10s" },
  { id: "dpl_410", service: "lumen-web", env: "preview", author: "Priya Raman", status: "building", duration: "0m 32s" },
  { id: "dpl_409", service: "billing-worker", env: "preview", author: "Sam Lowe", status: "failed", duration: "0m 51s" },
  { id: "dpl_408", service: "lumen-api", env: "preview", author: "Maya Chen", status: "live", duration: "1m 59s" },
]

const STATUS_DOT: Record<Deploy["status"], string> = { live: "bg-success", building: "bg-warning", failed: "bg-danger" }

const columns: Column<Deploy>[] = [
  { id: "service", header: "Service", sortValue: (d) => d.service, cell: (d) => <span className="font-medium text-fg">{d.service}</span> },
  { id: "env", header: "Environment", sortValue: (d) => d.env, cell: (d) => <span className="capitalize text-fg-muted">{d.env}</span> },
  { id: "author", header: "Author", sortValue: (d) => d.author, cell: (d) => d.author },
  {
    id: "status",
    header: "Status",
    sortValue: (d) => d.status,
    cell: (d) => (
      <span className="inline-flex items-center gap-1.5 capitalize">
        <span aria-hidden className={"size-1.5 rounded-full " + STATUS_DOT[d.status]} />
        {d.status}
      </span>
    ),
  },
  { id: "duration", header: "Duration", align: "right", cell: (d) => <span className="font-mono text-xs">{d.duration}</span> },
]

<DataTable columns={columns} data={deploys} getRowId={(d) => d.id} defaultSort={{ id: "service", dir: "asc" }} caption="Recent deploys" />`,
    node: <DataTable columns={columns} data={deploys} getRowId={(d) => d.id} defaultSort={{ id: "service", dir: "asc" }} caption="Recent deploys" />,
  },
  {
    title: "Row actions and click",
    description: "rowActions appear on hover or focus, onRowClick makes rows focusable, and maxHeight gives a sticky header.",
    code: `function RowActionsDemo() {
  const [opened, setOpened] = React.useState<string | null>(null)
  return (
    <div className="w-full space-y-3">
      <DataTable
        density="compact"
        maxHeight={240}
        onRowClick={(row) => setOpened(row.id)}
        rowActions={(row) => (
          <Button variant="ghost" size="icon-xs" aria-label={"More actions for " + row.id}>
            <EllipsisIcon />
          </Button>
        )}
      />
      <p className="text-xs text-fg-muted">{opened ? "Opened " + opened : "Click a row to open it. The header stays put while you scroll."}</p>
    </div>
  )
}`,
    node: <RowActionsDemo />,
  },
  {
    title: "Loading and empty",
    description: "loading swaps rows for a skeleton; an empty data array shows the empty node in place of rows.",
    code: `// columns is the Deploy column set from the "Custom columns" example.
<div className="w-full space-y-4">
  <DataTable loading caption="Loading invoices" />
  <DataTable columns={columns} data={[]} empty={<p className="text-sm text-fg-muted">No deploys yet. Push to main to start one.</p>} />
</div>`,
    node: (
      <div className="w-full space-y-4">
        <DataTable loading caption="Loading invoices" />
        <DataTable columns={columns} data={[]} empty={<p className="text-sm text-fg-muted">No deploys yet. Push to main to start one.</p>} />
      </div>
    ),
  },
]
