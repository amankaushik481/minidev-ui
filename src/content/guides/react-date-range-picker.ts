import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-date-range-picker",
  title: "Date range picker in React with presets, two months and keyboard",
  description:
    "Build a React date range picker with Tailwind: native date inputs first, then a two month calendar in a popover with presets, arrow keys and ISO string values.",
  date: "2026-10-14",
  keywords: [
    "react date range picker",
    "date range picker tailwind",
    "react calendar range selection",
    "date picker presets react",
    "accessible date picker react",
  ],
  related: ["date-range-picker", "date-picker", "calendar-month", "popover", "button"],
  body: [
    {
      type: "p",
      text: "The simplest date range picker in React is two native `<input type=\"date\">` fields that hold ISO strings, and that is exactly what the free MiniDev UI [DateRangePicker](/docs/date-range-picker) is. When the product needs presets like \"Last 30 days\", two months side by side and arrow key navigation, you keep the same `{ from, to }` value and put a calendar grid inside a [Popover](/docs/popover), which is what this guide builds.",
    },
    {
      type: "p",
      text: "Everything below uses React 19, Tailwind v4 and the kit's tokens. There is no date library: the grid needs about thirty lines of date math, and all of it is in this page. The result is one value model that works with the native inputs on phones and the calendar on desktop, so a form can switch between them without changing its state.",
    },

    { type: "h2", text: "Start with the native inputs", id: "native-inputs" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/date-range-picker.json\nnpx shadcn@latest add https://ui.minidev.pro/r/popover.json\nnpx shadcn@latest add https://ui.minidev.pro/r/button.json",
    },
    {
      type: "p",
      text: "`DateRangePicker` renders two [DatePicker](/docs/date-picker) inputs with a \"to\" between them. It is controlled through `value` and `onChange`, and it keeps its own state when `value` is omitted:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const [range, setRange] = React.useState<{ from?: string; to?: string }>({})

<DateRangePicker value={range} onChange={setRange} fromId="report-from" toId="report-to" />`,
    },
    {
      type: "list",
      items: [
        "Values are plain `YYYY-MM-DD` strings, which is what the native input reads and writes. Keep that format all the way to the server and you never serialize a `Date`.",
        "`fromId` and `toId` let a visible label or a `FormField` point at each input. The inputs also carry fixed `aria-label`s, \"Start date\" and \"End date\".",
        "`disabled` disables both inputs. There is no `min`, `max` or ordering check: the user can type an end before the start, so validate the pair yourself (see [validation](#validation)).",
        "On phones the browser opens its own picker, which is the best experience you can get there. Keep this component as the mobile path even after you build the calendar.",
      ],
    },
    {
      type: "callout",
      tone: "note",
      text: "The kit also ships [CalendarMonth](/docs/calendar-month), but read it before you reach for it: it is a static preview that draws thirty numbered buttons under a hard coded \"September 2026\" heading and reports the clicked number. It is useful as a visual reference for the grid styling, not as a date aware calendar, which is why the sections below write a real one.",
    },

    { type: "h2", text: "Date math without a library", id: "date-math" },
    {
      type: "p",
      text: "Four helpers are enough. The important one is `parseIso`, which builds a local date from the string. `new Date(\"2026-10-14\")` parses as UTC midnight and shows as October 13 for everyone west of Greenwich, which is the most common date picker bug there is.",
    },
    {
      type: "code",
      lang: "ts",
      filename: "lib/dates.ts",
      code: `export type Range = { from?: string; to?: string }

export function parseIso(s: string): Date {
  const [y, m, d] = s.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export function toIso(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0")
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate())
}

export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
export const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1)
export const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1)
export const sameDay = (a: Date, b: Date) => toIso(a) === toIso(b)

/** Weeks of a month, Monday first. Cells outside the month are null. */
export function monthWeeks(month: Date): (Date | null)[][] {
  const first = startOfMonth(month)
  const lead = (first.getDay() + 6) % 7
  const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = Array.from({ length: lead }, () => null)
  for (let i = 1; i <= count; i++) cells.push(new Date(month.getFullYear(), month.getMonth(), i))
  while (cells.length % 7) cells.push(null)
  const weeks: (Date | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}`,
    },
    {
      type: "p",
      text: "Day arithmetic goes through the `Date` constructor on purpose. Passing day 32 of a month rolls into the next month and day 0 rolls back, and the constructor handles leap years and daylight saving changes, where adding 86,400,000 milliseconds does not.",
    },

    { type: "h2", text: "A month grid that is a real grid", id: "month-grid" },
    {
      type: "p",
      text: "Each month is a `role=\"grid\"` with one row per week and a button per day. Only one button in the whole picker has `tabIndex={0}` (the focused day); the rest are `-1`, so Tab leaves the calendar in one press and the arrow keys move inside it. That is the roving tabindex pattern from the ARIA grid spec, and it is what native date pickers on macOS and Windows do too.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/month-grid.tsx",
      code: `"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { monthWeeks, sameDay, toIso } from "@/lib/dates"

type MonthGridProps = {
  month: Date
  from?: Date
  to?: Date
  /** Day under the pointer while only \`from\` is chosen, drawn as a provisional end. */
  preview?: Date
  focused: Date
  min?: Date
  max?: Date
  onFocus: (d: Date) => void
  onHover: (d: Date | undefined) => void
  onPick: (d: Date) => void
}

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const monthName = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" })
const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })

export function MonthGrid({ month, from, to, preview, focused, min, max, onFocus, onHover, onPick }: MonthGridProps) {
  const end = to ?? (from && preview && preview > from ? preview : undefined)
  const inRange = (d: Date) => Boolean(from && end && d >= from && d <= end)
  const isDisabled = (d: Date) => Boolean((min && d < min) || (max && d > max))
  return (
    <div role="grid" aria-label={monthName.format(month)} className="w-64">
      <p aria-hidden className="mb-2 text-center text-sm font-medium text-fg">{monthName.format(month)}</p>
      <div role="row" className="grid grid-cols-7 text-center text-[11px] text-fg-subtle">
        {WEEKDAYS.map((w) => <span key={w} role="columnheader" className="py-1">{w}</span>)}
      </div>
      {monthWeeks(month).map((week, wi) => (
        <div key={wi} role="row" className="grid grid-cols-7 gap-y-0.5">
          {week.map((d, i) =>
            d ? (
              <button
                key={i}
                type="button"
                role="gridcell"
                aria-label={dayName.format(d)}
                aria-selected={Boolean(from && sameDay(d, from)) || Boolean(to && sameDay(d, to)) || undefined}
                aria-disabled={isDisabled(d) || undefined}
                tabIndex={sameDay(d, focused) ? 0 : -1}
                data-day={toIso(d)}
                onFocus={() => onFocus(d)}
                onMouseEnter={() => onHover(d)}
                onMouseLeave={() => onHover(undefined)}
                onClick={() => { if (!isDisabled(d)) onPick(d) }}
                className={cn(
                  "h-8 w-full text-sm text-fg outline-none transition-colors duration-[70ms] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
                  inRange(d) ? "bg-accent-soft" : "rounded-lg hover:bg-sunken",
                  from && sameDay(d, from) && "rounded-l-lg bg-accent text-on-accent hover:bg-accent",
                  end && sameDay(d, end) && "rounded-r-lg bg-accent text-on-accent hover:bg-accent",
                  isDisabled(d) && "text-fg-subtle line-through hover:bg-transparent"
                )}
              >
                {d.getDate()}
              </button>
            ) : (
              <span key={i} role="gridcell" aria-hidden />
            )
          )}
        </div>
      ))}
    </div>
  )
}`,
    },
    {
      type: "p",
      text: "Each day button has a full `aria-label` (\"Wednesday, October 14, 2026\"), so a screen reader never has to infer the month from a bare \"14\". Disabled days use `aria-disabled` rather than `disabled` so they stay in the arrow key path and can be announced as unavailable instead of silently skipped.",
    },

    { type: "h2", text: "Two months in a Popover with presets", id: "popover" },
    {
      type: "p",
      text: "The picker owns the visible month, the focused day, the hover preview and a `draft` start date for the click in progress. The committed value stays in the parent as `{ from, to }` strings, the same shape `DateRangePicker` uses. `PopoverContent` from the kit positions and animates the panel; `w-auto` overrides its default `w-72` so two grids fit.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/range-picker.tsx",
      code: `"use client"
import * as React from "react"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MonthGrid } from "@/components/month-grid"
import { addDays, addMonths, parseIso, startOfMonth, toIso, type Range } from "@/lib/dates"

const today = () => new Date(new Date().setHours(0, 0, 0, 0))
const PRESETS: { label: string; range: () => Range }[] = [
  { label: "Last 7 days", range: () => ({ from: toIso(addDays(today(), -6)), to: toIso(today()) }) },
  { label: "Last 30 days", range: () => ({ from: toIso(addDays(today(), -29)), to: toIso(today()) }) },
  { label: "This month", range: () => ({ from: toIso(startOfMonth(today())), to: toIso(today()) }) },
  { label: "Last month", range: () => ({ from: toIso(addMonths(today(), -1)), to: toIso(addDays(startOfMonth(today()), -1)) }) },
]
const short = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" })

export function RangePicker({ value, onChange, max }: { value: Range; onChange: (r: Range) => void; max?: Date }) {
  const [open, setOpen] = React.useState(false)
  const from = value.from ? parseIso(value.from) : undefined
  const to = value.to ? parseIso(value.to) : undefined
  const [month, setMonth] = React.useState(() => startOfMonth(from ?? today()))
  const [focused, setFocused] = React.useState<Date>(from ?? today())
  const [hover, setHover] = React.useState<Date>()
  const [draft, setDraft] = React.useState<Date>()
  const grids = React.useRef<HTMLDivElement>(null)

  const pick = (d: Date) => {
    if (!draft) {
      setDraft(d)
      onChange({ from: toIso(d), to: undefined })
      return
    }
    const [a, b] = d < draft ? [d, draft] : [draft, d]
    onChange({ from: toIso(a), to: toIso(b) })
    setDraft(undefined)
    setOpen(false)
  }

  /** Move the keyboard cursor, scroll the months if needed, then focus the new day button. */
  const moveFocus = (next: Date) => {
    setFocused(next)
    const first = startOfMonth(month)
    const last = addMonths(first, 2)
    if (next < first) setMonth(startOfMonth(next))
    else if (next >= last) setMonth(addMonths(startOfMonth(next), -1))
    requestAnimationFrame(() => grids.current?.querySelector<HTMLElement>(\`[data-day="\${toIso(next)}"]\`)?.focus())
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, () => Date> = {
      ArrowLeft: () => addDays(focused, -1),
      ArrowRight: () => addDays(focused, 1),
      ArrowUp: () => addDays(focused, -7),
      ArrowDown: () => addDays(focused, 7),
      Home: () => addDays(focused, -((focused.getDay() + 6) % 7)),
      End: () => addDays(focused, 6 - ((focused.getDay() + 6) % 7)),
      PageUp: () => new Date(focused.getFullYear(), focused.getMonth() - 1, focused.getDate()),
      PageDown: () => new Date(focused.getFullYear(), focused.getMonth() + 1, focused.getDate()),
    }
    const go = map[e.key]
    if (go) { e.preventDefault(); moveFocus(go()); return }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(focused) }
  }

  const label = from && to ? short.format(from) + " to " + short.format(to) : from ? short.format(from) + " to …" : "Pick a date range"
  const shared = { from, to, preview: draft ? hover ?? focused : undefined, focused, max, onFocus: setFocused, onHover: setHover, onPick: pick }

  return (
    <Popover open={open} onOpenChange={(o) => { setOpen(o); if (!o) setDraft(undefined) }}>
      <PopoverTrigger render={<Button variant="outline" />}>
        <CalendarIcon />
        {label}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto flex-row gap-4 p-4">
        <ul className="flex w-32 flex-col gap-0.5 border-r border-border pr-3">
          {PRESETS.map((p) => (
            <li key={p.label}>
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => { onChange(p.range()); setOpen(false) }}>
                {p.label}
              </Button>
            </li>
          ))}
        </ul>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <Button variant="ghost" size="icon-sm" aria-label="Previous month" onClick={() => setMonth((m) => addMonths(m, -1))}><ChevronLeftIcon /></Button>
            <Button variant="ghost" size="icon-sm" aria-label="Next month" onClick={() => setMonth((m) => addMonths(m, 1))}><ChevronRightIcon /></Button>
          </div>
          <div ref={grids} onKeyDown={onKeyDown} className="flex gap-6">
            <MonthGrid month={month} {...shared} />
            <MonthGrid month={addMonths(month, 1)} {...shared} />
          </div>
          <p role="status" className="mt-3 text-xs text-fg-muted">
            {draft ? "Start " + short.format(draft) + ". Choose an end date." : "Choose a start date."}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
    },
    {
      type: "list",
      items: [
        "The first click sets `draft` and reports `{ from, to: undefined }` immediately, so a parent that renders the native inputs alongside stays in sync. The second click orders the pair, so clicking the end first is fine.",
        "`preview` is the hovered day, or the keyboard cursor while a draft exists, which is how keyboard users see the provisional range as they arrow around.",
        "Closing the popover clears `draft` but keeps `from`. If you would rather discard a half picked range, call `onChange({})` in the same branch.",
        "Presets commit and close in one step. \"Last 30 days\" means 30 calendar days including today, which is worth stating in your docs because analytics tools disagree about it.",
      ],
    },

    { type: "h2", text: "Keyboard support", id: "keyboard" },
    {
      type: "table",
      head: ["Key", "Action"],
      rows: [
        ["Tab", "Moves from the trigger into the presets, then to the month buttons, then to the single focusable day"],
        ["Arrow keys", "Move the cursor by one day or one week; the grid scrolls when the cursor leaves the two visible months"],
        ["Home and End", "Jump to Monday and Sunday of the current week"],
        ["PageUp and PageDown", "Same day in the previous or next month"],
        ["Enter or Space", "Pick the focused day as start, then as end"],
        ["Escape", "Closes the popover and returns focus to the trigger (handled by Base UI)"],
      ],
    },
    {
      type: "p",
      text: "Focus is moved in a `requestAnimationFrame` because the target button may not exist until React has rendered the new month. Reading the day back from `data-day` keeps the grid free of refs per cell.",
    },

    { type: "h2", text: "Validation and the value model", id: "validation" },
    {
      type: "list",
      items: [
        "Treat `from` and `to` as calendar dates, not instants. Compare them as strings: `YYYY-MM-DD` sorts correctly, so `from <= to` works without parsing.",
        "When the native inputs produce `from > to`, swap them in `onChange` rather than showing an error; nobody intends an inverted range.",
        "Pass `max={today()}` for reports and `min` for bookings. The grid renders those days with `aria-disabled` and ignores clicks on them.",
        "On the server, parse the strings with the same local date rule or treat them as dates in the user's stored time zone. Converting through `Date.toISOString()` on either side reintroduces the UTC shift.",
        "Limit the span if the backend cannot handle a year of rows: check `dayDiff` when the second date is picked and show a `role=\"alert\"` message instead of committing.",
      ],
    },

    { type: "h2", text: "Phones: fall back to the native inputs", id: "mobile" },
    {
      type: "p",
      text: "A 640 pixel wide popover does not fit a phone, and the platform picker is better there anyway. Switch on pointer type rather than viewport width, so a tablet with a keyboard still gets the calendar:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `function useCoarsePointer() {
  return React.useSyncExternalStore(
    (cb) => { const q = matchMedia("(pointer: coarse)"); q.addEventListener("change", cb); return () => q.removeEventListener("change", cb) },
    () => matchMedia("(pointer: coarse)").matches,
    () => false
  )
}

const coarse = useCoarsePointer()
return coarse ? <DateRangePicker value={range} onChange={setRange} /> : <RangePicker value={range} onChange={setRange} />`,
    },
    {
      type: "p",
      text: "`useSyncExternalStore` with a `false` server snapshot renders the calendar during SSR and swaps after hydration without a mismatch warning. See [hydration](/glossary/hydration) for why reading `matchMedia` during render would break.",
    },

    { type: "h2", text: "Accessibility notes", id: "accessibility" },
    {
      type: "list",
      items: [
        "The trigger shows the current range in text, so the value is readable without opening anything. Add `aria-describedby` to the trigger pointing at the field's label if it sits in a form row.",
        "The `role=\"status\"` line under the grids announces \"Start October 1. Choose an end date.\" when the first day is picked. Without it a screen reader user has no confirmation that the click registered.",
        "Selected days carry `aria-selected`; the range in between is only colour. If the range matters to assistive technology, add the dates to the status line.",
        "The accent on selected days uses `text-on-accent`, which the kit tunes for [WCAG contrast](/glossary/wcag-contrast) in both themes. The lighter `bg-accent-soft` range fill is decorative and does not need to pass.",
        "`Popover` from Base UI handles Escape, outside clicks and returning focus to the trigger, so the picker does not reimplement any overlay behaviour. See [ARIA](/glossary/aria) for what the grid roles promise.",
      ],
    },

    { type: "h2", text: "Pitfalls", id: "pitfalls" },
    {
      type: "list",
      items: [
        "**Parsing ISO strings with `new Date(string)`.** Off by one day for half the planet. Use `parseIso`.",
        "**Storing `Date` objects in state.** They are mutable and compare by reference, so `useEffect` dependencies and memoisation misbehave. Store strings, derive dates.",
        "**Month navigation with `setMonth(m => new Date(m.setMonth(...)))`.** `setMonth` mutates in place and skips to the following month when the current day does not exist (January 31 plus one month). `addMonths` above always starts at day 1.",
        "**Week start.** The grid is Monday first. Locales that start on Sunday need `lead = first.getDay()` and the weekday labels rotated. Read it from `Intl.Locale.prototype.getWeekInfo` where available.",
        "**Forgetting the second month on narrow desktop windows.** Below about 700 pixels, render one `MonthGrid` and keep the next and previous buttons; the keyboard code already copes with a single month because it scrolls on cursor exit.",
      ],
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "`DateRangePicker`, `DatePicker`, `Popover` and `Button` are free and MIT licensed, and the rest of the form controls are in the [forms category](/components/forms). The range value drops straight into the filters of the [TanStack data table guide](/guides/react-data-table-tanstack) and the date filters in the [SaaS dashboard guide](/guides/nextjs-saas-dashboard). If you want the whole reporting screen built rather than assembled, the [MiniDev studio](https://minidev.pro) builds products on this kit.",
    },
    { type: "component", name: "date-range-picker" },
    { type: "component", name: "popover" },
    { type: "component", name: "calendar-month" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "Do I need date-fns or Day.js for a date range picker?",
      a: "Not for the picker itself. Parsing and formatting ISO day strings, adding days and building a month grid take about thirty lines with the Date constructor and Intl.DateTimeFormat. Reach for a library when you need time zones, recurrence rules or localized parsing of typed input.",
    },
    {
      q: "Why does my picked date show one day earlier?",
      a: "Because `new Date(\"2026-10-14\")` is parsed as UTC midnight, which is the previous evening in the Americas. Build local dates from the parts (`new Date(y, m - 1, d)`) and format back to strings yourself instead of calling `toISOString()`.",
    },
    {
      q: "Should the picker use the native date inputs on mobile?",
      a: "Yes. The platform picker is faster to use with a thumb, supports the user's locale and needs no extra code. Switch on `(pointer: coarse)` so devices with a mouse or trackpad get the calendar popover and touch devices get the native inputs, with the same `{ from, to }` value in both.",
    },
  ],
}

export default guide
