"use client"
import * as React from "react"
import { motion, useReducedMotion, animate } from "motion/react"
import { cn } from "@/lib/utils"

function useCount(to: number, play: boolean) {
  const [v, setV] = React.useState(0)
  React.useEffect(() => {
    if (!play) { setV(to); return }
    const controls = animate(0, to, {
      duration: 1.1,
      ease: [0.2, 0, 0, 1],
      onUpdate: (n) => setV(Math.round(n)),
    })
    return () => controls.stop()
  }, [to, play])
  return v
}

function MetricCell({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const [play, setPlay] = React.useState(!!reduce)
  React.useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setPlay(true) }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [reduce])
  const n = useCount(value, play)
  return (
    <div ref={ref} className="rounded-2xl border border-border bg-surface p-5 shadow-highlight">
      <p className="text-[11px] font-medium uppercase tracking-[0.01em] text-fg-muted">{label}</p>
      <p className="mt-2 text-3xl font-medium tabular-nums tracking-[-0.022em] text-fg">
        {n}{suffix}
      </p>
    </div>
  )
}

function MetricTickerBoard({ className }: { className?: string }) {
  return (
    <section data-slot="metric-ticker-board" data-tier="premium" className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      <MetricCell label="Registry items" value={460} suffix="+" />
      <MetricCell label="Motion pieces" value={71} />
      <MetricCell label="Gallery routes" value={52} />
      <MetricCell label="A11y gate" value={100} suffix="%" />
    </section>
  )
}
export { MetricTickerBoard }
