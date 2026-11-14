"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A bare fixed-row-height windowed list that renders only the rows in view; ten thousand rows cost about twenty DOM nodes.
 *
 * Pass `count`, `itemHeight` and `renderItem(index)`. Use `VirtualList` for a header, measured row heights, keyboard row navigation and scroll-to-index.
 *
 * @example
 * <VirtualizedList count={rows.length} itemHeight={40} height={320} renderItem={(i) => <Row row={rows[i]} />} aria-label="Transactions" />
 */
type VirtualizedListProps = {
  /** Total number of rows. */
  count?: number
  /** Height of every row, in px. Rows must not be taller. */
  itemHeight?: number
  /** Viewport height, in px. */
  height?: number
  /** Renders the row at `index`. Defaults to a sample invoice row. */
  renderItem?: (index: number) => React.ReactNode
  /** Accessible name for the scrollable list. */
  "aria-label"?: string
  className?: string
}

const SAMPLE_CUSTOMERS = ["Northwind Traders", "Halcyon Health", "Fathom Analytics", "Meridian Labs", "Quill & Co", "Tessel Robotics"]

/** Renders a sample invoice row; replace it with your own `renderItem`. */
function sampleRow(index: number) {
  return (
    <div className="flex h-10 items-center justify-between border-b border-border px-3 text-[13px]">
      <span className="font-mono text-fg-muted">INV-{String(10000 - index).padStart(5, "0")}</span>
      <span className="text-fg">{SAMPLE_CUSTOMERS[index % SAMPLE_CUSTOMERS.length]}</span>
      <span className="tabular-nums text-fg-muted">${((index * 7919) % 9000 + 450).toLocaleString("en-US")}</span>
    </div>
  )
}

function VirtualizedList({ count = 10000, itemHeight = 40, height = 320, renderItem = sampleRow, "aria-label": ariaLabel = "List", className }: VirtualizedListProps) {
  const [scrollTop, setScrollTop] = React.useState(0)
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - 5)
  const visible = Math.ceil(height / itemHeight) + 10
  const end = Math.min(count, start + visible)
  return (
    <div
      data-slot="virtualized-list"
      // Focusable so the arrow keys and Page Up/Down scroll it.
      tabIndex={0}
      role="region"
      aria-label={ariaLabel}
      className={cn("w-full max-w-md overflow-auto rounded-xl border border-border bg-surface outline-none focus-visible:ring-2 focus-visible:ring-accent", className)}
      style={{ height }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div role="list" style={{ height: count * itemHeight, position: "relative" }}>
        {Array.from({ length: end - start }, (_, i) => {
          const index = start + i
          return (
            <div key={index} role="listitem" aria-setsize={count} aria-posinset={index + 1} style={{ position: "absolute", top: index * itemHeight, left: 0, right: 0, height: itemHeight }}>
              {renderItem(index)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export { VirtualizedList }
export type { VirtualizedListProps }
