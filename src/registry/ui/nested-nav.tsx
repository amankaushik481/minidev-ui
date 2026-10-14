"use client"
import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/** NestedNav — a collapsible tree of navigation groups that indents with depth. */

type NavNode = { id: string; label: string; children?: NavNode[] }

// The Lumen settings tree.
const SAMPLE_NODES: NavNode[] = [
  {
    id: "workspace",
    label: "Workspace",
    children: [
      { id: "general", label: "General" },
      { id: "members", label: "Members" },
      {
        id: "billing",
        label: "Billing",
        children: [
          { id: "plans", label: "Plans" },
          { id: "invoices", label: "Invoices" },
          { id: "payment-methods", label: "Payment methods" },
        ],
      },
    ],
  },
  {
    id: "developers",
    label: "Developers",
    children: [
      { id: "api-keys", label: "API keys" },
      { id: "webhooks", label: "Webhooks" },
    ],
  },
  { id: "audit-log", label: "Audit log" },
]

type NestedNavProps = {
  /** Tree of nodes; any node with children becomes a collapsible group. */
  nodes?: NavNode[]
  className?: string
}

function NestedNav({ nodes = SAMPLE_NODES, className }: NestedNavProps) {
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
        aria-expanded={has ? open : undefined}
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
export type { NavNode, NestedNavProps }
