"use client"
import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type TreeNode = { id: string; label: string; children?: TreeNode[] }

function TreeView({ nodes, className }: { nodes: TreeNode[]; className?: string }) {
  return (
    <ul data-slot="tree-view" className={cn("text-sm", className)} role="tree">
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
        className="flex w-full items-center gap-1 rounded-lg px-2 py-1.5 text-left hover:bg-sunken"
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
export type { TreeNode }
