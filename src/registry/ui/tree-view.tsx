"use client"
import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A keyboard-navigable tree of nested nodes, all open by default, for file browsers, folders and org charts.
 *
 * Follows the WAI-ARIA tree pattern: one tab stop, Up/Down move, Right opens or enters a branch, Left closes or goes to the parent, Home/End jump, Enter/Space selects (and toggles a branch). Use `FileTree` for files with icons and status, and `NestedNav` for sidebar navigation links.
 *
 * @example
 * <TreeView nodes={[{ id: "src", label: "src", children: [{ id: "app", label: "app.tsx" }] }]} onSelect={(node) => open(node.id)} aria-label="Project files" />
 */
type TreeNode = {
  /** Unique across the whole tree. */
  id: string
  label: string
  /** Child nodes. A node with children is a branch that can open and close. */
  children?: TreeNode[]
}

type TreeViewProps = {
  /** Root nodes. Defaults to the Lumen web app's source tree. */
  nodes?: TreeNode[]
  /** Branch ids open at first render. Omit to open every branch. */
  defaultExpanded?: string[]
  /** Controlled selected node id. */
  selectedId?: string
  /** Called when a node is clicked or chosen with Enter or Space. */
  onSelect?: (node: TreeNode) => void
  /** Accessible name for the tree. */
  "aria-label"?: string
  className?: string
}

type Row = { node: TreeNode; level: number; parentId: string | null; pos: number; size: number }

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

function branchIds(nodes: TreeNode[], out: string[] = []) {
  for (const n of nodes) {
    if (!n.children?.length) continue
    out.push(n.id)
    branchIds(n.children, out)
  }
  return out
}

function TreeView({ nodes = SAMPLE_NODES, defaultExpanded, selectedId, onSelect, "aria-label": ariaLabel = "Tree", className }: TreeViewProps) {
  // Track closed branches so nodes added later start open, like the defaults.
  const [closed, setClosed] = React.useState<Set<string>>(() => {
    if (!defaultExpanded) return new Set()
    const open = new Set(defaultExpanded)
    return new Set(branchIds(nodes).filter((id) => !open.has(id)))
  })
  const [innerSelected, setInnerSelected] = React.useState<string>()
  const selected = selectedId ?? innerSelected
  const [focusId, setFocusId] = React.useState<string>()
  const refs = React.useRef(new Map<string, HTMLLIElement>())

  const rows = React.useMemo(() => {
    const out: Row[] = []
    const walk = (list: TreeNode[], level: number, parentId: string | null) =>
      list.forEach((node, i) => {
        out.push({ node, level, parentId, pos: i + 1, size: list.length })
        if (node.children?.length && !closed.has(node.id)) walk(node.children, level + 1, node.id)
      })
    walk(nodes, 1, null)
    return out
  }, [nodes, closed])

  // The one tab stop: the focused row if still visible, else the selected one, else the first.
  const tabId = [focusId, selected].find((id) => id && rows.some((r) => r.node.id === id)) ?? rows[0]?.node.id

  const focus = (id: string | null | undefined) => {
    if (!id) return
    setFocusId(id)
    refs.current.get(id)?.focus()
  }
  const setOpen = (id: string, open: boolean) =>
    setClosed((prev) => {
      const next = new Set(prev)
      if (open) next.delete(id)
      else next.add(id)
      return next
    })
  const choose = (row: Row) => {
    if (row.node.children?.length) setOpen(row.node.id, closed.has(row.node.id))
    if (selectedId === undefined) setInnerSelected(row.node.id)
    onSelect?.(row.node)
  }

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const row = rows[i]
    const branch = !!row.node.children?.length
    const open = branch && !closed.has(row.node.id)
    const keys: Record<string, () => void> = {
      ArrowDown: () => focus(rows[i + 1]?.node.id),
      ArrowUp: () => focus(rows[i - 1]?.node.id),
      ArrowRight: () => (branch ? (open ? focus(rows[i + 1]?.node.id) : setOpen(row.node.id, true)) : undefined),
      ArrowLeft: () => (open ? setOpen(row.node.id, false) : focus(row.parentId)),
      Home: () => focus(rows[0]?.node.id),
      End: () => focus(rows[rows.length - 1]?.node.id),
      Enter: () => choose(row),
      " ": () => choose(row),
    }
    const run = keys[e.key]
    if (!run) return
    e.preventDefault()
    run()
  }

  return (
    <ul data-slot="tree-view" role="tree" aria-label={ariaLabel} className={cn("w-full max-w-xs text-sm", className)}>
      {rows.map((row, i) => {
        const { node, level } = row
        const branch = !!node.children?.length
        const open = branch && !closed.has(node.id)
        return (
          <li
            key={node.id}
            ref={(el) => {
              if (el) refs.current.set(node.id, el)
              else refs.current.delete(node.id)
            }}
            role="treeitem"
            aria-level={level}
            aria-setsize={row.size}
            aria-posinset={row.pos}
            aria-expanded={branch ? open : undefined}
            aria-selected={selected === node.id}
            tabIndex={node.id === tabId ? 0 : -1}
            onFocus={() => setFocusId(node.id)}
            onClick={() => {
              focus(node.id)
              choose(row)
            }}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "flex cursor-default items-center gap-1 rounded-lg py-1.5 pr-2 text-fg outline-none select-none",
              "transition-colors duration-[70ms] hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent",
              "aria-selected:bg-sunken aria-selected:font-medium"
            )}
            style={{ paddingLeft: 8 + (level - 1) * 12 }}
          >
            <ChevronRightIcon aria-hidden className={cn("size-3.5 shrink-0 text-fg-muted transition-transform duration-[140ms] ease-hairline", open && "rotate-90", !branch && "opacity-0")} />
            <span className="truncate">{node.label}</span>
          </li>
        )
      })}
    </ul>
  )
}
export { TreeView }
export type { TreeNode, TreeViewProps }
