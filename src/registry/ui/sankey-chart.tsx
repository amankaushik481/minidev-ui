"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** An SVG sankey diagram that lays nodes out in columns computed from the links, draws curved ribbons, labels nodes with values, highlights a node's flows on hover or focus, and includes a hidden table. */
type SankeyLink = { source: string; target: string; value: number }

type SankeyNodeInput = {
  id: string
  /** Shown instead of the id. */
  label?: string
  /** Any CSS colour. Defaults to the chart tokens in order within the column. */
  color?: string
}

type SankeyChartProps = {
  /** Flows between node ids. Columns are computed from these. */
  links?: SankeyLink[]
  /** Optional node order, labels and colours. Unknown ids found in links are added automatically. */
  nodes?: SankeyNodeInput[]
  /** "left" puts each node one column after its furthest source; "justify" also pushes nodes with no outgoing links to the last column. */
  align?: "left" | "justify"
  title?: string
  caption?: string
  /** Chart height in px. The width follows the container. */
  height?: number
  nodeWidth?: number
  /** Vertical gap between nodes in a column, in px. */
  nodePadding?: number
  /** Formats values in labels, the tooltip text and the table. */
  format?: (value: number) => string
  /** Unit word for accessible labels, e.g. "visitors". */
  unit?: string
  className?: string
}

type Node = {
  id: string
  label: string
  color: string
  layer: number
  value: number
  x: number
  y: number
  h: number
  cy: number
  inLinks: Edge[]
  outLinks: Edge[]
}
type Edge = { i: number; source: Node; target: Node; value: number; sy: number; ty: number; w: number }

const SAMPLE_LINKS: SankeyLink[] = [
  { source: "Organic search", target: "Signed up", value: 1400 },
  { source: "Organic search", target: "Left", value: 800 },
  { source: "Paid social", target: "Signed up", value: 720 },
  { source: "Paid social", target: "Left", value: 680 },
  { source: "Referrals", target: "Signed up", value: 610 },
  { source: "Referrals", target: "Left", value: 290 },
  { source: "Newsletter", target: "Signed up", value: 400 },
  { source: "Newsletter", target: "Left", value: 200 },
  { source: "Direct", target: "Signed up", value: 350 },
  { source: "Direct", target: "Left", value: 350 },
  { source: "Signed up", target: "Starter", value: 1640 },
  { source: "Signed up", target: "Growth", value: 980 },
  { source: "Signed up", target: "Scale", value: 310 },
  { source: "Signed up", target: "Stayed free", value: 550 },
]

const SAMPLE_NODES: SankeyNodeInput[] = [
  { id: "Signed up", color: "var(--chart-4)" },
  { id: "Left", color: "var(--chart-5)" },
  { id: "Starter", color: "var(--chart-1)" },
  { id: "Growth", color: "var(--chart-2)" },
  { id: "Scale", color: "var(--chart-3)" },
  { id: "Stayed free", color: "var(--chart-5)" },
]

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]
const PAD_Y = 10
const PAD_X = 8
const defaultFormat = (n: number) => n.toLocaleString("en-US")

const FONT = 11
const est = (text: string) => text.length * FONT * 0.58 + 2
const fit = (text: string, max: number) => {
  const chars = Math.floor((max - 2) / (FONT * 0.58))
  return text.length <= chars ? text : text.slice(0, Math.max(1, chars - 1)).trimEnd() + "…"
}
const twoLine = (n: Node) => n.h >= 28

function layout(
  linksIn: SankeyLink[],
  nodesIn: SankeyNodeInput[],
  width: number,
  height: number,
  nodeWidth: number,
  nodePadding: number,
  align: "left" | "justify",
  format: (n: number) => string
) {
  const nodes = new Map<string, Node>()
  const add = (id: string) => {
    let n = nodes.get(id)
    if (!n) {
      n = { id, label: id, color: "", layer: 0, value: 0, x: 0, y: 0, h: 0, cy: 0, inLinks: [], outLinks: [] }
      nodes.set(id, n)
    }
    return n
  }
  for (const n of nodesIn) {
    const node = add(n.id)
    if (n.label) node.label = n.label
    if (n.color) node.color = n.color
  }
  const edges: Edge[] = []
  linksIn.forEach((l, i) => {
    if (l.source === l.target || !(l.value > 0)) return
    const e: Edge = { i, source: add(l.source), target: add(l.target), value: l.value, sy: 0, ty: 0, w: 0 }
    e.source.outLinks.push(e)
    e.target.inLinks.push(e)
    edges.push(e)
  })
  const list = [...nodes.values()]
  for (const n of list) {
    n.value = Math.max(n.inLinks.reduce((s, e) => s + e.value, 0), n.outLinks.reduce((s, e) => s + e.value, 0))
  }

  // Layers: longest path from a source (Kahn). Nodes left over by a cycle go after their placed sources.
  const indeg = new Map(list.map((n) => [n, n.inLinks.length]))
  const queue = list.filter((n) => n.inLinks.length === 0)
  const seen = new Set<Node>()
  while (queue.length) {
    const n = queue.shift()!
    seen.add(n)
    for (const e of n.outLinks) {
      e.target.layer = Math.max(e.target.layer, n.layer + 1)
      indeg.set(e.target, (indeg.get(e.target) ?? 1) - 1)
      if (indeg.get(e.target) === 0) queue.push(e.target)
    }
  }
  for (const n of list) if (!seen.has(n)) n.layer = Math.max(0, ...n.inLinks.filter((e) => seen.has(e.source)).map((e) => e.source.layer + 1))
  const layers = Math.max(0, ...list.map((n) => n.layer)) + 1
  if (align === "justify") for (const n of list) if (!n.outLinks.length && n.inLinks.length) n.layer = layers - 1

  const columns: Node[][] = Array.from({ length: layers }, () => [])
  for (const n of list) columns[n.layer].push(n)
  columns.forEach((col) => col.forEach((n, i) => { if (!n.color) n.color = COLORS[i % COLORS.length] }))

  const innerH = Math.max(1, height - PAD_Y * 2)
  const k = Math.min(...columns.map((col) => (innerH - nodePadding * (col.length - 1)) / Math.max(1, col.reduce((s, n) => s + n.value, 0))))
  for (const n of list) n.h = Math.max(1, n.value * k)

  // Heights do not depend on the width, so the outside label widths are known before the columns are placed.
  // First column labels sit left of their nodes and last column labels right of theirs, each capped to 30% of the width.
  const labelW = (n: Node) => (twoLine(n) ? Math.max(est(n.label), est(format(n.value))) : est(`${n.label} ${format(n.value)}`))
  const maxLabel = Math.max(40, Math.floor((width - PAD_X * 2) * 0.3))
  const side = (col: Node[]) => Math.min(maxLabel, Math.max(0, ...col.map(labelW))) + 6
  const left = layers > 1 ? side(columns[0]) : 0
  const right = side(columns[layers - 1])
  const innerW = Math.max(nodeWidth + 1, width - PAD_X * 2 - left - right)
  for (const n of list) {
    n.x = PAD_X + left + (layers > 1 ? (n.layer * (innerW - nodeWidth)) / (layers - 1) : (innerW - nodeWidth) / 2)
  }
  const gap = layers > 1 ? (innerW - nodeWidth) / (layers - 1) - nodeWidth - 12 : innerW
  const place = (col: Node[]) => {
    const used = col.reduce((s, n) => s + n.h, 0) + nodePadding * (col.length - 1)
    let y = PAD_Y + Math.max(0, (innerH - used) / 2)
    for (const n of col) {
      n.y = y
      n.cy = y + n.h / 2
      y += n.h + nodePadding
    }
  }
  columns.forEach(place)
  // The first column keeps the given order; each later column follows the weighted centre of its sources.
  const center = (n: Node) => {
    if (!n.inLinks.length) return n.cy
    const w = n.inLinks.reduce((s, e) => s + e.value, 0)
    return n.inLinks.reduce((s, e) => s + e.source.cy * e.value, 0) / w
  }
  for (let pass = 0; pass < 2; pass++) {
    for (let l = 1; l < layers; l++) {
      const col = columns[l]
      const want = new Map(col.map((n) => [n, center(n)]))
      col.sort((a, b) => want.get(a)! - want.get(b)!)
      place(col)
    }
  }
  // Ribbon offsets along each node edge, sorted so ribbons do not cross at the node.
  for (const n of list) {
    let acc = n.y
    for (const e of [...n.outLinks].sort((a, b) => a.target.cy - b.target.cy)) {
      e.w = e.value * k
      e.sy = acc + e.w / 2
      acc += e.w
    }
    acc = n.y
    for (const e of [...n.inLinks].sort((a, b) => a.source.cy - b.source.cy)) {
      e.ty = acc + e.w / 2
      acc += e.w
    }
  }
  const ordered = columns.flat()
  return { nodes: ordered, edges, layers, maxLabel, gap: Math.max(24, gap) }
}

/**
 * A sankey diagram. Columns come from the links themselves, ribbons curve
 * between nodes with a gradient from source to target, and hovering or
 * focusing a node lights its flows while the rest fall back. Nodes are
 * keyboard focusable with a spoken summary; a hidden table carries the data.
 */
function SankeyChart({
  links = SAMPLE_LINKS,
  nodes: nodesProp = SAMPLE_NODES,
  align = "left",
  title = "Where signups come from",
  caption = "Last 30 days, visitors to paid plan",
  height = 320,
  nodeWidth = 10,
  nodePadding = 14,
  format = defaultFormat,
  unit = "visitors",
  className,
}: SankeyChartProps) {
  const boxRef = React.useRef<HTMLDivElement>(null)
  const refs = React.useRef<(SVGGElement | null)[]>([])
  const [width, setWidth] = React.useState(640)
  const [active, setActive] = React.useState<string | null>(null)
  const [focusIdx, setFocusIdx] = React.useState(0)
  const uid = React.useId().replace(/:/g, "")
  const titleId = React.useId()

  React.useEffect(() => {
    const el = boxRef.current
    if (!el || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(160, Math.round(e.contentRect.width))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { nodes, edges, layers, maxLabel, gap } = React.useMemo(
    () => layout(links, nodesProp, width, height, nodeWidth, nodePadding, align, format),
    [links, nodesProp, width, height, nodeWidth, nodePadding, align, format]
  )

  const touches = (e: Edge) => active != null && (e.source.id === active || e.target.id === active)
  const near = (n: Node) => active == null || n.id === active || n.inLinks.some((e) => e.source.id === active) || n.outLinks.some((e) => e.target.id === active)

  const describe = (n: Node) => {
    const from = n.inLinks.map((e) => `${e.source.label} ${format(e.value)}`).join(", ")
    const to = n.outLinks.map((e) => `${e.target.label} ${format(e.value)}`).join(", ")
    return `${n.label}: ${format(n.value)} ${unit}.${from ? ` From ${from}.` : ""}${to ? ` To ${to}.` : ""}`
  }

  const move = (to: number) => {
    if (!nodes.length) return
    const n = (to + nodes.length) % nodes.length
    setFocusIdx(n)
    refs.current[n]?.focus()
  }

  const total = nodes.filter((n) => !n.inLinks.length).reduce((s, n) => s + n.value, 0)

  return (
    <figure
      data-slot="sankey-chart"
      aria-labelledby={titleId}
      className={cn("w-full max-w-2xl rounded-xl border border-border bg-surface p-5 shadow-raised", className)}
    >
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p id={titleId} className="text-[0.8125rem] font-medium text-fg">
          {title}
        </p>
        <p className="text-xs text-fg-muted">
          <span className="font-medium text-fg tabular-nums">{format(total)}</span> {unit}
          {caption ? <span> · {caption}</span> : null}
        </p>
      </figcaption>

      <div ref={boxRef} className="mt-4 w-full" style={{ height }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height={height}
          preserveAspectRatio="none"
          role="group"
          aria-label={`${title}, ${nodes.length} nodes and ${edges.length} flows`}
          className="block overflow-visible"
          onPointerLeave={() => setActive(null)}
        >
          <defs>
            {edges.map((e) => (
              <linearGradient key={e.i} id={`${uid}-${e.i}`} gradientUnits="userSpaceOnUse" x1={e.source.x + nodeWidth} x2={e.target.x} y1="0" y2="0">
                <stop offset="0%" stopColor={e.source.color} />
                <stop offset="100%" stopColor={e.target.color} />
              </linearGradient>
            ))}
          </defs>
          <g fill="none" aria-hidden>
            {edges.map((e) => {
              const x0 = e.source.x + nodeWidth
              const x1 = e.target.x
              const mx = (x0 + x1) / 2
              const on = touches(e)
              return (
                <path
                  key={e.i}
                  d={`M${x0},${e.sy}C${mx},${e.sy} ${mx},${e.ty} ${x1},${e.ty}`}
                  stroke={`url(#${uid}-${e.i})`}
                  strokeWidth={Math.max(1, e.w)}
                  className="transition-opacity duration-[140ms] ease-hairline"
                  style={{ opacity: active == null ? 0.32 : on ? 0.78 : 0.06 }}
                />
              )
            })}
          </g>
          {nodes.map((n, i) => {
            // First column: label left of the node. Everything else: right of the node (over the ribbons, with a halo).
            const right = !(layers > 1 && n.layer === 0)
            const two = twoLine(n)
            const tx = right ? n.x + nodeWidth + 6 : n.x - 6
            const room = n.layer === 0 || n.layer === layers - 1 ? maxLabel : gap
            const name = fit(n.label, two ? room : room - est(format(n.value)) - 5)
            // Middle columns lose their text when fewer than five characters fit; the node keeps its spoken label.
            const show = room >= est("MMMMM")
            const halo = { paintOrder: "stroke" as const, stroke: "var(--surface)", strokeWidth: 3, strokeLinejoin: "round" as const }
            return (
              <g
                key={n.id}
                ref={(el) => {
                  refs.current[i] = el
                }}
                role="img"
                aria-label={describe(n)}
                tabIndex={i === focusIdx ? 0 : -1}
                className="cursor-pointer outline-none transition-opacity duration-[140ms] ease-hairline"
                style={{ opacity: near(n) ? 1 : 0.35 }}
                onPointerEnter={() => setActive(n.id)}
                onFocus={() => {
                  setFocusIdx(i)
                  setActive(n.id)
                }}
                onBlur={() => setActive(null)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); move(i + 1) }
                  if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); move(i - 1) }
                  if (e.key === "Home") { e.preventDefault(); move(0) }
                  if (e.key === "End") { e.preventDefault(); move(nodes.length - 1) }
                }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={nodeWidth}
                  height={n.h}
                  rx={2}
                  fill={n.color}
                  stroke={active === n.id ? "var(--fg)" : "none"}
                  strokeWidth={1.5}
                />
                {show ? (
                  <text x={tx} y={two ? n.cy - 2 : n.cy + 4} textAnchor={right ? "start" : "end"} className="fill-fg" style={{ fontSize: FONT, fontWeight: 500, ...halo }}>
                    {name}
                    {!two ? (
                      <tspan className="fill-fg-muted tabular-nums" style={{ fontWeight: 400 }} dx={5}>
                        {format(n.value)}
                      </tspan>
                    ) : null}
                  </text>
                ) : null}
                {show && two ? (
                  <text x={tx} y={n.cy + 11} textAnchor={right ? "start" : "end"} className="fill-fg-muted tabular-nums" style={{ fontSize: FONT, ...halo }}>
                    {format(n.value)}
                  </text>
                ) : null}
              </g>
            )
          })}
        </svg>
      </div>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {edges.map((e) => (
            <tr key={e.i}>
              <th scope="row">{e.source.label}</th>
              <td>{e.target.label}</td>
              <td>{format(e.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}

export { SankeyChart }
export type { SankeyChartProps, SankeyLink, SankeyNodeInput }
