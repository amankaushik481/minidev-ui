"use client"
import { PageHeader } from "@/registry/ui/page-header"
import { DataTable } from "@/registry/ui/data-table"
import { TableToolbar } from "@/registry/ui/table-toolbar"
import { StatusBadge } from "@/registry/ui/status-badge"
import { Button } from "@/registry/ui/button"
import * as React from "react"
function UsersTablePage() {
  const [q, setQ] = React.useState("")
  const data = [
    { id: "1", name: "Aman", role: "Owner", status: "active" },
    { id: "2", name: "Jordan", role: "Admin", status: "active" },
    { id: "3", name: "Sam", role: "Member", status: "invited" },
  ].filter((r) => r.name.toLowerCase().includes(q.toLowerCase()))
  return (
    <div data-slot="users-table-page" className="space-y-4">
      <PageHeader title="Users" description="Manage members" actions={<Button size="sm">Invite</Button>} />
      <TableToolbar search={q} onSearchChange={setQ} />
      <DataTable data={data} columns={[
        { id: "name", header: "Name", cell: (r) => r.name },
        { id: "role", header: "Role", cell: (r) => r.role },
        { id: "status", header: "Status", cell: (r) => <StatusBadge tone={r.status==="active"?"success":"warning"}>{r.status}</StatusBadge> },
      ]} />
    </div>
  )
}
export { UsersTablePage }
