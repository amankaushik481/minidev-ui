"use client"
import { Checkbox } from "@/registry/ui/checkbox"
import { cn } from "@/lib/utils"
function RolePermissionMatrix({
  roles,
  permissions,
  className,
}: {
  roles: string[]
  permissions: string[]
  className?: string
}) {
  return (
    <div data-slot="role-permission-matrix" className={cn("overflow-x-auto rounded-xl border border-border", className)}>
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
