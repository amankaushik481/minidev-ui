"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { ChartLegend } from "@/registry/ui/chart-legend"
import { ChartTooltipCard } from "@/registry/ui/chart-tooltip-card"

/**
 * ScatterChart — plots two numbers against each other in SVG; the pointer snaps to the nearest point and the arrow keys walk them.
 *
 * Use it to show how two measures relate across many items: deal size against win rate, price against
 * rating, latency against payload. Give points a `size` and it becomes a bubble chart. For one measure over
 * time use LineChart or InteractiveAreaChart; for totals by category use BarChart. No chart library: ticks are
 * rounded to 1, 2, 2.5 or 5 steps, and hovering a ChartLegend entry dims the other series.
 *
 * @example
 * <ScatterChart
 *   label="Deal size against days to close"
 *   xLabel="Deal size"
 *   yLabel="Days to close"
 *   xFormat={{ style: "currency", currency: "USD", notation: "compact" }}
 *   series={[{ name: "Inbound", points: [{ x: 12000, y: 21 }, { x: 48000, y: 64, label: "Northwind" }] }]}
 * />
 */

const DATA = { type: "spring", bounce: 0.12, duration: 0.7 } as const
const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const
const INSTANT = { duration: 0 } as const

type ChartColor = "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"
const COLORS: ChartColor[] = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]

type ScatterPoint = {
  x: number
  y: number
  /** Bubble size, any positive number. When any point has one, the chart becomes a bubble chart. */
  size?: number
  /** Name of the point, shown as the tooltip title and read by screen readers. */
  label?: string
}

type ScatterSeries = {
  /** Series name, used in the legend, tooltip and point labels. Keep it unique. */
  name: string
  /** Chart colour token. Defaults to chart-1 to chart-5 in series order. */
  color?: ChartColor
  points: ScatterPoint[]
}

type ReferenceLine = {
  /** "y" draws a horizontal line at a y value, "x" a vertical line at an x value. */
  axis: "x" | "y"
  value: number
  /** Short text drawn at the end of the line, such as "Target" or "Median". */
  label?: string
}

type Format = Intl.NumberFormatOptions | ((n: number) => string)

// Lumen accounts: annual contract value against days to close.
const SAMPLE: ScatterSeries[] = [
  {
    name: "Inbound",
    points: [
      { x: 8400, y: 14, label: "Juniper Studio" }, { x: 12600, y: 19 }, { x: 15800, y: 24 }, { x: 22400, y: 21 },
      { x: 26800, y: 33 }, { x: 31200, y: 29 }, { x: 38600, y: 41 }, { x: 44200, y: 38 }, { x: 52800, y: 47, label: "Helix Biotech" },
    ],
  },
  {
    name: "Outbound",
    points: [
      { x: 18200, y: 46 }, { x: 24600, y: 52 }, { x: 33400, y: 61 }, { x: 41800, y: 58 }, { x: 56200, y: 74 },
      { x: 63800, y: 69, label: "Meridian Freight" }, { x: 72400, y: 88 }, { x: 86600, y: 96, label: "Cobalt Systems" },
    ],
  },
]

/** Ticks on a 1, 2, 2.5 or 5 step that cover [lo, hi]; the first and last tick are the domain. */
function niceTicks(lo: number, hi: number, count = 5): number[] {
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) return [0, 1]
  if (lo === hi) {
    const pad = Math.abs(lo) || 1
    lo -= pad
    hi += pad
  }
  const raw = (hi - lo) / count
  const pow = 10 ** Math.floor(Math.log10(raw))
  const f = raw / pow
  const step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * pow
  const ticks: number[] = []
  for (let v = Math.floor(lo / step) * step; v <= Math.ceil(hi / step) * step + step / 2; v += step) {
    ticks.push(Number(v.toPrecision(12)))
  }
  return ticks
}

// Bubbles paint largest first, so a small bubble is never hidden under a big one.
const drawOrder = (points: ScatterPoint[]) =>
  points.map((_, i) => i).sort((a, b) => (points[b]!.size ?? 0) - (points[a]!.size ?? 0))

function formatter(f: Format | undefined, locale: string) {
  if (typeof f === "function") return f
  const nf = new Intl.NumberFormat(locale, f ?? { maximumFractionDigits: 2 })
  return (n: number) => nf.format(n)
}

type ScatterChartProps = {
  /** One or more series of `{ x, y, size?, label? }` points. */
  series?: ScatterSeries[]
  /** X axis title, also used in the tooltip and point labels. */
  xLabel?: string
  /** Y axis title, also used in the tooltip and point labels. */
  yLabel?: string
  /** Intl.NumberFormat options (works from Server Components) or a function, for x ticks and values. */
  xFormat?: Format
  /** Intl.NumberFormat options or a function, for y ticks and values. */
  yFormat?: Format
  /** What `size` measures, shown in the tooltip in bubble mode. */
  sizeLabel?: string
  /** Smallest and largest bubble diameter in px. Bubble area grows with `size`. */
  sizeRange?: [number, number]
  /** Dashed lines at fixed values, such as a target or a median. Included in the axis range. */
  referenceLines?: ReferenceLine[]
  /** Plot height in px, not counting the axis labels and legend. */
  height?: number
  /** Locale for number formatting. Fixed by default so server and browser render the same text. */
  locale?: string
  /** Show a ChartLegend under the chart when there is more than one series. */
  legend?: boolean
  /** Accessible name of the chart. */
  label?: string
  className?: string
}

function ScatterChart({
  series = SAMPLE,
  xLabel,
  yLabel,
  xFormat,
  yFormat,
  sizeLabel = "Size",
  sizeRange = [8, 40],
  referenceLines = [],
  height = 280,
  locale = "en-US",
  legend = true,
  label = "Scatter chart",
  className,
}: ScatterChartProps) {
  const reduce = useReducedMotion()
  const pointEls = React.useRef<(HTMLSpanElement | null)[]>([])
  const [active, setActive] = React.useState<number | null>(null)
  const [roving, setRoving] = React.useState(0)
  const [dimmed, setDimmed] = React.useState<number | null>(null)

  const fx = formatter(xFormat, locale)
  const fy = formatter(yFormat, locale)
  const fs = formatter(undefined, locale)

  const all = series.flatMap((s) => s.points)
  const refX = referenceLines.filter((r) => r.axis === "x").map((r) => r.value)
  const refY = referenceLines.filter((r) => r.axis === "y").map((r) => r.value)
  const xs = [...all.map((p) => p.x), ...refX]
  const ys = [...all.map((p) => p.y), ...refY]
  const xTicks = niceTicks(Math.min(...xs), Math.max(...xs))
  const yTicks = niceTicks(Math.min(...ys), Math.max(...ys))
  const x0 = xTicks[0]!
  const x1 = xTicks.at(-1)!
  const y0 = yTicks[0]!
  const y1 = yTicks.at(-1)!
  const px = (v: number) => (v - x0) / (x1 - x0 || 1)
  const py = (v: number) => 1 - (v - y0) / (y1 - y0 || 1)

  const sizes = all.flatMap((p) => (p.size != null && p.size > 0 ? [p.size] : []))
  const bubble = sizes.length > 0
  const maxSize = Math.max(...sizes, 1)
  // Area, not radius, tracks size, so a bubble twice the value looks twice as big.
  const diameter = (s?: number) => {
    if (!bubble) return 8
    const [lo, hi] = sizeRange
    const t = Math.max(s ?? 0, 0) / maxSize
    return Math.sqrt(lo * lo + t * (hi * hi - lo * lo))
  }

  // Every point in x order: the keyboard walks this list and the pointer searches it.
  const order = series
    .flatMap((s, si) => s.points.map((p, pi) => ({ si, pi, p, left: px(p.x), top: py(p.y) })))
    .sort((a, b) => a.p.x - b.p.x || a.p.y - b.p.y)
  const slot = new Map(order.map((o, k) => [`${o.si}:${o.pi}`, k]))
  const tabStop = Math.min(roving, Math.max(order.length - 1, 0))

  const colorOf = (si: number) => `var(--${series[si]?.color ?? COLORS[si % COLORS.length]})`
  const describe = (o: (typeof order)[number]) => {
    const s = series[o.si]!
    const parts = [s.name, o.p.label, `${xLabel ?? "x"} ${fx(o.p.x)}`, `${yLabel ?? "y"} ${fy(o.p.y)}`]
    if (bubble && o.p.size != null) parts.push(`${sizeLabel} ${fs(o.p.size)}`)
    return parts.filter(Boolean).join(", ")
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    let best = -1
    let bestD = Infinity
    order.forEach((o, k) => {
      if (dimmed != null && o.si !== dimmed) return
      const d = (o.left * r.width - (e.clientX - r.left)) ** 2 + (o.top * r.height - (e.clientY - r.top)) ** 2
      if (d < bestD) {
        bestD = d
        best = k
      }
    })
    setActive(best < 0 ? null : best)
  }

  const onKeyDown = (e: React.KeyboardEvent, k: number) => {
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown" ? k + 1
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? k - 1
      : e.key === "Home" ? 0
      : e.key === "End" ? order.length - 1
      : null
    if (next == null) return
    e.preventDefault()
    const to = Math.max(0, Math.min(order.length - 1, next))
    pointEls.current[to]?.focus()
  }

  const cur = active != null ? order[active] : undefined
  const widestY = yTicks.map(fy).reduce((a, b) => (b.length > a.length ? b : a), "")

  return (
    <div data-slot="scatter-chart" className={cn("flex w-full flex-col gap-2", className)}>
      {yLabel ? <p className="text-xs text-fg-muted">{yLabel}</p> : null}
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2">
        <div aria-hidden className="relative font-mono text-[10px] text-fg-subtle tabular-nums" style={{ height }}>
          <span className="invisible block">{widestY}</span>
          {yTicks.map((t) => (
            <span key={t} className="absolute right-0 -translate-y-1/2 whitespace-nowrap" style={{ top: `${py(t) * 100}%` }}>
              {fy(t)}
            </span>
          ))}
        </div>
        <div
          role="group"
          aria-label={`${label}, ${series.length} series, ${order.length} points`}
          className="relative cursor-crosshair touch-pan-y"
          style={{ height }}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setActive(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null)
          }}
        >
          <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
            {yTicks.map((t, i) => (
              <line key={`y${t}`} x1="0" x2="100" y1={py(t) * 100} y2={py(t) * 100} className="stroke-border" strokeWidth="1" strokeDasharray={i === 0 ? undefined : "2 3"} vectorEffect="non-scaling-stroke" />
            ))}
            {xTicks.map((t, i) => (
              <line key={`x${t}`} x1={px(t) * 100} x2={px(t) * 100} y1="0" y2="100" className="stroke-border" strokeWidth="1" strokeDasharray={i === 0 ? undefined : "2 3"} vectorEffect="non-scaling-stroke" />
            ))}
            {referenceLines.map((r, i) =>
              r.axis === "y" ? (
                <line key={i} x1="0" x2="100" y1={py(r.value) * 100} y2={py(r.value) * 100} className="stroke-fg-subtle" strokeWidth="1.5" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
              ) : (
                <line key={i} x1={px(r.value) * 100} x2={px(r.value) * 100} y1="0" y2="100" className="stroke-fg-subtle" strokeWidth="1.5" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
              )
            )}
            {cur ? (
              <g className="stroke-fg-subtle" strokeWidth="1" strokeDasharray="3 3">
                <line x1={cur.left * 100} x2={cur.left * 100} y1="0" y2="100" vectorEffect="non-scaling-stroke" />
                <line x1="0" x2="100" y1={cur.top * 100} y2={cur.top * 100} vectorEffect="non-scaling-stroke" />
              </g>
            ) : null}
          </svg>
          {referenceLines.map((r, i) =>
            r.label ? (
              <span
                key={i}
                aria-hidden
                className={cn(
                  "pointer-events-none absolute text-[10px] whitespace-nowrap text-fg-muted",
                  r.axis === "y" ? "right-1 -translate-y-full pb-0.5" : "top-1 pl-1"
                )}
                style={r.axis === "y" ? { top: `${py(r.value) * 100}%` } : { left: `${px(r.value) * 100}%` }}
              >
                {r.label}
              </span>
            ) : null
          )}
          {series.map((s, si) => (
            <div
              key={s.name}
              className="pointer-events-none absolute inset-0 transition-opacity duration-[140ms] ease-hairline"
              style={{ opacity: dimmed != null && dimmed !== si ? 0.16 : 1 }}
            >
              <AnimatePresence initial={false}>
                {drawOrder(s.points).map((pi) => {
                  const p = s.points[pi]!
                  const k = slot.get(`${si}:${pi}`) ?? 0
                  const d = diameter(p.size)
                  const color = colorOf(si)
                  const pos = { left: `${px(p.x) * 100}%`, top: `${py(p.y) * 100}%` }
                  return (
                    <motion.span
                      key={pi}
                      ref={(el) => {
                        pointEls.current[k] = el
                      }}
                      role="img"
                      aria-label={describe(order[k]!)}
                      tabIndex={k === tabStop ? 0 : -1}
                      onFocus={() => {
                        setActive(k)
                        setRoving(k)
                      }}
                      onKeyDown={(e) => onKeyDown(e, k)}
                      initial={{ opacity: 0, scale: 0.4, ...pos }}
                      animate={{ opacity: 1, scale: 1, ...pos }}
                      exit={{ opacity: 0, scale: 0.4 }}
                      transition={reduce ? INSTANT : { default: DATA, opacity: SNAPPY, scale: SNAPPY }}
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none",
                        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                        bubble ? "border-[1.5px]" : "border-[1.5px] border-surface"
                      )}
                      style={{
                        width: d,
                        height: d,
                        background: bubble ? `color-mix(in oklab, ${color} 26%, transparent)` : color,
                        borderColor: bubble ? color : undefined,
                        zIndex: active === k ? 2 : undefined,
                      }}
                    />
                  )
                })}
              </AnimatePresence>
            </div>
          ))}
          {cur ? (
            <span
              aria-hidden
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{
                left: `${cur.left * 100}%`,
                top: `${cur.top * 100}%`,
                width: diameter(cur.p.size) + 8,
                height: diameter(cur.p.size) + 8,
                borderColor: colorOf(cur.si),
              }}
            />
          ) : null}
          {order.length === 0 ? (
            <p className="absolute inset-0 grid place-items-center text-xs text-fg-muted">No data</p>
          ) : null}
          {cur ? (
            // aria-hidden: the focused point's own label already tells screen readers the same values.
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute z-10 -translate-y-1/2",
                cur.left > 0.6 ? "-translate-x-full pr-4" : "pl-4"
              )}
              style={{ left: `${cur.left * 100}%`, top: `${cur.top * 100}%` }}
            >
              <ChartTooltipCard
                title={cur.p.label ? (series.length > 1 ? `${cur.p.label} · ${series[cur.si]!.name}` : cur.p.label) : series[cur.si]!.name}
                rows={[
                  { label: xLabel ?? "x", value: fx(cur.p.x) },
                  { label: yLabel ?? "y", value: fy(cur.p.y) },
                  ...(bubble && cur.p.size != null ? [{ label: sizeLabel, value: fs(cur.p.size) }] : []),
                ]}
              />
            </div>
          ) : null}
        </div>
        <div />
        <div aria-hidden className="relative mt-1.5 h-4 font-mono text-[10px] text-fg-subtle tabular-nums">
          {xTicks.map((t, i) => (
            <span
              key={t}
              // The end labels align inward so they never spill past the plot.
              className={cn("absolute whitespace-nowrap", i === 0 ? "" : i === xTicks.length - 1 ? "-translate-x-full" : "-translate-x-1/2")}
              style={{ left: `${px(t) * 100}%` }}
            >
              {fx(t)}
            </span>
          ))}
        </div>
      </div>
      {xLabel ? <p className="text-right text-xs text-fg-muted">{xLabel}</p> : null}
      {legend && series.length > 1 ? (
        <div
          onPointerOver={(e) => {
            const li = (e.target as HTMLElement).closest("li")
            if (li?.parentElement) setDimmed(Array.prototype.indexOf.call(li.parentElement.children, li))
          }}
          onPointerLeave={() => setDimmed(null)}
        >
          <ChartLegend label={`${label} legend`} items={series.map((s, si) => ({ label: s.name, color: colorOf(si) }))} />
        </div>
      ) : null}
    </div>
  )
}

export { ScatterChart }
export type { ScatterChartProps, ScatterSeries, ScatterPoint, ReferenceLine as ScatterReferenceLine }
