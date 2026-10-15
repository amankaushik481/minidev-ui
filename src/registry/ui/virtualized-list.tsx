"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
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

/** A fixed-row-height windowed list that renders only the rows in view. Defaults to a 10,000 row sample. */
function VirtualizedList({
  count = 10000,
  itemHeight = 40,
  height = 320,
  renderItem = sampleRow,
  className,
}: {
  count?: number
  itemHeight?: number
  height?: number
  renderItem?: (index: number) => React.ReactNode
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = React.useState(0)
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - 5)
  const visible = Math.ceil(height / itemHeight) + 10
  const end = Math.min(count, start + visible)
  return (
    <div
      ref={ref}
      data-slot="virtualized-list"
      className={cn("w-full max-w-md overflow-auto rounded-xl border border-border bg-surface", className)}
      style={{ height }}
      onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
    >
      <div style={{ height: count * itemHeight, position: "relative" }}>
        {Array.from({ length: end - start }, (_, i) => {
          const index = start + i
          return (
            <div key={index} style={{ position: "absolute", top: index * itemHeight, left: 0, right: 0, height: itemHeight }}>
              {renderItem(index)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export { VirtualizedList }
