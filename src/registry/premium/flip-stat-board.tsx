"use client"
import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A row of stat tiles whose digits count up on split-flap cards when the board scrolls into view.
 *
 * Each digit is its own card that springs up as it changes, set in tabular
 * mono so nothing shifts. Counting runs once, when the board is 60% on
 * screen. Screen readers get the final value and label, never the count.
 * Reduced motion shows the final numbers at once. Use it for a few headline
 * metrics on a marketing or investor page; for a live number that changes
 * in place use NumberRoll, and for a KPI card with trend use a stat card.
 *
 * @example
 * <FlipStatBoard stats={[{ value: 1284, label: "Invoices paid" }, { value: 312, label: "Teams" }]} />
 */
type FlipStat = {
  /** Whole number to count up to. Leading zeros pad it to its final width. */
  value: number
  /** Caption under the digits. Must be unique within the board. */
  label: string
}

type FlipStatBoardProps = {
  /** Stats to show, left to right. Two to four read best. */
  stats?: FlipStat[]
  className?: string
}

const ROLL = { type: "spring", stiffness: 260, damping: 28, mass: 0.9 } as const

function FlipDigit({ value }: { value: string }) {
  const reduce = useReducedMotion()
  return (
    <span className="relative inline-flex h-10 w-7 items-center justify-center overflow-hidden rounded-md border border-border bg-surface shadow-highlight">
      <motion.span
        key={value}
        initial={reduce ? false : { y: 14 }}
        animate={{ y: 0 }}
        transition={reduce ? { duration: 0 } : ROLL}
        className="font-mono text-lg font-medium text-fg tabular-nums"
      >
        {value}
      </motion.span>
    </span>
  )
}

function FlipStatTile({ value, label }: FlipStat) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [n, setN] = React.useState(0)
  React.useEffect(() => {
    if (!inView || reduce) return
    let frame = 0
    const frames = 28
    const id = window.setInterval(() => {
      frame += 1
      setN(Math.round((value * frame) / frames))
      if (frame >= frames) window.clearInterval(id)
    }, 28)
    return () => window.clearInterval(id)
  }, [inView, value, reduce])
  // Derived, so a reduced-motion user sees the final value on the first render too.
  const shown = reduce ? value : n
  const digits = String(shown).padStart(String(value).length, "0").split("")
  return (
    <div ref={ref} className="space-y-2">
      <span className="sr-only">
        {value.toLocaleString("en-US")} {label}
      </span>
      <div className="flex gap-1" aria-hidden>
        {digits.map((d, i) => (
          <FlipDigit key={`${i}-${d}`} value={d} />
        ))}
      </div>
      <p aria-hidden className="text-xs text-fg-muted">
        {label}
      </p>
    </div>
  )
}

function FlipStatBoard({
  stats = [
    { value: 1284, label: "Invoices paid this week" },
    { value: 312, label: "Teams on Lumen" },
    { value: 48, label: "Currencies settled" },
  ],
  className,
}: FlipStatBoardProps) {
  return (
    <div
      data-slot="flip-stat-board"
      data-tier="premium"
      className={cn("grid gap-6 rounded-2xl border border-border bg-sunken p-6 sm:grid-cols-3", className)}
    >
      {stats.map((s) => (
        <FlipStatTile key={s.label} value={s.value} label={s.label} />
      ))}
    </div>
  )
}
export { FlipStatBoard }
export type { FlipStatBoardProps, FlipStat }
