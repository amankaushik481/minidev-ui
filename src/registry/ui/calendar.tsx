"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * Calendar — a month grid for picking one date, a range or several dates, with arrow-key navigation and a range preview on hover.
 *
 * Use it inline or inside a Popover when people need to see the month: bookings, report periods, availability. Set `mode` to
 * "single", "range" or "multiple"; `value` is then a `Date`, a `{ from, to }` range or a `Date[]`. `months={2}` shows two months
 * side by side from the `sm` breakpoint, and `presets` adds a rail of ready-made ranges in range mode. Bound it with `min`, `max`
 * and `disabled`. Month and day names come from `Intl.DateTimeFormat` in `locale`. It has no frame, so it sits flush in a
 * Popover or card; on its own add `className="rounded-xl border border-border bg-surface shadow-raised"`. For a typed native field use DatePicker or
 * DateRangePicker, for a date plus a time use DateTimePicker, and to show events use EventCalendar.
 *
 * @example
 * const [range, setRange] = React.useState<DateRange>()
 * <Calendar mode="range" months={2} value={range} onValueChange={setRange} defaultMonth={new Date(2026, 10, 1)} />
 */

type CalendarMode = "single" | "range" | "multiple"
/** A date range. `to` stays undefined until the second day is picked. */
type DateRange = { from: Date; to?: Date }
type CalendarValue<M extends CalendarMode> = M extends "range" ? DateRange : M extends "multiple" ? Date[] : Date
type CalendarPreset = { label: string; range: DateRange }

type CalendarProps<M extends CalendarMode = "single"> = {
  /** "single" picks one day, "range" a from/to pair, "multiple" any set of days. */
  mode?: M
  /** Controlled selection: a Date, a `{ from, to }` range or a Date[], to match `mode`. */
  value?: CalendarValue<M> | null
  /** Starting selection when uncontrolled. */
  defaultValue?: CalendarValue<M> | null
  /** Fires with the whole new selection on every pick. */
  onValueChange?: (value: CalendarValue<M>) => void
  /** Months shown at once. Two sit side by side from the sm breakpoint and stack on phones. */
  months?: 1 | 2
  /** The first month shown. Defaults to the selection's month, else the current month. */
  defaultMonth?: Date
  /** Earliest day that can be picked. */
  min?: Date
  /** Latest day that can be picked. */
  max?: Date
  /** Days that cannot be picked: a list of dates or a test function. */
  disabled?: Date[] | ((date: Date) => boolean)
  /** First column of the week: 0 is Sunday, 1 is Monday. */
  weekStartsOn?: 0 | 1
  /** BCP 47 locale for month, weekday and day labels. Fixed by default so server and client render the same text. */
  locale?: string
  /** Ready-made ranges shown in a rail beside the grid. Range mode only. */
  presets?: CalendarPreset[]
  /** Show the days of the previous and next month in muted text. */
  showOutsideDays?: boolean
  className?: string
}

const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const
// Exit is faster than entry.
const SLIDE = { enter: (d: number) => ({ x: d * 24, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d: number) => ({ x: d * -24, opacity: 0, transition: { duration: 0.16 } }) }
// Date math on local midnights. k() is a sortable day key (months count from 0): 20261014 is 14 Nov 2026.
const at = (y: number, m: number, d: number) => new Date(y, m, d)
const addDays = (d: Date, n: number) => at(d.getFullYear(), d.getMonth(), d.getDate() + n)
const day = (d: Date) => addDays(d, 0)
const firstOf = (d: Date) => at(d.getFullYear(), d.getMonth(), 1)
// Clamp the day so 31 Jan plus one month is 28 Feb, not 3 Mar.
const addMonths = (d: Date, n: number) => at(d.getFullYear(), d.getMonth() + n, Math.min(d.getDate(), at(d.getFullYear(), d.getMonth() + n + 1, 0).getDate()))
const k = (d: Date) => d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate()
const fromK = (n: number) => at(Math.floor(n / 10000), Math.floor(n / 100) % 100, n % 100)
const monthDiff = (a: Date, b: Date) => (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth()
const noSubscribe = () => () => {}

function Calendar<M extends CalendarMode = "single">({
  mode = "single" as M,
  value,
  defaultValue = null,
  onValueChange,
  months = 1,
  defaultMonth,
  min,
  max,
  disabled,
  weekStartsOn = 0,
  locale = "en-US",
  presets,
  showOutsideDays = true,
  className,
}: CalendarProps<M>) {
  const reduce = useReducedMotion()
  const root = React.useRef<HTMLDivElement>(null)
  const pendingFocus = React.useRef(false)
  // Today is client-only: null on the server and during hydration, so static HTML never disagrees with the browser.
  const today = React.useSyncExternalStore(noSubscribe, () => k(new Date()), () => null)
  const [inner, setInner] = React.useState(defaultValue)
  const [view, setView] = React.useState<Date | null>(null)
  const [dir, setDir] = React.useState(1)
  const [focus, setFocus] = React.useState<number | null>(null)
  const [hover, setHover] = React.useState<number | null>(null)

  const fmt = React.useMemo(() => {
    const f = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale, o)
    // 4 Jan 2026 is a Sunday.
    const weekdays = Array.from({ length: 7 }, (_, i) => at(2026, 0, 4 + ((i + weekStartsOn) % 7)))
    return { caption: f({ month: "long", year: "numeric" }), full: f({ dateStyle: "full" }), num: f({ day: "numeric" }), weekdays: weekdays.map((d) => [f({ weekday: "short" }).format(d), f({ weekday: "long" }).format(d)]) }
  }, [locale, weekStartsOn])

  const sel = value !== undefined ? value : inner
  const single = mode === "single" && sel instanceof Date ? sel : null
  const range = mode === "range" && sel && !(sel instanceof Date) && !Array.isArray(sel) ? (sel as DateRange) : null
  const multi = mode === "multiple" && Array.isArray(sel) ? sel : []
  const anchor = defaultMonth ?? single ?? range?.from ?? multi[0] ?? (today ? fromK(today) : null)
  const first = view ?? (anchor ? firstOf(anchor) : null)

  React.useEffect(() => {
    if (!pendingFocus.current || !first) return
    pendingFocus.current = false
    root.current?.querySelector<HTMLElement>(`[data-view="${k(first)}"] [data-day="${focus}"]:not([data-outside])`)?.focus()
  })

  const off = (d: Date) =>
    (min && d < day(min)) || (max && d > day(max)) || (Array.isArray(disabled) ? disabled.some((x) => k(x) === k(d)) : disabled?.(d)) || false

  if (!first) return <div data-slot="calendar" className={cn("min-h-80 min-w-64 p-3", className)} />

  const panels = Array.from({ length: months }, (_, i) => addMonths(first, i))
  const inView = (key: number | null | undefined) => key != null && key >= k(first) && key < k(addMonths(first, months))
  const tabKey = [focus, single && k(single), range && k(range.from), multi[0] && k(multi[0]), today].find(inView) ?? k(first)

  const shiftTo = (n: Date) => {
    setDir(monthDiff(first, n) < 0 ? -1 : 1)
    setView(n)
  }
  const reveal = (d: Date) => {
    const diff = monthDiff(first, d)
    if (diff < 0) shiftTo(firstOf(d))
    else if (diff >= months) shiftTo(addMonths(firstOf(d), 1 - months))
  }
  const moveFocus = (d: Date) => {
    if (min && d < min) d = day(min)
    if (max && d > max) d = day(max)
    reveal(d)
    setFocus(k(d))
    pendingFocus.current = true
  }
  const commit = (next: CalendarValue<M>) => {
    if (value === undefined) setInner(next)
    onValueChange?.(next)
  }
  const pick = (d: Date) => {
    if (off(d)) return
    setFocus(k(d))
    reveal(d)
    if (mode === "range") commit((!range || range.to || k(d) < k(range.from) ? { from: d } : { from: range.from, to: d }) as CalendarValue<M>)
    else if (mode === "multiple") commit((multi.some((x) => k(x) === k(d)) ? multi.filter((x) => k(x) !== k(d)) : [...multi, d].sort((a, b) => +a - +b)) as CalendarValue<M>)
    else commit(d as CalendarValue<M>)
  }
  const onKey = (e: React.KeyboardEvent, d: Date) => {
    const wd = (d.getDay() - weekStartsOn + 7) % 7
    const step = e.shiftKey ? 12 : 1 // Shift+PageUp/PageDown moves a year
    const to: Record<string, Date> = { ArrowLeft: addDays(d, -1), ArrowRight: addDays(d, 1), ArrowUp: addDays(d, -7), ArrowDown: addDays(d, 7), Home: addDays(d, -wd), End: addDays(d, 6 - wd), PageUp: addMonths(d, -step), PageDown: addMonths(d, step) }
    if (!to[e.key]) return
    e.preventDefault()
    moveFocus(to[e.key])
  }

  // The band runs from `lo` to `hi`: the committed range, or a preview from `from` to the hovered or focused day.
  const preview = range && !range.to && hover != null
  const lo = range ? (preview ? Math.min(k(range.from), hover) : range.to && k(range.from)) : null
  const hi = range ? (preview ? Math.max(k(range.from), hover) : range.to && k(range.to)) : null
  const prevOff = min ? k(first) <= k(firstOf(min)) : false
  const nextOff = max ? monthDiff(first, max) < months : false
  const captions = panels.map((m) => fmt.caption.format(m))

  return (
    <div
      ref={root}
      data-slot="calendar"
      className={cn("inline-flex flex-col gap-3 p-3 text-fg sm:flex-row", className)}
    >
      {mode === "range" && presets?.length ? (
        <div role="group" aria-label="Preset ranges" className="flex w-0 min-w-full gap-1 overflow-x-auto border-b border-border pb-2 sm:w-36 sm:min-w-0 sm:flex-col sm:overflow-visible sm:border-r sm:border-b-0 sm:pr-3 sm:pb-0">
          {presets.map((p) => {
            const on = !!range?.to && k(range.from) === k(p.range.from) && !!p.range.to && k(range.to) === k(p.range.to)
            return (
              <button
                key={p.label}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  commit(p.range as CalendarValue<M>)
                  setFocus(k(p.range.from))
                  if (!inView(k(p.range.from))) shiftTo(firstOf(p.range.from))
                }}
                className={cn(
                  "h-8 shrink-0 rounded-lg px-2.5 text-left text-[0.8125rem] whitespace-nowrap outline-none transition-[background-color,color] duration-[70ms] ease-hairline focus-visible:ring-2 focus-visible:ring-accent",
                  on ? "bg-accent-soft font-medium text-accent-fg" : "text-fg-muted hover:bg-sunken hover:text-fg"
                )}
              >
                {p.label}
              </button>
            )
          })}
        </div>
      ) : null}
      <div className="relative">
        <span aria-live="polite" className="sr-only">{captions.join(", ")}</span>
        <Button variant="ghost" size="icon-sm" aria-label="Previous month" disabled={prevOff} onClick={() => shiftTo(addMonths(first, -1))} className="absolute top-0 left-0 z-10">
          <ChevronLeftIcon />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Next month" disabled={nextOff} onClick={() => shiftTo(addMonths(first, 1))} className="absolute top-0 right-0 z-10">
          <ChevronRightIcon />
        </Button>
        <AnimatePresence initial={false} mode="popLayout" custom={dir}>
          <motion.div
            key={k(first)}
            data-view={k(first)}
            custom={dir}
            variants={SLIDE}
            initial="enter"
            animate="center"
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : "exit"}
            transition={reduce ? { duration: 0 } : SNAPPY}
            className="flex flex-col gap-4 sm:flex-row sm:gap-6"
          >
            {panels.map((m, pi) => {
              const start = addDays(m, -((m.getDay() - weekStartsOn + 7) % 7))
              return (
                <div key={pi} className="flex flex-col gap-2">
                  <div aria-hidden className="flex h-8 items-center justify-center text-sm font-medium">{captions[pi]}</div>
                  <div
                    role="grid"
                    aria-label={captions[pi]}
                    aria-multiselectable={mode !== "single" || undefined}
                    onPointerLeave={() => setHover(null)}
                    className="flex flex-col gap-1"
                  >
                    <div role="row" className="grid grid-cols-7">
                      {fmt.weekdays.map(([s, l]) => (
                        <div key={l} role="columnheader" aria-label={l} className="flex h-8 items-center justify-center text-xs text-fg-subtle">{s}</div>
                      ))}
                    </div>
                    {Array.from({ length: 6 }, (_, w) => (
                      <div key={w} role="row" className="grid grid-cols-7">
                        {Array.from({ length: 7 }, (_, col) => {
                          const d = addDays(start, w * 7 + col)
                          const kd = k(d)
                          const outside = d.getMonth() !== m.getMonth()
                          if (outside && !showOutsideDays) return <div key={col} role="gridcell" className="size-9" />
                          const picked = single ? kd === k(single) : range ? kd === k(range.from) || (!!range.to && kd === k(range.to)) : multi.some((x) => k(x) === kd)
                          const band = lo != null && hi != null && lo !== hi && kd >= lo && kd <= hi
                          const isOff = off(d)
                          return (
                            <div key={col} role="gridcell" aria-selected={picked || (band && !preview) || undefined} className="relative">
                              {band ? (
                                <span aria-hidden className={cn("absolute inset-y-0", kd === lo ? "right-0 left-1/2" : kd === hi ? "right-1/2 left-0" : "inset-x-0", preview ? "bg-accent/5" : "bg-accent/10", col === 0 && "rounded-l-lg", col === 6 && "rounded-r-lg")} />
                              ) : null}
                              <button
                                type="button"
                                data-day={kd}
                                data-outside={outside || undefined}
                                tabIndex={!outside && kd === tabKey ? 0 : -1}
                                aria-label={fmt.full.format(d)}
                                aria-current={kd === today ? "date" : undefined}
                                aria-disabled={isOff || undefined}
                                onClick={() => pick(d)}
                                onKeyDown={(e) => onKey(e, d)}
                                onPointerEnter={() => setHover(kd)}
                                onFocus={() => setHover(kd)}
                                className={cn(
                                  "relative flex size-9 items-center justify-center rounded-lg text-sm tabular-nums outline-none transition-[background-color,color] duration-[70ms] ease-hairline",
                                  "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                                  picked ? "bg-accent font-medium text-on-accent shadow-ink hover:bg-accent-hover" : band ? "hover:bg-accent/15" : "hover:bg-sunken",
                                  !picked && outside && "text-fg-subtle",
                                  !picked && kd === today && "font-semibold text-accent-fg",
                                  kd === today && "after:absolute after:bottom-1 after:size-1 after:rounded-full after:bg-current",
                                  preview && kd === hover && !picked && "ring-1 ring-accent-line ring-inset",
                                  isOff && "cursor-not-allowed text-fg-subtle opacity-50 hover:bg-transparent"
                                )}
                              >
                                {fmt.num.format(d)}
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export { Calendar }
export type { CalendarProps, CalendarPreset, DateRange }
