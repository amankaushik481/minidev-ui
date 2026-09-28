"use client"
import * as React from "react"
import { DataTable } from "@/registry/ui/data-table"
import { TableToolbar } from "@/registry/ui/table-toolbar"
import { TablePagination } from "@/registry/ui/table-pagination"
import { StatusBadge } from "@/registry/ui/status-badge"
import { EmptyTable } from "@/registry/ui/empty-table"
import { LoadingTable } from "@/registry/ui/loading-table"
import { Button } from "@/registry/ui/button"
import { DataTableDemo, DataTableEmptyDemo } from "@/components/reference/demos"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

const rows = [
  { id: "1", name: "Aman K", plan: "Pro", status: "active" },
  { id: "2", name: "Jordan Lee", plan: "Free", status: "trial" },
  { id: "3", name: "Sam Rivera", plan: "Team", status: "past_due" },
]

export default function Page() {
  const [q, setQ] = React.useState("")
  const [page, setPage] = React.useState(1)
  const filtered = rows.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()))
  return (
    <GalleryPage title="Data table" description="Sort by any header, select rows for bulk actions, hover a row for its menu. Scroll inside it and the header picks up a shadow.">
      <GallerySection title="Invoices"><DataTableDemo /></GallerySection>
      <GallerySection title="Empty"><DataTableEmptyDemo /></GallerySection>
      <GallerySection title="Toolbar + table + pagination">
        <div className="w-full max-w-3xl">
          <TableToolbar search={q} onSearchChange={setQ}>
            <Button size="sm">Add user</Button>
          </TableToolbar>
          <DataTable
            data={filtered}
            columns={[
              { id: "name", header: "Name", sortValue: (r) => r.name, cell: (r) => r.name },
              { id: "plan", header: "Plan", cell: (r) => r.plan },
              { id: "status", header: "Status", cell: (r) => (
                <StatusBadge tone={r.status === "active" ? "success" : r.status === "past_due" ? "danger" : "warning"}>{r.status}</StatusBadge>
              ) },
            ]}
          />
          <TablePagination page={page} pageCount={3} onPageChange={setPage} />
        </div>
      </GallerySection>
      <GallerySection title="Empty / loading">
        <EmptyTable className="max-w-md" actionLabel="Create row" />
        <LoadingTable className="max-w-md" rows={4} cols={3} />
      </GallerySection>
    </GalleryPage>
  )
}
