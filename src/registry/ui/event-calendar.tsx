"use client"
import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { SegmentedControl } from "@/registry/ui/segmented-control"

/** A week and day event scheduler with overlap layout, an all-day row, a current time line and click to create. */
type CalendarTone = "accent" | "info" | "success" | "warning" | "neutral"

type CalendarSource = { id: string; label: string; tone: CalendarTone }

type CalendarEvent = {
  id: string
  title: string
  start: Date
  end: Date
  /** Id of a calendar in `calendars`. Sets the colour. */
  calendar?: string
  allDay?: boolean
  location?: string
}

type CalendarView = "week" | "day"

type EventCalendarProps = {
  events?: CalendarEvent[]
  calendars?: CalendarSource[]
  /** Controlled view. */
  view?: CalendarView
  /** "auto" picks Day under 600px of width and Week above. */
  defaultView?: CalendarView | "auto"
  onViewChange?: (view: CalendarView) => void
  /** Any date inside the first week or day shown. Defaults to today. */
  defaultDate?: Date
  onDateChange?: (date: Date) => void
  /** 0 for Sunday, 1 for Monday. */
  weekStartsOn?: 0 | 1
  /** Hour the grid scrolls to on mount. */
  scrollToHour?: number
  /** Pixel height of one hour row. */
  hourHeight?: number
  /** Pixel height of the scrolling time grid. */
  height?: number
  /** Minutes a click on an empty slot snaps to. */
  slotMinutes?: number
  /** Called when an empty slot is clicked or chosen with the keyboard. */
  onCreate?: (range: { start: Date; end: Date }) => void
  onEventClick?: (event: CalendarEvent) => void
  locale?: string
  className?: string
}

const TONE: Record<CalendarTone, { block: string; bar: string; dot: string }> = {
  accent: { block: "bg-accent-soft hover:bg-accent/15", bar: "bg-accent", dot: "bg-accent" },
  info: { block: "bg-info/10 hover:bg-info/15", bar: "bg-info", dot: "bg-info" },
  success: { block: "bg-success/10 hover:bg-success/15", bar: "bg-success", dot: "bg-success" },
  warning: { block: "bg-warning/12 hover:bg-warning/18", bar: "bg-warning", dot: "bg-warning" },
  neutral: { block: "bg-fg/[0.06] hover:bg-fg/10", bar: "bg-fg-subtle", dot: "bg-fg-subtle" },
}

const CALENDARS: CalendarSource[] = [
  { id: "northwind", label: "Northwind", tone: "accent" },
  { id: "eng", label: "Engineering", tone: "info" },
  { id: "customers", label: "Customers", tone: "success" },
  { id: "releases", label: "Releases", tone: "warning" },
  { id: "personal", label: "Personal", tone: "neutral" },
]

const DAY_MS = 86_400_000
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n, d.getHours(), d.getMinutes())
const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
const startOfWeek = (d: Date, ws: number) => addDays(startOfDay(d), -((d.getDay() - ws + 7) % 7))
const at = (day: Date, h: number, m = 0) => new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m)

function sampleEvents(): CalendarEvent[] {
  const mon = startOfWeek(new Date(), 1)
  const d = (n: number) => addDays(mon, n)
  const ev: CalendarEvent[] = []
  for (let i = 0; i < 5; i++) ev.push({ id: `standup-${i}`, title: "Daily standup", start: at(d(i), 9, 30), end: at(d(i), 9, 45), calendar: "eng", location: "Zoom" })
  ev.push(
    { id: "planning", title: "Sprint planning", start: at(d(0), 11), end: at(d(0), 12), calendar: "eng", location: "Room Atlas" },
    { id: "acme", title: "Customer call: Acme Corp", start: at(d(0), 14), end: at(d(0), 14, 45), calendar: "customers", location: "Google Meet" },
    { id: "focus", title: "Focus: Lumen invoices v2", start: at(d(0), 15, 30), end: at(d(0), 17, 30), calendar: "personal" },
    { id: "design", title: "Design review", start: at(d(1), 10), end: at(d(1), 11, 30), calendar: "northwind", location: "Room Atlas" },
    { id: "globex", title: "Globex call", start: at(d(1), 10, 30), end: at(d(1), 11, 15), calendar: "customers", location: "Zoom" },
    { id: "lunch", title: "Lunch with Priya", start: at(d(1), 12, 30), end: at(d(1), 13, 30), calendar: "personal", location: "Pier 9 Cafe" },
    { id: "hiring", title: "Hiring loop: frontend", start: at(d(1), 15), end: at(d(1), 16), calendar: "northwind" },
    { id: "allhands", title: "Northwind all hands", start: at(d(2), 12), end: at(d(2), 13), calendar: "northwind", location: "Main hall" },
    { id: "initech", title: "Initech onboarding", start: at(d(2), 14), end: at(d(2), 15), calendar: "customers", location: "Zoom" },
    { id: "maya", title: "1:1 Maya", start: at(d(2), 14, 30), end: at(d(2), 15, 15), calendar: "northwind" },
    { id: "deploy-wed", title: "Deploy window: Lumen 2.4", start: at(d(2), 16), end: at(d(2), 18), calendar: "releases", location: "#deploys" },
    { id: "design-2", title: "Design review: billing flow", start: at(d(3), 10), end: at(d(3), 11), calendar: "northwind", location: "Room Atlas" },
    { id: "umbrella", title: "Customer call: Umbrella", start: at(d(3), 11), end: at(d(3), 11, 30), calendar: "customers", location: "Google Meet" },
    { id: "postmortem", title: "Postmortem: API latency", start: at(d(3), 15), end: at(d(3), 16), calendar: "eng", location: "Zoom" },
    { id: "demo", title: "Demo day", start: at(d(4), 11), end: at(d(4), 12), calendar: "northwind", location: "Main hall" },
    { id: "deploy-fri", title: "Deploy window: hotfixes", start: at(d(4), 14), end: at(d(4), 15, 30), calendar: "releases", location: "#deploys" },
    { id: "social", title: "Team social", start: at(d(4), 17), end: at(d(4), 19), calendar: "personal", location: "Rooftop" },
    { id: "run", title: "Run club", start: at(d(5), 8), end: at(d(5), 9, 30), calendar: "personal" },
    { id: "release", title: "Lumen 2.4 release", start: d(2), end: d(3), calendar: "releases", allDay: true },
    { id: "q4", title: "Q4 planning offsite", start: d(3), end: d(5), calendar: "northwind", allDay: true }
  )
  return ev
}

type Placed = { ev: CalendarEvent; top: number; bottom: number; col: number; span: number; cols: number }

/** Side by side columns for overlapping events, Google Calendar style. */
function layoutDay(items: { ev: CalendarEvent; top: number; bottom: number }[]): Placed[] {
  const sorted = [...items].sort((a, b) => a.top - b.top || b.bottom - a.bottom)
  const out: Placed[] = []
  let cluster: Placed[] = []
  let clusterEnd = -1
  let colEnds: number[] = []
  const flush = () => {
    const cols = colEnds.length
    for (const p of cluster) {
      p.cols = cols
      // Grow into free columns to the right.
      let span = 1
      for (let c = p.col + 1; c < cols; c++) {
        if (cluster.some((o) => o.col === c && o.top < p.bottom && o.bottom > p.top)) break
        span++
      }
      p.span = span
      out.push(p)
    }
    cluster = []
    colEnds = []
  }
  for (const it of sorted) {
    if (cluster.length && it.top >= clusterEnd) flush()
    let col = colEnds.findIndex((end) => end <= it.top)
    if (col < 0) {
      col = colEnds.length
      colEnds.push(it.bottom)
    } else colEnds[col] = it.bottom
    cluster.push({ ...it, col, span: 1, cols: 1 })
    clusterEnd = cluster.length === 1 ? it.bottom : Math.max(clusterEnd, it.bottom)
  }
  if (cluster.length) flush()
  return out
}

/**
 * A week and day scheduler in the style of Google Calendar. Events sit on an
 * hour grid by start and end, overlapping events share the column side by
 * side, a live line marks the current time, and all-day events span a row
 * above. Click an empty slot to create, or focus a day and pick a time with
 * the arrow keys.
 */
function EventCalendar({
  events: eventsProp,
  calendars = CALENDARS,
  view: viewProp,
  defaultView = "auto",
  onViewChange,
  defaultDate,
  onDateChange,
  weekStartsOn = 1,
  scrollToHour = 8,
  hourHeight = 48,
  height = 520,
  slotMinutes = 30,
  onCreate,
  onEventClick,
  locale = "en-US",
  className,
}: EventCalendarProps) {
  const events = React.useMemo(() => eventsProp ?? sampleEvents(), [eventsProp])
  const [now, setNow] = React.useState(() => new Date())
  const [cursor, setCursor] = React.useState(() => startOfDay(defaultDate ?? new Date()))
  const [chosen, setChosen] = React.useState<CalendarView | null>(defaultView === "auto" ? null : defaultView)
  const [width, setWidth] = React.useState(0)
  const narrow = width > 0 && width < 600
  const view: CalendarView = viewProp ?? chosen ?? (narrow ? "day" : "week")
  const [draft, setDraft] = React.useState<{ start: Date; end: Date } | null>(null)
  const [hover, setHover] = React.useState<{ day: number; min: number } | null>(null)
  const [keySlot, setKeySlot] = React.useState<{ day: number; min: number } | null>(null)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(t)
  }, [])

  React.useEffect(() => {
    const el = rootRef.current
    if (!el || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  React.useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = Math.max(0, scrollToHour * hourHeight - 8)
    // Only on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const days = React.useMemo(() => {
    const first = view === "week" ? startOfWeek(cursor, weekStartsOn) : cursor
    return Array.from({ length: view === "week" ? 7 : 1 }, (_, i) => addDays(first, i))
  }, [cursor, view, weekStartsOn])

  const cal = React.useMemo(() => new Map(calendars.map((c) => [c.id, c])), [calendars])
  const toneOf = (ev: CalendarEvent) => TONE[cal.get(ev.calendar ?? "")?.tone ?? "accent"]

  const fmt = React.useMemo(
    () => ({
      time: new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit" }),
      hour: new Intl.DateTimeFormat(locale, { hour: "numeric" }),
      weekday: new Intl.DateTimeFormat(locale, { weekday: "short" }),
      long: new Intl.DateTimeFormat(locale, { weekday: "long", month: "long", day: "numeric" }),
      month: new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }),
      monthShort: new Intl.DateTimeFormat(locale, { month: "short" }),
    }),
    [locale]
  )

  const titleText = (() => {
    const a = days[0]
    const b = days[days.length - 1]
    if (a.getMonth() === b.getMonth()) return fmt.month.format(a)
    if (a.getFullYear() === b.getFullYear()) return `${fmt.monthShort.format(a)} – ${fmt.monthShort.format(b)} ${b.getFullYear()}`
    return `${fmt.monthShort.format(a)} ${a.getFullYear()} – ${fmt.monthShort.format(b)} ${b.getFullYear()}`
  })()

  const setView = (v: CalendarView) => {
    if (viewProp === undefined) setChosen(v)
    onViewChange?.(v)
  }
  const go = (d: Date) => {
    setCursor(startOfDay(d))
    onDateChange?.(d)
  }
  const step = view === "week" ? 7 : 1

  const timeRange = (s: Date, e: Date) => `${fmt.time.format(s)} to ${fmt.time.format(e)}`

  // All-day events, placed into the visible day span.
  const allDay = events
    .filter((e) => e.allDay)
    .map((e) => {
      const s = startOfDay(e.start)
      const last = addDays(startOfDay(new Date(e.end.getTime() - 1)), 0)
      const from = days.findIndex((d) => d >= s)
      let to = -1
      for (let i = days.length - 1; i >= 0; i--) if (days[i] <= last) { to = i; break }
      return { ev: e, from, to }
    })
    .filter((x) => x.from >= 0 && x.to >= x.from)

  const timed = days.map((day) => {
    const dayStart = day.getTime()
    const dayEnd = dayStart + DAY_MS
    const items = events
      .filter((e) => !e.allDay && e.start.getTime() < dayEnd && e.end.getTime() > dayStart)
      .map((ev) => ({
        ev,
        top: Math.max(0, (ev.start.getTime() - dayStart) / 60_000),
        bottom: Math.min(1440, (ev.end.getTime() - dayStart) / 60_000),
      }))
    return layoutDay(items)
  })

  const px = (min: number) => (min / 60) * hourHeight
  const snap = (min: number) => Math.max(0, Math.min(1440 - slotMinutes, Math.floor(min / slotMinutes) * slotMinutes))
  const minFromPointer = (e: React.PointerEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    return snap(((e.clientY - r.top) / hourHeight) * 60)
  }
  const create = (dayIdx: number, min: number) => {
    const start = new Date(days[dayIdx].getTime() + min * 60_000)
    const end = new Date(start.getTime() + 60 * 60_000)
    setDraft({ start, end })
    onCreate?.({ start, end })
  }

  const nowMin = now.getHours() * 60 + now.getMinutes()
  const cols = view === "week" ? "grid-cols-7" : "grid-cols-1"

  return (
    <div
      ref={rootRef}
      data-slot="event-calendar"
      className={cn("flex w-full max-w-4xl min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-raised", className)}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2.5 sm:px-4">
        <h2 aria-live="polite" className="mr-auto min-w-0 truncate text-[0.9375rem] font-medium tracking-[-0.01em] text-fg">
          {view === "day" ? fmt.long.format(days[0]) : titleText}
        </h2>
        <Button variant="outline" size="sm" onClick={() => go(new Date())}>
          Today
        </Button>
        <div className="flex items-center">
          <Button variant="ghost" size="icon-sm" aria-label={view === "week" ? "Previous week" : "Previous day"} onClick={() => go(addDays(cursor, -step))}>
            <ChevronLeftIcon />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label={view === "week" ? "Next week" : "Next day"} onClick={() => go(addDays(cursor, step))}>
            <ChevronRightIcon />
          </Button>
        </div>
        <SegmentedControl
          size="sm"
          aria-label="Calendar view"
          value={view}
          onChange={(v) => setView(v as CalendarView)}
          options={[
            { value: "week", label: "Week" },
            { value: "day", label: "Day" },
          ]}
        />
      </div>

      <div className={cn("min-w-0", view === "week" && "overflow-x-auto")}>
        <div className={cn(view === "week" && "min-w-[640px]")}>
          {/* Day headers */}
          <div className="flex border-b border-border">
            <div className="w-14 shrink-0" />
            <div className={cn("grid flex-1", cols)}>
              {days.map((d) => {
                const today = sameDay(d, now)
                return (
                  <button
                    key={d.toISOString()}
                    type="button"
                    disabled={view === "day"}
                    onClick={() => {
                      setCursor(d)
                      setView("day")
                    }}
                    aria-label={`${fmt.long.format(d)}${today ? ", today" : ""}${view === "week" ? ", open day view" : ""}`}
                    className={cn(
                      "flex items-center justify-center gap-1.5 border-l border-border py-2 outline-none first:border-l-0",
                      "transition-colors duration-[70ms] enabled:hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
                      view === "day" && "justify-start px-3"
                    )}
                  >
                    <span className={cn("text-[11px] font-medium tracking-[0.04em] uppercase", today ? "text-accent-fg" : "text-fg-subtle")}>
                      {fmt.weekday.format(d)}
                    </span>
                    <span
                      className={cn(
                        "grid size-7 place-items-center rounded-full text-[0.8125rem] font-medium tabular-nums",
                        today ? "bg-accent text-on-accent" : "text-fg"
                      )}
                    >
                      {d.getDate()}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* All-day row */}
          <div className="flex border-b border-border">
            <div className="flex w-14 shrink-0 items-start justify-end pt-1.5 pr-2 text-[10px] text-fg-subtle">All day</div>
            <div className={cn("relative grid min-h-8 flex-1 auto-rows-[22px] gap-y-0.5 py-1", cols)} style={{ gridAutoFlow: "row dense" }}>
              <div aria-hidden className={cn("pointer-events-none absolute inset-0 grid", cols)}>
                {days.map((d) => (
                  <div key={d.toISOString()} className="border-l border-border first:border-l-0" />
                ))}
              </div>
              {allDay.map(({ ev, from, to }) => {
                const t = toneOf(ev)
                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => onEventClick?.(ev)}
                    aria-label={`${ev.title}, all day, ${fmt.long.format(ev.start)}${to > from ? ` to ${fmt.long.format(days[to])}` : ""}${cal.get(ev.calendar ?? "") ? `, ${cal.get(ev.calendar ?? "")!.label}` : ""}`}
                    className={cn(
                      "relative mx-1 flex min-w-0 items-center gap-1.5 overflow-hidden rounded-md px-2 text-left text-[11px] font-medium text-fg outline-none",
                      "transition-colors duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent",
                      t.block
                    )}
                    style={{ gridColumn: `${from + 1} / ${to + 2}` }}
                  >
                    <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", t.dot)} />
                    <span className="truncate">{ev.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Time grid */}
          <div ref={scrollRef} className="overflow-y-auto overscroll-contain" style={{ height }}>
            <div className="relative flex" style={{ height: hourHeight * 24 }}>
              <div aria-hidden className="relative w-14 shrink-0">
                {Array.from({ length: 23 }, (_, i) => i + 1).map((h) => (
                  <span
                    key={h}
                    className="absolute right-2 -translate-y-1/2 text-[10px] text-fg-subtle tabular-nums"
                    style={{ top: h * hourHeight }}
                  >
                    {fmt.hour.format(at(days[0], h))}
                  </span>
                ))}
              </div>
              <div className={cn("relative grid flex-1", cols)}>
                {/* Hour lines */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                  {Array.from({ length: 23 }, (_, i) => i + 1).map((h) => (
                    <div key={h} className="absolute inset-x-0 border-t border-border" style={{ top: h * hourHeight }} />
                  ))}
                  {Array.from({ length: 24 }, (_, h) => (
                    <div key={h} className="absolute inset-x-0 border-t border-dashed border-border/50" style={{ top: h * hourHeight + hourHeight / 2 }} />
                  ))}
                </div>
                {days.map((day, di) => {
                  const today = sameDay(day, now)
                  const slot = keySlot?.day === di ? keySlot : hover?.day === di ? hover : null
                  const dayDraft = draft && sameDay(draft.start, day) ? draft : null
                  return (
                    <div key={day.toISOString()} className={cn("relative border-l border-border first:border-l-0", today && view === "week" && "bg-accent-soft/50")}>
                      {/* Empty-slot target: one tab stop per day, arrows pick the time. */}
                      <div
                        role="button"
                        tabIndex={0}
                        aria-label={`Create event on ${fmt.long.format(day)} at ${fmt.time.format(at(day, 0, keySlot?.day === di ? keySlot.min : scrollToHour * 60))}. Up and down arrows change the time.`}
                        className="absolute inset-0 cursor-cell outline-none"
                        onPointerMove={(e) => {
                          if (e.pointerType !== "mouse") return
                          const min = minFromPointer(e)
                          if (hover?.day !== di || hover.min !== min) setHover({ day: di, min })
                        }}
                        onPointerLeave={() => setHover(null)}
                        onClick={(e) => create(di, minFromPointer(e))}
                        onFocus={(e) => {
                          if (!e.currentTarget.matches(":focus-visible")) return
                          setKeySlot((k) => (k?.day === di ? k : { day: di, min: snap(scrollToHour * 60) }))
                        }}
                        onBlur={() => setKeySlot(null)}
                        onKeyDown={(e) => {
                          const k = keySlot ?? { day: di, min: snap(scrollToHour * 60) }
                          let min = k.min
                          if (e.key === "ArrowDown") min = snap(min + slotMinutes)
                          else if (e.key === "ArrowUp") min = snap(min - slotMinutes)
                          else if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            create(di, k.min)
                            return
                          } else return
                          e.preventDefault()
                          setKeySlot({ day: di, min })
                          const sc = scrollRef.current
                          if (sc) {
                            const y = px(min)
                            if (y < sc.scrollTop + 8) sc.scrollTop = y - 8
                            else if (y + hourHeight > sc.scrollTop + sc.clientHeight) sc.scrollTop = y + hourHeight - sc.clientHeight + 8
                          }
                        }}
                      />
                      {slot && !dayDraft ? (
                        <div
                          aria-hidden
                          className={cn(
                            "pointer-events-none absolute inset-x-1 rounded-md border border-dashed",
                            keySlot?.day === di ? "border-solid border-accent bg-accent-soft ring-2 ring-accent-soft" : "border-fg/20"
                          )}
                          style={{ top: px(slot.min) + 1, height: px(slotMinutes) - 2 }}
                        >
                          <span className={cn("block truncate px-1.5 pt-0.5 text-[10px] whitespace-nowrap tabular-nums", keySlot?.day === di ? "font-medium text-accent-fg" : "text-fg-muted")}>
                            {fmt.time.format(at(day, 0, slot.min))}
                          </span>
                        </div>
                      ) : null}
                      {dayDraft ? (
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-x-1 z-10 overflow-hidden rounded-md bg-accent px-2 py-1 text-on-accent shadow-md"
                          style={{
                            top: px(dayDraft.start.getHours() * 60 + dayDraft.start.getMinutes()) + 1,
                            height: px((dayDraft.end.getTime() - dayDraft.start.getTime()) / 60_000) - 2,
                          }}
                        >
                          <span className="block truncate text-[11px] font-medium">New event</span>
                          <span className="block truncate text-[10px] whitespace-nowrap opacity-80 tabular-nums">{fmt.time.format(dayDraft.start)}</span>
                        </div>
                      ) : null}
                      {timed[di].map((p) => {
                        const t = toneOf(p.ev)
                        const h = px(p.bottom - p.top)
                        const compact = h < 40
                        // Rendered width of this block, for choosing how much text fits.
                        const colPx = width ? ((Math.max(width, view === "week" ? 640 : 0) - 56) / days.length) * (p.span / p.cols) : 120
                        const tight = colPx < 110
                        const c = cal.get(p.ev.calendar ?? "")
                        return (
                          <button
                            key={p.ev.id}
                            type="button"
                            onClick={() => onEventClick?.(p.ev)}
                            aria-label={`${p.ev.title}, ${fmt.long.format(p.ev.start)}, ${timeRange(p.ev.start, p.ev.end)}${p.ev.location ? `, ${p.ev.location}` : ""}${c ? `, ${c.label}` : ""}`}
                            className={cn(
                              "absolute z-[1] flex flex-col overflow-hidden rounded-md py-0.5 pr-1 pl-2.5 text-left outline-none",
                              "shadow-[0_0_0_1px_var(--surface)] transition-colors duration-[70ms] focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-accent",
                              t.block
                            )}
                            style={{
                              top: px(p.top) + 1,
                              height: Math.max(18, h - 2),
                              left: `calc(${(p.col / p.cols) * 100}% + 2px)`,
                              width: `calc(${(p.span / p.cols) * 100}% - 4px)`,
                            }}
                          >
                            <span aria-hidden className={cn("absolute top-1 bottom-1 left-1 w-0.5 rounded-full", t.bar)} />
                            {compact ? (
                              <span className="truncate text-[11px] leading-4 text-fg">
                                <span className="font-medium">{p.ev.title}</span>
                                <span className="text-fg-muted tabular-nums">, {fmt.time.format(p.ev.start)}</span>
                              </span>
                            ) : (
                              <>
                                <span className={cn("text-[11px] leading-4 font-medium break-words text-fg", h >= 68 && colPx >= 64 ? "line-clamp-2" : "truncate")}>{p.ev.title}</span>
                                <span className={cn("truncate text-[10px] leading-4 text-fg-muted tabular-nums", colPx < 60 && "hidden")}>
                                  {tight ? fmt.time.format(p.ev.start) : timeRange(p.ev.start, p.ev.end).replace(" to ", " – ")}
                                </span>
                                {h >= (colPx >= 64 ? 84 : 52) && colPx >= 60 && p.ev.location ? <span className="truncate text-[10px] leading-4 text-fg-subtle">{p.ev.location}</span> : null}
                              </>
                            )}
                          </button>
                        )
                      })}
                      {today ? (
                        <div aria-hidden className="pointer-events-none absolute inset-x-0 z-10" style={{ top: px(nowMin) }}>
                          <div className="absolute inset-x-0 h-0.5 -translate-y-1/2 bg-danger" />
                          <div className="absolute -left-1.5 size-3 -translate-y-1/2 rounded-full bg-danger" />
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {keySlot ? `${fmt.long.format(days[keySlot.day] ?? days[0])}, ${fmt.time.format(at(days[keySlot.day] ?? days[0], 0, keySlot.min))}` : ""}
      </p>

      {/* Legend */}
      <ul aria-label="Calendars" className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border px-4 py-2.5">
        {calendars.map((c) => (
          <li key={c.id} className="inline-flex items-center gap-1.5 text-[11px] text-fg-muted">
            <span aria-hidden className={cn("size-2 rounded-full", TONE[c.tone].dot)} />
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { EventCalendar }
export type { EventCalendarProps, CalendarEvent, CalendarSource, CalendarTone, CalendarView }
