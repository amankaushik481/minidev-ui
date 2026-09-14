"use client"
import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
type NavNode = { id: string; label: string; children?: NavNode[] }
function NestedNav({ nodes, className }: { nodes: NavNode[]; className?: string }) {
  return (
    <ul data-slot="nested-nav" className={cn("space-y-0.5 text-sm", className)}>
      {nodes.map((n) => (
        <NestedNavItem key={n.id} node={n} depth={0} />
      ))}
    </ul>
  )
}
function NestedNavItem({ node, depth }: { node: NavNode; depth: number }) {
  const [open, setOpen] = React.useState(true)
  const has = !!node.children?.length
  return (
    <li>
      <button
        type="button"
        className="flex w-full items-center gap-1 rounded-lg px-2 py-1.5 text-left text-fg-muted hover:bg-sunken hover:text-fg"
        style={{ paddingLeft: 8 + depth * 12 }}
        onClick={() => has && setOpen((v) => !v)}
      >
        {has ? (
          <ChevronRightIcon className={cn("size-3.5 transition-transform duration-[140ms]", open && "rotate-90")} />
        ) : (
          <span className="size-3.5" />
        )}
        {node.label}
      </button>
      {has && open ? (
        <ul>
          {node.children!.map((c) => (
            <NestedNavItem key={c.id} node={c} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}
export { NestedNav }
export type { NavNode }
