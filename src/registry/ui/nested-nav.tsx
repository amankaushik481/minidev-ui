"use client"
import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * NestedNav — a collapsible tree of navigation groups that indents with depth, for settings and docs sidebars.
 *
 * Groups are disclosure buttons (aria-expanded); leaves are links when they have an
 * `href`, buttons otherwise. The node matching `activeId` gets aria-current="page".
 * Use it for two or three levels of navigation; for a file-style tree with arrow-key
 * navigation and selection use TreeView.
 *
 * @example
 * <NestedNav
 *   activeId="invoices"
 *   nodes={[{ id: "billing", label: "Billing", children: [{ id: "invoices", label: "Invoices", href: "/billing/invoices" }] }]}
 * />
 */

type NavNode = {
  /** Unique id; matched against `activeId`. */
  id: string
  label: string
  /** Leaf destination. Without it the leaf is a button that calls onSelect. */
  href?: string
  /** Child nodes. Any node with children becomes a collapsible group. */
  children?: NavNode[]
}

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
  /** Id of the current page's node; it is highlighted and marked aria-current="page". */
  activeId?: string
  /** Called when a leaf is activated (link or button). */
  onSelect?: (node: NavNode) => void
  className?: string
}

type ItemCtx = { activeId?: string; onSelect?: (node: NavNode) => void }

function NestedNav({ nodes = SAMPLE_NODES, activeId, onSelect, className }: NestedNavProps) {
  return (
    <ul data-slot="nested-nav" className={cn("space-y-0.5 text-sm", className)}>
      {nodes.map((n) => (
        <NestedNavItem key={n.id} node={n} depth={0} ctx={{ activeId, onSelect }} />
      ))}
    </ul>
  )
}

const rowClass =
  "flex w-full items-center gap-1 rounded-lg px-2 py-1.5 text-left text-fg-muted outline-none transition-[background-color,color] duration-[70ms] hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent aria-[current=page]:bg-sunken aria-[current=page]:font-medium aria-[current=page]:text-fg"

function NestedNavItem({ node, depth, ctx }: { node: NavNode; depth: number; ctx: ItemCtx }) {
  const [open, setOpen] = React.useState(true)
  const has = !!node.children?.length
  const current = ctx.activeId === node.id ? "page" : undefined
  const indent = { paddingLeft: 8 + depth * 12 }
  const body = (
    <>
      {has ? (
        <ChevronRightIcon aria-hidden className={cn("size-3.5 shrink-0 transition-transform duration-[140ms] ease-hairline", open && "rotate-90")} />
      ) : (
        <span aria-hidden className="size-3.5 shrink-0" />
      )}
      <span className="min-w-0 truncate">{node.label}</span>
    </>
  )
  return (
    <li>
      {!has && node.href ? (
        <a href={node.href} aria-current={current} className={rowClass} style={indent} onClick={() => ctx.onSelect?.(node)}>
          {body}
        </a>
      ) : (
        <button
          type="button"
          aria-expanded={has ? open : undefined}
          aria-current={current}
          className={rowClass}
          style={indent}
          onClick={() => (has ? setOpen((v) => !v) : ctx.onSelect?.(node))}
        >
          {body}
        </button>
      )}
      {has && open ? (
        <ul>
          {node.children!.map((c) => (
            <NestedNavItem key={c.id} node={c} depth={depth + 1} ctx={ctx} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}
export { NestedNav }
export type { NavNode, NestedNavProps }
