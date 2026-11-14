"use client"
import * as React from "react"
import { StarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Rating — a row of stars people click or arrow through to give a 1 to `max` score.
 *
 * Use it for reviews and feedback prompts. It is a radio group: Tab lands on the current star,
 * arrow keys move and select, hover previews. Pass `readOnly` to display an average without
 * input. For a numeric scale with labels use SegmentedControl.
 *
 * @example
 * const [score, setScore] = React.useState(0)
 * <Rating value={score} onChange={setScore} aria-label="Rate your onboarding" />
 * <Rating value={4} readOnly aria-label="Average rating, 4 out of 5" />
 */

type RatingProps = {
  /** Controlled score, 0 for none. */
  value?: number
  /** Starting score when uncontrolled. */
  defaultValue?: number
  /** Fires with the picked score. */
  onChange?: (value: number) => void
  /** Number of stars. */
  max?: number
  disabled?: boolean
  /** Show the score without letting people change it. */
  readOnly?: boolean
  className?: string
  /** Accessible name of the group. */
  "aria-label"?: string
}

function Rating({
  value,
  defaultValue = 0,
  onChange,
  max = 5,
  disabled,
  readOnly,
  className,
  ...a11y
}: RatingProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const [hover, setHover] = React.useState<number | null>(null)
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const current = value ?? internal
  const shown = hover ?? current
  const set = (n: number) => {
    if (readOnly || disabled) return
    if (value === undefined) setInternal(n)
    onChange?.(n)
  }
  const onKeyDown = (e: React.KeyboardEvent, n: number) => {
    const next =
      e.key === "ArrowRight" || e.key === "ArrowUp" ? (n % max) + 1
      : e.key === "ArrowLeft" || e.key === "ArrowDown" ? ((n - 2 + max) % max) + 1
      : e.key === "Home" ? 1
      : e.key === "End" ? max
      : 0
    if (!next) return
    e.preventDefault()
    refs.current[next - 1]?.focus()
    set(next)
  }
  const tabStop = Math.min(max, Math.max(1, Math.round(current)))
  return (
    <div
      data-slot="rating"
      role="radiogroup"
      aria-label={a11y["aria-label"] ?? "Rating"}
      aria-readonly={readOnly || undefined}
      aria-disabled={disabled || undefined}
      className={cn("inline-flex items-center gap-0.5", disabled && "opacity-45", className)}
      onPointerLeave={() => setHover(null)}
    >
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1
        const on = n <= shown
        return (
          <button
            key={n}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={n === Math.round(current)}
            aria-label={`${n} star${n === 1 ? "" : "s"}`}
            disabled={disabled}
            tabIndex={n === tabStop ? 0 : -1}
            className={cn(
              "rounded-md p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-accent",
              readOnly ? "cursor-default" : "cursor-pointer",
              "disabled:cursor-not-allowed"
            )}
            onPointerEnter={() => !readOnly && !disabled && setHover(n)}
            onClick={() => set(n)}
            onKeyDown={(e) => !readOnly && onKeyDown(e, n)}
          >
            <StarIcon
              aria-hidden
              className={cn(
                "size-4 transition-[color,fill] duration-[70ms] ease-hairline",
                on ? "fill-warning text-warning" : "text-fg-subtle"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
export { Rating }
export type { RatingProps }
