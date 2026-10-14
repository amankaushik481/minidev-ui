"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SegmentedControl } from "@/registry/ui/segmented-control"

/** A project timeline with day and week scales, a today line, progress fills, dependency arrows, a sticky task column and focusable bars. */
type GanttTone = "accent" | "info" | "success" | "warning" | "danger"

type GanttTask = {
  id: string
  name: string
  /** Start date: a Date or an ISO day string such as "2026-10-14". */
  start: Date | string
  /** Last day of the task, inclusive. */
  end: Date | string
  /** 0 to 100. */
  progress?: number
  /** Tasks with the same group render under one heading and share a colour. */
  group?: string
  /** Ids of tasks that must finish first. Drawn as elbow arrows. */
  dependsOn?: string[]
  /** Colour override for this bar. */
  tone?: GanttTone
}

type GanttScale = "day" | "week"

type GanttChartProps = {
  /** Tasks to plot. Defaults to a six week Lumen launch plan built around today. */
  tasks?: GanttTask[]
  /** Controlled zoom level. */
  scale?: GanttScale
  defaultScale?: GanttScale
  onScaleChange?: (scale: GanttScale) => void
  /** The date the today line marks. Defaults to the current date. */
  today?: Date | string
  /** Empty days drawn before the first and after the last task. */
  padDays?: number
  /** Heading above the chart. Empty hides the header row. */
  title?: string
  /** Width of the sticky task column in px. */
  nameWidth?: number
  /** Called when a bar is clicked or activated with the keyboard. */
  onTaskClick?: (task: GanttTask) => void
  className?: string
}

const DAY_MS = 864e5
const DAY_W: Record<GanttScale, number> = { day: 36, week: 16 }
const ROW_H = 36
const GROUP_H = 28
const HEAD_H = 28
const TONES: GanttTone[] = ["accent", "info", "success", "warning", "danger"]
const TONE: Record<GanttTone, { bar: string; fill: string; dot: string }> = {
  accent: { bar: "border-accent-line bg-accent-soft", fill: "bg-accent/35", dot: "bg-accent" },
  info: { bar: "border-info/30 bg-info/10", fill: "bg-info/35", dot: "bg-info" },
  success: { bar: "border-success/30 bg-success/10", fill: "bg-success/35", dot: "bg-success" },
  warning: { bar: "border-warning/35 bg-warning/10", fill: "bg-warning/40", dot: "bg-warning" },
  danger: { bar: "border-danger/30 bg-danger/10", fill: "bg-danger/35", dot: "bg-danger" },
}

function toDate(v: Date | string): Date {
  if (v instanceof Date) return new Date(v.getFullYear(), v.getMonth(), v.getDate())
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v)
  if (m) return new Date(+m[1], +m[2] - 1, +m[3])
  const d = new Date(v)
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
const dayDiff = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / DAY_MS)
const fmt = (d: Date, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }) => d.toLocaleDateString("en-US", opts)
/** Monday of the week containing d. */
const weekStart = (d: Date) => addDays(d, -((d.getDay() + 6) % 7))

function demoTasks(today: Date): GanttTask[] {
  const d = (n: number) => addDays(today, n)
  return [
    { id: "discovery", name: "Discovery interviews", start: d(-14), end: d(-8), progress: 100, group: "Research" },
    { id: "positioning", name: "Positioning and pricing", start: d(-7), end: d(-3), progress: 100, group: "Research", dependsOn: ["discovery"] },
    { id: "audit", name: "Design system audit", start: d(-5), end: d(1), progress: 70, group: "Design", dependsOn: ["discovery"] },
    { id: "landing", name: "Landing page design", start: d(2), end: d(9), progress: 10, group: "Design", dependsOn: ["audit"] },
    { id: "billing", name: "Billing API", start: d(-2), end: d(10), progress: 45, group: "Engineering", dependsOn: ["positioning"] },
    { id: "checkout", name: "Checkout flow", start: d(11), end: d(19), progress: 0, group: "Engineering", dependsOn: ["landing", "billing"] },
    { id: "qa", name: "QA and beta", start: d(20), end: d(24), progress: 0, group: "Engineering", dependsOn: ["checkout"] },
    { id: "comms", name: "Launch comms", start: d(12), end: d(24), progress: 0, group: "Launch", dependsOn: ["landing"] },
    { id: "launch", name: "Public launch", start: d(25), end: d(26), progress: 0, group: "Launch", dependsOn: ["qa", "comms"] },
  ]
}

/** True once the element is narrower than `max` px. False during SSR. */
function useNarrow(ref: React.RefObject<HTMLElement | null>, max: number) {
  const [narrow, setNarrow] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver((entries) => setNarrow(entries[0].contentRect.width < max))
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, max])
  return narrow
}

type Row = { kind: "group"; label: string; y: number; h: number; tone: GanttTone } | { kind: "task"; task: GanttTask; y: number; h: number; tone: GanttTone; s: Date; e: Date; progress: number }

/**
 * A Gantt chart for launch plans and delivery schedules. Bars show progress
 * as a fill, dependencies as elbow arrows, today as an accent line, and the
 * task column stays put while the timeline scrolls sideways. Switch between
 * day and week scales; hover or focus a bar for its dates. Every bar is a
 * button with a full accessible label.
 */
function GanttChart({
  tasks,
  scale: scaleProp,
  defaultScale = "day",
  onScaleChange,
  today,
  padDays = 2,
  title = "Launch plan",
  nameWidth = 176,
  onTaskClick,
  className,
}: GanttChartProps) {
  const [now] = React.useState(() => new Date())
  const todayDate = React.useMemo(() => toDate(today ?? now), [today, now])
  const list = React.useMemo(() => tasks ?? demoTasks(todayDate), [tasks, todayDate])
  const [innerScale, setInnerScale] = React.useState<GanttScale>(defaultScale)
  const scale = scaleProp ?? innerScale
  const dayW = DAY_W[scale]
  const scroller = React.useRef<HTMLDivElement>(null)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const narrow = useNarrow(rootRef, 560)
  const colW = narrow ? Math.min(nameWidth, 132) : nameWidth
  const [hover, setHover] = React.useState<{ id: string; x: number; y: number; el: HTMLElement } | null>(null)

  const setScale = (s: GanttScale) => {
    if (scaleProp === undefined) setInnerScale(s)
    onScaleChange?.(s)
  }

  /* Range, rows and geometry. */
  const { start, days, rows, byId, groups } = React.useMemo(() => {
    const parsed = list.map((t) => ({ t, s: toDate(t.start), e: toDate(t.end) }))
    let min = todayDate
    let max = todayDate
    for (const p of parsed) {
      if (p.s < min) min = p.s
      if (p.e > max) max = p.e
    }
    let start = addDays(min, -padDays)
    let end = addDays(max, padDays)
    if (scale === "week") {
      start = weekStart(start)
      end = addDays(weekStart(end), 6)
    }
    const days = dayDiff(start, end) + 1
    const groups: string[] = []
    for (const p of parsed) {
      const g = p.t.group ?? ""
      if (!groups.includes(g)) groups.push(g)
    }
    const rows: Row[] = []
    const byId = new Map<string, Extract<Row, { kind: "task" }>>()
    let y = 0
    groups.forEach((g, gi) => {
      const tone = TONES[gi % TONES.length]
      if (g) {
        rows.push({ kind: "group", label: g, y, h: GROUP_H, tone })
        y += GROUP_H
      }
      for (const p of parsed) {
        if ((p.t.group ?? "") !== g) continue
        const row: Extract<Row, { kind: "task" }> = { kind: "task", task: p.t, y, h: ROW_H, tone: p.t.tone ?? tone, s: p.s, e: p.e, progress: Math.max(0, Math.min(100, p.t.progress ?? 0)) }
        rows.push(row)
        byId.set(p.t.id, row)
        y += ROW_H
      }
    })
    return { start, days, rows, byId, groups }
  }, [list, todayDate, padDays, scale])

  const bodyH = rows.reduce((a, r) => a + r.h, 0)
  const width = days * dayW
  const todayIdx = dayDiff(start, todayDate)
  const x = (d: Date) => dayDiff(start, d) * dayW

  /* Header cells: months on top, days or weeks below. */
  const months = React.useMemo(() => {
    const out: { label: string; from: number; span: number }[] = []
    for (let i = 0; i < days; i++) {
      const d = addDays(start, i)
      const label = fmt(d, { month: "long", year: "numeric" })
      const last = out[out.length - 1]
      if (last && last.label === label) last.span++
      else out.push({ label, from: i, span: 1 })
    }
    return out
  }, [start, days])
  const units = React.useMemo(() => {
    const out: { from: number; span: number; label: string; weekend: boolean }[] = []
    if (scale === "day") for (let i = 0; i < days; i++) {
      const d = addDays(start, i)
      out.push({ from: i, span: 1, label: String(d.getDate()), weekend: d.getDay() === 0 || d.getDay() === 6 })
    }
    else for (let i = 0; i < days; i += 7) out.push({ from: i, span: Math.min(7, days - i), label: fmt(addDays(start, i)), weekend: false })
    return out
  }, [scale, start, days])

  /* Keep today in view on mount and when the scale changes. */
  React.useEffect(() => {
    const el = scroller.current
    if (!el) return
    el.scrollLeft = Math.max(0, todayIdx * dayW - el.clientWidth / 3)
  }, [scale, dayW, todayIdx])

  /* Dependency arrows. */
  const arrows = React.useMemo(() => {
    const out: { key: string; d: string; tip: string }[] = []
    for (const r of rows) {
      if (r.kind !== "task" || !r.task.dependsOn) continue
      for (const dep of r.task.dependsOn) {
        const from = byId.get(dep)
        if (!from) continue
        const x1 = x(addDays(from.e, 1))
        const y1 = from.y + from.h / 2
        const x2 = x(r.s)
        const y2 = r.y + r.h / 2
        const d =
          x2 >= x1 + 14
            ? `M${x1} ${y1}H${x1 + 7}V${y2}H${x2 - 4}`
            : `M${x1} ${y1}H${x1 + 7}V${y1 + (y2 > y1 ? ROW_H / 2 : -ROW_H / 2)}H${x2 - 9}V${y2}H${x2 - 4}`
        out.push({ key: `${dep}->${r.task.id}`, d, tip: `M${x2} ${y2}l-5 -3.5v7z` })
      }
    }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, byId, dayW, start])

  const hovered = hover ? byId.get(hover.id) : undefined
  const show = (id: string, el: HTMLElement) => {
    const root = rootRef.current?.getBoundingClientRect()
    if (!root) return
    const r = el.getBoundingClientRect()
    const half = 104
    const cx = Math.min(Math.max(r.left + r.width / 2 - root.left, half), Math.max(half, root.width - half))
    setHover({ id, x: cx, y: r.top - root.top, el })
  }
  const rangeLabel = `${fmt(addDays(start, padDays))} to ${fmt(addDays(start, days - 1 - padDays))}`

  return (
    <div ref={rootRef} data-slot="gantt-chart" className={cn("relative flex w-full max-w-4xl flex-col rounded-xl border border-border bg-surface text-fg shadow-raised", className)}>
      {title ? (
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-[0.9375rem] font-medium text-fg">{title}</p>
            <p className="truncate text-xs text-fg-muted">
              {list.length} tasks, {groups.filter(Boolean).length || 1} {groups.filter(Boolean).length === 1 ? "group" : "groups"}, {rangeLabel}
            </p>
          </div>
          <SegmentedControl
            size="sm"
            aria-label="Timeline scale"
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
            ]}
            value={scale}
            onChange={(v) => setScale(v as GanttScale)}
          />
        </div>
      ) : null}
      <div className="flex rounded-b-xl">
        {/* Task column: fixed beside the timeline so bars never slide under it. */}
        <div className="shrink-0 border-r border-border" style={{ width: colW }}>
          <div className="flex items-end border-b border-border px-3 pb-1.5" style={{ height: HEAD_H * 2 }}>
            <span className="font-mono text-[10px] font-medium tracking-[0.08em] text-fg-subtle uppercase">Task</span>
          </div>
          <div className="relative" style={{ height: bodyH }}>
            {rows.map((r) =>
              r.kind === "group" ? (
                <div key={`group-${r.label}`} className="absolute right-0 left-0 flex items-center gap-2 bg-sunken/60 px-3" style={{ top: r.y, height: r.h }}>
                  <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", TONE[r.tone].dot)} />
                  <span className="truncate font-mono text-[10px] font-medium tracking-[0.08em] text-fg-muted uppercase">{r.label}</span>
                </div>
              ) : (
                <div key={r.task.id} className="absolute right-0 left-0 flex items-center gap-2 border-b border-border/60 px-3" style={{ top: r.y, height: r.h }}>
                  <span className="min-w-0 flex-1 truncate text-[0.8125rem] text-fg">{r.task.name}</span>
                  {!narrow ? <span className="shrink-0 font-mono text-[10px] text-fg-subtle tabular-nums">{r.progress}%</span> : null}
                </div>
              )
            )}
          </div>
        </div>
        {/* Timeline */}
        <div ref={scroller} onScroll={() => hover && show(hover.id, hover.el)} className="relative min-w-0 flex-1 overflow-x-auto overscroll-x-contain">
          <div className="relative" style={{ width, minWidth: "100%" }}>
            {/* Header */}
            <div className="relative border-b border-border" style={{ height: HEAD_H * 2 }}>
              {months.map((m) => (
                <div key={m.label} className="absolute top-0 flex items-center border-r border-border px-2 text-[11px] font-medium whitespace-nowrap text-fg-muted" style={{ left: m.from * dayW, width: m.span * dayW, height: HEAD_H }}>
                  {m.span * dayW >= 112 ? <span className="sticky left-2">{m.label}</span> : null}
                </div>
              ))}
              {units.map((u) => (
                <div
                  key={u.from}
                  className={cn(
                    "absolute flex items-center border-r border-border font-mono text-[10px] text-fg-subtle tabular-nums",
                    scale === "day" ? "justify-center" : "px-1.5",
                    u.weekend && "bg-sunken",
                    scale === "day" && u.from === todayIdx && "font-medium text-accent-fg"
                  )}
                  style={{ left: u.from * dayW, width: u.span * dayW, top: HEAD_H, height: HEAD_H }}
                >
                  {u.label}
                </div>
              ))}
            </div>
            {/* Body */}
            <div className="relative" style={{ height: bodyH }}>
              <div aria-hidden className="absolute inset-0">
                {units.map((u) => (
                  <div key={u.from} className={cn("absolute top-0 bottom-0 border-r border-border/70", u.weekend && "bg-sunken/70")} style={{ left: u.from * dayW, width: u.span * dayW }} />
                ))}
                {rows.map((r) => (r.kind === "group" ? <div key={`g${r.y}`} className="absolute right-0 left-0 bg-sunken/60" style={{ top: r.y, height: r.h }} /> : null))}
                {rows.map((r) => (r.kind === "task" ? <div key={`b${r.y}`} className="absolute right-0 left-0 border-b border-border/60" style={{ top: r.y, height: r.h }} /> : null))}
                {todayIdx >= 0 && todayIdx < days ? <div className="absolute top-0 bottom-0 bg-accent-soft" style={{ left: todayIdx * dayW, width: dayW }} /> : null}
              </div>
              {rows.map((r) =>
                r.kind === "task" ? (
                  <button
                    key={r.task.id}
                    type="button"
                    aria-label={`${r.task.name}, ${fmt(r.s)} to ${fmt(r.e)}, ${dayDiff(r.s, r.e) + 1} days, ${r.progress}% done${r.task.group ? `, ${r.task.group}` : ""}`}
                    onClick={() => onTaskClick?.(r.task)}
                    onPointerEnter={(e) => show(r.task.id, e.currentTarget)}
                    onPointerLeave={() => setHover(null)}
                    onFocus={(e) => show(r.task.id, e.currentTarget)}
                    onBlur={() => setHover(null)}
                    data-slot="gantt-bar"
                    className={cn(
                      "absolute h-6 overflow-hidden rounded-md border text-left outline-none",
                      "transition-[box-shadow,border-color] duration-[140ms] ease-hairline hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface",
                      TONE[r.tone].bar
                    )}
                    style={{ left: x(r.s), top: r.y + 6, width: (dayDiff(r.s, r.e) + 1) * dayW }}
                  >
                    <span aria-hidden className={cn("absolute inset-y-0 left-0", TONE[r.tone].fill)} style={{ width: `${r.progress}%` }} />
                    {(dayDiff(r.s, r.e) + 1) * dayW >= 72 ? (
                      <span aria-hidden className="relative block truncate px-2 text-[11px] leading-[22px] font-medium text-fg">{r.task.name}</span>
                    ) : null}
                  </button>
                ) : null
              )}
              {/* Dependencies and today line */}
              <svg aria-hidden className="pointer-events-none absolute top-0 left-0 z-10 overflow-visible" style={{ width, height: bodyH }}>
                {arrows.map((a) => (
                  <g key={a.key} className="text-fg-subtle">
                    <path d={a.d} fill="none" stroke="currentColor" strokeWidth={1} strokeOpacity={0.7} />
                    <path d={a.tip} fill="currentColor" fillOpacity={0.8} />
                  </g>
                ))}
                {todayIdx >= 0 && todayIdx < days ? (
                  <line x1={(todayIdx + 0.5) * dayW} x2={(todayIdx + 0.5) * dayW} y1={0} y2={bodyH} stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="3 3" />
                ) : null}
              </svg>
            </div>
          </div>
        </div>
      </div>
      {hovered ? (
        <div
          role="tooltip"
          data-slot="gantt-tooltip"
          className="pointer-events-none absolute z-30 w-52 -translate-x-1/2 -translate-y-full rounded-lg border border-border bg-raised p-2.5 text-xs shadow-overlay"
          style={{ left: hover!.x, top: hover!.y - 8 }}
        >
          <p className="truncate font-medium text-fg">{hovered.task.name}</p>
          <p className="mt-0.5 text-fg-muted tabular-nums">
            {fmt(hovered.s)} to {fmt(hovered.e)} <span className="text-fg-subtle">({dayDiff(hovered.s, hovered.e) + 1} days)</span>
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="h-1 flex-1 overflow-hidden rounded-full bg-sunken">
              <span className={cn("block h-full rounded-full", TONE[hovered.tone].dot)} style={{ width: `${hovered.progress}%` }} />
            </span>
            <span className="font-mono text-[10px] text-fg-subtle tabular-nums">{hovered.progress}%</span>
          </div>
          {hovered.task.group ? <p className="mt-1.5 text-[11px] text-fg-subtle">{hovered.task.group}</p> : null}
        </div>
      ) : null}
    </div>
  )
}

export { GanttChart }
export type { GanttChartProps, GanttTask, GanttScale, GanttTone }
