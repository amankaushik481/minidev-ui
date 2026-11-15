"use client"
import * as React from "react"
import { CalendarClockIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

/**
 * DateTimePicker — one field for a date and a time: a calendar and a time list in a popover, with past times disabled on today.
 *
 * Use it for meetings, scheduled sends, deploy windows and deadlines, anywhere a single moment matters. The value is a `Date`
 * (or `null` when empty). Pass `min={new Date()}` to block past days and the past slots of today; slots are `minuteStep`
 * minutes apart. The trigger shows the value through `Intl.DateTimeFormat` (medium date, short time), and the time list follows
 * the locale's 12 or 24 hour clock unless `hour12` is set. Pass `name` to submit it with a form as an ISO string. For a date
 * alone use Calendar or DatePicker; for a time alone use TimePicker.
 *
 * @example
 * const [when, setWhen] = React.useState<Date | null>(null)
 * <DateTimePicker value={when} onValueChange={setWhen} min={new Date()} minuteStep={30} timeZoneLabel="Europe/Berlin" aria-label="Send at" />
 */

type DateTimePickerProps = {
  /** Controlled value, or `null` for empty. */
  value?: Date | null
  /** Starting value when uncontrolled. */
  defaultValue?: Date | null
  /** Fires with the new Date, or `null` after Clear. */
  onValueChange?: (value: Date | null) => void
  /** Minutes between time slots. */
  minuteStep?: 5 | 15 | 30
  /** Force a 12 or 24 hour clock. Defaults to the locale's clock. */
  hour12?: boolean
  /** Earliest moment. Days before it and earlier slots on its day are disabled. */
  min?: Date
  /** Latest moment. Days after it and later slots on its day are disabled. */
  max?: Date
  /** Disable the trigger. */
  disabled?: boolean
  /** Trigger text while empty. */
  placeholder?: string
  /** Time zone note in the popover footer, such as "Times in Europe/Berlin". */
  timeZoneLabel?: string
  /** BCP 47 locale for the trigger, the calendar and the time labels. */
  locale?: string
  /** First column of the calendar week: 0 is Sunday, 1 is Monday. */
  weekStartsOn?: 0 | 1
  /** Form field name. Submits the value as an ISO 8601 string in UTC, or "" when empty. */
  name?: string
  /** Id for a `<label htmlFor>` or FormField. */
  id?: string
  className?: string
  /** What the moment is for, such as "Send at". The value is appended to it. */
  "aria-label"?: string
}

const at = (d: Date, mins: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), Math.floor(mins / 60), mins % 60)
const minsOf = (d: Date) => d.getHours() * 60 + d.getMinutes()
const noSubscribe = () => () => {}

function DateTimePicker({
  value,
  defaultValue = null,
  onValueChange,
  minuteStep = 15,
  hour12,
  min,
  max,
  disabled = false,
  placeholder = "Pick a date and time",
  timeZoneLabel,
  locale = "en-US",
  weekStartsOn = 0,
  name,
  id,
  className,
  "aria-label": ariaLabel,
}: DateTimePickerProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const [open, setOpen] = React.useState(false)
  // Read the clock when the popover opens, not during render, so server and client agree.
  const [now, setNow] = React.useState<Date | null>(null)
  const [active, setActive] = React.useState(0)
  const list = React.useRef<HTMLDivElement>(null)
  const typed = React.useRef({ text: "", at: 0 })
  const listId = React.useId()
  const current = value !== undefined ? value : inner
  // False on the server and during hydration: the server's time zone may differ from the browser's, so the
  // trigger text and the hidden input are only filled in the browser.
  const hydrated = React.useSyncExternalStore(noSubscribe, () => true, () => false)

  const fmt = React.useMemo(() => {
    const h12 = hour12 ?? ["h11", "h12"].includes(new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions().hourCycle ?? "")
    return {
      trigger: new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short", hour12: h12 }),
      slot: new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", hour12: h12 }),
    }
  }, [locale, hour12])

  const base = current ?? now
  const slots = React.useMemo(() => Array.from({ length: 1440 / minuteStep }, (_, i) => i * minuteStep), [minuteStep])
  const outOfRange = (d: Date) => (min ? d < min : false) || (max ? d > max : false)
  const slotOff = (mins: number) => !base || outOfRange(at(base, mins))
  const labels = React.useMemo(() => slots.map((m) => fmt.slot.format(at(new Date(2026, 0, 1), m))), [slots, fmt])
  const selected = current ? slots.indexOf(minsOf(current)) : -1

  const commit = (next: Date | null) => {
    if (value === undefined) setInner(next)
    onValueChange?.(next)
  }
  const scrollTo = (i: number, center = false) => {
    const el = list.current?.children[i] as HTMLElement | undefined
    const box = list.current
    if (!el || !box) return
    if (center) box.scrollTop = el.offsetTop - box.clientHeight / 2 + el.offsetHeight / 2
    else if (el.offsetTop < box.scrollTop) box.scrollTop = el.offsetTop
    else if (el.offsetTop + el.offsetHeight > box.scrollTop + box.clientHeight) box.scrollTop = el.offsetTop + el.offsetHeight - box.clientHeight
  }
  const go = (i: number) => {
    setActive(i)
    scrollTo(i)
  }

  // Centre the selected slot (or 9:00, or the first free one) each time the popover opens.
  React.useEffect(() => {
    if (!open) return
    const id = requestAnimationFrame(() => scrollTo(active, true))
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on open
  }, [open])

  const onOpenChange = (o: boolean) => {
    setOpen(o)
    if (!o) return
    const n = new Date()
    setNow(n)
    const b = current ?? n
    const free = (m: number) => !outOfRange(at(b, m))
    setActive(selected >= 0 ? selected : Math.max(0, slots.findIndex((m) => m >= 540 && free(m)), slots.findIndex(free)))
  }
  const pickDay = (d: Date) => {
    let next = at(d, current ? minsOf(current) : 540)
    if (outOfRange(next)) {
      const m = slots.find((s) => !outOfRange(at(d, s)))
      if (m === undefined) return
      next = at(d, m)
    }
    commit(next)
    setActive(slots.indexOf(minsOf(next)))
  }
  const pickTime = (i: number) => {
    if (!base || slotOff(slots[i])) return
    commit(at(base, slots[i]))
    setOpen(false)
  }
  const onListKey = (e: React.KeyboardEvent) => {
    const free = slots.map((_, i) => i).filter((i) => !slotOff(slots[i]))
    const pos = free.findIndex((i) => i >= active)
    const to: Record<string, number | undefined> = {
      ArrowDown: free[free[pos] === active ? pos + 1 : pos],
      ArrowUp: free[(pos === -1 ? free.length : pos) - 1],
      Home: free[0],
      End: free[free.length - 1],
    }
    if (e.key in to) {
      e.preventDefault()
      if (to[e.key] !== undefined) go(to[e.key]!)
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      pickTime(active)
    } else if (e.key.length === 1 && /\w/.test(e.key) && !e.metaKey && !e.ctrlKey) {
      // Type-ahead: "9" jumps to 9:00, "93" to 9:30, "14" to 14:00. Keys typed within 600ms add up.
      const t = Date.now()
      typed.current = { text: (t - typed.current.at < 600 ? typed.current.text : "") + e.key.toLowerCase(), at: t }
      const want = typed.current.text
      const hit = free.find((i) => [labels[i], labels[i].replace(/^0/, "")].some((l) => l.toLowerCase().replace(":", "").startsWith(want.replace(":", ""))))
      if (hit !== undefined) go(hit)
    }
  }

  const text = current && hydrated ? fmt.trigger.format(current) : null
  const nowSlot = now ? slots.find((m) => m >= minsOf(now)) : undefined
  const nowValue = now && nowSlot !== undefined ? at(now, nowSlot) : null

  return (
    <div data-slot="date-time-picker" className={cn("inline-flex", className)}>
      {name ? <input type="hidden" name={name} value={current && hydrated ? current.toISOString() : ""} /> : null}
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger
          id={id}
          disabled={disabled}
          aria-label={ariaLabel ? `${ariaLabel}: ${text ?? placeholder}` : undefined}
          render={<Button variant="outline" className="w-full min-w-60 justify-start font-normal tabular-nums" />}
        >
          <CalendarClockIcon aria-hidden />
          <span className={cn("truncate", !text && "text-fg-subtle", current && !hydrated && "invisible")}>{text ?? placeholder}</span>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-auto max-w-[calc(100vw-2rem)] p-3"
          initialFocus={() => list.current?.closest("[data-slot=popover-content]")?.querySelector<HTMLElement>("[data-day][tabindex='0']") ?? true}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Calendar
              value={current}
              onValueChange={pickDay}
              min={min}
              max={max}
              locale={locale}
              weekStartsOn={weekStartsOn}
              className="p-0"
            />
            <div className="flex min-w-0 flex-col gap-2 border-t border-border pt-3 sm:w-28 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-3">
              <div id={`${listId}-label`} className="flex h-8 items-center text-xs font-medium text-fg-muted">Time</div>
              <div
                ref={list}
                role="listbox"
                tabIndex={0}
                aria-labelledby={`${listId}-label`}
                aria-activedescendant={`${listId}-${active}`}
                onKeyDown={onListKey}
                className="group/list relative h-40 overflow-y-auto rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-71"
              >
                {slots.map((m, i) => {
                  const off = slotOff(m)
                  const on = i === selected
                  return (
                    <div
                      key={m}
                      id={`${listId}-${i}`}
                      role="option"
                      aria-selected={on}
                      aria-disabled={off || undefined}
                      data-active={i === active || undefined}
                      onClick={() => pickTime(i)}
                      onPointerMove={() => !off && i !== active && setActive(i)}
                      className={cn(
                        "flex h-8 cursor-pointer items-center rounded-md px-2.5 text-[0.8125rem] tabular-nums select-none transition-[background-color,color] duration-[70ms] ease-hairline",
                        on ? "bg-accent font-medium text-on-accent" : "text-fg hover:bg-sunken group-focus/list:data-active:bg-sunken",
                        off && "cursor-not-allowed text-fg-subtle opacity-50 hover:bg-transparent"
                      )}
                    >
                      {labels[i]}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-border pt-2.5">
            <span className="min-w-0 flex-1 truncate text-xs text-fg-subtle">{timeZoneLabel}</span>
            <Button variant="ghost" size="sm" disabled={!current} onClick={() => commit(null)}>
              Clear
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!nowValue || outOfRange(nowValue)}
              onClick={() => {
                if (!nowValue) return
                commit(nowValue)
                setOpen(false)
              }}
            >
              Now
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DateTimePicker }
export type { DateTimePickerProps }
