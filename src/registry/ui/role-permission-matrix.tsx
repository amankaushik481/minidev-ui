"use client"
import { Checkbox } from "@/registry/ui/checkbox"
import { cn } from "@/lib/utils"

/** A permissions table with one checkbox per role and capability, for workspace access settings. */
type RolePermissionMatrixProps = {
  /** Column headers. Defaults to Lumen's three workspace roles. */
  roles?: string[]
  /** Row labels, one per capability. */
  permissions?: string[]
  className?: string
}

const SAMPLE_ROLES = ["Owner", "Admin", "Member"]
const SAMPLE_PERMISSIONS = ["Read", "Comment", "Edit", "Delete", "Invite members", "Manage billing"]

function RolePermissionMatrix({
  roles = SAMPLE_ROLES,
  permissions = SAMPLE_PERMISSIONS,
  className,
}: RolePermissionMatrixProps) {
  return (
    <div data-slot="role-permission-matrix" className={cn("w-full max-w-xl overflow-x-auto rounded-xl border border-border bg-surface", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-sunken">
            <th className="px-3 py-2 text-left text-xs text-fg-muted">Permission</th>
            {roles.map((r) => (
              <th key={r} className="px-3 py-2 text-left text-xs text-fg">
                {r}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.map((p) => (
            <tr key={p} className="border-b border-border last:border-b-0">
              <td className="px-3 py-2 text-fg-muted">{p}</td>
              {roles.map((r) => (
                <td key={r} className="px-3 py-2">
                  <Checkbox aria-label={`${r} ${p}`} defaultChecked={r !== "Member" || p === "Read"} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export { RolePermissionMatrix }
export type { RolePermissionMatrixProps }
