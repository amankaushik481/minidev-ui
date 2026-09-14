"use client"
import * as React from "react"
import { useInView, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function StatsCounter({
  value,
  label,
  className,
}: {
  value: number
  label: string
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [n, setN] = React.useState(0)
  React.useEffect(() => {
    if (!inView) return
    if (reduce) { setN(value); return }
    let frame = 0
    const total = 32
    const id = window.setInterval(() => {
      frame += 1
      setN(Math.round((value * frame) / total))
      if (frame >= total) window.clearInterval(id)
    }, 24)
    return () => window.clearInterval(id)
  }, [inView, value, reduce])
  return (
    <div ref={ref} data-slot="stats-counter" data-tier="premium" className={cn("rounded-xl border border-border bg-surface p-4 text-center shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]", className)}>
      <p className="text-3xl font-medium tracking-[-0.022em] tabular-nums text-fg" aria-label={`${value} ${label}`}>{n}</p>
      <p className="mt-1 text-xs text-fg-muted">{label}</p>
    </div>
  )
}
export { StatsCounter }
