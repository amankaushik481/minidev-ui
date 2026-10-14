"use client"
import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/** A collapsible tree of nested nodes, open by default, for file browsers and org charts. */
type TreeNode = { id: string; label: string; children?: TreeNode[] }

type TreeViewProps = {
  /** Root nodes. Defaults to the Lumen web app's source tree. */
  nodes?: TreeNode[]
  className?: string
}

const SAMPLE_NODES: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "app",
        label: "app",
        children: [
          { id: "invoices", label: "invoices", children: [{ id: "invoices-page", label: "page.tsx" }] },
          { id: "customers", label: "customers", children: [{ id: "customers-page", label: "page.tsx" }] },
          { id: "layout", label: "layout.tsx" },
        ],
      },
      {
        id: "components",
        label: "components",
        children: [
          { id: "invoice-table", label: "invoice-table.tsx" },
          { id: "customer-card", label: "customer-card.tsx" },
        ],
      },
    ],
  },
  { id: "package", label: "package.json" },
  { id: "readme", label: "README.md" },
]

function TreeView({ nodes = SAMPLE_NODES, className }: TreeViewProps) {
  return (
    <ul data-slot="tree-view" className={cn("w-full max-w-xs text-sm", className)} role="tree">
      {nodes.map((n) => <TreeItem key={n.id} node={n} depth={0} />)}
    </ul>
  )
}

function TreeItem({ node, depth }: { node: TreeNode; depth: number }) {
  const [open, setOpen] = React.useState(true)
  const hasKids = !!node.children?.length
  return (
    <li role="treeitem" aria-expanded={hasKids ? open : undefined} className="select-none">
      <button
        type="button"
        className="flex w-full items-center gap-1 rounded-lg px-2 py-1.5 text-left outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent"
        style={{ paddingLeft: 8 + depth * 12 }}
        onClick={() => hasKids && setOpen((v) => !v)}
      >
        <ChevronRightIcon className={cn("size-3.5 text-fg-muted transition-transform duration-[140ms]", open && hasKids && "rotate-90", !hasKids && "opacity-0")} />
        {node.label}
      </button>
      {hasKids && open ? (
        <ul role="group">
          {node.children!.map((c) => <TreeItem key={c.id} node={c} depth={depth + 1} />)}
        </ul>
      ) : null}
    </li>
  )
}
export { TreeView }
export type { TreeNode, TreeViewProps }
