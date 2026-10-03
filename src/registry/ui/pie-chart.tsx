"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/** An SVG pie chart with leader line labels, a legend and slices that pull out on hover or focus. */
type PieDatum = {
  label: string
  value: number
  /** Any CSS colour. Defaults to the chart tokens in order. */
  color?: string
}

type PieChartProps = {
  data?: PieDatum[]
  /** Heading shown above the chart and used as the accessible name. */
  title?: string
  /** Caption under the total when no slice is active. */
  caption?: string
  /** Formats values in the readout, legend and table. */
  format?: (value: number) => string
  /** Labels outside the slices with leader lines. Hidden automatically when the chart is narrow. */
  showLabels?: boolean
  showLegend?: boolean
  /** Distance a hovered or focused slice pulls out, in chart units. */
  pullOut?: number
  className?: string
}

const SAMPLE: PieDatum[] = [
  { label: "Enterprise", value: 48200 },
  { label: "Business", value: 31600 },
  { label: "Pro", value: 22400 },
  { label: "Starter", value: 9800 },
  { label: "Add-ons", value: 4100 },
]

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]
const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 })
const defaultFormat = (n: number) => usd.format(n)

function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  if (a1 - a0 >= Math.PI * 2 - 1e-6) {
    return `M${cx} ${cy - r}A${r} ${r} 0 1 1 ${cx} ${cy + r}A${r} ${r} 0 1 1 ${cx} ${cy - r}Z`
  }
  const x0 = cx + r * Math.cos(a0)
  const y0 = cy + r * Math.sin(a0)
  const x1 = cx + r * Math.cos(a1)
  const y1 = cy + r * Math.sin(a1)
  const large = a1 - a0 > Math.PI ? 1 : 0
  return `M${cx} ${cy}L${x0} ${y0}A${r} ${r} 0 ${large} 1 ${x1} ${y1}Z`
}

/** Push label y positions apart on one side so they never overlap. */
function spread<T extends { y: number }>(items: T[], gap: number, min: number, max: number) {
  const s = [...items].sort((a, b) => a.y - b.y)
  for (let i = 1; i < s.length; i++) if (s[i].y - s[i - 1].y < gap) s[i].y = s[i - 1].y + gap
  if (s.length && s[s.length - 1].y > max) {
    s[s.length - 1].y = max
    for (let i = s.length - 2; i >= 0; i--) if (s[i + 1].y - s[i].y < gap) s[i].y = s[i + 1].y - gap
  }
  for (const it of s) it.y = Math.max(min, it.y)
  return s
}

/**
 * An SVG pie chart with outside labels on leader lines, a legend and a
 * readout. Hover or focus a slice and it pulls out on a spring while the
 * readout shows its value and share. Slices are keyboard focusable with
 * arrow keys, and a visually hidden table carries the data for screen readers.
 */
function PieChart({
  data = SAMPLE,
  title = "Revenue by plan",
  caption = "Monthly recurring revenue",
  format = defaultFormat,
  showLabels = true,
  showLegend = true,
  pullOut = 6,
  className,
}: PieChartProps) {
  const reduce = useReducedMotion()
  const [active, setActive] = React.useState<number | null>(null)
  const [focusIdx, setFocusIdx] = React.useState(0)
  const [narrow, setNarrow] = React.useState(false)
  const boxRef = React.useRef<HTMLDivElement>(null)
  const refs = React.useRef<(SVGPathElement | null)[]>([])
  const titleId = React.useId()

  React.useEffect(() => {
    const el = boxRef.current
    if (!el || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(([e]) => setNarrow(e.contentRect.width < 320))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const labels = showLabels && !narrow
  const W = labels ? 360 : 240
  const H = 240
  const cx = W / 2
  const cy = H / 2
  const r = labels ? 80 : 104

  const total = data.reduce((s, d) => s + Math.max(0, d.value), 0)
  const slices = React.useMemo(() => {
    let a = -Math.PI / 2
    return data.map((d, i) => {
      const share = total ? Math.max(0, d.value) / total : 0
      const a0 = a
      const a1 = a + share * Math.PI * 2
      a = a1
      const mid = (a0 + a1) / 2
      return { ...d, i, share, a0, a1, mid, color: d.color ?? COLORS[i % COLORS.length] }
    })
  }, [data, total])

  const placed = React.useMemo(() => {
    if (!labels) return []
    const items = slices
      .filter((s) => s.share > 0)
      .map((s) => {
        const right = Math.cos(s.mid) >= 0
        return { s, right, y: cy + Math.sin(s.mid) * (r + 16) }
      })
    const gap = 14
    return [
      ...spread(items.filter((x) => x.right), gap, 10, H - 10),
      ...spread(items.filter((x) => !x.right), gap, 10, H - 10),
    ]
  }, [labels, slices, cy, r])

  const pct = (share: number) => `${(share * 100).toFixed(share < 0.1 ? 1 : 0)}%`
  const cur = active != null ? slices[active] : null

  const move = (to: number) => {
    const n = (to + slices.length) % slices.length
    setFocusIdx(n)
    refs.current[n]?.focus()
  }

  return (
    <figure
      data-slot="pie-chart"
      aria-labelledby={titleId}
      className={cn("w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-raised", className)}
    >
      <figcaption>
        <p id={titleId} className="text-[0.8125rem] font-medium text-fg">
          {title}
        </p>
        <div aria-hidden className="mt-1 flex h-14 flex-col justify-center">
          <p className="text-2xl font-medium tracking-[-0.025em] text-fg tabular-nums">{format(cur ? cur.value : total)}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-fg-muted">
            {cur ? (
              <>
                <span className="size-2 rounded-full" style={{ background: cur.color }} />
                <span className="text-fg">{cur.label}</span>
                <span className="tabular-nums">· {(cur.share * 100).toFixed(1)}% of total</span>
              </>
            ) : (
              caption
            )}
          </p>
        </div>
      </figcaption>

      <div ref={boxRef} className="mt-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="group"
          aria-label={`${title}, ${data.length} slices`}
          className="mx-auto block h-auto w-full overflow-visible"
          style={{ maxWidth: labels ? 420 : 260 }}
          onPointerLeave={() => setActive(null)}
        >
          {slices.map((s) =>
            s.share > 0 ? (
              <motion.path
                key={s.label}
                ref={(el) => {
                  refs.current[s.i] = el
                }}
                d={arcPath(cx, cy, r, s.a0, s.a1)}
                fill={s.color}
                role="img"
                aria-label={`${s.label}: ${format(s.value)}, ${(s.share * 100).toFixed(1)}%`}
                tabIndex={s.i === focusIdx ? 0 : -1}
                initial={false}
                animate={{
                  x: active === s.i ? Math.cos(s.mid) * pullOut : 0,
                  y: active === s.i ? Math.sin(s.mid) * pullOut : 0,
                  opacity: active == null || active === s.i ? 1 : 0.5,
                }}
                transition={reduce ? { duration: 0 } : SNAPPY}
                onPointerEnter={() => setActive(s.i)}
                onFocus={() => {
                  setFocusIdx(s.i)
                  setActive(s.i)
                }}
                onBlur={() => setActive(null)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); move(s.i + 1) }
                  if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); move(s.i - 1) }
                  if (e.key === "Home") { e.preventDefault(); move(0) }
                  if (e.key === "End") { e.preventDefault(); move(slices.length - 1) }
                }}
                strokeWidth={2}
                strokeLinejoin="round"
                className="cursor-pointer stroke-surface outline-none focus-visible:stroke-fg"
              />
            ) : null
          )}
          {placed.map(({ s, right, y }) => {
            const p0x = cx + Math.cos(s.mid) * (r + 2)
            const p0y = cy + Math.sin(s.mid) * (r + 2)
            const ex = cx + Math.cos(s.mid) * (r + 12)
            const tx = cx + (right ? 1 : -1) * (r + 24)
            const on = active === s.i
            return (
              <g key={s.label} aria-hidden className={cn("transition-opacity duration-[140ms]", active != null && !on && "opacity-50")}>
                <polyline
                  points={`${p0x},${p0y} ${ex},${y} ${tx - (right ? 4 : -4)},${y}`}
                  fill="none"
                  strokeWidth={1}
                  className={on ? "stroke-fg-muted" : "stroke-fg-subtle opacity-50"}
                />
                <text x={tx} y={y} dominantBaseline="middle" textAnchor={right ? "start" : "end"} style={{ fontSize: 11 }}>
                  <tspan className="fill-fg-muted">{s.label}</tspan>
                  <tspan dx={4} className="fill-fg font-medium tabular-nums">
                    {pct(s.share)}
                  </tspan>
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {showLegend ? (
        <ul aria-hidden className={cn("mt-4 grid gap-x-6 gap-y-1 border-t border-border pt-3", narrow ? "grid-cols-1" : "grid-cols-2")}>
          {slices.map((s) => (
            <li
              key={s.label}
              onPointerEnter={() => setActive(s.i)}
              onPointerLeave={() => setActive(null)}
              className={cn(
                "flex h-7 items-center gap-2 rounded-md px-1.5 text-xs transition-opacity duration-[140ms]",
                active != null && active !== s.i && "opacity-50"
              )}
            >
              <span className="size-2 shrink-0 rounded-full" style={{ background: s.color }} />
              <span className="min-w-0 flex-1 truncate text-fg-muted">{s.label}</span>
              <span className="font-medium text-fg tabular-nums">{format(s.value)}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Segment</th>
            <th scope="col">Value</th>
            <th scope="col">Share</th>
          </tr>
        </thead>
        <tbody>
          {slices.map((s) => (
            <tr key={s.label}>
              <th scope="row">{s.label}</th>
              <td>{format(s.value)}</td>
              <td>{(s.share * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            <td>{format(total)}</td>
            <td>100%</td>
          </tr>
        </tfoot>
      </table>
    </figure>
  )
}

export { PieChart }
export type { PieChartProps, PieDatum }
