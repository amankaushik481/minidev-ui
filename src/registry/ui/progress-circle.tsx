"use client"
import { cn } from "@/lib/utils"

/**
 * ProgressCircle — a small ring that fills clockwise to a percentage, with the number underneath.
 *
 * Use it for compact determinate progress in cards, lists and table cells. For a full width bar
 * use Progress; for several goals at once use RadialChart.
 *
 * @example
 * <ProgressCircle value={64} label="Upload progress" />
 * <ProgressCircle value={30} size={56} showValue={false} />
 */
function ProgressCircle({
  value = 72,
  size = 40,
  showValue = true,
  className,
  label,
}: {
  /** Percent complete, clamped to 0..100. */
  value?: number
  /** Width and height of the ring in px. Use an even number. */
  size?: number
  /** Show the percentage under the ring. */
  showValue?: boolean
  className?: string
  /** Accessible name. Defaults to "Progress". */
  label?: string
}) {
  const r = (size - 4) / 2
  const c = 2 * Math.PI * r
  const pct = Math.round(Math.min(100, Math.max(0, value)))
  const offset = c - (pct / 100) * c
  return (
    <div
      data-slot="progress-circle"
      role="progressbar"
      aria-label={label ?? "Progress"}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("inline-flex flex-col items-center gap-1", className)}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} className="stroke-border" strokeWidth="3" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="stroke-accent transition-[stroke-dashoffset] duration-200 ease-hairline"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {showValue ? (
        <span aria-hidden className="font-mono text-[10px] tabular-nums text-fg-muted">
          {pct}%
        </span>
      ) : null}
    </div>
  )
}
export { ProgressCircle }
