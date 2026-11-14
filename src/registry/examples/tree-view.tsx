"use client"
import * as React from "react"
import { TreeView, type TreeNode } from "@/registry/ui/tree-view"
import type { Example } from "./types"

const folders: TreeNode[] = [
  {
    id: "invoices",
    label: "Invoices",
    children: [
      {
        id: "2026",
        label: "2026",
        children: [
          { id: "inv-2041", label: "INV-2041 Northwind.pdf" },
          { id: "inv-2042", label: "INV-2042 Hollis & Rowe.pdf" },
          { id: "inv-2043", label: "INV-2043 Kestrel Labs.pdf" },
        ],
      },
      { id: "2025", label: "2025", children: [{ id: "inv-1988", label: "INV-1988 Northwind.pdf" }] },
    ],
  },
  { id: "receipts", label: "Receipts", children: [{ id: "rcpt-q3", label: "Q3 card receipts.zip" }] },
  { id: "contracts", label: "Contracts", children: [] },
]

const environments: TreeNode[] = [
  { id: "production", label: "production" },
  { id: "staging", label: "staging" },
  { id: "preview", label: "preview" },
  { id: "local", label: "local" },
]

function SelectionDemo() {
  const [selected, setSelected] = React.useState<TreeNode | null>(null)
  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-[1fr_12rem]">
      <TreeView
        nodes={folders}
        defaultExpanded={["invoices", "2026"]}
        selectedId={selected?.id}
        onSelect={setSelected}
        aria-label="Documents"
        className="max-w-none"
      />
      <div aria-live="polite" className="rounded-xl border border-border bg-surface p-4 text-sm shadow-xs">
        <p className="text-xs text-fg-muted">Selected</p>
        <p className="mt-1 font-medium break-words text-fg">{selected ? selected.label : "Nothing yet"}</p>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Folders, partly open",
    description: "defaultExpanded lists the branch ids open on first render; leave it out and every branch starts open. A node with an empty children array is an empty folder.",
    code: `const folders: TreeNode[] = [
  {
    id: "invoices",
    label: "Invoices",
    children: [
      {
        id: "2026",
        label: "2026",
        children: [
          { id: "inv-2041", label: "INV-2041 Northwind.pdf" },
          { id: "inv-2042", label: "INV-2042 Hollis & Rowe.pdf" },
          { id: "inv-2043", label: "INV-2043 Kestrel Labs.pdf" },
        ],
      },
      { id: "2025", label: "2025", children: [{ id: "inv-1988", label: "INV-1988 Northwind.pdf" }] },
    ],
  },
  { id: "receipts", label: "Receipts", children: [{ id: "rcpt-q3", label: "Q3 card receipts.zip" }] },
  { id: "contracts", label: "Contracts", children: [] },
]

<TreeView nodes={folders} defaultExpanded={["invoices"]} aria-label="Documents" />`,
    node: <TreeView nodes={folders} defaultExpanded={["invoices"]} aria-label="Documents" />,
  },
  {
    title: "Selection drives a panel",
    description: "Control selectedId and read the whole node from onSelect, which fires on click and on Enter or Space.",
    code: `function SelectionDemo() {
  const [selected, setSelected] = React.useState<TreeNode | null>(null)
  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-[1fr_12rem]">
      <TreeView
        nodes={folders}
        defaultExpanded={["invoices", "2026"]}
        selectedId={selected?.id}
        onSelect={setSelected}
        aria-label="Documents"
        className="max-w-none"
      />
      <div aria-live="polite" className="rounded-xl border border-border bg-surface p-4 text-sm shadow-xs">
        <p className="text-xs text-fg-muted">Selected</p>
        <p className="mt-1 font-medium break-words text-fg">{selected ? selected.label : "Nothing yet"}</p>
      </div>
    </div>
  )
}`,
    node: <SelectionDemo />,
  },
  {
    title: "Leaf nodes only",
    description: "Without children the chevrons stay hidden and the tree behaves like a plain list with the same hover and focus styles.",
    code: `const environments: TreeNode[] = [
  { id: "production", label: "production" },
  { id: "staging", label: "staging" },
  { id: "preview", label: "preview" },
  { id: "local", label: "local" },
]

<TreeView nodes={environments} aria-label="Environments" className="max-w-48" />`,
    node: <TreeView nodes={environments} aria-label="Environments" className="max-w-48" />,
  },
]
