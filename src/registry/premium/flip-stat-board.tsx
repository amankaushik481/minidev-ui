"use client"
import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function FlipDigit({ value }: { value: string }) {
  const reduce = useReducedMotion()
  return (
    <span className="relative inline-flex h-10 w-7 items-center justify-center overflow-hidden rounded-md border border-border bg-surface shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]">
      <motion.span
        key={value}
        initial={reduce ? false : { y: 14 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="font-mono text-lg font-medium tabular-nums text-fg"
      >
        {value}
      </motion.span>
    </span>
  )
}

function FlipStat({
  value,
  label,
}: {
  value: number
  label: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [n, setN] = React.useState(0)
  React.useEffect(() => {
    if (!inView) return
    if (reduce) {
      setN(value)
      return
    }
    let frame = 0
    const frames = 28
    const id = window.setInterval(() => {
      frame += 1
      setN(Math.round((value * frame) / frames))
      if (frame >= frames) window.clearInterval(id)
    }, 28)
    return () => window.clearInterval(id)
  }, [inView, value, reduce])
  const digits = String(n).padStart(String(value).length, "0").split("")
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex gap-1" aria-label={`${value} ${label}`}>
        {digits.map((d, i) => (
          <FlipDigit key={`${i}-${d}`} value={d} />
        ))}
      </div>
      <p className="text-xs text-fg-muted">{label}</p>
    </div>
  )
}

function FlipStatBoard({
  stats = [
    { value: 400, label: "Registry items" },
    { value: 49, label: "Galleries" },
    { value: 27, label: "Premium blocks" },
  ],
  className,
}: {
  stats?: { value: number; label: string }[]
  className?: string
}) {
  return (
    <div
      data-slot="flip-stat-board"
      data-tier="premium"
      className={cn("grid gap-6 rounded-2xl border border-border bg-sunken p-6 sm:grid-cols-3", className)}
    >
      {stats.map((s) => (
        <FlipStat key={s.label} value={s.value} label={s.label} />
      ))}
    </div>
  )
}
export { FlipStatBoard }
