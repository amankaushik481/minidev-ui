"use client"
import * as React from "react"
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Reading progress as a thin bar that fills along the top edge and a ring with the percent inside, for the page or any scrollable element.
 * Pin it to the viewport with `fixed`, point it at a scroller with
 * `container`, or give it children and it becomes its own scrolling panel.
 * The spring gives the bar a little weight as you scroll; reduced motion
 * tracks the scroll position exactly.
 */
type ScrollProgressProps = {
  /** Which indicators to show. */
  variant?: "bar" | "circle" | "both"
  /** A scrollable element to track instead of the window. The indicators render where you put them, inside a `relative` wrapper. */
  container?: React.RefObject<HTMLElement | null>
  /** Pin the indicators to the viewport and track the page (or `container`). Nothing else renders. */
  fixed?: boolean
  /** Bar thickness in pixels. */
  height?: number
  /** Ring diameter in pixels. */
  size?: number
  /** Without `fixed` or `container`, the component scrolls this content in its own panel. */
  children?: React.ReactNode
  /** Panel header title. */
  title?: React.ReactNode
  /** Panel header line under the title. */
  subtitle?: React.ReactNode
  className?: string
}

/** The release spring: quick enough to keep up with the scroll, soft enough to glide. */
const SPRING = { stiffness: 400, damping: 40, restDelta: 0.001 }

function Bar({ value, height, percent, className }: { value: MotionValue<number>; height: number; percent?: number; className?: string }) {
  // The bar is only announced when it is the sole indicator; otherwise the ring carries the role.
  const a11y = percent === undefined ? { "aria-hidden": true } : { role: "progressbar", "aria-label": "Reading progress", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": percent }
  return <motion.div data-slot="scroll-progress-bar" {...a11y} className={cn("origin-left bg-accent", className)} style={{ height, scaleX: value }} />
}

function Ring({ value, size, percent, className }: { value: MotionValue<number>; size: number; percent: number; className?: string }) {
  const label = useTransform(value, (v) => `${Math.round(Math.min(1, Math.max(0, v)) * 100)}%`)
  // Round caps would draw a dot at zero, so the arc only appears once there is something to show.
  const arcOpacity = useTransform(value, [0, 0.005], [0, 1])
  const stroke = 3
  const r = (size - stroke) / 2
  return (
    <div
      data-slot="scroll-progress-ring"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className={cn("relative grid place-items-center rounded-full bg-surface shadow-raised", className)}
      style={{ width: size, height: size }}
    >
      <svg aria-hidden className="absolute inset-0 -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <circle cx={size / 2} cy={size / 2} r={r} className="stroke-border" strokeWidth={stroke} />
        <motion.circle cx={size / 2} cy={size / 2} r={r} className="stroke-accent" strokeWidth={stroke} strokeLinecap="round" pathLength={1} style={{ pathLength: value, opacity: arcOpacity }} />
      </svg>
      <motion.span aria-hidden className="font-mono font-medium text-fg tabular-nums" style={{ fontSize: Math.max(9, Math.round(size * 0.24)) }}>
        {label}
      </motion.span>
    </div>
  )
}

const ARTICLE = [
  "Lumen 3.0 closes the books on its own. Every invoice you send is watched from the moment it leaves: opened, viewed, paid or overdue, with the next step already queued.",
  "Reminders go out on the schedule you set, in your voice, and stop the moment money lands. Customers on Lumen pay nine days sooner on average, and nobody on your team writes a chasing email again.",
  "Payments reconcile themselves. Lumen matches bank lines to invoices by amount, reference and timing, flags the rare miss, and posts the rest to the ledger while you sleep.",
  "At month end there is nothing to close. The numbers are already current, the reports are already drafted, and the board pack is waiting in your inbox on the first Monday.",
  "Every change is kept: who made it, when, and why. Auditors get a read-only seat, and your accountant gets the same live view you have.",
  "Lumen Pro is $24 a month per seat, billed yearly, with a 30-day trial that needs no card. Northwind, Acme and 4,000 other teams run their invoicing on it today.",
]

function ScrollProgress({ variant = "both", container, fixed = false, height = 3, size = 40, children, title = "What is new in Lumen 3.0", subtitle = "Release notes · 4 min read", className }: ScrollProgressProps) {
  const reduce = useReducedMotion()
  const panel = React.useRef<HTMLDivElement>(null)
  const own = !fixed && !container
  const { scrollYProgress } = useScroll({ container: own ? panel : container })
  const sprung = useSpring(scrollYProgress, SPRING)
  const value = reduce ? scrollYProgress : sprung
  const [percent, setPercent] = React.useState(0)
  useMotionValueEvent(scrollYProgress, "change", (v) => setPercent(Math.round(Math.min(1, Math.max(0, v)) * 100)))
  const showBar = variant !== "circle"
  const showRing = variant !== "bar"

  if (!own) {
    return (
      <div data-slot="scroll-progress" className={cn("pointer-events-none z-50", fixed ? "fixed inset-0" : "absolute inset-0", className)}>
        {showBar ? <Bar value={value} height={height} percent={showRing ? undefined : percent} className="absolute inset-x-0 top-0" /> : null}
        {showRing ? <Ring value={value} size={size} percent={percent} className={cn("absolute", fixed ? "right-4 bottom-4" : "top-3 right-3")} /> : null}
      </div>
    )
  }

  return (
    <div data-slot="scroll-progress" className={cn("relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-raised", className)}>
      <div className="flex h-14 items-center justify-between border-b border-border px-5">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-fg">{title}</p>
          {subtitle ? <p className="truncate text-[11px] text-fg-subtle">{subtitle}</p> : null}
        </div>
        {showRing ? <Ring value={value} size={size} percent={percent} /> : null}
      </div>
      <div className="relative">
        {showBar ? <Bar value={value} height={height} percent={showRing ? undefined : percent} className="absolute inset-x-0 top-0 z-10" /> : null}
        <div ref={panel} className="h-72 overflow-y-auto overscroll-contain px-5 py-5 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset sm:px-6" tabIndex={0} aria-label="Release notes">
          {children ?? (
            <div className="max-w-prose space-y-4">
              {ARTICLE.map((p, i) => (
                <p key={i} className="text-sm leading-[1.7] text-pretty text-fg-muted first:text-fg">
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { ScrollProgress }
export type { ScrollProgressProps }
