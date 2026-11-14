"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * SavedViews — a vertical list of saved filters ("My open", "Needs review") with counts, one selected.
 *
 * Use it in an issue tracker or inbox sidebar. It is a single-select listbox: Tab lands on the
 * selected view, Up and Down arrows move and select, Home and End jump. For top-level page
 * navigation use a sidebar nav; for switching panels in place use Tabs.
 *
 * @example
 * <SavedViews views={[{ id: "mine", name: "My open", count: 12 }, { id: "all", name: "All issues" }]} value={view} onChange={setView} />
 */

type View = {
  id: string
  name: string
  /** Number of items in the view, shown on the right. */
  count?: number
}

const SAMPLE_VIEWS: View[] = [
  { id: "1", name: "My open", count: 12 },
  { id: "2", name: "Needs review", count: 4 },
  { id: "3", name: "All issues", count: 128 },
]

function SavedViews({
  views = SAMPLE_VIEWS,
  value,
  defaultValue,
  onChange,
  "aria-label": ariaLabel = "Saved views",
  className,
}: {
  /** Views to list, in order. */
  views?: View[]
  /** Controlled selected view id. */
  value?: string
  /** Starting view id when uncontrolled. Defaults to the first view. */
  defaultValue?: string
  /** Fires with the picked view id. */
  onChange?: (id: string) => void
  /** Accessible name of the list. */
  "aria-label"?: string
  className?: string
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? views[0]?.id)
  const current = value ?? internal
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const selected = views.findIndex((v) => v.id === current)
  const pick = (i: number) => {
    const id = views[i].id
    if (value === undefined) setInternal(id)
    onChange?.(id)
  }
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = views.length
    const next =
      e.key === "ArrowDown" ? Math.min(n - 1, i + 1)
      : e.key === "ArrowUp" ? Math.max(0, i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? n - 1
      : -1
    if (next < 0) return
    e.preventDefault()
    refs.current[next]?.focus()
    pick(next)
  }
  return (
    <div
      data-slot="saved-views"
      role="listbox"
      aria-label={ariaLabel}
      aria-orientation="vertical"
      className={cn("flex flex-col gap-0.5", className)}
    >
      {views.map((v, i) => {
        const on = i === selected
        return (
          <button
            key={v.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="option"
            aria-selected={on}
            tabIndex={i === (selected < 0 ? 0 : selected) ? 0 : -1}
            className={cn(
              "flex h-8 items-center justify-between gap-2 rounded-lg px-2.5 text-left text-sm text-fg outline-none",
              "transition-[background-color] duration-[70ms] ease-hairline",
              "focus-visible:ring-2 focus-visible:ring-accent",
              on ? "bg-sunken font-medium" : "hover:bg-sunken"
            )}
            onClick={() => pick(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="truncate">{v.name}</span>
            {v.count != null ? <span className="shrink-0 text-xs tabular-nums text-fg-muted">{v.count}</span> : null}
          </button>
        )
      })}
    </div>
  )
}
export { SavedViews }
export type { View as SavedView }
