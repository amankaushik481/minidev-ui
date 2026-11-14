"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { DataTable } from "@/registry/ui/data-table"
import { PageHeader } from "@/registry/ui/page-header"
import { StatusBadge } from "@/registry/ui/status-badge"
import { TableToolbar } from "@/registry/ui/table-toolbar"

/**
 * UsersTablePage — a members page: title with Invite, a search toolbar, and a sortable table of people with role and status.
 *
 * Use for any admin list that needs search and sorting (users, customers, API keys). Search matches name or email.
 * For a short linked list use ProjectList; for one person use UserDetail; for the whole admin area use AdminConsole.
 * Composes PageHeader, TableToolbar and DataTable.
 *
 * @example
 * <UsersTablePage onInvite={() => setInviteOpen(true)} />
 */
type UsersTablePageProps = {
  /** Called by the Invite button. */
  onInvite?: () => void
  className?: string
}

type Member = { id: string; name: string; email: string; role: "Owner" | "Admin" | "Member" | "Viewer"; status: "active" | "invited" | "suspended" }

const MEMBERS: Member[] = [
  { id: "u1", name: "Priya Raman", email: "priya@halcyon.co", role: "Owner", status: "active" },
  { id: "u2", name: "Hana Ito", email: "hana@halcyon.co", role: "Admin", status: "active" },
  { id: "u3", name: "Tom Lindqvist", email: "tom@halcyon.co", role: "Member", status: "active" },
  { id: "u4", name: "Sofia Marín", email: "sofia@halcyon.co", role: "Member", status: "invited" },
  { id: "u5", name: "Daniel Okafor", email: "daniel@halcyon.co", role: "Viewer", status: "suspended" },
]

const TONE = { active: "success", invited: "info", suspended: "neutral" } as const

function UsersTablePage({ onInvite, className }: UsersTablePageProps) {
  const [q, setQ] = React.useState("")
  const needle = q.trim().toLowerCase()
  const data = needle ? MEMBERS.filter((m) => m.name.toLowerCase().includes(needle) || m.email.toLowerCase().includes(needle)) : MEMBERS
  return (
    <div data-slot="users-table-page" className={cn("space-y-4", className)}>
      <PageHeader
        title="Users"
        description={`${MEMBERS.length} people in the Halcyon workspace.`}
        actions={
          <Button size="sm" onClick={onInvite}>
            Invite
          </Button>
        }
      />
      <TableToolbar search={q} onSearchChange={setQ} searchPlaceholder="Search name or email…" />
      <DataTable
        caption="Workspace members"
        data={data}
        getRowId={(r) => r.id}
        defaultSort={{ id: "name", dir: "asc" }}
        empty={`No one matches “${q}”.`}
        columns={[
          {
            id: "name",
            header: "Name",
            sortValue: (r) => r.name,
            cell: (r) => (
              <span className="block min-w-0">
                <span className="block truncate font-medium text-fg">{r.name}</span>
                <span className="block truncate text-xs text-fg-muted">{r.email}</span>
              </span>
            ),
          },
          { id: "role", header: "Role", sortValue: (r) => r.role, cell: (r) => r.role },
          {
            id: "status",
            header: "Status",
            sortValue: (r) => r.status,
            cell: (r) => (
              <StatusBadge tone={TONE[r.status]} className="capitalize">
                {r.status}
              </StatusBadge>
            ),
          },
        ]}
      />
    </div>
  )
}

export { UsersTablePage }
export type { UsersTablePageProps }
