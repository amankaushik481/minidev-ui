"use client"
import * as React from "react"
import { RolePicker } from "@/registry/ui/role-picker"
import type { Example } from "./types"

const ROLES = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
]

const WHAT: Record<string, string> = {
  admin: "Can invite people, change billing and delete the workspace.",
  editor: "Can create and send invoices. Cannot change billing.",
  viewer: "Can read invoices and reports. Cannot change anything.",
}

function ExplainDemo() {
  const [role, setRole] = React.useState("editor")
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RolePicker aria-label="Role for theo@northwind.com" roles={ROLES} value={role} onValueChange={setRole} />
      <p className="text-xs text-fg-muted" aria-live="polite">{WHAT[role]}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Explain the picked role",
    description: "Options take only a value and a label, so show what the role allows next to the picker.",
    code: `const ROLES = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
]

const WHAT: Record<string, string> = {
  admin: "Can invite people, change billing and delete the workspace.",
  editor: "Can create and send invoices. Cannot change billing.",
  viewer: "Can read invoices and reports. Cannot change anything.",
}

function ExplainDemo() {
  const [role, setRole] = React.useState("editor")
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RolePicker aria-label="Role for theo@northwind.com" roles={ROLES} value={role} onValueChange={setRole} />
      <p className="text-xs text-fg-muted" aria-live="polite">{WHAT[role]}</p>
    </div>
  )
}`,
    node: <ExplainDemo />,
  },
  {
    title: "Default roles",
    description: "Without roles it offers Owner, Admin and Member, starting on Member.",
    code: `<RolePicker />`,
    node: <RolePicker />,
  },
]
