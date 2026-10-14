"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** A squarified SVG treemap with one level of grouping, labels that hide in small cells, hover and keyboard focus with a value tooltip, and a hidden data table. */
type TreemapLeaf = {
  label: string
  value: number
  /** Any CSS colour. Defaults to the group's chart token. */
  color?: string
}

type TreemapGroup = {
  label: string
  /** Any CSS colour. Defaults to the chart tokens in order. */
  color?: string
  children: TreemapLeaf[]
}

type TreemapNode = TreemapLeaf | TreemapGroup

type TreemapChartProps = {
  /** Top level items. A node with `children` renders as a group with a header strip. */
  data?: TreemapNode[]
  /** Heading above the chart and the accessible name. */
  title?: string
  /** Shown next to the total. */
  caption?: string
  /** Chart height in px. The width follows the container. */
  height?: number
  /** Formats values in the tooltip, labels and table. */
  format?: (value: number) => string
  /** Hide labels in cells narrower or shorter than this, in px. */
  minLabelSize?: number
  className?: string
}

type Rect = { x: number; y: number; w: number; h: number }
type Cell = { key: string; label: string; group: string | null; value: number; color: string; strength: number; rect: Rect; share: number; groupShare: number }
type GroupBox = { label: string; value: number; color: string; rect: Rect; header: number }

const SAMPLE: TreemapNode[] = [
  {
    label: "Payments",
    children: [
      { label: "Enterprise", value: 48200 },
      { label: "Scale", value: 31600 },
      { label: "Growth", value: 22400 },
      { label: "Starter", value: 9800 },
    ],
  },
  {
    label: "Invoicing",
    children: [
      { label: "Enterprise", value: 26400 },
      { label: "Scale", value: 18900 },
      { label: "Growth", value: 14200 },
      { label: "Starter", value: 6100 },
    ],
  },
  {
    label: "Banking",
    children: [
      { label: "Scale", value: 12600 },
      { label: "Growth", value: 9400 },
      { label: "Enterprise", value: 8100 },
    ],
  },
  {
    label: "Expenses",
    children: [
      { label: "Growth", value: 7300 },
      { label: "Scale", value: 5200 },
      { label: "Starter", value: 2400 },
    ],
  },
  { label: "Add-ons", value: 4100 },
]

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]
const STRENGTH = [74, 60, 48, 38, 30, 24, 20]
const HEADER = 22
const PAD = 3
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 })
const defaultFormat = (n: number) => usd.format(n)

const isGroup = (n: TreemapNode): n is TreemapGroup => Array.isArray((n as TreemapGroup).children)
const nodeValue = (n: TreemapNode) => (isGroup(n) ? n.children.reduce((s, c) => s + Math.max(0, c.value), 0) : Math.max(0, n.value))

/** Squarified treemap (Bruls, Huizing, van Wijk): rows along the shorter side, keeping cells close to square. */
function squarify(values: number[], rect: Rect): Rect[] {
  const out: Rect[] = values.map(() => ({ x: rect.x, y: rect.y, w: 0, h: 0 }))
  const total = values.reduce((s, v) => s + Math.max(0, v), 0)
  if (total <= 0 || rect.w <= 0 || rect.h <= 0) return out
  const scale = (rect.w * rect.h) / total
  const items = values
    .map((v, i) => ({ a: Math.max(0, v) * scale, i }))
    .filter((it) => it.a > 0)
    .sort((p, q) => q.a - p.a)
  let { x, y, w, h } = rect
  let row: typeof items = []
  const worst = (r: typeof items, len: number) => {
    let s = 0
    let mx = 0
    let mn = Infinity
    for (const it of r) {
      s += it.a
      mx = Math.max(mx, it.a)
      mn = Math.min(mn, it.a)
    }
    return Math.max((len * len * mx) / (s * s), (s * s) / (len * len * mn))
  }
  const layout = (r: typeof items) => {
    const s = r.reduce((a, it) => a + it.a, 0)
    if (w >= h) {
      const cw = Math.min(w, s / h)
      let cy = y
      for (const it of r) {
        const ch = it.a / cw
        out[it.i] = { x, y: cy, w: cw, h: ch }
        cy += ch
      }
      x += cw
      w -= cw
    } else {
      const ch = Math.min(h, s / w)
      let cx = x
      for (const it of r) {
        const cw = it.a / ch
        out[it.i] = { x: cx, y, w: cw, h: ch }
        cx += cw
      }
      y += ch
      h -= ch
    }
  }
  for (const it of items) {
    const len = Math.min(w, h)
    if (!row.length || len <= 0 || worst([...row, it], len) <= worst(row, len)) row.push(it)
    else {
      layout(row)
      row = [it]
    }
  }
  if (row.length) layout(row)
  return out
}

function fit(text: string, width: number, px: number) {
  const max = Math.floor(width / (px * 0.56))
  if (max < 2) return ""
  return text.length <= max ? text : text.slice(0, Math.max(1, max - 1)).trimEnd() + "…"
}

/**
 * A squarified treemap. Groups get a header strip and their cells share one
 * hue at falling strengths, labels appear only where they fit, and hovering
 * or focusing a cell lifts it and shows its value and share in a tooltip.
 * Cells are keyboard focusable with arrow keys; a hidden table carries the data.
 */
function TreemapChart({
  data = SAMPLE,
  title = "Revenue by product line",
  caption = "October, by plan",
  height = 320,
  format = defaultFormat,
  minLabelSize = 44,
  className,
}: TreemapChartProps) {
  const boxRef = React.useRef<HTMLDivElement>(null)
  const refs = React.useRef<(SVGRectElement | null)[]>([])
  const [width, setWidth] = React.useState(640)
  const [active, setActive] = React.useState<number | null>(null)
  const [focusIdx, setFocusIdx] = React.useState(0)
  const titleId = React.useId()

  React.useEffect(() => {
    const el = boxRef.current
    if (!el || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(120, Math.round(e.contentRect.width))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const total = data.reduce((s, n) => s + nodeValue(n), 0)

  const { cells, groups } = React.useMemo(() => {
    const cells: Cell[] = []
    const groups: GroupBox[] = []
    const top = squarify(data.map(nodeValue), { x: 0, y: 0, w: width, h: height })
    data.forEach((n, gi) => {
      const rect = top[gi]
      const color = n.color ?? COLORS[gi % COLORS.length]
      const value = nodeValue(n)
      if (!isGroup(n)) {
        cells.push({ key: n.label, label: n.label, group: null, value, color, strength: STRENGTH[0], rect, share: total ? value / total : 0, groupShare: 1 })
        return
      }
      const header = rect.h >= HEADER * 2 && rect.w >= 40 ? HEADER : 0
      groups.push({ label: n.label, value, color, rect, header })
      const inner = { x: rect.x + PAD, y: rect.y + header + PAD, w: Math.max(0, rect.w - PAD * 2), h: Math.max(0, rect.h - header - PAD * 2) }
      const order = n.children.map((c, i) => ({ c, i })).sort((a, b) => b.c.value - a.c.value)
      const rank = new Map(order.map((o, r) => [o.i, r]))
      const kids = squarify(n.children.map((c) => Math.max(0, c.value)), inner)
      n.children.forEach((c, ci) => {
        const v = Math.max(0, c.value)
        cells.push({
          key: `${n.label}/${c.label}`,
          label: c.label,
          group: n.label,
          value: v,
          color: c.color ?? color,
          strength: STRENGTH[Math.min(STRENGTH.length - 1, rank.get(ci) ?? 0)],
          rect: kids[ci],
          share: total ? v / total : 0,
          groupShare: value ? v / value : 0,
        })
      })
    })
    return { cells, groups }
  }, [data, width, height, total])

  const move = (to: number) => {
    if (!cells.length) return
    const n = (to + cells.length) % cells.length
    setFocusIdx(n)
    refs.current[n]?.focus()
  }

  const pct = (n: number) => `${(n * 100).toFixed(n < 0.1 ? 1 : 0)}%`
  const cur = active != null ? cells[active] : null
  const tipLeft = cur ? Math.max(84, Math.min(width - 84, cur.rect.x + cur.rect.w / 2)) : 0
  // Above the cell when there is room, otherwise just inside its top edge.
  const tipAbove = cur ? cur.rect.y >= 100 : true
  const tipTop = cur ? (tipAbove ? cur.rect.y - 6 : cur.rect.y + 10) : 0

  return (
    <figure
      data-slot="treemap-chart"
      aria-labelledby={titleId}
      className={cn("w-full max-w-2xl rounded-xl border border-border bg-surface p-5 shadow-raised", className)}
    >
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p id={titleId} className="text-[0.8125rem] font-medium text-fg">
          {title}
        </p>
        <p className="text-xs text-fg-muted">
          <span className="font-medium text-fg tabular-nums">{format(total)}</span>
          {caption ? <span> · {caption}</span> : null}
        </p>
      </figcaption>

      <div ref={boxRef} className="relative mt-4 w-full" style={{ height }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height={height}
          preserveAspectRatio="none"
          role="group"
          aria-label={`${title}, ${cells.length} cells`}
          className="block overflow-visible"
          onPointerLeave={() => setActive(null)}
        >
          {groups.map((g) => (
            <g key={g.label} aria-hidden>
              <rect
                x={g.rect.x}
                y={g.rect.y}
                width={Math.max(0, g.rect.w)}
                height={Math.max(0, g.rect.h)}
                rx={6}
                stroke="var(--surface)"
                strokeWidth={2}
                style={{ fill: `color-mix(in oklch, ${g.color} 10%, var(--surface))` }}
              />
              {g.header ? (
                <text x={g.rect.x + 8} y={g.rect.y + 15} className="fill-fg" style={{ fontSize: 11, fontWeight: 500 }}>
                  {fit(g.label, g.rect.w - 16, 11)}
                  {g.rect.w >= 150 ? (
                    <tspan className="fill-fg-muted" style={{ fontWeight: 400 }} dx={6}>
                      {format(g.value)}
                    </tspan>
                  ) : null}
                </text>
              ) : null}
            </g>
          ))}
          {cells.map((c, i) => {
            const on = active === i
            const dim = active != null && !on
            const { x, y, w, h } = c.rect
            if (w <= 0 || h <= 0) return null
            const showLabel = w >= minLabelSize && h >= 26
            const showValue = showLabel && h >= 44
            return (
              <g key={c.key} className="transition-opacity duration-[140ms] ease-hairline" style={{ opacity: dim ? 0.55 : 1 }}>
                <rect
                  ref={(el) => {
                    refs.current[i] = el
                  }}
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx={4}
                  role="img"
                  aria-label={`${c.group ? `${c.group}, ` : ""}${c.label}: ${format(c.value)}, ${pct(c.share)} of total`}
                  tabIndex={i === focusIdx ? 0 : -1}
                  stroke={on ? "var(--fg)" : "var(--surface)"}
                  strokeWidth={on ? 1.5 : 2}
                  style={{ fill: `color-mix(in oklch, ${c.color} ${c.strength}%, var(--surface))` }}
                  className="cursor-pointer outline-none"
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => {
                    setFocusIdx(i)
                    setActive(i)
                  }}
                  onBlur={() => setActive(null)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); move(i + 1) }
                    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); move(i - 1) }
                    if (e.key === "Home") { e.preventDefault(); move(0) }
                    if (e.key === "End") { e.preventDefault(); move(cells.length - 1) }
                  }}
                />
                {showLabel ? (
                  <text x={x + 7} y={y + 16} className="pointer-events-none fill-fg" style={{ fontSize: 11, fontWeight: 500 }} aria-hidden>
                    {fit(c.label, w - 14, 11)}
                  </text>
                ) : null}
                {showValue ? (
                  <text x={x + 7} y={y + 31} className="pointer-events-none fill-fg-muted tabular-nums" style={{ fontSize: 11 }} aria-hidden>
                    {fit(format(c.value), w - 14, 11)}
                  </text>
                ) : null}
              </g>
            )
          })}
        </svg>

        {cur ? (
          <div
            role="status"
            data-slot="treemap-chart-tooltip"
            className={cn(
              "pointer-events-none absolute z-10 min-w-40 -translate-x-1/2 rounded-lg border border-border bg-raised p-2.5 shadow-lg",
              tipAbove ? "-translate-y-full" : ""
            )}
            style={{ left: tipLeft, top: tipTop }}
          >
            <p className="flex items-center gap-1.5 text-xs font-medium text-fg">
              <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ background: cur.color }} />
              {cur.group ? `${cur.group} · ${cur.label}` : cur.label}
            </p>
            <ul className="mt-1.5 space-y-1 text-xs">
              <li className="flex justify-between gap-4">
                <span className="text-fg-muted">Revenue</span>
                <span className="text-fg tabular-nums">{format(cur.value)}</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-fg-muted">Of total</span>
                <span className="text-fg tabular-nums">{pct(cur.share)}</span>
              </li>
              {cur.group ? (
                <li className="flex justify-between gap-4">
                  <span className="text-fg-muted">Of {cur.group}</span>
                  <span className="text-fg tabular-nums">{pct(cur.groupShare)}</span>
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}
      </div>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Group</th>
            <th scope="col">Item</th>
            <th scope="col">Value</th>
            <th scope="col">Share</th>
          </tr>
        </thead>
        <tbody>
          {cells.map((c) => (
            <tr key={c.key}>
              <td>{c.group ?? ""}</td>
              <th scope="row">{c.label}</th>
              <td>{format(c.value)}</td>
              <td>{pct(c.share)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan={2}>
              Total
            </th>
            <td>{format(total)}</td>
            <td>100%</td>
          </tr>
        </tfoot>
      </table>
    </figure>
  )
}

export { TreemapChart }
export type { TreemapChartProps, TreemapNode, TreemapLeaf, TreemapGroup }
