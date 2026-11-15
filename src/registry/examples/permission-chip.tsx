"use client"
import { PermissionChip } from "@/registry/ui/permission-chip"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Three levels",
    description: "Admin is accent-tinted, write is filled and read is quiet. Screen readers hear \"admin access\".",
    code: `<div className="flex gap-2">
  <PermissionChip level="admin" />
  <PermissionChip level="write" />
  <PermissionChip level="read" />
</div>`,
    node: (
      <div className="flex gap-2">
        <PermissionChip level="admin" />
        <PermissionChip level="write" />
        <PermissionChip level="read" />
      </div>
    ),
  },
  {
    title: "Access per resource",
    description: "Use the chip as the last column of a short access list, such as what one API token can reach.",
    code: `<ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface text-sm">
  <li className="flex items-center justify-between px-3 py-2"><span className="text-fg">Invoices</span><PermissionChip level="write" /></li>
  <li className="flex items-center justify-between px-3 py-2"><span className="text-fg">Customers</span><PermissionChip level="read" /></li>
  <li className="flex items-center justify-between px-3 py-2"><span className="text-fg">Billing settings</span><PermissionChip level="admin" /></li>
</ul>`,
    node: (
      <ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface text-sm">
        <li className="flex items-center justify-between px-3 py-2"><span className="text-fg">Invoices</span><PermissionChip level="write" /></li>
        <li className="flex items-center justify-between px-3 py-2"><span className="text-fg">Customers</span><PermissionChip level="read" /></li>
        <li className="flex items-center justify-between px-3 py-2"><span className="text-fg">Billing settings</span><PermissionChip level="admin" /></li>
      </ul>
    ),
  },
]
