"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { NumberRoll } from "@/registry/ui/number-roll"
import { MagneticCta } from "@/registry/premium/magnetic-cta"

/**
 * A launch countdown in days, hours, minutes and seconds whose digits roll like an odometer, above a magnetic call to action.
 * Pass `target` for a real launch date; without it the clock counts down
 * `targetOffsetMs` from mount, which suits demos. Each digit springs to its
 * place instead of swapping. The clock is a `timer` region: screen readers
 * read the time left when they reach it but are not interrupted every second.
 * Reduced motion swaps digits instantly.
 *
 * Use it for a pre-launch or waitlist page. Reach for FlipStatBoard or
 * StatsCounter for figures that do not tick, and NumberRoll for one number.
 *
 * @example
 * <LaunchCountdown target="2026-12-01T09:00:00Z" title="Lumen 3.0 opens in" cta="Join the waitlist" />
 */
type LaunchCountdownProps = {
  /** Label above the clock. */
  title?: string
  /** The moment the clock reaches zero: a Date, an ISO string or epoch milliseconds. Overrides `targetOffsetMs`. */
  target?: Date | string | number
  /** Without `target`, count down this many milliseconds from mount. */
  targetOffsetMs?: number
  /** Call to action under the clock. Pass null to hide it. */
  cta?: React.ReactNode
  /** Called once when the clock reaches zero. */
  onComplete?: () => void
  className?: string
}

const TWO = { minimumIntegerDigits: 2, useGrouping: false } satisfies Intl.NumberFormatOptions

function Unit({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <NumberRoll
        value={value}
        format={TWO}
        className="h-14 min-w-20 items-center justify-center rounded-lg border border-border bg-surface px-3 font-mono text-3xl font-medium text-fg shadow-highlight"
      />
      <span className="text-[10px] font-medium tracking-[0.01em] text-fg-muted uppercase">{label}</span>
    </div>
  )
}

function LaunchCountdown({
  title = "Opens in",
  target,
  targetOffsetMs = 1000 * 60 * 60 * 36,
  cta = "Join the waitlist",
  onComplete,
  className,
}: LaunchCountdownProps) {
  const at = target === undefined ? NaN : new Date(target).getTime()
  const fixed = Number.isFinite(at) ? at : null
  // The server and first client render agree on the offset; a fixed target is corrected on mount.
  const [left, setLeft] = React.useState(fixed === null ? targetOffsetMs : 0)
  const completeRef = React.useRef(onComplete)
  React.useEffect(() => {
    completeRef.current = onComplete
  }, [onComplete])

  React.useEffect(() => {
    const end = fixed ?? Date.now() + targetOffsetMs
    let id = 0
    const tick = () => {
      const ms = Math.max(0, end - Date.now())
      setLeft(ms)
      if (ms === 0) {
        window.clearInterval(id)
        completeRef.current?.()
      }
    }
    tick()
    id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [fixed, targetOffsetMs])

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
      <div role="timer" aria-label={title} className="flex flex-wrap items-end justify-center gap-4">
        <Unit label="Days" value={days} />
        <Unit label="Hours" value={hours} />
        <Unit label="Mins" value={mins} />
        <Unit label="Secs" value={secs} />
      </div>
      {cta ? <MagneticCta>{cta}</MagneticCta> : null}
    </section>
  )
}
export { LaunchCountdown }
export type { LaunchCountdownProps }
