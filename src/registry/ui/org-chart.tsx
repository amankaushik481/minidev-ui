"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/** A collapsible organisation chart with connector lines, initials avatars, team colours, per node counts and arrow key navigation. */
type OrgTone = "accent" | "info" | "success" | "warning" | "neutral"

type OrgNode = {
  id: string
  name: string
  role: string
  /** Team name. Each team gets a colour, in order of first appearance. */
  team?: string
  /** Letters in the avatar. Derived from the name when absent. */
  initials?: string
  children?: OrgNode[]
}

type OrgChartProps = {
  /** The root person. Defaults to Northwind's leadership, four levels deep with the lower branches folded. */
  data?: OrgNode
  /** Nodes at or above this depth start expanded. The root is depth 0. */
  defaultExpandDepth?: number
  /** Extra node ids that start expanded. */
  defaultExpanded?: string[]
  /** Controlled selected node id. */
  selectedId?: string
  defaultSelectedId?: string
  /** Called when a node is clicked or activated. */
  onSelect?: (node: OrgNode) => void
  /** Pin team names to colours. Unlisted teams are coloured in order. */
  teamTones?: Partial<Record<string, OrgTone>>
  "aria-label"?: string
  className?: string
}

const SAMPLE: OrgNode = {
  id: "maya",
  name: "Maya Chen",
  role: "CEO",
  team: "Leadership",
  children: [
    {
      id: "theo",
      name: "Theo Okafor",
      role: "CTO",
      team: "Engineering",
      children: [
        {
          id: "priya",
          name: "Priya Raman",
          role: "VP Engineering",
          team: "Engineering",
          children: [
            { id: "lena", name: "Lena Fischer", role: "Head of Design", team: "Design" },
            { id: "sam", name: "Sam Lowe", role: "Staff Engineer", team: "Engineering" },
          ],
        },
      ],
    },
    {
      id: "diego",
      name: "Diego Alvarez",
      role: "CFO",
      team: "Finance",
      children: [
        { id: "noor", name: "Noor Haddad", role: "Controller", team: "Finance" },
        { id: "jonas", name: "Jonas Weber", role: "FP&A Lead", team: "Finance" },
      ],
    },
    {
      id: "aisha",
      name: "Aisha Bello",
      role: "COO",
      team: "Operations",
      children: [
        { id: "yuki", name: "Yuki Tanaka", role: "People Lead", team: "Operations" },
        { id: "marcus", name: "Marcus Reid", role: "Head of Logistics", team: "Operations" },
        { id: "ravi", name: "Ravi Mehta", role: "Head of Support", team: "Operations" },
      ],
    },
  ],
}

const TONES: OrgTone[] = ["accent", "info", "success", "warning", "neutral"]
const TONE: Record<OrgTone, { stripe: string; avatar: string }> = {
  accent: { stripe: "bg-accent", avatar: "bg-accent-soft text-accent-fg" },
  info: { stripe: "bg-info", avatar: "bg-info/12 text-info" },
  success: { stripe: "bg-success", avatar: "bg-success/12 text-success" },
  warning: { stripe: "bg-warning", avatar: "bg-warning/14 text-warning" },
  neutral: { stripe: "bg-fg-subtle", avatar: "bg-sunken text-fg-muted" },
}
const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const
const EXIT = { duration: 0.16, ease: [0.3, 0, 0.8, 0.15] } as const

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")

type Info = { node: OrgNode; parent: string | null; siblings: string[]; depth: number; descendants: number }

function index(root: OrgNode): Map<string, Info> {
  const map = new Map<string, Info>()
  const walk = (n: OrgNode, parent: string | null, siblings: string[], depth: number): number => {
    let count = 0
    const kids = n.children ?? []
    const ids = kids.map((k) => k.id)
    for (const k of kids) count += 1 + walk(k, n.id, ids, depth + 1)
    map.set(n.id, { node: n, parent, siblings, depth, descendants: count })
    return count
  }
  walk(root, null, [root.id], 0)
  return map
}

type Ctx = {
  info: Map<string, Info>
  expanded: Set<string>
  toggle: (id: string, to?: boolean) => void
  selected: string | null
  tabStop: string
  choose: (node: OrgNode) => void
  focus: (id: string | undefined) => void
  setFocused: (id: string) => void
  refs: React.MutableRefObject<Map<string, HTMLButtonElement>>
  tone: (team?: string) => OrgTone
  reduce: boolean
}
const OrgContext = React.createContext<Ctx | null>(null)

function Node({ node, root = false }: { node: OrgNode; root?: boolean }) {
  const ctx = React.useContext(OrgContext)!
  const meta = ctx.info.get(node.id)!
  const kids = node.children ?? []
  const open = kids.length > 0 && ctx.expanded.has(node.id)
  const tone = TONE[ctx.tone(node.team)]
  const selected = ctx.selected === node.id

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const sib = meta.siblings
    const i = sib.indexOf(node.id)
    const key = e.key
    if (key === "ArrowRight") ctx.focus(sib[Math.min(sib.length - 1, i + 1)])
    else if (key === "ArrowLeft") ctx.focus(sib[Math.max(0, i - 1)])
    else if (key === "Home") ctx.focus(sib[0])
    else if (key === "End") ctx.focus(sib[sib.length - 1])
    else if (key === "ArrowDown") {
      if (!kids.length) return
      if (!open) ctx.toggle(node.id, true)
      else ctx.focus(kids[0].id)
    } else if (key === "ArrowUp") {
      if (meta.parent) ctx.focus(meta.parent)
    } else if (key === "Enter" || key === " ") {
      ctx.choose(node)
      if (kids.length) ctx.toggle(node.id)
    } else return
    e.preventDefault()
  }

  return (
    <motion.li
      layout={!ctx.reduce}
      transition={ctx.reduce ? { duration: 0 } : MORPH}
      data-slot="org-chart-node"
      className={cn(
        "relative flex flex-col items-center px-1.5 pb-3",
        !root && [
          "pt-6",
          "before:absolute before:top-0 before:right-1/2 before:h-6 before:w-1/2 before:border-t before:border-border-strong before:content-['']",
          "after:absolute after:top-0 after:left-1/2 after:h-6 after:w-1/2 after:border-t after:border-l after:border-border-strong after:content-['']",
          "first:before:hidden first:after:rounded-tl-lg",
          "last:before:rounded-tr-lg last:before:border-r last:after:hidden",
          "only:before:block only:before:rounded-none only:before:border-t-0 only:before:border-r",
        ]
      )}
    >
      <div className="relative">
        <button
          ref={(el) => {
            if (el) ctx.refs.current.set(node.id, el)
            else ctx.refs.current.delete(node.id)
          }}
          type="button"
          tabIndex={ctx.tabStop === node.id ? 0 : -1}
          aria-expanded={kids.length ? open : undefined}
          aria-current={selected ? "true" : undefined}
          aria-label={`${node.name}, ${node.role}${node.team ? `, ${node.team}` : ""}${kids.length ? `, ${meta.descendants} ${meta.descendants === 1 ? "report" : "reports"}` : ""}`}
          data-selected={selected || undefined}
          onFocus={() => ctx.setFocused(node.id)}
          onClick={() => {
            ctx.choose(node)
            ctx.focus(node.id)
          }}
          onKeyDown={onKeyDown}
          data-slot="org-chart-card"
          className={cn(
            "relative flex w-40 items-center gap-2.5 overflow-hidden rounded-lg border bg-raised p-2.5 text-left shadow-raised outline-none",
            "transition-[border-color,box-shadow] duration-[140ms] ease-hairline",
            "hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            selected ? "border-accent-line shadow-[0_0_0_3px_var(--accent-soft)]" : "border-border"
          )}
        >
          <span aria-hidden className={cn("absolute inset-x-0 top-0 h-0.5", tone.stripe)} />
          <span aria-hidden className={cn("grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold tracking-[0.02em]", tone.avatar)}>
            {node.initials ?? initialsOf(node.name)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.8125rem] leading-[1.3] font-medium text-fg">{node.name}</span>
            <span className="block truncate text-[11px] leading-[1.35] text-fg-muted">{node.role}</span>
          </span>
        </button>
        {kids.length ? (
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={(e) => {
              e.stopPropagation()
              ctx.toggle(node.id)
            }}
            data-slot="org-chart-toggle"
            className={cn(
              "absolute -bottom-2.5 left-1/2 z-10 inline-flex h-5 -translate-x-1/2 items-center gap-0.5 rounded-full border border-border bg-raised pr-1 pl-1.5 font-mono text-[10px] text-fg-muted shadow-key outline-none",
              "transition-[border-color,color] duration-[70ms] ease-hairline hover:border-border-strong hover:text-fg"
            )}
          >
            <span className="tabular-nums">{meta.descendants}</span>
            <ChevronDownIcon className={cn("size-3 transition-transform duration-[140ms] ease-hairline motion-reduce:transition-none", open && "rotate-180")} />
          </button>
        ) : null}
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.ul
            key="children"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: ctx.reduce ? { duration: 0 } : MORPH }}
            exit={{ height: 0, opacity: 0, transition: ctx.reduce ? { duration: 0 } : EXIT }}
            className="relative flex items-start justify-center overflow-hidden pt-6 before:absolute before:top-0 before:left-1/2 before:h-6 before:w-px before:bg-border-strong before:content-['']"
          >
            {kids.map((k) => (
              <Node key={k.id} node={k} />
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </motion.li>
  )
}

/**
 * An org chart for people directories and admin consoles. Cards carry an
 * initials avatar, name, role and a team coloured stripe; a pill under each
 * manager shows how many people report up and folds the branch with a
 * spring. Connectors are plain CSS borders, the tree scrolls sideways when
 * it is wider than its container, and the arrow keys walk siblings, reports
 * and managers.
 */
function OrgChart({
  data = SAMPLE,
  defaultExpandDepth = 0,
  defaultExpanded = ["theo"],
  selectedId,
  defaultSelectedId,
  onSelect,
  teamTones,
  "aria-label": ariaLabel = "Organization chart",
  className,
}: OrgChartProps) {
  const reduce = useReducedMotion() ?? false
  const info = React.useMemo(() => index(data), [data])
  const [expanded, setExpanded] = React.useState(() => {
    const s = new Set(defaultExpanded)
    info.forEach((m, id) => {
      if (m.node.children?.length && m.depth <= defaultExpandDepth) s.add(id)
    })
    return s
  })
  const [innerSelected, setInnerSelected] = React.useState<string | null>(defaultSelectedId ?? null)
  const selected = selectedId ?? innerSelected
  const [focused, setFocused] = React.useState<string | null>(null)
  const refs = React.useRef(new Map<string, HTMLButtonElement>())
  const scrollRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
  }, [])

  const teams = React.useMemo(() => {
    const order: string[] = []
    info.forEach((m) => {
      if (m.node.team && !order.includes(m.node.team)) order.push(m.node.team)
    })
    return order
  }, [info])
  const tone = React.useCallback(
    (team?: string): OrgTone => {
      if (!team) return "neutral"
      return teamTones?.[team] ?? TONES[teams.indexOf(team) % TONES.length]
    },
    [teams, teamTones]
  )

  /* Only visible nodes can hold the tab stop. */
  const visible = (id: string) => {
    let p = info.get(id)?.parent ?? null
    while (p) {
      if (!expanded.has(p)) return false
      p = info.get(p)?.parent ?? null
    }
    return true
  }
  const tabStop = (focused && info.has(focused) && visible(focused) ? focused : null) ?? (selected && info.has(selected) && visible(selected) ? selected : null) ?? data.id

  const ctx = React.useMemo<Ctx>(
    () => ({
      info,
      expanded,
      selected,
      tabStop,
      refs,
      tone,
      reduce,
      setFocused,
      toggle: (id, to) => {
        const want = to ?? !expanded.has(id)
        if (!want && focused) {
          /* Collapsing a branch that holds focus: hand focus to the manager. */
          let p = info.get(focused)?.parent ?? null
          while (p) {
            if (p === id) {
              setFocused(id)
              refs.current.get(id)?.focus()
              break
            }
            p = info.get(p)?.parent ?? null
          }
        }
        setExpanded((prev) => {
          const next = new Set(prev)
          if (want) next.add(id)
          else next.delete(id)
          return next
        })
      },
      choose: (node) => {
        if (selectedId === undefined) setInnerSelected(node.id)
        onSelect?.(node)
      },
      focus: (id) => {
        if (!id) return
        setFocused(id)
        requestAnimationFrame(() => refs.current.get(id)?.focus())
      },
    }),
    [info, expanded, focused, selected, tabStop, tone, reduce, selectedId, onSelect]
  )

  return (
    <OrgContext.Provider value={ctx}>
      <div ref={scrollRef} data-slot="org-chart" className={cn("w-full max-w-4xl overflow-x-auto overscroll-x-contain rounded-xl border border-border bg-surface text-fg shadow-raised", className)}>
        <ul aria-label={ariaLabel} className="flex w-max min-w-full justify-center px-4 py-5">
          <Node node={data} root />
        </ul>
      </div>
    </OrgContext.Provider>
  )
}

export { OrgChart }
export type { OrgChartProps, OrgNode, OrgTone }
