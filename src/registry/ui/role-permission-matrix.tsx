"use client"
import * as React from "react"
import { Checkbox } from "@/registry/ui/checkbox"
import { cn } from "@/lib/utils"

/**
 * A permissions table with one checkbox per role and capability, for workspace access settings.
 *
 * Rows are capabilities, columns are roles; each checkbox is named "<role> <permission>" for
 * screen readers. Seed it with `isChecked` and listen with `onCheckedChange`. For assigning one
 * role to one person use RolePicker.
 *
 * @example
 * <RolePermissionMatrix
 *   roles={["Admin", "Member"]}
 *   permissions={["Read", "Edit"]}
 *   isChecked={(role, permission) => role === "Admin" || permission === "Read"}
 *   onCheckedChange={(role, permission, checked) => savePermission(role, permission, checked)}
 * />
 */
type RolePermissionMatrixProps = {
  /** Column headers. Defaults to Lumen's three workspace roles. */
  roles?: string[]
  /** Row labels, one per capability. */
  permissions?: string[]
  /** Starting state of each checkbox. Defaults to everything on except Member, who only reads. */
  isChecked?: (role: string, permission: string) => boolean
  /** Fires when a checkbox changes. */
  onCheckedChange?: (role: string, permission: string, checked: boolean) => void
  className?: string
}

const SAMPLE_ROLES = ["Owner", "Admin", "Member"]
const SAMPLE_PERMISSIONS = ["Read", "Comment", "Edit", "Delete", "Invite members", "Manage billing"]
const sampleChecked = (role: string, permission: string) => role !== "Member" || permission === "Read"

function RolePermissionMatrix({
  roles = SAMPLE_ROLES,
  permissions = SAMPLE_PERMISSIONS,
  isChecked = sampleChecked,
  onCheckedChange,
  className,
}: RolePermissionMatrixProps) {
  return (
    <div data-slot="role-permission-matrix" className={cn("w-full max-w-xl overflow-x-auto rounded-xl border border-border bg-surface", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-sunken">
            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-fg-muted">Permission</th>
            {roles.map((r) => (
              <th key={r} scope="col" className="px-3 py-2 text-left text-xs font-medium text-fg">
                {r}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.map((p) => (
            <tr key={p} className="border-b border-border last:border-b-0">
              <th scope="row" className="px-3 py-2 text-left font-normal text-fg-muted">{p}</th>
              {roles.map((r) => (
                <td key={r} className="px-3 py-2">
                  <Checkbox
                    aria-label={`${r} ${p}`}
                    defaultChecked={isChecked(r, p)}
                    onCheckedChange={(checked) => onCheckedChange?.(r, p, checked)}
                  />
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
