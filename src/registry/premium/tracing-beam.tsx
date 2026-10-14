"use client"
import * as React from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A vertical beam beside long content that grows as you scroll, with a glowing tip and a node that lights for each entry.
 * The beam is an SVG path driven by scroll progress through the section and
 * smoothed with a spring, so it glides rather than jumps. Each direct child of
 * the content gets a node on the track that fills the moment the beam passes
 * it. Reduced motion drops the spring and follows the scroll exactly.
 */
type TracingBeamItem = {
  /** Release tag shown in mono. */
  version?: string
  /** When it shipped. */
  date?: string
  title: string
  body: string
}

type TracingBeamProps = {
  /** Entries to trace. Each one gets a node on the beam. */
  items?: TracingBeamItem[]
  /** Your own content in place of the entries. Each direct child gets a node. */
  children?: React.ReactNode
  /** Beam colour. Any CSS colour, including var(--token). Defaults to the accent. */
  color?: string
  /** Width of the rail the beam runs in, in pixels. */
  rail?: number
  className?: string
}

const DEFAULT_ITEMS: TracingBeamItem[] = [
  {
    version: "v3.2",
    date: "14 Oct 2026",
    title: "Invoices that close themselves",
    body: "Lumen now matches incoming payments to open invoices by amount, reference and payer, then marks them paid without a click. Partial payments stay open with the balance shown, and anything it is not sure about lands in a review queue for Maya and the finance team. Northwind cleared 212 invoices on launch day with four left to check.",
  },
  {
    version: "v3.1",
    date: "22 Sep 2026",
    title: "Runway forecast",
    body: "The cash page gained a forecast line that blends recurring bills, payroll and the invoices most likely to be paid this month. Drag the hiring slider to see how three new engineers move the runway date. Theo Okafor from the Growth team asked for scenarios to be saved and shared; they now live beside the plan.",
  },
  {
    version: "v3.0",
    date: "02 Aug 2026",
    title: "Workspaces and roles",
    body: "Every company gets its own workspace with owners, approvers and viewers. Approvals route to the right person by amount, so Priya can sign off on anything under 5,000 while larger spends wait for Sam. Audit history records who changed what and when, exportable for your accountant in one file.",
  },
]

function Node({ top, x, y, color }: { top: number; x: number; y: MotionValue<number>; color: string }) {
  const lit = useTransform(y, (v) => (v >= top ? 1 : 0))
  return (
    <g transform={`translate(${x} ${top})`}>
      <circle r={5} fill="var(--bg)" stroke="var(--border-strong)" strokeWidth={1.5} />
      <motion.circle r={5} fill={color} style={{ opacity: lit }} />
      <motion.circle r={1.8} fill="var(--on-accent)" style={{ opacity: lit }} />
    </g>
  )
}

function TracingBeam({ items = DEFAULT_ITEMS, children, color = "var(--accent)", rail = 40, className }: TracingBeamProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const [h, setH] = React.useState(0)
  const [tops, setTops] = React.useState<number[]>([])
  const x = Math.max(16, rail) / 2
  const inset = 6

  // Measure on the client only, so the server renders an empty rail and hydration matches.
  React.useEffect(() => {
    const el = ref.current
    const content = contentRef.current
    if (!el || !content) return
    const measure = () => {
      const box = el.getBoundingClientRect()
      const next = Array.from(content.children).map((c) => Math.round(c.getBoundingClientRect().top - box.top) + 10)
      setH(Math.round(box.height))
      setTops((prev) => (prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    for (const c of Array.from(content.children)) ro.observe(c)
    return () => ro.disconnect()
  }, [items, children])

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.72", "end 0.55"] })
  const smooth = useSpring(scrollYProgress, { stiffness: 400, damping: 40, restDelta: 0.0005 })
  const progress = reduce ? scrollYProgress : smooth
  const y = useTransform(progress, [0, 1], [inset, Math.max(inset, h - inset)])
  const hotLength = useTransform(progress, (p) => Math.min(0.12, p))
  const hotOffset = useTransform(progress, (p) => Math.max(0, p - 0.12))
  const d = `M ${x} ${inset} V ${Math.max(inset, h - inset)}`

  return (
    <section ref={ref} data-slot="tracing-beam" className={cn("relative w-full max-w-2xl", className)}>
      <svg
        aria-hidden
        data-slot="tracing-beam-rail"
        className="pointer-events-none absolute top-0 left-0 z-0 overflow-visible"
        width={Math.max(16, rail)}
        height={h}
        viewBox={`0 0 ${Math.max(16, rail)} ${h}`}
      >
        <defs>
          <linearGradient id={`${id}-beam`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={h || 1}>
            <stop offset="0" stopColor={color} stopOpacity="0.4" />
            <stop offset="1" stopColor={color} />
          </linearGradient>
          <radialGradient id={`${id}-glow`}>
            <stop offset="0" stopColor={color} stopOpacity="0.55" />
            <stop offset="0.5" stopColor={color} stopOpacity="0.18" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        {h > 0 && (
          <>
            <path d={d} fill="none" stroke="var(--border-strong)" strokeWidth={1.5} strokeLinecap="round" />
            <motion.path d={d} fill="none" stroke={`url(#${id}-beam)`} strokeWidth={2.5} style={{ pathLength: progress }} />
            <motion.path d={d} fill="none" stroke="var(--accent-2)" strokeWidth={3} style={{ pathLength: hotLength, pathOffset: hotOffset }} />
            {tops.map((top, i) => (
              <Node key={i} top={top} x={x} y={y} color={color} />
            ))}
            <motion.g style={{ y, x }}>
              <circle r={18} fill={`url(#${id}-glow)`} />
              <circle r={4} fill={color} />
              <circle r={1.6} fill="var(--on-accent)" />
            </motion.g>
          </>
        )}
      </svg>
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col gap-10"
        style={{ paddingLeft: Math.max(16, rail) + 8 }}
      >
        {children ??
          items.map((it, i) => (
            <article key={i} data-slot="tracing-beam-entry" className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-fg-subtle">
                {it.version && (
                  <span className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-2xs text-fg-muted shadow-xs">
                    {it.version}
                  </span>
                )}
                {it.date && <time>{it.date}</time>}
              </div>
              <h3 className="text-xl font-medium tracking-[-0.014em] text-balance text-fg">{it.title}</h3>
              <p className="max-w-[60ch] text-sm leading-[1.6] text-pretty text-fg-muted">{it.body}</p>
            </article>
          ))}
      </div>
    </section>
  )
}

export { TracingBeam }
export type { TracingBeamProps, TracingBeamItem }
