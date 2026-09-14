"use client"
import { cn } from "@/lib/utils"

function StatWithSparkline({
  label,
  value,
  delta,
  points,
  className,
}: {
  label: string
  value: string
  delta?: string
  points: number[]
  className?: string
}) {
  const max = Math.max(...points, 1)
  return (
    <div
      data-slot="stat-with-sparkline"
      className={cn(
        "rounded-xl border border-border bg-surface p-4 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]",
        className
      )}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.01em] text-fg-muted">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-medium tabular-nums tracking-[-0.018em] text-fg">{value}</p>
          {delta ? <p className="mt-0.5 text-xs text-fg-muted">{delta}</p> : null}
        </div>
        <div className="flex h-8 items-end gap-0.5" aria-hidden>
          {points.map((n, i) => (
            <span key={i} className="w-1 rounded-sm bg-accent/80" style={{ height: `${(n / max) * 100}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
export { StatWithSparkline }
