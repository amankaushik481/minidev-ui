"use client"
import * as React from "react"
import { FileTextIcon } from "lucide-react"
import { ContextMenu } from "@/registry/ui/context-menu"
import type { Example } from "./types"

function InvoiceRowDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  const items = [
    { id: "paid", label: "Mark as paid", onSelect: () => setLast("Marked INV-2041 as paid") },
    { id: "remind", label: "Send reminder", onSelect: () => setLast("Reminder sent to Northwind") },
    { id: "duplicate", label: "Duplicate", onSelect: () => setLast("Created INV-2059 from INV-2041") },
    { id: "void", label: "Void invoice", destructive: true, onSelect: () => setLast("Voided INV-2041") },
  ]
  return (
    <div className="flex w-80 flex-col gap-2">
      <ContextMenu items={items}>
        <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2.5 text-sm shadow-raised">
          <div>
            <p className="font-medium text-fg">INV-2041 · Northwind Traders</p>
            <p className="text-xs text-fg-muted">$12,400.00 · due Oct 24</p>
          </div>
          <span className="text-xs text-fg-subtle">Right click</span>
        </div>
      </ContextMenu>
      <p className="text-xs text-fg-muted" aria-live="polite">{last ?? "No action yet"}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "File actions",
    description: "Wrap any surface; a right click opens the menu at the pointer, and destructive items are red.",
    code: `<ContextMenu
  items={[
    { id: "open", label: "Open" },
    { id: "rename", label: "Rename" },
    { id: "download", label: "Download" },
    { id: "delete", label: "Delete", destructive: true },
  ]}
>
  <div className="flex w-64 items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-raised">
    <span className="grid size-9 place-items-center rounded-lg bg-sunken text-fg-muted"><FileTextIcon className="size-4" /></span>
    <div className="min-w-0">
      <p className="truncate text-sm font-medium text-fg">Q3-report.pdf</p>
      <p className="text-xs text-fg-muted">2.4 MB · Right click for actions</p>
    </div>
  </div>
</ContextMenu>`,
    node: (
      <ContextMenu
        items={[
          { id: "open", label: "Open" },
          { id: "rename", label: "Rename" },
          { id: "download", label: "Download" },
          { id: "delete", label: "Delete", destructive: true },
        ]}
      >
        <div className="flex w-64 items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-raised">
          <span className="grid size-9 place-items-center rounded-lg bg-sunken text-fg-muted"><FileTextIcon className="size-4" /></span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-fg">Q3-report.pdf</p>
            <p className="text-xs text-fg-muted">2.4 MB · Right click for actions</p>
          </div>
        </div>
      </ContextMenu>
    ),
  },
  {
    title: "Items with handlers",
    description: "Each item takes an onSelect; keep the result visible so the action is confirmed after the menu closes.",
    code: `function InvoiceRowDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  const items = [
    { id: "paid", label: "Mark as paid", onSelect: () => setLast("Marked INV-2041 as paid") },
    { id: "remind", label: "Send reminder", onSelect: () => setLast("Reminder sent to Northwind") },
    { id: "duplicate", label: "Duplicate", onSelect: () => setLast("Created INV-2059 from INV-2041") },
    { id: "void", label: "Void invoice", destructive: true, onSelect: () => setLast("Voided INV-2041") },
  ]
  return (
    <div className="flex w-80 flex-col gap-2">
      <ContextMenu items={items}>
        <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2.5 text-sm shadow-raised">
          <div>
            <p className="font-medium text-fg">INV-2041 · Northwind Traders</p>
            <p className="text-xs text-fg-muted">$12,400.00 · due Oct 24</p>
          </div>
          <span className="text-xs text-fg-subtle">Right click</span>
        </div>
      </ContextMenu>
      <p className="text-xs text-fg-muted" aria-live="polite">{last ?? "No action yet"}</p>
    </div>
  )
}`,
    node: <InvoiceRowDemo />,
  },
]
