"use client"
import { cn } from "@/lib/utils"

function ProgressCircle({
  value = 72,
  size = 40,
  className,
  label,
}: {
  value?: number
  size?: number
  className?: string
  label?: string
}) {
  const r = (size - 4) / 2
  const c = 2 * Math.PI * r
  const pct = Math.min(100, Math.max(0, value))
  const offset = c - (pct / 100) * c
  return (
    <div data-slot="progress-circle" className={cn("inline-flex flex-col items-center gap-1", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={label ?? `Progress ${pct}%`} role="img">
        <circle cx={size / 2} cy={size / 2} r={r} className="stroke-border" strokeWidth="3" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="stroke-accent"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="font-mono text-[10px] tabular-nums text-fg-muted">{pct}%</span>
    </div>
  )
}
export { ProgressCircle }
