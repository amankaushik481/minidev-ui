"use client"
import * as React from "react"
import { RolePermissionMatrix } from "@/registry/ui/role-permission-matrix"
import type { Example } from "./types"

const GRANTS: Record<string, string[]> = {
  Editor: ["View invoices", "Create invoices", "Send reminders"],
  Viewer: ["View invoices"],
  Accountant: ["View invoices", "Export to ledger", "Issue refunds"],
}

function SaveDemo() {
  const [last, setLast] = React.useState("Change a box to see what would be saved.")
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <RolePermissionMatrix
        roles={["Editor", "Viewer", "Accountant"]}
        permissions={["View invoices", "Create invoices", "Send reminders", "Export to ledger", "Issue refunds"]}
        isChecked={(role, permission) => GRANTS[role].includes(permission)}
        onCheckedChange={(role, permission, checked) => setLast(`${role}: ${checked ? "allow" : "deny"} "${permission}"`)}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{last}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Your own roles",
    description: "isChecked seeds every box from your data, once, on mount. onCheckedChange reports one cell at a time.",
    code: `const GRANTS: Record<string, string[]> = {
  Editor: ["View invoices", "Create invoices", "Send reminders"],
  Viewer: ["View invoices"],
  Accountant: ["View invoices", "Export to ledger", "Issue refunds"],
}

function SaveDemo() {
  const [last, setLast] = React.useState("Change a box to see what would be saved.")
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <RolePermissionMatrix
        roles={["Editor", "Viewer", "Accountant"]}
        permissions={["View invoices", "Create invoices", "Send reminders", "Export to ledger", "Issue refunds"]}
        isChecked={(role, permission) => GRANTS[role].includes(permission)}
        onCheckedChange={(role, permission, checked) => setLast(\`\${role}: \${checked ? "allow" : "deny"} "\${permission}"\`)}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{last}</p>
    </div>
  )
}`,
    node: <SaveDemo />,
  },
]
