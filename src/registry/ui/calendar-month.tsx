"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A single month grid for picking a day, with real weekday alignment and full keyboard support.
 *
 * Use inline or inside a `Popover` to pick a date. Prefer `DatePicker` for a form field with a
 * native picker, `DateRangePicker` for from/to, and `EventCalendar` to show events. Selection is
 * controlled: pass `selected` and `onSelect`. Keyboard: one Tab stop; Arrow keys move by day or
 * week, Home/End jump to the first/last day, Enter or Space selects. Each day is announced with its
 * full date, and the selected day is `aria-pressed`.
 *
 * @example
 * const [day, setDay] = React.useState<number>()
 * <CalendarMonth month={new Date(2026, 10, 1)} selected={day} onSelect={setDay} />
 */
type CalendarMonthProps = {
  /** Any date inside the month to show. Defaults to September 2026. */
  month?: Date
  /** Selected day of the month, 1 to 31. */
  selected?: number
  /** Called with the day of the month that was picked. */
  onSelect?: (day: number) => void
  className?: string
}

const DEFAULT_MONTH = new Date(2026, 8, 1)
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
// Fixed locale so the server and client render the same labels.
const monthFmt = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" })
const dayFmt = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })

function CalendarMonth({ month = DEFAULT_MONTH, selected, onSelect, className }: CalendarMonthProps) {
  const year = month.getFullYear()
  const m = month.getMonth()
  const count = new Date(year, m + 1, 0).getDate()
  const offset = new Date(year, m, 1).getDay()
  const title = monthFmt.format(new Date(year, m, 1))
  const [focusDay, setFocusDay] = React.useState(selected ?? 1)
  const tabDay = Math.min(count, Math.max(1, focusDay))
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])

  const move = (to: number) => {
    const d = Math.min(count, Math.max(1, to))
    setFocusDay(d)
    refs.current[d]?.focus()
  }

  return (
    <div data-slot="calendar-month" className={cn("w-72 rounded-xl border border-border p-3", className)}>
      <div aria-hidden className="mb-2 text-sm font-medium text-fg">{title}</div>
      <div role="group" aria-label={title} className="grid grid-cols-7 gap-1 text-center text-xs text-fg-muted">
        {WEEKDAYS.map((d) => (
          <div key={d} aria-hidden className="py-1">{d[0]}</div>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <div key={`pad-${i}`} aria-hidden />
        ))}
        {Array.from({ length: count }, (_, i) => {
          const d = i + 1
          const on = selected === d
          return (
            <button
              key={d}
              ref={(el) => {
                refs.current[d] = el
              }}
              type="button"
              tabIndex={d === tabDay ? 0 : -1}
              aria-label={dayFmt.format(new Date(year, m, d))}
              aria-pressed={on}
              onClick={() => {
                setFocusDay(d)
                onSelect?.(d)
              }}
              onKeyDown={(e) => {
                const to =
                  e.key === "ArrowRight" ? d + 1 : e.key === "ArrowLeft" ? d - 1 : e.key === "ArrowDown" ? d + 7 : e.key === "ArrowUp" ? d - 7 : e.key === "Home" ? 1 : e.key === "End" ? count : null
                if (to == null) return
                e.preventDefault()
                move(to)
              }}
              className={cn(
                "h-8 cursor-pointer rounded-lg tabular-nums text-fg outline-none transition-[background-color,color] duration-[70ms] hover:bg-sunken",
                "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                on && "bg-accent font-medium text-on-accent hover:bg-accent-hover"
              )}
            >
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}
export { CalendarMonth }
export type { CalendarMonthProps }
