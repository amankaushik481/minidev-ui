"use client"
import * as React from "react"
import { CornerDownRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/** A windowed list that renders only the rows in view, with fixed or measured row heights, overscan, keyboard row navigation and scroll to index. */
type VirtualListHandle = {
  /** Scroll until the row is in view. "auto" scrolls the least amount needed. */
  scrollToIndex: (index: number, align?: "auto" | "start" | "center" | "end") => void
  /** Move the active row and scroll to it. */
  setActiveIndex: (index: number) => void
  /** The scrolling element. */
  element: HTMLDivElement | null
}

type Invoice = {
  id: string
  number: string
  customer: string
  amount: number
  status: "paid" | "open" | "overdue"
  date: string
}

type VirtualListProps<T> = {
  /** Rows to render. Defaults to 10,000 Lumen invoices. */
  items?: T[]
  /** Row height in px, or "auto" to measure every row (estimatedRowHeight is used until a row has been measured). */
  rowHeight?: number | "auto"
  /** Height assumed for rows that have not been measured yet, in "auto" mode. */
  estimatedRowHeight?: number
  /** Extra rows rendered above and below the viewport so fast scrolling never shows a gap. */
  overscan?: number
  /** Viewport height in px. */
  height?: number
  /** Renders one row. Defaults to an invoice row. */
  renderRow?: (item: T, index: number, state: { active: boolean }) => React.ReactNode
  /** Stable key per row. Defaults to item.id, then the index. */
  getKey?: (item: T, index: number) => React.Key
  /** Plain text for the screen reader announcement of the active row. */
  describeRow?: (item: T, index: number) => string
  /** Controlled active row. */
  activeIndex?: number
  defaultActiveIndex?: number
  onActiveChange?: (index: number) => void
  /** Called on click, Enter or Space on a row. */
  onSelect?: (item: T, index: number) => void
  /** Header title. Pass an empty string to hide the header. */
  title?: string
  /** Show the "Jump to row" field in the header. */
  showJump?: boolean
  /** Show the "Rows a to b of n" footer. */
  showFooter?: boolean
  /** Imperative handle with scrollToIndex and setActiveIndex. */
  ref?: React.Ref<VirtualListHandle>
  "aria-label"?: string
  className?: string
}

const CUSTOMERS = [
  "Northwind", "Acme Robotics", "Umbrella Holdings", "Initech", "Globex", "Stark Industrial", "Wayne Freight", "Hooli",
  "Vandelay Imports", "Pied Piper", "Aperture Labs", "Dunder Mifflin", "Sterling Cooper", "Bluth Co", "Oscorp", "Tyrell Corp",
  "Massive Dynamic", "Cyberdyne", "Wonka Industries", "Monarch Solutions", "Prestige Worldwide", "Gekko & Co", "Soylent", "Virtucon",
]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** Deterministic sample so the server and the client render the same rows. */
function makeInvoices(count: number): Invoice[] {
  let seed = 7
  const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296
  const base = Date.UTC(2026, 9, 14)
  const out: Invoice[] = []
  for (let i = 0; i < count; i++) {
    const r = rnd()
    const d = new Date(base - Math.floor(i / 40) * 86400000)
    out.push({
      id: `inv-${count - i}`,
      number: `INV-${String(count - i).padStart(5, "0")}`,
      customer: CUSTOMERS[Math.floor(rnd() * CUSTOMERS.length)],
      amount: Math.round((120 + rnd() * 23880) * 100) / 100,
      status: r < 0.7 ? "paid" : r < 0.92 ? "open" : "overdue",
      date: `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`,
    })
  }
  return out
}

const SAMPLE_INVOICES = makeInvoices(10000)
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
const STATUS = {
  paid: { label: "Paid", tone: "text-success" },
  open: { label: "Open", tone: "text-info" },
  overdue: { label: "Overdue", tone: "text-danger" },
} as const

function InvoiceRow({ item, active }: { item: Invoice; active: boolean }) {
  const s = STATUS[item.status]
  return (
    <div
      data-slot="virtual-list-row"
      className={cn(
        "relative flex h-10 items-center gap-2 border-b border-border px-3 text-[0.8125rem] transition-colors duration-[70ms] ease-hairline sm:gap-3",
        active ? "bg-accent-soft" : "hover:bg-sunken"
      )}
    >
      {active ? <span aria-hidden className="absolute top-2 bottom-2 left-0 w-0.5 rounded-full bg-accent" /> : null}
      <span className="w-18 shrink-0 font-mono text-xs text-fg-muted sm:w-20">{item.number}</span>
      <span className="min-w-0 flex-1 truncate text-fg">{item.customer}</span>
      <span className={cn("hidden w-20 shrink-0 items-center gap-1.5 text-xs sm:inline-flex", s.tone)}>
        <span aria-hidden className="size-1.5 rounded-full bg-current" />
        {s.label}
      </span>
      <span className="w-18 shrink-0 text-right text-fg tabular-nums sm:w-22">{usd.format(item.amount)}</span>
      <span className="hidden w-12 shrink-0 text-right text-xs text-fg-subtle tabular-nums sm:block">{item.date}</span>
    </div>
  )
}

const defaultRender = (item: unknown, _index: number, state: { active: boolean }) => <InvoiceRow item={item as Invoice} active={state.active} />
const defaultKey = (item: unknown, index: number) => (item as { id?: React.Key } | null)?.id ?? index
const defaultDescribe = (item: unknown, index: number) => {
  const inv = item as Partial<Invoice> | null
  if (inv && inv.number && inv.customer) return `${inv.number}, ${inv.customer}, ${STATUS[inv.status ?? "open"].label}, ${usd.format(inv.amount ?? 0)}`
  return `Row ${index + 1}`
}
const clampIndex = (i: number, count: number) => Math.max(0, Math.min(count - 1, Math.round(i)))

/**
 * A windowed list. Only the rows inside the viewport (plus an overscan band)
 * exist in the DOM, so ten thousand rows scroll like ten. Row heights are
 * fixed or measured per row, arrow keys move an active row with Home, End
 * and Page Up/Down, and a ref exposes scrollToIndex for deep links.
 */
function VirtualList<T = Invoice>({
  items = SAMPLE_INVOICES as unknown as T[],
  rowHeight = 40,
  estimatedRowHeight = 40,
  overscan = 6,
  height = 360,
  renderRow = defaultRender,
  getKey = defaultKey,
  describeRow = defaultDescribe,
  activeIndex: activeProp,
  defaultActiveIndex = 0,
  onActiveChange,
  onSelect,
  title = "Invoices",
  showJump = true,
  showFooter = true,
  ref,
  "aria-label": ariaLabel,
  className,
}: VirtualListProps<T>) {
  const count = items.length
  const auto = rowHeight === "auto"
  const fixed = auto ? estimatedRowHeight : rowHeight
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const sizes = React.useRef(new Map<number, number>())
  const [tick, bump] = React.useReducer((n: number) => n + 1, 0)
  const [scrollTop, setScrollTop] = React.useState(0)
  const [viewport, setViewport] = React.useState(height)
  const [innerActive, setInnerActive] = React.useState(() => clampIndex(defaultActiveIndex, count))
  const active = clampIndex(activeProp ?? innerActive, count)
  const [jump, setJump] = React.useState("")
  const pending = React.useRef<{ index: number; align: "auto" | "start" | "center" | "end"; tries: number } | null>(null)
  const lastSet = React.useRef(0)
  const id = React.useId()

  // Prefix sums for measured rows. Fixed mode needs no table.
  const offsets = React.useMemo(() => {
    if (!auto) return null
    const o = new Float64Array(count + 1)
    for (let i = 0; i < count; i++) o[i + 1] = o[i] + (sizes.current.get(i) ?? estimatedRowHeight)
    return o
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, count, estimatedRowHeight, tick])

  const offsetOf = (i: number) => (offsets ? offsets[i] : i * fixed)
  const heightOf = (i: number) => (offsets ? offsets[i + 1] - offsets[i] : fixed)
  const total = offsets ? offsets[count] : count * fixed

  const indexAt = (y: number) => {
    if (!offsets) return Math.min(count - 1, Math.max(0, Math.floor(y / fixed)))
    let lo = 0
    let hi = count - 1
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1
      if (offsets[mid] <= y) lo = mid
      else hi = mid - 1
    }
    return lo
  }

  const first = count ? indexAt(scrollTop) : 0
  const last = count ? indexAt(scrollTop + viewport) : -1
  const start = Math.max(0, first - overscan)
  const end = Math.min(count - 1, last + overscan)

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(([e]) => setViewport(e.contentRect.height))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // One observer measures every mounted row in "auto" mode.
  const measurer = React.useMemo(() => {
    if (!auto || typeof ResizeObserver === "undefined") return null
    return new ResizeObserver((entries) => {
      let changed = false
      for (const e of entries) {
        const i = Number((e.target as HTMLElement).dataset.index)
        const h = Math.round(e.contentRect.height * 100) / 100
        if (!Number.isNaN(i) && h > 0 && sizes.current.get(i) !== h) {
          sizes.current.set(i, h)
          changed = true
        }
      }
      if (changed) bump()
    })
  }, [auto])
  React.useEffect(() => () => measurer?.disconnect(), [measurer])

  const applyScroll = React.useCallback(
    (index: number, align: "auto" | "start" | "center" | "end") => {
      const el = scrollRef.current
      if (!el || !count) return
      const i = clampIndex(index, count)
      const top = offsetOf(i)
      const h = heightOf(i)
      const vh = el.clientHeight
      const cur = el.scrollTop
      let next = cur
      if (align === "start") next = top
      else if (align === "end") next = top + h - vh
      else if (align === "center") next = top + h / 2 - vh / 2
      else if (top < cur) next = top
      else if (top + h > cur + vh) next = top + h - vh
      el.scrollTop = Math.max(0, Math.min(next, total - vh))
      lastSet.current = el.scrollTop
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, total, offsets, fixed]
  )

  const scrollToIndex = React.useCallback(
    (index: number, align: "auto" | "start" | "center" | "end" = "auto") => {
      applyScroll(index, align)
      // Measured rows can shift the target once they mount: settle it over a few ticks.
      if (auto) pending.current = { index: clampIndex(index, count), align, tries: 0 }
    },
    [applyScroll, auto, count]
  )

  React.useLayoutEffect(() => {
    const p = pending.current
    if (!p || !auto) return
    if (p.tries >= 4) {
      pending.current = null
      return
    }
    p.tries += 1
    applyScroll(p.index, p.align)
  }, [tick, auto, applyScroll])

  const setActive = React.useCallback(
    (i: number) => {
      const n = clampIndex(i, count)
      if (activeProp === undefined) setInnerActive(n)
      onActiveChange?.(n)
      scrollToIndex(n, "auto")
    },
    [activeProp, count, onActiveChange, scrollToIndex]
  )

  React.useImperativeHandle(
    ref,
    () => ({
      scrollToIndex,
      setActiveIndex: setActive,
      get element() {
        return scrollRef.current
      },
    }),
    [scrollToIndex, setActive]
  )

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!count) return
    const page = Math.max(1, Math.floor(viewport / (auto ? heightOf(active) || estimatedRowHeight : fixed)) - 1)
    const map: Record<string, number | undefined> = {
      ArrowDown: active + 1,
      ArrowUp: active - 1,
      PageDown: active + page,
      PageUp: active - page,
      Home: 0,
      End: count - 1,
    }
    const to = map[e.key]
    if (to !== undefined) {
      e.preventDefault()
      setActive(to)
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onSelect?.(items[active], active)
    }
  }

  const submitJump = (e: React.FormEvent) => {
    e.preventDefault()
    const n = parseInt(jump, 10)
    if (Number.isNaN(n)) return
    const i = clampIndex(n - 1, count)
    setActive(i)
    scrollToIndex(i, "start")
    scrollRef.current?.focus()
  }

  const rows: React.ReactNode[] = []
  for (let i = start; i <= end; i++) {
    const item = items[i]
    const isActive = i === active
    rows.push(
      <div
        key={getKey(item, i)}
        role="listitem"
        aria-setsize={count}
        aria-posinset={i + 1}
        aria-current={isActive ? "true" : undefined}
        data-index={i}
        data-active={isActive || undefined}
        ref={(el) => {
          if (!measurer || !el) return
          measurer.observe(el)
          return () => measurer.unobserve(el)
        }}
        onClick={() => {
          setActive(i)
          onSelect?.(item, i)
        }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, transform: `translateY(${offsetOf(i)}px)`, height: auto ? undefined : fixed }}
      >
        {renderRow(item, i, { active: isActive })}
      </div>
    )
  }

  const fmt = (n: number) => n.toLocaleString("en-US")
  const rendered = count ? end - start + 1 : 0

  return (
    <div data-slot="virtual-list" className={cn("flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-raised", className)}>
      {title || showJump ? (
        <div className="flex min-h-12 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border px-3 py-2">
          <div className="flex items-baseline gap-2">
            {title ? <h3 className="text-[0.8125rem] font-medium text-fg">{title}</h3> : null}
            <span className="text-xs text-fg-muted tabular-nums">{fmt(count)} rows</span>
          </div>
          {showJump ? (
            <form onSubmit={submitJump} className="flex items-center gap-1.5">
              <label htmlFor={`${id}-jump`} className="sr-only">
                Jump to row
              </label>
              <input
                id={`${id}-jump`}
                type="number"
                inputMode="numeric"
                min={1}
                max={count || 1}
                value={jump}
                placeholder="Jump to row"
                onChange={(e) => setJump(e.target.value)}
                className={cn(
                  "h-8 w-32 rounded-lg border border-border bg-bg px-2.5 text-[0.8125rem] text-fg shadow-xs outline-none placeholder:text-fg-subtle tabular-nums",
                  "transition-[border-color,box-shadow] duration-[140ms] ease-hairline hover:border-border-strong",
                  "focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
                  "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                )}
              />
              <button
                type="submit"
                aria-label="Go to row"
                className="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-surface text-fg-muted shadow-key outline-none transition-[color,border-color] duration-[70ms] hover:border-border-strong hover:text-fg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:translate-y-[0.5px]"
              >
                <CornerDownRightIcon className="size-3.5" />
              </button>
            </form>
          ) : null}
        </div>
      ) : null}

      <div
        ref={scrollRef}
        role="list"
        tabIndex={0}
        aria-label={ariaLabel ?? title ?? "List"}
        aria-describedby={`${id}-hint`}
        onScroll={(e) => {
          const top = e.currentTarget.scrollTop
          // A scroll the user started cancels any pending settle.
          if (Math.abs(top - lastSet.current) > 1) pending.current = null
          setScrollTop(top)
        }}
        onKeyDown={onKeyDown}
        className="relative overflow-y-auto overscroll-contain outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        style={{ height }}
      >
        {count ? (
          <div style={{ height: total, position: "relative" }}>{rows}</div>
        ) : (
          <p className="grid h-full place-items-center text-[0.8125rem] text-fg-subtle">No rows</p>
        )}
      </div>
      <span id={`${id}-hint`} className="sr-only">
        Use the arrow keys to move between rows, Page Up and Page Down to move a screen, Home and End for the first and last row.
      </span>
      <span aria-live="polite" className="sr-only">
        {count ? `Row ${fmt(active + 1)} of ${fmt(count)}: ${describeRow(items[active], active)}` : ""}
      </span>

      {showFooter ? (
        <div className="flex h-9 items-center justify-between gap-3 border-t border-border bg-bg px-3 font-mono text-[11px] text-fg-subtle tabular-nums">
          <span>
            {count ? `Rows ${fmt(first + 1)} to ${fmt(Math.max(first + 1, last + 1))} of ${fmt(count)}` : "Empty"}
          </span>
          <span>{rendered} in the DOM</span>
        </div>
      ) : null}
    </div>
  )
}

export { VirtualList }
export type { VirtualListProps, VirtualListHandle, Invoice as VirtualListInvoice }
