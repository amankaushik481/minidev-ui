"use client"
import * as React from "react"
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react"
import { cn } from "@/lib/utils"
import { SegmentedControl } from "@/registry/ui/segmented-control"

/** A radial bar chart of concentric progress rings with a legend, a rolling centre total and spring animated values. */
type RadialDatum = {
  label: string
  value: number
  /** The goal or ceiling. Defaults to 100. */
  max?: number
  /** Any CSS colour. Defaults to the chart tokens in order. */
  color?: string
  /** Formats value and max in the legend, e.g. currency. */
  format?: (n: number) => string
}

type RadialPeriod = { label: string; data: RadialDatum[] }

type RadialChartProps = {
  /** Rings, outermost first. One item renders a single radial progress ring. */
  data?: RadialDatum[]
  /** Datasets to switch between with a segmented control. Ignored when `data` is set. */
  periods?: RadialPeriod[]
  title?: string
  /** Label under the centre total. */
  centerLabel?: string
  /** Override the centre value. Defaults to the average progress of all rings. */
  centerValue?: React.ReactNode
  /** Ring thickness in chart units (the chart is 240 wide). */
  thickness?: number
  /** Gap between rings in chart units. */
  gap?: number
  showLegend?: boolean
  className?: string
}

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 })
const money = (n: number) => usd.format(n)
const percent = (n: number) => `${n}%`

const PERIODS: RadialPeriod[] = [
  {
    label: "October",
    data: [
      { label: "MRR target", value: 84200, max: 100000, format: money },
      { label: "Activation", value: 62, max: 70, format: percent },
      { label: "NPS", value: 47, max: 60 },
    ],
  },
  {
    label: "Q3",
    data: [
      { label: "MRR target", value: 71500, max: 90000, format: money },
      { label: "Activation", value: 49, max: 70, format: percent },
      { label: "NPS", value: 41, max: 60 },
    ],
  },
]

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-4)", "var(--chart-3)", "var(--chart-5)"]
const DATA_SPRING = { type: "spring", bounce: 0.12, duration: 0.7 } as const
const ROLL = { type: "spring", stiffness: 260, damping: 28, mass: 0.9 } as const

const SIZE = 240
const C = SIZE / 2

/** Arc from 12 o'clock, clockwise, through `sweep` radians. */
function arc(r: number, sweep: number) {
  if (sweep >= Math.PI * 2 - 1e-6) return `M${C} ${C - r}A${r} ${r} 0 1 1 ${C} ${C + r}A${r} ${r} 0 1 1 ${C} ${C - r}`
  const a = -Math.PI / 2 + sweep
  return `M${C} ${C - r}A${r} ${r} 0 ${sweep > Math.PI ? 1 : 0} 1 ${C + r * Math.cos(a)} ${C + r * Math.sin(a)}`
}

function Rolling({ value, suffix = "" }: { value: number; suffix?: string }) {
  const reduce = useReducedMotion()
  const mv = useMotionValue(value)
  const text = useTransform(mv, (v) => `${Math.round(v)}${suffix}`)
  React.useEffect(() => {
    if (reduce) {
      mv.set(value)
      return
    }
    const c = animate(mv, value, ROLL)
    return () => c.stop()
  }, [value, reduce, mv])
  return <motion.span>{text}</motion.span>
}

/**
 * A radial bar chart of concentric progress rings, each labelled at its start,
 * with a legend and a centre total. Rings sweep to new values on the data
 * spring when the data changes and the total rolls. Pass a single item to get
 * a full radial progress ring.
 */
function RadialChart({
  data: dataProp,
  periods = PERIODS,
  title = "Goals progress",
  centerLabel,
  centerValue,
  thickness,
  gap = 6,
  showLegend = true,
  className,
}: RadialChartProps) {
  const reduce = useReducedMotion()
  const [period, setPeriod] = React.useState(periods[0]?.label ?? "")
  const [hot, setHot] = React.useState<number | null>(null)
  const data = dataProp ?? periods.find((p) => p.label === period)?.data ?? periods[0]?.data ?? []
  const single = data.length === 1
  const sweep = single ? Math.PI * 2 : Math.PI * 1.5
  const t = thickness ?? (single ? 18 : data.length > 4 ? 10 : 16)
  const rings = data.map((d, i) => {
    const max = d.max ?? 100
    const p = max > 0 ? Math.max(0, Math.min(1, d.value / max)) : 0
    const r = C - 4 - t / 2 - i * (t + gap)
    const f = d.format ?? ((n: number) => n.toLocaleString("en-US"))
    return { ...d, i, max, p, r, color: d.color ?? COLORS[i % COLORS.length], text: `${f(d.value)} of ${f(d.max ?? 100)}` }
  })
  const avg = rings.length ? Math.round((rings.reduce((s, r) => s + r.p, 0) / rings.length) * 100) : 0
  const centre = single ? Math.round(rings[0].p * 100) : avg
  const sub = centerLabel ?? (single ? rings[0]?.label : "of goals")
  const summary = rings.map((r) => `${r.label} ${Math.round(r.p * 100)}%, ${r.text}`).join("; ")

  return (
    <div
      data-slot="radial-chart"
      className={cn("w-full rounded-xl border border-border bg-surface p-5 shadow-raised", single ? "max-w-xs" : "max-w-sm", className)}
    >
      <div className="flex min-h-8 items-center justify-between gap-3">
        <p className="text-[0.8125rem] font-medium text-fg">{title}</p>
        {!dataProp && periods.length > 1 ? (
          <SegmentedControl size="sm" aria-label="Period" value={period} onChange={setPeriod} items={periods.map((p) => p.label)} />
        ) : null}
      </div>

      <div className="relative mx-auto mt-4 w-full max-w-60">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`${title}: ${summary}`} className="block h-auto w-full">
          {rings.map((r) => {
            const dim = hot != null && hot !== r.i
            return (
              <g key={r.label} className={cn("transition-opacity duration-[140ms]", dim && "opacity-35")}>
                <path
                  d={arc(r.r, sweep)}
                  fill="none"
                  strokeWidth={t}
                  strokeLinecap="round"
                  style={{ stroke: `color-mix(in oklch, ${r.color} 16%, transparent)` }}
                />
                <motion.path
                  d={arc(r.r, sweep)}
                  fill="none"
                  strokeWidth={t}
                  strokeLinecap="round"
                  style={{ stroke: r.color }}
                  initial={false}
                  animate={{ pathLength: r.p, opacity: r.p > 0 ? 1 : 0 }}
                  transition={reduce ? { duration: 0 } : DATA_SPRING}
                />
                {!single ? (
                  <text
                    x={C - t / 2 - 4}
                    y={C - r.r}
                    textAnchor="end"
                    dominantBaseline="central"
                    className="fill-fg-muted"
                    style={{ fontSize: Math.min(11, t * 0.7) }}
                  >
                    {r.label}
                  </text>
                ) : null}
              </g>
            )
          })}
        </svg>
        <div
          aria-hidden
          className={cn("pointer-events-none absolute inset-0 flex flex-col items-center justify-center", !single && "pt-1")}
        >
          <span className={cn("font-medium tracking-[-0.03em] text-fg tabular-nums", single ? "text-4xl" : "text-3xl")}>
            {centerValue ?? <Rolling value={centre} suffix="%" />}
          </span>
          <span className="mt-0.5 max-w-24 truncate text-xs text-fg-muted">{sub}</span>
          {single ? <span className="mt-1 text-[11px] text-fg-subtle tabular-nums">{rings[0].text}</span> : null}
        </div>
      </div>

      {showLegend && !single ? (
        <ul className="mt-4 space-y-0.5 border-t border-border pt-3">
          {rings.map((r) => (
            <li
              key={r.label}
              onPointerEnter={() => setHot(r.i)}
              onPointerLeave={() => setHot(null)}
              className={cn("flex h-7 items-center gap-2 text-xs transition-opacity duration-[140ms]", hot != null && hot !== r.i && "opacity-50")}
            >
              <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ background: r.color }} />
              <span className="min-w-0 flex-1 truncate text-fg-muted">{r.label}</span>
              <span className="text-fg-subtle tabular-nums">{r.text}</span>
              <span className="w-10 text-right font-medium text-fg tabular-nums">{Math.round(r.p * 100)}%</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export { RadialChart }
export type { RadialChartProps, RadialDatum, RadialPeriod }
