"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { smoothPath } from "@/registry/ui/area-chart"

type Point = { label: string; value: number; compare?: number }

const SAMPLE: Point[] = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
].map((label, i) => ({ label, value: Math.round(42 + i * 3.4 + Math.sin(i * 1.3) * 5), compare: Math.round(38 + i * 2.2 + Math.cos(i) * 3) }))

/**
 * InteractiveAreaChart — hover or arrow-key across the series; a hairline
 * crosshair pins the value and the delta against the comparison line.
 */
function InteractiveAreaChart({
  data = SAMPLE,
  format = (n: number) => `$${n.toLocaleString()}k`,
  label = "Revenue",
  compareLabel = "Last year",
  className,
}: {
  data?: Point[]
  format?: (n: number) => string
  label?: string
  compareLabel?: string
  className?: string
}) {
  const id = React.useId().replace(/:/g, "")
  const [i, setI] = React.useState<number | null>(null)
  const w = 600
  const h = 200
  const pad = 10
  const all = data.flatMap((d) => [d.value, d.compare ?? d.value])
  const max = Math.max(...all)
  const min = Math.min(...all) * 0.9
  const x = (k: number) => (k / Math.max(data.length - 1, 1)) * w
  const y = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)
  const pts = data.map((d, k) => [x(k), y(d.value)] as const)
  const cmp = data.every((d) => d.compare != null) ? data.map((d, k) => [x(k), y(d.compare!)] as const) : null
  const line = smoothPath(pts)
  const active = i ?? data.length - 1
  const cur = data[active]
  const delta = cur.compare != null ? ((cur.value - cur.compare) / cur.compare) * 100 : null

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const k = Math.round(((e.clientX - r.left) / r.width) * (data.length - 1))
    setI(Math.max(0, Math.min(data.length - 1, k)))
  }

  return (
    <div data-slot="interactive-area-chart" className={cn("w-full max-w-2xl rounded-xl border border-border bg-surface p-5 shadow-raised", className)}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[0.8125rem] text-fg-muted">{label} · {cur.label}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-3xl font-medium tracking-[-0.03em] tabular-nums text-fg">{format(cur.value)}</p>
            {delta != null ? (
              <span className={cn("rounded-md px-1.5 py-0.5 text-[11px] font-medium tabular-nums", delta >= 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                {delta >= 0 ? "+" : "−"}{Math.abs(delta).toFixed(1)}% vs {compareLabel.toLowerCase()}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-fg-muted">
          <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-3 rounded-full bg-accent" />{label}</span>
          {cmp ? <span className="inline-flex items-center gap-1.5"><span className="w-3 border-t border-dashed border-fg-subtle" />{compareLabel}</span> : null}
        </div>
      </div>
      <div
        role="slider"
        tabIndex={0}
        aria-label={`${label} by ${data.length} periods`}
        aria-valuemin={0}
        aria-valuemax={data.length - 1}
        aria-valuenow={active}
        aria-valuetext={`${cur.label}: ${format(cur.value)}`}
        onPointerMove={onMove}
        onPointerLeave={() => setI(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); setI(Math.max(0, active - 1)) }
          if (e.key === "ArrowRight") { e.preventDefault(); setI(Math.min(data.length - 1, active + 1)) }
        }}
        className="relative mt-5 h-52 cursor-crosshair rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
      >
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible text-accent" aria-hidden>
          <defs>
            <linearGradient id={`iac-${id}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.24" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <clipPath id={`iacc-${id}`}>
              <rect x="0" y="0" width={x(active)} height={h} />
            </clipPath>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} className="stroke-border" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
          ))}
          <line x1="0" x2={w} y1={h} y2={h} className="stroke-border" vectorEffect="non-scaling-stroke" />
          {cmp ? <path d={smoothPath(cmp)} fill="none" className="stroke-fg-subtle" strokeWidth="1.25" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" /> : null}
          <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#iac-${id})`} opacity="0.45" />
          <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#iac-${id})`} clipPath={`url(#iacc-${id})`} />
          <path d={line} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <line x1={x(active)} x2={x(active)} y1="0" y2={h} stroke="currentColor" strokeOpacity="0.4" vectorEffect="non-scaling-stroke" />
        </svg>
        <span
          aria-hidden
          className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-accent shadow-[0_0_0_5px_var(--accent-soft)] transition-[left,top] duration-100"
          style={{ left: `${(x(active) / w) * 100}%`, top: `${(y(cur.value) / h) * 100}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] text-fg-subtle">
        {data.map((d, k) => (
          <span key={d.label} className={cn("transition-colors", k === active && "text-fg")}>{d.label}</span>
        ))}
      </div>
    </div>
  )
}
export { InteractiveAreaChart }
