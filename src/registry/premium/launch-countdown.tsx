"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { MagneticCta } from "@/registry/premium/magnetic-cta"

function Unit({ label, value }: { label: string; value: number }) {
  const reduce = useReducedMotion()
  const v = String(value).padStart(2, "0")
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1" aria-label={`${value} ${label}`}>
        {v.split("").map((d, i) => (
          <motion.span
            key={`${label}-${i}-${d}`}
            initial={reduce ? false : { y: 10 }}
            animate={{ y: 0 }}
            className="inline-flex h-14 w-10 items-center justify-center rounded-lg border border-border bg-surface font-mono text-2xl font-medium tabular-nums text-fg shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]"
          >
            {d}
          </motion.span>
        ))}
      </div>
      <span className="text-[10px] font-medium tracking-[0.01em] text-fg-muted uppercase">{label}</span>
    </div>
  )
}

function LaunchCountdown({
  title = "Opens in",
  targetOffsetMs = 1000 * 60 * 60 * 36,
  className,
}: {
  title?: string
  targetOffsetMs?: number
  className?: string
}) {
  const target = React.useMemo(() => Date.now() + targetOffsetMs, [targetOffsetMs])
  const [left, setLeft] = React.useState(targetOffsetMs)
  React.useEffect(() => {
    const id = window.setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000)
    return () => window.clearInterval(id)
  }, [target])
  const s = Math.floor(left / 1000)
  const days = Math.floor(s / 86400)
  const hours = Math.floor((s % 86400) / 3600)
  const mins = Math.floor((s % 3600) / 60)
  const secs = s % 60
  return (
    <section
      data-slot="launch-countdown"
      data-tier="premium"
      className={cn(
        "flex flex-col items-center gap-8 rounded-2xl border border-border bg-bg px-6 py-16 text-center",
        className
      )}
    >
      <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{title}</p>
      <div className="flex flex-wrap items-end justify-center gap-4">
        <Unit label="Days" value={days} />
        <Unit label="Hours" value={hours} />
        <Unit label="Mins" value={mins} />
        <Unit label="Secs" value={secs} />
      </div>
      <MagneticCta>Join the waitlist</MagneticCta>
    </section>
  )
}
export { LaunchCountdown }
